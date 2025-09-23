/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
        "dojo/_base/lang",
        "dojo/on"
], function(lang, on) {

   /**
    * History helper
    * 
    * @namespace ic-core.app.history
    */

   function s(e) {
      console.log((e || window).state);
   }
   function p(e) {
      return delegate.onChange.apply(delegate, arguments);
   }
   var delegate = {
      onChange : s
   };
   var history = /** @lends ic-core.app.history */
   {
      TOPIC : 'ic-core/app/history/change',
      setDelegate : function(del) {
         if (del) {
            if (!lang.isFunction(del.onChange))
               throw "History delegate must implement onChange()";
            delegate = del;
         }
      },
      push : function(url, state, /* unused */title) {
         window.history.pushState(state, title, url);
      },
      back : function() {
         window.history.back();
      },
      go : function(fwd) {
         window.history.go(fwd);
      },
      getInitialState : function() {
         return window.state;
      }
   };

   // Hook into the window.onpopstate event
   on(window, "popstate", p);
   // Create a closure on window and document so we're safe in case custom code
   // tampers with them
   return history;
});
