/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/BlogEntry",
	"ic-incontext/util/dom"
], function (declare, BlogEntry, dom) {

	/* Loads data from a IdeationBlogIdea Feed*/
	(function(){
		var du = dom;
		var IdeationBlogIdea = declare("com.ibm.social.ee.bean.IdeationBlogIdea", BlogEntry, {
			getGraduated: function() {
				if (!("graduated" in this)) {
					var category = du.getChildElementMatchingAttributeNS(this.e, "category", du.ATOM_NAMESPACE, "term", null, "graduated");
					this.graduated = category !== null;
				}
				return this.graduated; 
			}
		});
	})();
	return IdeationBlogIdea;
});
