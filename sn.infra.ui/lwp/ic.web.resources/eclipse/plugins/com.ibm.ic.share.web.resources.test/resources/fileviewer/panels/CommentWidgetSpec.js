/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/panels/CommentWidget",
  "dojo/Stateful",
  "dijit/_WidgetBase",
  "dojo/dom-construct",
  "dojo/_base/lang",
  "dojo/query",
  "ic-share/fileviewer/config/globals"
], function (CommentWidget, Stateful, WidgetBase, domConstruct) {
  "use strict";

  describe("CommentWidget", function () {
    it("should render a comment", function () {
      var entry = new Stateful(),
        fixture = domConstruct.create("div"),
        widget;

      entry.set("version", "12");
      entry.set("dateCreated", new Date());
      entry.set("dateModified", new Date(2014));

      entry.set("author", {
        name: "Thomas Watson",
        id: "17"
      });

      widget = new CommentWidget({
        entry: entry
      });

      widget.startup();
      widget.set("editBox", new WidgetBase());
      widget.set("commentContent");

      widget.placeAt(fixture);

      expect(fixture.innerHTML.indexOf("Thomas Watson")).toBeGreaterThan(0);
      expect(fixture.innerHTML.indexOf("17")).toBeGreaterThan(0);
    });
  });
});
