/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/controls/EEPreviewDialogPortlet",
	"ic-ee/gadget/EEPreview"
], function (declare, lang, EEPreviewDialogPortlet, EEPreview) {

	
	var EEPreviewPortlet = declare("com.ibm.social.ee.gadget.EEPreviewPortlet", EEPreview, {
	   preamble: function(aroundNodes, iterator, eeCfg, urlUpdater, portletUrlSettings) {
		   this.eeCfg = eeCfg;
		   this.urlUpdater = urlUpdater;
		   this.portletUrlSettings = portletUrlSettings;
	   },
	
	   createDialog: function(aroundNodes, iterator) {
		   if(this.eeCfg) {
		      var attrs = this.eeCfg;
		      lang.mixin(attrs, {
		         title: " ", //Title must be set to something so that setTitle won't throw an error
		         around: aroundNodes, 
		         iterator: iterator,
		         portletUrlSettings: this.portletUrlSettings,
		         pocTemplates: this.portletUrlSettings.pocTemplates,
		         urlUpdater: this.urlUpdater
		      });
		      return EEPreviewDialogPortlet(attrs);
		   } else {
		      return this.inherited(arguments);
		   }
	   }
	
	});
	return EEPreviewPortlet;
});
