/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/dom-class",
      "dojo/i18n!ic-highway/nls/strings",
      "dojo/text!ic-highway/templates/section.html",
      "dijit/_Container",
      "dijit/_Templated",
      "dijit/_Widget",
      "ic-highway/dijit/Setting",
      "ic-highway/dijit/SettingDef"
], function(dojo, declare, domClass, i18nstrings, template, _Container, _Templated, _Widget, Setting, SettingDef) {

   var Section = declare(
   // widget name and class
   "lconn.highway.dijit.Section", [
         _Widget,
         _Templated,
         _Container
   ],

   // properties and methods
   {
      templateString : template,
      blankIcon : null,

      // containerNode: null, - dojo attach point
      // settingsNode: null, - dojo attach point
      // arrowNode: null, - dojo attach point

      // - mixed in on construction
      // organisation: "",
      // sectionName: "",
      // sectionExpanded: "",
      // sectionSettings: "",
      // editDefinitions: false,
      // editDefault: false,

      sectionName : "Section", // placeholder
      sectionTitle : "Section", // placeholder
      sectionExpanded : false,

      /**
       * Set the properties of the panel
       */
      constructor : function(object) {

         console.log("Section constr in");

         this._resourceBundle = i18nstrings;
         this.blankIcon = (dojo.config.blankGif || require.toUrl("dojo/resources/blank.gif"));
         this.sectionTitle = this._resourceBundle["category_" + object.sectionName];
         if (this.sectionTitle == null) {
            this.sectionTitle = "?" + this.category + "?";
         }

         console.log("Section constr out");
      },

      postCreate : function() {

         console.log("Section postCreate");

         for (var i = 0, len = this.sectionSettings.length; i < len; i++) {

            // TODO : this is currently needed, but shouldn't be !
            var settingDetails = {
               id : this.sectionSettings[i].id,
               name : this.sectionSettings[i].name,
               title : this.sectionSettings[i].title,
               category : this.sectionSettings[i].category,
               description : this.sectionSettings[i].description,
               canModify : this.sectionSettings[i].canModify,
               allowRoles : this.sectionSettings[i].allowRoles,
               validation : this.sectionSettings[i].validation,
               values : this.sectionSettings[i].values,
               defaultValues : this.sectionSettings[i].defaultValues
            };

            // var settingDetails = this.sectionSettings[i];
            settingDetails.organisation = this.organisation; // shoe-horn it
                                                               // in here for
                                                               // further
                                                               // reference
            if (this.editDefinitions) {
               this.addChild(new SettingDef({
                  settingDetails : settingDetails,
                  editDefault : false
               }));
            }
            else {
               this.addChild(new Setting({
                  settingDetails : settingDetails,
                  editDefault : this.editDefault
               }));
            }
         }

      },

      startup : function() {
         // sectionExpanded hasn't actually happened yet - so we set to
         // unexpanded and toggle
         // easier than having conditionals in the template
         // Needs to be in startup so that the animations can take effect
         if (this.sectionExpanded) {
            this.sectionExpanded = false; // as toggle will switch it back
            this.toggle();
         }
      },

      fade : function(fadeIn) {
         var children = this.getChildren();
         for (var i = 0, len = children.length; i < len; i++) {
            if (fadeIn) {
               children[i].fadeIn();
            }
            else {
               children[i].fadeOut();
            }
         }
      },

      toggle : function() {
         if (this.sectionExpanded) {
            this.fade(false);
            domClass.add(this.settingsNode, "lotusHidden");
            domClass.remove(this.arrowNode, "lotusTwistyOpen");
            domClass.add(this.arrowNode, "lotusTwistyClosed");
         }
         else {
            domClass.remove(this.settingsNode, "lotusHidden");
            domClass.remove(this.arrowNode, "lotusTwistyClosed");
            domClass.add(this.arrowNode, "lotusTwistyOpen");
            this.fade(true);
         }
         ;
         this.sectionExpanded = !this.sectionExpanded;
      },

      // private
      _resourceBundle : null
   });

   return Section;
});
