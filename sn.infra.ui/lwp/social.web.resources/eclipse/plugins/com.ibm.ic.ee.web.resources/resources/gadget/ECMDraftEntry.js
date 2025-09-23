/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/text!ic-ee/gadget/templates/ECMDraftEntry.html",
	"ic-ee/gadget/_ECMDraftEntryMixin",
	"ic-ee/gadget/_ECMEntry"
], function (declare, template, _ECMDraftEntryMixin, _ECMEntry) {

	/**
	 * Widget that displays an EE UI for an ECM Draft Entry The following properties are
	 * required for creation: - network - An instance of either NetworkOS or
	 * NetworkDojo - context - A context object containing the URL of the EE entry
	 */
	var ECMDraftEntry = declare("com.ibm.social.ee.gadget.ECMDraftEntry", [_ECMEntry, _ECMDraftEntryMixin], {     
	   templateString: template,
	   initialTab: "history",
	   widgetTabs: {
	      history: { tab: "historyTab", tabLink: "historyTabLink", tabBody: "historyTabBody" } 
	   },
	   initializeUI: function () {
	      this.inherited(arguments);
	      this.initializeHistory();
	      this.initComplete();
	      this.notifyLoaded();
	   },
	   getDraftIdChangeMsg: function() {
	      return this._draftStrings.draft_general_info;	   
	   }
	});
	return ECMDraftEntry;
});
