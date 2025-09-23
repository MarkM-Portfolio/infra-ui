/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.widget.LocationBar");

dojo.require("dijit._Widget");

dojo.declare("com.ibm.social.layout.widget.LocationBar", dijit._Widget, {
	buildRendering: function() {
		this.domNode = this.srcNodeRef;
		var location = this.data;
		if (location && location.length > 0)
			this.update(location);
	},
	update: function(location) {
		this.data = location;
		this.domNode.innerHTML = "";
		dojo.forEach(location, this.renderLocation, this);
	},
	renderLocation: function(location) {
		var domNode = this.domNode;
		if (domNode.firstChild)
			dojo.create("span", {className: "lotusSeparator", innerHTML: " &gt; "}, domNode);
		dojo.create(location.url ? "a" : "span", {href: location.url || null, title: location.tooltip || null, innerHTML: "&nbsp;"}, domNode).firstChild.data = location.label;
	}
});
