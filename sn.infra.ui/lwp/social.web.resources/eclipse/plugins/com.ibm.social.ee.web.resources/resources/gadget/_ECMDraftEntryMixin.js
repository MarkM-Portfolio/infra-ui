/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget._ECMDraftEntryMixin");
dojo.declare("com.ibm.social.ee.gadget._ECMDraftEntryMixin", null, {
   _draftStrings: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").ecm_draft,
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
      return com.ibm.social.ee.config.ecm.draftParams;
   },
   getCurrentId: function() {
      return this.value("draftUuid");   
   },
   getReadMoreStrings: function() {
      var strings = this.inherited(arguments);
      dojo.mixin(strings, this._draftStrings);
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