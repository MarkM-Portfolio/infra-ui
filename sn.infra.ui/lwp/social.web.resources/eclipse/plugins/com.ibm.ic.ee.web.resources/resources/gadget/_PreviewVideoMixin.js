/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-incontext/videoPreview/VideoPreviewNode"
], function (declare, lang, VideoPreviewNode) {

	var _PreviewVideoMixin = declare("com.ibm.social.ee.gadget._PreviewVideoMixin", null, {
	
	    getPreviewVideoNode: function () {},
	    onSizeChange: function () {},
	    onDisplayChange: function () {},
	
	    videoPreview: "",
	
	    // Initialize preview image
	   initPreviewVideo: function(previewNode, fileName, fileUrl, filePageUrl, authorInfo) {
	
	          var previewLink = this.getPreviewImageLink();
	
	          var onSizeChange = lang.hitch(this, function(){
	              this.onSizeChange();
	          });
	
	          this.videoPreview = new VideoPreviewNode({
	              data:{
	                  title : fileName,
	                  fileUrl : fileUrl,
	                  filePageUrl: filePageUrl,
	                  tagsTextNode: null,
	                  authorInfo: authorInfo,
	                  fileDetailsContainer: null,
	                  image : previewLink,
	                  imageHeight: 0,
	                  imageWidth: 350,
	                  maxHeight: 175,
	                  prevId: null,
	                  nextId: this.prefix + "_downloadLink",
	                  context: this.context
	              },
	              onSizeChange: onSizeChange
	          });
	          this.videoPreview.placeAt(previewNode);
	  
	          if(this.context.onCloseDeferred && this.context.onCloseDeferred.fired === -1){
	        	  this.context.onCloseDeferred.addCallback(this , "onClose");
	          }
	
	   },
	
	    onClose: function(){
	        if (this.videoPreview){
	            this.videoPreview.destroy();
	        }
	    }
	
	});
	return _PreviewVideoMixin;
});
