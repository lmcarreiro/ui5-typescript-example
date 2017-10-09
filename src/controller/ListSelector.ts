import BaseObject from "sap/ui/base/Object";

@UI5("typescript.example.ui5app.model.ListSelector")
export default class ListSelector extends BaseObject
{
    private _oList: sap.m.List
    private _fnResolveListHasBeenSet: (oList: sap.m.List) => void;
    private _oWhenListHasBeenSet: Promise<sap.m.List>;
    private oWhenListLoadingIsDone: Promise<{ list: sap.m.List, firstListitem: sap.m.ListItemBase }>;

    /**
     * Provides a convenience API for selecting list items. All the functions will wait until the initial load of the a List passed to the instance by the setBoundMasterList
     * function.
     * @class
     * @public
     * @alias typescript.example.ui5app.model.ListSelector
     */
    constructor() {
        super();
        this._oWhenListHasBeenSet = new Promise((fnResolveListHasBeenSet: (oList: sap.m.List) => void) => {
            this._fnResolveListHasBeenSet = fnResolveListHasBeenSet;
        });
        // This promise needs to be created in the constructor, since it is allowed to
        // invoke selectItem functions before calling setBoundMasterList
        this.oWhenListLoadingIsDone = new Promise((fnResolve, fnReject) => {
            // Used to wait until the setBound masterList function is invoked
            this._oWhenListHasBeenSet
                .then((oList: sap.m.List) => {
                    //TODO|@types/openui5: attachEventOnce must be overloaded because oData parameter is optional and is followed by fnFunction that is required
                    oList.getBinding("items").attachEventOnce("dataReceived", undefined,
                        (oEvent: sap.ui.base.Event) => {
                            if (!oEvent.getParameter("data")) {
                                fnReject({
                                    list : oList,
                                    error : true
                                });
                            }
                            var oFirstListItem = oList.getItems()[0];
                            if (oFirstListItem) {
                                // Have to make sure that first list Item is selected
                                // and a select event is triggered. Like that, the corresponding
                                // detail page is loaded automatically
                                fnResolve({
                                    list : oList,
                                    firstListitem : oFirstListItem
                                });
                            } else {
                                // No items in the list
                                fnReject({
                                    list : oList,
                                    error : false
                                });
                            }
                        }
                    );
                });
        });
    }

    /**
     * A bound list should be passed in here. Should be done, before the list has received its initial data from the server.
     * May only be invoked once per ListSelector instance.
     * @param {sap.m.List} oList The list all the select functions will be invoked on.
     * @public
     */
    public setBoundMasterList(oList: sap.m.List): void {
        this._oList = oList;
        this._fnResolveListHasBeenSet(oList);
    }


    /**
     * Tries to select and scroll to a list item with a matching binding context. If there are no items matching the binding context or the ListMode is none,
     * no selection/scrolling will happen
     * @param {string} sBindingPath the binding path matching the binding path of a list item
     * @public
     */
    public selectAListItem(sBindingPath: string): void {

        this.oWhenListLoadingIsDone.then(
            () => {
                var oList = this._oList,
                    oSelectedItem;

                if (oList.getMode() === sap.m.ListMode.None) {
                    return;
                }

                oSelectedItem = oList.getSelectedItem();

                //TODO|@types/openui5: getBindingContext's argument must be optional, like in the API docs
                // skip update if the current selection is already matching the object path
                if (oSelectedItem && oSelectedItem.getBindingContext("").getPath("") === sBindingPath) {
                    return;
                }

                oList.getItems().some((oItem: sap.m.ListItemBase) => {
                    //TODO|@types/openui5: getBindingContext's argument must be optional, like in the API docs
                    if (oItem.getBindingContext("") && oItem.getBindingContext("").getPath("") === sBindingPath) {
                        oList.setSelectedItem(oItem, true);
                        return true;
                    }
                    return false;
                });
            },
            () => jQuery.sap.log.warning("Could not select the list item with the path" + sBindingPath + " because the list encountered an error or had no items")
        );
    }


    /* =========================================================== */
    /* Convenience Functions for List Selection Change Event       */
    /* =========================================================== */

    /**
     * Attaches a listener and listener function to the ListSelector's bound master list. By using
     * a promise, the listener is added, even if the list is not available when 'attachListSelectionChange'
     * is called.
     * @param {function} fnFunction the function to be executed when the list fires a selection change event
     * @param {function} oListener the listener object
     * @return {typescript.example.ui5app.model.ListSelector} the list selector object for method chaining
     * @public
     */
    public attachListSelectionChange(fnFunction: Function, oListener: any): ListSelector {
        this._oWhenListHasBeenSet.then(() => {
            this._oList.attachSelectionChange(fnFunction, oListener);
        });
        return this;
    }

    /**
     * Detaches a listener and listener function from the ListSelector's bound master list. By using
     * a promise, the listener is removed, even if the list is not available when 'detachListSelectionChange'
     * is called.
     * @param {function} fnFunction the function to be executed when the list fires a selection change event
     * @param {function} oListener the listener object
     * @return {typescript.example.ui5app.model.ListSelector} the list selector object for method chaining
     * @public
     */
    public detachListSelectionChange(fnFunction: Function, oListener: any): ListSelector {
        this._oWhenListHasBeenSet.then(() => {
            this._oList.detachSelectionChange(fnFunction, oListener);
        });
        return this;
    }

    /**
     * Removes all selections from master list.
     * Does not trigger 'selectionChange' event on master list, though.
     * @public
     */
    public clearMasterListSelection(): void {
        //use promise to make sure that 'this._oList' is available
        this._oWhenListHasBeenSet.then(() => {
            this._oList.removeSelections(true);
        });
    }
}
