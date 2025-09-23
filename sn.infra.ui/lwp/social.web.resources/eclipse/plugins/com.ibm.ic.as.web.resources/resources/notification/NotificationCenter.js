/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/_base/array",
	"dojo/query",
	"dojo/topic",
	"dojo/date",
	"dojo/date/stamp",	
	"dojo/on",
	"dojo/keys",
	"dojo/mouse",
	"dojo/_base/event",
	"dojo/dom-attr",
	"dojo/dom-geometry",
	"dojo/aspect",
	"dojo/ready",
	"ic-as/notification/view/NotificationsFlyout",
	"ic-as/notification/badging/NotificationCenterBadgeController",
	"ic-as/notification/badging/NotificationCenterInlineBadge",
	"ic-as/notification/util/keys",
	"ic-as/notification/util/NCKeys",
	"ic-as/constants/events",
	"ic-as/notification/config/NotificationCenterLivePreviewPrefs",
	"ic-as/notification/NotificationPoll",
	"ic-as/util/RouteHelper",
	"ic-as/util/xhr/XhrHandler",
	"ic-as/notification/util/NotificationItemNavigationHandler",
	"ic-as/notification/util/ICCometService",
	"ic-as/notification/util/MessageTransport",
	"ic-as/notification/util/ICNotificationController",
	"ic-core/config/features",
	"ic-core/url",
	"ic-core/config/services",
	"ic-core/theme",
	"./util/NCNewRelic"
], function (declare, lang, windowModule, dom, domClass, domConstruct, domStyle, array, query, topic, date, stamp, dojoOn, dojoKeys, mouse, event, domAttr, domGeom, aspect, dojoReady, NotificationsFlyout, NotificationCenterBadgeController, NotificationCenterInlineBadge, keys, NCKeys, asEvents, NotificationCenterLivePreviewPrefs, NotificationPoll, RouteHelper, XhrHandler, NotificationItemNavigationHandler, ICCometService, MessageTransport, ICNotificationController, features, urlCore, configServices, theme, NCNewRelic) {
	
	/**
	 * Main entry point to the NotificationCenter feature - will initialize all
	 * assets and provide controller mechanisms for the Notification Flyout
	 */
	
	var NotificationCenter = declare("ic-as.notification.NotificationCenter", null,
	{	
		notificationFlyout: null,
		
		badgingController: null,
		
		topLevelSelectionNode: null,

		headerMenuNode: null,

		notificationCenterActionNode: null,

		flyoutContainerNode: null,
		
		allNotificationsUrl: null,
	
	    helper: null,
	
	    xhr: null,   
	    
	    subscriptionHandle: [],
	    
	    firstLoad: true,
	    
	    ncMode: keys.INLINE_MODE,
	    
	    ncLastWeekTimestamp: null,
	    
	    ncLastWeekDate: null,
	    
	    defaultFetchDays: -7,
	    
	    defaultPageSize: "10",
	    
	    defaultPageSizeInt: null,
	    
	    isOpen: false,
	    
	    themeId: null,

	    notifcationFlyoutPosition: null,

	    ncStylesheet: null,

	    livePreviewPrefs: null,

	    onPremNavigated: false,
	    
	    isBadgingInitialized: false,
	    
	    /**
	     * A pausable mouse over handler
	     */
	    headerMouseHandlerEnter: null,
	    headerMouseHandlerLeave: null,
		
		constructor: function(menuNode, flyoutNode, mode){
			if(mode){
				this.ncMode = mode;
			}
	        this.helper = new RouteHelper({cfg: {userInfo:{id: "id"}}});
	        XhrHandler.init();
	        this.xhr = XhrHandler;
	        //init message transport with the current mode - inline|iframe
	        MessageTransport.getInstance(mode);

	        if(this.ncMode !== keys.IFRAME_MODE_MIXED_DOMAIN){	        	
	         // get the focusable element from the header
	         // will add GK setting check here	
	        	if(!features('notification-center-common-navbar')) {       	
		        	var headerLink = query("a", menuNode);      	   
	            }else {   
	            	var headerLink = [menuNode];
	            }           
		        if (headerLink && headerLink.length > 0){
		        	this.notificationCenterActionNode = headerLink[0];
		        }
		        this.livePreviewPrefs = new NotificationCenterLivePreviewPrefs();
		        dojoReady(lang.hitch(this, function(){
		        	this.livePreviewPrefs.requestUserLivePreviewPreferences();       
    			}));		                 
	        }
	        this.badgingController = NotificationCenterBadgeController;
	       
	        
	        //clear out the flyout before insertion (contains loader)
	        if(flyoutNode){
	        	flyoutNode.innerHTML = ' ';  	        	
	        }
	        this.flyoutContainerNode = flyoutNode; 	
	        this.headerMenuNode = menuNode;        
	        this.subscriptionHandle.push(topic.subscribe(keys.FETCHFEED, lang.hitch(this, "fetchNotificationFeed")));
	        this.subscriptionHandle.push(topic.subscribe(asEvents.BADGE_SYNC_MY_NOTIFICATIONS, lang.hitch(this, "setBadgingInitialized")));
	        this.subscriptionHandle.push(topic.subscribe(keys.SHOW, lang.hitch(this, "handleFlyoutOpen")));
	        this.subscriptionHandle.push(topic.subscribe(keys.HIDE, lang.hitch(this, "handleFlyoutClose")));
	        this.subscriptionHandle.push(topic.subscribe(keys.OPEN_NC, lang.hitch(this, "openNC")));
	        this.defaultPageSizeInt = parseInt(this.defaultPageSize);
	        this.setupTimeBoundary();
	        
	        ICNotificationController.requestNotificationPermission();
	        this.initializeBadging(this.notificationCenterActionNode);		       
	        if(this.ncMode !== keys.IFRAME_MODE_MIXED_DOMAIN){	
	        	this.setupMessaging();	        										
				this.setupTopLevelSelectorNode(menuNode);
				this.initNotificationCenterCommunication();		
	        }	        
	        this.initNotificationFlyout();
			//if in mixed domain mode request flyout open and fetch first page
			// we have no control over the outside frame and top action node to track
			// open and close	
			if(this.ncMode === keys.IFRAME_MODE_MIXED_DOMAIN){					
				this.openNC();
			}
		},
		
		setBadgingInitialized: function() {
			this.isBadgingInitialized = true;
		},

		
		/**
		 * Depending on gatekeeper setting we will 1) establish comet channel for long poll
		 * push notifications or 2) setup a short poll solution to check periodically for updates
		 */
		initNotificationCenterCommunication: function(){
			if(features('news-push-service')){
				ICCometService.addCometChannelSubscription("news", lang.hitch( this, function(message) {
					this.handlePushNotification(message);	
	        	}));							
			}
		},
		
		setupTimeBoundary: function(){
			this.ncLastWeekDate = new Date();
			this.ncLastWeekDate = date.add(this.ncLastWeekDate, "day", this.defaultFetchDays);
	        this.ncLastWeekTimestamp = stamp.toISOString(this.ncLastWeekDate, {zulu: true, milliseconds: true});
		},
		
		/**
		 * Get the highest level node required to persist selection of the header button
		 * This will differ from Cloud to on-prem, CNX 7 vs 8 UI
		 */
		setupTopLevelSelectorNode: function(node){
			if(node){
				//setup the event handlers		
				if(!features('notification-center-common-navbar')) {
					this.headerMouseHandlerEnter = dojoOn.pausable(node, mouse.enter, lang.hitch(this, "openNC"));
					this.headerMouseHandlerLeave = dojoOn.pausable(node, mouse.leave, lang.hitch(this, "closeNC"));
				  				  				   
	  				if(typeof window.navigation_banner_onMenuBtnKey !== 'undefined'){
	  	  	  				aspect.after(window, 'navigation_banner_onMenuBtnKey', lang.hitch(this, function(event, menu){
	  		  	  				if(event.keyCode === dojoKeys.ENTER && menu === 'notificationsMenu'){
	  		  	  					this.openNCMouseEnter();
	  		  	  				}  	  				  
	  	  	  				}), true);  					
	  	  			} else {
	  	  					dojoOn(this.notificationCenterActionNode, 'keypress', lang.hitch(this, function(event){
	  	  					if(event.keyCode === dojoKeys.ENTER){
	  	  						this.openNCMouseEnter();
	  	  					}
	  	  				}));
	  	  			}   
  				
				} else{
                    if(typeof ui !== undefined && ui._check_ui_enabled())
                    {
                        //@REQUIRED to figure out new way to hitch keypress
                    }
                    else 
                    {
                        dojoOn(this.notificationCenterActionNode, 'keydown', lang.hitch(this, function(event){
                            if(event.keyCode === dojoKeys.ENTER){
                                this.openNCMouseEnter();
                            }
                        }));

                        dojoOn(this.notificationCenterActionNode, 'click', lang.hitch(this, function(event){
                            this.openNCMouseEnter();
                        }));
                    }
				}
	            	
  				this.notifcationFlyoutPosition = domGeom.position(node, true);
				var parent = node.parentNode;
				this.topLevelSelectionNode = parent;
			}			
		},

		navigateNotifications: function(){
			this.flyoutContainerNode = dom.byId("notificationsMenu");				         	
	        if(this.flyoutContainerNode && !this.onPremNavigated){			      
	        	this.onPremNavigated = true;
	        	this.flyoutContainerNode.innerHTML = '';   
	        	domConstruct.place(this.notificationFlyout.domNode, this.flyoutContainerNode);
	        	//Remove duplicate role of dialog
				var dialog = dojo.query(dojo.byId("lconnheadermenu-notifications"));
	            if(dialog && dialog[0]){
	            	domAttr.remove(dialog[0], "role");
	            }
	        	this.openNC();
	         }		        
		},
		
		/**
		 * Initialize the badge icon and initial unread number
		 */
		initializeBadging: function(node){		
			var inlineBadge = new NotificationCenterInlineBadge({});
			if(node){
					inlineBadge = new NotificationCenterInlineBadge({});
					if(this.ncMode !== keys.INLINE_MODE && this.ncMode !== keys.INLINE_MODE_ONPREM){
						//inline styles required to function in non oneui environments - ref lotusAccess
						if(inlineBadge.ariaNewNotification){
							var lotusAccess = {
							    position: 'absolute',
	                     		top: '-3000px',
	                     		left: '-9999px'
	                  		};
						   	domStyle.set(inlineBadge.ariaNewNotification, lotusAccess);
						   	domStyle.set(inlineBadge.ncBadge, lotusAccess);
						}
						domClass.add(inlineBadge.notificationCenterBadge, "icBanner-badge-iframe");	
					}
					
					domStyle.set(inlineBadge.domNode, 'position', 'relative');
						
					this.placeBadge(inlineBadge, node);
				}
			window.setTimeout(lang.hitch(this, function(){
				if(!this.isBadgingInitialized){
					NotificationPoll.fetchNewNotificationsInfo();	
				}
			}), 6000);
		},	
		
		placeBadge: function(inlineBadge, node){
			if(features('notification-center-common-navbar') && this.ncMode !== keys.INLINE_MODE_ONPREM) {	
				domClass.add(inlineBadge.notificationCenterBadge, "icBanner-badge-newNav");	
				domConstruct.place(inlineBadge.domNode, node, 1);
			}else if(this.ncMode === keys.INLINE_MODE_ONPREM){
				domClass.add(inlineBadge.notificationCenterBadge, "icBanner-badge-onprem");	
				domConstruct.place(inlineBadge.domNode, node, 1);
			}else{
				domConstruct.place(inlineBadge.domNode, node);
			}
		},
		
		setupMessaging: function(){
			if (window.addEventListener)
				window.addEventListener("message", lang.hitch(this, this.messageReceived), false);
		    else
		    	window.attachEvent("onmessage", lang.hitch(this, this.messageReceived));
		},
		
		messageReceived: function(evt){
			if (evt && evt.origin && evt.data && evt.data.split) {      
				var dataParts = evt.data.split("|");
				var msg = dataParts ? dataParts[0] : null;
				switch(msg) {
				case keys.TOGGLE_NC:
				    this.toggle();
				    break;
				case keys.OPEN_NC:
				    this.openNC();
				    break;				
				}
			}
		},
		
		/**
		 * Listen for the flyout opening - for now if the badge is active make a fresh request
		 * and reset the contents - in future we may be able to track updates via the comet service
		 * however the data is not currently there
		 */
		handleFlyoutOpen: function(){
			if(this.isOpen){
				return;
			}		
			
			NCNewRelic.track(NCKeys.OPEN_NC_FLYOUT);
			
			if(this.ncMode !== keys.IFRAME_MODE_MIXED_DOMAIN && !features('notification-center-common-navbar')){	
				this.headerMouseHandlerEnter.pause();
				this.headerMouseHandlerLeave.resume();
			}
			
			this.isOpen = true;
			var count = this.badgingController.getCount();
			if(count > 0 || this.firstLoad){
				this.notificationFlyout.resetPaging();
				this.fetchNotificationFeed();
				this.firstLoad = false;
			}
			
			if(this.topLevelSelectionNode){
				domClass.add(this.topLevelSelectionNode, "lotusSelected");		
			}		
		},		
		
		handleFlyoutClose: function(isKeyPress){
			NCNewRelic.track(NCKeys.CLOSE_NC_FLYOUT);
			this.isOpen = false;
			if(this.ncMode !== keys.IFRAME_MODE_MIXED_DOMAIN  && !features('notification-center-common-navbar')){	
				this.headerMouseHandlerLeave.pause();	
				this.headerMouseHandlerEnter.resume();
			}
			
			if(this.topLevelSelectionNode){
				domClass.remove(this.topLevelSelectionNode, "lotusSelected");				
			}	
			if(isKeyPress && this.notificationCenterActionNode){
				if(!features('notification-center-common-navbar')) {						
					this.handleSmartCloudFlyoutClose();	
				}							
				this.notificationCenterActionNode.focus();
			}							
		},	
		
		isCommonNavBarActive: function(){
			return (typeof commonNavBar !== 'undefined' && commonNavBar);
		},

		handleSmartCloudFlyoutClose: function(){
			//smartCloud close handler
			if(typeof navigation_banner_hideMenuNoDelay !== 'undefined'){
				navigation_banner_hideMenuNoDelay(null,this.flyoutContainerNode.id, this.headerMenuNode.id);
			}	
		},

		handleSmartCloudFlyoutOpen: function(){
			//smartCloud close handler
			if(typeof navigation_banner_showMenu !== 'undefined'){
				navigation_banner_showMenu(this.flyoutContainerNode.id, this.headerMenuNode.id);
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
				notifUrl = notifUrl + this.defaultPageSize;
			}
			
			if(updatedBefore){
				notifUrl = notifUrl + "&updatedBefore="+updatedBefore;
			} 
			//always add our maxAge constraint
			notifUrl = notifUrl + "&updatedSince="+this.ncLastWeekTimestamp;
	        this.xhr.xhrGet({
	                url:  notifUrl,
	                handleAs: "json"                
	        }).then(lang.hitch(this, function(data){	        		               
	        	this.handleNotificationFeed(data, count);
	        	NCNewRelic.setItems(data);
	        }), function(error){
	        	console.log(error);
	        });
	    },

	    /**
		 * Request an individual notification from activityStream
		 * and handle the result
		 * 1) update the badge
		 * 2) create the html5 popup
		 * 3) pop the update onto the flyout
		 * 
		 * @param  {String} id of the Activity|Story
		 */
		requestSingleNotification: function(id){
			var notifUrl = this.helper.getActivityByIDUrl(id);							
	        XhrHandler.xhrGet({
	                url:  notifUrl,
	                handleAs: "json"                
	        }).then(lang.hitch(this, function(data){
	        	var activity = data.entry;       		               
				this.notificationFlyout.pushNotification(activity)
	        }), function(error){
	        	console.log(error);
	        });			
		},

		/**
		 * When a push notification arrives fetch the activity
		 * and push to the flyout and update the badge numbers
		 * @param  {[type]} message [description]
		 * @return {[type]}         [description]
		 */
		handlePushNotification: function(message){	
			
			var inNotificationList = false;
					
			var pushNotifications = (message.data && message.data.messages) ? message.data.messages : message.data.items;
			if(pushNotifications && pushNotifications.length > 0){
				var notificationItem = (pushNotifications[0].message) ? pushNotifications[0].message: pushNotifications[0];
				
				if(this.isNotificationLiveUpdatesEnabled(message, notificationItem)){
					this.requestSingleNotification(notificationItem.storyId);	
				}									
				
				if(this.notificationFlyout && this.notificationFlyout.NotificationsFeed){
					array.forEach(this.notificationFlyout.NotificationsFeed, lang.hitch(this, function(item){
						
							if (this.trimId(item.getId()) === this.trimId(notificationItem.storyId)) {
			    				inNotificationList = true; 
			    			}
			        }));	
					
				}
				
				if(notificationItem.viewCounts && notificationItem.viewCounts.notifications && !inNotificationList){	
					NCNewRelic.track(NCKeys.HANDLE_PUSH_NOTIFICATION, {ncUnreadNotifications: notificationItem.viewCounts.notifications});
					this.badgingController.updateBadging(notificationItem.viewCounts.notifications);
					this.badgingController.updateASSideNavBadging(notificationItem);
				}
			}
		},

		/**
		 * Centrally manage the conditions for allowing live notification popups
		 * 1) gatekeeper
		 * 2) secondary slave window (not holding the comet connection)
		 * 3) block IE as it does not support html5 notification standards
		 * 4) User preference for the current message notification type (mention or not)
		 * @param  {Object}  message          Message from comet channel
		 * @param  {Object}  notificationItem Notification message from comet channel
		 * @return {Boolean}                  True if notification live update is allowed
		 */
		isNotificationLiveUpdatesEnabled: function(message, notificationItem){
			if(features('notification-center-live-updates') && (typeof message.icWindowChannel === 'undefined')
				&& (typeof features('ie') === 'undefined')){
				if(this.livePreviewPrefs.isNotificationAllowed(notificationItem)){
					return true;
				}
			}
			return false;
		},
	    
	    /**
	     * Take the data from the notification feed and process.
	     * If count = 1 then update the badge otherwise update
	     * the flyout with results
	     */
	    handleNotificationFeed: function(data, count){
	    	if(this.notificationFlyout && count !== '1'){
        		data.list = this.filterEntriesById(data.list, this.notificationFlyout.getCurrentLastItem());	                		
        		this.notificationFlyout.renderNotificationsItems(data);
        		topic.publish(keys.FEEDFETCHED);
        	}
        	//only update the badge if your loading first time, otherwise we clear it out on show
            if(count){
            	this.badgingController.updateBadging(data.connections.unreadNotifications);
            }	
	    },
	    
	    /**
		 * Starting at index 0, search through the entries array. If an entry is found
		 * with an id matching the 'id' param, slice the array up until that point.
		 * @param entries {Array} response entries coming back from the AS feed.
		 * @param item {String} last item currently on the glass.
		 * @returns {Array} a potentially cropped entries array.
		 */
		filterEntriesById: function(entries, item){
			if(!entries || !item){
				return entries;
			}
			
			// Iterate through the entries, removing all found
			// up until the id we have.
			for(var e = 0; e < entries.length; e++){
				var entry = entries[e];
				
				if(entry.id == item.id){
					// Found our news item
					return entries.slice(e + 1);
				}
			}
			
			// No entries found with id, return passed entries
			return entries;
		},
		
		/** 
		 * Trim text from story Id
		 */
		trimId: function(storyId){
			var i = storyId.lastIndexOf(':');
			if (i != -1) {
			    return storyId.substr(i);
			} else {
				return null;
			}
		},
			    		
		/**
		 * Convenience function toggle the notification center - open if closed
		 * close if opened
		 */
		toggle: function(e){
			this.notificationFlyout.toggle(e);
			if(e){
				event.stop(e);
			}
		},

		/**
		 * Convenience function open the notification center
		 */
		openNCMouseEnter: function(e){	
			if(this.ncMode === keys.INLINE_MODE_ONPREM && this.flyoutContainerNode === null){
				return
			}		
			this.notificationFlyout.show();
		},

		/**
		 * Convenience function open the notification center
		 */
		openNC: function(e){
			if(this.ncMode === keys.INLINE_MODE_ONPREM && this.flyoutContainerNode === null){
				return
			}	
			this.notificationFlyout.show(e);
			if(e){
				event.stop(e);
			}
		},
		
		/**
		 * Convenience function open the notification center
		 */
		closeNC: function(e){
			this.notificationFlyout.hide();
			if(e){
				event.stop(e);
			}
		},				
		
		isRTL: function() {
			return !dojo._isBodyLtr();
		},

		initNotificationFlyout: function(){
			if(this.notificationFlyout === null){
				var containerNode = (this.flyoutContainerNode) ? this.flyoutContainerNode : windowModule.body();
				var divContainer = domConstruct.create("div", null, containerNode);		
				this.notificationFlyout = new NotificationsFlyout({ncPosition: this.notifcationFlyoutPosition, ncMode: this.ncMode, defaultPageSize: this.defaultPageSizeInt, helper: this.helper}, divContainer);
				if(this.flyoutContainerNode){
					//when container is present, flyout is injected directly so show by default to ensure menu opens with correct dimensions
					//onprem header defers loading to menu action.
					this.notificationFlyout.showFlyoutDom();
				}
			}	
		}
	
	});
	
	NotificationCenter._Instance = null;
	NotificationCenter._Init = false;
	  
	/**
	 * Intialize the instance, place an init lock to ensure to processes dont attempt to
	 * bootstrap the NotificationCenter
	 */
	NotificationCenter.getInstance = function(menuNode, flyoutNode, mode){
		if(NotificationCenter._Instance == null && NotificationCenter._Init === false){
			NotificationCenter._Init = true;
			NotificationCenter._Instance = new NotificationCenter(menuNode, flyoutNode, mode);
			NotificationCenter._Init = false;
	  	}
	  	return NotificationCenter._Instance;
	}
	
	// Define the as_console_debug wrapper if required
	// Might be pre-defined by AS gadget, in which case do not overwrite
	if ( !window.as_console_debug ) {
		(function() { // anon function so we are not cluttering global with vars.
			var s = window.location.search;
			var enableLogging = s && ( 
						s.indexOf("debug=dojo") != -1 || 
						s.indexOf("debug=true") != -1 ||
						s.indexOf("debug-as") != -1 );
			if ( enableLogging && window.console && window.console.debug ) {
				try {
					// Safari & IE do not like assigning console.debug to something
					// Will throw exception
					window.as_console_debug = window.console.debug;
					window.as_console_debug("Create as_console_debug()");
				} catch ( e ) {
					// fall back to more basic version
					window.as_console_debug = function() {
						var msg = "", i;
						for ( i = 0; i < arguments.length; i++ ) {
							msg += arguments[i] + " ";
						}
						window.console.debug(msg);
					};
				}
			} else {
				window.as_console_debug = function() {};
			}
		})();
	};
	
	return NotificationCenter;
});
