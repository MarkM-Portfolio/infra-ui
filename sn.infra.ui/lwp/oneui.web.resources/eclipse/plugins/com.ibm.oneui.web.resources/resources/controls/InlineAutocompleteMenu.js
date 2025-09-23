/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.controls.InlineAutocompleteMenu");
dojo.require("com.ibm.oneui.controls.AutocompleteMenu");

dojo.declare("com.ibm.oneui.controls.InlineAutocompleteMenu", com.ibm.oneui.controls.AutocompleteMenu, {
	showing: true,

	postCreate: function() {
		this.inherited(arguments);
		
		// create an empty info node
		var infoNode = this.infoNode = this.emptyNode.cloneNode(true);
		infoNode.firstChild.data = "Type a name or email address";
		dojo.place(infoNode, this.emptyNode, "before");
		
		// make the DOM focusable
		this.domNode.tabIndex = 0;
		
		this.connect(this.domNode, "onfocus", "first");
		this.connect(this.domNode, "onblur", "clearSelect");
		this.connect(this.domNode, "onkeypress", "onKeypress");
		
		// init
		this.info();
		this.show();
	},

	onKeypress: function(event) {
		var key = event.charOrCode;
		//except for cutting/pasting case - ctrl + x/v
		if (event.altKey || (event.ctrlKey && (key != 'x' && key != 'v')) || event.key == dojo.keys.SHIFT)
			return; // throw out weird key combinations and spurious events
		
		switch (key) {
		case dojo.keys.DOWN_ARROW:
			dojo.stopEvent(event);
			this.next();
			break;
		case dojo.keys.UP_ARROW:
			dojo.stopEvent(event);
			this.previous();
			break;
		case dojo.keys.ENTER:
			if (this.selectedNode && this.selectedNode.nodeName.toLowerCase() != "A") {
				dojo.stopEvent(event);
   	 			this.select();
     		}
			break;
		}
	},
	_onMouseDown: function() {},
	first: function() {
		if (!this.selectedNode)
			this.next();
	},
	info: function() {
		this._hideExcept("infoNode");
	},
	show: function() {
		this.domNode.style.display = "";
	},
	hide: function() {
		this.loadingNode.style.display = "none";
	}
});
