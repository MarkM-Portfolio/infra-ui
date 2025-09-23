/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
	"dojo/i18n!../nls/Date",
	"dojo/dom-construct",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/dom-style",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/on",
	"dojo/query",
	"dojo/_base/config",
	"dijit/_Widget",
	"ic-core/xslt"
], function (i18nDate, domConstruct, array, declare, domStyle, lang, domAttr, domClass, on, query, config, _Widget, xslt) {

	var Date = declare(
		"lconn.search.facets.Date",
		_Widget,
	{
		
		dateTransform:		function(){},			/* Callback to lconn.search.searchData.dateTransform */
		_strings:			i18nDate,
		
		postCreate: function(){
			domClass.add(this.domNode,"lconnSearchDateFacet");
		},
		
		focus: function(){
			var links = query("a", this.domNode);
			if (links && links.length > 0){
				links[0].focus();
			}
		},
		
		showLoading: function(){
			//summary: Show the loading icon+"Loading Content"
			
			// Remove old content, regardless whether "No ... yet" or real content
			domConstruct.empty(this.domNode);
	
			// Creating a div to embed the loading image and associated text
			var loadingDiv = domConstruct.create("div", {
				"innerHTML":	this._strings.LOADING_CONTENT
			}, this.domNode);
	
			// Creating the load icon image and embedding it into the "div" created above
			var img = domConstruct.create("img", {
					"class":	"lotusLoading",
					"role":		"presentation",
					"alt":		this._strings.LOADING_CONTENT,
					"src":		config.blankGif
			}, loadingDiv, "first");
		},
		
		_updateYearsTwisty: function() {
			var yearEntries = query(".lotusYearEntry", this.domNode);
			array.forEach(yearEntries, function(aYearEntry){
				var yearTwisty =query(".lotusArrow", aYearEntry)[0]; // There is one only
				var yearElement = query(".searchYearLink", aYearEntry)[0]; // There is one only
				var yearValue = domAttr.get(yearElement, "innerHTML");
				var monthTree = query(".lotusMonthTree", aYearEntry);
				this.connect(yearTwisty, "onclick", lang.hitch(this, function(){
					if(domClass.contains(yearTwisty,"lotusTwistyClosed")) {				
						domClass.remove(yearTwisty,"lotusTwistyClosed");
						domClass.add(yearTwisty,"lotusTwistyOpen");
						var stringArray = this._strings.COLLAPSE.split("{0}");
						domAttr.set(yearTwisty, "title", stringArray[0] + yearValue + stringArray[1]);
						domAttr.set(yearTwisty, "aria-expanded", "true");
						if(monthTree[0]) {
							domStyle.set(monthTree[0], "display", "");
						}
					} else {
						domClass.remove(yearTwisty,"lotusTwistyOpen");
						domClass.add(yearTwisty,"lotusTwistyClosed");
						var stringArray = this._strings.EXPAND.split("{0}");
						domAttr.set(yearTwisty, "title", stringArray[0] + yearValue + stringArray[1]);
						domAttr.set(yearTwisty, "aria-expanded", "false");
						if(monthTree[0]) {
							domStyle.set(monthTree[0], "display", "none");
						}
					}
				}));
			}, this);
		},
	
		update: function(currentDates) {
	
			var dateString = this.dateTransform();
			this.domNode.innerHTML = dateString;
			
			this._updateYearsTwisty();
			
			if (dateString){
				var selectedMonth = false;
				var selectedYear = false;
					
				// Assume that only one date is returned
				if(currentDates && currentDates.length >= 1) {
					for(var i=0; i<currentDates.length; i++) {
						// If string doesn't have slash, then it is year (eg 2011)
						if(currentDates[i].indexOf("/") === -1) {
							selectedYear = true;
						} 
						// If string has one slash, then it is a month (eg 2011/10)
						else if(currentDates[i].indexOf("/") === currentDates[i].lastIndexOf("/")){
							selectedMonth = true;
						}
					}
				}
				
				var span;
				
				var monthLink = query(".searchMonthLink", this.domNode);
				if(selectedMonth && monthLink && monthLink.length>0) {
					span = domConstruct.create("span");
					array.forEach(monthLink[0].childNodes, function(child){
						domConstruct.place(child, span);
					}, this);
					domConstruct.place(span, monthLink[0], "replace");
				}
		
				var yearLink = query(".searchYearLink", this.domNode);
				if(selectedYear && yearLink && yearLink.length>0) {
					span = domConstruct.create("span");
					array.forEach(yearLink[0].childNodes, function(child){
						domConstruct.place(child, span);
					}, this);
					domConstruct.place(span, yearLink[0], "replace");
				}
			}
			
		}
		
	});
	
	return Date;
});
