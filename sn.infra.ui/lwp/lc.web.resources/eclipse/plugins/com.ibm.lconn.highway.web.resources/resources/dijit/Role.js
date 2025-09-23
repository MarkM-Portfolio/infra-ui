/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.dijit.Role");

dojo.require("dojox.html.entities");

dojo.require("lconn.highway.util.restAPI");
dojo.require("lconn.highway.util.validate");
dojo.require("lconn.highway.util.styling");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");

dojo.requireLocalization("lconn.highway", "strings");

dojo.declare(
		// widget name and class
		"lconn.highway.dijit.Role",
		[dijit._Widget, dijit._Templated],	
		// properties and methods
		{
			templatePath: dojo.moduleUrl("lconn.highway", "templates/role.html"),
			
			// tableNode : null, -- dojo attach for tableNode
			// roleNode : null, -- dojo attach for roleNode
			// valueNode : null, -- dojo attach for valueNode
			// valueUpdatingNode : null, -- dojo attach for valueUpdatingNode
			// valueEditNode : null, -- dojo attach for valueEditNode
			// valueEditTextBox : null, -- dojo attach for valueEditTextBox
			// roleEditNode : null, -- dojo attach for roleEditNode
			// roleEditTextBox : null, -- dojo attach for roleEditTextBox
			// editActionNode : null, -- dojo attach for editActionNode
			// deleteRoleActionNode : null, -- dojo attach for deleteRoleActionNode
			// overrideActionNode : null, -- dojo attach for overrideActionNode
			// saveActionNode : null, -- dojo attach for saveActionNode
			// cancelActionNode : null, -- dojo attach for cancelActionNode
			
			// setting: null -- mixed in on construction
			// roleName: null, -- mixed in on construction
			// settingDetails: null, -- mixed in on construction
			// messageContainer: null,  -- mixed in on construction
			// editDefault: null,  -- mixed in on construction
			spacingStyles:"padding: 0px !important; margin: 0 0 1px 0 !important;",
			displayName:"",
			displayNameClass:"",
			displayDescription:"",
			displayValue:"",
			displayEditActionDescription:"",
			displayValueClass:"",
			showOverrideAction: false,
			isDefaultRole: false,
			editMode: false,
			roleEditMode: false,
			extraStyles: "",
			editable: true,
			
			/**
			 * Set the properties of the setting 
			 */
			constructor: function(object) {
				this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
				
				console.log("Role constr");
				
				// is this the default role and is it editable
				this.isDefaultRole = (object.roleName == "___default_role___");
				this.editable = object.settingDetails.canModify;
				
				// Get the role name (if valid) and use the appropriate text for the default role and description
				this.extraStyles = lconn.highway.util.styling.getInfoBoxStylesBorder("LIGHTGRAY");
				if (object.roleName != null) {
					
					// set up the mode if this is to be used for a new role submission
					if (object.roleName == "_NEW_ROLE") {
						this.extraStyles = lconn.highway.util.styling.getInfoBoxStylesBorder("BLUE");
						this.roleEditMode=true;
					} else if (this.isDefaultRole) {
						this.displayNameClass = "lotusItalic";
						if (object.settingDetails.allowRoles) {
							this.displayName = this._resourceBundle.roleDefaultRoleName;
							this.displayDescription = this._resourceBundle.roleDefaultRoleDescription;
							this.displayEditActionDescription = this._resourceBundle.roleDefaultRoleEditActionDescription;
						} else { // shouldn't really get here
							this.displayName = this._resourceBundle.roleSingleOnlyName;
							this.displayDescription = this._resourceBundle.roleSingleOnlyDescription;
							this.displayEditActionDescription = this._resourceBundle.rolesingleOnlyEditActionDescription;
						}
					} else {
						this.displayName = object.roleName;
						this.displayDescription = this._resourceBundle.roleDescription;
						this.displayEditActionDescription = this._resourceBundle.roleEditActionDescription;
					}
				}
				
				// set up the displayValue (i.e. currently active value : specific if supplied, default value otherwise)
				// if the default action is supplied then disable the delete button and change the hover text
				
				var found = false;
				this.displayValueClass = "lotusInactive lotusItalic";
				if (object.settingDetails.values != null) {
					if (object.settingDetails.values[object.roleName] != null) {
						this._setupDisplayValue(object.settingDetails.values[object.roleName], true);
						found = true;
					}
				}
				if ((!found) && (object.settingDetails.defaultValues != null)) {
					if (object.settingDetails.defaultValues[object.roleName] != null) {
						this._setupDisplayValue(object.settingDetails.defaultValues[object.roleName], this.editDefault);
						this.displayValue = object.settingDetails.defaultValues[object.roleName].content;
						this.showOverrideAction = !this.editDefault;
					}
				}
				
				console.log("Role constr end");
			},
			
			postCreate: function(){

				if (this.roleEditMode) {
					this.setMode("EDIT_ROLE");
				} else {
					this.setMode("VALUE");
				}
				
				// prepare for fade in
				dojo.style(this.domNode, "opacity", "0");
				console.log("post create role");
			},
			
			startup: function() {
				console.log("fade in role");
				var args = {node: this.domNode};
				dojo.fadeIn(args).play();
			},
			
			onCancel: function(){
				if (this.editMode) {
					this.setMode("VALUE");
					this.editMode = !this.editMode;
				} else {
					// need to remove the whole item
					this.destroyRecursive();
				}
			},

			onEdit: function(){
				this.setMode("EDIT");
				this.editMode = !this.editMode;
			},
			
			onDelete: function(){
				var caller = new lconn.highway.util.restAPI.Caller(dojo.hitch(this, "handleDeleteResponse"));
				caller.postDeletedSetting(this.settingDetails.organization, this.settingDetails, this.roleName);
			},

			setMode: function(mode){
				if (mode == "VALUE") {
					dojo.addClass(this.roleEditNode, "lotusHidden");
					dojo.addClass(this.valueUpdatingNode, "lotusHidden");
					dojo.addClass(this.valueEditNode, "lotusHidden");
					dojo.removeClass(this.valueNode, "lotusHidden");
					dojo.addClass(this.saveActionNode, "lotusHidden");
					dojo.addClass(this.cancelActionNode, "lotusHidden");
					
					if (this.editable) {
						if (this.showOverrideAction) {
							dojo.removeClass(this.overrideActionNode, "lotusHidden");
						} else {
							dojo.removeClass(this.editActionNode, "lotusHidden");
							if (!(this.editDefault && this.isDefaultRole)) {
								dojo.removeClass(this.deleteRoleActionNode, "lotusHidden");
							}
						}
					}
				} else if (mode == "UPDATING") { 
					dojo.removeClass(this.valueUpdatingNode, "lotusHidden");
					dojo.addClass(this.valueEditNode, "lotusHidden");
					dojo.addClass(this.valueNode, "lotusHidden");
					dojo.addClass(this.editActionNode, "lotusHidden");
					dojo.addClass(this.saveActionNode, "lotusHidden");
					dojo.addClass(this.cancelActionNode, "lotusHidden");
					dojo.addClass(this.deleteRoleActionNode, "lotusHidden");
					dojo.addClass(this.overrideActionNode, "lotusHidden");
				} else { // mode = EDIT || EDIT_ROLE
					dojo.addClass(this.roleEditNode, "lotusHidden");
					dojo.addClass(this.valueNode, "lotusHidden");
					dojo.removeClass(this.valueEditNode, "lotusHidden");
					dojo.removeClass(this.saveActionNode, "lotusHidden");
					dojo.removeClass(this.cancelActionNode, "lotusHidden");
					
					dojo.addClass(this.editActionNode, "lotusHidden");
					dojo.addClass(this.deleteRoleActionNode, "lotusHidden");
					dojo.addClass(this.overrideActionNode, "lotusHidden");
					
					if (mode == "EDIT_ROLE") {
						dojo.removeClass(this.roleEditNode, "lotusHidden");
					}
				}
			},
			
			onSave : function(){
				var newValue = this.valueEditTextBox.value;
				if (this.roleEditMode) {
					this.roleName = this.roleEditTextBox.value;
				}
				var validationResult = lconn.highway.util.validate.ValidateValue(this.settingDetails, newValue);
				if (!validationResult.success){
					this.messageContainer.createMessage(validationResult.message, "ERROR", true);
				} else {
					var caller = new lconn.highway.util.restAPI.Caller(dojo.hitch(this, "handlePostResponse"));
					this.setMode("UPDATING");
					caller.postSetting(this.settingDetails.organization, this.settingDetails, this.roleName, newValue);
				}
			},
			
			handlePostResponse: function(success, message, json) {
				console.log('handlePostResponse called');
				if(!success) {
					this.messageContainer.createMessage(message, "ERROR", true);
					console.error("API Error: %o", message);
					this.setMode("VALUE");
				} else {
					if ((json.settings != null) && (json.settings.length > 0)) {
						this._updateSettingValue(json.settings[0]);	
						this.setMode("VALUE");
					}
				}
			},
			
			handleDeleteResponse: function(success, message, json) {
				console.log('handlePostResponse called');
				if(!success) {
					this.messageContainer.createMessage(message, "ERROR", true);
					console.error("API Error: %o", message);
				} else {
					// only remove completely if it's the default otherwise update (not
					// highlighted as modified any more)
					if (this.settingDetails.organization="00000000-0000-0000-0000-000000000000") {
						this.destroy();
					} else {
						setting.values[this.roleName] = null;
						this._updateSettingValue(this);	
					}
				}
			},
			
			onSettingFocus: function(){
				dojo.addClass(this.roleNode, "lotusBold");
				dojo.addClass(this.valueNode, "lotusBold");
				this.setting.updateSettingInfo(false);
			},
			
			onSettingBlur: function(){
				dojo.removeClass(this.roleNode, "lotusBold");
				dojo.removeClass(this.valueNode, "lotusBold");
			},
			
			onMouseOver: function(){
				dojo.addClass(this.roleNode, "lotusBig");
				dojo.addClass(this.valueNode, "lotusBig");
			},
			
			onMouseOut: function(){
				dojo.removeClass(this.roleNode, "lotusBig");
				dojo.removeClass(this.valueNode, "lotusBig");
			},
			
			_updateSettingValue: function(setting) {
				
				if ((setting == null) || (setting.name != this.settingDetails.name)) {
					this.messageContainer.createMessage(this._resourceBundle.msgContentUnexpected, "ERROR", true);
					return;
				}
				
				// update the role name
				this.roleNode.innerHTML = dojox.html.entities.encode(this.roleName); // although there should be no issues with escaping
				
				// read from the return rather than just storing what we've sent.
				if ((setting.values != null) && (setting.values[this.roleName] != null)) {
					// generally the case
					this.valueNode.innerHTML = dojox.html.entities.encode(setting.values[this.roleName].content);
					dojo.removeClass(this.tableNode, "lotusInactive");
					dojo.removeClass(this.tableNode, "lotusItalic");
					this.extraStyles = lconn.highway.util.styling.getInfoBoxStylesBorder("BLUE");
				} else if ((setting.defaultValues != null) && (setting.defaultValues[this.roleName] != null)) {
					// used only if creating initial defaults
					this.valueNode.innerHtml = dojox.html.entities.encode(setting.defaultValues[this.roleName].content);
					if (!this.editDefault) {
						dojo.addClass(this.tableNode, "lotusInactive");
						dojo.addClass(this.tableNode, "lotusItalic");
						this.extraStyles = lconn.highway.util.styling.getInfoBoxStylesBorder("GRAY");
					}
				}
				this.tableNode.style= this.extraStyles + " " + this.spacingStyles;
			},
			
			_setupDisplayValue: function(value, highlight) {
				if ((value.type="text") && ("content" in value)) {
					this.displayValue = value.content;	
				} else {
					this.displayValue = "[NON-EDITABLE]";
					this.editable = false;
				}
				
				if (highlight) {
					this.extraStyles = lconn.highway.util.styling.getInfoBoxStyles("BLUE");
				}
			},
			
			// private
			_resourceBundle: null
		}
	);


