/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/aspect",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/on",
		"dojo/query",
		"dojo/keys",
		"dojo/text!ic-as/trending/templates/inlineTagList.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"dijit/registry",
		"ic-as/util/Localizer"
	], function (dojo, aspect, declare, lang, domClass, domConstruct, on, query, keys, template, _Templated, _Widget, registry, Localizer) {
	
		var InlineTagList = declare("com.ibm.social.as.trending.InlineTagList", [_Widget, _Templated, Localizer],
		{
			
			templateString: template,
			
			selectedTags: null,
			inlineTagClass: "com.ibm.social.as.trending.InlineSelectedTag",
			selectedListNode: null,
			descNode: null,
			
			postCreate: function(){
				this.own(aspect.after(this.selectedTags, "add", lang.hitch(this,"addSelectedTag"), true));
				
				// Setting the containerNode ensures destroyRecursive destroys the children
				this.containerNode = this.domNode;
				
				this.own(on(this.selectedListNode, "keypress", lang.hitch(this,"onKeyPress")));
				this.own(aspect.after(this.selectedTags, "remove", lang.hitch(this,"checkSelectedNode"), true));
			},
			
			addSelectedTag: function(tag){
				this.checkSelectedNode();
				var tagClass = lang.getObject(this.inlineTagClass);
				var tagWidget = new tagClass({label: tag});
				domConstruct.place(tagWidget.domNode, this.selectedListNode);
				tagWidget.connect(tagWidget.deleteLink, "onclick", lang.hitch(this, "unSelectTag", tag));
				tagWidget.connect(tagWidget.deleteLink, "onkeypress", lang.hitch(tagWidget, "onKeyPress"));
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
					domClass.add(this.domNode, "lotusHidden");
				} else {
					domClass.remove(this.domNode, "lotusHidden");
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
				
				var keysVal = keys;
				
				switch(event.keyCode) {
		        	case keysVal.DOWN_ARROW:{
		        		this._focusFirstItem();
		        	}
				}
			},
			
			_focusFirstItem: function(){
				
				var numSelected = this.selectedTags.getArray().length;
				
				if(numSelected > 0){
					
					var itemList = query("li", this.selectedListNode);
					
					if(itemList.length > 0){
						
						var firstItemNode = itemList[0];
						
						if(firstItemNode){
							
							var firstTag = registry.byId(firstItemNode.widgetid || firstItemNode.id);
							
							if(firstTag)
								firstTag.focus();
						}
					}
				}
			}
		});
		return InlineTagList;
	});
