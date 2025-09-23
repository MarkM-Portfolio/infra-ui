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

dojo.provide("com.ibm.social.ee.gadget._ECMEEGadgetWidget");

dojo.require("com.ibm.social.ee.gadget._EEGadgetWidget");
dojo.require("com.ibm.social.ee.bean.Bean");
dojo.require("com.ibm.social.ee.data.ECMEntryDataStore");
dojo.require("com.ibm.social.incontext.util.url");

dojo.declare("com.ibm.social.ee.gadget._ECMEEGadgetWidget", [com.ibm.social.ee.gadget._EEGadgetWidget], {
   loadData: function (args) {
      args = args || {};
      this.ds = this.createDataStore();
      var entryUrl = this.routes.getEntryUrl();
      var bean = new com.ibm.social.ee.bean.Bean();
      bean.ds = {category: "document", isDirty: false, isDeleted: false, isNew: false, attributes: {}};
      bean.getUrlEntry = function() { return entryUrl; }
      this.ds.loadItem ({
         item: bean,
         addtlParams: args.addtlParams,
         onError: dojo.hitch(this, this.onDataError),
         onItem: dojo.hitch(this, this.dataLoaded)
      });
   },
   dataLoaded: function (item, ioArgs) {
      this.data = item;
      this.initializeUI();
      this.onLoaded();
   },
   createDataStore : function()  {
      return new com.ibm.social.ee.data.ECMEntryDataStore(this.getDsParams());
   },
   getDsParams: function() {
      return { 
         net: this.network,
         url: this.routes.getEntryUrl(),
         routes: this.routes
      };       
   }
});