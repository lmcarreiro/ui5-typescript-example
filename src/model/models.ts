import JSONModel    from "sap/ui/model/json/JSONModel";
import Device       from "sap/ui/Device";

export default {
    createDeviceModel(): JSONModel {
        //TODO|ui5ts: generate constructors
        var oModel = new JSONModel(Device);
        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
        return oModel;
    }
};
