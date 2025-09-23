/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.dijit.SettingDef");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");

dojo.require("lconn.highway.dijit.Setting");
dojo.require("lconn.highway.dijit.SettingDefDlg");

dojo.require("dojox.html.entities");
dojo.require("lconn.highway.util.styling");
dojo.require("lconn.highway.util.restAPI");


dojo.requireLocalization("lconn.highway", "strings");

/**
 * This is a simplification of Setting, that forces a light box on edit, but has no mode changes and only a single button
 * 
 * @author Bill Looby
 */
dojo.declare( 
		// widget name and class
		"lconn.highway.dijit.SettingDef",	
		[lconn.highway.dijit.Setting],	
		// properties and methods
		{
			// templatePath: dojo.moduleUrl("lconn.highway", "templates/setting.html"), -- inherited - just for reference here
			
			/**
			 * Set the properties of the settingDefinition - replaces the Setting constructor 
			 */
			constructor: function(settingObject) {
				this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
				this.settingDetails = settingObject;
				
				console.log("SettingDefinition constr");
				
				// set up the description & value
				this.displayValue="<not set>";
				if ((this.settingDetails.defaultValues != null) &&
					(this.settingDetails.defaultValues.___default_role___ != null)) { // should never be null
					this.displayValue = this.settingDetails.defaultValues.___default_role___.content;
				}
				this.displayDescription="";
				if (this.settingDetails.description != null) {
					this.displayDescription = this.settingDetails.description;
				}
				
				console.log("SettingDefinition constr end");
			},
			
			setMode: function(mode){
				// one button and no modes
				dojo.removeClass(this.editActionNode, "lotusHidden");
				dojo.removeClass(this.deleteActionNode, "lotusHidden");
			},
			
			onEdit: function(){
				
				if (this.settingDetails.validation != null) {
					var validationType = this.settingDetails.validation.type;
					var validationDetails = this.settingDetails.validation.details;
				} else {
					var validationType = "";
					var validationDetails = "";
				}
				
				new lconn.highway.dijit.SettingDefDlg({
					newSetting: false,
					settingId: this.settingDetails.id,
					settingName: this.settingDetails.name,
					settingTitle: this.settingDetails.title,
					settingCategory: this.settingDetails.category,
					settingDescription: this.settingDetails.description,
					settingCanModify: this.settingDetails.canModify,
					settingAllowRoles: this.settingDetails.allowRoles,
					settingValidationType: validationType,
					settingValidationDetails: validationDetails,
					settingDefaultValue: this.displayValue
				}).show();
			},
			
			onDelete: function(){
				var caller = new lconn.highway.util.restAPI.Caller(dojo.hitch(this, "handlePostResponse"));
				caller.postDeletedDefinition(this.settingDetails);
			},
			
			toggleRoles: function(){
				; // just want to intercept this as it doesn't apply
			},
			
			setupActiveDisplayValue: function(settingDetails, editDefault) {
				this.extraStyles = lconn.highway.util.styling.getInfoBoxStyles("PURPLE");
				if (settingDetails.defaultValues != null) {
					// if we have a value for the default role we will display it fully in bold
					if (settingDetails.defaultValues.___default_role___ != null) {
						this.displayValue = settingDetails.defaultValues.___default_role___.content;
						this.displayValueClass = "lotusBold";
					}
				}
			},
			
			_updateSettingValue: function(setting) {
				
				if ((setting == null) || (setting.name != this.settingDetails.name)) {
					this.messageContainer.createMessage(this._resourceBundle.msgContentUnexpected, "ERROR", true);
					return;
				}
				
				// read from the return rather than just storing what we've sent.
				if ((setting.defaultValues != null) && (setting.defaultValues.___default_role___ != null)) {
					this.valueNode.innerHTML = dojox.html.entities.encode(dojo.setting.defaultValues.___default_role___.content);
				}

			},
			
		}
	);


