/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/lang",
		"dojo/_base/array",
		"dojo/_base/declare",
		"dojo/aspect",
		"dojo/dom-class",
		"dojo/dom-attr",
		"dojo/dom-construct",
		"dojo/dom-style",
		"dojo/on",
		"dojo/text!ic-as/trending/templates/tagList.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/trending/SelectedTag",
		"ic-as/trending/Tag",
		"ic-as/util/Localizer",
		"ic-core/HelpLauncher"
	], function (dojo, lang, array, declare, aspect, domClass, domAttr, domConstruct, domStyle, on, template, _Templated, _Widget, SelectedTag, Tag, Localizer, HelpLauncher) {
	
		var TagList = declare("com.ibm.social.as.trending.TagList", [_Widget, _Templated, Localizer],
		{
			
			templateString: template,
			
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
				this.own(on(this.twistyNode, "click", lang.hitch(this,"_toggleTwisty")));
				
				this.helpLink = HelpLauncher.createHelpLink(this.helpLink, this.getLocalizedString("trendTitle"), this.getLocalizedString("trendDescription"), {	
					HELP: this.getLocalizedString("trendHelp"),
					CLOSE: this.getLocalizedString("closeTrendHelp")
				});
				
				array.forEach(this.availableTags.getArray(), this.addAvailableTag, this);
				
				this.own(aspect.after(this.availableTags, "add", lang.hitch(this,"addAvailableTag"), true));
				this.own(aspect.after(this.selectedTags, "add", lang.hitch(this,"addSelectedTag"), true));
		
				this.own(aspect.after(this.availableTags, "remove", lang.hitch(this,"checkVisibleNodes"), true));
				this.own(aspect.after(this.selectedTags, "remove", lang.hitch(this,"checkVisibleNodes"), true));
				
				this.own(aspect.after(this.availableTags, "setUpdating", lang.hitch(this,"setLoading"), true));
				this.own(aspect.after(this.availableTags, "notUpdating", lang.hitch(this,"checkVisibleNodes"), true));
				
				// Setting the containerNode ensures destroyRecursive destroys the children
				this.containerNode = this.domNode;
			},
			
			addAvailableTag: function(tag, index){
				this.checkVisibleNodes();
				var tagWidget = new Tag({label: tag});
				domConstruct.place(tagWidget.domNode, this.availableListNode, index);
				tagWidget.connect(tagWidget.tagLink, "onclick", lang.hitch(this, "selectTag", tag));
				tagWidget.connect(this.availableTags, "remove", lang.hitch(this, function(tagToRemove){
					if(tagToRemove === tag) {
						tagWidget.destroy();
					}
				}));
			},
			
			addSelectedTag: function(tag){
				this.checkVisibleNodes();
				var tagWidget = new SelectedTag({label: tag});
				domConstruct.place(tagWidget.domNode, this.selectedListNode);
				tagWidget.connect(tagWidget.deleteLink, "onclick", lang.hitch(this, "unSelectTag", tag));
				tagWidget.connect(this.selectedTags, "remove", lang.hitch(this, function(tagToRemove){
					if(tagToRemove === tag) {
						tagWidget.destroy();
					}
				}));
			},
			
			setLoading: function(){
				domStyle.set(this.loadingTags, "display", "");
				domStyle.set(this.availableNode, "display", "none");
			},
			
			checkVisibleNodes: function(){
				var tagsSelected = this.selectedTags.getArray().length>0;
				domStyle.set(this.selectedNode, "display", tagsSelected ? "" : "none");
		
				var tagsAvailable = this.availableTags.getArray().length>0;
				if(!this.availableTags.isUpdating) {
					domStyle.set(this.availableDesc, "display", tagsSelected ? "" : "none");
					domStyle.set(this.availableNode, "display", tagsAvailable ? "" : "none");
					domStyle.set(this.noTags, "display", !tagsAvailable && !tagsSelected ? "" : "none");
					domStyle.set(this.loadingTags, "display", "none");
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
				var isDisplayed = (domStyle.get(this.bodyNode, "display")!=="none");
					
				domStyle.set(this.bodyNode, "display", isDisplayed ? "none" : "");
				
				domClass.toggle(this.twistyNode,"lotusTwistyClosed");
				domClass.toggle(this.twistyNode,"lotusTwistyOpen");
				domAttr.set(this.twistyNode, "title", isDisplayed ? this.getLocalizedString("expandTrend") : this.getLocalizedString("collapseTrend"));
				
				domAttr.set(this.domNode, "aria-expanded", isDisplayed ? "false" : "true");
			},
			
			hide: function(){domClass.add(this.domNode, "lotusHidden");},
			show: function(){domClass.remove(this.domNode, "lotusHidden");}
		});
		return TagList;
	});
