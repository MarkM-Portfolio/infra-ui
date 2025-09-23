/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.personcard.tab.Dynamic");
dojo.require("dijit._Widget");
dojo.require("dojo.html");

dojo.declare("com.ibm.social.personcard.tab.Dynamic", [dijit._Widget], {
	buildRendering: function() {
		this.inherited(arguments);
		this.domNode.className = "tab-section";
		dojo.html.set(this.domNode, "cool");
	}
});
