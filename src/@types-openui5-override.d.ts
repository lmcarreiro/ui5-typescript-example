//TODO: make pull requests to @types/openui5 npm package

declare namespace sap.ui.base {
    export abstract class EventProvider extends sap.ui.base.Object {
        /**
         * attachEventOnce(sEventId, oData?, fnFunction, oListener?) : sap.ui.base.EventProvider
         * 
         * since TypeScript doesn't allow an optional parameter followed by an required one, there must be more than one method declaration
         * 
         * https://openui5.hana.ondemand.com/#/api/sap.ui.base.EventProvider/methods/attachEventOnce
         */

        /**
         * Attaches an event handler, called one time only, to the event with the given identifier.When the
         * event occurs, the handler function is called and the handler registration is automatically removed
         * afterwards.
         * @param sEventId The identifier of the event to listen for
         * @param fnFunction The handler function to call when the event occurs. This function will be called
         * in the context of the                      <code>oListener</code> instance (if present) or on the
         * event provider instance. The event                      object ({@link sap.ui.base.Event}) is
         * provided as first argument of the handler. Handlers must not change                      the content
         * of the event. The second argument is the specified <code>oData</code> instance (if present).
         * @param oListener The object that wants to be notified when the event occurs (<code>this</code>
         * context within the                       handler function). If it is not specified, the handler
         * function is called in the context of the event provider.
         * @returns Returns <code>this</code> to allow method chaining
        */
        attachEventOnce(sEventId: string, fnFunction: any, oListener?: any): sap.ui.base.EventProvider;

        /**
         * Attaches an event handler, called one time only, to the event with the given identifier.When the
         * event occurs, the handler function is called and the handler registration is automatically removed
         * afterwards.
         * @param sEventId The identifier of the event to listen for
         * @param oData An object that will be passed to the handler along with the event object when the event
         * is fired
         * @param fnFunction The handler function to call when the event occurs. This function will be called
         * in the context of the                      <code>oListener</code> instance (if present) or on the
         * event provider instance. The event                      object ({@link sap.ui.base.Event}) is
         * provided as first argument of the handler. Handlers must not change                      the content
         * of the event. The second argument is the specified <code>oData</code> instance (if present).
         * @param oListener The object that wants to be notified when the event occurs (<code>this</code>
         * context within the                       handler function). If it is not specified, the handler
         * function is called in the context of the event provider.
         * @returns Returns <code>this</code> to allow method chaining
        */
        attachEventOnce(sEventId: string, oData: any, fnFunction: any, oListener?: any): sap.ui.base.EventProvider;

    }
}