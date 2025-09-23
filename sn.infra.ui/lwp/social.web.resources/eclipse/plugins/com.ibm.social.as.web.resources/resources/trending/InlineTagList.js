/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.trending.InlineTagList");

dojo.require("com.ibm.social.as.trending.InlineSelectedTag");
dojo.require("com.ibm.social.as.util.Localizer");

dojo.declare("com.ibm.social.as.trending.InlineTagList", [dijit._Widget, dijit._Templated, com.ibm.social.as.util.Localizer],
{
	
	templatePath: dojo.moduleUrl("com.ibm.social.as", "trending/templates/inlineTagList.html"),
	
	selectedTags: null,
	inlineTagClass: "com.ibm.social.as.trending.InlineSelectedTag",
	selectedListNode: null,
	descNode: null,
	
	postCreate: function(){
		this.connect(this.selectedTags, "add", "addSelectedTag");
		
		// Setting the containerNode ensures destroyRecursive destroys the children
		this.containerNode = this.domNode;
		
		this.connect(this.selectedListNode, "onkeypress", "onKeyPress");
		this.connect(this.selectedTags, "remove", "checkSelectedNode");
	},
	
	addSelectedTag: function(tag){
		this.checkSelectedNode();
		var tagClass = dojo.getObject(this.inlineTagClass);
		var tagWidget = new tagClass({label: tag});
		dojo.place(tagWidget.domNode, this.selectedListNode);
		tagWidget.connect(tagWidget.deleteLink, "onclick", dojo.hitch(this, "unSelectTag", tag));
		tagWidget.connect(tagWidget.deleteLink, "onkeypress", dojo.hitch(tagWidget, "onKeyPress"));
		tagWidget.connect(this.selectedTags, "remove", function(tagToRemove){
			if(tagToRemove === tag) {
				
				if(tagWidget.hasPrevious())
					tagWidget.focusPrevious();
				else if(tagWidget.hasNext())
					tagWidget.focusNext();
				
				tagWidget.destroy();
			} 
		});
		tagWidget.focus();
	},
	
	checkSelectedNode: function(){
		var numSelected = this.selectedTags.getArray().length;
		if(numSelected==0) {
			dojo.addClass(this.domNode, "lotusHidden");
		} else {
			dojo.removeClass(this.domNode, "lotusHidden");
			if(numSelected==1) {
				this.descNode.innerHTML = this.bundle.nlsStrings.matching;
			} else {
				this.descNode.innerHTML = this.bundle.nlsStrings.matchingAllOf;
			}
		}
	},
	
	unSelectTag: function(tag) {
		this.selectedTags.remove(tag);
	},
	
	onKeyPress: function(event){
		
		var keys = dojo.keys;
		
		switch(event.keyCode) {
        	case keys.DOWN_ARROW:{
        		this._focusFirstItem();
        	}
		}
	},
	
	_focusFirstItem: function(){
		
		var numSelected = this.selectedTags.getArray().length;
		
		if(numSelected > 0){
			
			var itemList = dojo.query("li", this.selectedListNode);
			
			if(itemList.length > 0){
				
				var firstItemNode = itemList[0];
				
				if(firstItemNode){
					
					var firstTag = dijit.byId(firstItemNode.widgetid || firstItemNode.id);
					
					if(firstTag)
						firstTag.focus();
				}
			}
		}
	}
});
