/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/_base/lang",
   "../uiState",
   "dojo/window",
   "../util/fidoNewRelic",
   "dijit/Tooltip"
], function (declare, Action, i18n, lang, uiState, win, fidoNewRelic, Tooltip) {
   "use strict";

   window.VIEWER_PANELS_RANGE = 50;

   var TogglePanelAction = declare([Action], {
      postMixInProperties: function () {
         this.nls = i18n.ACTION.TOGGLE_PANEL;
         this.a11y = "";
         this.viewerActions.showDetailsPanel(this.isPanelVisible());
      },
      
      postCreate: function () {
         this.domNode.firstElementChild.id = "togglePanel";
         new Tooltip({
             connectId: [this.domNode.firstElementChild.id],
             label: this.title,
             position: ["below"]
         });

         this._setTitleText();
         this.sizeWatch = uiState.watch("panelSize", lang.hitch(this, function (name, oldValue, value) {
            if (value != oldValue) {
               this._setTitleText();
            }
         }));
      },
      
      isPanelVisible: function () {
         var currentSize = uiState.get("panelSize");

         if (currentSize > window.VIEWER_PANELS_CLOSED_SIZE) {
            return true;

         } else {
            return false;
         }
      },
      
      onLinkClicked: function () {
         var panelSize = uiState.get("panelSize");
         var initSize = panelSize, modifiedSize;
         var previewSize = win.getBox().w - window.VIEWER_PANELS_DEFAULT_SIZE;
         
         if (this._panelShouldClose(panelSize, previewSize)) {
            uiState.set("panelSize", window.VIEWER_PANELS_CLOSED_SIZE);
            modifiedSize = window.VIEWER_PANELS_CLOSED_SIZE;
         } else if (this._panelShouldSnapFullscreen(panelSize, previewSize)) {
            uiState.set("panelSize", win.getBox().w);
            modifiedSize = win.getBox().w;
         } else {
            uiState.set("panelSize", window.VIEWER_PANELS_DEFAULT_SIZE);
            modifiedSize = window.VIEWER_PANELS_DEFAULT_SIZE;
         }
         fidoNewRelic.track("togglePanel", {"initPanelSize": initSize, "newSize": modifiedSize});
      },
      
      _panelShouldClose: function(panelSize, previewSize) {
         return ((panelSize > window.VIEWER_PANELS_CLOSED_SIZE && 
               panelSize <= window.VIEWER_PANELS_DEFAULT_SIZE)) || 
                ((panelSize > window.VIEWER_PANELS_CLOSED_SIZE) &&
                (previewSize < window.VIEWER_PREVIEW_SNAP_CLOSED_SIZE));
      },
      
      _panelShouldSnapFullscreen: function(panelSize, previewSize) {
         return (panelSize == window.VIEWER_PANELS_CLOSED_SIZE) && (previewSize < window.VIEWER_PREVIEW_SNAP_CLOSED_SIZE);
      },

      _setTitleText: function () {
         var titleText;
         var panelSize = uiState.get("panelSize");
         var previewSize = win.getBox().w - window.VIEWER_PANELS_DEFAULT_SIZE;

         if (panelSize == window.VIEWER_PANELS_CLOSED_SIZE) {
            titleText = this.nls.SHOW;
            this.a11y = this.nls.SHOW_A11Y;
         } else if (this._panelShouldClose(panelSize, previewSize)) {
            titleText = this.nls.HIDE;
            this.a11y = this.nls.HIDE_A11Y;
         } else {
            titleText = this.nls.RESET || "Reset panel size";
            this.a11y = this.nls.RESET_A11Y || "This button resets the side panel back to default size. The side panel is currently expanded.";
         }

         new Tooltip({
             connectId: [this.domNode.firstElementChild.id],
             label: titleText,
             position: ["below"]
         });
         this._setTitle(titleText);
         this.describedBy.innerHTML = this.a11y;
      },
      
      destroy: function () {
         this.sizeWatch.remove();
      }
   });

   return {
      isSticky: true,
      isOverlayAction: true,
      
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
