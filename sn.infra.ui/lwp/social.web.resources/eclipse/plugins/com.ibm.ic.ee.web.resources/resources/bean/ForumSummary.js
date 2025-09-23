/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/bean/Bean",
	"ic-ee/bean/ForumTopic",
	"ic-incontext/util/dom"
], function (declare, lang, Bean, ForumTopic, dom) {

	/* Loads data from a BlogEntry Feed*/
	(function(){
	   var du = dom;
	   var ForumSummary = declare("com.ibm.social.ee.bean.ForumSummary", Bean, {
	      constructor: function(entry, base, values) {
	         this.e = entry;
	         this.setBase(entry, base);
	         if (values)
	            lang.mixin(this, values);
	      },
	      getTopic: function () {
	         if (!("topic" in this)) {
	            var entries = this._getEntries();
	            this.topic = new ForumTopic(entries[0]);
	         }
	         return this.topic; 
	      },
	      isReplyToReply: function () {
	        if (!("replyToReply" in this)) {
	           var entries = this._getEntries();
	           this.replyToReply = (entries.length > 2);
	        }
	        return this.replyToReply;
	      },
	      getParentReply: function () {
	         if (!("parentReply" in this)) {
	            var entries = this._getEntries();
	            this.parentReply = (entries.length > 1) ?
	               new com.ibm.social.ee.bean.ForumReply(entries[1]) : null;
	         }
	         return this.parentReply;       
	      },
	      getChildReply: function () {
	         if (!("childReply" in this)) {
	            var entries = this._getEntries();
	            this.childReply = (entries.length > 2) ? 
	               new com.ibm.social.ee.bean.ForumReply(entries[2]) : null;
	         }
	         return this.childReply;
	      },
	      _getEntries: function () {
	         if (!("entries" in this)) {
	            this.entries = du.getChildElementsNS(this.e, "entry", du.ATOM_NAMESPACE);
	         }
	         return this.entries;
	      }
	      
	      
	   });
	})();
	               
	return ForumSummary;
});
