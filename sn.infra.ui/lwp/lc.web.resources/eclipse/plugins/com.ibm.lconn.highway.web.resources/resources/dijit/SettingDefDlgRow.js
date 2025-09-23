/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.dijit.SettingDefDlgRow");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");

dojo.requireLocalization("lconn.highway", "strings");

// should use backslash to concat but the editor doesn't understand it !
lconn.highway.dijit.SettingDefDlgRowTemplateBegin = 
	"<tr class=\"lotusFormFieldRow\"> "+
		"<td class=\"lotusFormLabel lotusNowrap\" title=\"${rowDescription}\ width=\"40%\"> "+
			"<label for=\"${rowInputId}\">${rowTitle}<span role=\"presentation\">&nbsp;</span>"+
			"</label> "+
		"</td> "+
		"<td> ";

lconn.highway.dijit.SettingDefDlgRowTemplateInput = 
			"<input type=\"text\" name=\"${rowName}\" id=\"${rowInputId}\" dojoattachpoint=\"inputNode\" role=\"textbox\"" +
				" tabindex=\"0\" size=\"60\" value=\"${rowValue}\" class=\" lotusText\" title=\"${rowDescription}\"> ";

lconn.highway.dijit.SettingDefDlgRowTemplateBoolean = 
			"<select name=\"${rowName}\" id=\"${rowInputId}\" dojoattachpoint=\"inputNode\" role=\"combobox\"" +
				" tabindex=\"0\" size=\"1\" class=\" lotusText\" title=\"${rowDescription}\"> " +
				"<option value=\"yes\">${_resourceBundle.yes}</option>" +
				"<option value=\"no\">${_resourceBundle.no}</option>" +
			"</select>";

lconn.highway.dijit.SettingDefDlgRowTemplateType = 
			"<select name=\"${rowName}\" id=\"${rowInputId}\" dojoattachpoint=\"inputNode\" role=\"combobox\"" +
				" tabindex=\"0\" size=\"1\" class=\" lotusText\" title=\"${rowDescription}\"> " +
				"<option value=\"boolean\">${_resourceBundle.type_boolean}</option>" +
				"<option value=\"date\">${_resourceBundle.type_date}</option>" +
				"<option value=\"email\">${_resourceBundle.type_email}</option>" +
				"<option value=\"enum\">${_resourceBundle.type_enum}</option>" +
				"<option value=\"file\">${_resourceBundle.type_file}</option>" +
				"<option value=\"integer\">${_resourceBundle.type_integer}</option>" +
				"<option value=\"person\">${_resourceBundle.type_person}</option>" +
				"<option value=\"regex\">${_resourceBundle.type_regex}</option>" +
				"<option value=\"text\">${_resourceBundle.type_text}</option>" +
				"<option value=\"url\">${_resourceBundle.type_url}</option>" +
			"</select>";


lconn.highway.dijit.SettingDefDlgRowTemplateEnd =
			"<div style=\"display: none;\"></div> " +
		"</td> " +
	"</tr>";

/**
 * This is a simplification of Setting, that forces a light box on edit, but has no mode changes and only a single button
 * 
 * @author Bill Looby
 */
dojo.declare(
		// widget name and class
		"lconn.highway.dijit.SettingDefDlgRow",	
		[dijit._Widget, dijit._Templated],	
		// properties and methods
		{
			templateString : null,

			// these are mixed in on construction
			//rowName: "",
			//rowTitle: "",
			//rowDescription:"",
			//rowValue:"",
			//rowType:"",
			
			// this is a dojoaattach
			//inputNode: null,
			
			rowInputId:"",
			
			_resourceBundle: null,
			
			/**
			 * Set the properties of the settingDefinition - replaces the Setting constructor 
			 */
			constructor: function(object) {
				console.log("SettingDefDlgRow constr");
				this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
				this.rowInputId = "rowid_"+object.rowName;
				
				this.templateString = lconn.highway.dijit.SettingDefDlgRowTemplateBegin;
				if ((object.rowType != null) && (object.rowType == "boolean")) {
					this.templateString += lconn.highway.dijit.SettingDefDlgRowTemplateBoolean;
				} else if ((object.rowType != null) && (object.rowType == "type")) {
					this.templateString += lconn.highway.dijit.SettingDefDlgRowTemplateType;
				} else {
					this.templateString += lconn.highway.dijit.SettingDefDlgRowTemplateInput;
				}
				this.templateString += lconn.highway.dijit.SettingDefDlgRowTemplateEnd;
			},
			
			postCreate: function() {
				console.log("SettingDefDlgRow postCreate");
				if (this.rowType != null) {
					if(this.rowType == "boolean") {
					    if (this._getBooleanFromInput(this.rowValue)) {
					    	this.inputNode.selectedIndex = 0;
					    } else {
					    	this.inputNode.selectedIndex = 1;
					    }
					} else if(this.rowType == "type") {
						this.inputNode.value = this.rowValue;
					}
				}
			},
			
			getValue: function() {
				var value = "";
				if ((this.rowType != null) && (this.rowType == "boolean")) {
					value = (this.inputNode[this.inputNode.selectedIndex].value == "yes");
				} else {
					value = this.inputNode.value;
				}
				return value;
			},
			
			_getBooleanFromInput: function(inputValue) {
				if (inputValue != null) {
					if (typeof inputValue == "boolean")
						return inputValue;
					if ((inputValue == "true") || (inputValue == "yes")) {
						return true;
					}
				}
				return false;
			}
			
		}
	);


