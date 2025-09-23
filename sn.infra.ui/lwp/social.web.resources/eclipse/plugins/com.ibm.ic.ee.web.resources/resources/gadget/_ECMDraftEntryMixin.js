/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/config"
], function (dojo, declare, lang, config) {

	var _ECMDraftEntryMixin = declare("com.ibm.social.ee.gadget._ECMDraftEntryMixin", null, {
	   _draftStrings: i18nsocialEEStrings.ecm_draft,
	   eventType: null,
	   draftDeleteStr: null,
	   getDraftIdChangeMsg: function() {},
	   initializeUI: function () {
	      this.inherited(arguments);
	      //Only show message if draft is first shown
	      if (this.shouldUpdateRollup && !this.ecmPublishedGadget)
	         this.onInfoMessage(null, null, this.getDraftIdChangeMsg());
	   },
	   getAddtlParams: function() {
	      return config.ecm.draftParams;
	   },
	   getCurrentId: function() {
	      return this.value("draftUuid");   
	   },
	   getReadMoreStrings: function() {
	      var strings = this.inherited(arguments);
	      lang.mixin(strings, this._draftStrings);
	      return strings;
	   },
	   initSwitchEELink: function() {
	      if(this.value("documentId") || this.ecmPublishedGadget)
	         this.switchEELink.style.display = "";
	   },
	   dataLoaded: function (item, ioArgs) {
		  var stopLoad = false;
	      if (this.ecmPublishedGadget) {
		     this.data = item; // If the published gadget exists, we know we are in the toggle scenario, so override this.data
		     if (this.data.category == "document") {
		        stopLoad = true;
		        this.switchBackToPublished();
		     }
	      }
		  if(!stopLoad)
		     this.inherited(arguments);
	   },
	   //The draft toggle link exists, but the draft has been deleted (we do not get a 404 so need to determine by category)
	   switchBackToPublished: function() {
	      this.showLoading();
	      this.container.style.display = "none";
	      this.ecmPublishedGadget.onInfoMessage(null, null, this.draftDeleteStr);
	      this.ecmPublishedGadget.switchEELink.style.display = "none";
	      this.hideLoading();
	      this.publishedCtnr.style.display = "";
	      this.onSizeChange();
	   }
	});
	return _ECMDraftEntryMixin;
});
