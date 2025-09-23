/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.search.ActivityStreamSearchBar");
dojo.require("com.ibm.social.as.search.ActivityStreamSearchHandler");
dojo.require("com.ibm.social.as.util.Localizer");
dojo.require("dijit.form.TextBox");

dojo.declare("com.ibm.social.as.search.ActivityStreamSearchBar",
[dijit._Widget, dijit._Templated, com.ibm.social.as.util.Localizer],
{
	isStreamFiltered: false,
	templatePath: dojo.moduleUrl("com.ibm.social.as", "search/templates/activityStreamSearchBar.html"),
	widgetsInTemplate: true,
	
	postCreate: function(){
		this.inherited(arguments);	
		this.subscribe(com.ibm.social.as.constants.events.ENABLESEARCH, "checkEnablement");
		this.connect(this.searchText, "onKeyPress", "keyHandler");
		
		// If in High Contrast mode add text to replace icons
		if (com.ibm.social.incontext.util.html.isHighContrast()){
			this.highContrastEnablement();
		}
	},
	
	highContrastEnablement: function(){
		var closeButton = dojo.query(".icStream-searchClose", this.domNode)[0];			
		closeButton.innerText = this.getLocalizedString("asSearchBarCancel");
		
		var searchBar = dojo.query(".icStream-searchInner", this.domNode)[0];	
		dojo.addClass(searchBar, "icStream-searchInnerHighContrast");
		
		var searchText = dojo.query(".icStream-searchTextTd", this.domNode)[0];	
		dojo.addClass(searchText, "icStream-searchTextTd-HighContrast");
		
		var searchSubmit = dojo.query(".icStream-searchSubmitTd", this.domNode)[0];			
		var searchInput = dojo.create("input", {
			type: "submit",
			value: this.getLocalizedString("asSearchLabel")
		}, searchSubmit);	
		
		this.connect(searchInput, "onclick", dojo.hitch( function(evt){
			this.submit();
		}));
	},

	checkEnablement: function(flag){
		if(!flag){
			this.isStreamFiltered = false; //stop a reset of view
			this.close();
		}
	},
	
	open: function(){
		dojo.addClass(this.asSearchBarContainer, "isOpen");
		this.searchText.focus();
		dojo.publish(com.ibm.social.as.constants.events.FILTERMENUHIDE, ["true"]);
	},
	
	close: function(){
		dojo.removeClass(this.asSearchBarContainer, "isOpen");
		this.removeSearchText();
		if(this.isStreamFiltered){
			this.resetView();
		}
		dojo.publish(com.ibm.social.as.constants.events.FILTERMENUHIDE, ["false"]);
	},
	
	resetView: function(){
		com.ibm.social.as.search.ActivityStreamSearchHandler.getInstance().removeSearch();
		this.removeSearchText();
		this.isStreamFiltered = false;
	},
	
	removeSearchText: function(){
		this.searchText.set("value", "");
	},
	
	toggle: function(){
		var isOpen;
		if(dojo.hasClass(this.asSearchBarContainer, "isOpen")){
			this.close()
			isOpen = false;
		} else {
			this.open();	
			isOpen = true
		}
		return isOpen
	},
	
	submit: function(){
		this.isStreamFiltered = true;
		com.ibm.social.as.search.ActivityStreamSearchHandler.getInstance().updateStream(this.searchText.get("value"), null, null, true);
	},
	
	keyHandler: function(e){
		if(e.keyCode == 13){
			dojo.stopEvent(e);
			this.submit();
		}
	}
});
