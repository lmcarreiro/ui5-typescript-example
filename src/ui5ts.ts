function UI5(name: string): any {
    return function (target: FunctionConstructor, propertyKey: string, descriptor: PropertyDescriptor) {
        var functionMembers: string[] = Object.getOwnPropertyNames(function () {});
        var staticMembers:   string[] = Object.getOwnPropertyNames(target).filter(o => functionMembers.indexOf(o) === -1);
        var instanceMethods: string[] = Object.getOwnPropertyNames(target.prototype);
        
        var baseClass: any = Object.getPrototypeOf(target); // é o mesmo que: baseClass = target.__proto__;

        var thisClass: any = {};
        staticMembers  .forEach(m => thisClass[m] = (<any>target)[m]);
        instanceMethods.forEach(m => thisClass[m] = (<any>target.prototype)[m]);

        if (typeof baseClass.extend === "function") {
            return baseClass.extend(name, thisClass);
        }
        else {
            throw new Error("A classe base não é uma classe UI5.");
        }
    }
}

function define(aDependencies: string[], vFactory: (...args: any[]) => any): any
{
    //remove as depenências "require" e "exports" geradas pelo typescript
    var newDependencies = aDependencies.slice(2);

    //passa null no lugar das dependências "require" e "exports" geradas pelo typescript e substitui coloca as dependências fornecidas pelo ui5 como default
    var newFactory = (...args: any[]) => {
        var exports: { default: any } = { default: undefined };
        vFactory(null, exports, ...args.map((d: any) => ({ default: d })));
        return exports.default;
    };

    return sap.ui.define(newDependencies, newFactory);
}
