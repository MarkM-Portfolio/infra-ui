/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/data/BlogsRoutes",
	"ic-ee/gadget/BlogEntry",
	"ic-ee/widget/AuthUserEELoader"
], function (declare, BlogsRoutes, BlogEntry, AuthUserEELoader) {

	var BlogEntryLoader = declare("com.ibm.social.ee.widget.BlogEntryLoader", AuthUserEELoader, {
	   gadgetClass: "com.ibm.social.ee.gadget.BlogEntry",
	   createRoutes: function () {
	      return new BlogsRoutes(this.routesParams);
	   },
	   getGadgetErrorStrings: function () {
	      return this.nls.blog;
	   }
	});
	return BlogEntryLoader;
});
