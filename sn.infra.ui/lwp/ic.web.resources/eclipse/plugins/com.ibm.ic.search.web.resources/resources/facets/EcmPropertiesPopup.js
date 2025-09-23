/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/dom-style",
	"dojo/dom-construct",
	"dojo/date/locale",
	"dojo/dom-class",
	"dojo/_base/config",
	"dojo/number",
	"dojo/aspect",
	"dojo/i18n!../nls/EcmPropertiesPopup",
	"dojo/dom-attr",
	"dojo/json",
	"dojo/on",
	"dojo/query",
	"dojo/text!../templates/EcmPropertiesPopup.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/form/CheckBox",
	"dijit/form/DateTextBox",
	"dijit/form/NumberTextBox",
	"dijit/form/TextBox",
	"dijit/form/ValidationTextBox",
	"dijit/registry",
	"ic-core/DialogUtil",
	"ic-core/xslt",
	"ic-ui/aria/Toolbar"
], function (lang, declare, array, domStyle, domConstruct, locale, domClass, config, number, aspect, i18nEcmPropertiesPopup, domAttr, JSON, on, query, template, _Templated, _Widget, CheckBox, DateTextBox, NumberTextBox, TextBox, ValidationTextBox, registry, DialogUtil, xslt, Toolbar) {

	var EcmPropertiesPopup = declare(
		"lconn.search.facets.EcmPropertiesPopup",
		[_Widget, _Templated],
	{
		
		applyFieldConstraint:	function(){},	// Callback function to apply a field value constraint and update the search results
		applyRangeConstraint:	function(){},	// Callback function to apply a range constraint and update the search results
		_changed:				false,			// Boolean used to properly handle change events on property field select box
		_currentProperty:		null,			// Currently selected ECM property
		_data:					null,			// Map of property ids to metadata (a map of dataType, label and defaultValue).
		_dialog:				null,			// An object returned from lconn.core.DialogUtil.popupForm
		documentType:			null,			// Currently selected ECM document type
		fetchData:				function(){},	// Callback function to get ECM properties data
		isAddable:				function(){},	// Callback function to check whether a given ECM property is addable
		previousConstraint:		null,			// Previous constraint, if applicable.
		removeConstraint:		function(){},	// Callback function to remove a constraint (doesn't update the search results)
		_strings:				i18nEcmPropertiesPopup,
		templateString: template,
		
		buildRendering: function() {	
			this.inherited(arguments);
			
			var title = (this.previousConstraint) ? this._strings.EDIT_PROPERTY : this._strings.ADD_PROPERTY;
			
			var popup = DialogUtil.popupForm(title, this.domNode, this._strings.APPLY, 
					this._strings.CANCEL, lang.hitch(this,"_onSubmit"));
			lang.mixin(this, popup);
			
			this._disableSubmitButton();
			
			var ariaOpts = { 
				_isSelected:	function(item){
									return domAttr.get(item, "aria-pressed") === "true";
								}, 
				_kickIn:		function(item){
									if (!this._isSelected(item)){
										this.inherited(arguments);
									} else {
										// Ensure spans are kicked in correctly
										domAttr.set(item, "tabindex", "0");
									}
								}
			};
			new Toolbar(this._dateTimeInputOptionsDaySelectedListNode, ariaOpts);
			new Toolbar(this._dateTimeInputOptionsRangeSelectedListNode, ariaOpts);
		},
		
		postCreate: function(){	
			this.inherited(arguments);
			
			// Setting the containerNode ensures destroyRecursive destroys the children
			this.containerNode = this.domNode;
			
			this.fetchData(lang.hitch(this,"_loadProperties"),lang.hitch(this,"_onError"));
			
			this.connect(this._formNode, "onsubmit", lang.hitch(this, function(){
				if (!domAttr.get(this._dialog.lotusSubmitNode, "disabled")){
					this._onSubmit();
				}
				return false;
			}));
		},
		
		_disableSubmitButton: function(){
			domClass.add(this._dialog.lotusSubmitNode, "lotusBtnDisabled");
			domAttr.set(this._dialog.lotusSubmitNode, "disabled", "disabled");
		},
		
		_enableSubmitButton: function(){
			domClass.remove(this._dialog.lotusSubmitNode, "lotusBtnDisabled");
			domAttr.remove(this._dialog.lotusSubmitNode, "disabled");
		},
	
		_loadProperties: function(/*Object[]*/data, /*Object*/evt) {
			this._data = data;
			
			var isEmpty = true;
	
			for (var i=0; i<data.length; i++){
				var name = data[i].name;
				var label = data[i].label;
				
				if (this.previousConstraint){
					// If there is a previous constraint, we are editing a property, so we only want to
					// show a label for the property we are editing instead of populating the options.
					if (name === this.previousConstraint.id){
						domAttr.set(this._selectProperty.parentNode, "innerHTML", label);
						this._selectProperty = { value: this.previousConstraint.id };
						this._onChangeProperty();
						isEmpty = false;
						break;
					}
				} else if (this.isAddable(data[i])){
					// isAddable ensures the option is only added if you haven't already filtered 
					// by this property unless multiple === true
					domConstruct.create("option",{
						"value":		name,
						"innerHTML":	label
					}, this._selectProperty);
					isEmpty = false;
				}
			}
			
			if (isEmpty){
				// User has attempted to add a property constraint but there are no
				// properties for the user to filter by
				domAttr.set(this._contentNode, "innerHTML", this._strings.EMPTY_TEXT);
			}
			
			domStyle.set(this._loadingNode, "display", "none");
			domStyle.set(this._contentNode, "display", "");
		},
		
		_onChangeProperty: function(){
			this._changed = false;
			
			var selectValue = this._selectProperty.value;
			
			domStyle.set(this._inputContainerNode, "display", "none");
			domStyle.set(this._dateTimeInputOptionsNode, "display", "none");
			
			this._disableSubmitButton();
			if (selectValue){
				domStyle.set(this._inputContainerNode, "display", "inline");
				
				// Clear the input container node
				array.forEach(registry.findWidgets(this._inputContainerNode), function(w) {
					w.destroyRecursive();
				});
				domConstruct.empty(this._inputContainerNode);
				
				var getMetadata = lang.hitch(this,function(/*String*/selectValue){
					var data = this._data;
					for (var i=0; i<data.length; i++){
						var name = data[i].name;
						if (selectValue === name){
							return data[i];
						}
					}
				});
				
				var metadata = getMetadata(selectValue);
				var dataType = metadata.dataType;
				
				// Populate the input container node
				if (metadata.options){
					this._renderEnumerationInput(selectValue, metadata);
				} else if (dataType==="boolean"){
					this._renderBooleanInput(selectValue, metadata);
				} else if (dataType==="dateTime"){
					this._renderDateInput(selectValue, metadata);
				} else if (dataType==="long" || dataType==="double"){
					this._renderNumericInput(selectValue, metadata);
				} else {
					this._renderStringInput(selectValue, metadata);
				}
			} else {
				this._currentProperty = null;
			}
		},
		
		_onError: function(/*Object*/data, /*Object*/evt){
			//TODO Remove the below hack once Gili has implemented the REST API
			if (config.isDebug){
				this._loadProperties([
					{
						"name":"DateCreated",
						"dataType":"dateTime",
						"label":"Date Created",
						"multiple":false,
						"defaultValue":"2012-11-01"
					},
					{
						"name":"Creator",
						"dataType":"string",
						"label":"Creator",
						"multiple":true,
						"defaultValue":"Default"
					},
					{
						"name":"IsReserved",
						"dataType":"boolean",
						"label":"Is Reserved",
						"multiple":false,
						"defaultValue":"false"
					},
					{
						"name":"MinorVersionNumber",
						"dataType":"double",
						"label":"Minor Version Number",
						"multiple":false,
						"defaultValue":"42.5"
					},
					{
						"name":"MajorVersionNumber",
						"dataType":"long",
						"label":"Major Version Number",
						"multiple":false,
						"defaultValue":"42"
					},
					{
						"name":"MovieRating",
						"dataType":"string",
						"label":"Movie Rating",
						"options": [{"label":"General","id":"G"},
									{"label":"Parental Guidance","id":"PG"},
									{"label":"Restricted","id":"R"},
									{"label":"Not Rated","id":"NR"}],
						"multiple":false,
						"defaultValue":"PG"
					}
				]);
				return;
			}
			// End hack. The below is the actual error handling code.
			
			domAttr.set(this.domNode, "innerHTML", this._strings.ERROR_OCCURRED);
			domConstruct.create("div",{
				"innerHTML": data
			}, this.domNode, "last");
			domStyle.set(this._dialog.lotusSubmitNode, "display", "none");
			domAttr.set(this._dialog.lotusCancelNode, "value", this._strings.CLOSE);
		},
		
		_onSelectDayDateInput: function(/*boolean or MouseEvent*/skipFocusGrab){
			domAttr.removeAttr(this._inputContainerNode,"role");
			domAttr.removeAttr(this._inputContainerNode,"aria-label");
			domStyle.set(this._endDateContainerNode, "display", "none");
			domStyle.set(this._dateTimeInputOptionsDaySelectedListNode, "display", "");
			domStyle.set(this._dateTimeInputOptionsRangeSelectedListNode, "display", "none");
			if (skipFocusGrab!==true){
				query("a",this._dateTimeInputOptionsDaySelectedListNode)[0].focus();
			}
			this._currentProperty.validate();
		},
		
		_onSelectRangeDateInput: function(/*boolean or MouseEvent*/skipFocusGrab){
			domAttr.set(this._inputContainerNode, "role", "group");
			domAttr.set(this._inputContainerNode, "aria-label", this._strings.PROPERTY_VALUE);
			domStyle.set(this._endDateContainerNode, "display", "");
			domStyle.set(this._dateTimeInputOptionsDaySelectedListNode, "display", "none");
			domStyle.set(this._dateTimeInputOptionsRangeSelectedListNode, "display", "");
			if (skipFocusGrab!==true){
				query("a",this._dateTimeInputOptionsRangeSelectedListNode)[0].focus();
			}
			this._currentProperty.validate();
		},
		
		_onSelectPropertyClick: function(){
			if (this._changed){
				this._onChangeProperty();
			}
		},
		
		_onSelectPropertyChange: function(){
			this._changed = true;
		},
		
		_onSubmit: function(){	
			
			if (this.previousConstraint){
				this.removeConstraint(JSON.stringify(this.previousConstraint));
			}
			
			var propertyName = this._currentProperty.name;
			var exactMatch = this._currentProperty.exactMatch;
			var value;
			
			if (this._currentProperty.dataType==="boolean" || this._currentProperty.options){
				value = this._currentProperty.defaultValue;
				for (var i=0; i<this._currentProperty.inputs.length; i++){
					var input = this._currentProperty.inputs[i];
					var selected = domAttr.get(input, "selected");
					if (selected){
						value = domAttr.get(input, "value");
						break;
					}
				}
				
				this.applyFieldConstraint(propertyName,value,exactMatch);
			} else if (this._currentProperty.dataType==="dateTime"){
				var startDate = this._currentProperty.inputs[0].get("value");
				var endDate;
				if (domStyle.get(this._endDateContainerNode, "display")!=="none"){
					endDate = this._currentProperty.inputs[1].get("value");
				} else {
					endDate = new Date(startDate);
				}
				endDate.setHours(23);
				endDate.setMinutes(59);
				endDate.setSeconds(59);
				endDate.setMilliseconds(999);
				
				this.applyRangeConstraint(propertyName,startDate.getTime(),endDate.getTime());
			} else {
				value = this._currentProperty.inputs[0].get("value");
				
				this.applyFieldConstraint(propertyName,value,exactMatch);
			}
			
			this.hide();
		},
		
		_renderBooleanInput: function(/*String*/propertyId, /*Object*/metadata){
			var defaultValue = metadata.defaultValue;
			if (this.previousConstraint){
				defaultValue = this.previousConstraint.values[0];
			}
			
			var select = domConstruct.create("select",{
				"id":				this.id + "_selectInput",
				"aria-required":	"true"
			});
			
			this._renderLabelAndWrapperDiv(select);
			
			this._setInputAriaLabel(select);
			
			var trueOption = domConstruct.create("option",{
				"value":		"true",
				"innerHTML":	this._strings.TRUE
			}, select);
			var falseOption = domConstruct.create("option",{
				"value":		"false",
				"innerHTML":	this._strings.FALSE
			}, select);
			
			if (defaultValue === "false"){
				domAttr.set(falseOption, "selected", "selected");
			} else {
				domAttr.set(trueOption, "selected", "selected");
			}
			
			this._currentProperty = lang.mixin(metadata, {
				id:		propertyId,
				inputs: [trueOption,falseOption] 
			});
			
			this._enableSubmitButton();
		},
		
		_renderDateInput: function(/*String*/propertyId, /*Object*/metadata){
			domStyle.set(this._dateTimeInputOptionsNode, "display", "");
	
			var	defaultStartRangeValue = new Date(this.previousConstraint ? number.parse(this.previousConstraint.values[0].ge) : metadata.defaultValue);
			var	defaultEndRangeValue = new Date(this.previousConstraint ? number.parse(this.previousConstraint.values[0].le) : metadata.defaultValue);
			
			var promptMessage = lang.replace(this._strings.ENTER_A_DATE,{date:locale.format(new Date(), {selector: "date"})});
			var dateTextBox = new DateTextBox({
				promptMessage:	promptMessage,
				// Restores drop down calendar opening up on clicking user input area
				// http://dojotoolkit.org/reference-guide/1.8/releasenotes/1.8.html#id45
				hasDownArrow:	false,
				required:		true,
				value:			defaultStartRangeValue
			});
			var startDateContainerNode = this._renderLabelAndWrapperDiv(dateTextBox);
			var startDateLabelNode = query("label", startDateContainerNode)[0];
			
			aspect.after(this, "_onSelectDayDateInput", lang.hitch(this, function(){
				var input = this._currentProperty.inputs[0].textbox;
				domClass.add(input, "lotusText");
				domAttr.removeAttr(input, "aria-label");
				this._setInputAriaLabel(input);
				domAttr.set(startDateLabelNode, "innerHTML", domAttr.get(this._renderLabel(input, this._strings.PROPERTY_VALUE_PREFIX), "innerHTML"));
			}), true);
			
			aspect.after(this, "_onSelectRangeDateInput", lang.hitch(this, function(){
				var input = this._currentProperty.inputs[0].textbox;
				domAttr.removeAttr(input, "aria-labelled-by");
				domAttr.set(input, "aria-label", this._strings.START_DATE);
				domAttr.set(startDateLabelNode, "innerHTML", domAttr.get(this._renderLabel(input, this._strings.START_DATE_PREFIX), "innerHTML"));
			}), true);
			
			var endRangeDateTextBox = new DateTextBox({
				promptMessage:	promptMessage,
				// Restores drop down calendar opening up on clicking user input area
				// http://dojotoolkit.org/reference-guide/1.8/releasenotes/1.8.html#id45
				hasDownArrow:	false,
				required:		true,
				value:			defaultEndRangeValue
			});
			domAttr.set(endRangeDateTextBox.textbox, "aria-label", this._strings.END_DATE);
			
			this._endDateContainerNode = this._renderLabelAndWrapperDiv(endRangeDateTextBox, this._strings.END_DATE);
			domStyle.set(this._endDateContainerNode, "display", "none");
			
			var onValidate = lang.hitch(this, function(){
				var dateTextBoxValid = dateTextBox.isValid() && dateTextBox.get("value");
				var endRangeDateTextBoxValid = endRangeDateTextBox.isValid() && endRangeDateTextBox.get("value");
				var rangeValid = dateTextBoxValid && endRangeDateTextBoxValid && endRangeDateTextBox.get("value") > dateTextBox.get("value");
				if (dateTextBoxValid && (rangeValid || domStyle.get(this._endDateContainerNode, "display")==="none")){
					this._enableSubmitButton();
				} else {
					this._disableSubmitButton();
				}
			});
			aspect.after(dateTextBox, "validate", onValidate, true);
			aspect.after(endRangeDateTextBox, "validate", onValidate, true);
			
			this._currentProperty = lang.mixin(metadata, {
				id:			propertyId,					
				inputs:		[dateTextBox,endRangeDateTextBox],
				validate:	onValidate	
			});
			
			this._onSelectDayDateInput(true);
			if (this.previousConstraint){
				// If we are editing a property filter, we want to show range input if constraint is not for a single day.
				var sameDate = defaultStartRangeValue.toDateString() === defaultEndRangeValue.toDateString();
				if (!sameDate){
					this._onSelectRangeDateInput(true);
				}
			}
			
			onValidate();
		},
		
		_renderEnumerationInput: function(/*String*/propertyId, /*Object*/metadata){
			var select = domConstruct.create("select",{
				"id":				this.id + "_selectInput",
				"aria-required":	"true"
			});
			
			this._renderLabelAndWrapperDiv(select);
			
			this._setInputAriaLabel(select);
			
			var defaultValue = metadata.defaultValue;
			if (this.previousConstraint){
				defaultValue = this.previousConstraint.values[0];
			}
			
			var inputs = [];
			for (var i=0; i<metadata.options.length; i++){
				var option = metadata.options[i];
				
				var input = domConstruct.create("option",{
					"value":		option.id,
					"innerHTML":	option.label
				}, select);
				
				if (option.id === defaultValue){
					domAttr.set(input, "selected", "selected");
				}
				
				inputs.push(input);
			}
					
			this._currentProperty = lang.mixin(metadata, {
				id:		propertyId,
				inputs: inputs
			});
			
			this._enableSubmitButton();
		},
		
		_renderLabel: function(/*DOMNode*/input, /*String?*/label){
			
			var labelNode = domConstruct.create("label", { 
				"for":			domAttr.get(input, "id"),
				"innerHTML":	label ? label : this._strings.PROPERTY_VALUE_PREFIX
			});
			
			var requiredSpan = domConstruct.create("span", {
				"class":		"lotusFormRequired",
				"innerHTML":	"*",
				"title":		this._strings.REQUIRED_FIELD
			}, labelNode, "first");
					
			return labelNode;
		},
		
		_renderLabelAndWrapperDiv: function(/*dijit.form.ValidationTextBox or DOMNode*/input, /*String?*/label){
			
			var lotusFormFieldDiv = domConstruct.create("div", {
				"class":		"lotusFormField"
			}, this._inputContainerNode);
			
			var labelNode;
			if (input.textbox){
				// input is dijit.form.ValidationTextBox
				labelNode = this._renderLabel(input.textbox, label);
			} else {
				// input is DOMNode
				labelNode = this._renderLabel(input, label);
			}
			domConstruct.place(labelNode, lotusFormFieldDiv);
			
			var lotusFieldWrapperDiv = domConstruct.create("div", {
				"class":		"lotusFieldWrapper"
			}, lotusFormFieldDiv);
			
			if (input.domNode){
				// input is dijit.form.ValidationTextBox
				domConstruct.place(input.domNode, lotusFieldWrapperDiv);
			} else {
				// input is DOMNode
				domConstruct.place(input, lotusFieldWrapperDiv);
			}
			
			return lotusFormFieldDiv;
		},
		
		_renderNumericInput: function(/*String*/propertyId, /*Object*/metadata){
			var defaultValue = metadata.defaultValue;
			if (this.previousConstraint){
				defaultValue = this.previousConstraint.values[0];
			}
	
			var numberTextBox = new NumberTextBox({
				constraints:	{fractional: metadata.dataType === "double"},
				promptMessage:	this._strings.ENTER_A_NUMBER,
				required:		true,
				value:			defaultValue
			});
			
			this._setInputAriaLabel(numberTextBox.textbox);
			domClass.add(numberTextBox.textbox, "lotusText");
			
			var onValidate = lang.hitch(this, function(){
				var value = numberTextBox.get("value");
				if (value && !isNaN(value) && numberTextBox.isValid()){
					this._enableSubmitButton();
				} else {
					this._disableSubmitButton();
				}
			});
			
			aspect.after(numberTextBox, "validate", onValidate, true);
			this._renderLabelAndWrapperDiv(numberTextBox);
			
			this._currentProperty = lang.mixin(metadata, {
				id:			propertyId,
				inputs:		[numberTextBox],
				validate:	lang.hitch(this,onValidate)	
			});
			
			onValidate();
		},
		
		_renderStringInput: function(/*String*/propertyId, /*Object*/metadata){
			var defaultValue = metadata.defaultValue;
			if (this.previousConstraint){
				defaultValue = this.previousConstraint.values[0];
			}
			
			var textBox = new ValidationTextBox({
				required:	true,
				value:		defaultValue
			});
			
			this._setInputAriaLabel(textBox.textbox);
			domClass.add(textBox.textbox, "lotusText");
			
			var onValidate = lang.hitch(this, function(){
				if (textBox.get("value") && textBox.isValid()){
					this._enableSubmitButton();
				} else {
					this._disableSubmitButton();
				}
			});
			
			aspect.after(textBox, "validate", onValidate, true);
			this._renderLabelAndWrapperDiv(textBox);
			
			this._currentProperty = lang.mixin(metadata, {
				id:			propertyId,
				inputs:		[textBox],
				validate:	lang.hitch(this,onValidate)	
			});
			
			onValidate();
		},
		
		_setInputAriaLabel: function(/*DOMNode*/input){
			domAttr.set(input, "aria-label", this._strings.PROPERTY_VALUE);
		}
	
	});
	
	return EcmPropertiesPopup;
});
