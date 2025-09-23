/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/query",
		"dojo/text!ic-as/trending/templates/inlineSelectedTag.html",
		"dojo/topic",
		"dojo/keys",
		"dijit/_Templated",
		"dijit/_Widget",
		"dijit/registry",
		"ic-as/trending/SelectedTag",
		"ic-as/util/Localizer"
	], function (dojo, declare, query, template, topic, keys, _Templated, _Widget, SelectedTag, Localizer) {
	
		var InlineSelectedTag = declare("com.ibm.social.as.trending.InlineSelectedTag", 
				[_Widget, _Templated, Localizer,
				 SelectedTag],
		{
			templateString: template,
		
			postMixInProperties: function(){
				this.inherited(arguments);
			},
			focusNext: function(){
				var nextNode = this.domNode.nextSibling;
				
				var nextTag = registry.byId(nextNode.widgetid || nextNode.id);
				
				if(nextTag)
					nextTag.focus();
			},
			focusPrevious: function(){
				
				var previousNode = this.domNode.previousSibling;
				
				var previousTag = registry.byId(previousNode.widgetid || previousNode.id);
				
				if(previousTag)
					previousTag.focus();
			},
			_focusTag: function(tagNode){
				
				if(tagNode){
					var queryResults = query("a", tagNode);
					
					if(queryResults.length > 0)
						queryResults[0].focus();
				}	
			},
			focus: function(){
				this._focusTag(this.domNode);
			},
			hasPrevious: function(){
				var previousNode = this.domNode.previousSibling;
				
				return previousNode && previousNode.nodeName === "LI";
			},
			hasNext: function(){
				var nextNode = this.domNode.nextSibling;
				
				return nextNode && nextNode.nodeName === "LI";
			},
			onKeyPress: function(event){
				
				var keysVal = keys;
				
				switch(event.keyCode) {
		        	case keysVal.UP_ARROW:{
		        		event.preventDefault();
		        		event.preventDefault(), event.stopPropagation();
		        		if(this.hasPrevious())
		        			this.focusPrevious();
		        		break;
		        	}
		        	case keysVal.DOWN_ARROW:{
		        		event.preventDefault();
		        		event.preventDefault(), event.stopPropagation();
		        		if(this.hasNext())
		        			this.focusNext();
		        		break;
		        	}
				}
			}
		});
		return InlineSelectedTag;
	});
