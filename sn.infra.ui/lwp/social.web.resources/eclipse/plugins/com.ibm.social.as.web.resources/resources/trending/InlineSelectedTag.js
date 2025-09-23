/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.trending.InlineSelectedTag");

dojo.require("com.ibm.social.as.util.Localizer");
dojo.require("com.ibm.social.as.trending.SelectedTag");

dojo.declare("com.ibm.social.as.trending.InlineSelectedTag", 
		[dijit._Widget, dijit._Templated, com.ibm.social.as.util.Localizer,
		 com.ibm.social.as.trending.SelectedTag],
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "trending/templates/inlineSelectedTag.html"),

	postMixInProperties: function(){
		this.inherited(arguments);
	},
	focusNext: function(){
		var nextNode = this.domNode.nextSibling;
		
		var nextTag = dijit.byId(nextNode.widgetid || nextNode.id);
		
		if(nextTag)
			nextTag.focus();
	},
	focusPrevious: function(){
		
		var previousNode = this.domNode.previousSibling;
		
		var previousTag = dijit.byId(previousNode.widgetid || previousNode.id);
		
		if(previousTag)
			previousTag.focus();
	},
	_focusTag: function(tagNode){
		
		if(tagNode){
			var queryResults = dojo.query("a", tagNode);
			
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
		
		var keys = dojo.keys;
		
		switch(event.keyCode) {
        	case keys.UP_ARROW:{
        		event.preventDefault();
        		dojo.stopEvent(event);
        		if(this.hasPrevious())
        			this.focusPrevious();
        		break;
        	}
        	case keys.DOWN_ARROW:{
        		event.preventDefault();
        		dojo.stopEvent(event);
        		if(this.hasNext())
        			this.focusNext();
        		break;
        	}
		}
	}
});
