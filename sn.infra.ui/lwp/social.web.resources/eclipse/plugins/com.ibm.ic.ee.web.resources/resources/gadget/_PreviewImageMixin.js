define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/on",
	"dojo/string",
	"dojo/topic",
	"dojo/Deferred",
	"ic-ee/util/misc",
	"ic-incontext/util/html",
	"ic-incontext/util/text",
	"ic-incontext/widget/MessageContainer"
], function (dojo, lang, declare, domConstruct, domStyle, on, string, topic, Deferred, misc, html, text, MessageContainer) {

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	var _PreviewImageMixin = declare("com.ibm.social.ee.gadget._PreviewImageMixin", null, {
	   messageContainer: null,
	   // Must be implemented 
	   getPreviewImageLink: function () {},
	   getPreviewImageNode: function () {},
	   getEntryUrl: function() {},
	   onDisplayChange: function() {},
	   getPreviewImageData: function () {},  // Must return: { size, downloadTooltip, downloadLink }
	   // May be implemented
	//   onErrorMessage: function () { },
	      
	   // Initialize preview image
	   initializePreviewImage: function() {
	      var ctnr = this.getPreviewImageNode();
	      var previewLink = this.getPreviewImageLink();
	
	      // hack to remove "anonymous" from the URL that we get from the Files endpoint
	      if (this.routes.oauth) {
	    	  var ANONYMOUS = encodeURIComponent("/anonymous");
	    	  if(previewLink && previewLink.indexOf(ANONYMOUS)!==-1){
	    		  previewLink = previewLink.replace(ANONYMOUS,"");
	    	  }
	      }
	
	      if (previewLink && !this.isVideoPlayable()) {
	         var previewData = this.getPreviewImageData();
	         var loading = domConstruct.create("div", {}, ctnr);   
	         html.showLoading(loading);
	         var div = domConstruct.create("div", {style: "width: 0px; height: 0px; overflow: hidden;"}, ctnr);
	         var a = domConstruct.create("a", { href: previewData.downloadLink, id: this.getPrefix() + "_image_previewLink" }, div);
	         on(a, "click", lang.hitch(this, "navigateToUrl", false, a.href, this.checkExists));
	         a.title = string.substitute(previewData.downloadTooltip, [text.formatSize(previewData.size)]);
	         var img = domConstruct.create("img", {}, a); 
	         on(img, "load", lang.hitch(this, this._imgLoaded, ctnr, div, img, loading));
	         on(img, "error", lang.hitch(this, this._imgLoadErr, ctnr, loading));
	         img.src = previewLink;
	         img.alt = a.title;
	      } 
	   },
	   _imgLoaded: function(ctnr, imgCtnr, img, loading) {
	  	  ctnr.style.display = "";
	      loading.style.display = "none";
	      domStyle.set(imgCtnr, { width: "", height: "", overflow: "" });
	      this.onSizeChange();
	   },
	   _imgLoadErr: function(ctnr, loading) {
	      ctnr.style.display = "none";
	      this.onSizeChange();
	   },
	
	   navigateToUrl: function(newWindow, href, checkExistsFunct, e) {
	       if(!newWindow)
	          e.preventDefault(), e.stopPropagation();
	       var scope = this;
	       var dfd = new Deferred();
		   checkExistsFunct(this, function(bean, useFileStr) {
			  var nls = i18nsocialEEStrings;
		      if (bean) {
		    	 if(!newWindow) {
		    		 //download event
		             window.location.href = href;
		    		 dfd.callback();
		    	 }
		    	 else {
		    		 //preview event
				     var updatedName = bean.getName();
					 var ext = text.getExtension(updatedName);
		             if (misc.isImage(ext)) {
		            	dfd.callback();	
		             }
		             else {
		                dfd.errback();
		                scope.onErrorMessage(null, null, nls.ecm_file.error_preview); //This string should exist in the general preview object, not ecm_file. Change after string freeze
		             }
		    	 }
			  }
			  else {
				 //We got null back because something was deleted 
			     dfd.errback();
			     if (useFileStr)
			        scope.onErrorMessage(null, null, nls.file.error_404);
			     else
				    scope.onErrorMessage();
		      }
		   });
	       return dfd;
	   },
	   getPrefix: function() {
	      return "";
	   }
	});
	return _PreviewImageMixin;
});
