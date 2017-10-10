import BaseController   from "typescript/example/ui5app/controller/BaseController";
import JSONModel        from "sap/ui/model/json/JSONModel";

@UI5("typescript.example.ui5app.controller.App")
export default class App extends BaseController {

    public onInit(): void {
        var oViewModel: JSONModel,
            oComponent = this.getOwnerComponent(),
            oModel = oComponent.getModel<sap.ui.model.odata.v2.ODataModel>(),
            fnSetAppNotBusy: () => void,
            oListSelector = oComponent.oListSelector,
            iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

        oViewModel = new JSONModel({
            busy : true,
            delay : 0
        });
        this.setModel(oViewModel, "appView");

        fnSetAppNotBusy = () => {
            oViewModel.setProperty("/busy", false);
            oViewModel.setProperty("/delay", iOriginalBusyDelay);
        };

        oModel.metadataLoaded()
                .then(fnSetAppNotBusy);

        // Makes sure that master view is hidden in split app
        // after a new list entry has been selected.
        oListSelector.attachListSelectionChange(() => {
            this.byId<sap.m.SplitApp>("idAppControl").hideMaster();
        }, this);

        //TODO|@types/openui5: sap.ui.core.Control's addStyleClass method must accept a string argument
        // apply content density mode to root view
        //this.getView().addStyleClass(oComponent.getContentDensityClass());
        this.getView().addStyleClass.call(this.getView(), oComponent.getContentDensityClass());
    }

}
