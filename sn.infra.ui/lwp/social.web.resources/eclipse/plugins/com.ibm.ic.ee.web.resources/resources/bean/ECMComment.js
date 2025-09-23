/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/Comment",
	"ic-ee/bean/ECMUser",
	"ic-incontext/util/dom"
], function (declare, Comment, ECMUser, dom) {

	var ECMComment = declare("com.ibm.social.ee.bean.ECMComment", Comment, {
	   getAuthor: function() {
	      if (!this.author)
	         this.author = new ECMUser(dom.getElementsByTagNameNS(this.e, "author", dom.ATOM_NAMESPACE)[0]);
	      return this.author;
	   }
	});
	return ECMComment;
});
