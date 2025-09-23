/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/panels/CommentsPanelFactory",
  "dojo/Stateful",
  "dijit/_WidgetBase",
  "dojo/dom-construct"
], function (CommentsPanelFactory, Stateful, WidgetBase, domConstruct) {
  "use strict";

  describe("CommentsPanel", function () {
    it("should render a comment", function () {
      var file = new Stateful(),
        comment = new Stateful(),
        fixture = domConstruct.create("div"),
        feed = [],
//        CommentBox = lang.clone(WidgetBase),
        factory,
        widget;

      feed.refresh = function () {
        return;
      };

      file.set("commentFeed", feed);

      factory = new CommentsPanelFactory({
        testOverrides: {
          CommentBox: WidgetBase,
          CommentWidget: WidgetBase,
          file: file
        }
      });

      comment.set("version", "1");
      comment.set("permissions", { Edit: true });
      comment.set("content", "Lorem ipsum");
      comment.set("author", { name: "Thomas Watson", id: "17" });
      comment.set("dateCreated", new Date());
      comment.set("dateModified", new Date());

      factory._items = [ comment ];

      widget = factory.get("panel");
      widget.placeAt(fixture);

      expect(fixture.innerHTML.indexOf("Lorem")).toBeGreaterThan(0);
    });
  });
});
