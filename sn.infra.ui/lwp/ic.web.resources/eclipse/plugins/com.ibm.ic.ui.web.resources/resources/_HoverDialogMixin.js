/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/window",
        "dojo/dom",
        "dojo/has",
        "dojo/i18n",
        "dojo/i18n!./nls/HoverPopup",
        "dojo/topic",
        "dijit/DialogUnderlay",
        "dijit/_DialogMixin",
        "dijit/focus"
], function(dojo, declare, lang, windowModule, dom, has, i18n, i18nHoverPopup, topic, DialogUnderlay, _DialogMixin, focusUtil) {

   /**
    * A mixin class to HoverPopup that provides behavior for underlays, focus
    * capture and management, and click to close behaviors.
    * 
    * @mixin ic-ui._HoverDialogMixin
    * @extends dijit._DialogMixin
    * @author Clayton Coleman <claycole@us.ibm.com>
    */
   var messages = i18nHoverPopup;

   var _HoverDialogMixin = declare("com.ibm.oneui._HoverDialogMixin", _DialogMixin, /** @lends ic-ui._HoverDialogMixin.prototype */
   {

      /** Set to true to include an underlay for this item */
      underlay : false,

      /**
       * This boolean tracks whether the popup should manage focus, subclasses
       * may set or remove thisto guarantee that focus is appropriately changed.
       * If false, the onClose event will not move the focus back to the opener
       * node.
       */
      _hasF : false,

      /** Creates managed connects */
      createManagedConnects : function() {
         this.managedConnect(windowModule.body(), "onkeypress", this, "_onKeyPress");
         this.managedConnect(windowModule.body(), "onclick", this, "_onBodyClick");
         // this.managedConnect(dojo, "stopEvent", this, "_onStopEvent");

         var underlay = this.underlay;
         if (underlay === true) {
            var useFixed = true;
            underlay = this.underlay = new DialogUnderlay({
               dialogId : this.id,
               "class" : useFixed ? "lotusPopupUnderlayFixed" : ""
            });
            if (useFixed) {
               underlay.layout = function() {
                  return;
               };
            }
            else {
               this.managedConnect(window, "onscroll", underlay, "layout");
               this.managedConnect(window, "onresize", underlay, "layout");
            }
            underlay.domNode.title = messages.closeHint;
         }
      },

      openWithFocus : function(target) {
         this._takeF = true;
         this.open(target);
         this._takeF = false;
      },

      _onKeyPress : function(/* Event */evt) {
         // summary:
         // Handler for keyboard events
         // description:
         // Keep keyboard focus in dialog; close dialog on escape key
         // tags:
         // private

         var node = evt.target;
         var dk = dojo.keys;
         if (evt.charOrCode === dk.TAB) {
            this._getFocusItems(this._getDomNode());
         }
         var singleFocusItem = (this._firstFocusItem == this._lastFocusItem);
         if (evt.charOrCode == dk.ESCAPE) {
            if (evt._cancelled) {
               return;
            }
            evt._cancelled = true;
            var dialog = this._getPopupForNode(node) || this;
            // Use setTimeout to avoid crash on IE, see #10396.
            setTimeout(lang.hitch(dialog, "close"), 0);
            evt.preventDefault();
            evt.stopPropagation();
         }
         else if (node == this._firstFocusItem && evt.shiftKey && evt.charOrCode === dk.TAB) {
            if (!singleFocusItem) {
               // send focus to last item in dialog
               focusUtil.focus(this._lastFocusItem);
            }
            evt.preventDefault();
            evt.stopPropagation();
         }
         else if (node == this._lastFocusItem && evt.charOrCode === dk.TAB && !evt.shiftKey) {
            if (!singleFocusItem) {
               // send focus to first item in dialog
               focusUtil.focus(this._firstFocusItem);
            }
            evt.preventDefault();
            evt.stopPropagation();
         }
         else if (evt.charOrCode === dk.TAB) {
            // we want the browser's default tab handling to move focus
            // but we don't want the tab to propagate upwards
            evt.stopPropagation();
         }
      },

      _onBodyClick : function(e) {
         var target = e && e.target;
         if (target && !dom.isDescendant(target, this._getDomNode()) && (!this._target || !dom.isDescendant(target, this._target))) {
            this._hasF = false;
            this.close();
         }
      },

      _onStopEvent : function(e) {
         if (e.type == "click") {
            this._onBodyClick(e);
         }
      },

      onVisible : function() {
         if (this._takeF) {
            this._hasF = true;
            this._getFocusItems(this._getDomNode());
            focusUtil.focus(this._firstFocusItem);
         }
      },

      onOpen : function() {
         if (this.underlay) {
            this.underlay.show();
         }
      },

      onClose : function() {
         if (this.underlay) {
            this.underlay.hide();
         }
         if (this._hasF) {
            focusUtil.focus(this._target);
         }
         this._hasF = false;
      },

      _targetClickAround : function(e) {
         if (e) {
            e.preventDefault();
            e.stopPropagation();
            this.openWithFocus(this._determineTarget(e.target));
         }
      },

      _getDomNode : function() {
         return this._getMasterPopup().domNode;
      }
   });

   return _HoverDialogMixin;
});
