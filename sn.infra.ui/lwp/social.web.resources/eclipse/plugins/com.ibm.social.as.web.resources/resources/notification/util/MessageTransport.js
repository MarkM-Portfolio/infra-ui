/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
dojo.provide("com.ibm.social.as.notification.util.MessageTransport");

(function() {

/**
 * Base class to handle message publication via dojo and window messaging from frame 
 * to parent
 */

dojo.declare("com.ibm.social.as.notification.util.MessageTransport",
null,
{	
	sendMessage: function(key, msg){
		 if (window.parent && window.parent.postMessage)
	         window.parent.postMessage(this.constructWindowMessage(key, msg), "*");
		 
		dojo.publish(key, [msg]);
	},
	
	constructWindowMessage: function(key, msg){
		var msgResult = key + "|";
		if(msg){
			msgResult += msg;
		}
		return msgResult;
	}
});

})();
