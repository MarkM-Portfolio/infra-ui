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

dojo.provide("com.ibm.social.ee.data.ECMEntryDataStore");

dojo.require("com.ibm.social.ee.data.EntryDataStore");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.ee.bean.ECMPublishedDoc");
dojo.require("com.ibm.social.ee.bean.ECMDraft");

dojo.declare("com.ibm.social.ee.data.ECMEntryDataStore", com.ibm.social.ee.data.EntryDataStore, {
   loadItem: function(keywordArgs) {
      var params = {
         includeCurrentVersion: true,
         acls: true,
         includeLocked:  true,
         includeLockOwner: true
      };
      if(keywordArgs.addtlParams)
         params = dojo.mixin(params, keywordArgs.addtlParams);
          
      if(dojo.isIE)
         params.format = "xml";
      this.inherited(arguments, [keywordArgs, params]);
   },
   
   itemFromDocElAndCat: function(el, base, category, keywordArgs) {
      var newItem;      
      if (category == "draft" || category == "draftpage")
         newItem = new com.ibm.social.ee.bean.ECMDraft(el, base);
      else
         newItem = new com.ibm.social.ee.bean.ECMPublishedDoc(el, base);
      newItem.isFullyLoaded = !keywordArgs.notificationsOnly; //Fully loaded if not from loading notifications   
      return newItem;
   },
   getCategory: function(el) {
      return com.ibm.social.incontext.util.dom.getChildElementAttribute(el, "category", "term");
   }
   
});