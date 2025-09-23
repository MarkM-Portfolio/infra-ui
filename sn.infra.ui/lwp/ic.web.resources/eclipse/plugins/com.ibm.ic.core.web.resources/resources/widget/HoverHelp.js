/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-construct",
   "dojo/i18n",
   "dojo/i18n!ic-ui/nls/HoverPopup",
   "dijit/_Widget",
   "ic-ui/HoverHelp"
], function (dojo, declare, lang, domConstruct, i18n, i18nHoverPopup, _Widget, HoverHelp) {

   var messages = i18nHoverPopup;

   var HoverHelp = declare("lconn.core.widget.HoverHelp", HoverHelp, {
      isEnabled : function() {
         if (typeof (this.help) == "function") {
            if (!this.fetchingHelp) {
               this.fetchingHelp = true;
               this.help(lang.hitch(this, function(fetchedMessage) {
                  this.fetchingHelp = false;
                  this.help = fetchedMessage;
                  this.openWithFocus();
               }));
            }
            return false;
         }
         return true;
      },

      createContents : function() {
         var div = domConstruct.create("div", {});
         if (this.title)
            domConstruct.create("h1", {
               className : "lotusPopupHeader"
            }, div).appendChild(document.createTextNode(this.title));
         var hNode = (typeof (this.help) === "string") ? document
               .createTextNode(this.help) : this.help
         domConstruct.create("p", {
            className : "lotusFirst"
         }, div).appendChild(hNode);
         return div;
      }
   });

   /**
    * Utility method for creating an accessible help tooltip and optionally
    * the link and icon it is attached to. Parameters a: an optional A
    * element to attach to, if one is not passed an A element will be created
    * and returned heading: An optional heading for the tool tip, must be a
    * string message: The body of the message, can be a string, a domnode or
    * a function that takes a callback parameter for async loading of message
    * strings: Deprecated, no longer necessary preserveLink: if true help
    * popup will be attached to the passed in A element, but the element will
    * not be modified in any other way - if false (the default) all content
    * will be replaced
    */
   HoverHelp.createHelpLink = function(/* DomNode? */a, /* String? */heading, /* String | DomNode | Function */
         message, /* Object */strings, /* Boolean */preserveLink) {
      var d = document;

      a = a || domConstruct.create("a");
      a.title = messages.help;
      preserveLink = preserveLink || false;

      if (!preserveLink) {
         if (a.childNodes.length > 0)
            while (a.firstChild)
               a.removeChild(a.firstChild);

         a.href = "javascript:;";
         var img = domConstruct.create("img");
         img.className = "lconnSprite lconnSprite-iconHelp16";
         img.src = _Widget.prototype._blankGif;
         img.setAttribute("alt", messages.help);
         a.appendChild(img);

         var altSpan = domConstruct.create("span");
         altSpan.className = "lotusAltText";
         altSpan.appendChild(d.createTextNode("?"));
         a.appendChild(altSpan);
      }

      new HoverHelp({
         around : a,
         title : heading ? heading : null,
         help : message
      });

      return a;
   };

   return HoverHelp;
});
