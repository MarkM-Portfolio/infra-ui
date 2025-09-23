/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/dom",
      "dojo/_base/lang",
      "../SettingsLoader"
], function(dojo, dom, lang, SettingsLoader) {

   var load = lang.getObject("lconn.highway.util.load", true);

   lang.setObject("loadSettings", function(editDefinitions, editDefaults) {

      var definitions = editDefinitions;
      var defaults = editDefaults;
      function registerSettingsLoaderHandler() {
         contentArea = dom.byId("configSettings");

         if (lconn.highway.app == undefined) {
            console.log("No app");
         }

         if (SettingsLoader == undefined) {
            console.log("No loader");
         }

         var panelTitle = "configTitleSettings";
         var panelDescription = "configDescSettings";
         if (editDefinitions) {
            panelTitle = "configTitleDefinitions";
            panelDescription = "configDescDefinitions";
         }
         else if (editDefaults) {
            panelTitle = "configTitleDefaults";
            panelDescription = "configDescDefaults";
         }

         var loader = new SettingsLoader({
            panelTitle : panelTitle,
            panelDescription : panelDescription,
            editDefinitions : editDefinitions,
            editDefaults : editDefaults
         });

         loader.loadPage();
      }

      require([ "dojo/domReady!"
      ], registerSettingsLoaderHandler);
   }, load);
   return load;
});
