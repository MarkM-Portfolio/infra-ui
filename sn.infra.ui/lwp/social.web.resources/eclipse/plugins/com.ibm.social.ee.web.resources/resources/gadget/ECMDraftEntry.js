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

dojo.provide("com.ibm.social.ee.gadget.ECMDraftEntry");
dojo.require("com.ibm.social.ee.gadget._ECMEntry");
dojo.require("com.ibm.social.ee.gadget._ECMDraftEntryMixin");

/**
 * Widget that displays an EE UI for an ECM Draft Entry The following properties are
 * required for creation: - network - An instance of either NetworkOS or
 * NetworkDojo - context - A context object containing the URL of the EE entry
 */
dojo.declare("com.ibm.social.ee.gadget.ECMDraftEntry", [com.ibm.social.ee.gadget._ECMEntry, com.ibm.social.ee.gadget._ECMDraftEntryMixin], {     
   templatePath: dojo.moduleUrl("com.ibm.social.ee", "gadget/templates/ECMDraftEntry.html"),
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