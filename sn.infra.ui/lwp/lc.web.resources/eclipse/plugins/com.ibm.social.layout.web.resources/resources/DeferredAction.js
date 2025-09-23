/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.DeferredAction");

dojo.require("com.ibm.social.layout.Action");
dojo.require("net.jazz.ajax.xdloader");

(function(){

function getDelegateFunction(name) {
   return function(){
      var d = this.delegate;
      if (d && d[name]) {
         return d[name].apply(d, arguments);
      }
      return this.inherited(arguments);
   };
}

dojo.declare("com.ibm.social.layout.DeferredAction", [com.ibm.social.layout.Action], {
   constructor: function() {
      this._args = dojo._toArray(arguments);
   },
   
   selectionChanged: getDelegateFunction("selectionChanged"),
   getName: getDelegateFunction("getName"),
   getTooltip: getDelegateFunction("getTooltip"),
   isVisible: getDelegateFunction("isVisible"),
   isEnabled: getDelegateFunction("isEnabled"),
   canHaveChildren: getDelegateFunction("canHaveChildren"),
   destroy: getDelegateFunction("destroy"),

   isLoaded: function() {
      return !!this.delegate;
   },
   load: function() {
      var self = this;
      var dfd = this.loadDeferred;
      if (!dfd) {
         dfd = this.loadDeferred = new dojo.Deferred();
         if (this.delegate) {
            dfd.callback(this.delegate);
         }
         else {
            if (!this.actionClass) {
               console.error("Must provide actionClass that is an instance of com.ibm.social.layout.Action");
               throw "Must provide actionClass that is an instance of com.ibm.social.layout.Action";
            }

            var actionClass = this.actionClass;
            var actionBundle = this.actionBundle;
            net.jazz.ajax.xdloader.batch_load_async([actionBundle || actionClass], function(){
               var actionConstructor = dojo.getObject(actionClass);
               if (actionConstructor) {
                  try {
                     self.delegate = self.create(actionConstructor);
                     dfd.callback(self.delegate);
                  }
                  catch(e) {
                     console.error("Error instantiating " + self.actionClass);
                     dfd.errback(e);
                     self.loadDeferred = null;
                  }
               }
               else {
                  console.error("Error loading " + self.actionClass);
                  dfd.errback(new Error("Error loading " + self.actionClass));
                  self.loadDeferred = null;
               }
            });

         }
      }
      return dfd;
   },
   
   /**
    * By default this method will instantiate the delegate class with the same arguments passed to the wrapper class.
    *  
    * @param f the constructor function
    * @return must return a new instance of the action with the appropriate arguments 
    */
   create: function(f) {
      var a = this._args;
      if (a.length <= 6) {
         return new f(a[0],a[1],a[2],a[3],a[4],a[5]);
      }

      var i, args = [];
      for (i=0; i < a.length; i++) {
         args.push("a["+i+"]");
      }
      var evalString = "new f(" + args.join(",") + ")"
      return eval(evalString);
   },
   
   execute: function(selection, context) {
      var self = this;
      var dfd = new dojo.Deferred();
      this.load().addCallback(function(action){
         try {
            var result = action.execute(selection, context);
            dfd.callback(result);
         }
         catch(e) {
            console.error("Error executing " + self.actionClass);
            dfd.errback(e);
         }
      }).addErrback(function(error){
         dfd.errback(error);
      });
      return dfd;
   }
});

}());
