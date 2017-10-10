# ui5-typescript-example
A Master-Detail demo app (the same available in SAPUI5/OpenUI5 SDK) using TypeScript with npm ui5ts package.

## How to run

```
git clone https://github.com/lmcarreiro/ui5-typescript-example.git
cd ui5-typescript-example
npm install
npm start
```

## UI5 TypeScript example class

```typescript
import UIComponent  from "sap/ui/core/UIComponent";
import models       from "typescript/example/ui5app/model/models";

@UI5("typescript.example.ui5app.Component")
export default class Component extends UIComponent
{
    public static metadata: any = {
        manifest : "json"
    };

    public init(): void {
        // set the device model
        this.setModel(models.createDeviceModel(), "device");
        // call the base component's init function and create the App view
        super.init();
        // create the views based on the url/hash
        this.getRouter().initialize();
    }
}
```

## Progress

I've published an incomplete work, not all classes of this example app was converted to typescript yet. But it is running fine, without
error, and the core idea of working ui5 with typescript is the npm ui5ts package, that already
works.

I hope that the classes in this example that is already converted to typescript are enough for you to understand how to do it, and start
using typescript in your own ui5 projects.

* [ ] /controller
  * [x] ~~App.controller.js~~ -> App.controller.ts
  * [x] ~~BaseController.js~~ -> BaseController.ts
  * [x] ~~Detail.controller.js~~ -> Detail.controller.ts
  * [x] ~~ErrorHandler.js~~ -> ErrorHandler.ts
  * [x] ~~ListSelector.js~~ -> ListSelector.ts
  * [ ] Master.controller.js
* [ ] /localService
* [ ] /model
  * [x] ~~formatter.js~~ -> formatter.ts
  * [ ] grouper.js
  * [ ] GroupSortState.js
  * [x] ~~models.js~~ -> models.ts
* [ ] /test
* [x] ~~Component.js~~ -> Component.ts


## References

 - ui5ts npm package: https://www.npmjs.com/package/ui5ts
 - ui5ts github repository: https://github.com/lmcarreiro/ui5ts
 - OpenUI5 Master-Detail template: https://openui5.hana.ondemand.com/#/topic/8ed9339f3a99418e82a02f0fb4b5d6b9
 - OpenUI5 Master-Detail template repository: https://github.com/SAP/openui5-masterdetail-app
