/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Page");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.bean.File");

dojo.declare("lconn.share.bean.Page", lconn.share.bean.File, {	
   getCategory: function() {return "page";},
	getContent : function () {      
	   return this.content || lconn.share.util.dom.getChildElementTextContent(this.e, "content");
	},
   getUrlDownloadAsHTML: function() {
      var url = lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "href");
      if (url)
         url = lconn.share.util.uri.rewriteUri(url + ".html", {errorPage:true,convertTo:"html"});
      return url;
   },
   getUrlDownloadAsPDF: function() {
      var url = lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "href");
      if (url)
         url = lconn.share.util.uri.rewriteUri(url + ".pdf", {errorPage:true,convertTo:"pdf"});
      return url;
   },
   getUrlDownloadAsRTF: function() {
      var url = lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "href");
      if (url)
         url = lconn.share.util.uri.rewriteUri(url + ".rtf", {errorPage:true,convertTo:"rtf"});
      return url;
   },
   getDraftId: function() {
      return lconn.share.util.dom.getChildElementTextContentNS(this.e, "draftUuid", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
   },
   getDraftCreated: function() {
      return lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "draftCreated", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
   },
   getDraftModified: function() {
      return lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "draftModified", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
   }
});

dojo.declare("lconn.share.bean.PageCopy", lconn.share.bean.FileCopy, {  
   baseClass: lconn.share.bean.Page,
   getCategory: function() {return "page";}
});
