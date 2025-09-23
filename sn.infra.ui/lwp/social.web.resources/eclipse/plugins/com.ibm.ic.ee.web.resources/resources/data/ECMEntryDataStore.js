/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/has",
	"ic-ee/bean/ECMDraft",
	"ic-ee/bean/ECMPublishedDoc",
	"ic-ee/data/EntryDataStore",
	"ic-incontext/util/dom"
], function (declare, lang, has, ECMDraft, ECMPublishedDoc, EntryDataStore, dom) {

	var ECMEntryDataStore = declare("com.ibm.social.ee.data.ECMEntryDataStore", EntryDataStore, {
	   loadItem: function(keywordArgs) {
	      var params = {
	         includeCurrentVersion: true,
	         acls: true,
	         includeLocked:  true,
	         includeLockOwner: true
	      };
	      if(keywordArgs.addtlParams)
	         params = lang.mixin(params, keywordArgs.addtlParams);
	          
	      if(has("ie"))
	         params.format = "xml";
	      this.inherited(arguments, [keywordArgs, params]);
	   },
	   
	   itemFromDocElAndCat: function(el, base, category, keywordArgs) {
	      var newItem;      
	      if (category == "draft" || category == "draftpage")
	         newItem = new ECMDraft(el, base);
	      else
	         newItem = new ECMPublishedDoc(el, base);
	      newItem.isFullyLoaded = !keywordArgs.notificationsOnly; //Fully loaded if not from loading notifications   
	      return newItem;
	   },
	   getCategory: function(el) {
	      return dom.getChildElementAttribute(el, "category", "term");
	   }
	   
	});
	return ECMEntryDataStore;
});
