/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/dom",
	"dijit/_Templated",
	"dijit/_Widget"
], function (declare, dom, _Templated, _Widget) {

	var MoreActions = declare("com.ibm.social.personcard.tab.MoreActions", _Widget, {
		buildRendering: function() {
			var node = dom.byId("more-actions");
			if (node && node.parentNode) {
				node.parentNode.removeChild(node);
				node.style.display = "";
				this.domNode = node;
			}
		}
	});
	return MoreActions;
});
