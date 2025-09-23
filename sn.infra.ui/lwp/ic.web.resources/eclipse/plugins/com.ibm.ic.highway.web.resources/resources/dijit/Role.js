/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/dom-class",
      "dojo/dom-style",
      "dojo/i18n!ic-highway/nls/strings",
      "dojo/text!ic-highway/templates/role.html",
      "dijit/_Container",
      "dijit/_Templated",
      "dijit/_Widget",
      "dojox/html/entities",
      "ic-highway/util/help",
      "ic-highway/util/restAPI/Caller",
      "ic-highway/util/styling",
      "ic-highway/util/validate"
], function(dojo, declare, lang, domClass, domStyle, i18nstrings, template, _Container, _Templated, _Widget, entities, help, RestAPICaller, styling, validate) {

   var Role = declare(
   // widget name and class
   "lconn.highway.dijit.Role", [
         _Widget,
         _Templated
   ],
   // properties and methods
   {
      templateString : template,

      // tableNode : null, -- dojo attach for tableNode
      // roleNode : null, -- dojo attach for roleNode
      // valueNode : null, -- dojo attach for valueNode
      // valueEditNode : null, -- dojo attach for valueEditNode
      // valueEditTextBox : null, -- dojo attach for valueEditTextBox
      // roleEditNode : null, -- dojo attach for roleEditNode
      // roleEditTextBox : null, -- dojo attach for roleEditTextBox
      // editActionNode : null, -- dojo attach for editActionNode
      // deleteRoleActionNode : null, -- dojo attach for deleteRoleActionNode
      // overrideActionNode : null, -- dojo attach for overrideActionNode
      // saveActionNode : null, -- dojo attach for saveActionNode
      // cancelActionNode : null, -- dojo attach for cancelActionNode

      // roleName: null, -- mixed in on construction
      // settingDetails: null, -- mixed in on construction
      // messageContainer: null, -- mixed in on construction
      // editDefault: null, -- mixed in on construction
      spacingStyles : "padding: 0px !important; margin: 0 0 1px 0 !important;",
      displayName : "",
      displayNameClass : "",
      displayDescription : "",
      displayValue : "",
      displayEditActionDescription : "",
      displayValueClass : "",
      showDefault : false,
      isDefaultRole : false,
      editMode : false,
      roleEditMode : false,
      extraStyles : "",

      /**
       * Set the properties of the setting
       */
      constructor : function(object) {
         this._resourceBundle = i18nstrings;

         console.log("Role constr");

         // is this the default role
         if (object.roleName == "___default_role___") {
            this.isDefaultRole = true;
         }

         // Get the role name (if valid) and use the appropriate text for the
         // default role and description
         this.extraStyles = styling.getInfoBoxStylesBorder("GRAY");
         if (object.roleName != null) {

            // set up the mode if this is to be used for a new role submission
            if (object.roleName == "_NEW_ROLE") {
               this.extraStyles = styling.getInfoBoxStylesBorder("BLUE");
               this.roleEditMode = true;
            }
            else if (this.isDefaultRole) {
               this.displayNameClass = "lotusItalic";
               if (object.settingDetails.allowRoles) {
                  this.displayName = this._resourceBundle.roleDefaultRoleName;
                  this.displayDescription = this._resourceBundle.roleDefaultRoleDescription;
                  this.displayEditActionDescription = this._resourceBundle.roleDefaultRoleEditActionDescription;
               }
               else { // shouldn't really get here
                  this.displayName = this._resourceBundle.roleSingleOnlyName;
                  this.displayDescription = this._resourceBundle.roleSingleOnlyDescription;
                  this.displayEditActionDescription = this._resourceBundle.rolesingleOnlyEditActionDescription;
               }
            }
            else {
               this.displayName = object.roleName;
               this.displayDescription = this._resourceBundle.roleDescription;
               this.displayEditActionDescription = this._resourceBundle.roleEditActionDescription;
            }
         }

         // set up the displayValue (i.e. currently active value : specific if
         // supplied, default value otherwise)
         // if the default action is supplied then disable the delete button and
         // change the hover text

         var found = false;
         this.displayValueClass = "lotusInactive lotusItalic";
         if (object.settingDetails.values != null) {
            if (object.settingDetails.values[object.roleName] != null) {
               this.displayValue = object.settingDetails.values[object.roleName].content;
               this.displayValueClass = "lotusBold";
               this.extraStyles = styling.getInfoBoxStylesBorder("BLUE");
               found = true;
            }
         }
         if ((!found) && (object.settingDetails.defaultValues != null)) {
            if (object.settingDetails.defaultValues[object.roleName] != null) {
               this.displayValue = object.settingDetails.defaultValues[object.roleName].content;
               if (object.editDefault) {
                  this.displayValueClass = "lotusBold";
                  this.extraStyles = styling.getInfoBoxStylesBorder("BLUE");
               }
               else {
                  this.showDefault = true;
               }
            }
         }

         console.log("Role constr end");
      },

      postCreate : function() {

         if (this.roleEditMode) {
            this.setMode("EDIT_ROLE");
         }
         else {
            this.setMode("VALUE");
         }

         // prepare for fade in
         domStyle.set(this.domNode, "opacity", "0");
         console.log("post create role");
      },

      startup : function() {
         console.log("fade in role");
         var args = {
            node : this.domNode
         };
         dojo.fadeIn(args).play();
      },

      onCancel : function() {
         if (this.editMode) {
            this.setMode("VALUE");
            this.editMode = !this.editMode;
         }
         else {
            // need to remove the whole item
            this.destroyRecursive();
         }
      },

      onEdit : function() {
         this.setMode("EDIT");
         this.editMode = !this.editMode;
      },

      onDelete : function() {
         var caller = new RestAPICaller(lang.hitch(this, "handleDeleteResponse"));
         caller.postDeletedSetting(this.settingDetails.organisation, this.settingDetails, this.roleName);
      },

      setMode : function(mode) {
         if (mode == "VALUE") {
            domClass.add(this.roleEditNode, "lotusHidden");
            domClass.add(this.valueEditNode, "lotusHidden");
            domClass.remove(this.valueNode, "lotusHidden");
            domClass.add(this.saveActionNode, "lotusHidden");
            domClass.add(this.cancelActionNode, "lotusHidden");

            if (this.settingDetails.canModify) {
               if (this.showDefault) {
                  domClass.remove(this.overrideActionNode, "lotusHidden");
               }
               else {
                  domClass.remove(this.editActionNode, "lotusHidden");
                  if (!(this.editDefault && this.isDefaultRole)) {
                     domClass.remove(this.deleteRoleActionNode, "lotusHidden");
                  }
               }
            }
         }
         else { // mode = EDIT || EDIT_ROLE
            // used only for cancel. Save will regenerate from the returned
            // value from POST
            domClass.add(this.valueNode, "lotusHidden");
            domClass.remove(this.valueEditNode, "lotusHidden");
            domClass.remove(this.saveActionNode, "lotusHidden");
            domClass.remove(this.cancelActionNode, "lotusHidden");

            domClass.add(this.editActionNode, "lotusHidden");
            domClass.add(this.deleteRoleActionNode, "lotusHidden");
            domClass.add(this.overrideActionNode, "lotusHidden");

            if (mode == "EDIT_ROLE") {
               domClass.remove(this.roleEditNode, "lotusHidden");
            }
         }
      },

      onSave : function() {
         var newValue = this.valueEditTextBox.value;
         if (this.roleEditMode) {
            this.roleName = this.roleEditTextBox.value;
         }
         var validationResult = validate.ValidateValue(this.settingDetails, newValue);
         if (!validationResult.success) {
            this.messageContainer.createMessage(validationResult.message, "ERROR", true);
         }
         else {
            var caller = new RestAPICaller(lang.hitch(this, "handlePostResponse"));
            caller.postSetting(this.settingDetails.organisation, this.settingDetails, this.roleName, newValue);
         }
      },

      handlePostResponse : function(success, message, json) {
         console.log('handlePostResponse called');
         if (!success) {
            this.messageContainer.createMessage(message, "ERROR", true);
            console.error("API Error: %o", message);
         }
         else {
            if ((json.settings != null) && (json.settings.length > 0)) {
               this._updateSettingValue(json.settings[0]);
               this.setMode("VALUE");
            }
         }
      },

      handleDeleteResponse : function(success, message, json) {
         console.log('handlePostResponse called');
         if (!success) {
            this.messageContainer.createMessage(message, "ERROR", true);
            console.error("API Error: %o", message);
         }
         else {
            this.destroy();
         }
      },

      onSettingFocus : function() {
         help.updateSettingHelp(this.settingDetails, null);
      },

      _updateSettingValue : function(setting) {

         if ((setting == null) || (setting.name != this.settingDetails.name)) {
            this.messageContainer.createMessage(this._resourceBundle.msgContentUnexpected, "ERROR", true);
            return;
         }

         // update the role name
         this.roleNode.innerHTML = entities.encode(this.roleName); // although
                                                                     // there
                                                                     // should
                                                                     // be no
                                                                     // issues
                                                                     // with
                                                                     // escaping

         // read from the return rather than just storing what we've sent.
         if ((setting.values != null) && (setting.values[this.roleName] != null)) {
            // generally the case
            this.valueNode.innerHTML = entities.encode(setting.values[this.roleName].content);
            domClass.add(this.tableNode, "lotusBold");
            domClass.remove(this.tableNode, "lotusInactive");
            domClass.remove(this.tableNode, "lotusItalic");
            this.extraStyles = styling.getInfoBoxStylesBorder("BLUE");
         }
         else if ((setting.defaultValues != null) && (setting.defaultValues[this.roleName] != null)) {
            // used only if creating initial defaults
            this.valueNode.innerHtml = entities.encode(setting.defaultValues[this.roleName].content);
            if (!this.editDefault) {
               domClass.remove(this.tableNode, "lotusBold");
               domClass.add(this.tableNode, "lotusInactive");
               domClass.add(this.tableNode, "lotusItalic");
               this.extraStyles = styling.getInfoBoxStylesBorder("GRAY");
            }
         }
         this.tableNode.style = this.extraStyles + " " + this.spacingStyles;
      },

      // private
      _resourceBundle : null
   });

   return Role;
});
