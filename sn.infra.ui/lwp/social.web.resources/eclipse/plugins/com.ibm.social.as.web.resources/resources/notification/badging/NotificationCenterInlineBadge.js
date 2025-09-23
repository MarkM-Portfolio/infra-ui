/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.notification.badging.NotificationCenterInlineBadge");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("com.ibm.social.as.notification.util.keys");

/**
 * Widget used to display the notification center badging
 * @author Stephen Crawford
 */

dojo.declare("com.ibm.social.as.notification.badging.NotificationCenterInlineBadge",
[dijit._Widget, dijit._Templated],
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "notification/badging/templates/NotificationCenterBadge.html"),

	postCreate: function(){
		this.inherited(arguments);
		this.subscribe(com.ibm.social.as.notification.util.keys.UPDATEBADGE, dojo.hitch(this, this.updateBadging));
		this.subscribe(com.ibm.social.as.notification.util.keys.SHOWBADGE, dojo.hitch(this, this.showBadge));
		this.subscribe(com.ibm.social.as.notification.util.keys.HIDEBADGE, dojo.hitch(this, this.hideBadge));
		this.subscribe(com.ibm.social.as.notification.util.keys.INCREMENTBADGE, dojo.hitch(this, this.incrementBadging));
	},
	
	/**
	 * Update the badge number to passed in value and unhide the badge
	 */
	updateBadging: function(unreadItems){
		if(unreadItems > 0){
			this.domNode.innerHTML = unreadItems;
			this.showBadge();
		}
	},
	
	/**
	 * Increase the badge count by one and ensure that the badge is showing
	 */
	incrementBadging: function(count){	
		this.domNode.innerHTML = count;
		this.showBadge();
	},
	
	showBadge: function(){
		dojo.removeClass(this.domNode, "lotusHidden");
		dojo.addClass(this.domNode, "icBanner-display");
	},
	
	hideBadge: function(){
		dojo.addClass(this.domNode, "lotusHidden");
		dojo.removeClass(this.domNode, "icBanner-display");
	}
  
});
