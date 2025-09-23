/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/i18n!./nls/QueryForm",
	"dojo/on",
	"dojo/text!./templates/QueryForm.html",
	"dojo/text!./templates/QueryFormOld.html",
	"dijit/_Widget",
	"dijit/_Templated",
	"ic-ui/MessageBox",
	"ic-core/config/features",
	"ic-core/TextBox"
], function (declare, lang, domConstruct, domStyle, i18nQueryForm, on, template, templateOld, _Widget, _Templated, MessageBox, has, TextBox) {

	var QueryForm = declare(
		"lconn.search.QueryForm",
		[_Widget, _Templated],
	{
		
		getDidYouMean:			function(){},			// Callback function used to get the did you mean suggestion from the data store
		getQueryTerm:			function(){},			// Callback function used to get the current query term from the API handler
		_strings:				i18nQueryForm,
		templateString: 		template,
		old_templateString:		templateOld,
		updateQuery:			function(){},			// Callback function used to change the current query term and update the results
		
		constructor: function() {
			if(!has("search-global-search-restyle")) {
				this.templateString = this.old_templateString;
			}
		},
		
		postCreate: function(){	
			this.inherited(arguments);
			
			this.textBox = new TextBox({
				shadowText:		this._strings.SEARCH_INPUT_LABEL,
				textBoxClass:	"lotusText",
				name:			"query",
				title:			this._strings.SEARCH_INPUT_LABEL,
				value:			this.getQueryTerm()
			}, this.textBox);
			
			if(has("search-global-search-restyle")) {
				this.textBox.textbox.setAttribute("autocomplete", "off");
			}
			
			this.connect(this.formDomNode, "onsubmit", lang.hitch(this, function(){
				this.textBox.setHiddenValue();	// Necessary as textBoxBlur may not have fired yet
				var query = this.textBox.getValue(); 
				this.updateQuery(query, this.textBox);
				return false;
			}));
			
			// Setting the containerNode ensures destroyRecursive destroys the children
			this.containerNode = this.domNode;
			
			if(has("search-global-search-restyle")) {
				this.connect(this.textBox.textbox, "onkeypress", "_showHideButtons");
				this.connect(this.textBox.textbox, "onchange", "_showHideButtons");
				this._showHideButtons();
			}
		},
		
		update: function(){
			this._updateTextBox();
			this._updateDidYouMean();
		},
		
		_updateDidYouMean: function() {
			var suggestion = this.getDidYouMean();
			
			if(suggestion && suggestion.length>0){
				
				var suggestionMsg = domConstruct.create("span", {
					innerHTML:	this._strings.DID_YOU_MEAN + "&nbsp;"
				});
				
				var suggestionLink = domConstruct.create("a", {
					href:		"javascript:;",
					title:		suggestion,
					innerHTML:	suggestion
				}, suggestionMsg);
				
				this.connect(suggestionLink, "onclick", lang.hitch(this, function(){
					this.updateQuery(suggestion);
				}));
				
				var messageContainer = domConstruct.create("div", {}, this.didYouMeanContainerDomNode, "only");
				var messageBox = new MessageBox({
					canClose:	true,
					_strings:	{
									icon_alt:			this._strings.DID_YOU_MEAN,
									a11y_label: 		this._strings.DID_YOU_MEAN,
									close_btn_title:	this._strings.CLOSE_DID_YOU_MEAN,
									close_btn_alt:		this._strings.CLOSE_DID_YOU_MEAN
								},
					type:		MessageBox.TYPE.INFO,
					msg:		suggestionMsg
				}, messageContainer);
				
				domStyle.set(this.didYouMeanContainerDomNode, "display", "");
			} else {
				domStyle.set(this.didYouMeanContainerDomNode, "display", "none");
			}
		},
		
		_updateTextBox:function() {
			// update the text box
			this.textBox.setValue(this.getQueryTerm());
			this._showHideButtons();
		},
		
		_clearQuery: function(evt) {
			if(evt) {
				evt.preventDefault();
				evt.stopPropagation();
			}
			this.textBox.clearValue();
			this.textBox.focus();
			this._showHideButtons();
		},
		
		_showHideButtons: function() {
			if(!this.clearButton || !this.searchButton) {
				return;
			}
			setTimeout(lang.hitch(this, function() {
				this.textBox.setHiddenValue();	// Necessary as textBoxBlur may not have fired yet
				var query = this.textBox.getValue();
				
				if(!query) {
					this.clearButton.style.display = "none";
					this.searchButton.style.display = "none";
				} else {
					this.clearButton.style.display = "";
					this.searchButton.style.display = "";
				}
			}), 1)
		}
	
	});
	
	return QueryForm;
});
