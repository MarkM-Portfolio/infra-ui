/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/topic",
	"ic-as/constants/events",
	"ic-as/util/RouteHelper",
	"ic-as/util/xhr/XhrHandler"
], function(declare, lang, topic, events, RouteHelper, XhrHandler) {
		
	var BadgingUtil = declare(null, {

		subscriptionHandle: null,

		constructor: function() {
			this.subscriptionHandle = topic.subscribe(events.BADGE_RESET_AMD, lang.hitch(this, "resetBadge"));
		},

		/**
		 * Utility method to fire of a reset request
		 */
		resetBadge: function(id) {
			var url = RouteHelper.getInstance().getBadgeResetUrl(id);
			XhrHandler.xhrGet({
				url: url,
				handleAs: "json",
				preventCache: true				
			}).then(function(data){}, function(err){
			    console.log(err);
			});
		},

		destroy: function() {
			this.subscriptionHandle.remove();
		}
	});
	
	BadgingUtil._Instance = null;
	  
	BadgingUtil.getInstance = function(){
		if(BadgingUtil._Instance == null){
			BadgingUtil._Instance = new BadgingUtil();
	  	}
	  	return BadgingUtil._Instance;
	}
	
	return BadgingUtil.getInstance();
});
