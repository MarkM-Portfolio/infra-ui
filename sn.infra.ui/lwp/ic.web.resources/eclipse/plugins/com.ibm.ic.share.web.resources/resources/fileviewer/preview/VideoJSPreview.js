/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/VideoJSPreview.html",
   "dojo/_base/array",
   "dojo/dom-construct",
   "dojo/dom-style",
   "dojo/dom-class",
   "dojo/dom-attr",
   "ic-core/config/services",
   "ic-core/config/properties",
   "ic-core/url",
   "dojo/has",
   "dojo/on",
   "dojo/_base/lang",
   "dijit/registry",
   "dojo/topic",
   "../video/video-js/video-dev",
   "dojo/i18n!../video/video-js/lang/VideoJSStrings",
   "dojo/i18n!../nls/FileViewerStrings",
   "./util",
   "../util/url"
], function (declare, _WidgetBase,_TemplatedMixin, template, array, domConstruct, domStyle, domClass, domAttr, services,
   properties, url, has, on, lang, registry, topic, videojsCode, i18n, i18nViewer, util, urlUtil) {

   "use strict";

   var TYPES = [ "mp4", "mov", "flv", "webm", "ogg" ];
   var ONLY_HTML5_TYPES = ["webm", "ogg"];
   var FLASH_MIME_TYPE = "video/flv";
   var HTML5_MIME_TYPE = "video/mp4";
   var aspectRatio = 9/16; //height by width
   var webresourcesUrl = url.getServiceUrl(services.webresources);
   
   var VideoWidget = declare([_WidgetBase, _TemplatedMixin], {
      previewId: "video",
      templateString: template,
      postMixInProperties: function () {
        this.videoURL = this.file.args.links.download;
        this.videoURL = urlUtil.rewrite(this.videoURL, {logDownload: true, downloadType: "view"});
        this.videoType = this._getVideoType();
        this.id = registry.getUniqueId("fileviewer") + "_vjsVideo";
        
        if(this.videoType == "video/flv") {
           this.videoHeight = "1080";
           this.videoWidth = "1920";
        } else {
           this.videoHeight = "auto";
           this.videoWidth = "auto";
        }
      },
      _getVideoType: function() {
         var type = this.file.args.type;
         var userAgent = window.navigator.userAgent.toLowerCase();
         if (type === "mov") {
            if (userAgent.indexOf("trident") > -1) { //for IE, use FLASH_MIME_TYPE
                return FLASH_MIME_TYPE;
            }
            return HTML5_MIME_TYPE;
         }

         if (type === "flv" || has("ie")) {
            return FLASH_MIME_TYPE;
         }

         if (has("safari") && properties.DeploymentModel !== "SmartCloud") { // We must use the Flash video player in Safari for all on-prem systems
            return FLASH_MIME_TYPE;
         }

         return HTML5_MIME_TYPE;
      },
      _onLoad: function() {
         //initially mute the video
         if(this.previewOptions && this.previewOptions.volumeOnStart) {
           this.videojs.volume(this.previewOptions.unmuteOnStart)
         } else {
           this.videojs.volume(0.5);
         }
         //this.videojs.play();
         
         this.videojs.removeClass("vjs-preloaded")

         
         this.videojs.on("fullscreenchange", function() {
            topic.publish("ic-fileviewer/content/toggleClass", {className: "videojs-fullScreen"});
         });
      },
      postCreate: function () {
        if (videojs) {
           videojs.options.flash.swf = webresourcesUrl + "/web/ic-share/fileviewer/video/video-js/video-js.swf";
           videojs.addLanguage("VideoJSLang", i18n);
           videojs.options.language = "VideoJSLang";
           try {
              this.videojs = videojs(this.vjsVideo, {autoplay: false, preload: "metadata"}, lang.hitch(this, function(){
                 //resize the width & height
                 domConstruct.create("div", {"style" : "padding-top:" + (aspectRatio * 100) + "%;"}, this.videoContainer.children[0], "first");
                 domStyle.set(this.videoContainer.children[0], "height", "auto");
                 domStyle.set(this.videoContainer.children[0], "width", "auto");
                 domClass.add(this.videoContainer, "loaded");
              }));
              this.videojs.controls(true);
              this.videojs.addClass("vjs-waiting");
              
              this.videojs.on("loadstart", lang.hitch(this, function() {
                 this.videojs.addClass("vjs-preloaded");
              }));

              this.videojs.on("loadedmetadata", lang.hitch(this, function() {
                 this._onLoad();
              }));
              
              this.videojs.on("error", lang.hitch(this, function() {
                 if (this.errorHandler) {
                   this.errorHandler();
                 }
              }));
           } catch (e) {
             //Do Nothing
           }
             
        } else {
           //handle videojs not loading in time
        }
      },
      onError: function () {
        if (this.errorHandler) {
          this.errorHandler();
        }
      },
      _cancelEvent: function (event) {
        event.stopPropagation();
      },
      _keyEvents: function(event) {
         var keyVal = event.charCode || event.keyCode;
         //left & right & up & down
         if (keyVal == 37 || keyVal == 40 || keyVal == 38 || keyVal == 39) {
            event.fidoIgnoreEvent = true;
         }
         //is fullscreen and escape hit
         if (this.videojs && (this.videojs.isFullScreen() && keyVal == 27)) {
            event.fidoIgnoreEvent = true;
         }
      },
      destroy: function destroy() {
        if (this.videojs) {
          this.videojs.dispose();
        }
        this.inherited("destroy", []);
      }
    });
   return {
      create: function (args) {
         return new VideoWidget(args);
      },
      _validateHTML5OnlyTypes: function(file) {
         if (array.indexOf(ONLY_HTML5_TYPES, file.bean.get("type")) > -1) {
            if(has("ie")) {
               return false;
            }            
         }
         return true;
      },
      isSafeForPreview: function (file) {
        var message = i18nViewer.PREVIEW.VIDEO.UNSAFE_PREVIEW || "This file cannot be previewed because it has not been scanned for viruses.";
        return util.isPreviewSafe(file, message);
      },
      isValid: function (file) {
         return !(has("ie") === 8) && has("fileviewer-preview-videojs") && array.indexOf(TYPES, file.bean.get("type")) > -1 && this._validateHTML5OnlyTypes(file);
      }
   };
});
