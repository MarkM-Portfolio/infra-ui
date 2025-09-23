/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget.EEPreview");

dojo.require("com.ibm.social.ee.controls.EEPreviewDialog");

dojo.declare("com.ibm.social.ee.gadget.EEPreview", null, {
   dialog: null,
   iterator: null,
   constructor: function(aroundNodes, iterator) {
      this.iterator = iterator;

      //Create dialog w/ Gadget
      this.dialog = this.createDialog(aroundNodes, iterator);
   },

   createDialog: function(aroundNodes, iterator) {
      return new com.ibm.social.ee.controls.EEPreviewDialog({
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