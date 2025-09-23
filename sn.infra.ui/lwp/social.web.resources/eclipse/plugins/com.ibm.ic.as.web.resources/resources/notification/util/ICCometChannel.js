/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define(["dojo/_base/declare"
], function (declare) {
	/**
	 * Basic model of whats required to connect to a comet channel
	 */
	var ICCometChannel = declare(null,
	{
		/**
		 * This is the id of the channel that is returned via the handshake response - message/ext/channels
		 */
		_channelId: null,
		
		/**
		 * Callback function to run when the subscription receives a message
		 */
		_callback: null,
		
		constructor: function(url, callback) {
			this._channelId = url;
			this._callback = callback;
		},
		
		getChannelId: function(){
			return this._channelId;
		},
		
		getChannelCallback: function(){
			return this._callback;
		}
	});
	
	return ICCometChannel;
});
