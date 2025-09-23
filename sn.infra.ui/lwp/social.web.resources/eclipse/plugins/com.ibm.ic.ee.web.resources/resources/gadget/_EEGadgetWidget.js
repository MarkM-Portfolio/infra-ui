define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-as/item/SharedExternally",
	"ic-ee/gadget/_EEGadget"
], function (declare, lang, _Templated, _Widget, SharedExternally, _EEGadget) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2014                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	var _EEGadgetWidget = declare("com.ibm.social.ee.gadget._EEGadgetWidget", [_Widget, _Templated, _EEGadget], {
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
	         onError: lang.hitch(this, this.onDataError),
	         onComplete: lang.hitch(this, this.dataLoaded)
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
	return _EEGadgetWidget;
});