/* Copyright IBM Corp. 2015  All Rights Reserved.                 */

define([], function () {

	/**
	 * Class that defines constants used for events in Notification Center.
	 * @author Stephen Crawford
	 *
	 **/
		
	var keys = {
	
		INLINE_MODE: "inline",
			
		IFRAME_MODE: "iframe",

		IFRAME_MODE_MIXED_DOMAIN: "iframeMixedDomain",

		INLINE_MODE_ONPREM: "inlineOnPrem",
		
		TOGGLE_NC: "com/ibm/social/notification/TOGGLE_NC",

		OPEN_NC: "com/ibm/social/notification/OPEN_NC",
		
		CLEARBADGE: "com/ibm/social/as/notification/CLEARBADGE",		
		
		UPDATEBADGE: "com/ibm/social/as/notification/UPDATEBADGE",
		
		SHOWBADGE: "com/ibm/social/as/notification/SHOWBADGE",
		
		HIDEBADGE: "com/ibm/social/as/notification/HIDEBADGE",
			
		SHOW: "com/ibm/social/as/notification/SHOW",
		
		FOCUS: "com/ibm/social/as/notification/FOCUS",
		
		FETCHFEED: "com/ibm/social/as/notification/FETCHFEED",
		
		FEEDFETCHED: "com/ibm/social/as/notification/FEEDFETCHED", 
			
		HIDE: "com/ibm/social/as/notification/HIDE",
		
		KEYBOARDNAVIGATION: "com/ibm/social/as/notification/KEYBOARDNAVIGATION",

		NEWNOTIFICATION: "com/ibm/social/as/notification/NEWNOTIFICATION",

		LIVEPREVIEW_PREF_CHANGE: "com/ibm/social/as/notification/LIVEPREVIEW_PREF_CHANGE",
			
		HIDE_ACTION_CENTER: "com/ibm/social/as/notification/action/center/hide",
		
		SHOW_ACTION_CENTER: "com/ibm/social/as/notification/action/center/show",
		
		ACTION_CENTER_CLEAR_BADGE: "com/ibm/social/as/notification/action/center/clear/badge"
		
	};
		
	return keys;
});
