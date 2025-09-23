/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/json",
	"dijit/_Widget"
], function (dojo, declare, windowModule, domConstruct, JSON, _Widget) {

	var SampleForm = declare("com.ibm.social.sharebox.SampleForm", _Widget, {
		buildRendering: function () {
			this.inherited(arguments);
			function t(e,s) { e.appendChild(windowModule.doc.createTextNode(s)); }
			var div = domConstruct.create("div", { }, this.domNode);
			var h3 = domConstruct.create("h3", { }, div);
			t(h3, "Sample Sharebox Form");
			t(div, "Context: " + JSON.stringify(this.context));
			domConstruct.create("br", { }, div);
			t(div, "Params: " + JSON.stringify(this.params));   
		}	
	});
	return SampleForm;
});
