/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
	"dojo",
	"dojo/dom-attr",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/date/stamp",
	"dojo/i18n!ic-as/nls/activitystream",
	"dojo/query",
	"dojo/on",
	"dojo/dom-class",
	"dojo/topic",
	"dojo/keys",
	"dijit/_OnDijitClickMixin",
	"dojo/text!./templates/NotificationsItem.html",
	"dijit/_Templated",
	"dijit/_Widget",	
	"dojo/_base/event",
	"ic-core/config/features",
	"ic-core/ext/timeago/Timeago",
	"ic-core/globalization/bidiUtil",
	"ic-incontext/util/DateFormat",
	"ic-incontext/util/html",
	"ic-as/util/hashtag/HashTagParser",
	"ic-as/util/BaseItemUtil",
	"ic-as/util/fileviewer/FileViewerUtil",
	"../util/keys",
	"../util/NCKeys",
	"../util/MarkReadUtil",
	"../../util/xhr/XhrHandler",
	"../../item/data/NewsDataAccessor",
	"./NotificationPopupItem",
	"../util/NCNewRelic"
], function (dojo, domAttr, declare, lang, stamp, i18nactivitystream, query, on, domClass, topic, dojoKeys, _OnDijitClickMixin, template, _Templated, _Widget, event, features, Timeago, bidiUtil, DateFormat, html, HashTagParser, BaseItemUtil, FileViewerUtil, keys, NCKeys, MarkReadUtil, xhrHandler, NewsDataAccessor, NotificationPopupItem, NCNewRelic) {

	/**
	 * Widget used to display individual notification item in the flyout
	 * @author Johann Ott
	 */
	
	var NotificationsItem = declare("com.ibm.social.as.notification.NotificationsItem",
	[_Widget, _Templated, HashTagParser, BaseItemUtil],
	{
		templateString: template,
	
	    data: null,

	    newsData: null,
	
	    content: "",
	
	    time: null,
	
	    timeString: null,
	
	    timeSeconds: null,
	
	    timeago: null,
	
	    timeagoNode: null,
	
	    authorImage: null,
	
	    ariaSummary: null,
	    
	    activitySummary: null,
	    
	    activityTitle: null,

	    authorImageSrc: null,
	    
	    notificationContent: null,
	
	    strings: i18nactivitystream,
	    
	    helper: null,
	    
	    position: null,
	
	    /**
	     * Called before the widget is rendered in the UI.
	     * - Formats the time property
	     */
	    postMixInProperties: function(){
	        this.inherited(arguments);
	
	        // Mixin the accessors we will use to get attributes of the entries. This  
			// safeguards against non-mandatory attributes not being supplied.
			declare.safeMixin(this.data, new NewsDataAccessor());
			// Init the news data accessor
			this.data.init();
			this.newsData = this.data;
			
			NCNewRelic.setItem(this.data);
			
	        // Get the timestamp
	        this.time = this.data.getPublished();
	
	        
	        // Format the time so that it is more readable
	        this.timeString = this.getDateString(this.strings, this.time);
	        this.timeSeconds = this.getTimeWithSeconds(this.time).substring(0,11);
	
	        this.ariaSummary = this.data.getConnectionsPlainTitle();
	        
	        if(this.data.getActivitySummary()){
	        	var actSummary = this.handleHashTags(this.data.getActivitySummary());
	        	this.activitySummary = (actSummary) ? "\""+actSummary+"\"" : ""; 
	        }

	        this.activityTitle = this.data.getTitle();
	    },

	    /**
	     * Take in the summary and if a status update event parse the summary
	     * for hashtags	     
	     */
	    handleHashTags: function(activitySummary){
			var summary = activitySummary;
			if(this.data.getActivityType() === "note" && this.data.getGeneratorId() === "profiles"){				
				// The get the tags for this news item
				// // Parse any hash tags it may contain
				this.tagsArray = this.getTagsArray(this.data.getActivityTags());
				summary = this.parseHashTags(summary, this.tagsArray);
			}
			return summary;
	    },
	
	    postCreate: function(){
	    	this.inherited(arguments);

	    	// Implement the timeago function
	    	this.timeago = new Timeago({}, this.timeagoNode);
	    	var actor = this.data.getActor();

	    	// Get the photo details from the actor and place in author image node
	    	query(".icNote-authorImg", this.domNode).forEach(lang.hitch(this, function(item){
	    		this.authorImageSrc = this.getPhotoUrl(actor);
	    		domAttr.set(this.authorImage, "src", this.authorImageSrc);
	    	}));

	    	if (html.isHighContrast()){
	    		domClass.add(this.bluedot, "lotusHidden");
	    	}
	    	
	    	this.own(
	    			on(this.domNode, "keydown", lang.hitch(this, function(e){
	    				this._onKeyPress(e);
	    			}))
	    	);

	    	if(features("news-read-status-enabled")){
	    		if (html.isHighContrast()){
	    			domClass.add(this.bluedot, "lotusHidden");
	    			this.own(
	    					on(this.highContrastTextUnread, "click", lang.hitch(this, function(e){
	    						this.handleMarkRead(e);
	    					})),

	    					on(this.highContrastTextRead, "click", lang.hitch(this, function(e){
	    						this.handleMarkRead(e);
	    					}))

	    			); 	}else{
	    				domClass.remove(this.bluedot, "lotusHidden");
	    				this.own(
	    						on(this.bluedot, "click", lang.hitch(this, function(e){
	    							this.handleMarkRead(e);
	    							NCNewRelic.trackNotificationItem(NCKeys.MARK_READ_ON_ITEM, e.type, this.position, this.newsData.getActivityType(), this.newsData.getVerb());	
	    						})),
	    						
	    						on(this.bluedot, "blur", lang.hitch(this, function(e){
	    							domClass.remove(this.bluedot, "focused");
	    						})),

		    					on(this.bluedot, "focus", lang.hitch(this, function(e){	
		    						domClass.add(this.bluedot, "focused");
		    					})),
		    					
		    					on(this.bluedot, "keydown", lang.hitch(this, function(e){
		    						if(dojoKeys.ENTER === e.keyCode && !e.shiftKey){
		    							this.handleMarkReadKeyBoard(e);
		    					    	NCNewRelic.trackNotificationItem(NCKeys.MARK_READ_ON_ITEM, e.type, this.position, this.newsData.getActivityType(), this.newsData.getVerb());	
		    						}
		    					}))
	    				);	}
	    		this.setupMarkReadIndicatorWithDefaults();
	    	}
	    	bidiUtil.enforceTextDirectionOnPage(this.domNode);
	    	query("a", this.domNode).forEach(lang.hitch(this, function(item){	
	    		domAttr.set(item, "tabindex", "0");
	    	}));
	    },
		
		_onKeyPress: function(evt) {
			if (evt) {				
				this._onFocus();
				switch(evt.keyCode){
			      case dojoKeys.UP:
			      case dojoKeys.DOWN:
			        this.keyboardNavigate(evt.keyCode);
			        event.stop(evt);
			        break;

			      case dojoKeys.ENTER:
			      case dojoKeys.SPACE:
			        if(evt.target === this.bluedot || evt.target === this.highContrastTextRead || evt.target === this.highContrastTextUnread){
			        	this.handleMarkReadKeyBoard(evt);
			        } else {
			        	this.onClick(evt);
			        }
			        event.stop(evt);
			        break;
				 }				
			}
		},
		
		_onFocus: function(e){
			domClass.add(this.bluedot, "focused");
		},
		
		_onBlur: function(e){
			domClass.remove(this.bluedot, "focused");
		},
		
		/**
		 * Setup the mark read indicator - set title and appropriate class
		 * to determine whether read or unread
		 */
		setupMarkReadIndicatorWithDefaults: function(){			 	      
	        if(this.data.getConnectionsRead() === "false"){
	            domClass.remove(this.notificationContent, "selected");
	        }else {
	       		domClass.add(this.notificationContent, "selected");
	        }
	         this.toggleMarkReadTitle();
		},
	
		/**
		 * Handle a click on the current Item - mark read if currently unread status
		 * is showing
		 */
	    onClick : function(e){
	    	var eventTarget = e.target;
	    	if(this.isMarkUnreadActive()){
	    		this.handleMarkRead();
	    	}
	    	
	    	if (e.type === "click"){
	    		NCNewRelic.trackNotificationItem(NCKeys.CLICK_NOTIFICATION_ITEM, e.type, this.position, this.newsData.getActivityType(), this.newsData.getVerb());		
	    	}else {
				NCNewRelic.trackNotificationItem(NCKeys.KEYPRESS_NOTIFICATION_ITEM, e.type, this.position, this.newsData.getActivityType(), this.newsData.getVerb());	
	    	}
	    	
	    	if(this.newsData.getActivityType() == "file" &&
	    			FileViewerUtil.isFileOverlayEnabledNC(this.newsData.getGenerator().id)){
		    	try{		    		
					FileViewerUtil.launchFileViewer(this.newsData.getActivityFileUrl());	
					return;
				}catch(err){}		    						
	    	} 
	    	
	    	if(this.shouldCancelDefaultOpen(eventTarget.tagName)){
	    		return;
	    	}

	    	
	        window.open(
	            this.data.getActivityUrl(),
	            '_blank'
	        );

	    },

	    /**
		 * Is the tag name passed permitted to allow deafult item click handler.
		 * Which is to open the item.
		 * Example if a click on a user anchor tag then cancel default
		 * 
		 * @param tagName {String} name of the tag, e.g. "div", "a"
		 * @returns {Boolean} false if it can't, true otherwise
		 */
		shouldCancelDefaultOpen: function(tagName){
			return("a" == tagName.toLowerCase());			
		},
	    
	    /**
	     * true if the bluedot is visible and does not have class selected
	     */
	    isMarkUnreadActive: function(){
	    	return(!domClass.contains(this.bluedot, "lotusHidden") && !domClass.contains(this.notificationContent, "selected"));  	
	    },
	    
	    handleMarkReadKeyBoard: function(e){	  
	    	this.handleMarkRead(e);
	    },	   	 
	    
	    /**
		 * Handle keyboard navigation to a new item.
		 * Take into consideration the suspending of keyboard navigation, which is necessary to allow all
		 * keys to be used in the inlineComment box or other embedded textarea.
		 */
		keyboardNavigate: function(keyCode) {	
			topic.publish(keys.KEYBOARDNAVIGATION, this.domNode, keyCode);
		},
	    
	    /**
	     * Handle a request to toggle the current read status of the notification
	     */
	    handleMarkRead: function(e){
			this.data.connections.read = (this.data.getConnectionsRead() === "true") ? "false" : "true";
	    	var markReadProm = MarkReadUtil.markNotificationRead(this.data.getId(), this.data.connections.read);
	    	
	    	markReadProm.then(lang.hitch(this, function(data){
	        	domClass.toggle(this.notificationContent, "selected");
	        	this.toggleMarkReadTitle();
	        		   
	        }), function(error){
	        	console.log(error);
	        });

	    	if(e){
	    		event.stop(e);	
	    	}	    		
	    },
	    
	    /**
	     * toggle the title on the unread marker according to the current selection
	     */
	    toggleMarkReadTitle: function(){
	    	if (html.isHighContrast()){
	    		if(domClass.contains(this.notificationContent, "selected")){
	    			domClass.remove(this.highContrastTextRead, "lotusHidden");
	    			domClass.add(this.highContrastTextUnread, "lotusHidden");
	    		} else {
	    			domClass.add(this.highContrastTextRead, "lotusHidden");
	    			domClass.remove(this.highContrastTextUnread, "lotusHidden");
	    		}
	    	}else{
	    		if(domClass.contains(this.notificationContent, "selected")){
	    			domAttr.set(this.bluedot, "title", this.strings.markUnread );
	    		} else {
	    			domAttr.set(this.bluedot, "title", this.strings.markRead );
	    		}
	    	}    	
	    },	

	    /**
	     * A mechanism to visually update the state of this item
	     * to mark read
	     */
	    setMarkRead: function(){
			domAttr.set(this.bluedot, "title", this.strings.markUnread );
			domClass.add(this.notificationContent, "selected");
	    },    	    
	    
	    /**
		 * Get a formatted string for a date.
		 * @param strings {Object} string properties
		 * @param time {String} ISO date
		 * @returns {String} formatted date
		 */
		getDateString: function(strings, time, dateParameters){
	
	        dateParameters = dateParameters || {};
			var date = stamp.fromISOString(time);
			var df = new DateFormat(date, dateParameters);
			return df.formatByAge({
				DAY: strings.timeDay,
				MONTH: strings.timeMonth,
				TODAY: strings.timeToday,
				YEAR: strings.timeYear,
				YESTERDAY: strings.timeYesterday,
				TOMORROW: strings.timeTomorrow
			});
		},
		
		/**
		 * Get a seconds for a date.
		 * @param time {String} ISO date
		 * @returns {String} time with seconds
		 */
		getTimeWithSeconds: function(time){
			var date = stamp.fromISOString(time);
			var df = new DateFormat(date);
			return df.time_long();
		},

		/**
		 * Transform this NotificationsItem into a popup item compatible
		 * with HTML5 notifications API
		 * @return {NotificationPopupItem}
		 */
		generateNotificationPopup: function(){			
			return new NotificationPopupItem(this.data.getConnectionsPlainTitle(), "", this.authorImageSrc, this.data.getActivityId(), this.data.getActivityUrl());
		}

	
	});
	return NotificationsItem;
});