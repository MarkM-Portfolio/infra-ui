/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/topic",
   "./Action",
   "dojo/i18n!../nls/FileViewerStrings",
   "../util/fidoNewRelic"
], function (declare, lang, topic, Action, i18n, fidoNewRelic) {
   "use strict";

   var RefreshAction = declare([Action], {
      groupId: 2,

      constructor: function (args) {
         lang.mixin(this, args);
         this.nls = i18n.ACTION.REFRESH;
         this.title = this.name = this.nls.NAME;
         this.a11y = this.nls.A11Y;
      },

      onLinkClicked: function () {
         topic.publish("ic-fileviewer/refresh", {});
         fidoNewRelic.track("refresh");
      }
   });

   return {
      isSubItem: true,

      create: function (args) {
         return new RefreshAction(args);
      },

      isValid: function () {
         return true;
      },

      getClassName: function () {
         return "ics-viewer-action-refresh";
      }
   };
});