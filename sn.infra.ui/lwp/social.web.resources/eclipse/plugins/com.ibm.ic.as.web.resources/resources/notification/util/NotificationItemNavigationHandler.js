/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define([
	"dojo/_base/declare",
	"ic-as/util/ItemNavigationHandler",
	"./keys"	
], function (declare, ItemNavigationHandler, keys) {
	
	/**
	 * NavigationHandler for Notification items
	 */
	
	var NotificationItemNavigationHandler = declare(ItemNavigationHandler,
	{	
		landmark: ".icNotification-post-inner",
		subscriptionKey: keys.KEYBOARDNAVIGATION
		
	});

	NotificationItemNavigationHandler._Instance = null;
		
	NotificationItemNavigationHandler.getInstance = function(){
		if(NotificationItemNavigationHandler._Instance == null){
			NotificationItemNavigationHandler._Instance = new NotificationItemNavigationHandler();
	  	}
	  	return NotificationItemNavigationHandler._Instance;
	}
	
	return NotificationItemNavigationHandler.getInstance();
	
});
