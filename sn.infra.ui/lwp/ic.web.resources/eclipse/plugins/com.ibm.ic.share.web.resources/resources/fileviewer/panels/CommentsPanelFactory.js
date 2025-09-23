/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/Stateful",
   "dojo/dom-class",
   "./Panel",
   "./CommentsPanel",
   "../data/util/routes",
   "../bean/FileAdapter",
   "../config/globals",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/_base/lang",
   "dojo/string"
], function (declare, Stateful, domClass, Panel, CommentsPanel, routes, FileAdapter, globals, i18n, lang, string) {
   return declare([ Stateful ], {
      id: "comments",
      urlParameterId: "comments",
      actions: ["edit", "delete", "flag"],

      constructor: function () {
         this.nls = i18n.PANEL.COMMENTS;
         this.title = this.nls.TITLE;
         this.titleWithCount = this.nls.TITLE_WITH_COUNT;
      },

      postscript: function () {
         this.inherited(arguments); // Ensure that this.get(...) works as expected

         this.get("file").get("fullEntry").then(lang.hitch(this, "_updateTitle"));
         this.get("file").watch("commentCount", lang.hitch(this, "_updateTitle"));
      },

      _panelGetter: function () {
         return new Panel({factory: this});
      },

      renderContent: function (panel) {
         this.commentsPanel = new CommentsPanel(lang.mixin({
            file: this.file,
            factory: this
         }, this.testOverrides));

         this.commentsPanel.placeAt(panel.content);

         var bean = FileAdapter(this.file);
         var commentsFeedLink = routes.getCommentListServiceUrl(this.file, {isPersonalFilesInCommunity: bean.isPersonalFilesInCommunity(this.file.get("location")), basicAuth: true, anonymous: bean.isPublic(), nonPersonal: true});
         panel.set("feedLink", commentsFeedLink);
         panel.set("feedLinkTitle", this.nls.FEED_TITLE);
         panel.set("feedText", this.nls.FEED_LINK);
         panel.set("feedDivClasses", "panelContent panelFeed");
      },

      _updateTitle: function () {
         var commentCount = this.get("file").get("commentCount") || 0;
         var title = this.nls.TITLE_WITH_COUNT;

         if (commentCount == 0) { // Intentionally two equal signs (not three) - the count may be a string
            title = this.nls.TITLE;
         }

         this.set("title", string.substitute(title, [ commentCount ]));
      }
   });
});
