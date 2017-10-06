import JSONModel    from "sap/ui/model/json/JSONModel";
import Device       from "sap/ui/Device";

export default {
    createDeviceModel(): JSONModel {
        var oModel = new JSONModel(Device);
        //TODO|@types/openui5: for the commented code to work, sap.ui.model.BindingMode must be an enum of strings, like sap.m.Size, sap.m.ListType, sap.m.ListMode.
        //oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
        oModel.setDefaultBindingMode(<any>"OneWay");
        return oModel;
    }
};
