/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/cookie",
   "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings"
], function (declare, Action, cookie, i18n) {
   "use strict";

   var COOKIE_NAME, TogglePanelAction;

   COOKIE_NAME = "com.ibm.ic.share.fileviewer.panel-showing";

   TogglePanelAction = declare([Action], {
      postMixInProperties: function () {
         this.nls = i18n.ACTION.TOGGLE_PANEL;
         this.a11y = "";
         if (!this._cookie) {
            this._cookie = cookie;
         }

         this.isPanelShowing = this._getCookieValue();
         this.viewerActions.showDetailsPanel(this.isPanelShowing);
      },

      postCreate: function () {
         this._setTitleText();
      },

      onLinkClicked: function () {
         this.isPanelShowing = !this.isPanelShowing;
         this.viewerActions.showDetailsPanel(this.isPanelShowing);
         this._setCookieValue(this.isPanelShowing);
         this._setTitleText();
      },

      _setTitleText: function () {
         var titleText;

         if (this.isPanelShowing) {
            titleText = this.nls.HIDE;
            this.a11y = this.nls.HIDE_A11Y;
         } else {
            titleText = this.nls.SHOW;
            this.a11y = this.nls.SHOW_A11Y;
         }

         this._setTitle(titleText);
         this.describedBy.innerHTML = this.a11y;
      },

      _getCookieValue: function () {
         var value = this._cookie(COOKIE_NAME);

         if (!value) {
            return true;
         }

         return "false" !== value;
      },

      _setCookieValue: function (value) {
         value = value ? "true" : "false";
         this._cookie(COOKIE_NAME, value);
      }
   });

   return {
      create: function (args) {
         return new TogglePanelAction(args);
      },

      isValid: function () {
         return true;
      },

      getClassName: function () {
         return "ics-viewer-action-panel";
      }
   };
});
