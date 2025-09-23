/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
	dojo.provide("lconn.core.widget.autocomplete.Tags");
	dojo.require("com.ibm.oneui.controls.AutocompleteInput");
	dojo.require("com.ibm.oneui.controls.AutocompleteMenu");
	
	dojo.declare("lconn.core.widget.autocomplete.Tags", com.ibm.oneui.controls.AutocompleteInput, {
		// When a tag is selected, add it to the input using the name attribute on the item.
		valueOnSelect: "name",
		// The separator for tags is a space (TODO: support others?)
		token: ' ',
		initRenderer: function() {
			var widget = new lconn.core.widget.autocomplete.TagsMenu({
				around: this.domNode,
				store: this.store,
				parent: this
			});
			this.connect(widget, "onSelect", "onSelect");
			return widget;
		}
	});
	
	dojo.declare("lconn.core.widget.autocomplete.TagsMenu", com.ibm.oneui.controls.AutocompleteMenu, {
		idProperty: "name",
		itemTemplate: "<span class='lotusLeft'>&nbsp;</span><span class='lotusMeta'>&nbsp;</span>",
		postCreate: function() {
			this.inherited(arguments);
			var templateNode = this.templateNode;
			dojo.addClass(templateNode, "lotusAlignRight");
			templateNode.innerHTML = this.itemTemplate;
		},
		updateItem: function(item, node, store) {
			node.lastChild.firstChild.data = store.getValue(item, "count", "\u00A0");
			node.firstChild.firstChild.data = store.getValue(item, "name");
		}
	});
})();
