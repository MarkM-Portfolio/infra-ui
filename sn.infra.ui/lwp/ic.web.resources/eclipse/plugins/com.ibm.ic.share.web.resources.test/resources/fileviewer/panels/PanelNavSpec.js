/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/panels/PanelNav",
  "dojo/Stateful",
  "dojo/_base/lang",
  "../MockFileBean",
  "dojo/_base/declare",
  "ic-share/fileviewer/config/globals",
  "dijit/_WidgetBase",
  "dojo/dom-construct"
], function (PanelNav, Stateful, lang, MockFileBean, declare, globals, WidgetBase, domConstruct) {
  "use strict";
  describe("PanelNav", function () {
    beforeEach(function () {
      this.mockFile = MockFileBean;
      
      this.mockFactory = new Stateful({
        titleWithCount: "test title"
      });

      globals.MentionsDataFormatter = function () { return; };
      globals.TextBoxWidget = declare([WidgetBase], {
        addMentionsCallback: function () { return; },
        _mentionsHelper: {},
        textAreaNode: document.createDocumentFragment()
      });
    });

    it("should create an instance of the PanelNav", function () {
      var panelNav = new PanelNav({
        file: this.mockFile,
        container: domConstruct.create("div")
      });
      
      expect(panelNav).toBeDefined();
    });
    
    it("should select a different panel", function () {
      var panelNav = new PanelNav({
        file: this.mockFile,
        container: domConstruct.create("div")
      }),
        navItem = {
          itemId: "about",
          getPanel: function () {
            return {
              domNode: domConstruct.create("div")
            }
          },
          domNode: domConstruct.create("div")
      };

      panelNav.selectPanel(navItem);
      expect(panelNav._selected.itemId).toEqual(navItem.itemId);
    });
  });
});
