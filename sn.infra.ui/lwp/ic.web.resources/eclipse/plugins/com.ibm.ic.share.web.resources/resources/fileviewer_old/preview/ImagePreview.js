/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/ImagePreview.html",
   "./util",
   "../config/bannerHeight",
   "dojo/_base/array",
   "dojo/dom-style",
   "dojo/dom-class",
   "dojo/_base/window",
   "dojo/on",
   "dojo/_base/lang",
   "dojo/sniff",
   "dojo/_base/config",
   "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings",
   "../config/documentTypes"
], function (declare, _WidgetBase, _TemplatedMixin, template, util, bannerHeight, array, domStyle, domClass, win,
      on, lang, has, config, i18n, documentTypes) {
   "use strict";

   var ZOOM_IN_FACTOR = 1, ZOOM_OUT_FACTOR = -1, imageTypes = ["jpg", "jpeg", "png", "gif"],

      Image = declare([], {
         constructor: function (image) {
            this.image = image;
            this.zoomToFit = true;
         },
         setNaturalParams: function (startingHeight, startingWidth) {
            this.naturalHeight = startingHeight;
            this.naturalWidth = startingWidth;
         },
         getHeight: function () {
            return this.image.height;
         },
         setHeight: function (height) {
            domStyle.set(this.image, "height", height + "px");
         },
         getWidth: function () {
            return this.image.width;
         },
         setWidth: function (width) {
            domStyle.set(this.image, "width", width + "px");
         },
         getNaturalHeight: function () {
            return this.image.naturalHeight || this.naturalHeight;
         },
         getNaturalWidth: function () {
            return this.image.naturalWidth || this.naturalWidth;
         },
         getCurrentScale: function () {
            return (this.getHeight() / this.getNaturalHeight());
         },
         getZoomToFit: function () {
            return this.zoomToFit;
         },
         setZoomToFit: function () {
            domClass.add(this.image, "ics-zoomToFit");
            domStyle.set(this.image, "height", "");
            this.zoomToFit = true;
         },
         removeZoomToFit: function () {
            domClass.remove(this.image, "ics-zoomToFit");
            this.zoomToFit = false;
         }
      }),

      ImageWidget = declare([_WidgetBase, _TemplatedMixin], {
         _WidgetBase: _WidgetBase,
         templateString: template,
         firstZoom: true,

         postMixInProperties: function () {
            this.nls = i18n.PREVIEW.IMAGE;
            var isDocumentType, link;
            isDocumentType = (array.indexOf(documentTypes, this.file.args.type) > -1);
            link = isDocumentType ? this.file.args.links.thumbnail : this.file.args.links.download;
            link = link.replace("renditionKind=mediumview", "renditionKind=largeview");
            this.ui = {
               src: link
            };
            this.blank = config.blankGif || "";

         },

         postCreate: function () {
            if (!this.imageController) {
               this.imageController = new Image(this.image);
            }
            this._increments = [0.10, 0.25, 0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 2.00, 4.00];
            this.currentScale = 0.0;
            this.scale = array.indexOf(this._increments, 1);
            if (has("ie") < 10) {
               domStyle.set(this.imagePreview, "height",
                     ((win.doc.documentElement.clientHeight - bannerHeight.height) + "px"));

               this.eventHandler = on(win.global, "resize", lang.hitch(this, function () {
                  domStyle.set(this.imagePreview, "height",
                        ((win.doc.documentElement.clientHeight - bannerHeight.height) + "px"));
               }));
            }
            this.reset();
         },

         onLoad: function () {
            /**
             * Assumed that this.imageController.getNaturalHeight() will only fail to call
             * usable number in ie8, but this can function as a fallback in other browswers
             * if it does manage to fail for some other reason.
             * 
             * has("ie") > 8 has("ie") < 10
             */
            if (!(this.imageController.getNaturalHeight() > 0)) {
               this.imageController.removeZoomToFit();
               this.imageController.setNaturalParams(this.image.height, this.image.width);
               this.imageController.setZoomToFit();
            }

            this.updateCurrentScale();
         },

         reset: function () {
            this.imageController.setZoomToFit();
            this.updateCurrentScale();
            this.firstZoom = true;
         },

         getZoomScale: function () {
            return this._increments[this.scale];
         },

         getCurrentScale: function () {
            return this.currentScale;
         },

         updateCurrentScale: function () {
            this.currentScale = this.imageController.getCurrentScale();
         },

         zoomIn: function () {
            this._zoom(ZOOM_IN_FACTOR);
         },

         zoomOut: function () {
            this._zoom(ZOOM_OUT_FACTOR);
         },

         _zoom: function (zoomFactor) {
            var DONT_INC_SCALE = 0;
            if (this.imageController.getZoomToFit()) {
               this.enableZoom();
               if (zoomFactor === ZOOM_IN_FACTOR && this.getCurrentScale() < this.getZoomScale()) {
                  zoomFactor = DONT_INC_SCALE;
               }
            }

            this.scale += zoomFactor;

            this.scale = util.clamp(this.scale, 0, (this._increments.length - 1));

            this.imageController.setHeight((this.getZoomScale() * this.imageController.getNaturalHeight()));
            this.updateCurrentScale();
         },

         enableZoom: function () {
            this.updateCurrentScale();
            this.imageController.removeZoomToFit();

            array.some(this._increments, function (item, index) {
               if (this.currentScale <= item) {
                  this.scale = index;
                  return true;
               }
            }, this);

            this.firstZoom = false;
         },

         _cancelEvent: function (event) {
            event.stopPropagation();
         },

         onError: function () {
            if (this.errorHandler) {
               this.errorHandler();
            }
         },

         destroy: function destroy() {
            if (this.eventHandler) {
               this.eventHandler.remove();
            }

            this.inherited("destroy", []);
         }
      });

   return {
      create: function (args) {
         return new ImageWidget(args);
      },

      isValid: function (file) {
         var type = file.args.type;

         return (array.indexOf(imageTypes, type) > -1 || array.indexOf(documentTypes.view, type) > -1);
      }
   };
});
