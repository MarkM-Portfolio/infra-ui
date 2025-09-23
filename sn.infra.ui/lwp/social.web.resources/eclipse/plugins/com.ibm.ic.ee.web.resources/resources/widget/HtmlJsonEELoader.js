define([
	"dojo",
	"dojo/_base/declare",
	"dojo/dom-attr",
	"dojo/dom-construct",
	"dojo/json",
	"dojo/query",
	"ic-ee/widget/EELoader"
], function (dojo, declare, domAttr, domConstruct, JSON, query, EELoader) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2012                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	var HtmlJsonEELoader = declare("com.ibm.social.ee.widget.HtmlJsonEELoader", EELoader, {
	   allowNotificationDisplay: true,
	   // Must be implemented by subclass
	   setupGadgetUI: function(data, prefix) { this._notImplemented("setupGadgetUI"); },
	   
	   onDataLoaded: function (data, ioRequest) {
	      var div = domConstruct.create("div", { style: { display: "none"} }, this.domNode);
	      div.innerHTML = data;
	      var jsonData = null;
	      var prefix = null;
	      var scope = this;
	      query("textarea.data", this.domNode).forEach (function (node) {
	         var value = scope.decodeJsonData ? decodeURIComponent(node.value) : node.value;
	         jsonData = JSON.parse(value);
	         prefix = domAttr.get(node, "prefix");
	      });
	      this.setupGadgetUI(jsonData, prefix);
	      this.hideLoading();
	      if(this.allowNotificationDisplay) {
	         this.displayNotification();
	      }
	      div.style.display = "";
	      this.onLoaded();
	   }   
	});
	return HtmlJsonEELoader;
});