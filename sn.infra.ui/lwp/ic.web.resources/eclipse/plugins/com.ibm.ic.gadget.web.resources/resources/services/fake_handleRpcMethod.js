/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"../util/trace"
], function (trace) {

	com.ibm.lconn.gadget.services.fake_handleRpcMethod = 
		(function(trace_) {
			/* API to export */
			var api_ = {},
				logString = "osapi._handleRpcMethod called - method not implemented in this container. arguments : ";
			
			api_.registerService = function(container) {
				container.rpcRegister("osapi._handleGadgetRpcMethod", function(){trace_.debug(logString, arguments);})
			};
	
			return api_;
	
		})(trace);
	return com.ibm.lconn.gadget.services.fake_handleRpcMethod;
});
