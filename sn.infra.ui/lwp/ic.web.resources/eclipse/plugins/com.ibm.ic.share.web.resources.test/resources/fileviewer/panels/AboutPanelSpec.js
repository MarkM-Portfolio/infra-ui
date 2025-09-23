/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/panels/AboutPanel",
  "dojo/Stateful",
  "dojo/_base/lang",
  "../MockFileBean",
  "ic-share/fileviewer/panels/AboutWidget",
  "dojo/_base/declare",
  "dijit/_WidgetBase"
], function (AboutPanel, Stateful, lang, MockFileBean, AboutWidget, declare, WidgetBase) {
  "use strict";

  describe("AboutPanel::constructor()", function () {
    beforeEach(function () {
      this.mockFile = MockFileBean;
      
      this.mockFactory = new Stateful({
        titleWithCount: "test title"
      });
    });

    it("should create an instance of the AboutWidget", function () {
     var aboutPanel = new AboutPanel({
       file: this.mockFile,
       entryConstructor: AboutWidget,
       factory: this.mockFactory,
       _tagWidget: WidgetBase
     });
     
     expect(aboutPanel).toBeDefined();
    });
  });
});
