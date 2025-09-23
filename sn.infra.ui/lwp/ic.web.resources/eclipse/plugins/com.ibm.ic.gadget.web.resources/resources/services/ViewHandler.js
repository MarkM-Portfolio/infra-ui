/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojo/_base/lang",
      "../util/domStore"
], function(declare, lang, domStore) {

   /**
    * Constants
    */
   var CONST_NULL_ = '_____NULL_____';

   var ATTR_DESTROY_HANDLER_ = 'data-iContainer-destroy-handler';

   /**
    * Normalize view name to non-null value
    * 
    * @function
    * @private
    * @returns Normalized version ov view name strin
    */
   function normalizeViewName_(viewName) {
      if (!viewName || viewName === '') {
         return CONST_NULL_;
      }
      else {
         return viewName;
      }
   }

   /**
    * Sligtly hacky, but should work
    * 
    * @see container.site/site.js
    * @function
    * @private
    * @param gadgetSite
    * @returns
    */
   function getElementForSite_(gadgetSite) {
      return gadgetSite.el_;
   }

   /**
    * Implements 'handler' class for views.
    * 
    * @param {string=}
    *           opt_viewTarget: Optional parameter, the view target indicates
    *           where to open.
    * @param {Object=}
    *           opt_coordinates: Object containing the desired absolute
    *           positioning css parameters (top|bottom|left|right) with
    *           appropriate values. All values are relative to the calling
    *           gadget. *IGNORED* as of 17th Feb 2012
    * @param {Element=}
    *           opt_rel: The element to which opt_coordinates values are
    *           relative.
    * @return {Object} The DOM element to place the embedded experience in.
    *         using gadgets.selection to pass the ActivityStream Item or any
    *         other information relevant to the Embedded Experience chrome such
    *         as title etc. Hoping to have this passed directly to this function
    *         in future.
    */
   var ViewHandler = declare('com.ibm.lconn.gadget.services.ViewHandler', null, {
      // DO NOT CHANGE, if we instantiate as {}, dojo treats as static.
      _registry : null,

      /* Name of the handled method for error reporting purposes */
      _handledMethod : null,

      /**
       * 
       */
      constructor : function(handledMethod) {
         this._registry = {};
         this._handledMethod = handledMethod;
      },

      /**
       * Register a handler method
       * 
       * @memberOf com.ibm.lconn.gadget.services.ViewHandler.prototype
       * @function
       * @param {String=}
       *           view_target The view target to invoke create. If this is
       *           <code>null</code>, this is treated as the 'default' or
       *           'fallback' handler.
       * @param {Object[]=}
       *           args Array of arguments to pass to the handler method.
       * @return {Object=} Returns the created element
       */
      registerHandler : function(view_target, createHandler, destroyHandler) {
         view_target = normalizeViewName_(view_target);

         var handler_pair = {
            'createHandler' : createHandler,
            'destroyHandler' : destroyHandler
         };

         this._registry[view_target] = handler_pair;
      },

      /**
       * Invokes the 'create' method for the gadget. The method is invoked in
       * the 'scope' of the CommonContainer object - eg 'this' is bound to
       * osapi.container.Container.
       * 
       * @memberOf com.ibm.lconn.gadget.services.ViewHandler.prototype
       * @function
       * @param {osapi.container.Container}
       *           container The common container instance that the call is
       *           bound to.
       * @param {String=}
       *           view_target The view target to invoke create
       * @param {Object[]=}
       *           args Array of arguments to pass to the handler method.
       * @return {Object=} Returns the created element
       */
      invokeCreate : function(container, view_target, args) {
         view_target = normalizeViewName_(view_target);

         var registry = this._registry, handler_pair = registry[view_target] || registry[CONST_NULL_];
         element = null;

         if (handler_pair) {
            var element = handler_pair.createHandler.apply(container, args);
            domStore(element).set(ATTR_DESTROY_HANDLER_, handler_pair.destroyHandler);
            return element;
         }
         else {
            throw 'Unknown view target for ' + this._handledMethod + ': ' + view_target;
         }
      }

   });

   /*
    * Add static methods
    */
   lang.mixin(com.ibm.lconn.gadget.services.ViewHandler, {

      /**
       * Invokes the 'destroy' method for this site
       * 
       * @memberOf com.ibm.lconn.gadget.services.ViewHandler
       * @function
       * @param {String=}
       *           view_target The view target to invoke create
       * @param {Object[]=}
       *           Array of arguments to pass to the handler method.
       */
      invokeDestroy : function(container, site, args) {
         // TODO, find element
         var element = getElementForSite_(site), handler = domStore(element).get(ATTR_DESTROY_HANDLER_);

         if (handler) {
            handler.apply(container, args);
         }
         else {
            throw 'Could not find handler method';
         }
      }

   });

   return ViewHandler;
});
