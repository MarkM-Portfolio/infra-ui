/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.track.activities");

dojo.require("com.ibm.lconn.layout.track");
dojo.require("lconn.core.auth");

(function() {

   function getContext() {
      return dojo.getObject("OAGetContext") && dojo.isFunction(OAGetContext) ? OAGetContext() : {};
   }

   com.ibm.lconn.layout.track.activities.read = function(flag, instance) {
      if (!instance) {
         throw "You must pass an event instance";
      }
      try {
         // ---- start --- capture read event for Files app
         var itemType = "ACTIVITIES";
         var contentId = "";
         var extra = {};

         // console.debug(arguments);

         switch (flag) {
            case "entry": // for expand entry in activity node list
               var entry = instance;
               itemType = entry.type.toUpperCase();
               if (itemType!="TODO"&&itemType!="ENTRY")
            	   return;
               //itemType = (entry.type.toLowerCase() == "todo") ? "TODO" : "ENTRY";
               contentId = entry.id;
               extra = {
                  contentTitle : entry.name[entry.name.type],
                  contentCreatorId : entry.creator.userid,
                  contentCreateTs : entry.created,
                  contentLink : entry.htmlUrl,
                  contentContainerId : entry.activityId
               }
               break;
            case "node":
               var context = getContext();
               if (context.pageId == "activitypage" && dojo.exists("entry", context.params)) {
                  // subscribe to p_activityNode topic in entry page
                  if (instance.nodes && instance.nodes.length != 0) {
                     var entry;
                     dojo.some(instance.nodes, function(node) {
                        if (node.id == context.params.entry) {
                           entry = node;
                           return true;
                        }
                     });
                     itemType = "ENTRY";
                     contentId = entry.id;
                     extra = {
                        contentTitle : entry.name[entry.name.type],
                        contentCreatorId : entry.creator.userid,
                        contentCreateTs : entry.created,
                        contentLink : entry.htmlUrl,
                        contentContainerId : entry.activityId
                     }
                     this.nodes = instance.nodes;
                  }
               }
               else {
                  // subscribe to p_activityNode topic in activity page
                  this.nodes = instance.nodes;
                  return;
               }
               break;
            case "activity":
               var context = getContext();
               if (context.pageId == "activitypage" && dojo.exists("entry", context.params)) {
                  // subscribe to p_activity topic in entry page
                  return;
               }
               else { // subscribe to p_activity topic in activity page
                  var activity = instance;
                  if (context.pageId == "activitypage_members") {
                     itemType = "MEMBERSHIP"
                     contentId = activity.id + itemType;
                  }
                  else {
                	 if (instance.istemplate){
                		 itemType = "TEMPLATE";
                	 }else{
                		 itemType = "ACTIVITY"
                	 }
                     contentId = activity.id;
                  }
                  extra = {
                     contentTitle : activity.name[activity.name.type],
                     contentCreatorId : activity.creator.userid,
                     contentCreateTs : activity.created,
                     contentLink : activity.activityviewUrl,
                     contentContainerId : activity.id
                  }
               }

               break;
            default:
               break;

         }

         // if (flag != "activities") { // exclude OASetContext invocation
         // if ("entry" == flag) { // for expand entry in activity node list
         // var entry = instance;
         // itemType = "ENTRY";
         // contentId = entry.id;
         // extra = {
         // contentTitle: entry.name[entry.name.type],
         // contentCreatorId: entry.creator.userid,
         // contentCreateTs: entry.created,
         // contentLink: entry.htmlUrl,
         // contentContainerId: entry.activityId
         // }
         // }
         // else {
         // var context = getContext();
         // if (context.pageId == "activitypage" && context.params &&
         // context.params.entry) {
         // if ("activity" == flag) { //subscribe to p_activity topic in entry
         // page
         // return;
         // }
         // else
         // if ("node" == flag) { //subscribe to p_activityNode topic in entry
         // page
         // if (instance.nodes && instance.nodes.length == 1) {
         // var entry = instance.nodes[0];
         // itemType = "ENTRY";
         // contentId = entry.id;
         // extra = {
         // contentTitle: entry.name[entry.name.type],
         // contentCreatorId: entry.creator.userid,
         // contentCreateTs: entry.created,
         // contentLink: entry.htmlUrl,
         // contentContainerId: entry.activityId
         // }
         // }
         // }
         // }
         // else
         // if (context.pageId.indexOf("activitypage") == 0) {
         // if ("activity" == flag) { //subscribe to p_activity topic in
         // activity
         // page
         // var activity = instance;
         // if (context.pageId == "activitypage_members") {
         // itemType = "MEMBERSHIP"
         // contentId = activity.id + itemType;
         // }
         // else {
         // itemType = "ACTIVITY";
         // contentId = activity.id;
         // }
         // extra = {
         // contentTitle: activity.name[activity.name.type],
         // contentCreatorId: activity.creator.userid,
         // contentCreateTs: activity.created,
         // contentLink: activity.htmlUrl,
         // contentContainerId: activity.id
         // }
         // }
         // else
         // if ("node" == flag) { //subscribe to p_activityNode topic in
         // activity
         // page
         // this.nodes = instance.nodes;
         // return;
         // }
         // }
         // }
         // }

         var user = lconn.core.auth.getUser();
         if (instance.istemplate) {
			extra.containerType = "TEMPLATE";
         } else if (extra.contentContainerId && dojo.getObject("OACallWithCurrentActivity")) {
        	 OACallWithCurrentActivity(function(jsatom){
					var theActivity = jsatom.nodesById[extra.contentContainerId];
					extra.containerType = !!theActivity.istemplate?"TEMPLATE":"ACTIVITY";
				});
         }         
         var metrics = {
            source : "ACTIVITIES",
            userId : user && user.id || null,
            // userId: _oa_current_user ? _oa_current_user.userid : null,
            community : dojo.getObject("OAGetCommunityUuid") && dojo.isFunction(OAGetCommunityUuid) ? OAGetCommunityUuid() : null,
            extra : extra
         };

         contentId = contentId ? contentId : itemType;

         var track = com.ibm.lconn.layout.track;
         if (dojo.config.isDebug) {
            console.log("Send read event with itemType = " + itemType + ", contentId = " + contentId);
            console.log("Options=" + dojo.toJson(metrics, true));
         }
         track.read(contentId, itemType, metrics);
      }
      catch (e) {
         console.info(e);
      }
   };

   com.ibm.lconn.layout.track.activities.trackActivitiesApp = function() {
      var context = getContext();
      // clear nodes
      this.nodes = null;
      if (context.pageId.indexOf("activitypage") != 0) {
         this.read("activities", context.pageId);
      }
   };

   com.ibm.lconn.layout.track.activities.connectOASetContext = function() {
      if (typeof OASetContext == "function") {
         dojo.connect(null, "OASetContext", this, function() {
            this.trackActivitiesApp();
         });

         this.trackActivitiesApp();
      }
      else {
         setTimeout(dojo.hitch(this, this.connectOASetContext), 500);
      }
   };

   dojo.subscribe("p_activity", null, function(activity) {
      com.ibm.lconn.layout.track.activities.read.call(com.ibm.lconn.layout.track.activities, "activity", activity);
   });
   dojo.subscribe("p_activityNode", null, function(node) {
      com.ibm.lconn.layout.track.activities.read.call(com.ibm.lconn.layout.track.activities, "node", node);
   });

   com.ibm.lconn.layout.track.activities.instrumentExpandNode = function() {
      var original = dojo.getObject("lconn.act.NodeUtil.expandNode");
      if (original) {
         lconn.act.NodeUtil.expandNode = function(/* string */uuid, /* string */idPrefix, expand, expandOnly) {
            original.apply(this, arguments);
            // console.debug(arguments);
            if (expand && com.ibm.lconn.layout.track.activities.nodes) {
               dojo.forEach(com.ibm.lconn.layout.track.activities.nodes, function(node) {
                  if (node.id == uuid) {
                     com.ibm.lconn.layout.track.activities.read.call(com.ibm.lconn.layout.track.activities, "entry", node);
                  }
               });
            }
         };
      }
      else {
         console.warn("Cannot find lconn.act.NodeUtil.expandNode. Tracking will not function!");
      }
   };

   com.ibm.lconn.layout.track.activities.instrumentExpandNode();
   com.ibm.lconn.layout.track.activities.connectOASetContext();
})();
