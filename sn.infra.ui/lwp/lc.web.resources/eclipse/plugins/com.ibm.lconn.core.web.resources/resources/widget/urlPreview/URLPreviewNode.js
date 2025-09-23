/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.urlPreview.URLPreviewNode");
dojo.require("com.ibm.oneui.util.Url");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.registry");
dojo.require("lconn.core.config.properties");
dojo.require("lconn.core.url");
dojo.require("lconn.core.util.imagechecker");
dojo.require("dojox.html.entities");
dojo.requireLocalization("lconn.core.widget.urlPreview", "URLPreview");

(function(imagechecker) {

   /**
    * Emitted when a URLPreviewNode widget is closed
    * 
    * @event ic-ui/urlpreview/closed
    */

   /**
    * Emitted when video controls of a URLPreviewNode widget are focused
    * 
    * @event ic-ui/urlpreview/video/controls/focused
    */

   /**
    * Emitted when focus is moved away from video controls of a URLPreviewNode
    * widget
    * 
    * @event ic-ui/urlpreview/video/controls/blurred
    */

   var MIME_TYPE_FLASH = "application/x-shockwave-flash", MIME_TYPE_HTML = "text/html";

   /*
    * Adds an HTML parameter to a container, used for Flash video params
    */
   function addFlashParam(name, value, container) {
      return dojo.create("param", {
         name : name,
         value : value
      }, container);
   }

   /*
    * Checks if the item matches the mime type
    */
   function matchesMimeType(item, type) {
      return dojo.indexOf([
            item.type,
            item['video:type']
      ], type) !== -1;
   }

   /*
    * Return the available type
    */
   function getMimeType(item) {
      return item.type || item['video:type'];
   }

   /*
    * Return the video url
    */
   function getVideoUrl(item) {
      return item.url || item.video;
   }

   /*
    * Normalizes data across services
    */
   function normalizeData(data) {
      if (data.url === undefined) {
         data.url = '';
      }
      if (data.title === undefined) {
         data.title = '';
      }
      if (data.provider_url === undefined) {
         data.provider_url = '';
      }
      data.title = dojox.html.entities.encode(data.title);
   }

   /*
    * Returns to get a unique name id for the input string
    */
   function getUniqueId(name) {
      var regId = dijit.registry.getUniqueId(name);
      return regId.substring(name.length + 1);
   }

   /**
    * URL Preview Node widget
    * 
    * @class lconn.core.widget.urlPreview.URLPreviewNode
    * @extends dijit._Widget
    * @extends dijit._Templated
    * @author Piyush Agarwal <pagarwal@us.ibm.com>
    */
   dojo.declare("lconn.core.widget.urlPreview.URLPreviewNode", [
         dijit._Widget,
         dijit._Templated
   ],
   /** @lends lconn.core.widget.urlPreview.URLPreviewNode.prototype */
   {
      /**
       * Path to the widget template
       * 
       * @type {String}
       */
      templatePath : dojo.moduleUrl("lconn.core", "widget/urlPreview/templates/URLPreview.html"),

      /**
       * Strings used by this widget
       * 
       * @type {Object}
       */
      strings : dojo.i18n.getLocalization("lconn.core.widget.urlPreview", "URLPreview"),

      /**
       * URL preview data can be mixed in directly to avoid hitting the backend
       * service
       */
      data : null,

      /**
       * Set to true to enable editing controls:
       * <ul>
       * <li>Checkbox to hide the thumbnail</li>
       * <li>Buttons to choose among thumbnails</li>
       * <li>Close button</li>
       * </ul>
       * Note: to support legacy behavior, the widget is automatically set in
       * edit mode when a closeCallback is passed.
       * 
       * @type Boolean
       * @see {@link #closeCallback}
       */
      editable : false,

      /**
       * Set to true to enable video playback.
       * <p>
       * Note: to support legacy behavior, video playback is enabled when the
       * data object has an <code>enablePlayback</code> flag set to true.
       * passed.
       * 
       * @type Boolean
       */
      enablePlayback : false,

      /**
       * Close callback that is invoked when the close button is pressed. This
       * is provided for legacy support. New development should subscribe to the
       * <code>ic-ui/urlpreview/closed</code> topic.
       * 
       * @type Function
       * @deprecated
       */
      closeCallback : null,

      /**
       * Callback invoked when focus is moved away from video controls. This is
       * provided for legacy support. New development should subscribe to the
       * <code>ic-ui/urlpreview/video/controls/blurred</code> topic.
       * 
       * @type Function
       * @deprecated
       */
      videoControlsBlurCallback : null,

      /**
       * Callback invoked when video controls are focused. This is provided for
       * legacy support. New development should subscribe to the
       * <code>ic-ui/urlpreview/video/controls/focused</code> topic.
       * 
       * @type Function
       * @deprecated
       */
      videoControlsFocusCallback : null,

      /**
       * Index of thumbnail currently displayed
       * 
       * @type {Number}
       * @private
       */
      _currentThumbnailIndex : 0,

      /**
       * Determines whether the full screen URL preview is enabled
       * 
       * @type {Boolean}
       */
      isFullScreenEnabled : true,

      constructor : function(args) {
         if (args && args.data) {
            if (args.data.url) {
               // Check there's a valid protocol in the actual URL
               if (args.data.url.match(/^(https?|notes|ftp|mailto):/))
                  args.url = args.data.url;
               else
                  args.url = 'http://' + args.data.url;
            }
            normalizeData(args.data);
         }
         // Set to true by default. Admin users can deactivate this option in
         // the config file
         this.isFullScreenEnabled = !(lconn.core.config.properties['lconn.core.widget.urlPreview.fullScreeVideosEnabled'] === 'false');
      },

      postCreate : function() {

         // var isExternal = null;

         // To preserve legacy behavior, the widget is considered to
         // be in edit mode when closeCallback is set
         if (this.closeCallback) {
            this.editable = true;
         }

         if (!this.editable) {
            dojo.addClass(this.closeButton, "lconnPreviewHidden");
            dojo.addClass(this.footerPane, "lconnPreviewHidden");
         }

         if (this.data) {
            this.renderData(this.data);
         }
         // else if (this.enableExternalMedia) {
         // isExternal = this.getDataFromExternalService(this.url);
         // }
         // if (!isExternal && this.data == null) {
         // // call our internal backend service to get metadata if failed to
         // get it from external service
         // this.data = this.getDataFromInternalService(this.url);
         // this.renderData(this.data);
         // }
      },

      /**
       * Renders data passed in suitable format as argument
       * 
       * @param {URLPreviewData}
       *           data The data to render
       */
      renderData : function(data) {
         // To preserve legacy behavior, we enable playback of videos when
         // the
         // data.enablePlayback flag is set to true
         var index = 0;

         if (data.enablePlayback) {
            this.enablePlayback = data.enablePlayback;
         }

         if (data && data.title) {
            dojo.attr(this.domNode, "role", "region");

            index = getUniqueId('urlPreviewRegion');
            dojo.attr(this.domNode, "aria-label", dojo.string.substitute(this.strings.urlPreviewRegion, [index, data.provider_url]));

            this.connect(this.titleNode, "onclick", function(e) {
               dojo.stopEvent(e);
               window.open(data.url);
            });
            this.connect(this.linkNode, "onclick", function(e) {
               dojo.stopEvent(e);
               window.open(data.provider_url);
            });
            this.connect(this.thumbnailContainer, "onmouseover", function(e) {
               dojo.replaceClass(this.playBtn, "otherHTML5Player16-play-overlay-sm-hover", "otherHTML5Player16-play-overlay-sm");
            });
            this.connect(this.thumbnailContainer, "onmouseout", function(e) {
               dojo.replaceClass(this.playBtn, "otherHTML5Player16-play-overlay-sm", "otherHTML5Player16-play-overlay-sm-hover");
            });
            this.description.innerHTML = data.description || "";
            this.titleNode.firstChild.innerHTML = data.title;

            imagechecker.checkExist(dojo.map(data.thumbnails, function(t) {
               return t.src
            })).then(dojo.hitch(this, function(thumbs) {
               this._currentThumbnailIndex = 0;
               this.setThumbnail(dojo.filter(data.thumbnails, function(t) {
                  return t.src == thumbs[0]
               })[0]);
               if (thumbs.length == 1) {
                  dojo.addClass(this.imageChooser, "lconnPreviewHidden");
               }
            }), dojo.hitch(this, function(bad) {
               dojo.addClass(this.leftPane, "lconnPreviewHidden");
               dojo.addClass(this.footerPane, "lconnPreviewHidden");
            }));

            this.checkBox.id = this.id + "_checkbox";
            dojo.attr(this.checkBox, "name", this.checkBox.id);
            dojo.attr(this.checkBoxLabel, "for", this.checkBox.id);

            dojo.removeClass(this.domNode, "lconnPreviewHidden");

            // data enabled + video information
            if (data.enablePlayback && data.video && data.video[0]) {
               var flashVideo = dojo.some(data.video, function(item) {
                  return matchesMimeType(item, MIME_TYPE_FLASH);
               });
               // removing unsupported/invalid video types
               var filteredVideoList = dojo.filter(data.video, function(item) {
                  return !matchesMimeType(item, MIME_TYPE_HTML);
               });
               // If browser == IE8 and no flash video available, do not show
               // the play button
               if (filteredVideoList.length > 0 && (dojo.isIE != 8 || flashVideo)) {
                  dojo.removeClass(this.playBtn, "lotusHidden");
                  this.connect(this.thumbnailContainer, "onclick", "showMedia");
                  dojo.attr(this.thumbnailContainer, "href", "javascript:;");
                  dojo.attr(this.thumbnailContainer, "role", "button");
                  dojo.attr(this.thumbnailContainer, "aria-label", this.strings.playVideo);
               }
            }
         }
         else {
            this.closePreview();
         }
      },

      /**
       * Sets the thumbnail for the image or the video
       * 
       * @param {URLThumbnailData}
       *           thumbnailData The thumbnail data
       */
      setThumbnail : function(thumbnailData) {
         dojo.attr(this.thumbnail, "aria-label", thumbnailData.alt);
         if (dojo.isIE === 8) {
            dojo.attr(this.thumbnail, "src", thumbnailData.src);
            dojo.style(this.thumbnail, "width", '120px');
            dojo.style(this.thumbnail, "height", '120px');
         }
         else {
            dojo.style(this.thumbnailContainer, "background", "url(\"" + thumbnailData.src + "\") no-repeat 50% 50%");
            dojo.style(this.thumbnailContainer, "backgroundSize", "cover");
         }
      },

      /**
       * Shows the video. Alias for {@link #showVideo}
       * 
       * @param {Event}
       *           event The event, unused.
       */
      showMedia : function(event) {
         return this.showVideo.apply(this, arguments);
      },

      /**
       * Shows the video preview so the user can play it
       * <p>
       * FIXME: split into logical units
       * 
       * @fires ic-ui/urlpreview/video/controls/focused
       * @fires ic-ui/urlpreview/video/controls/blurred
       * @param {Event}
       *           event The event, unused.
       */
      showVideo : function(event) {
         var flashContainer, videoContainer, fallbackImg;
         var flashVideo = html5videos = false;

         dojo.addClass(this.leftPane, "lconnPreviewHidden");
         dojo.addClass(this.rightPane, "lconnPreviewHidden");
         dojo.addClass(this.footerPane, "lconnPreviewHidden");
         dojo.addClass(this.domNode, "lconnPreviewExtended");

         videoContainer = dojo.create("video", {
            style : "border: 0",
            width : "100%",
            height : "100%",
            controls : true,
            poster : this.data.thumbnails[this._currentThumbnailIndex].src,
            autoPlay : true,
            "data-notOpenEE" : "true" // adding this data attribute so clicking
         // video controls does not open EE
         });

         dojo.forEach(this.data.video, dojo.hitch(this, function(item) {
             var url = getVideoUrl(item), type = getMimeType(item);
             // Change URL schema (http -> https) only if we are in https and the
             // video provider is youtube (supports the change)
             url = com.ibm.oneui.util.Url.secure && url.indexOf("http://www.youtube") != -1 ? url.replace("http:", "https:") : url;
             url = com.ibm.oneui.util.Url.secure && url.indexOf("http://vimeo.com") != -1 ? url.replace("http:", "https:") : url;
             url = url.indexOf("http://www.youtube") != -1 || url.indexOf("https://www.youtube") != -1 && url.indexOf("watch?v=") != -1 ?  url.replace("watch?v=", "v/") : url;
             url = url.indexOf("http://www.youtube") != -1 || url.indexOf("https://www.youtube") != -1 && url.indexOf("v/") != -1 ?  url.replace("v/", "embed/") : url;
             url = url.indexOf("moogaloop.swf?clip_id=") != -1 ? url.replace("moogaloop.swf?clip_id=", "video/"): url;
             url = url.indexOf("&autoplay") != -1 ? url.replace("&autoplay", "?autoplay"): url;
             var modSrc = {
                 autoplay : 1,
                 showinfo : 0
              };
             if(url.indexOf("http://vimeo.com")!= -1 || url.indexOf("https://vimeo.com") != -1){
               if(url.indexOf("vimeo.com/video") != -1){
                  url = url.replace("vimeo.com/video", "player.vimeo.com/video");
               }else if(url.indexOf("vimeo.com") != -1){
                  url = url.replace("vimeo.com", "player.vimeo.com/video");
               }
               modSrc = {
                     showinfo : 0
                  };
             }
             // flash videos
             if (matchesMimeType(item, MIME_TYPE_FLASH)) {
                flashContainer = dojo.create("iframe", {
                   src : lconn.core.url.rewrite(url, modSrc),
                   style : "border: 0",
                   width : "100%",
                   height : "100%"
                // clicking video controls does
                // not open EE
                });
                var setFullScreenParam = "";
                if(!this.isFullScreenEnabled){
              	  var setFullScreenParam = "false";
                }
                flashContainer.setAttribute("frameborder", 0);
                flashContainer.setAttribute("allowfullscreen", setFullScreenParam);
                flashContainer.setAttribute("mozallowfullscreen", setFullScreenParam);
                flashContainer.setAttribute("webkitallowfullscreen", setFullScreenParam);
                // Security Params:
                // http://blogs.adobe.com/stateofsecurity/2007/07/how_to_restrict_swf_content_fr_1.html
                flashVideo = true;
             }
             // HTML5 videos
             else {
                dojo.create("source", {
                   src : url,
                   type : type
                }, videoContainer);
                html5videos = true;
             }
          }));
         
         var errorImageTemplate = dojo.string.substitute(dojo.cache('lconn.core', 'widget/urlPreview/templates/FallBackImage.html'), {
            cantPlayVideo : this.strings.cantPlayVideo
         })
         var errorImageDOM = dojo.toDom(errorImageTemplate);
         // fallback image
         fallbackImg = dojo.create("img", {
            src : this.data.thumbnails[this._currentThumbnailIndex].src,
            className : "fallBackImgIE8"
         });
         dojo.place(fallbackImg, errorImageDOM, "first");

         // IE8 error when trying to attach <IMG> to <OBJECT> element
         // (canHaveChildren = false)
         if (dojo.isIE == 8) {
            flashContainer.altHtml = errorImageDOM.outerHTML;
         }
         // Fallback Image + warning message for IE & FF 24 (ESR)
         else if (dojo.isIE || dojo.isFF == 24) {
            dojo.place(errorImageDOM, html5videos ? videoContainer : flashContainer);
         }
         else {
            // attach the fallback image ONLY for HTML5 video formats
            dojo.place(errorImageDOM, videoContainer);
         }

         if (flashVideo) {
            // create the anchor element as container of the object element, so
            // we can force the focus (the only way to access controllers)
            var anchorAround = dojo.create("a", {
               href : 'javascript:;',
               'aria-label' : this.strings.accessVideoArea,
               'role' : 'application'
            }, this.domNode);
            dojo.place(flashContainer, anchorAround);

            // ENTER key, focus the object element
            this.connect(anchorAround, "onkeydown", function(evt) {
               if (evt.keyCode === dojo.keys.ENTER) {
                  dijit.focus(flashContainer);
                  if (dojo.isFunction(this.videoControlsFocusCallback)) {
                     this.videoControlsFocusCallback();
                  }
                  dojo.publish("ic-ui/urlpreview/video/controls/focused", [ this
                  ]);
               }
            });

            // ESC key, move the focus back to the surrounding anchor
            this.connect(flashContainer, "onkeydown", function(evt) {
               if (evt.keyCode === dojo.keys.ESCAPE) {
                  dijit.focus(anchorAround);
                  if (dojo.isFunction(this.videoControlsBlurCallback)) {
                     this.videoControlsBlurCallback();
                  }
                  dojo.publish("ic-ui/urlpreview/video/controls/blurred", [ this
                  ]);
               }
            });

            // force the focus to the anchor (that surrounds the object)
            dijit.focus(anchorAround);

            if (html5videos && dojo.isIE > 8) {
               dojo.place(videoContainer, flashContainer);
            }
         }
         else {
            dojo.place(videoContainer, this.domNode);
            // force the focus to the video element
            dijit.focus(videoContainer);
         }
      },

      /**
       * Toggles the preview image, used when the user clicks the "Don't Display
       * a Thumbnail" button.
       * 
       * @param {Event}
       *           event The event, unused.
       */
      toggleImage : function(event) {
         if (this.checkBox.checked) {
            dojo.addClass(this.leftPane, "lconnPreviewHidden");
            dojo.addClass(this.imageChooser, "lconnPreviewHidden");
         }
         else {
            dojo.removeClass(this.leftPane, "lconnPreviewHidden");
            if (this.data && this.data.thumbnails && this.data.thumbnails.length > 1) {
               dojo.removeClass(this.imageChooser, "lconnPreviewHidden");
            }
         }
      },

      /**
       * Closes the preview widget.
       * 
       * @fires ic-ui/urlpreview/closed
       * @param {Event}
       *           event The event, unused.
       */
      closePreview : function(event) {
         if (dojo.isFunction(this.closeCallback)) {
            this.closeCallback();
         }
         dojo.publish("ic-ui/urlpreview/closed", [ this
         ]);
      },

      /**
       * Shows the next thumbnail available, or the first if showing the last
       * one.
       * 
       * @param {Event}
       *           event The event, unused.
       */
      nextThumbnail : function(event) {
         // Scroll the image to the next one available
         if (this.data && this.data.thumbnails.length > 0) {
            if (this._currentThumbnailIndex < this.data.thumbnails.length - 1) {
               this._currentThumbnailIndex++;
            }
            else {
               this._currentThumbnailIndex = 0;
            }

            this.setThumbnail(this.data.thumbnails[this._currentThumbnailIndex]);
         }
      },

      /**
       * Shows the previous thumbnail available, or the last if showing the
       * first one.
       * 
       * @param {Event}
       *           event The event, unused.
       */
      previousThumbnail : function(event) {
         // Scrolls the image to the next one available
         if (this.data && this.data.thumbnails.length > 0) {
            if (this._currentThumbnailIndex > 0) {
               this._currentThumbnailIndex--;
            }
            else {
               this._currentThumbnailIndex = this.data.thumbnails.length - 1;
            }

            this.setThumbnail(this.data.thumbnails[this._currentThumbnailIndex]);
         }
      },

      /**
       * Returns the current data.
       * 
       * @returns {json} currentData is the current thumbnail source, thumbnail
       *          alt, url, description and title displayed.
       */
      getCurrentData : function() {
         var currentData = {};
         var thumbnail = {};

         // Do not return the thumbnail if the user has selected not to display
         // it or there are not thumbnails to display
         if (this.data.thumbnails.length > 0 && !this.checkBox.checked) {
            thumbnail.src = this.data.thumbnails[this._currentThumbnailIndex].src;
            thumbnail.alt = this.data.thumbnails[this._currentThumbnailIndex].alt;
         }

         currentData.url = this.data.url;
         currentData.provider_url = this.data.provider_url;
         currentData.title = dojox.html.entities.decode(this.data.title);
         currentData.description = this.data.description || "";
         currentData.thumbnail = thumbnail;
         currentData.video = this.data.video;

         return currentData;
      }

   });

})(lconn.core.util.imagechecker);
