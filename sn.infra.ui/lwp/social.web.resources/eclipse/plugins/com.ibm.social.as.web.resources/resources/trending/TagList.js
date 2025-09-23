/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.trending.TagList");

dojo.require("com.ibm.social.as.trending.Tag");
dojo.require("com.ibm.social.as.trending.SelectedTag");
dojo.require("lconn.core.HelpLauncher");
dojo.require("com.ibm.social.as.util.Localizer");

dojo.declare("com.ibm.social.as.trending.TagList", [dijit._Widget, dijit._Templated, com.ibm.social.as.util.Localizer],
{
	
	templatePath: dojo.moduleUrl("com.ibm.social.as", "trending/templates/tagList.html"),
	
	availableTags: null,
	selectedTags: null,
	
	headingNode: null,
	availableNode: null,
	availableDesc: null,
	availableListNode: null,
	twistyNode: null,
	bodyNode: null,
	helpLink: null,
	selectedNode: null,
	selectedListNode: null,
	noTags: null,
	loadingTags: null,
	
	postCreate: function(){
		// Handle the click event on the twisty
		this.connect(this.twistyNode, "onclick", "_toggleTwisty");
		
		this.helpLink = lconn.core.HelpLauncher.createHelpLink(this.helpLink, this.getLocalizedString("trendTitle"), this.getLocalizedString("trendDescription"), {	
			HELP: this.getLocalizedString("trendHelp"),
			CLOSE: this.getLocalizedString("closeTrendHelp")
		});
		
		dojo.forEach(this.availableTags.getArray(), this.addAvailableTag, this);
		
		this.connect(this.availableTags, "add", "addAvailableTag");
		this.connect(this.selectedTags, "add", "addSelectedTag");

		this.connect(this.availableTags, "remove", "checkVisibleNodes");
		this.connect(this.selectedTags, "remove", "checkVisibleNodes");
		
		this.connect(this.availableTags, "setUpdating", "setLoading");
		this.connect(this.availableTags, "notUpdating", "checkVisibleNodes");
		
		// Setting the containerNode ensures destroyRecursive destroys the children
		this.containerNode = this.domNode;
	},
	
	addAvailableTag: function(tag, index){
		this.checkVisibleNodes();
		var tagWidget = new com.ibm.social.as.trending.Tag({label: tag});
		dojo.place(tagWidget.domNode, this.availableListNode, index);
		tagWidget.connect(tagWidget.tagLink, "onclick", dojo.hitch(this, "selectTag", tag));
		tagWidget.connect(this.availableTags, "remove", dojo.hitch(this, function(tagToRemove){
			if(tagToRemove === tag) {
				tagWidget.destroy();
			}
		}));
	},
	
	addSelectedTag: function(tag){
		this.checkVisibleNodes();
		var tagWidget = new com.ibm.social.as.trending.SelectedTag({label: tag});
		dojo.place(tagWidget.domNode, this.selectedListNode);
		tagWidget.connect(tagWidget.deleteLink, "onclick", dojo.hitch(this, "unSelectTag", tag));
		tagWidget.connect(this.selectedTags, "remove", dojo.hitch(this, function(tagToRemove){
			if(tagToRemove === tag) {
				tagWidget.destroy();
			}
		}));
	},
	
	setLoading: function(){
		dojo.style(this.loadingTags, "display", "");
		dojo.style(this.availableNode, "display", "none");
	},
	
	checkVisibleNodes: function(){
		var tagsSelected = this.selectedTags.getArray().length>0;
		dojo.style(this.selectedNode, "display", tagsSelected ? "" : "none");

		var tagsAvailable = this.availableTags.getArray().length>0;
		if(!this.availableTags.isUpdating) {
			dojo.style(this.availableDesc, "display", tagsSelected ? "" : "none");
			dojo.style(this.availableNode, "display", tagsAvailable ? "" : "none");
			dojo.style(this.noTags, "display", !tagsAvailable && !tagsSelected ? "" : "none");
			dojo.style(this.loadingTags, "display", "none");
		}
	},
	
	selectTag: function(tag) {
		this.selectedTags.add(tag);
		this.checkVisibleNodes();
	},
	
	unSelectTag: function(tag) {
		this.selectedTags.remove(tag);
	},
	
	_toggleTwisty: function() {
		var isDisplayed = (dojo.style(this.bodyNode,"display")!=="none");
			
		dojo.style(this.bodyNode,"display",isDisplayed ? "none" : "");
		
		dojo.toggleClass(this.twistyNode,"lotusTwistyClosed");
		dojo.toggleClass(this.twistyNode,"lotusTwistyOpen");
		dojo.attr(this.twistyNode, "title", isDisplayed ? this.getLocalizedString("expandTrend") : this.getLocalizedString("collapseTrend"));
		
		dojo.attr(this.domNode, "aria-expanded", isDisplayed ? "false" : "true");
	},
	
	hide: function(){dojo.addClass(this.domNode, "lotusHidden");},
	show: function(){dojo.removeClass(this.domNode, "lotusHidden");}
});
