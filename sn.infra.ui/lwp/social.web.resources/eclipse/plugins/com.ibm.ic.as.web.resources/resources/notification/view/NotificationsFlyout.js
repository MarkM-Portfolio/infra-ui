/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
	"dojo",
	"dojo/dom-construct",
	"dojo/_base/declare",
	"dojo/i18n!ic-as/nls/activitystream",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/on",
	"dojo/dom",
	"dojo/text!./templates/NotificationsFlyout.html",
	"dojo/topic",
	"dojo/date",
	"dojo/date/stamp",
	"dojo/_base/event",
	"dojo/dom-style",
	"dojo/keys",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/registry",
	"ic-core/config/features",
	"./NotificationsItem",
	"../util/MessageTransport",
	"../util/keys",
	"../util/NCKeys",
	"../util/MarkReadUtil",
	"./NoNotificationView",
	"ic-as/util/LinkTarget",
	"ic-as/util/RouteHelper",
	"ic-core/url",
	"ic-core/config/services",
	"ic-core/config/properties",
	"../util/NCNewRelic"
], function (dojo, domConstruct, declare, i18nactivitystream, array, lang, domClass, on, dom, template, topic, date, stamp, event, domStyle, eventKeys, _Templated, _Widget, registry, features, NotificationsItem, MessageTransport, keys, NCKeys, MarkReadUtil, NoNotificationView, LinkTarget, RouteHelper, urlCore, servicesCore, genericProperties, NCNewRelic) {

	/**
	 * Widget used to display the notification center flyout
	 * @author Johann ott
	 */
	
	var NotificationsFlyout = declare("com.ibm.social.as.notification.NotificationsFlyout",
	[_Widget, _Templated, LinkTarget],
	{
		templateString: template,

		allNotificationsUrl: null,
	
	    NotificationsFeed: null,
	
	    notificationItem: null,
	
	    newNotifications: null,
	
	    NotificationCount: 0,
	
	    settingsUrl: null,
	    
	    ncMode: null,
	    
	    defaultPageSize: null,
	    
	    pagingFinished: false,
	    
	    noNotificationWidget: null,

	    readAllAction: null,
	    
	    helper: null,

	    ncPosition: null,

	    isPaging: false,
	    
	    isOrientEnabled: false,
	    		
	    isActionCenterEnabled: false,
	    	    	    
	    /**
	     * Flag to signify allow/block fetching by scroll
	     * will be set when in the middle of a request
	     */
	    allowScrollCheck: false,
	    
	    strings: i18nactivitystream,
	
	    /**
	     * Called before the widget is rendered in the UI.
	     */
	    postMixInProperties: function(){    
	    	this.allNotificationsUrl = RouteHelper.getInstance().getNotificationsForMeWebUrl();
	    	var contextPath = urlCore.getServiceUrl(servicesCore.homepage).uri;
	        this.settingsUrl = urlCore.getServiceUrl(servicesCore.news).uri;
	        this.inherited(arguments);        
	    },
	
	    postCreate: function(){
	    	this.inherited(arguments);
	    	
	    	this.isOrientEnabled = servicesCore && servicesCore.orient ? true : false;
			this.isActionCenterEnabled = this.isOrientEnabled && genericProperties && genericProperties.actioncenter == 'enabled' ? true : false;
			/* disable the new actioncenter forcibly for IE 11 */
			if (!!navigator.userAgent.match(/Trident.*rv\:11\./))
				this.isActionCenterEnabled = false;

	    	if(features("news-read-status-enabled")){
	    		domClass.remove(this.readAllAction, "lotusHidden");
	    		this.own(    
	    			on(this.readAllAction, "click", lang.hitch(this, function(e){
            			this.handleMarkAllRead(e);
            			NCNewRelic.track(NCKeys.MARK_ALL_READ, {domEventType: e.type});
    	       		})),
    	       		on(this.readAllAction, "keypress", lang.hitch(this, function(e){
    			    	if(eventKeys.ENTER === e.keyCode && !e.shiftKey){
    			    		this.handleMarkAllRead(e);
    			    		NCNewRelic.track(NCKeys.MARK_ALL_READ, {domEventType: e.type});
    			    	}
    				})),
    				on(this.readAllAction, "keydown", lang.hitch(this, function(e){
    			    	if(eventKeys.ENTER === e.keyCode && !e.shiftKey){
    			    		this.handleMarkAllRead(e);
    			    		NCNewRelic.track(NCKeys.MARK_ALL_READ, {domEventType: e.type});
    			    	}
    				}))
    	       	);
	    	}

	    	if(this.ncMode && this.ncMode === keys.IFRAME_MODE){
	    		domClass.add(this.domNode, "icBanner-frame");
	    	}

	    	if(features("ie") <= 8){
	    		domClass.add(this.domNode, "ie8");	
	    	}   	
	    	
	    	 if(features("ie")){
	    	 	this.own(            	
	    	 		on(this.domNode, "focusout", lang.hitch(this, "handleFocusOut"))
	    	 	);	    		
	    	 }
	    	 
	    	if(this.isActionCenterEnabled){
	    		this.own(
	    		  on(window, "message", lang.hitch(this, function(evt){
	    			switch(evt.data){
	    			  case keys.HIDE_ACTION_CENTER:
	    				this.hide();
	    			    break;
	    			  case keys.ACTION_CENTER_CLEAR_BADGE:
	    				topic.publish(keys.FEEDFETCHED); 
	    				break;
	    			}
	    		}))
	 	      );	
	    	}

	    	this.own(            	
            	on(this.domNode, "mouseleave", lang.hitch(this, "handleMouseOut")),            	
            	on(this.domNode, "keypress", lang.hitch(this, function(evt){
				    switch(evt.keyCode){
				      case eventKeys.ESCAPE:
				        this.hide(true);				        		     				        
				        break;
				    }
				})), // ensure forward tab stop going out of dialog and back to top
				on(this.seeAllLink, "keypress", lang.hitch(this, function(evt){
			    	if(eventKeys.TAB === evt.keyCode && !evt.shiftKey){
			    		NCNewRelic.track("seeAllLink", {domEventType: evt.type});
				    	this.focusTopLevel();
				        if(evt){
				        	event.stop(evt);	
				        }	
			    	}
				})),//stop backwards tab out of dialog
				on(this.readAllAction, "keypress", lang.hitch(this, function(evt){
			    	if(eventKeys.TAB === evt.keyCode && evt.shiftKey){				    	
			    		this.focusBottomLevel();
				        if(evt){
				        	event.stop(evt);	
				        }	
			    	}
				})),
				on(this.seeAllLink, "click", lang.hitch(this, function(evt){
					NCNewRelic.track(NCKeys.SEE_ALL_LINK, {domEventType: evt.type});
				})),
				on(this.settingsLink, "click", lang.hitch(this, function(evt){
					NCNewRelic.track(NCKeys.SETTINGS_LINK, {domEventType: evt.type});
				})),			
				
    	       	topic.subscribe(keys.FOCUS, lang.hitch(this, "focusTopLevel"))
      		);	 
	        
	    	
		},   
		
	
		/**
		 * Load the next page of results - if we have not reached the last page
		 */
	    loadStreamMore: function() {	    	
    		//Loading logic	        
	        this.allowScrollCheck = false;
	        this.isPaging = true;
	        //Fetch
	        var lastItem = this.getCurrentLastItem();	        
			var updatedBefore= lastItem.published;
	        topic.publish(keys.FETCHFEED, updatedBefore);    		
	    },
	    
	    /**
	     * clear out the content
	     */
	    destroyContent: function(){
	    	array.forEach(registry.findWidgets(this.notificationItem), function(widget){
				widget.destroyRecursive();
			});
	    	
	    	if(this.noNotificationWidget){
	    		this.noNotificationWidget.destroy();
	    	}
			
			domConstruct.empty(this.notificationItem);
			this.NotificationsFeed = undefined;
	    },
	    
	    showLoader: function(){
	    	if(this.loadingNode){
	    		domClass.remove(this.loadingNode, "lotusHidden");
	    	}    	
	    },
	    
	    hideLoader: function(){
	    	if(this.loadingNode){
	    		domClass.add(this.loadingNode, "lotusHidden");
	    	}    	
	    },
	
	    /**
	     * Called at the start of a fetch for items - here we will setup the
	     * area pre loading items
	     */
	    setupNotificationCenterContent: function(destroy){
	    	if(destroy){
	    		this.destroyContent();
	    		this.showLoader();
	    	}    	
	    },
	
	    /**
	     * Process returned feed and render the Items in the flyout
	     * NB - we check for the last page in following way
	     * 1) if we are older than a week
	     * 2) if we newer than a week and return a result with the same rollupId
	     * which will mean we have reached the end of updates
	     */
	    renderNotificationsItems: function(response) {    	    	    	
	    	if(response.connections.unreadNotifications > 0){
	            this.newNotifications = dojo.string.substitute(this.strings.newNotifications, [response.connections.unreadNotifications]);
	        }
	    		    		    		    	
	    	if(!this.pagingFinished){
		    	this.NotificationsFeed = response.list;
		    	if(this.NotificationsFeed != null && this.NotificationsFeed.length > 0){
		    		var fragment = document.createDocumentFragment();
		    		array.forEach(this.NotificationsFeed, lang.hitch(this, function(item){
			    		//check we are not past the week cutoff point when paging	
		    			
		    			if(typeof item.object.url == "undefined")
		    			{
		    				if(typeof gllConnectionsData == "object" || typeof icUser == "object")
		    				{
		    					var user_id = typeof gllConnectionsData == "object" ? gllConnectionsData.userId : icUser.id;
		    					item.object.url = '/profiles/html/profileView.do?userid='+user_id;
		    				}
		    				else
		    				{
		    					item.object.url = '/profiles/html/profileView.do?userid='+item.actor.id.substring(item.actor.id.indexOf('person:')+7);
		    				}
		    			}
		    			
			            this.NotificationCount++;
			            var NotificationItem = new NotificationsItem({
			            	position: this.NotificationCount,
			                data : item,
			                helper: this.helper
			            });
			            fragment.appendChild(NotificationItem.domNode);			            
			        }));	
		    		domConstruct.place(fragment, this.notificationItem);
		    	} else if(!this.isPaging) {
		    		this.noNotificationWidget = new NoNotificationView();
		    		domConstruct.place(this.noNotificationWidget.domNode, this.contentNode);
		    	}		    	   
	    	}
	    	
	    	if(this.isLastPage(response)){
	    		this.pagingFinished = true;
	    	}
	    	
	    	this.hideLoader();
	        this.allowScrollCheck = true;
	        this.modifyContentLinkTargets(this.domNode);

	    },	 

	    /**
	     * Push a notification onto the flyout in realtime
	     * @param  {Object} data from Activity item
	     */
	    pushNotification: function(item){
	    	var notifItem = new NotificationsItem({
                data : item,
                helper: this.helper
			});
	    	NCNewRelic.trackNotificationItem(NCKeys.REQUEST_SINGLE_NOTIFICATION, "push", "", item.object.objectType, item.verb);
	    	//TODO place item onto the glass if initial feed is rendered
	    	//domConstruct.place(notifItem.domNode, this.notifItem);	    	
    		var popupItem = notifItem.generateNotificationPopup();
			popupItem.createPopup();
	    	notifItem.destroy();			
	    },	    	    
	    
	    /**
	     * Check for last page
	     * 1) were less than defaultPageSize returned
	     * 2) The current page has returned a first item which is dentical 
	     * to the previous page last item. (matched to the same milisecond
	     * note paging is not provided by ActivityStream API)
	     */
	    isLastPage: function(response){
	    	if(response){
	    		if(response.itemsPerPage < this.defaultPageSize){
	    			return true
	    		}	    	
	    	}
	    	return false;
	    },
	    
	    getCurrentLastItem: function(){
	    	if(this.NotificationsFeed){
	    		return this.NotificationsFeed[this.NotificationsFeed.length - 1];
	    	}
	    },
	
	    checkScroll: function() {
	        var triggerPoint = 25; //50px from the bottom of stream
	        if (!this.pagingFinished && this.allowScrollCheck && (this.contentNode.scrollTop >= this.contentNode.scrollHeight - this.contentNode.clientHeight - triggerPoint)) {
	        	this.loadStreamMore();
	        	NCNewRelic.track(NCKeys.SCROLLING);
	        }
	    },
	    
	    show: function(e){
	    	this.showFlyoutDom();
	    	if(e){
	    		event.stop(e);
	    	}
	    	MessageTransport.getInstance().sendMessage(keys.SHOW);
	    	this.focusTopLevel();
	    },
	    
	    hide:function(isKeyPress){
	    	MessageTransport.getInstance().sendMessage(keys.HIDE, isKeyPress);
	    },
	    
	    showFlyoutDom: function(){
	    	if(this.isActionCenterEnabled){
	    		window.postMessage(keys.SHOW_ACTION_CENTER, '*');
	    	} else {
	    		domClass.remove(this.domNode, "lotusHidden");
	    	}
	    },

	    hideFlyoutDom:function(){
			domClass.add(this.domNode, "lotusHidden");
	    },

	    focusTopLevel: function(){
			this.readAllAction.focus();
	    },

		focusBottomLevel: function(){
			this.seeAllLink.focus();
	    },	    
	    
	    toggle: function(e){
	    	if(domClass.contains(this.domNode, "lotusHidden")){
	    		this.show(e);
	    	} else { 
	    		this.hide();
	    	}
	    },
	    
	    resetPaging: function(){
	    	this.pagingFinished = false;
	    },

	    /**
	     * Handle a request to toggle the current read status of the 
	     */
	    handleMarkAllRead: function(e){	    				
	    	var markReadProm = MarkReadUtil.markAllNotificationsRead();
	    	
	    	markReadProm.then(lang.hitch(this, function(data){
	        	this.markAllNotificationsRead();	        		   
	        }), function(error){
	        	console.log(error);
	        });

	    	if(e){
	    		event.stop(e);	
	    	}	    		
	    },

	    /**
	     * Visit all sub notificationItem widgets and mark them visually
	     * as read.
	     */
	    markAllNotificationsRead: function(){
			array.some(registry.findWidgets(this.notificationItem), function(widget){
				if(widget.setMarkRead){
					widget.setMarkRead();					
				}
			});
	    },


	    /**
	     * Auto hide on mouseout - put in a small timeout to match menu items
	     * @param e
	     * @returns
	     */
	    handleMouseOut: function(e){
	    	setTimeout(lang.hitch(this, function() {
	    		this.hide();	
	    	}), 400);	
	    	if(e){
	    		event.stop(e);	
	    	}	
	    	
		},  
	    
	    /**
	     * Auto hide on focusout - put in a small timeout to allow for a user
	     * toggling the view on and off via the header menu item
	     * @param e
	     * @returns
	     */
	    handleFocusOut: function(e){
	    	var target = null;
            if(features("ie") <= 8){
                    target = e.toElement;
            } else {
                    target = e.relatedTarget;
            }
            if(dom.isDescendant(target, this.domNode)){
                    if(e){
                            event.stop(e);
                    }

                    return;
            }
            this._onBlur(e);
		},

		_onBlur: function(e){
			setTimeout(lang.hitch(this, function() {
	    		this.hide();	
	    	}), 200);
	    	if(e && e.preventDefault){
	    		event.stop(e);		
	    	}			    	
		}
	
	});
	return NotificationsFlyout;
});