/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/dom-class",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/_base/window",
      "dojo/i18n!ic-highway/nls/strings",
      "dojo/json",
      "dojo/text!ic-highway/templates/settingDefDlg.html",
      "dojo/topic",
      "dijit/Dialog",
      "dijit/_Container",
      "dijit/_Templated",
      "dijit/_Widget",
      "ic-highway/dijit/MessageContainer",
      "ic-highway/dijit/SettingDefDlgRow",
      "ic-highway/util/restAPI/Caller"
],
   function(dojo, domClass, declare, lang, windowModule, i18nstrings, JSON, template, topic, Dialog, _Container, _Templated, _Widget, MessageContainer, SettingDefDlgRow, restAPI) {

      var SettingDefDlg = declare("lconn.highway.dijit.SettingDefDlg", [
            _Widget,
            _Templated,
            _Container
      ],

      // properties and methods
      {
         _dlg : null,
         dialogData : null,
         blankIcon : null,

         createButtonClass : "lotusHidden",
         saveButtonClass : "lotusHidden",

         allRows : {},

         // Dojo Attach points
         // messageContainerNode: null,
         // dialogTitleNode: null,

         // These are automatically mixed in as they are passed to the
         // constructor
         // settingId: null,
         // settingName: null,
         // settingTitle: null,
         // settingCategory: null,
         // settingDescription: null,
         // settingCanModify: null,
         // settingAllowRoles: null,
         // settingValidationType: null,
         // settingValidationDetails: null,

         _resourceBundle : null,

         templateString : template,

         constructor : function(settingObject) {
            this._resourceBundle = i18nstrings;
            // a null name means we must be creating
            if (settingObject.newSetting) {
               this.createButtonClass = "lotusBtn";
            }
            else {
               this.saveButtonClass = "lotusBtn";
            }
         },

         postCreate : function() {
            this.blankIcon = (dojo.config.blankGif || require.toUrl("dojo/resources/blank.gif"));
            this._dlg = new Dialog({
               duration : 1
            });

            // set up the message container (small messages)
            this.messageContainer = new MessageContainer({
               small : true
            }, this.messageContainerNode);

            // Hide the dialog button supplied by the Dijit dialog as we supply
            // our own.
            domClass.add(this._dlg.closeButtonNode, "lotusHidden");
            this._dlg.hideA11y = function(evt) {
               if (evt.keyCode == dojo.keys.ENTER || evt.keyCode == dojo.keys.ESCAPE) {
                  topic.publish(lconn.homepage.events.popup.DESTROY, this, "destroy");
               }
            };

            // dojo validation details need conversion to a string . . . and
            // then unescaping
            var validationDetails = JSON.stringify(this.settingValidationDetails);
            if ((validationDetails != null) && (validationDetails.length > 2)) {
               validationDetails = validationDetails.substring(1, validationDetails.length - 1); // remove
                                                                                                   // enclosing
                                                                                                   // quotes
               validationDetails = validationDetails.replace(/\\\"/g, "\"");
            }

            // Add the rows
            this.addRow("name", this.settingName);
            this.addRow("title", this.settingTitle);
            this.addRow("category", this.settingCategory);
            this.addRow("description", this.settingDescription);
            this.addRow("canModify", this.settingCanModify, "boolean");
            this.addRow("allowRoles", this.settingAllowRoles, "boolean");
            this.addRow("validationType", this.settingValidationType, "type");
            this.addRow("validationDetails", validationDetails);
            this.addRow("defaultValue", this.settingDefaultValue);

         },

         show : function() {
            var titleText = windowModule.doc.createTextNode(this._resourceBundle.settingDefinitionDialogTitle);
            this.dialogTitleNode.appendChild(titleText);
            this._dlg.set('content', this.domNode);
            this._dlg.show();
         },

         position : function() {
            this._dlg.resize();
         },

         addRow : function(name, value, type, options) {
            if ((value == 'undefined') || (value == null))
               value = "";
            var theRow = new SettingDefDlgRow({
               rowName : name,
               rowTitle : this._resourceBundle["SettingDefinitionDialogRowTitle_" + name],
               rowDescription : this._resourceBundle["SettingDefinitionDialogRowDescription_" + name],
               rowValue : value,
               rowType : type,
               rowOptions : options
            });
            this.addChild(theRow);
            this.allRows[name] = theRow;
         },

         closeDialog : function() {
            console.log("closing Dialog");
            this._dlg.destroy();
         },

         createDefinition : function() {
            this.saveDefinition();
         },

         saveDefinition : function() {
            console.log("creatingDefiniton");
            var setting = this._createSettingDefinition();
            var caller = new RestAPICaller(lang.hitch(this, "handlePostResponse"));
            caller.postDefinition(setting, this.allRows.defaultValue.getValue());
         },

         handlePostResponse : function(success, message, json) {
            console.log('handlePostResponse called');
            if (!success) {
               this.messageContainer.createMessage(message, "ERROR", true);
               console.error("Fetch feed error: %o", message);
            }
            else {
               this._dlg.destroy();
               this._updateDefinition(json);
            }
         },

         _updateDefinition : function(json) {
            window.location.reload(true); // I know it sucks, but will do for
                                          // now
            // TODO : Handle category changes etc. and recreate the setting in
            // the same node otherwise (so order is maintained)
         },

         _createSettingDefinition : function() {
            var setting = {
               id : this.settingId,
               name : this.allRows.name.getValue(),
               title : this.allRows.title.getValue(),
               category : this.allRows.category.getValue(),
               description : this.allRows.description.getValue(),
               canModify : this.allRows.canModify.getValue(),
               allowRoles : this.allRows.allowRoles.getValue(),
               validation : {}
            };
            setting.validation.type = this.allRows.validationType.getValue();
            setting.validation.details = this.allRows.validationDetails.getValue();
            return setting;
         }

      });

      return SettingDefDlg;
   });
