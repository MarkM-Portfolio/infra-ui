/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/cookie",
      "dojo/i18n!ic-core/nls/strings",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/i18n!ic-highway/nls/strings",
      "dojo/parser",
      "ic-highway/util/help",
      "ic-highway/dijit/Section",
      "ic-highway/dijit/Panel",
      "ic-highway/SettingsLoader",
      "ic-highway/dijit/Setting",
      "ic-highway/dijit/SettingDef",
      "ic-highway/dijit/SettingDefDlg",
      "ic-highway/dijit/SettingDefDlgRow",
      "ic-highway/util/load"
],
   function(dojo, cookie, i18nstrings, declare, lang, i18nstrings, parser, help, Section, Panel, SettingsLoader, Setting, SettingDef, SettingDefDlg, SettingDefDlgRow, load) {

      var app = declare("lconn.highway.app", null, {
         // The context root and Get URL
         contextRootPath : lang.getObject("lconn.highway.global.contextRoot"),
         settingsAPIPath : lang.getObject("lconn.highway.global.contextRoot") + "/rest"

      });
      return app;
   });
