/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/i18n!../../nls/gadgetDialogStrings",
      "dojo/_base/declare",
      "dojo/_base/config",
      "dojo/i18n",
      "dojo/has",
      "dojo/dom",
      "dojo/dom-style",
      "dojo/dom-attr",
      "dojo/i18n!ic-core/nls/strings",
      "dojo/query",
      "dojo/text!./templates/GadgetDialog.html",
      "dijit/Dialog",
      "dijit/_Templated",
      "dijit/_Widget",
      "../../container/Topics"
], function(dojo, i18ngadgetDialogStrings, declare, dojoConfig, i18n, has, dom, domStyle, domAttr, i18nstrings, query, template, Dialog, _Templated, _Widget, Topics) {

   var GadgetDialog = declare("com.ibm.lconn.gadget.services.dialog.GadgetDialog", [
         _Widget,
         _Templated
   ], {
      blankGif : "",
      _extents : {
         "height" : 300,
         "width" : 700
      }, // Default height and width values if gadget prefs don't override.

      nlsCommon : i18nstrings,

      templateString : template,

      // Popup dialog hosting the preview
      popup : null,

      // Set width or height style to gadget prefs if provided by gadget.
      //
      _setExtentStyle : function(widthOrHeight, gadget_metadata) {
         var nodeName = "gadget" + widthOrHeight;

         // See if gadget pref has value for this extent
         //
         if ((typeof (gadget_metadata) != "undefined") && (gadget_metadata != null)) {
            var modulePrefsParam = gadget_metadata['modulePrefs'][widthOrHeight];
            if (modulePrefsParam != 0) {
               this._extents[widthOrHeight] = modulePrefsParam;
            }
         }
         this[nodeName] = this._extents[widthOrHeight] + "px";
      },

      constructor : function(paramsObj) {
         var setTitle = function(param_default, gadget_metadata) {
            var gtitle = "gadgettitle";
            if (typeof gadget_metadata != "undefined") {
               var modulePrefsParam = gadget_metadata['modulePrefs']["title"];

               this[gtitle] = modulePrefsParam !== "" ? modulePrefsParam : param_default;
            }
            else {
               this[gtitle] = param_default;
            }
         };

         setTitle.apply(this, [
               "Gadget Dialog",
               paramsObj.gadget_metadata
         ]); // default title is "Gadget Dialog"
         this._setExtentStyle("width", paramsObj.gadget_metadata);
         this._setExtentStyle("height", paramsObj.gadget_metadata);

         this.inherited(arguments);
      },

      postMixInProperties : function() {
         this.blankGif = dojoConfig.blankGif;
         this.inherited(arguments);
         this.nls = i18ngadgetDialogStrings;
      },

      postCreate : function() {

         this._subscribeAll();

      },

      _subscribeAll : function() {
         var topic = Topics.getSiteTopic(this.gadgetNodeId, Topics.GadgetWindow.SITE_TOPIC_SET_TITLE);
         this.subscribe(topic, "onGadgetTitleUpdated");

         // make sure our dialog repositions on resize events
         topic = Topics.getSiteTopic(this.gadgetNodeId, Topics.GadgetWindow.AFTER_ADJUST_WIDTH);
         this.subscribe(topic, "onWidthUpdated");

         topic = Topics.getSiteTopic(this.gadgetNodeId, Topics.GadgetWindow.AFTER_ADJUST_HEIGHT);
         this.subscribe(topic, "onHeightUpdated");

         topic = Topics.getLifecycleEventTopic(osapi.container.CallbackType.ON_RENDER);
         this.subscribe(topic, "onGadgetLoaded");
      },

      show : function() {
         // Create the popup and show it
         if (this.popup == null) {
            this.popup = new Dialog();
         }
         this.popup.attr({
            content : this.domNode,
            title : ""
         });
         this.popup.show();
      },

      _updateStyles : function() {
         this.popup.resize();

         // the lotusDialog stylings do a good job of scrollbar management
         // eliminate dijit's added style so the CSS can take precedence
         try {
            domStyle.set(this.gadgetNode, "overflow", null);
         }
         catch (e) {
            /** Throws exception on IE8 */
         }

         // If dojo sizes the dialog smaller than the extents requested by the
         // gadget,
         // Set the container and gadget node styles to automatic values for
         // extent and overflow.
         // 
         var cnHeight = domStyle.get(this.popup.containerNode, "height");
         var cnWidth = domStyle.get(this.popup.containerNode, "width");

         if (cnHeight < this._extents["height"]) {
            domStyle.set(this.gadgetNode, "height", "auto");
            domStyle.set(this.popup.containerNode, "height", "auto");
            if (!has("ie")) {
               if (has("safari")) {
                  domStyle.set(this.gadgetNode, "height", this._extents.height + "px");
               }
               else {
                  domStyle.set(this.gadgetNode, "height", "auto");
               }
               domStyle.set(this.popup.containerNode, "overflow", "visible");
            }
            else { // dojo.isIE
               domStyle.set(this.popup.containerNode, "height", (this._extents.height + 67) + "px");
               domStyle.set(this.popup.containerNode, "overflow", "visible");
            }
         }
         if (cnWidth < this._extents["width"]) {
            domStyle.set(this.popup.containerNode, "width", "auto");
            if (!has("ie")) {
               domStyle.set(this.gadgetNode, "width", "auto");
               domStyle.set(this.popup.containerNode, "overflow", "visible");
            }
            else { // dojo.isIE
               domStyle.set(this.popup.containerNode, "width", (this._extents.width + 25) + "px");
               domStyle.set(this.popup.containerNode, "overflow", "visible");
            }
         }
      },

      hide : function() {
         this.popup.hide();
      },

      destroy : function() {
         this.inherited(arguments);
      },

      onGadgetTitleUpdated : function(title) {
         this.titleNode.innerHTML = title;
      },

      onWidthUpdated : function(title) {
         // update our width extent so _updateStyles acts correctly
         this._extents.width = domStyle.get(query("iframe", this.gadgetNode)[0], "width");

         this._updateStyles();
      },

      onHeightUpdated : function(title) {
         // update our height extent so _updateStyles acts correctly
         this._extents.height = domStyle.get(query("iframe", this.gadgetNode)[0], "height");

         this._updateStyles();
      },

      // After gadget loads, update IFRAME scrolling for IE
      //
      onGadgetLoaded : function(gadgetUrl, siteId) {
         if (has("ie") && siteId == this.gadgetNodeId) { // only react if *this*
                                                         // gadget just loaded
            //
            // Have to force the iframe to reload for the scrolling to take
            // effect.
            //
            if (siteId === this.gadgetNodeId) {
               var iframeNode = query("iframe", dom.byId(siteId))[0];
               if (iframeNode) {
                  if (domAttr.get(iframeNode, "scrolling") == "no") {
                     domAttr.set(iframeNode, "scrolling", "auto");

                     // var parent = iframeNode.parentNode;
                     // var parentInner = parent.innerHTML;
                     // parent.removeChild(iframeNode);
                     //					
                     // dojo.place(parentInner, parent);
                  }
               }
            }
         }
         /*
          * with iframe height > 300 we get vertical scrollbar outside iframe,
          * which forces an unnecessary horizontal scrollbar. with iframe height
          * 300 or less, we get vertical scrollbar inside iframe (if needed) and
          * no horizontal scrollbars!
          */
         var iframeNode = query("iframe", this.gadgetNode)[0];
         if (iframeNode) {
            domStyle.set(iframeNode, "maxHeight", "300px");
            domStyle.set(this.gadgetNode, {
               "height" : "auto",
               "width" : "auto"
            });
            this._updateStyles();

            if (query("iframe", this.gadgetNode).length > 0)
               query("iframe", this.gadgetNode)[0].setAttribute("role", "presentation");
         }
      },

      /** Called when X clicked */
      closeDialog : function() {
         // Close the popup
         this.hide();
      }
   });

   return GadgetDialog;
});
