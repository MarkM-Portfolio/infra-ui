/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.           */

define([
	"dojo",
	"dojo/string",
	"dojo/_base/declare",
	"dojo/has",
	"dojo/dom-style",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/dom-geometry",
	"dojo/i18n!ic-core/widget/urlPreview/nls/URLPreview",
	"dojo/dom-attr",
	"dojo/i18n!ic-incontext/nls/socialInContextCoreStrings",
	"dojo/on",
	"dojo/request/xhr",
	"dojo/text!ic-core/widget/urlPreview/templates/FallBackImage.html",
	"dojo/text!ic-incontext/videoPreview/templates/VideoPreview.html",
	"dijit/focus",
	"ic-core/auth",
	"ic-core/config/properties",
	"ic-core/url",
	"ic-core/widget/urlPreview/URLPreviewNode",
	"ic-incontext/util/VideoPlayerUtil",
	"ic-incontext/util/html",
	"ic-incontext/util/proxy",
	"ic-ui/util/Url",
	"net/jazz/ajax/xdloader"
], function (dojo, string, declare, has, domStyle, lang, domClass, domConstruct, domGeometry, i18nURLPreview, domAttr, i18nsocialInContextCoreStrings, on, xhr, templateVideo, templateFallback, focusUtils, auth, properties, url, URLPreviewNode, VideoPlayerUtil, html, proxy, Url, xdloader) {

	/**
	 * Video Preview Node widget extends URLPreviewNode widget
	 *
	 * @class com.ibm.social.incontext.videoPreview.VideoPreviewNode
	 * @extends lconn.core.widget.urlPreview.URLPreviewNode
	 * @extends dijit._Widget
	 * @extends dijit._Templated
	 * @author Johann Ott <johannot@ie.ibm.com>
	 */
	var VideoPreviewNode = declare("com.ibm.social.incontext.videoPreview.VideoPreviewNode", URLPreviewNode,
	/** @lends lccom.ibm.social.incontext.videoPreview.VideoPreviewNode.prototype */
	{
	   /**
	    * Path to the widget template
	    *
	    * @type {String}
	    */
	   templateString: templateVideo,

	   /**
	    * Strings used by this widget
	    *
	    * @type {Object}
	    */
	   strings : i18nURLPreview,

	   incontext_strings : i18nsocialInContextCoreStrings,
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

	      this.videoPlayer = new VideoPlayerUtil();

	      if (html.isHighContrast()){
	          domClass.remove(this.highContrastThumbnailText, "lotusHidden");
	          domClass.remove(this.highContrastPlayText, "lotusHidden");
	          domAttr.set(this.highContrastPlayText, "innerHTML", this.strings.playVideo);
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
	         domAttr.set(this.domNode, "role", "region");
	         domAttr.set(this.domNode, "aria-label", string.substitute(this.incontext_strings.VIDEO_PREVIEW.ARIA_VIDEO_PREVIEW, [ videoTitle ]));

	         this.connect(this.thumbnailContainer, "onmouseover", function(e) {
	            domClass.replace(this.playBtn, "otherHTML5Player16-play-overlay-sm-hover", "otherHTML5Player16-play-overlay-sm");
	         });
	         this.connect(this.thumbnailContainer, "onmouseout", function(e) {
	            domClass.replace(this.playBtn, "otherHTML5Player16-play-overlay-sm", "otherHTML5Player16-play-overlay-sm-hover");
	         });

	         domClass.remove(this.domNode, "lconnPreviewHidden");

	         this.own(on(this.thumbnailContainer, "click", lang.hitch(this, "showMedia")));
	         domAttr.set(this.thumbnailContainer, "href", "javascript:;");
	         domAttr.set(this.thumbnailContainer, "role", "button");
	         //dojo.attr(this.thumbnailContainer, "aria-label", this.strings.playVideo);
	         domAttr.set(this.thumbnailContainer, "title", string.substitute(this.incontext_strings.VIDEO_PREVIEW.ARIA_VIDEO_TITLE, [ videoTitle ]));
	         domAttr.set(this.thumbnailContainer, "aria-label", this.incontext_strings.VIDEO_PREVIEW.ARIA_VIDEO_DOWNLOAD);

	         this.titleNode.firstChild.textContent ? 
	            this.titleNode.firstChild.textContent = videoTitle : this.titleNode.firstChild.innerText = videoTitle;

	         if (data.image){
	            this.setThumbnail(data.image);
	         } else{
	             domClass.add(this.thumbnailContainer, "videoPreviewNoThumbnail");
	         }

	        if(data.filePageUrl === data.fileUrl){
	            domAttr.remove(this.titleNode.childNodes[0],"target");
	        }

	         if (data.tagsTextNode || data.authorInfo){

	             domClass.remove(this.fileMetaNode, "lotusHidden");

	             // if the user is external then we don't show links for user profiles
	             var isUserExternal = auth.getUser() && auth.getUser().isExternal;

	             if(data.authorInfo && isUserExternal){
	                   domClass.add(this.authorNode, "lotusBold");
	             }

	             if (data.tagsTextNode){
	                  domConstruct.place(data.tagsTextNode, this.tagNode);
	                  domClass.remove(this.tagNode, "lotusHidden");// Show tags
	              }
	         }

	      }
	   },


	    /**
	     * Sets the thumbnail for the image or the video
	     *
	     * @param {URLThumbnailData}
	     *           thumbnailData The thumbnail data
	     */
	    setThumbnail : function(thumbnailData) {
	        if (has("ie") == 8) {
	            domAttr.set(this.thumbnail, "src", thumbnailData);
	            domStyle.set(this.thumbnail, "width", "120px");
	            domStyle.set(this.thumbnail, "height", "120px");
	            domClass.add(this.playBtn,"playBtnInIE8");
	        }else{
	            domStyle.set(this.thumbnailContainer, "background", "url(\"" + thumbnailData + "\") no-repeat 50% 50%");
	            domStyle.set(this.thumbnailContainer, "backgroundSize", "cover");
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
		  var fileUrl = proxy(this.data.fileUrl);
	      domClass.add(this.leftPane, "lconnPreviewHidden");
	      domClass.add(this.rightPane, "lconnPreviewHidden");
	      var screenWidth = (this.data.imageWidth) ? this.data.imageWidth : domGeometry.marginBox(this.domNode).w;
	       if(this.isEE){
	           this.videoPlayer.playVideo(this.data.title, fileUrl, this.domNode, screenWidth, this.data.imageHeight, this.data.maxHeight, this.onSizeChange, this.downloadFailed, this.data.prevId, this.data.nextId, this.data.context);

	            var fn = lang.hitch(this, function(){
	                this.onSizeChange();
	            });
	            setTimeout(fn,500);
	       }else{
	           xhr("HEAD",{
	               url: fileUrl,
	               load: lang.hitch(this, function(){
	                   this.videoPlayer.playVideo(this.data.title, fileUrl, this.domNode, screenWidth, this.data.imageHeight, this.data.maxHeight, this.onSizeChange, this.downloadFailed, this.data.prevId, this.data.nextId, false);
	               }),
	               error: lang.hitch(this, "downloadFailed", this.domNode, this.strings.cantPlayVideo)
	           });
	       }

	       if(this.data.fileDetailsContainer){
	           domClass.remove(this.data.fileDetailsContainer, "lotusHidden");
	       }

	   },

	   downloadFailed: function(node, message){
	       var errorImageTemplate = string.substitute(templateFallback, {
	           cantPlayVideo: message
	       })
	       var errorImageDOM = domConstruct.toDom(errorImageTemplate);
	       domAttr.set(errorImageDOM, "tabindex", "-1");
	       domConstruct.place(errorImageDOM, node);
	       focusUtils.focus(errorImageDOM);
	   }

	});


	return VideoPreviewNode;
});
