/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget._PreviewImageMixin");
dojo.require("com.ibm.social.incontext.widget.MessageContainer");

dojo.declare("com.ibm.social.ee.gadget._PreviewImageMixin", null, {
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
         var loading = dojo.create("div", {}, ctnr);
         com.ibm.social.incontext.util.html.showLoading(loading);
         var div = dojo.create("div", {style: "width: 0px; height: 0px; overflow: hidden;"}, ctnr);
         var a = dojo.create("a", { href: previewData.downloadLink, id: this.getPrefix() + "_image_previewLink" }, div);
         dojo.connect(a, "onclick", dojo.hitch(this, "navigateToUrl", false, a.href, this.checkExists));
         a.title = dojo.string.substitute(previewData.downloadTooltip, [com.ibm.social.incontext.util.text.formatSize(previewData.size)]);
         var img = dojo.create("img", {style: "border: 1px solid rgba(0, 0, 0, 0.3); box-shadow: 0 0 8px rgba(0, 0, 0, 0.18);"}, a);
         dojo.connect(img, "onload", dojo.hitch(this, this._imgLoaded, ctnr, div, img, loading));
         dojo.connect(img, "onerror", dojo.hitch(this, this._imgLoadErr, ctnr, loading));
         img.src = previewLink;
         img.alt = a.title;
      }
   },
   _imgLoaded: function(ctnr, imgCtnr, img, loading) {
	  ctnr.style.display = "";
      loading.style.display = "none";
      dojo.style(imgCtnr, { width: "", height: "", overflow: "" });
      this.onSizeChange();
   },
   _imgLoadErr: function(ctnr, loading) {
      ctnr.style.display = "none";
      this.onSizeChange();
   },

   navigateToUrl: function(newWindow, href, checkExistsFunct, e) {
       if(!newWindow)
          dojo.stopEvent(e);
       var scope = this;
       var dfd = new dojo.Deferred();
	   checkExistsFunct(this, function(bean, useFileStr) {
		  var nls = dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings");
	      if (bean) {
	    	 if(!newWindow) {
	    		 //download event
	             window.location.href = href;
	    		 dfd.callback();
	    	 }
	    	 else {
	    		 //preview event
			     var updatedName = bean.getName();
				 var ext = com.ibm.social.incontext.util.text.getExtension(updatedName);
	             if (com.ibm.social.ee.util.misc.isImage(ext)) {
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