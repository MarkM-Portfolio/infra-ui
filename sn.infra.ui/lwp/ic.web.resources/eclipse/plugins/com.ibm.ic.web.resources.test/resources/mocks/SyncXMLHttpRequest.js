/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define(function() {
   /**
    * Mock for sync XHR object. Pass a function that returns the desired
    * response, and it will be returned only when needed. Useful for mocking
    * <code>dojo/request/xhr</code>.
    * 
    * @author Claudio Procida <procidac@ie.ibm.com>
    * @class ic-test.mocks.SyncXMLHttpRequest
    * @param {Function}
    *           getResponse A function that returns the desired response
    */
   var noop = function() {
      return;
   };
   function SyncXMLHttpRequest(getResponse) {
      this.getResponse = getResponse;
   }
   SyncXMLHttpRequest.prototype.open = noop;
   SyncXMLHttpRequest.prototype.send = function() {
      this.status = 200;
      this.responseText = this.getResponse();
      this.onLoad();
   };
   SyncXMLHttpRequest.prototype.setRequestHeader = noop;
   SyncXMLHttpRequest.prototype.addEventListener = function(event, callback, flag) {
      switch (event) {
         case 'load':
            this.onLoad = callback;
            break;
      }
   };
   SyncXMLHttpRequest.prototype.removeEventListener = function(event, callback, flag) {
      return;
   };
   return SyncXMLHttpRequest;
});
