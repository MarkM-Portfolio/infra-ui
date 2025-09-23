/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/has",
	"ic-ee/bean/AtomBean",
	"ic-ee/bean/User",
	"ic-incontext/util/dom"
], function (array, declare, has, AtomBean, User, dom) {

	(function(){
		var util = com.ibm.social.incontext.util;  
		var BlogComment = declare("com.ibm.social.ee.bean.BlogComment", AtomBean, {
			category: "comment", 
		 FLAGS_SCHEME: "http://www.ibm.com/xmlns/prod/sn/flags",
		 TERM_DELETED: "deleted",
		
		 getDeleted: function () {
			if (!("deleted" in this)) {
				this._readCategories();
			}
			return this.deleted;
		 },
		 getModifier: function () {		   
			if (!this.modifier)
	           this.modifier = new User(util.dom.getElementsByTagNameNS(this.e, "contributor", util.dom.ATOM_NAMESPACE)[0]);
			if (!this.modifier)
			   this.modifier = this.getAuthor();
	        return this.modifier;
	     },
		 getModerationStatus: function () {
		      if (!this.moderationStatus) {
		         this.moderationStatus = util.dom.getChildElementNSAttribute(this.e, "moderation",  util.dom.SNX_NAMESPACE, "status");
		      }
		      return this.moderationStatus;  
		   },
		 getContent: function() {
		    var content = this.inherited(arguments), replaceRegex = has("ie") ? /\n\n/g: /\n/g;
		    return ((util.dom.getChildElementNSAttribute(this.e, "content", util.dom.ATOM_NAMESPACE, "type") == "text") && content) ? 
		          content.replace(replaceRegex, "<br />") : content;
	
	     },
		 getAllowReplies: function() {
		    this.allowReplies = false;
		    var collectionElements = util.dom.getChildElementsNS(this.e, "collection", util.dom.APP_NAMESPACE);
			array.forEach(collectionElements, function (ei) { 
	            var categoryElements = util.dom.getChildElementsNS(ei, "category", util.dom.ATOM_NAMESPACE);   
				array.forEach(categoryElements, function (ej) {
	                var term = ej.getAttribute("term");
					if(term == 'comments') {
					    this.allowReplies = true;
					}
				}, this);
	         }, this);
			 return this.allowReplies;
		 },
		 
		 _readCategories: function () {
	         var categoryElements = util.dom.getChildElementsNS(this.e, "category", util.dom.ATOM_NAMESPACE);
	         var deleted = false;
	         array.forEach(categoryElements, function (el) { 
	            var scheme = el.getAttribute("scheme");
	            var term = el.getAttribute("term");
	            if (scheme) {
	              if (scheme == this.FLAGS_SCHEME) {
	                 if (term == this.TERM_DELETED) deleted = true;                 
	              }
	            }            
	         }, this);
	         this.deleted = deleted;
	    }
	});
	})();
	return BlogComment;
});
