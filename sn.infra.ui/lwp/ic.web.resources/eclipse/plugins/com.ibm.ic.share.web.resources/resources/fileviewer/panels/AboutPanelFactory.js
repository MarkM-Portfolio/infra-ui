/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./AboutPanel",
  "dojo/Stateful",
  "./AboutWidget",
  "dojo/_base/lang",
  "dojo/when",
  "dojo/i18n!../nls/FileViewerStrings",
  "./Panel"
], function (declare, AboutPanel, Stateful, AboutWidget, lang, when, i18n, Panel) {
  "use strict";

  return declare([ Stateful ], {
    id: "about",
    urlParameterId: "about",

    constructor: function () {
      this.title = i18n.PANEL.ABOUT.TITLE;
    },

    _panelGetter: function () {
      return new Panel({factory: this});
    },
    
    renderContent: function (panel) {
      var aboutPanel = new AboutPanel({
        file: this.file,
        entryConstructor: AboutWidget,
        factory: this
      });
      aboutPanel.placeAt(panel.content);
    }
  });
});
