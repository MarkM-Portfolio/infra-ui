/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "dojox/cometd",
      "dojo/_base/array"
], function(cometd, array) {
   var METHODS = [
         "send",
         "receive",
         "registerTransport",
         "getTransportTypes",
         "unregisterTransport",
         "unregisterTransports",
         "findTransport",
         "configure",
         "init",
         "handshake",
         "disconnect",
         "startBatch",
         "endBatch",
         "batch",
         "addListener",
         "removeListener",
         "clearListeners",
         "subscribe",
         "unsubscribe",
         "resubscribe",
         "clearSubscriptions",
         "publish",
         "getStatus",
         "isDisconnected",
         "setBackoffIncrement",
         "getBackoffIncrement",
         "getBackoffPeriod",
         "setLogLevel",
         "registerExtension",
         "unregisterExtension",
         "getExtension",
         "getName",
         "getClientId",
         "getURL",
         "getTransport",
         "getConfiguration",
         "getAdvice"
   ];
   describe("the dojox.cometd object", function() {
      it("implements the expected methods", function() {
         array.forEach(METHODS, function(method) {
            expect(cometd[method]).toEqual(jasmine.any(Function));
         });
      });
   });
});
