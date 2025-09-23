/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/html",
	"dijit/_Widget"
], function (declare, html, _Widget) {

	var Dynamic = declare("com.ibm.social.personcard.tab.Dynamic", _Widget, {
		buildRendering: function() {
			this.inherited(arguments);
			this.domNode.className = "tab-section";
			html.set(this.domNode, "cool");
		}
	});
	return Dynamic;
});
