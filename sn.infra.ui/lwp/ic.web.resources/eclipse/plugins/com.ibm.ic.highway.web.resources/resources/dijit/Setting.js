/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/dom-class",
      "dojo/_base/declare",
      "dojo/dom-style",
      "dojo/i18n!ic-highway/nls/strings",
      "dojo/_base/lang",
      "dojo/_base/array",
      "dojo/text!ic-highway/templates/setting.html",
      "dijit/_Container",
      "dijit/_Templated",
      "dijit/_Widget",
      "dojox/html/entities",
      "ic-highway/dijit/MessageContainer",
      "ic-highway/dijit/Role",
      "ic-highway/util/help",
      "ic-highway/util/restAPI/Caller",
      "ic-highway/util/styling",
      "ic-highway/util/validate"
],
   function(dojo, domClass, declare, domStyle, i18nstrings, lang, array, template, _Container, _Templated, _Widget, entities, MessageContainer, Role, help, RestAPICaller, styling, validate) {

      var Setting = declare(
      // widget name and class
      "lconn.highway.dijit.Setting", [
            _Widget,
            _Templated,
            _Container
      ],
      // properties and methods
      {
         templateString : template,

         // messageContainerNode : null -- dojo attach for the message container
         // titleNode : null, -- dojo attach for the titleNode
         // valueNode : null, -- dojo attach for valueNode
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
         spacingStyles : "padding: 0px !important; margin: 5px 0 1px 0 !important;",
         displayValue : "",
         displayDescription : "",
         displayValueClass : "",
         messageContainer : null,
         highlightText : false,
         rolesExpanded : false,
         roleList : null,
         extraStyles : "",

         /**
          * Set the properties of the setting
          */
         constructor : function(object) {
            this._resourceBundle = i18nstrings;

            console.log("Setting constr");

            // set up the description
            if (object.settingDetails.description != null) {
               this.displayDescription = object.settingDetails.description;
            }

            // set up the displayValue (currently active value) and the complete
            // role list
            // set up the total role list
            this.setupActiveDisplayValue(object.settingDetails, object.editDefault);
            this._setupRoleList(object.settingDetails);
            console.log("Setting constr end");
         },

         postCreate : function() {
            console.log("post create setting");

            // set up the message container in case we need it
            this.messageContainer = new MessageContainer({
               small : true
            }, this.messageContainerNode);
            this.setMode("VALUE");

            // prepare for fade in
            domStyle.set(this.domNode, "opacity", "0");
         },

         startup : function() {
            // used where there is no explicit fade in
            this.fadeIn();
         },

         fadeIn : function() {
            console.log("fade in setting");
            var args = {
               node : this.domNode
            };
            dojo.fadeIn(args).play();
         },

         fadeOut : function() {
            console.log("fade out setting");
            var args = {
               node : this.domNode
            };
            dojo.fadeOut(args).play();
         },

         setMode : function(mode) {
            if (mode == "VALUE") {

               if (this.settingDetails.allowRoles) { // use the roles to edit,
                                                      // edit not available from
                                                      // the main item if there
                                                      // are roles
                  domClass.remove(this.rolesActionNode, "lotusHidden");
               }
               else if (this.settingDetails.canModify) {
                  if (!this.highlightText) {
                     domClass.remove(this.overrideActionNode, "lotusHidden");
                  }
                  else {
                     domClass.remove(this.editActionNode, "lotusHidden");
                     if (!this.editDefault) {
                        domClass.remove(this.deleteActionNode, "lotusHidden");
                     }
                  }
               }

               domClass.add(this.valueEditNode, "lotusHidden");
               domClass.remove(this.valueNode, "lotusHidden");
               domClass.add(this.saveActionNode, "lotusHidden");
               domClass.add(this.cancelActionNode, "lotusHidden");

            }
            else { // mode = EDIT
               // used only for cancel. Save will regenerate from the returned
               // value from POST
               domClass.add(this.valueNode, "lotusHidden");
               domClass.remove(this.valueEditNode, "lotusHidden");
               domClass.remove(this.saveActionNode, "lotusHidden");
               domClass.remove(this.cancelActionNode, "lotusHidden");

               domClass.add(this.editActionNode, "lotusHidden");
               domClass.add(this.deleteActionNode, "lotusHidden");
               domClass.add(this.overrideActionNode, "lotusHidden");
            }
         },

         onCancel : function() {
            this.setMode("VALUE");
         },

         onEdit : function() {
            this.setMode("EDIT");
         },

         onDelete : function() {
            var caller = new RestAPICaller(lang.hitch(this, "handlePostResponse"));
            caller.postDeletedSetting(this.settingDetails.organisation, this.settingDetails, "___default_role___");
         },

         onSave : function() {
            var newValue = this.valueEditTextBox.value;
            var validationResult = validate.ValidateValue(this.settingDetails, newValue);
            if (!validationResult.success) {
               this.messageContainer.createMessage(validationResult.message, "ERROR", true);
            }
            else {
               var caller = new RestAPICaller(lang.hitch(this, "handlePostResponse"));
               caller.postSetting(this.settingDetails.organisation, this.settingDetails, "___default_role___", newValue);
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
               else {
                  // success but empty setting => delete the value
                  this.destroy();
               }
            }
         },

         onAddRole : function() {
            var newRole = new Role({
               roleName : "_NEW_ROLE",
               settingDetails : this.settingDetails,
               messageContainer : this.messageContainer,
               editDefault : this.editDefault
            });
            this.addChild(newRole);
            newRole.startup();
         },

         onSettingFocus : function() {
            help.updateSettingHelp(this.settingDetails, this.roleList);
         },

         toggleRoles : function() {

            if (!this.settingDetails.allowRoles) {
               return;
            }
            if (this.rolesExpanded) {
               this.removeRoles();
               domClass.add(this.addRoleActionNode, "lotusHidden");
            }
            else {
               this.addRoles();
               domClass.remove(this.addRoleActionNode, "lotusHidden");
            }
            this.rolesExpanded = !this.rolesExpanded;
         },

         addRoles : function() {

            // now add entries for all of the roles found
            for (foundRoleName in this.roleList) {
               var newRole = new Role({
                  roleName : foundRoleName,
                  settingDetails : this.settingDetails,
                  messageContainer : this.messageContainer,
                  editDefault : this.editDefault
               });
               this.addChild(newRole);
               newRole.startup();
            }

         },

         removeRoles : function() {
            // Destroy all children dijits
            array.forEach(dijit.findWidgets(this.containerNode), function(widget) {
               widget.destroyRecursive();
            });
         },

         setupActiveDisplayValue : function(settingDetails, editDefault) {
            var found = false;
            var highlightBackground = false;
            var highlightText = false

            // default to not found . . .
            this.highlightText = false;
            // this.displayValueClass = "lotusInactive lotusItalic";
            this.displayValueClass = "";
            this.extraStyles = styling.getInfoBoxStyles("GRAY"); // default

            if (settingDetails.values != null) {
               // if we have a value for the default role we will display it
               // fully in bold and with a blue background
               if (settingDetails.values.___default_role___ != null) {
                  this.displayValue = settingDetails.values.___default_role___.content;
                  this.displayValueClass = "lotusBold";
                  this.extraStyles = styling.getInfoBoxStyles("BLUE");
                  this.highlightText = true;
                  found = true;
               }
               // if there is any value at all defined we highlight the blue
               // background (but the text will still be inactive)
               if (!found) {
                  for (value in settingDetails.values) { // Object.keys is IE9
                                                         // only
                     this.extraStyles = styling.getInfoBoxStyles("BLUE");
                     break; // only need 1
                  }
               }
            }

            // if we just have a default we display it inactive
            if ((!found) && (settingDetails.defaultValues != null)) { // should
                                                                        // never
                                                                        // be
                                                                        // null
               if (settingDetails.defaultValues.___default_role___ != null) { // should
                                                                              // never
                                                                              // be
                                                                              // null
                  this.displayValue = settingDetails.defaultValues.___default_role___.content;
                  if (editDefault) {
                     this.displayValueClass = "lotusBold";
                     this.extraStyles = styling.getInfoBoxStyles("BLUE");
                     this.highlightText = true;
                  }
               }
            }

         },

         _updateSettingValue : function(setting) {

            if ((setting == null) || (setting.name != this.settingDetails.name)) {
               this.messageContainer.createMessage(this._resourceBundle.msgContentUnexpected, "ERROR", true);
               return;
            }

            // read from the return rather than just storing what we've sent.
            if ((setting.values != null) && (setting.values.___default_role___ != null)) {
               // generally the case
               this.valueNode.innerHtml = entities.encode(setting.values.___default_role___.content);
               domClass.add(this.tableNode, "lotusBold");
               domClass.remove(this.tableNode, "lotusInactive");
               domClass.remove(this.tableNode, "lotusItalic");
               this.extraStyles = styling.getInfoBoxStyles("BLUE");
            }
            else if ((setting.defaultValues != null) && (setting.defaultValues.___default_role___ != null)) {
               // used only if creating initial defaults or after delete
               this.valueNode.innerHtml = entities.encode(setting.defaultValues.___default_role___.content);
               if (!this.editDefault) {
                  domClass.remove(this.tableNode, "lotusBold");
                  domClass.add(this.tableNode, "lotusInactive");
                  domClass.add(this.tableNode, "lotusItalic");
                  this.extraStyles = styling.getInfoBoxStyles("GRAY");
               }
            }
            this.tableNode.style = this.extraStyles + " " + this.spacingStyles;
         },

         _setupRoleList : function(settingDetails) {
            this.roleList = {};
            if (settingDetails.values != null) {
               for (roleName in settingDetails.values) {
                  this.roleList[roleName] = ""; // value doesn't matter
               }
            }
            if (settingDetails.defaultValues != null) {
               for (roleName in settingDetails.defaultValues) {
                  this.roleList[roleName] = ""; // value doesn't matter - will
                                                // just overwrite the above =>
                                                // no new role
               }
            }
         },

         // private
         _resourceBundle : null
      });

      return Setting;
   });
