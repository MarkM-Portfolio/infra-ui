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
   "dojo/i18n!../nls/FileViewerStrings",
   "../util/url",
   "../util/fidoNewRelic",
   "./LoadImageWithRotation/LoadImage",
   "./LoadImageWithRotation/LoadImageScale",
   "./LoadImageWithRotation/LoadImageMeta",
   "./LoadImageWithRotation/LoadImageExif",
   "./LoadImageWithRotation/LoadImageExifMap",
   "./LoadImageWithRotation/LoadImageOrientation"
], function (declare, _WidgetBase, _TemplatedMixin, template, util, bannerHeight, array, domStyle, domClass, win,
      on, lang, has, config, i18n, urlUtil, fidoNewRelic, LoadImage, LoadImageScale, LoadImageMeta, LoadImageExif, LoadImageExifMap, LoadImageOrientation) {
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
            return dojo.position(this.image).h;
         },
         setHeight: function (height) {
            domStyle.set(this.image, "height", height + "px");
         },
         getWidth: function () {
            return dojo.position(this.image).w;
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
         initializing: true,
         previewId: "image",

         postMixInProperties: function () {
            this.nls = i18n.PREVIEW.IMAGE;
            var isDocumentType, link;
            isDocumentType = util.isFileViewable(this.file.args.type);
            link = isDocumentType ? this.file.args.links.thumbnail : this.file.args.links.download;
            link = link.replace("renditionKind=mediumview", "renditionKind=largeview");
            
            // Used to prevent caching after restoring versions
            link = urlUtil.rewrite(link, {versionNum: this.file.bean.get("version")});
            // Ensure Files download api logs view in journal
            link = urlUtil.rewrite(link, {downloadType: "view"});
            link = urlUtil.rewrite(link, {logDownload: "true"});

            if (link.indexOf("/draft/") > 0) {
               link = urlUtil.rewrite(link, {draftTime: (new Date()).getTime()});
            }

            this.ui = {
               src: link
            };
            this.blank = config.blankGif || dijit._WidgetBase.prototype._blankGif;
            this.normalizedRadius = 50;
            this.circumference = this.normalizedRadius * 2 * Math.PI;
         },

         postCreate: function () {
           if(has("files-enable-image-view-auto-rotate") && this.file.args.type != 'gif') {
              if(has("fileviewer-enable-view-original-image")) {
                this.loadingImageWithRotate();
              } else {
                 var versionChanged = sessionStorage.getItem('/versionChanged/'+ this.file.args.id);
                 if(versionChanged === 'true' || !this.file.args.links.thumbnail) {
                    this.loadingImageWithRotate();
                 } else {
                    var imageSrc = this.file.args.links.thumbnail;
                    imageSrc = imageSrc.replace("renditionKind=mediumview", "renditionKind=largeview");
                    imageSrc = urlUtil.rewrite(imageSrc, {logDownload: "true", versionNum: this.file.bean.get("version")});
                    this.loadingImage(imageSrc);
                 }
              }
           } else {
              this.loadingImage(this.ui.src);
           }
         },
         
         loadingImage: function(source) {
            this.image = document.createElement("img");
            this.image.className = "ics-zoom-img";
            this.image.src = source;
            this.image.alt = "";
            this.image.onclick = lang.hitch(this, this._cancelEvent);
            this.image.onerror = lang.hitch(this, this.onError);
            this.image.onload = lang.hitch(this, this.onLoad);
            if (!this.imageController) {
                this.imageController = new Image(this.image);
            }
             
            this.imageContainer.appendChild(this.image);
            this._increments = [0.10, 0.25, 0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 2.00, 4.00];
            this.currentScale = 0.0;
            this.scale = array.indexOf(this._increments, 1);
            if (has("ie") < 10) {
               domStyle.set(this.imagePreview, "height", ((win.doc.documentElement.clientHeight - bannerHeight.height) + "px"));
               this.eventHandler = on(win.global, "resize", lang.hitch(this, function () {
                  domStyle.set(this.imagePreview, "height", ((win.doc.documentElement.clientHeight - bannerHeight.height) + "px"));
               }));
            }
            this.reset();
            this.initializing = false;
         },
         
         loadingImageWithRotate: function() {
            var self = this;
            this.getImageBlob(this.ui.src).then(function(blob) {
            loadImage(
               blob,
               function(img) {
                  if(img.type === "error") {
                     self.onError();
                  } else {
                     self.image = img;
                     self.image.className = "ics-zoom-img";
                     self.image.alt = "";
                     self.image.onclick = self._cancelEvent;
                     self.imageContainer.appendChild(self.image);
                     if (!self.imageController) {
                         self.imageController = new Image(self.image);
                     }
                     self._increments = [0.10, 0.25, 0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 2.00, 4.00];
                     self.currentScale = 0.0;
                     self.scale = array.indexOf(self._increments, 1);
                     if (has("ie") < 10) {
                        domStyle.set(self.imagePreview, "height", ((win.doc.documentElement.clientHeight - bannerHeight.height) + "px"));
                        self.eventHandler = on(win.global, "resize", lang.hitch(self, function () {
                           domStyle.set(self.imagePreview, "height", ((win.doc.documentElement.clientHeight - bannerHeight.height) + "px"));
                        }));
                     }
                     self.reset();
                     self.initializing = false;
                     self.onLoad();
                     sessionStorage.removeItem('/versionChanged/'+ self.file.args.id);
                  }
               },
               {
                  orientation: true,
                  canvas: true
               });
            }, function(err) {
               self.onError();
            });
         },
         
         renderLoading: function(show) {
            if(show) {
               dojo.removeClass(this.imageLoading, 'lotusHidden');
            } else {
               dojo.addClass(this.imageLoading, 'lotusHidden');
            }
         },
         
         getImageBlob: function(url) {
            var that = this;
            var defer = new dojo.Deferred()
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "blob";
            xhr.withCredentials = true;
            xhr.onprogress = function(evt) {
               if (evt.lengthComputable && that.loadingPrecentage) {
                  var percentComplete = evt.loaded / evt.total;
                  var offset = that.circumference - (percentComplete * that.circumference);
                  that.loadingPrecentage.textContent = Number(percentComplete*100).toFixed(0) + '%';
                  that.loadingIcon.setAttribute("stroke-dashoffset", offset);
               }
            }
            xhr.onload = function() {
               that.renderLoading(false);
               if (this.status == 200 || this.status === 0) {
                  defer.resolve(this.response);
               } else {
                  var error = new Error("Could not load image");
                  defer.reject(error);
               }
            };
            xhr.send();
            that.renderLoading(true);
            return defer;
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

         reset: function (init) {
            this.imageController.setZoomToFit();
            this.updateCurrentScale();
            this.firstZoom = true;
            if (!this.initializing) { 
               fidoNewRelic.track("image.reset");  
            }
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
            var initZoomFactor = zoomFactor;
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
            
            //New Relic
            if (initZoomFactor >= 0) {
               fidoNewRelic.track("image.zoomIn", {"zoomFactor": this._increments[this.scale]});
            } else {
               fidoNewRelic.track("image.zoomOut", {"zoomFactor": this._increments[this.scale]});
            }
            
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
      
      isSafeForPreview: function (file) {
        var message = i18n.PREVIEW.IMAGE.UNSAFE_PREVIEW || "This file cannot be previewed because it has not been scanned for viruses.";
        return util.isPreviewSafe(file, message);
      },

      isValid: function (file) {
         return (array.indexOf(imageTypes, file.args.type) > -1 || util.isFileViewable(file));
      }
   };
});
