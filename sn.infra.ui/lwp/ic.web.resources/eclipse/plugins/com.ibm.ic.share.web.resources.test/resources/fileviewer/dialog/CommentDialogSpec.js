/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/dialog/CommentDialog",
  "dojo/_base/lang",
  "ic-share/fileviewer/config/globals",
  "dojo/on"
], function (CommentDialog, lang, globals, on) {
  "use strict";

  describe("CommentDialog", function () {
    var commentDialog;
    beforeEach(function () {
      commentDialog = new CommentDialog();
    });
    describe("constructor()", function () {
      it("should create an instance of the CommentDialog", function () {
        expect(commentDialog).toBeDefined();
      });
    });
    
    describe("contentwidget.click", function () {
      it("should emit an event with 'clicked' argument", function () {
        var eventListener, e = {target: {id: "ok"}},
          handler = commentDialog.on("clicked", function () {
            eventListener = "clicked";
          });
        commentDialog.content.clickLink(e);
        expect(eventListener).toEqual("clicked");
      });
      
      it("should emit an event with 'clicked' argument", function () {
        var eventListener, e = {target: {id: "cancel"}},
          handler = commentDialog.on("close", function () {
            eventListener = "close";
          });
        commentDialog.content.clickLink(e);
        expect(eventListener).toEqual("close");
      });
    });
  });
});