/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/bean/Bean",
	"ic-ee/data/ECMEntryDataStore",
	"ic-ee/gadget/_EEGadgetWidget",
	"ic-incontext/util/url"
], function (declare, lang, Bean, ECMEntryDataStore, _EEGadgetWidget, urlModule) {

	var _ECMEEGadgetWidget = declare("com.ibm.social.ee.gadget._ECMEEGadgetWidget", _EEGadgetWidget, {
	   loadData: function (args) {
	      args = args || {};
	      this.ds = this.createDataStore();
	      var entryUrl = this.routes.getEntryUrl();
	      var bean = new Bean();
	      bean.ds = {category: "document", isDirty: false, isDeleted: false, isNew: false, attributes: {}};
	      bean.getUrlEntry = function() { return entryUrl; }
	      this.ds.loadItem ({
	         item: bean,
	         addtlParams: args.addtlParams,
	         onError: lang.hitch(this, this.onDataError),
	         onItem: lang.hitch(this, this.dataLoaded)
	      });
	   },
	   dataLoaded: function (item, ioArgs) {
	      this.data = item;
	      this.initializeUI();
	      this.onLoaded();
	   },
	   createDataStore : function()  {
	      return new ECMEntryDataStore(this.getDsParams());
	   },
	   getDsParams: function() {
	      return { 
	         net: this.network,
	         url: this.routes.getEntryUrl(),
	         routes: this.routes
	      };       
	   }
	});
	return _ECMEEGadgetWidget;
});
