/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.notification.NotificationsFlyout");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("com.ibm.social.as.notification.NotificationsItem");
dojo.require("com.ibm.social.as.notification.util.keys");
dojo.require("com.ibm.social.as.notification.util.MessageTransport");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

/**
 * Widget used to display the notification center flyout
 * @author Johann ott
 */

dojo.declare("com.ibm.social.as.notification.NotificationsFlyout",
[dijit._Widget, dijit._Templated, com.ibm.social.as.notification.util.MessageTransport],
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "notification/templates/NotificationsFlyout.html"),

    NotificationsFeed: null,

    notificationItem: null,

    newNotifications: null,

    NotificationCount: 0,

    allNotificationsUrl: null,

    numShowMore: 0,

    settingsUrl: null,
    
    ncMode: null,
    
    /**
     * Flag to signify allow/block fetching by scroll
     * will be set when in the middle of a request
     */
    allowScrollCheck: false,
    
    strings: dojo.i18n.getLocalization("com.ibm.social.as", "activitystream"),

    /**
     * Called before the widget is rendered in the UI.
     */
    postMixInProperties: function(){    	
    	var contextPath = lconn.core.url.getServiceUrl(lconn.core.config.services.homepage).uri;
        this.allNotificationsUrl = contextPath+"/web/updates/#myNotifications/forme/all";
        this.settingsUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.news).uri;
        this.inherited(arguments);        
    },

    postCreate: function(){
    	if(this.ncMode && this.ncMode === com.ibm.social.as.notification.util.keys.IFRAME_MODE){
    		dojo.addClass(this.domNode, "icBanner-notif-center-frame");
    	} else {
    		dojo.addClass(this.domNode, "icBanner-notif-center");
    	}
        this.inherited(arguments);   
        if(this.ncMode === com.ibm.social.as.notification.util.keys.INLINE_MODE){
        	this.connect(this.domNode, 'onblur', "_onBlur");	
        }
        
	},    

    loadStreamMore: function() {
        //Loading logic
        this.numShowMore++;
        this.allowScrollCheck = false;
        //Fetch       
        var lastItem = this.NotificationsFeed[this.NotificationsFeed.length - 1];
        var updatedBefore= lastItem.published;

        dojo.publish(com.ibm.social.as.notification.util.keys.FETCHFEED, [updatedBefore]);       
    },
    
    /**
     * clear out the content
     */
    destroyContent: function(){
    	dojo.forEach(dijit.findWidgets(this.notificationItem), function(widget){
			widget.destroyRecursive();
		});
		
		dojo.empty(this.notificationItem);
    },
    
    showLoader: function(){
    	if(this.loadingNode){
    		dojo.removeClass(this.loadingNode, "lotusHidden");
    	}    	
    },
    
    hideLoader: function(){
    	if(this.loadingNode){
    		dojo.addClass(this.loadingNode, "lotusHidden");
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

    renderNotificationsItems: function(response) {    	    	    	
    	if(response.connections.unreadNotifications > 0){
            this.newNotifications = dojo.string.substitute(this.strings.newNotifications, [response.connections.unreadNotifications]);
        }
    	
    	this.NotificationsFeed = response.list;
        dojo.forEach(this.NotificationsFeed, dojo.hitch(this, function(item){
            this.NotificationCount++;
            var NotificationItem = new com.ibm.social.as.notification.NotificationsItem({
                data : item,
                itemCount: this.NotificationCount,
                unreadNotifications : response.connections.unreadNotifications
            });
            dojo.place(NotificationItem.domNode, this.notificationItem);
        }));
        this.hideLoader();
        this.allowScrollCheck = true;
    },

    checkScroll: function() {
        var triggerPoint = 25; //50px from the bottom of stream
        if (this.allowScrollCheck && this.numShowMore < 4 && (this.contentNode.scrollTop >= this.contentNode.scrollHeight - this.contentNode.clientHeight - triggerPoint)) {
            this.loadStreamMore();
        }
    },
    
    show: function(){
    	dojo.removeClass(this.domNode, "lotusHidden");
    	this.sendMessage(com.ibm.social.as.notification.util.keys.SHOW);
    	this.headerNode.focus();
    },
    
    hide:function(){
    	dojo.addClass(this.domNode, "lotusHidden");
    	this.sendMessage(com.ibm.social.as.notification.util.keys.HIDE);
    },
    
    toggle: function(){
    	if(dojo.hasClass(this.domNode, "lotusHidden")){
    		this.show();
    	} else { 
    		this.hide();
    	}
    },
    
    /**
     * Auto hide on blur - put in a small timeout to allow for a user
     * toggling the view on and off via the header menu item
     * @param e
     * @returns
     */
    _onBlur: function(e){
    	setTimeout(dojo.hitch(this, function() {
    		this.hide();	
    	}), 200);
		
	}

});
