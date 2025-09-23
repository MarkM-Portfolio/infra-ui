/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.action.DeferredAction");
dojo.require("lconn.share.require");
dojo.require("lconn.share.action.Action");

/**
 * A subclass should either declare the member variable "delegateName" or create the delegate in a sub package "impl" 
 * with the same name as the current class.  The create method should be replaced if more than 6 arguments are passed
 * to the delegate class's constructor.
 *    
 * A deferred action MAY implement the following methods in this class, or rely on the super implementation.
 *    isValid
 *    getName
 *    getTooltip
 *    getUrlResource
 *    addExtra
 *     
 * The execute method and all other code related to execution should be implemented in the class "delegateClassName".
 * Do not call dojo.require for the delegate class - the DeferredAction class will correctly load your deferred class
 * definition.   
 */
dojo.declare("lconn.share.action.DeferredAction", [lconn.share.action.Action], {
   /* Subclasses should define at least delegateClassName
   delegateName: null,
   delegateBundle: null,
    */
   PACKAGE_RE: /(.*)\.([^\.]+)$/i,
   
   /* Most delegates will automatically cancel the event, but the event may no longer be available when
    * the delegate loads.  By default, automatically stop the event.
    */
   cancelEvent: true,
   
   constructor: function() {
      this._args = dojo._toArray(arguments);
   },
   
   destroy: function() {
      var a = this.delegate;
      if (a) {
         if (a.destroy)
            a.destroy();
         a.parent = null;
         this.delegate = null;
      }
   },
   
   /**
    * The standard deferred implementation
    */
   execute: function() {
      var arr = dojo._toArray(arguments);
      if (this.cancelEvent) {
         for (var i=0; i<arr.length; i++) {
            var e = arr[i];
            if (e && (typeof e.target != "undefined" || typeof e.bubbles != "undefined"))
               try {arr[i] = null;dojo.stopEvent(e);} catch (ex) {}
         }
      }
      var ret = this._act();
      var dfd = new dojo.Deferred();
      ret.addCallback(function(delegate) {
         try {
            var value = delegate.execute.apply(delegate, arr);
            dfd.callback(value);
         } catch (e) {
            // An error during execution should not prevent future execution
            console.error(e);
            dfd.errback(e);
         }
      });
      return dfd;
   },
   
   /**
    * Instantiates the delegate if necessary
    */
   _act: function() {
      var dfd = this._initDfd;
      if (!dfd) {
         dfd = this._initDfd = new dojo.Deferred();
         var n = this.delegateName;
         var b = this.delegateBundle;
         if (!n) {
            var re = this.PACKAGE_RE.exec(this.declaredClass);
            n = re[1] + ".impl.";
            n += re[2];
         }
         if (!b)
             b = n;
         lconn.share.requireAsync(b, n).addCallback(this, function() {
            var f = dojo.getObject(n);
            this.delegate = this.create(f);
            this.delegate.parent = this;
            dfd.callback(this.delegate);
         }).addErrback(this, function() {this._initDfd = null;});
      }
      return dfd;
   },
   
   /**
    * Delegates that take more than six constructor parameters should declare their own create function.  By default
    * this method will instantiate the delegate class with the same arguments passed to the wrapper class.
    *  
    * @param f the constructor function
    * @return must return a new instance of the action with the appropriate arguments 
    */
   create: function(f) {
      var a = this._args;
      return new f(a[0],a[1],a[2],a[3],a[4],a[5]);
   }
});
