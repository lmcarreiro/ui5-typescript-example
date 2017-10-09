/*global history */
import Controller   from "sap/ui/core/mvc/Controller";
import History      from "sap/ui/core/routing/History";

@UI5("typescript.example.ui5app.controller.BaseController")
export default class BaseController extends Controller
{
    /**
     * Convenience method for accessing the router in every controller of the application.
     * @public
     * @returns {sap.ui.core.routing.Router} the router for this component
     */
    public getRouter(): sap.ui.core.routing.Router {
        return (<sap.ui.core.UIComponent>this.getOwnerComponent()).getRouter();
    }

    /**
     * Convenience method for getting the view model by name in every controller of the application.
     * @public
     * @param {string} sName the model name
     * @returns {sap.ui.model.Model} the model instance
     */
    public getModel(sName?: string|undefined): sap.ui.model.Model {
        return this.getView().getModel(sName);
    }

    /**
     * Convenience method for setting the view model in every controller of the application.
     * @public
     * @param {sap.ui.model.Model} oModel the model instance
     * @param {string} sName the model name
     * @returns {sap.ui.core.mvc.View} the view instance
     */
    public setModel(oModel: sap.ui.model.Model, sName?: string|undefined): sap.ui.core.mvc.View {
        let view = this.getView();
        view.setModel(oModel, sName);
        return view;
    }

    /**
     * Convenience method for getting the resource bundle.
     * @public
     * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
     */
    public getResourceBundle(): sap.ui.model.resource.ResourceModel {
        let resourceModel = <sap.ui.model.resource.ResourceModel>this.getOwnerComponent().getModel("i18n");
        return resourceModel.getResourceBundle();
    }

    /**
     * Event handler for navigating back.
     * It there is a history entry we go one step back in the browser history
     * If not, it will replace the current entry of the browser history with the master route.
     * @public
     */
    public onNavBack(): void {
        //TODO|@types/openui5: History's getInstance() method should be static.
        //I put an invalid cast here, so the return type of getInstance could be 'History' instead of 'any'
        //var sPreviousHash = History.getInstance().getPreviousHash();
        var sPreviousHash = (<History>History).getInstance().getPreviousHash();

        //TODO|@types/openui5: History's getPreviousHash() method should return string|undefined instead of just string, like is said on the docs:
        // "gets the previous hash in the history - if the last direction was Unknown or there was no navigation yet, undefined will be returned"

        if (sPreviousHash !== undefined) {
            history.go(-1);
        } else {
            this.getRouter().navTo("master", {}, true);
        }
    }
}
