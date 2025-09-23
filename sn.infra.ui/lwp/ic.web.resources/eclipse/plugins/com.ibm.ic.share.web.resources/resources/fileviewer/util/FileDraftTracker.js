/* Copyright IBM Corp. 2015, 2017  All Rights Reserved.                    */

define([
   "dojo/_base/lang",
   "dojo/sniff",
   "dojo/topic",
   "dojo/_base/array",
   "../data/docsApi",
   "dojo/date",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/dom-style",
   "dojo/dom-class",
   "dojo/html",
   "../util/feature",
   "../util/fidoNewRelic"
], function (lang, has, topic, array, docsApi, date, i18n, domStyle, domClass, html, feature, fidoNewRelic) {
   var publishingInProgress = {},  // Map of files to the times their publishing events started
      scheduled = {},    // Map of files to the setTimeout ID of their scheduled monitorAutopublish calls
      sessionPublishing, // True if the file currently displayed in the FiDO is being published
      sessionManualPublishing, //True if the file currently displayed in the FiDO is being manually published
      subscriptions = [],
      AUTOPUBLISH_INITIAL_DELAY = 500,      // The time to wait between the first four requests
      AUTOPUBLISH_SUBSEQUENT_DELAY = 2000,  // The time to wait between subsequent (5+) requests
      AUTOPUBLISH_DELAY_CHANGE = 3000,      // The time when to switch between INITIAL_DELAY and SUBSEQUENT_DELAY
      AUTOPUBLISH_TIMEOUT = 150 * 1000;     // The time to consider an autopublish as "timed out"

   
   function isSessionPublishing() {
      return sessionPublishing || sessionManualPublishing;
   }
   
   function isPublishingInProgress(args) {
      return publishingInProgress[args.file.args.id];
   }
   
   function monitorAutopublish(args) {
      scheduled[args.fileID] = false;
   
      var handler = lang.partial(onDraftResponse, args);
      docsApi.getDraftInformation({ id: args.fileID }).then(handler, handler);
   }
   
   function onDraftResponse(args, draft) {
      if (!(draft instanceof Error)) {
         // For whatever reason, the latest changes are in Files
         if (!draft.get("hasChanges")) {
            onAutopublishComplete(args);
            return;
         }
         
         // A version has been published since the autopublish started
         if (draft.get("latestVersionModified") > publishingInProgress[args.fileID]) {
            onAutopublishComplete(args);
            return;
         }
         
         // Skip to file view since edits still in progress from other editor(s) and no immediate expected publish
         if (draft.get("editors").length > 0) {
            onAutopublishComplete(args);
            return;
         }
      }
   
      monitorAutopublishLater(args);
   }
   
   function monitorAutopublishLater(args) {
      if (scheduled[args.fileID]) {
         return;
      }
   
      var delay = AUTOPUBLISH_INITIAL_DELAY;
   
      if (hasElapsedMillis(AUTOPUBLISH_TIMEOUT, publishingInProgress[args.fileID])) {
         publishingInProgress[args.fileID] = false;
         topic.publish("ic-fileviewer/autopublishFailed", args);
         return;
      } else if (hasElapsedMillis(AUTOPUBLISH_DELAY_CHANGE, publishingInProgress[args.fileID])) {
         delay = AUTOPUBLISH_SUBSEQUENT_DELAY; 
      }
   
      scheduled[args.fileID] = setTimeout(lang.partial(monitorAutopublish, args), delay);
   }
   
   function hasElapsedMillis(millis, d1, d2) {
      var result;
   
      d2 = d2 || new Date();
      result = date.difference(d1, d2, "millisecond") > millis;
   
      return result;
   }
   
   function onAutopublishComplete(args) {
      publishingInProgress[args.fileID] = false;
      topic.publish("ic-fileviewer/autopublishComplete", args);
   }
   
   if (has("fileviewer-ir-autopublish")) {
      topic.subscribe("lconn/share/action/completed", function (args) {
         if (!lang.getObject("autoPublish", false, args)) {
            return;
         }
   
         // Prevent ID from being garbage collected when the editor window closes
         // https://stackoverflow.com/questions/3840066
         var id = "" + args.fileID;
               
         if (!publishingInProgress[id]) {
            publishingInProgress[id] = new Date();
   
            topic.publish("ic-fileviewer/autopublishing", {
               fileID: id
            });
         }
      });
   }
   
   function clearSubscriptions() {
      array.forEach(subscriptions, function (sub) {
         sessionPublishing = false;
         sub.remove();
         subscriptions = [];
      });
   }
   
   function messageListener(event, file) {
      if (event.data) {
         var data = event.data;

         if (typeof data === 'string') {
            try {
               data = JSON.parse(data);
            } catch(e) {/*This is sometimes expected*/}
         } else {
             data = lang.clone(data);
         }

         if (feature.isOffice365Enabled() && data === "MSOfficeRefresh") {
            file.bean.load().then(function () {
               topic.publish("ic-fileviewer/push/messages", {
                  type: "success",
                  message: i18n.ACTION.OFFICE_EDITED.SUCCESS || "The file is being saved.",
                  cancelable: true
               });
            });
         }
      }
   }
   
   function init(args) {
      var file = args.file;

      if (feature.isOffice365Enabled()) {
         window.addEventListener("message", function(){messageListener(event, file)});
      }

      clearSubscriptions();

      subscriptions.push(topic.subscribe("ic-fileviewer/autopublishing", function (args) {
         file.bean.getDocsDraftInfo().then(function() { 
            var docEditors = file.bean.get("docsDraftInfo").editors;
            if(docEditors && docEditors.length > 0) {
               return;
            } 
            if (args.fileID == file.bean.get("id")) {
               sessionPublishing = true;
               monitorAutopublishLater(args);
               topic.publish("ic-fileviewer/refreshPreview");
               topic.publish("ic-fileviewer/push/clearMessages", { forceRemove: true });
            }
         });
      }));
      
      subscriptions.push(topic.subscribe("ic-fileviewer/manualpublishing", lang.hitch(this, function (args) {
         sessionPublishing = true;
         sessionManualPublishing = true;
         publishingInProgress[file.bean.get("id")] = true;
         topic.publish("ic-fileviewer/refreshPreview");
      })));
   
      subscriptions.push(topic.subscribe("ic-fileviewer/autopublishComplete", function (args) {
         if (args.fileID == file.bean.get("id")) {
            sessionPublishing = false;
            sessionManualPublishing = false;
            topic.publish("ic-fileviewer/push/clearMessages", { forceRemove: true });
            file.bean.load().then(function () {
               topic.publish("ic-fileviewer/refreshPreview");
            });
         }
      }));
   
      subscriptions.push(topic.subscribe("ic-fileviewer/autopublishFailed", function (args) {
         if (args.fileID == file.bean.get("id")) {
            sessionPublishing = false;
            sessionManualPublishing = false;
            topic.publish("ic-fileviewer/push/clearMessages", { forceRemove: true });
   
            if (i18n.PREVIEW.VIEWER.AUTOPUBLISH_TIMEOUT) {
               topic.publish("ic-fileviewer/push/messages", {
                  type: "error",
                  message: i18n.PREVIEW.VIEWER.AUTOPUBLISH_TIMEOUT
               });
            }
   
            file.bean.load().then(function () {
               topic.publish("ic-fileviewer/refreshPreview");
            });
         }
      }));
   
      subscriptions.push(topic.subscribe("ic-fileviewer/closed", clearSubscriptions));
   
      file.bean.watch("docsDraftInfo", function () {
         if (publishingInProgress[file.args.id] && !sessionPublishing) {
            sessionPublishing = true;
            topic.publish("ic-fileviewer/push/clearMessages", { forceRemove: true });
            onDraftResponse({ fileID: file.bean.get("id") }, file.bean.get("docsDraftInfo"));
         }
      });      
   }
   
   return {
      isSessionPublishing: isSessionPublishing,
      isPublishingInProgress: isPublishingInProgress,
      init: init
   };
});
