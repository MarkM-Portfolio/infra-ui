/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/i18n!ic-highway/nls/strings",
      "dojo/text!ic-highway/templates/panel.html",
      "dijit/_Widget",
      "ic-highway/dijit/Section",
      "ic-highway/dijit/Setting",
      "ic-highway/dijit/SettingDefDlg",
      "ic-highway/util/help"
], function(dojo, declare, i18nstrings, template, _Widget, Section, Setting, SettingDefDlg, help) {

   var Panel = declare("lconn.highway.dijit.Panel", [
         _Widget,
         dijit._Templated,
         dijit._Container
   ],

   // properties and methods
   {
      templateString : template,
      configTitle : "Config Title", // placeholder
      configDesc : "Config Description", // placeholder
      createButtonClass : "lotusHidden", // by default

      categories : null,

      // - mixed in on construction
      // organisation: "",
      // panelTitle: "",
      // panelDescription: "",
      // panelSettings: null,
      // editDefinitions: false,
      // editDefaults: false,

      /**
       * Set the properties of the panel
       */
      constructor : function(object) {

         console.log("Panel in");

         this._resourceBundle = i18nstrings;
         this.configTitle = this._resourceBundle[object.panelTitle];
         this.configDescription = this._resourceBundle[object.panelDescription];
         if (object.editDefinitions) {
            this.createButtonClass = ""; // not hidden
         }
         this.setupCategories(object.panelSettings);
      },

      postCreate : function() {

         // for all categories, create a section and pass it the settings to be
         // shown in that section
         var firstUp = true;
         help.resetSettingsHelp();
         for (categoryName in this.categories) {
            var section = new Section({
               organisation : this.organisation,
               sectionName : categoryName,
               sectionSettings : this.categories[categoryName],
               sectionExpanded : firstUp,
               editDefinitions : this.editDefinitions,
               editDefault : this.editDefaults
            });
            firstUp = false;
            this.addChild(section);
         }
      },

      onNewSetting : function() {
         new SettingDefDlg({
            newSetting : true,
            settingId : "",
            settingName : "new.setting",
            settingTitle : "New Setting",
            settingCategory : "general",
            settingDescription : "Description of new setting",
            settingCanModify : true,
            settingAllowRoles : false,
            settingValidationType : "",
            settingValidationDetails : "",
            settingDefaultValue : "default"
         }).show();
      },

      /**
       * Pass in the list of settings as received
       */
      setupCategories : function(settings) {

         // go through all settings and generate the categories
         // The general category is always present and always first
         this.categories = {
            "general" : []
         };

         // error condition really - but at least we can be clean
         if (settings == null)
            return;

         // pass the category to the section Widget
         for (var i = 0, len = settings.length; i < len; i++) {
            this.addSettingToCategory(settings[i]);
         }

      },

      /**
       * Find a category name in a set of categories (actually a javascript
       * object where each category is a property) and add the passed setting to
       * it
       */
      addSettingToCategory : function(setting) {

         var categoryName = setting.category;
         if (categoryName == null) {
            categoryName = "Other";
         }

         // get the category property - if it doesn't exist then create it
         var category = this.categories[categoryName];
         if (category == null) {
            category = new Array();
            this.categories[categoryName] = category;
         }

         // and finally add the setting
         category.push(setting);
      },

      updateView : function() {
         ;
      },

      // private
      _resourceBundle : null
   });

   return Panel;
});
