/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/dom-attr",
	"dojo/_base/declare",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/i18n!../nls/Person",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/query",
	"dojo/_base/config",
	"dijit/_Widget",
	"dijit/form/HorizontalSlider",
	"ic-core/xslt"
], function (domAttr, declare, domClass, domStyle, i18nPerson, lang, domConstruct, on, query, config, _Widget, HorizontalSlider, xslt) {

	
	var Person = declare(
		"lconn.search.facets.Person",
		_Widget,
	{
		
		_contentNode:		null,					/* DOM node to show facet results */
		_loadingNode:		null,					/* DOM node to show loading status */
		personSlider:		null,					/* An instance of dijit.form.HorizontalSlider */
		peopleTransform:	function(){},			/* Callback to lconn.search.searchData.peopleTransform */
		_strings:			i18nPerson,
		_visibility:		4,
		
		postCreate: function(){
			this.inherited(arguments);
			
			// Create the person slider if this has not been provided
			if (!this.personSlider){
				this.personSlider = new HorizontalSlider({
					discreteValues:			1,
					minimum:				0,
					maximum:				1,
					intermediateChanges:	true,
					value:					0,
					showButtons:			false
				});
				
				domConstruct.place(this.personSlider.domNode, this.domNode);
			}
			
			// Hide the person slider initially and set the onChange handler
			if (this.personSlider){
				domStyle.set(this.personSlider.domNode, "display", "none");
				this.connect(this.personSlider, "onChange", lang.hitch(this, "_setVisibility"));
			}
			
			// Creating a div to embed the loading image and associated text
			this._loadingNode = domConstruct.create("div", {
				"innerHTML":	this._strings.LOADING_CONTENT
			}, this.domNode);
	
			// Creating the load icon image and embedding it into the "div" created above
			domConstruct.create("img", {
				"class":	"lotusLoading",
				"alt":		this._strings.LOADING_CONTENT,
				"src":		config.blankGif
			}, this._loadingNode, "first");
			
			// Create a div to populate later (in the update function) with the facet results
			this._contentNode = domConstruct.create("div", {}, this.domNode);
			
			// Setting the containerNode ensures destroyRecursive destroys the children
			this.containerNode = this.domNode;
		},
		
		focus: function(){
			var links = query("a", this._contentNode);
			if (links && links.length > 0){
				links[0].focus();
			}
		},
		
		_setVisibility: function(visibility) {
			// summary: Called when the person slider changes, updates the list with the new visibility setting
			if(this._contentNode) {
				var as = query('li', this.domNode);
				
				if (visibility<as.length){
					this._visibility = visibility;
				} else {
					this._visibility = as.length;
				}
				
				for(var i=0;i<as.length;i++) {
					domStyle.set(as[i], "display", (i<this._visibility) ? "" : "none");
				}
			}
		},
		
		showLoading: function(){
			if (this.personSlider){
				domStyle.set(this.personSlider.domNode, "display", "none");
			}
			domStyle.set(this._loadingNode, "display", "");
			domStyle.set(this._contentNode, "display", "none");
		},
		
		update: function() {
			domStyle.set(this._loadingNode, "display", "none");
			domStyle.set(this._contentNode, "display", "");
			
			var peopleString = this.peopleTransform();
			domAttr.set(this._contentNode, "innerHTML", peopleString);
			if (peopleString){
				this._setVisibility(4);
				this._updatePersonSlider();
				if (typeof (SemTagSvc)!=="undefined"){
					try {
						SemTagSvc.parseDom(null, this._contentNode);
					} catch (e) {
					}
				}
			}
		},
		
		_updatePersonSlider: function() {
			// summary: Updates the maximum of the person slider 
			if (this.personSlider){
				domAttr.set(this.personSlider.domNode, "role", "presentation");
				var listItems = query('li', this._contentNode);
				if (listItems){
					this.personSlider.minimum = Math.min(listItems.length,1);
					this.personSlider.maximum = Math.max(listItems.length,2);
					this.personSlider.set("value",this._visibility);
					domAttr.set(this.personSlider, "disabled", listItems.length<2);
					domStyle.set(this.personSlider.domNode, "display", listItems.length<2 ? "none" : "");
					
					if (listItems.length<2){
						domClass.remove(this._contentNode, "lotusChunk10");
					} else {
						domClass.add(this._contentNode, "lotusChunk10");
					}
				}
			}
		}
		
	});
	
	return Person;
});
