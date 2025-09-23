/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/lang",
   "dojox/uuid",
   "ic-ui/layout/insights/tracker",
   "ic-ui/layout/insights/NewRelic",
   "dojo/has",
   "dojo/sniff"
   
], function (lang, uuid, tracker, NewRelic, has) {

   var hasNewRelic = has('fileviewer-newrelic') || has('fileviewer-new-relic');
   var newRelicSession = uuid.generateRandomUuid();
   var NAMESPACE = "ic.fido";
   var defaultType = "Action";
   var fidoFile, fidoPreview, fidoPanel;
   
   var fidoNewRelic = {
      track: function(name, args) {
        if (!tracker || !hasNewRelic || !name) return;
        
        var standardArgs = {
          "defaultType": defaultType,
          "fidoSession": newRelicSession,
          "fileType": (fidoFile.bean.get("type") || "").substring(0,4),
          "fileId": fidoFile.bean.get("id"),
          "previewType": fidoPreview,
          "fileSize": fidoFile.bean.get("size"), 
          "panel": (fidoPanel || "" )
        };
        lang.mixin(standardArgs, args);
        
        tracker.track(NAMESPACE + '.' + name, standardArgs);
      },
      setPanel: function(panel) {
         fidoPanel = panel;
      },
      setFile: function(file) {
         fidoFile = file;
      }, 
      setPreview: function(preview) {
         fidoPreview = preview;
      }
      
   };

   return fidoNewRelic;
});