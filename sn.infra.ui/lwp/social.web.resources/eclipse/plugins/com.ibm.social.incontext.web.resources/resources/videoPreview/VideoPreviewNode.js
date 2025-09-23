/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014		                                     */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.videoPreview.VideoPreviewNode");
dojo.require("lconn.core.widget.urlPreview.URLPreviewNode");
dojo.require("com.ibm.oneui.util.Url");
dojo.require("lconn.core.config.properties");
dojo.require("lconn.core.url");
dojo.require("com.ibm.social.incontext.util.VideoPlayerUtil");
dojo.require("net.jazz.ajax.xdloader");
dojo.require("com.ibm.social.incontext.util.proxy");
dojo.requireLocalization("lconn.core.widget.urlPreview", "URLPreview");
dojo.requireLocalization("com.ibm.social.incontext", "socialInContextCoreStrings");

/**
 * Video Preview Node widget extends URLPreviewNode widget
 *
 * @class com.ibm.social.incontext.videoPreview.VideoPreviewNode
 * @extends lconn.core.widget.urlPreview.URLPreviewNode
 * @extends dijit._Widget
 * @extends dijit._Templated
 * @author Johann Ott <johannot@ie.ibm.com>
 */
dojo.declare("com.ibm.social.incontext.videoPreview.VideoPreviewNode", [lconn.core.widget.urlPreview.URLPreviewNode],
/** @lends lccom.ibm.social.incontext.videoPreview.VideoPreviewNode.prototype */
{
   /**
    * Path to the widget template
    *
    * @type {String}
    */
   templatePath : dojo.moduleUrl("com.ibm.social.incontext", "videoPreview/templates/VideoPreview.html"),

   /**
    * Strings used by this widget
    *
    * @type {Object}
    */
   strings : dojo.i18n.getLocalization("lconn.core.widget.urlPreview", "URLPreview"),

   incontext_strings : dojo.i18n.getLocalization("com.ibm.social.incontext", "socialInContextCoreStrings"),
   /**
    * URL preview data can be mixed in directly to avoid hitting
    * the backend service
    */
   data : null,

   videoPlayer : null,

   isEE : null,

   constructor : function(args) {

   },

   postCreate : function() {

      this.isEE = this.onSizeChange;

      if (this.data) {
         this.renderData(this.data);
      }

      this.videoPlayer = new com.ibm.social.incontext.util.VideoPlayerUtil();

      if (com.ibm.social.incontext.util.html.isHighContrast()){
          dojo.removeClass(this.highContrastThumbnailText, "lotusHidden");
          dojo.removeClass(this.highContrastPlayText, "lotusHidden");
          dojo.attr(this.highContrastPlayText, "innerHTML", this.strings.playVideo);
      }

   },

   /**
    * Renders data passed in suitable format as argument
    *
    * @param {URLPreviewData}
    *           data The data to render
    */
   renderData : function(data) {
      if (data && data.title) {

         var videoTitle =  dojox.html.entities.decode(data.title);
         
         this.highContrastThumbnailText.textContent = videoTitle;
         dojo.attr(this.thumbnail, "alt", videoTitle);      
         
         dojo.attr(this.domNode, "role", "region");
         dojo.attr(this.domNode, "aria-label", dojo.string.substitute(this.incontext_strings.VIDEO_PREVIEW.ARIA_VIDEO_PREVIEW, [ videoTitle ]));

         this.connect(this.thumbnailContainer, "onmouseover", function(e) {
            dojo.replaceClass(this.playBtn, "otherHTML5Player16-play-overlay-sm-hover", "otherHTML5Player16-play-overlay-sm");
         });
         this.connect(this.thumbnailContainer, "onmouseout", function(e) {
            dojo.replaceClass(this.playBtn, "otherHTML5Player16-play-overlay-sm", "otherHTML5Player16-play-overlay-sm-hover");
         });

         dojo.removeClass(this.domNode, "lconnPreviewHidden");

         this.fileOverlayViewer = dojo.getObject("lconn.share.fileviewer.ConnectionsFileViewer");
         if (this.fileOverlayViewer) {
             this.connect(this.thumbnailContainer, "onclick", "showFileOverlay");
         } else {
             this.connect(this.thumbnailContainer, "onclick", "showMedia");
         }

         dojo.attr(this.thumbnailContainer, "href", "javascript:;");
         dojo.attr(this.thumbnailContainer, "role", "button");
         //dojo.attr(this.thumbnailContainer, "aria-label", this.strings.playVideo);
         dojo.attr(this.thumbnailContainer, "title", dojo.string.substitute(this.incontext_strings.VIDEO_PREVIEW.ARIA_VIDEO_TITLE, [ videoTitle ]));
         dojo.attr(this.thumbnailContainer, "aria-label",this.incontext_strings.VIDEO_PREVIEW.ARIA_VIDEO_DOWNLOAD);

         this.titleNode.firstElementChild.textContent ? 
            this.titleNode.firstElementChild.textContent = videoTitle : this.titleNode.firstElementChild.innerText = videoTitle;

         if (data.image){
            this.setThumbnail(data.image);
         } else{
             dojo.addClass(this.thumbnailContainer, "videoPreviewNoThumbnail");
         }

        if(data.filePageUrl === data.fileUrl){
            dojo.removeAttr(this.titleNode.firstElementChild,"target");
        }

         if (data.tagsTextNode || data.authorInfo){

             dojo.removeClass(this.fileMetaNode, "lotusHidden");

             // if the user is external then we don't show links for user profiles
             var isUserExternal = lconn.core.auth.getUser() && lconn.core.auth.getUser().isExternal;

             if(data.authorInfo && isUserExternal){
                   dojo.addClass(this.authorNode, "lotusBold");
             }

             if (data.tagsTextNode){
                  dojo.place(data.tagsTextNode, this.tagNode);
                  dojo.removeClass(this.tagNode, "lotusHidden");// Show tags
              }
         }

        if (data.isFileOverlayEnabled){
          dojo.empty(this.titleNode);
          dojo.byId(this.titleNode).textContent = videoTitle;
        }
      }
   },

    showFileOverlay: function () {
        if (this.fileOverlayViewer && this.data.filePageUrl!="") {
            var args = {};
            args.previewOptions = {};
            args.previewOptions.volumeOnStart = 0.75;

            this.fileOverlayViewer.openFromUrl(this.data.filePageUrl, args);
        } else {
            console.warn("Could not show file overlay");
        }
    },

    /**
     * Sets the thumbnail for the image or the video
     *
     * @param {URLThumbnailData}
     *           thumbnailData The thumbnail data
     */
    setThumbnail : function(thumbnailData) {
        if (dojo.isIE == 8) {
            dojo.attr(this.thumbnail, "src", thumbnailData);
            dojo.style(this.thumbnail, "width", "120px");
            dojo.style(this.thumbnail, "height", "120px");
            dojo.addClass(this.playBtn,"playBtnInIE8");
        }else{
            dojo.style(this.thumbnailContainer, "background", "url(\"" + thumbnailData + "\") no-repeat 50% 50%");
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
      return this.showVideo(arguments);
   },

   /**
    * Shows the video preview so the user can play it
    *
    * @param {Event}
    *           event The event, unused.
    */
   showVideo : function(event) {
	  var fileUrl = com.ibm.social.incontext.util.proxy(this.data.fileUrl);
      dojo.addClass(this.leftPane, "lconnPreviewHidden");
      dojo.addClass(this.rightPane, "lconnPreviewHidden");
      var screenWidth = (this.data.imageWidth) ? this.data.imageWidth : dojo.marginBox(this.domNode).w;
       if(this.isEE){
           this.videoPlayer.playVideo(this.data.title, fileUrl, this.domNode, screenWidth, this.data.imageHeight, this.data.maxHeight, this.onSizeChange, this.downloadFailed, this.data.prevId, this.data.nextId, this.data.context);

            var fn = dojo.hitch(this, function(){
                this.onSizeChange();
            });
            setTimeout(fn,500);
       }else{
           dojo.xhr("HEAD",{
               url: fileUrl,
               load: dojo.hitch(this, function(){
                   this.videoPlayer.playVideo(this.data.title, fileUrl, this.domNode, screenWidth, this.data.imageHeight, this.data.maxHeight, this.onSizeChange, this.downloadFailed, this.data.prevId, this.data.nextId, false);
               }),
               error: dojo.hitch(this, "downloadFailed", this.domNode, this.strings.cantPlayVideo)
           });
       }

       if(this.data.fileDetailsContainer){
           dojo.removeClass(this.data.fileDetailsContainer, "lotusHidden");
       }

   },

   downloadFailed: function(node, message){
       var errorImageTemplate = dojo.string.substitute(dojo.cache('lconn.core', 'widget/urlPreview/templates/FallBackImage.html'), {
           cantPlayVideo: message
       })
       var errorImageDOM = dojo.toDom(errorImageTemplate);
       var errorImageMainDivList = dojo.query('.lconnPreviewFallbackImg',errorImageDOM);
       if(errorImageMainDivList.length > 0){
    	   var errorImageMainDiv = errorImageMainDivList[0];
           dojo.attr(errorImageMainDiv, "tabindex", "-1");
           dojo.place(errorImageMainDiv, node);
           dijit.focus(errorImageMainDiv);   
       }
   }

});

