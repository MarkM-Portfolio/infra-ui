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

dojo.provide("com.ibm.social.ee.gadget._EEGadgetWidget");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("com.ibm.social.ee.gadget._EEGadget");
dojo.require("com.ibm.social.ee.util.ErrorHandling");
dojo.require("com.ibm.social.as.item.SharedExternally");

dojo.declare("com.ibm.social.ee.gadget._EEGadgetWidget", [dijit._Widget, dijit._Templated, com.ibm.social.ee.gadget._EEGadget], {
   // Must be implemented by subclass
   createDataStore: function () {},
   
   postCreate: function () {
      this.inherited(arguments);
      if(!this.noLoadDataOnInit)
         this.loadData();
   },
   loadData: function (args) {
      this.ds = this.createDataStore();
      this.ds.fetch ({
         onError: dojo.hitch(this, this.onDataError),
         onComplete: dojo.hitch(this, this.dataLoaded)
      });
   },
   dataLoaded: function (items, ioArgs) {
      this.data = items[0];
      this.initializeUI();
      this.onLoaded();
   },
   onDataError: function() { }, // Implementation supplied by loader
   value: function (name) {
      return this.ds.getValue(this.data, name);
   }
});