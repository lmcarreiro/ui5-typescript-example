/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 Objects in the list
// * All 3 Objects have at least one LineItems

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
        "typescript/example/ui5app/test/integration/MasterJourney",
        "typescript/example/ui5app/test/integration/NavigationJourney",
        "typescript/example/ui5app/test/integration/NotFoundJourney",
        "typescript/example/ui5app/test/integration/BusyJourney"
    ], function () {
        QUnit.start();
    });
});