/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/VideoPreview.html",
   "dojo/_base/array",
   "dojo/_base/window",
   "ic-share/widget/HTML5VideoPlayer",
   "ic-share/widget/FlashVideoPlayer",
   "dojo/sniff"
], function (declare,
      _WidgetBase,
      _TemplatedMixin,
      template,
      array,
      win,
      HTML5VideoPlayer,
      FlashVideoPlayer,
      has) {
   "use strict";

   var HTML5SupportedTypes = ["mp4"/*, "ogg", "webm"*/],
      flashSupportedTypes = ["mp4", "mov", "flv"],

      VideoWidget = declare([_WidgetBase, _TemplatedMixin], {
         templateString: template,

         isHTML5SupportedType: function () {
            var type = this.ui.fileType;

            return (array.indexOf(HTML5SupportedTypes, type) > -1);
         },
         isFlashSupportedType: function () {
            var type = this.ui.fileType;

            return (array.indexOf(flashSupportedTypes, type) > -1);
         },
         isHTML5VideoSupported: function () {
            return !(has("ie") < 10) && !!win.doc.createElement('video').canPlayType;
         },
         _createFlashVideo: function () {
            var videoPlayer = new FlashVideoPlayer();
            videoPlayer.playVideo(this.videoContainer, this.file.args.links.download, 854, 700, null, null);
         },
         _createHTML5Video: function () {
            var videoPlayer, self;
            videoPlayer = new HTML5VideoPlayer();
            self = this;

            setTimeout(function () {
               videoPlayer.playVideo(
                  self.videoContainer,
                  self.file.args.links.download,
                  null,
                  854,
                  700,
                  null,
                  null,
                  (has("ie")) ? false : true
               );
            }, 10);
         },
         postMixInProperties: function () {
            this.ui = {
               src: this.file.args.links.download,
               name: this.file.args.name,
               videoContainer: this.videoContainer,
               fileType: this.file.args.type
            };
         },
         postCreate: function () {
            this.ui.prevFocus = null;
            this.ui.nextFocus = null;
            this.ui.allowFullScreen = false;

            if (this.isHTML5VideoSupported() && this.isHTML5SupportedType()) {
               this._createHTML5Video();
            } else if (this.isFlashSupportedType()) {
               this._createFlashVideo();
            } else {
               this.onError();
            }
         },
         onError: function () {
            if (this.errorHandler) {
               this.errorHandler();
            }
         },
         _cancelEvent: function (event) {
            event.stopPropagation();
         }
      });

   return {
      create: function (args) {
         return new VideoWidget(args);
      },

      isValid: function (file) {
         var type = file.args.type;

         return (array.indexOf(HTML5SupportedTypes.concat(flashSupportedTypes), type) > -1);
      }
   };
});
