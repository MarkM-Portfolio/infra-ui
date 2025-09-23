/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
dojo.provide("com.ibm.social.as.notification.NotificationCenter");
dojo.require("com.ibm.social.as.notification.NotificationsFlyout");
dojo.require("com.ibm.social.as.notification.badging.NotificationCenterBadgeController");
dojo.require("com.ibm.social.as.notification.badging.NotificationCenterInlineBadge");
dojo.require("com.ibm.social.as.util.RouteHelper");
dojo.require("com.ibm.social.as.util.xhr.XhrHandler");
dojo.require("com.ibm.social.as.notification.util.keys");

(function() {

/**
 * Main entry point to the NotificationCenter feature - will initialize all
 * assets and provide controller mechanisms for the Notification Flyout
 */

dojo.declare("com.ibm.social.as.notification.NotificationCenter",
null,
{	
	notificationFlyout: null,
	
	badgingController: null,
	
	topLevelSelectionNode: null,
	
	allNotificationsUrl: null,

    helper: null,

    xhr: null,   
    
    subscriptionHandle: [],
    
    firstLoad: true,
    
    ncMode: com.ibm.social.as.notification.util.keys.INLINE_MODE,
	
	constructor: function(node, mode){
		
		if(mode && mode === com.ibm.social.as.notification.util.keys.IFRAME_MODE){
			this.ncMode = mode;
		}
        this.helper = new com.ibm.social.as.util.RouteHelper({cfg: {userInfo:{id: "id"}}});
        com.ibm.social.as.util.xhr.XhrHandler.init();
        this.xhr = com.ibm.social.as.util.xhr.XhrHandler;        
        this.subscriptionHandle.push(dojo.subscribe(com.ibm.social.as.notification.util.keys.FETCHFEED, dojo.hitch(this, "fetchNotificationFeed")));
        this.subscriptionHandle.push(dojo.subscribe(com.ibm.social.as.notification.util.keys.SHOW, dojo.hitch(this, "handleFlyoutOpen")));
        this.subscriptionHandle.push(dojo.subscribe(com.ibm.social.as.notification.util.keys.HIDE, dojo.hitch(this, "handleFlyoutClose")));
        
        this.setupMessaging();
        this.fetchNotificationCenterStyles()			
		this.initializeBadging(node);
		this.setupTopLevelSelectorNode(node);
		this.loadJQueryComet();
		this.initializeComet();
				
	},
	
	/**
	 * Get the highest level node required to persist selection of the header button
	 * This will differ from Cloud to on-prem
	 */
	setupTopLevelSelectorNode: function(node){
		if(node){
			var parent = node.parentNode;
			this.topLevelSelectionNode = parent;
		}
		
	},
	
	initializeBadging: function(node){		
		this.badgingController = new com.ibm.social.as.notification.badging.NotificationCenterBadgeController({routeHelper: this.helper});
		if(this.ncMode === com.ibm.social.as.notification.util.keys.INLINE_MODE){
			var holderNode = dojo.create("div", null, node);
			new com.ibm.social.as.notification.badging.NotificationCenterInlineBadge({}, holderNode);
		}
		
		this.fetchNotificationFeed(null, "1");
	},
	
	setupMessaging: function(){
		if (window.addEventListener)
			window.addEventListener("message", dojo.hitch(this, this.messageReceived), false);
	    else
	    	window.attachEvent("onmessage", dojo.hitch(this, this.messageReceived));
	},
	
	messageReceived: function(event){
		if (event && event.origin && event.data) {      
			var dataParts = event.data.split("|");
			var msg = dataParts ? dataParts[0] : null;
			if (msg === com.ibm.social.as.notification.util.keys.TOGGLE_NC)
				this.toggle();
		}
	},
	
	/**
	 * Fetch the notification center styles and apply to the dom
	 */
	fetchNotificationCenterStyles: function(){
		var webUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.webresources);
		var rtlParam = (this.isRTL()) ? "Rtl": "";
		webUrl = webUrl + "/web/_style?include=com.ibm.social.as/notification/css/notificationCenter"+rtlParam+".css&etag="+dojo.getObject("ibmConfig.versionStamp");
		var baseLink = dojo.create("link", {
            rel : "stylesheet",  
            type : "text/css",
            href : webUrl
         }, dojo.query("head")[0]);
	},
	
	/**
	 * Listen for the flyout opening - for now if the badge is active make a fresh request
	 * and reset the contents - in future we may be able to track updates via the comet service
	 * however the data is not currently there
	 */
	handleFlyoutOpen: function(){
		var count = this.badgingController.getCount();
		if(count > 0 || this.firstLoad){
			this.fetchNotificationFeed();
			this.firstLoad = false;
		}
		
		if(this.topLevelSelectionNode){
			dojo.addClass(this.topLevelSelectionNode, "lotusSelected");		
		}		
	},		
	
	handleFlyoutClose: function(){
		if(this.topLevelSelectionNode){
			dojo.removeClass(this.topLevelSelectionNode, "lotusSelected");
		}				
	},		
	
	/**
	 * Retrieve the Notification feed which populates the notification center
	 * and provides badge count values.
	 */
	fetchNotificationFeed: function(updatedBefore, count){
		if (this.notificationFlyout) {
			this.notificationFlyout.setupNotificationCenterContent(!updatedBefore);
		}
		
		var notifUrl = this.helper.getNotificationsForMeUrl()+"?count=";
		if(count){
			notifUrl = notifUrl + count;
		} else {
			notifUrl = notifUrl + "10";
		}
		if(updatedBefore){
			notifUrl = notifUrl + "&updatedBefore="+updatedBefore;
		}
        this.xhr.xhrGet({
                url:  notifUrl,
                handleAs: "json",
                load: dojo.hitch(this, function(response) {  
                	if(this.notificationFlyout){
                		this.notificationFlyout.renderNotificationsItems(response);
                	}
                	//only update the badge if your loading first time, otherwise we clear it out on show
                    if(count){
                    	this.badgingController.updateBadging(response.connections.unreadNotifications);
                    }
                }),
                error: function(error) {
                    console.log(error);
                }
            }
        );
    },
	
    
	
	/**
	 * Convenience function toggle the notification center - open if closed
	 * close if opened
	 */
	toggle: function(){
		if(this.notificationFlyout === null){
			var divContainer = dojo.create("div", null, dojo.body());		
			this.notificationFlyout = new com.ibm.social.as.notification.NotificationsFlyout({ncMode: this.ncMode}, divContainer);	
		}		
		this.notificationFlyout.toggle();
	},
	
	isRTL: function() {
		return !dojo._isBodyLtr();
	},
	
	/**
	 * Temporary solution to enable comet push notifications on the header
	 * To be replaced by dojox comet implementation asap
	 */
	loadJQueryComet: function() {
		var path1 = "/push/js/org/cometd.js"
		var path2 = "/push/js/jquery/jquery-1.10.2.js"
		var path3 = "/push/js/jquery/jquery.cookie.js"
		var path4 = "/push/js/jquery/jquery.cometd.js"
		var head = document.getElementsByTagName("head")[0];
		var scriptArr = [path1, path2, path3, path4];
		
		for (var i = 0; i < scriptArr.length; i++) {
			var scriptEl = document.createElement("script");
			scriptEl.type = "text/javascript";		
			scriptEl.src = scriptArr[i];
			scriptEl.defer = "defer";
			scriptEl.async = false;
			
			head.appendChild(scriptEl);
		}		
	},
	
	_handshakeListener: null,
	_subscriber: null,
	
	/**
	 * Initialize the comet handshake and subscription for Jquery cometd
	 */
	initializeComet: function(){	
		var cometLoaded = false;
		var self = this;
		setTimeout(dojo.hitch(this, function() {
			try{
				var cometd = $.cometd;
				cometd.websocketEnabled = false;
				cometd.init("/push/form/comet");
				if (!self._handshakeListener) {
					self._handshakeListener = cometd.addListener('/meta/handshake', cometd, function(message) {				
		        		if (message.successful && self._subscriber === null) {
		        			cometd.batch(function() {
		        			var notifChannel = message.ext.channels.news.url;
				        	self._subscriber = cometd.subscribe(notifChannel, cometd, dojo.hitch( this, function(message) {
								self.badgingController.incrementBadging();
				        	}));
				        });
				    	}
					});
				}
			}catch(err){
				console.log(err);
			}
		}), 10000);			
	}

});

com.ibm.social.as.notification.NotificationCenter.getInstance = function(node, mode) {
	   if(!com.ibm.social.as.notification.NotificationCenter._instance)
		   com.ibm.social.as.notification.NotificationCenter._instance = new com.ibm.social.as.notification.NotificationCenter(node, mode);
	   return com.ibm.social.as.notification.NotificationCenter._instance;
	}

})();
