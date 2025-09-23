/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/dom",
      "./dijit/MessageContainer",
      "./dijit/Panel",
      "./util/help",
      "./util/restAPI/Caller"
], function(declare, lang, dom, MessageContainer, Panel, help, restAPI) {

   /**
    * Panel for settings
    */

   var SettingsLoader = declare("lconn.highway.SettingsLoader", null, {
      // The context root and Get URL
      contextRootPath : lang.getObject("lconn.highway.global.contextRoot"),
      settingsAPIPath : lang.getObject("lconn.highway.global.contextRoot") + '/rest',

      CURRENT_ORGANIZATION : "00000000-0000-0000-0000-000000000001", // TODO :
      // read
      // this

      // these are mixed in on construction
      // panelTitle: "configTitleSettings",
      // panelDescription: "configDescSettings",
      // editDefinitions: false,
      // editDefaults: false

      constructor : function(object) {
         console.log('SettingsLoader constructor called');
         console.log(object);
         lang.mixin(this, object);
      },

      loadPage : function() {
         console.log('loadPage called');
         var caller = new RestAPICaller(lang.hitch(this, "handleSettingsResponse"));
         if (this.editDefinitions) {
            caller.getDefinitions();
         }
         else if (this.editDefaults) {
            caller.getDefaults();
         }
         else {
            caller.getSettings(this.CURRENT_ORGANIZATION); // TODO specify real
            // organisation id
         }
      },

      /**
       * Pass in an organisation id (or null)
       */
      addError : function(text) {
         var container = new MessageContainer({}, dom.byId("messageContainer"));
         container.createMessage(text, "ERROR", false);
      },

      /**
       * Pass in the list of settings as received
       */
      renderSettings : function(org, settings) {
         // update the help
         help.resetSettingsHelp();

         // create a panel at the configPanel element and pass it the categories
         // of settings
         var panel = new Panel({
            organisation : org,
            panelTitle : this.panelTitle,
            panelDescription : this.panelDescription,
            panelSettings : settings,
            editDefinitions : this.editDefinitions,
            editDefaults : this.editDefaults
         }, dom.byId("configPanel"));
         panel.startup();

      },

      /**
       * The handle function for XHR call
       * 
       * @param json{Json}
       *           return data from the xhr call
       * @param ioArgs{Object}
       *           pass the xhr parameters
       */
      handleSettingsResponse : function(success, message, json) {
         console.log('handleSettingsResponse called');
         if (success) {
            this.renderSettings(json.organisation, json.settings);
         }
         else {
            this.addError(message);
         }
      }

   });

   return SettingsLoader;
});
