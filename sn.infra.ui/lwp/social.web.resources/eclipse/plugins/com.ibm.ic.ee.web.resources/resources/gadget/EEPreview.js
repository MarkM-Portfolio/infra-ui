/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/controls/EEPreviewDialog"
], function (declare, EEPreviewDialog) {

	var EEPreview = declare("com.ibm.social.ee.gadget.EEPreview", null, {
	   dialog: null,
	   iterator: null,
	   constructor: function(aroundNodes, iterator) {
	      this.iterator = iterator;
	
	      //Create dialog w/ Gadget
	      this.dialog = this.createDialog(aroundNodes, iterator);
	   },
	
	   createDialog: function(aroundNodes, iterator) {
	      return new EEPreviewDialog({
	         title: " ", //Title must be set to something so that setTitle won't throw an error
	         around: aroundNodes, 
	         iterator: iterator
	      });
	   },
	   refresh: function(aroundNodes) {
	      if(this.dialog)
	         this.dialog.close();
	      else
	         this.dialog = this.createDialog(aroundNodes, this.iterator);
	      this.updateArounds(aroundNodes);
	   },
	
	   updateArounds: function(aroundNodes) {
	      if(this.dialog)
	         this.dialog.setAround(aroundNodes);
	      else
	         this.dialog = this.createDialog(aroundNodes, this.iterator);
	   },
	   destroy: function() {
	      if(this.dialog)
	         this.dialog.destroy();
	   }
	});
	return EEPreview;
});
