/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define([
	"dojo/_base/declare",
	"dojo/topic",
	"ic-as/notification/util/keys"
], function (declare, topic, keys) {
	
	/**
	 * Base class to handle message publication via dojo and window messaging from frame 
	 * to parent
	 */
	
	var MessageTransport = declare("com.ibm.social.as.notification.util.MessageTransport",
	null,
	{	
		mode: keys.INLINE_MODE,

		constructor: function(mode){
			this.mode = mode;
		},

		sendMessage: function(key, msg){
			if(this.mode === keys.IFRAME_MODE){
				if (window.parent && window.parent.postMessage)
		         window.parent.postMessage(this.constructWindowMessage(key, msg), "*");		     		    	
			}
			 
			topic.publish(key, msg);
		},
		
		constructWindowMessage: function(key, msg){
			var msgResult = key + "|";
			if(msg){
				msgResult += msg;
			}
			return msgResult;
		}
	});
	MessageTransport._Instance = null;
	  
	MessageTransport.getInstance = function(mode){
		if(MessageTransport._Instance == null){
			MessageTransport._Instance = new MessageTransport(mode);
	  	}
	  	return MessageTransport._Instance;
	}
	
	return MessageTransport;
});
