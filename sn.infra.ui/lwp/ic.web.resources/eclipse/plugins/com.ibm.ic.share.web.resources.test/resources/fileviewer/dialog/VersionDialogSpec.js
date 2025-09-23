/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/dialog/VersionDialog",
  "dojo/_base/lang",
  "ic-share/fileviewer/config/globals"
], function (VersionDialog, lang, globals) {
  "use strict";

  describe("VersionDialog", function () {
    var versionDialog;
    beforeEach(function () {
      versionDialog = new VersionDialog();
    });
    describe("constructor()", function () {
      it("should create an instance of the VersionDialog", function () {
        expect(versionDialog).toBeDefined();
      });
    });
    
    describe("contentwidget.click", function () {
      it("should emit an event with 'clicked' argument", function () {
        var eventListener, e = {target: {id: "ok"}},
          handler = versionDialog.on("clicked", function () {
            eventListener = "clicked";
          });
        versionDialog.content.clickLink(e);
        expect(eventListener).toEqual("clicked");
      });
      
      it("should emit an event with 'clicked' argument", function () {
        var eventListener, e = {target: {id: "cancel"}},
          handler = versionDialog.on("close", function () {
            eventListener = "close";
          });
        versionDialog.content.clickLink(e);
        expect(eventListener).toEqual("close");
      });
    });
  });
});