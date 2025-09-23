/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.personcard.tab.MoreActions");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("com.ibm.social.personcard.tab.MoreActions", [dijit._Widget], {
	buildRendering: function() {
		var node = dojo.byId("more-actions");
		if (node && node.parentNode) {
			node.parentNode.removeChild(node);
			node.style.display = "";
			this.domNode = node;
		}
	}
});
