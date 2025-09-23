/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-style",
	"net/jazz/ajax/xdloader",
	"ic-as/notification/NotificationCenter",
	"dojo/domReady!"
], function (dojo, lang, dom, domStyle, xdloader, NotificationCenter) {

	/**
	 *	Stub to prefetch Notification Center and initialize
	 */
	
	var TIMEOUT = 4000;
	
	var loaded = false;
	function _notificationCenterLoaded(cb) {
		loaded = true;
		if (typeof cb === 'function') cb();
	}
	
	function _initNotificationCenter() {		
		var ncNode = dom.byId("lotusBannerNotifications");
		if(ncNode && (domStyle.get(ncNode, "display") != "none")) {
			setTimeout(function() {
				var notificationCenterLandmark = dom.byId("notificationCenterNode");
				if(notificationCenterLandmark){
					NotificationCenter.getInstance(notificationCenterLandmark);	
				}
			}, TIMEOUT);
		}				
	}
	
	_initNotificationCenter();
});
