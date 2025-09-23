/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/dom-class",
      "dojo/i18n!ic-highway/nls/strings",
      "dijit/_Widget",
      "dijit/_Templated",
      "dijit/_Container",
      "dojox/html/entities",
      "ic-highway/dijit/Setting",
      "ic-highway/dijit/SettingDefDlg",
      "ic-highway/util/restAPI/Caller",
      "ic-highway/util/styling"
], function(dojo, declare, lang, domClass, i18nstrings, _Widget, _Templated, _Container, entities, Setting, SettingDefDlg, RestAPICaller, styling) {

   /**
    * This is a simplification of Setting, that forces a light box on edit, but
    * has no mode changes and only a single button
    * 
    * @author Bill Looby
    */
   var SettingDef = declare(
   // widget name and class
   "lconn.highway.dijit.SettingDef", Setting,
   // properties and methods
   {
      // templatePath: dojo.moduleUrl("lconn.highway",
      // "templates/setting.html"), -- inherited - just for reference here

      /**
       * Set the properties of the settingDefinition - replaces the Setting
       * constructor
       */
      constructor : function(settingObject) {
         this._resourceBundle = i18nstrings;
         this.settingDetails = settingObject;

         console.log("SettingDefinition constr");

         // set up the description & value
         if ((this.settingDetails.defaultValues != null) && (this.settingDetails.defaultValues.___default_role___ != null)) { // should
                                                                                                                              // never
                                                                                                                              // be
                                                                                                                              // null
            this.displayValue = this.settingDetails.defaultValues.___default_role___.content;
         }
         if (this.settingDetails.description != null) {
            this.displayDescription = this.settingDetails.description;
         }

         console.log("SettingDefinition constr end");
      },

      setMode : function(mode) {
         // one button and no modes
         domClass.remove(this.editActionNode, "lotusHidden");
         domClass.remove(this.deleteActionNode, "lotusHidden");
      },

      onEdit : function() {

         if (this.settingDetails.validation != null) {
            var validationType = this.settingDetails.validation.type;
            var validationDetails = this.settingDetails.validation.details;
         }
         else {
            var validationType = "";
            var validationDetails = "";
         }

         new SettingDefDlg({
            newSetting : false,
            settingId : this.settingDetails.id,
            settingName : this.settingDetails.name,
            settingTitle : this.settingDetails.title,
            settingCategory : this.settingDetails.category,
            settingDescription : this.settingDetails.description,
            settingCanModify : this.settingDetails.canModify,
            settingAllowRoles : this.settingDetails.allowRoles,
            settingValidationType : validationType,
            settingValidationDetails : validationDetails,
            settingDefaultValue : this.displayValue
         }).show();
      },

      onDelete : function() {
         var caller = new RestAPICaller(lang.hitch(this, "handlePostResponse"));
         caller.postDeletedDefinition(this.settingDetails);
      },

      toggleRoles : function() {
         ; // just want to intercept this as it doesn't apply
      },

      setupActiveDisplayValue : function(settingDetails, editDefault) {
         this.extraStyles = styling.getInfoBoxStyles("PURPLE");
         if (settingDetails.defaultValues != null) {
            // if we have a value for the default role we will display it fully
            // in bold
            if (settingDetails.defaultValues.___default_role___ != null) {
               this.displayValue = settingDetails.defaultValues.___default_role___.content;
               this.displayValueClass = "lotusBold";
            }
         }
      },

      _updateSettingValue : function(setting) {

         if ((setting == null) || (setting.name != this.settingDetails.name)) {
            this.messageContainer.createMessage(this._resourceBundle.msgContentUnexpected, "ERROR", true);
            return;
         }

         // read from the return rather than just storing what we've sent.
         if ((setting.defaultValues != null) && (setting.defaultValues.___default_role___ != null)) {
            this.valueNode.innerHtml = entities.encode(dojo.setting.defaultValues.___default_role___.content);
         }

      },

   });

   return SettingDef;
});
