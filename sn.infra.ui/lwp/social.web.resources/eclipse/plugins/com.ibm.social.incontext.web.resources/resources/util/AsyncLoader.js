/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.util.AsyncLoader");

dojo.declare("com.ibm.social.incontext.util.AsyncLoader", null, {
   constructor: function(opt) {
      dojo.mixin(this,opt);
      this._requests = [];
      this._plannedRequests = [];
      this._errors = [];
      this._runningRequests = 0;
   },
   add: function() {
      this._plannedRequests.push(arguments);   
   },
   size: function() {
      return this._plannedRequests.length;
   },
   cancel: function() {
      dojo.forEach(this._requests, function(request) { if (request && request.dojoRequest) request.dojoRequest.cancel(); });
      this._requests = [];
      this._plannedRequests = [];
      this._runningRequests = 0;
   },
   handleRequest: function(response, ioArgs) {
      //console.log("AsyncLoader::handleRequest DEBUG request completed ['"+ioArgs.args.originalHandler+"'], total running="+this._runningRequests);
      var running = this._runningRequests;
      for (var i=0; i<this._requests.length; i++) {
         var r = this._requests[i];
         if (r && r.originalHandler == ioArgs.args.originalHandler) {
            //console.log("AsyncLoader::handleRequest DEBUG   executing handler i="+i);
            running = --this._runningRequests;
            this._requests[i] = null;
            var f = typeof ioArgs.args.originalHandler == "function" 
                  ? ioArgs.args.originalHandler
                  : this[ioArgs.args.originalHandler];
            var result = f.apply(this, arguments);
            if (result) {
               //console.log("AsyncLoader::handleRequest DEBUG     handler failed e="+result);
               this._errors.push(result);
               if (this.onRequestCompleted(result)) {
                  //console.log("AsyncLoader::handleRequest DEBUG   cancelling requests");
                  this.cancel();
               }
            }
            break;
         }
      }
      if (running < 1) {
         //console.log("AsyncLoader::handleRequest DEBUG all handlers complete, show result ['"+ioArgs.args.originalHandler+"']");
         var errors = this._errors;
         this._errors = [];
         this._requests = [];
         this._plannedRequests = [];
         this._runningRequests = 0;
         this.onRequestsCompleted(errors);
      }
      //else
         //console.log("AsyncLoader::handleRequest DEBUG more handlers remain ['"+ioArgs.args.originalHandler+"']");
   },
   start: function() {
      if (this._runningRequests > 0)
         throw "Requests already running, call cancel() first";
      if (this._plannedRequests) {
         this._runningRequests = this._plannedRequests.length;
         for (var i=0; i<this._plannedRequests.length; i++)
            this._requestSingle.apply(this, this._plannedRequests[i]);
      }
   },
   _requestSingle: function(url, handler, handleAs, timeout) {
      // Add to the _requests queue before calling net.get, in case of cached content completing immediately
      var request = {originalHandler: handler};
      this._requests.push(request);
      request.dojoRequest = this.net.get({
         originalHandler: handler,
         url: url,
         handle: dojo.hitch(this, this.handleRequest),
         timeout: timeout,
         handleAs: handleAs || "xml"
      });
   },
   /** All async requests have completed, finish processing */
   onRequestsCompleted: function(errors) {},
   /** Return true to cancel all remaining requests */
   onRequestCompleted: function(error) {return false;}
});