/* Copyright IBM Corp. 2016  All Rights Reserved.              */

define([
   "dojo/_base/lang",
   "dojox/uuid/generateRandomUuid",
   "ic-ui/layout/insights/tracker",
   "ic-ui/layout/insights/NewRelic",
   "dojo/has",
   "dojo/sniff"
   
], function (lang, generateRandomUuid, tracker, NewRelic, has) {

   var hasNewRelic = has('notification-center-new-relic');
   var newRelicSession = generateRandomUuid();
   var NAMESPACE = "ic.as.nc";
   var defaultType = "Action";
   var ncItem, ncItems;
   
   var NCNewRelic = {
      track: function(name, args) {
        if (!tracker || !hasNewRelic || !name) return;
        
        var standardArgs = {
          "defaultType": defaultType,
          "ncSession": newRelicSession,
          "ncItemType": (ncItem && ncItem.getActivityType() || ""),
          "ncUnreadNotifications": (ncItems && ncItems.connections.unreadNotifications || ""),
          "ncNumberOfNotifications": (ncItems && ncItems.list.length || "")
        };
        lang.mixin(standardArgs, args);
        
        tracker.track(NAMESPACE + '.' + name, standardArgs);
      },
      
      setItem: function(item) {
          ncItem = item;
      },
      
      setItems: function(items) {
          ncItems = items;
      },
      
      trackNotificationItem: function(name, eventType, position, type, verb) {
    	  this.track(name, {
    		  	"domEventType": eventType,
    	  		"ncItemPosition": position,
    	  		"ncItemType": type,
    	  		"ncVerb": verb	  
    	  });  	  
      }

   };

   return NCNewRelic;
});