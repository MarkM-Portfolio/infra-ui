/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo/_base/array",
      "dojo/_base/config",
      "dojo/_base/lang",
      "dojo/aspect",
      "dojo/json",
      "dojo/topic",
      "ic-ui/layout/track",
      "ic-core/auth"
], function(array, dojoConfig, lang, aspect, JSON, topic, coreTracker, auth) {

   function getContext() {
      return lang.getObject("OAGetContext") && lang.isFunction(OAGetContext) ? OAGetContext() : {};
   }

   var tracker = lang.getObject("com.ibm.lconn.layout.track.activities", true);
   tracker.read = function(flag, instance) {
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
               itemType = (entry.type.toLowerCase() == "todo") ? "TODO" : "ENTRY";
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
               if (context.pageId == "activitypage" && lang.exists("entry", context.params)) {
                  // subscribe to p_activityNode topic in entry page
                  if (instance.nodes && instance.nodes.length != 0) {
                     var entry;
                     array.some(instance.nodes, function(node) {
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
               if (context.pageId == "activitypage" && lang.exists("entry", context.params)) {
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
         // if ("activity" == flag) { //subscribe to p_activity topic in
         // entry
         // page
         // return;
         // }
         // else
         // if ("node" == flag) { //subscribe to p_activityNode topic in
         // entry
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

         var user = auth.getUser();
         var metrics = {
            source : "ACTIVITIES",
            userId : user && user.id || null,
            // userId: _oa_current_user ? _oa_current_user.userid : null,
            community : lang.getObject("OAGetCommunityUuid") && lang.isFunction(OAGetCommunityUuid) ? OAGetCommunityUuid() : null,
            extra : extra
         };

         contentId = contentId ? contentId : itemType;

         if (dojoConfig.isDebug) {
            console.log("Send read event with itemType = " + itemType + ", contentId = " + contentId);
            console.log("Options=" + JSON.stringify(metrics, true));
         }
         coreTracker.read(contentId, itemType, metrics);
      }
      catch (e) {
         console.info(e);
      }
   };

   tracker.trackActivitiesApp = function() {
      var context = getContext();
      // clear nodes
      this.nodes = null;
      if (context.pageId.indexOf("activitypage") != 0) {
         this.read("activities", context.pageId);
      }
   };

   tracker.connectOASetContext = function() {
      if (typeof OASetContext == "function") {
         aspect.after(window, "OASetContext", lang.hitch(this, function() {
            this.trackActivitiesApp();
         }), true);

         this.trackActivitiesApp();
      }
      else {
         setTimeout(lang.hitch(this, this.connectOASetContext), 500);
      }
   };

   topic.subscribe("p_activity", lang.hitch(null, function(activity) {
      tracker.read.call(tracker, "activity", activity);
   }));
   topic.subscribe("p_activityNode", lang.hitch(null, function(node) {
      tracker.read.call(tracker, "node", node);
   }));

   tracker.instrumentExpandNode = function() {
      var original = lang.getObject("lconn.act.NodeUtil.expandNode");
      if (original) {
         lconn.act.NodeUtil.expandNode = function(/* string */uuid, /* string */idPrefix, expand, expandOnly) {
            original.apply(this, arguments);
            // console.debug(arguments);
            if (expand && tracker.nodes) {
               array.forEach(tracker.nodes, function(node) {
                  if (node.id == uuid) {
                     tracker.read.call(tracker, "entry", node);
                  }
               });
            }
         };
      }
      else {
         console.warn("Cannot find lconn.act.NodeUtil.expandNode. Tracking will not function!");
      }
   };

   tracker.instrumentExpandNode();
   tracker.connectOASetContext();

   return tracker;
});
