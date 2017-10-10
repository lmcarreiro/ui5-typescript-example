import BaseObject   from "sap/ui/base/Object";
import Sorter       from "sap/ui/model/Sorter";

@UI5("typescript.example.ui5app.model.GroupSortState")
export default class GroupSortState extends BaseObject
{
    private _oViewModel: sap.ui.model.json.JSONModel;
    private _fnGroupFunction: Function;

    /**
     * Creates sorters and groupers for the master list.
     * Since grouping also means sorting, this class modifies the viewmodel.
     * If a user groups by a field, and there is a corresponding sort option, the option will be chosen.
     * If a user ungroups, the sorting will be reset to the default sorting.
     * @class
     * @public
     * @param {sap.ui.model.json.JSONModel} oViewModel the model of the current view
     * @param {function} fnGroupFunction the grouping function to be applied
     * @alias typescript.example.ui5app.model.GroupSortState
     */
    constructor(oViewModel: sap.ui.model.json.JSONModel, fnGroupFunction: Function) {
        super();
        this._oViewModel = oViewModel;
        this._fnGroupFunction = fnGroupFunction;
    }

    /**
     * Sorts by Name, or by UnitNumber
     *
     * @param {string} sKey - the key of the field used for grouping
     * @returns {sap.ui.model.Sorter[]} an array of sorters
     */
    sort(sKey: string): sap.ui.model.Sorter[] {
        var sGroupedBy = this._oViewModel.getProperty("/groupBy");

        if (sGroupedBy !== "None") {
            // If the list is grouped, remove the grouping since the user wants to sort by something different
            // Grouping only works if the list is primary sorted by the grouping - the first sorten contains a grouper function
            this._oViewModel.setProperty("/groupBy", "None");
        }

        return [new Sorter(sKey, false)];
    }

    /**
     * Groups by UnitNumber, or resets the grouping for the key "None"
     *
     * @param {string} sKey - the key of the field used for grouping
     * @returns {sap.ui.model.Sorter[]} an array of sorters
     */
    group(sKey: string): sap.ui.model.Sorter[] {
        var aSorters = [];

        if (sKey === "UnitNumber") {
            // Grouping means sorting so we set the select to the same Entity used for grouping
            this._oViewModel.setProperty("/sortBy", "UnitNumber");

            aSorters.push(
                new Sorter("UnitNumber", false,
                    this._fnGroupFunction.bind(this))
            );
        } else if (sKey === "None") {
            // select the default sorting again
            this._oViewModel.setProperty("/sortBy", "Name");
        }

        return aSorters;
    }
}
