/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
      "dojo/_base/array",
      "dojo/_base/lang",
      "dojo/aspect",
      "ic-core/swfupload/SWFUpload"
], function(array, lang, aspect, SWFUpload) {

   var _ieTitleConnects = [];

   var _setTitle = function(swf) {
      document.title = swf.customSettings.pageTitle;
   };

   var _delayedSetTitle = function(swf) {
      setTimeout(function() {
         _setTitle(swf);
      }, 50);
   };

   var _setConnects = function(swf) {
      var swfMethods = [
            "fileDialogStart",
            "loadFlash",
            "testExternalInterface",
            "fileQueued",
            "keyPressed",
            "fileQueueError",
            "fileDialogComplete",
            "uploadStart"
      ];

      array.forEach(swfMethods, function(m) {
         _ieTitleConnects.push(aspect.after(swf, m, function() {
            _setTitle(swf);
         }, true));
      });
   };

   /*
    * flashReady is called before any nastiness happens with the title, but it
    * is called immediately before. delay the update so that the movie has time
    * to load. make the method generic in case other methods pop up
    */
   var _setDelayedConnects = function(swf) {
      var swfMethods = [ "flashReady"
      ];

      array.forEach(swfMethods, function(m) {
         _ieTitleConnects.push(aspect.after(swf, m, function() {
            _delayedSetTitle(swf);
         }, true));
      });
   };

   SWFUpload.prototype.initSettings = (function(oldInitSettings) {
      return function() {

         if (lang.isFunction(oldInitSettings)) {
            oldInitSettings.call(this);
         }

         this.customSettings.pageTitle = document.title;

         _setConnects(this);
         _setDelayedConnects(this);
      }
   })(SWFUpload.prototype.initSettings);

   SWFUpload.prototype.destroy = (function(oldDestroy) {
      return function() {
         array.forEach(_ieTitleConnects, dojo.disconnect);

         if (lang.isFunction(oldDestroy)) {
            oldDestroy.apply(this, arguments);
         }
      }
   })(SWFUpload.prototype.destroy);

   return SWFUpload;
});
