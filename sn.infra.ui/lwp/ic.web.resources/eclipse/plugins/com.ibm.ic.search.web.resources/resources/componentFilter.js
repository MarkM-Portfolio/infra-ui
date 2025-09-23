/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/on",
	"dojo/_base/declare",
	"dojo/i18n!./nls/componentFilter",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/_base/array",
	"dojo/query",
	"dijit",
	"dijit/_Widget",
	"ic-ui/aria/Toolbar"
], function (on, declare, i18ncomponentFilter, domAttr, domClass, lang, domConstruct, array, query, dijit, _Widget, Toolbar) {
	
	var componentFilter = declare(
		"lconn.search.componentFilter",
		_Widget,
	{
		
		options:		['allconnections'],		// String array
		_toolbar:		null,					// DOMNode
		_strings:		i18ncomponentFilter,
		isUserExternal:	false,					// Whether authenticated user is external user
		shouldHideFiles: false,					// Box integration - it will hide any UI reference to files
	
		
		postCreate: function(){
			domClass.add(this.domNode, "lotusMenu");
			domAttr.set(this.domNode, "role", "navigation");
			domAttr.set(this.domNode, "aria-label", this._strings.COMPONENT_FILTER_LABEL);
			
			var inner = domConstruct.create("div", {"class":"lotusInner"}, this.domNode);
			var section = domConstruct.create("div", {"class": "lotusMenuSection"}, inner);
			this._toolbar = domConstruct.create("ul", {"class": "searchFilter list", role:"toolbar", "aria-label":this._strings.APPLICATIONS_FILTER_LABEL}, section);
			
			array.forEach(this.options, function(componentName){
							
				if (this.isComponentFilterVisible(componentName)) {
				
					var li = domConstruct.create("li", {"class": "lconnSearchComponentFilter-"+componentName}, this._toolbar);
					var div = domConstruct.create("div", {}, li);
					
					var genericName = this.getGenericComponentName(componentName);
	
					var a = domConstruct.create("a",{
						role:		"button", 
						href:		"javascript:;", 
						title:		this._getString(componentName, "_TITLE"),
						innerHTML:	this._getString(componentName, "_LABEL")
					},div);
					
					this.connect(a, "click", lang.hitch(this, function(){
						this.onSelect(componentName, true, a);
						this._select(componentName);
					}));
					
					if (componentName === "allconnections"){
						domAttr.set(a, "accesskey", "N");
					} else if (componentName === "activities"){
						domAttr.set(a, "accesskey", "A");
					} else if (componentName === "blogs"){
						domAttr.set(a, "accesskey", "B");
					} else if (componentName === "dogear"){
						domAttr.set(a, "accesskey", "D");
					} else if (componentName === "communities"){
						domAttr.set(a, "accesskey", "C");
					} else if (genericName === "files"){
						// Only one of these three will be passed in the constructor
						domAttr.set(a, "accesskey", "F");
					} else if (componentName === "forums"){
						domAttr.set(a, "accesskey", "G");
					} else if (componentName === "profiles"){
						domAttr.set(a, "accesskey", "P");
					} else if (componentName === "wikis"){
						domAttr.set(a, "accesskey", "W");
					} else if (componentName === "status_updates"){
						domAttr.set(a, "accesskey", "S");
					}
					
				}
			}, this);
			
			new Toolbar(this._toolbar);
			
			this.update();
		},
		
		// This function is required for SmartCloud override
		_getString: function(componentName, suffix) {
			var genericName = this.getGenericComponentName(componentName);
			var stringKeyPrefix = genericName.toUpperCase();
			return this._strings[stringKeyPrefix + suffix];
		},
		
		getGenericComponentName: function(componentName) {
			if (componentName === "all_files" || componentName === "ecm_files"){
				componentName = "files";
			}
			return componentName;
		},
		
		isComponentFilterVisible: function(componentName) {
			if (componentName == "files" && this.shouldHideFiles) {
				return false;
			}
			if (componentName !== "profiles") {
				return true;
			}
			if (this.isUserExternal) {
				return false;	// An external user cannot see Profiles
			} else {
				return true;
			}
		},
		
		onSelect: function(){},	// Connect to this function to listen for this event 
	
		_select: function(/*String*/componentName){
			var items = query("li",this._toolbar);
			for(var i=0;i<items.length;i++) {
				domClass.remove(items[i],"lotusSelected searchFilterSelected");
				items[i].getElementsByTagName("A")[0].title = this._getString(componentName, "_TITLE");
			}
			var highlight = query("li.lconnSearchComponentFilter-"+componentName, this._toolbar);
			if(highlight.length>0) {
				domClass.add(highlight[0],"lotusSelected searchFilterSelected");
				highlight[0].getElementsByTagName("A")[0].title = this._strings.SELECTED + " " + this._getString(componentName, "_TITLE");
			}
			
			var genericName = this.getGenericComponentName(componentName);
			var stringKeyPrefix = genericName.toUpperCase();
			var title = document.title.substr(0, document.title.indexOf(" - ") > 0 ? document.title.indexOf(" - ") : document.title.length);
			document.title = title + " - " + this._strings[stringKeyPrefix+"_LABEL"];
		},
		
		update: function(/*lconn.search.searchAPI*/searchAPI){
			if (searchAPI){
				var componentFilter = searchAPI.getComponentFilter();
				if (!componentFilter || componentFilter==="" || componentFilter==="allconnections"){
					this._select('allconnections');
				} else {	
					this._select(componentFilter);
				}
			}
		}
	});
	return componentFilter;
});