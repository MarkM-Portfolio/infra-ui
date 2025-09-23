/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/topic",
   "../util/fidoNewRelic"
], function (declare, Action, i18n, topic, fidoNewRelic) {
   "use strict";

   var CloseAction = declare([Action], {
      postMixInProperties: function () {
         this.nls = i18n.ACTION.CLOSE;
         this.title = this.nls.TOOLTIP;
         this.a11y = this.nls.A11Y;
      },

      onLinkClicked: function () {
         fidoNewRelic.track("close");
         topic.publish("ic-fileviewer/close");
      }
   });

   return {
      isSticky: true,
      isOverlayAction: true,

      create: function (args) {
         return new CloseAction(args);
      },

      isValid: function () {
         return true;
      },

      getClassName: function () {
         return "ics-viewer-action-close";
      }
   };
});
