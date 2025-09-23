define([
	"dojo/_base/declare",
	"ic-ee/data/OpenSocialRoutes",
	"ic-ee/gadget/GenericEE",
	"ic-ee/widget/AuthUserEELoader"
], function (declare, OpenSocialRoutes, GenericEE, AuthUserEELoader) {

	var GenericLoader = declare("com.ibm.social.ee.widget.GenericLoader", AuthUserEELoader, {
	   gadgetClass: "com.ibm.social.ee.gadget.GenericEE",
	   createRoutes: function () {
	      return new OpenSocialRoutes(this.routesParams);
	   },
	   getGadgetErrorStrings: function () {
	      return this.nls.generic;
	   }   
	});
	return GenericLoader;
});