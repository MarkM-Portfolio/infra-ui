/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean",
	"ic-ee/bean/Moderated",
	"ic-ee/bean/_ForumRecommendationMixin",
	"ic-incontext/util/dom"
], function (array, declare, AtomBean, Moderated, _ForumRecommendationMixin, dom) {

	(function(){
	   var util = com.ibm.social.incontext.util;
		var ForumReply = declare("com.ibm.social.ee.bean.ForumReply", [AtomBean, Moderated, _ForumRecommendationMixin], {
			category: "comment",		
			FLAGS_SCHEME: "http://www.ibm.com/xmlns/prod/sn/flags",
			TERM_DELETED: "deleted",
			TERM_ANSWER: "answer",
			getParentUuid: function () {
			   if (!("parentUuid" in this)) {
			      var uuid = util.dom.getChildElementNSAttribute(this.e, "in-reply-to", util.dom.THREAD_ATOM_NAMESPACE, "ref");
			      this.parentUuid = uuid.replace(/.*forum:/,'' );
			   }
			   return this.parentUuid;
			},
			getDeleted: function () {
			   if (!("deleted" in this)) {
			      this._readCategories();
			   }
			   return this.deleted;
			},
			isAnswer: function () {
			   if (!("answer" in this)) {
		         this._readCategories();
		      }
		      return this.answer;
			},
			getModifier: function () {		   
			   return this.getAuthor();
			},
	      _readCategories: function () {
	         var categoryElements = util.dom.getChildElementsNS(this.e, "category", util.dom.ATOM_NAMESPACE);
	         var deleted = false;
	         var answer = false;
	         array.forEach(categoryElements, function (el) { 
	            var scheme = el.getAttribute("scheme");
	            var term = el.getAttribute("term");
	            if (scheme) {
	              if (scheme == this.FLAGS_SCHEME) {
	                 if (term == this.TERM_DELETED) deleted = true;
	                 else if (term == this.TERM_ANSWER) answer = true;                 
	              }
	            }            
	         }, this);
	         this.deleted = deleted;
	         this.answer = answer;
	      }, 		
	      getPermissions: function() {
	         if (!("permissions" in this)) {
	            var str = util.dom.getChildElementTextContentNS(this.e, "permissions", util.dom.SNX_NAMESPACE);
	            var arr = str.split(",");
	            var perms = { };
	            for (var i = 0; i < arr.length; i++) perms[arr[i]] = true;
	            this.permissions = perms;
	         }
	         return this.permissions;
	      },
	      getUrlAlternate: function() {
	         var du = util.dom;
	         if (!("altUrl" in this)) {
	            this.altUrl = "";
	            var links = du.getChildElementsNS(this.e, "link", du.ATOM_NAMESPACE);
	            for (var i = 0; i < links.length; i++) {
	               if (links[i].getAttribute("rel") == "alternate") {
	                  this.altUrl = links[i].getAttribute("href");
	                  break;
	               }
	            }
	         }
	         return this.altUrl;
	      }
		});
	
	})();
	return ForumReply;
});
