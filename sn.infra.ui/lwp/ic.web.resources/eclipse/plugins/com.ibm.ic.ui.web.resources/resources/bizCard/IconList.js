/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/dom-attr",
        "dojo/dom-style",
        "dojo/dom-class",
        "dojo/_base/lang",
        "dojo/query",
        "dojo/dom",
        "dojo/html",
        "dojo/on",
        "dijit/a11yclick",
        "./AbstractList",
        "dojo/i18n!../nls/IconList" // native language support messages
], function(declare, domConstruct, domAttr, domStyle, domClass, lang, query, dom, html, on, a11yclick, abstractList, nlsMessages) {

   /**
    * CSS classes
    * 
    * @private
    */
   var idSametime = "iconList-sametimeIcon";
   var hcClass = "hc";
   var iconClass = "standIcon";
   var ulClass = "ic-iconList-widget";

   /**
    * iconList widget to create a list of icon extending the AbstractList
    * widget.
    * 
    * @author Orlando De Mauro <orlando.demauro@ie.ibm.com>
    * @class ic-ui.bizCard.IconList
    */
   return declare(abstractList,
   /** @lends ic-ui.bizCard.TextList.prototype */
   {

      /** sametime link */
      linkSametime : null,

      /** sametime event handler to set offline */
      sametimeHandler : null,

      /**
       * i18n - make native language support messages available on "this"
       */
      postMixInProperties : function() {
         this.inherited(arguments);
         lang.mixin(this, nlsMessages);
      },

      /** Update the List with new data */
      update : function(data) {
         this.inherited(arguments);
         domClass.add(this.ul, ulClass);
         // set the width of the ul number of element * (16px + 10px
         // padding) - padding of first child
         domStyle.set(this.ul, "width", (this.list.length * 26 - 10) + "px");
      },

      /** extend the createList method in abstractList and set a11y */
      createList : function(item, i, domNode) {
         this.inherited(arguments);
         var stIcon = null;
         domClass.add(this.anchor, iconClass + " " + hcClass);
         domStyle.set(this.anchor, "backgroundImage", "url('" + item.iconUrl + "')");
         domAttr.set(this.anchor, 'title', item.text);
         domAttr.set(this.anchor, "role", "button");
         domAttr.set(this.anchor, "href", "javascript:;");
         if (item.ariaText) {
            domAttr.set(this.anchor, "aria-label", item.ariaText);
         }

         if (item.disabled) {
            domStyle.set(this.anchor, "opacity", "0.5");
            domAttr.set(this.anchor, "aria-disabled", "true");
         }
         else {
            if (item.parameters && item.parameters.squareSametime) {
               stIcon = domConstruct.create("span", null, this.anchor, "first");
               domAttr.set(stIcon, "aria-hidden", "true");
               domAttr.set(stIcon, "id", idSametime);
               this.linkSametime = item.linkUrl;
               this.own(this.sametimeHandler = on.pausable(this.anchor, a11yclick, lang.hitch(this, this.setButtonLink, this.linkSametime)));
               this.setSametimeStatus(item.parameters, item.text, item.ariaText, stIcon, this.anchor);
            }
            else {
               this.own(on(this.anchor, a11yclick, lang.hitch(this, this.setButtonLink, item.linkUrl)));
            }
         }
      },

      /** set the icon button link */
      setButtonLink : function(link) {
         window.location.href = link;
      },

      /** set the sametime icon status */
      setSametimeStatus : function(parameters, text, ariaText, stNode, anchor) {
         var statusMessage = null;
         if (parameters.squareSametime) {
            domAttr.set(anchor, 'title', text);

            switch (parameters.squareSametime) {
               case "offline":
                  domStyle.set(anchor, "opacity", "0.5");
                  domClass.replace(stNode, "sameTime");
                  statusMessage = this.il_offline;
                  break;
               case "available":
                  domStyle.set(anchor, "opacity", "");
                  domClass.replace(stNode, "sameTime available");
                  statusMessage = this.il_available;
                  break;
               case "away":
                  domStyle.set(anchor, "opacity", "");
                  domClass.replace(stNode, "sameTime away");
                  statusMessage = this.il_away;
                  break;
               case "dnd":
                  domStyle.set(anchor, "opacity", "");
                  domClass.replace(stNode, "sameTime dnd");
                  statusMessage = this.il_dnd;
                  break;
               case "inAMtng":
                  domStyle.set(anchor, "opacity", "");
                  domClass.replace(stNode, "sameTime inAMtng");
                  statusMessage = this.il_inAMtng;
                  break;
               case "unknown":
                  domStyle.set(anchor, "opacity", "");
                  domClass.replace(stNode, "sameTime unknown");
                  statusMessage = this.il_unknown;
                  break;
            }

            if (parameters.squareSametime == "offline") {
               this.sametimeHandler.pause();
            }
            else {
               this.sametimeHandler.resume();
            }

            if (ariaText) {
               domAttr.set(anchor, "aria-label", statusMessage + ", " + ariaText);
            }
            else {
               domAttr.set(anchor, "aria-label", statusMessage + ", " + text);
            }
            html.set(anchor, statusMessage + ", " + text);
            domConstruct.place(stNode, anchor, "first");
         }
      },

      /** update the sametime icon status */
      updateSametimeStatus : function(parameters, text, ariaText) {
         var stNode = dom.byId(idSametime);
         if (stNode) {
            var anchor = stNode.parentNode;
            this.setSametimeStatus(parameters, text, ariaText, stNode, anchor);
         }
      },

      /** extend the createToggle method in abstractList */
      createToggle : function(item, i, domNode) {
         this.inherited(arguments);
         domClass.add(this.anchor, iconClass);
         domClass.add(this.anchor, hcClass);
         domAttr.set(this.anchor, "role", "button");
         this.setStatusToggle(item, this.anchor);

         if (item.parameters) {
            if (item.parameters.disabled) {
               domStyle.set(this.anchor, "opacity", "0.5");
               domAttr.remove(this.anchor, 'href');
            }
         }
      },

      /** extend the switchToggle method in abstractList */
      switchToggle : function(item, i, target, res) {
         this.inherited(arguments);
         if (res.response) {
            this.setStatusToggle(item, target);
         }
      },

      /** set a11y for toggle buttons */
      setStatusToggle : function(item, target) {
         if (item.status) {
            domStyle.set(target, "backgroundImage", "url('" + item.iconStatusTrue + "')");
            domAttr.set(target, 'title', item.textStatusTrue);
         }
         else {
            domStyle.set(target, "backgroundImage", "url('" + item.iconStatusFalse + "')");
            domAttr.set(target, 'title', item.textStatusFalse);
         }

         if (item.ariaTextStatusTrue && item.ariaTextStatusFalse) {
            if (item.status) {
               domAttr.set(target, "aria-label", item.ariaTextStatusTrue);
            }
            else {
               domAttr.set(target, "aria-label", item.ariaTextStatusFalse);
            }
         }
         domAttr.set(target, "aria-pressed", String(item.status));
      }

   });
});
