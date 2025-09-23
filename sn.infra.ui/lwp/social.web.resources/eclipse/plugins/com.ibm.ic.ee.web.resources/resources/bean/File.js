/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean",
	"ic-incontext/util/dom",
	"ic-incontext/util/text"
], function (declare, AtomBean, dom, text) {

	(function () {
	var util = com.ibm.social.incontext.util;
	
	var File = declare("com.ibm.social.ee.bean.File", AtomBean, {
	   getSize: function() {
	      if (typeof this.size == "undefined")
	         this.size = util.text.parseInt(util.dom.getChildElementAttributeMatchingNS(this.e, "link", util.dom.ATOM_NAMESPACE, "rel", null, "enclosure", "length", null));
	      return this.size;
	   },
	   getTotalMediaSize: function() {
	      if (typeof this.totalSize == "undefined")
	         this.totalSize = util.text.parseInt(util.dom.getChildElementTextContentNS(this.e, "totalMediaSize", util.dom.DOCUMENTS_ATOM_NAMESPACE));
	      return this.totalSize;
	   },
	   getTags: function() {
	      if (!this.tags) {
	         var tags = [];
	         for (var i=0; i < this.e.childNodes.length; i++) {
	            var child = this.e.childNodes[i];
	            if (child.nodeName == "category" && child.getAttribute("scheme") === null)
	               tags.push(child.getAttribute("term"));
	         }
	         this.tags = tags;
	      }
	      return this.tags;
	   },
	   getVisibility: function () {
	      if (!("visibility" in this)) {
	         this.visibility = util.dom.getChildElementTextContentNS(this.e, "visibility", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	      }
	      return this.visibility;
	   },
	   getUrlRendition: function(){
	      return this.prependBase(util.dom.getChildElementAttributeMatchingNS(this.e, "link", util.dom.ATOM_NAMESPACE, "rel", null, "rendition", "href"));
	   }
	});
	
	})();
	return File;
});
