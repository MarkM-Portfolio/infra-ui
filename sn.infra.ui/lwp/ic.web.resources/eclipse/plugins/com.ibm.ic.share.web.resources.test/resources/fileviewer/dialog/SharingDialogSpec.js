/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/dialog/SharingDialog",
  "dojo/_base/lang",
  "ic-share/fileviewer/config/globals"
], function (SharingDialog, lang, globals) {
  "use strict";

  describe("SharingDialog", function () {
    var sharingDialog;
    beforeEach(function () {
      sharingDialog = new SharingDialog();
    });
    describe("constructor()", function () {
      it("should create an instance of the VersionDialog", function () {
        expect(sharingDialog).toBeDefined();
      });
    });
    
    describe("contentwidget.click", function () {
      it("should emit an event with 'clicked' argument", function () {
        var eventListener, e = {target: {id: "ok"}},
          handler = sharingDialog.on("clicked", function () {
            eventListener = "clicked";
          });
        sharingDialog.content.clickLink(e);
        expect(eventListener).toEqual("clicked");
      });
      
      it("should emit an event with 'clicked' argument", function () {
        var eventListener, e = {target: {id: "cancel"}},
          handler = sharingDialog.on("close", function () {
            eventListener = "close";
          });
        sharingDialog.content.clickLink(e);
        expect(eventListener).toEqual("close");
      });
    });
  });
});