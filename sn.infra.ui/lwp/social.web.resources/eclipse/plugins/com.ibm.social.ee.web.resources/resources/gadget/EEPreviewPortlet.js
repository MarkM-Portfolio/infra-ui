/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */


dojo.provide("com.ibm.social.ee.gadget.EEPreviewPortlet");

dojo.require("com.ibm.social.ee.gadget.EEPreview");
dojo.require("com.ibm.social.ee.controls.EEPreviewDialogPortlet");

dojo.declare("com.ibm.social.ee.gadget.EEPreviewPortlet", com.ibm.social.ee.gadget.EEPreview, {
   preamble: function(aroundNodes, iterator, eeCfg, urlUpdater, portletUrlSettings) {
	   this.eeCfg = eeCfg;
	   this.urlUpdater = urlUpdater;
	   this.portletUrlSettings = portletUrlSettings;
   },

   createDialog: function(aroundNodes, iterator) {
	   if(this.eeCfg) {
	      var attrs = this.eeCfg;
	      dojo.mixin(attrs, {
	         title: " ", //Title must be set to something so that setTitle won't throw an error
	         around: aroundNodes, 
	         iterator: iterator,
	         portletUrlSettings: this.portletUrlSettings,
	         pocTemplates: this.portletUrlSettings.pocTemplates,
	         urlUpdater: this.urlUpdater
	      });
	      return com.ibm.social.ee.controls.EEPreviewDialogPortlet(attrs);
	   } else {
	      return this.inherited(arguments);
	   }
   }

});