/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.dijit.Setting");

dojo.require("dojox.html.entities");

dojo.require("lconn.highway.util.restAPI");
dojo.require("lconn.highway.util.validate");
dojo.require("lconn.highway.util.styling");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");

dojo.require("lconn.highway.dijit.Role");

dojo.require("lconn.highway.dijit.MessageContainer");

dojo.requireLocalization("lconn.highway", "strings");

dojo.declare(
		// widget name and class
		"lconn.highway.dijit.Setting",	
		[dijit._Widget, dijit._Templated, dijit._Container],	
		// properties and methods
		{
			DEFAULT_ROLE: "___default_role___",
			templatePath: dojo.moduleUrl("lconn.highway", "templates/setting.html"),
			
			// messageContainerNode : null -- dojo attach for the message container
			// titleNode : null, -- dojo attach for the titleNode
			// valueNode : null, -- dojo attach for valueNode
			// valueUpdatingNode : null, -- dojo attach for valueUpdatingNode
			// valueEditNode : null, -- dojo attach for valueEditNode
			// valueEditTextBox : null, -- dojo attach for valueEditTextBox
			// editActionNode : null, -- dojo attach for settingsRole
			// deleteActionNode : null, -- dojo attach for deleteActionNode
			// rolesActionNode : null, -- dojo attach for settingsRole
			// rolesValuesNode : null, -- dojo attach for showing the roles
			// saveActionNode : null, -- dojo attach for saveActionNode
			// cancelActionNode : null, -- dojo attach for cancelActionNode
			
			// settingDetails: null,-- mixed in on construction
			// editDefault: false,-- mixed in on construction
			spacingStyles: "padding: 0px !important; margin: 5px 0 1px 0 !important;",
			displayValue:"",
			displayDescription:"",
			displayValueClass:"",
			messageContainer: null,
			showOverrideAction: true,
			rolesExpanded: false,
			roleList: null,
			extraStyles: "",
			info: null,
			editable: true,
			
			/**
			 * Set the properties of the setting 
			 */
			constructor: function(object) {
				this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
				
				console.log("Setting constr");
				
				// set up the description
				if (object.settingDetails.description != null) {
					this.displayDescription = object.settingDetails.description;
				}
				
				// set up the displayValue (currently active value) and the complete role list
				// set up the total role list
				this.info=object.settingDetails.info;
				this.editable = object.settingDetails.canModify; // may also get set to false later if the type indicates
				this.setupActiveDisplayValue(object.settingDetails, object.editDefault);
				this._setupRoleList(object.settingDetails);
				console.log("Setting constr end");
			},
			
			postCreate: function(){
				console.log("post create setting");
				
				// set up the message container in case we need it
				this.messageContainer = new lconn.highway.dijit.MessageContainer({small:true}, this.messageContainerNode);
				this.setMode("VALUE");
				
				// prepare for fade in
				dojo.style(this.domNode, "opacity", "0");
			},
			
			startup: function() {
				// used where there is no explicit fade in
				this.fadeIn();
			},

			fadeIn: function(){
				console.log("fade in setting");
				var args = {node: this.domNode};
				dojo.fadeIn(args).play();
			},
			
			fadeOut: function(){
				console.log("fade out setting");
				var args = {node: this.domNode};
				dojo.fadeOut(args).play();
			},
			
			setMode: function(mode){
				if (mode == "VALUE") {
					
					if (this.settingDetails.allowRoles) {  // use the roles to edit, edit not available from the main item if there are roles
						dojo.removeClass(this.rolesActionNode, "lotusHidden");
					} else if (this.editable) {
						if (this.showOverrideAction) {
							dojo.removeClass(this.overrideActionNode, "lotusHidden");
						} else {
							dojo.removeClass(this.editActionNode, "lotusHidden");
							if (!this.editDefault) {
								dojo.removeClass(this.deleteActionNode, "lotusHidden");
							}
						}
					}
					
					dojo.addClass(this.valueUpdatingNode, "lotusHidden");
					dojo.addClass(this.valueEditNode, "lotusHidden");
					dojo.removeClass(this.valueNode, "lotusHidden");
					dojo.addClass(this.saveActionNode, "lotusHidden");
					dojo.addClass(this.cancelActionNode, "lotusHidden");
					
				} else if (mode == "UPDATING") { 
					dojo.addClass(this.editActionNode, "lotusHidden");
					dojo.removeClass(this.valueUpdatingNode, "lotusHidden");
					dojo.addClass(this.valueEditNode, "lotusHidden");
					dojo.addClass(this.valueNode, "lotusHidden");
					dojo.addClass(this.saveActionNode, "lotusHidden");
					dojo.addClass(this.cancelActionNode, "lotusHidden");
					dojo.addClass(this.deleteActionNode, "lotusHidden");
					dojo.addClass(this.overrideActionNode, "lotusHidden");
				} else { // mode = EDIT
					dojo.addClass(this.valueNode, "lotusHidden");
					dojo.addClass(this.valueUpdatingNode, "lotusHidden");
					dojo.removeClass(this.valueEditNode, "lotusHidden");
					dojo.removeClass(this.saveActionNode, "lotusHidden");
					dojo.removeClass(this.cancelActionNode, "lotusHidden");
					
					dojo.addClass(this.editActionNode, "lotusHidden");
					dojo.addClass(this.deleteActionNode, "lotusHidden");
					dojo.addClass(this.overrideActionNode, "lotusHidden");
				}
			},
			
			onCancel: function(){
				this.setMode("VALUE");
			},

			onEdit: function(){
				this.setMode("EDIT");
			},
			
			onDelete: function(){
				var caller = new lconn.highway.util.restAPI.Caller(dojo.hitch(this, "handlePostResponse"));
				caller.postDeletedSetting(this.settingDetails.organization, this.settingDetails, this.DEFAULT_ROLE);
			},

			onSave : function(){
				var newValue = this.valueEditTextBox.value;
				var validationResult = lconn.highway.util.validate.ValidateValue(this.settingDetails, newValue);
				if (!validationResult.success){
					this.messageContainer.createMessage(validationResult.message, "ERROR", true);
				} else {
					var caller = new lconn.highway.util.restAPI.Caller(dojo.hitch(this, "handlePostResponse"));
					this.setMode("UPDATING");
					caller.postSetting(this.settingDetails.organization, this.settingDetails, this.DEFAULT_ROLE, newValue);
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
					} else {
						// success but empty setting => delete the value
						this.destroy();
					}
				}
			},
			
			onAddRole: function(){
				var newRole= new lconn.highway.dijit.Role({
					roleName : "_NEW_ROLE",
					settingDetails: this.settingDetails,
					messageContainer: this.messageContainer,
					editDefault: this.editDefault });
				this.addChild(newRole);
				newRole.startup();
			},
			
			onSettingFocus: function(){
				dojo.addClass(this.titleNode, "lotusBold");
				dojo.addClass(this.valueNode, "lotusBold");
				this.updateSettingInfo(true);
			},
			
			onSettingBlur: function(){
				dojo.removeClass(this.titleNode, "lotusBold");
				dojo.removeClass(this.valueNode, "lotusBold");
			},
			
			onMouseOver: function(){
				dojo.addClass(this.titleNode, "lotusBig");
				dojo.addClass(this.valueNode, "lotusBig");
			},
			
			onMouseOut: function(){
				dojo.removeClass(this.titleNode, "lotusBig");
				dojo.removeClass(this.valueNode, "lotusBig");
			},
			
			toggleRoles: function(){
				
				if (!this.settingDetails.allowRoles) {
					return;
				}
				if (this.rolesExpanded) {
					this.removeRoles();
					dojo.addClass(this.addRoleActionNode, "lotusHidden");
				} else {
					this.addRoles();
					dojo.removeClass(this.addRoleActionNode, "lotusHidden");
				}
				this.rolesExpanded = !this.rolesExpanded;
			},
			
			addRoles: function(){
				
				// now add entries for all of the roles found
				for (foundRoleName in this.roleList) {
					var newRole= new lconn.highway.dijit.Role({
						setting : this,
						roleName : foundRoleName,
						settingDetails: this.settingDetails,
						messageContainer: this.messageContainer,
						editDefault: this.editDefault});
					this.addChild(newRole);
					newRole.startup();
				}
						
			},
			
			removeRoles: function(){
				// Destroy all children dijits
				dojo.forEach(dijit.findWidgets(this.containerNode), function(widget){
					widget.destroyRecursive();
				});
			},

			setupActiveDisplayValue: function(settingDetails, editDefault) {
				var found = false;
				var highlightBackground = false;

				//this.displayValueClass = "lotusInactive lotusItalic";
				this.displayValueClass = "";
				this.extraStyles = lconn.highway.util.styling.getInfoBoxStyles("GRAY"); // default
				
				if (settingDetails.values != null) {
					// if we have a value for the default role we will display it fully in bold and with a blue background
					if (settingDetails.values[this.DEFAULT_ROLE] != null) {
						this._setupDisplayValue(settingDetails.values[this.DEFAULT_ROLE], true);
						found = true;
					} else {
						// unexpected - values defined but no default
						this.extraStyles = lconn.highway.util.styling.getInfoBoxStyles("BLUE");
					}
				}
				
				// if we just have a default we display it inactive 
				if ((!found) && (settingDetails.defaultValues != null)) { // should never be null
					if ( (settingDetails.defaultValues[this.DEFAULT_ROLE] != null) && 
							(settingDetails.defaultValues[this.DEFAULT_ROLE].content != null) ){ // neither should ever be null
						this._setupDisplayValue(settingDetails.defaultValues[this.DEFAULT_ROLE], editDefault);
					}
				}
				
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
					this.showOverrideAction = false;					
				}
			},

			_updateSettingValue: function(setting) {
				
				if ((setting == null) || (setting.name != this.settingDetails.name)) {
					this.messageContainer.createMessage(this._resourceBundle.msgContentUnexpected, "ERROR", true);
					return;
				}
				
				// read from the return rather than just storing what we've sent.
				if ((setting.values != null) && (setting.values.___default_role___ != null)) {
					// generally the case
					this.valueNode.innerHTML = dojox.html.entities.encode(setting.values.___default_role___.content);
					dojo.addClass(this.tableNode, "lotusBold");
					dojo.removeClass(this.tableNode, "lotusInactive");
					this.extraStyles = lconn.highway.util.styling.getInfoBoxStyles("BLUE");
				} else if ((setting.defaultValues != null) && (setting.defaultValues.___default_role___ != null)) {
					// used only if creating initial defaults or after delete
					this.valueNode.innerHTML = dojox.html.entities.encode(setting.defaultValues.___default_role___.content);
					if (!this.editDefault) {
						dojo.removeClass(this.tableNode, "lotusBold");
						dojo.addClass(this.tableNode, "lotusInactive");
						this.extraStyles = lconn.highway.util.styling.getInfoBoxStyles("GRAY");
					}
				}
				this.tableNode.style= this.extraStyles + " " + this.spacingStyles;
			},

			_setupRoleList: function(settingDetails) {
				this.roleList={};
				if (settingDetails.values != null) {
					for (roleName in settingDetails.values) {
						this.roleList[roleName]=""; // value doesn't matter
					}
				}
				if (settingDetails.defaultValues != null) {
					for (roleName in settingDetails.defaultValues) {
						this.roleList[roleName]=""; // value doesn't matter - will just overwrite the above => no new role
					}
				}
			},
			
			updateSettingInfo: function(includeRoles) {
				
				this.info.clear();
				this.info.addTextField(this._resourceBundle.helpSettingName, this.settingDetails.name);
				this.info.addTextField(this._resourceBundle.helpSettingTitle, this.settingDetails.title);
				this.info.addTextField(this._resourceBundle.helpSettingDescription, this.settingDetails.description);
				this.info.addBooleanField(this._resourceBundle.helpSettingEditable, this.settingDetails.canModify);
				this.info.addBooleanField(this._resourceBundle.helpSettingAllowRoles, this.settingDetails.allowRoles);
				
				// add the defined roles if provided
				if (includeRoles && this.settingDetails.allowRoles && (this.roleList != null)) {
					var rolesString = "";
					for (roleName in this.roleList) {
						if (roleName == "___default_role___")
							roleName = strings.roleDefaultRoleName;
						if (rolesString.length > 0)
							rolesString+=", ";
						rolesString+=roleName;
					}
					this.info.addTextField(this._resourceBundle.helpSettingDefinedRoles, rolesString);
				}

			},
			
			// private
			_resourceBundle: null
		}
	);


