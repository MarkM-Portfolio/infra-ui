/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on",
	"ic-core/widget/urlPreview/URLPreviewNode",
	"ic-incontext/util/url",
	"ic-incontext/widget/MessageContainer"
], function (declare, lang, on, URLPreviewNode, url, MessageContainer) {

	/* globals com, lconn */
	
	var _UrlPreviewMixin = declare("com.ibm.social.ee.gadget._UrlPreviewMixin", null, {
	    messageContainer: null,
	    // Must be implemented
	
	
	    // Initialize url preview
	    createUrlPreviewNode: function (previewNode) {
	
	        var urlThumbnails = [];
	        var playbackEnabled = false;
	        var urlVideo = "";
	        var provider_url = "";
	
	        if (this.data.ref.imageUrl) {
	            urlThumbnails = [
	                { src: this.data.ref.imageUrl, alt: this.data.ref.displayName}
	            ];
	        }
	
	        if (this.data.ref.video && this.data.ref.video[0]) {
	
	            urlVideo = [
	                {
	                    "type": this.data.ref.video[0].type,
	                    "width": this.data.ref.video[0].width,
	                    "height": this.data.ref.video[0].height,
	                    "url": this.data.ref.video[0].url
	                }
	            ];
	            playbackEnabled = true;
	        }
	
	        provider_url = url.removeRelativePathFromHost(this.data.ref.url);
	
	        var videoControlsFocusCallbackFn = function () {
	            if (lang.getObject("com.ibm.connections.ee")) {
	                com.ibm.connections.ee.preventCloseOnEscape();
	            }
	        };
	
	        var videoControlsBlurCallbackFn = function () {
	            if (lang.getObject("com.ibm.connections.ee")) {
	                com.ibm.connections.ee.allowCloseOnEscape(true);
	            }
	        };
	
	        var urlPreview = new URLPreviewNode({
	            url: this.data.ref.url,
	            data: {
	                url: this.data.ref.url,
	                provider_url: provider_url,
	                title: this.data.ref.displayName,
	                description: this.data.ref.description,
	                thumbnails: urlThumbnails,
	                video: urlVideo,
	                enablePlayback: playbackEnabled
	            },
	            videoControlsFocusCallback: videoControlsFocusCallbackFn,
	            videoControlsBlurCallback: videoControlsBlurCallbackFn
	        });
	
	        urlPreview.placeAt(previewNode, "first");
	
	        previewNode.style.display = "";
	
	        on(urlPreview.thumbnailContainer, "click", lang.hitch(this, this.onSizeChange));
	    }
	
	});
	return _UrlPreviewMixin;
});
