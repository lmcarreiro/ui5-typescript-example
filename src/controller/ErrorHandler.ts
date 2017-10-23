import UI5Object        from "sap/ui/base/Object";
import MessageBox       from "sap/m/MessageBox";
import MyUIComponent    from "typescript/example/ui5app/Component";

@UI5("typescript.example.ui5app.controller.ErrorHandler")
export default class ErrorHandler extends UI5Object
{
    private _oResourceModel: sap.ui.model.resource.ResourceModel;
    private _oResourceBundle: typeof jQuery.sap.util.ResourceBundle;
    private _oComponent: MyUIComponent;
    private _oModel: sap.ui.model.odata.v2.ODataModel;
    private _bMessageOpen: boolean;
    private _sErrorText: string;

    /**
     * Handles application errors by automatically attaching to the model events and displaying errors when needed.
     * @class
     * @param {sap.ui.core.UIComponent} oComponent reference to the app's component
     * @public
     * @alias typescript.example.ui5app.controller.ErrorHandler
     */
    public constructor(oComponent: MyUIComponent) {
        super();
        this._oResourceModel = oComponent.getModel("i18n");
        //TODO|ui5ts: check how to convert T|Promise<T> into T
        this._oResourceBundle = <any>this._oResourceModel.getResourceBundle();
        this._oComponent = oComponent;
        this._oModel = oComponent.getModel();
        this._bMessageOpen = false;
        this._sErrorText = this._oResourceBundle.getText("errorText");

        this._oModel.attachMetadataFailed((oEvent: sap.ui.base.Event) => {
            var oParams = oEvent.getParameters();
            this._showServiceError(oParams.response);
        }, this);

        this._oModel.attachRequestFailed((oEvent: sap.ui.base.Event) => {
            var oParams = oEvent.getParameters();
            // An entity that was not found in the service is also throwing a 404 error in oData.
            // We already cover this case with a notFound target so we skip it here.
            // A request that cannot be sent to the server is a technical error that we have to handle though
            if (oParams.response.statusCode !== "404" || (oParams.response.statusCode === 404 && oParams.response.responseText.indexOf("Cannot POST") === 0)) {
                this._showServiceError(oParams.response);
            }
        }, this);
    }

    /**
     * Shows a {@link sap.m.MessageBox} when a service call has failed.
     * Only the first error message will be display.
     * @param {string} sDetails a technical error to be displayed on request
     * @private
     */
    private _showServiceError(sDetails: string): void {
        if (this._bMessageOpen) {
            return;
        }
        this._bMessageOpen = true;
        MessageBox.error(
            this._sErrorText,
            {
                id : "serviceErrorMessageBox",
                details : sDetails,
                styleClass : this._oComponent.getContentDensityClass(),
                actions : [MessageBox.Action.CLOSE],
                onClose : () => {
                    this._bMessageOpen = false;
                }
            }
        );
    }
}