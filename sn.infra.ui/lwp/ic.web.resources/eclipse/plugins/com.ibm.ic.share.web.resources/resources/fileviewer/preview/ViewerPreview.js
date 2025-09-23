/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/ViewerPreview.html",
   "dojo/string",
   "dojo/_base/lang",
   "dojo/_base/config",
   "dojo/dom-style",
   "dojo/dom-class",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/sniff",
   "dojo/promise/all",
   "./util",
   "../config/globals",
   "../util/url",
   "dojo",
   "dojo/on",
   "dojo/dom-construct",
   "dojo/html",
   "../util/FileDraftTracker"
], function (declare, _WidgetBase, _TemplatedMixin, template, string, lang, config, domStyle, domClass, i18n, has, all,
   util, globals, urlUtil, dojo, on, domConstruct, html, FileDraftTracker) {
   "use strict";

   var ViewerPreview = declare([_WidgetBase, _TemplatedMixin], {
      templateString: template,
      previewId: "docs",

      postMixInProperties: function () {
         this.nls = i18n.PREVIEW.VIEWER;
         this.blankGif = config.blankGif || this._blankGif;

         if (FileDraftTracker.isPublishingInProgress({file: this.file}) && FileDraftTracker.isSessionPublishing()) {
            this.loadingMessage = i18n.PREVIEW.VIEWER.PUBLISHING || "Publishing...";
         } else {
            this.loadingMessage = i18n.PREVIEW.VIEWER.LOADING;
         }
      },

      postCreate: function () {
         if (this.file.type === "verse") {
            var promise = this.file.args.preview;

            if (!promise || !promise.then) {
               this._onError();
            } else {
               promise.then(lang.hitch(this, function (viewerLink) {
                  this._showViewer(viewerLink);
               }), lang.hitch(this, this._onError));
            }
         } else {
            var file = this.file;
            
            FileDraftTracker.init({file: file});

            if (FileDraftTracker.isPublishingInProgress({file: this.file})) {
               html.set(this.loadingMessageNode, i18n.PREVIEW.VIEWER.PUBLISHING || "Publishing...");
               domClass.add(this.domNode, "ics-viewer-publishing");
               domStyle.set(this.loading, "display", "block");
               return;
            }

            if(this.file.bean.get("isDocsFile") && (this.file.bean.get("size") === 0)){
               this._onError(i18n.PREVIEW.VIEWER.NO_PUBLISHED_VERSION);
               return;
            }

            all({
               hasViewerEntitlement: this.entitlements.getViewerDfd(),
               file: this.file.bean.get("fullEntry")
            }).then(lang.hitch(this, function (results) {
               if (results.hasViewerEntitlement && !results.file.isEncrypted) {
                  this._showViewer(this.getViewerLink(this.file.args.id));
               } else {
                  this._onError();
               }
            }));
         }
      },

      _showViewer: function (viewerLink) {
         this.frame = domConstruct.create("iframe", {
            className: "viewer-frame",
            allowtransparency: "true",
            frameBorder: "0",
            title: this.nls.IFRAME_TITLE,
            src: viewerLink
         });

         if (has("ie") <= 8 && this.frame.attachEvent) {
            this.frame.attachEvent("onload", lang.hitch(this, this._onFrameLoad), false);
         } else {
            on(this.frame, "load", lang.hitch(this, "_onFrameLoad"));
         }

         domConstruct.place(this.frame, this.iframeContainer);
      },

      getViewerLink: function (fileId) {
         var url, viewerId, isDraft, cmisDocumentId, cmisVersionId;

         var urlParameters = {
            mode: "compact",
            focusWindow: false,
            lang: dojo.locale
         };
         
         if(this.shareLink) {
            urlParameters["icfilesContext"] = this.shareLink.context;
         }
         
         cmisDocumentId = this.file.bean.get("cmisDocumentId");

         if (globals.isCCM(this.file)) {
            isDraft = this.file.bean.get("draftStatus") ;
            if (isDraft) {
               viewerId = cmisDocumentId;
            } else if (!cmisDocumentId) {
                viewerId = this.file.bean.get("cmisVersionId");
            } else {
               viewerId = this.file.bean.get("cmisVersionSeriesId") ;
            }
            url = this.services.getViewerUrl() +  "/app/ecm/${ccmId}@${repositoryName}/content?"; 

         } else if (has("docs-viewer-next")) {
            url = this.services.getViewerUrl() + "/verse/app/vsfiles/${id}/content?"; 
         } else {
            url = this.services.getViewerUrl() + "/app/lcfiles/${id}/content?";
         }

         var updatedUrl = urlUtil.rewrite(url, urlParameters);

         return string.substitute(updatedUrl, { id: fileId, ccmId: viewerId, repositoryName: this.file.bean.get("repositoryName") });
      },

      _onError: function(error) {
         setTimeout(lang.hitch(this, function(){
            this.errorHandler(error);
         }));
      },

      _onFrameLoad: function () {
         domStyle.set(this.loading, "display", "none");
      }
   });

   return {
      create: function (args) {
         return new ViewerPreview(args);
      },

      isValid: function (file) {
         return !file.args.isEncrypted && util.isFileViewable(file);
      }
   };
});
