/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
        "dojo/_base/declare",
        "dojo/_base/config",
        "dojo/_base/lang",
        "dojo/_base/window",
        "dojo/dom-class",
        "dojo/dom-construct",
        "dojo/dom-style",
        "dojo/has",
        "dojo/query",
        "dojo/i18n!../nls/HoverPopup",
        "dojo/text!../templates/HoverPopup.html",
        "dijit/_Templated",
        "dijit/_Widget"
], function(declare, config, lang, windowModule, domClass, domConstruct, domStyle, has, query, i18nHoverPopup, template, _Templated, _Widget) {
   var _popupStack = [];

   var MasterPopup = declare("com.ibm.oneui.internal._MasterPopup", [
                                                                     _Widget,
                                                                     _Templated
   ], {
      zIndex : 10000,
      templateString : template,
      messages : i18nHoverPopup,

      postCreate : function() {
         domStyle.set(this.domNode, {
            display : "none",
            zIndex : this.zIndex
         });
         // if multiple master popups exist, a popup can request positioning
         // before others
         var location = query(".dijitPopup", document.body)[0];
         var place = this.place;
         if (!location || !place) {
            location = windowModule.body();
            place = null;
         }
         domConstruct.place(this.domNode, location, place);
      },

      show : function(target, source) {
         if (this._showing) {
            this._showing.close();
         }
         this._showing = source;
         var domNode = this.domNode;
         var wrapper = this.wrapper;
         var documentWrapper = this.documentWrapper;
         wrapper.id = source.id + "_popup";
         if (!this._showing.dialogLabelledBy) {
            dijit.setWaiState(wrapper, "label", source.dialogTitle !== null ? source.dialogTitle : source.title || "");
            if (documentWrapper) {
               dijit.setWaiState(documentWrapper, "label", source.dialogTitle !== null ? source.dialogTitle : source.title || "");
            }
         }
         else {
            dijit.setWaiRole(wrapper, "presentation");
         }
         if (source.customClass) {
            domClass.add(wrapper, source.customClass);
         }
         domNode.style.visibility = "hidden";
         domNode.style.display = "block";
         if (this.zIndex && !domNode.style.zIndex) {
            domNode.style.zIndex = this.zIndex;
         }
         try {
            source.position(target);
            domNode.style.visibility = "";
            if (lang.isFunction(source.onVisible)) {
               source.onVisible(source);
            }
            dijit.setWaiState(wrapper, "hidden", "false");
            _popupStack.push(this);
         }
         catch (e) {
            // suppress errors in IE when the connected node is hidden, see work
            // item 66523
            source.close();
            if (config.isDebug) {
               console.error(e);
            }
         }
      },

      hide : function() {
         // recursively close any currently open popups above us
         var i, next;
         for (i = 0; i < _popupStack.length; i++) {
            if (_popupStack[i] == this) {
               next = _popupStack[i + 1];
               if (next && next._showing) {
                  next._showing.close();
               }
               _popupStack.pop();
            }
         }

         var domNodeStyle = this.domNode.style;
         domNodeStyle.cssText = "";
         domNodeStyle.display = "none";

         this.arrow.style.cssText = "";
         this.contentWrapper.style.cssText = "";

         var wrapper = this.wrapper;
         dijit.setWaiState(wrapper, "hidden", "true");
         if (!this._showing.dialogLabelledBy) {
            dijit.setWaiState(wrapper, "label", "");
         }
         else {
            dijit.setWaiRole(wrapper, "presentation");
         }

         domClass.remove(wrapper, [
                                   "lotusPopupLeft",
                                   "lotusPopupRight",
                                   "lotusPopupBottom"
         ]);
         if (this._showing && this._showing.customClass) {
            domClass.remove(wrapper, this._showing.customClass);
         }
         this._showing = null;
      },

      setContent : function(newNode) {
         if (this.content.firstChild) {
            this.content.replaceChild(newNode, this.content.firstChild);
         }
         else {
            this.content.appendChild(newNode);
         }
      },

      clickClose : function(event) {
         if (this._showing) {
            this._showing.clickClose(event);
         }
      }
   });

   /**
    * Return the currently open popup that contains the given node.
    * 
    * @function _getPopupForNode
    * @memberof ic-ui.internal._MasterPopup
    * @param {Node}
    *           target Target node
    */
   MasterPopup.prototype._getPopupForNode = function(target) {
      var i, l, masterPopup;
      for (i = 0, l = _popupStack.length; i < l; i++) {
         masterPopup = _popupStack[i];
         if (has("descendant")(target, masterPopup.domNode)) {
            return masterPopup._showing;
         }
      }
   };
   return MasterPopup;
});
