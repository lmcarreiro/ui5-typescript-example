/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
    "sap/ui/test/Opa5",
    "typescript/example/ui5app/test/integration/pages/Common",
    "sap/ui/test/opaQunit",
    "typescript/example/ui5app/test/integration/pages/App",
    "typescript/example/ui5app/test/integration/pages/Browser",
    "typescript/example/ui5app/test/integration/pages/Master",
    "typescript/example/ui5app/test/integration/pages/Detail",
    "typescript/example/ui5app/test/integration/pages/NotFound"
], function (Opa5, Common) {
    "use strict";
    Opa5.extendConfig({
        arrangements: new Common(),
        viewNamespace: "typescript.example.ui5app.view."
    });

    sap.ui.require([
        "typescript/example/ui5app/test/integration/NavigationJourneyPhone",
        "typescript/example/ui5app/test/integration/NotFoundJourneyPhone",
        "typescript/example/ui5app/test/integration/BusyJourneyPhone"
    ], function () {
        QUnit.start();
    });
});