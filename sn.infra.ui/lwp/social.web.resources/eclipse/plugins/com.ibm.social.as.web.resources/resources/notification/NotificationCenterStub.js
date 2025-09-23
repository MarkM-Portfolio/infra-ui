/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 *	Stub to prefetch Notification Center and initialize
 */
(function() {
dojo.provide("com.ibm.social.as.notification.NotificationCenterStub");
dojo.require("net.jazz.ajax.xdloader");

var TIMEOUT = 4000;

var loaded = false;
function _notificationCenterLoaded(cb) {
	loaded = true;
	if (typeof cb === 'function') cb();
}

function _loadNotificationCenter(cb) {
	net.jazz.ajax.xdloader.load_async("com.ibm.social.as.notification.NotificationCenter", dojo.partial(_notificationCenterLoaded, _initNotificationCenter));
}
function _initNotificationCenter() {
	var notificationCenterLandmark = dojo.byId("notificationCenterNode");
	if(notificationCenterLandmark){
		com.ibm.social.as.notification.NotificationCenter.getInstance(notificationCenterLandmark);	
	}
	
}

dojo.addOnLoad(function() {
	//This kicks off the request to load the notification center resources after a small timeout
	//we only do this if the notification center button is in the header which is controlled by gateway
	var ncNode = dojo.byId("lotusBannerNotifications");
	if(ncNode && (dojo.style(ncNode,"display") != "none")) {
		setTimeout(function() {
			_loadNotificationCenter(_initNotificationCenter);
		}, TIMEOUT);
	}
});

})();
