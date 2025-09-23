/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-attr",
   "dojo/dom-style",
   "dojo/topic",
   "dijit/TooltipDialog",
   "dijit/_Widget",
   "ic-core/locale",
   "ic-core/widget/MenuLauncher"
], function (dojo, declare, lang, domAttr, domStyle, topic, TooltipDialog, _Widget, locale, MenuLauncher) {

   var HelpLauncher = declare("lconn.core.HelpLauncher", MenuLauncher, {
      openDelay: 250,
      hideDelay: 400,
      orient: {'TR':'TL', 'TL':'TR', 'BR':'BL', 'BL':'BR'},
      orientRTL: {'TL':'TR', 'TR':'TL', 'BL':'BR', 'BR':'BL'},
      _initMenu: function() {
         this.menu = new ToolTip(lang.mixin({id: this.menuId},this.optMenu));
      },

      onOpen: function(){
         this.inherited(arguments);
         //ensures the alert actually gets read
         this.menu.containerNode.appendChild(document.createTextNode(""));
         this.menu.domNode.parentNode.style.width = this.menu.width + 22 + "px";
         domAttr.set(this.menu.containerNode, "aria-labelledby", this.menu.id + "_heading");
      }
   });

   var ToolTip = declare("lconn.core.HelpLauncher.ToolTip", TooltipDialog, {
      heading: "", //descriptive heading for the tooltip - String
      message: "", //message to display in the tooltip - String or DomNode
      help: "",
      close: "",
      autofocus: false,
      width: 200,
      maxWidth: 400,

      "class": "lotusTooltipDialog",
      parseOnLoad: false,

      postMixInProperties: function() {
         this.isLoaded = true;

         this.title = this.help;

      },

      buildRendering: function() {
         var strings = this.strings;

         var d = document;
         var m = this.message;
         var heading = this.heading;
         var close = this.close;
         var h3, p;
         var el = d.createElement("div");
            el.className = "lotusHelp";

            m = (m)? m : "";
            var mText = (typeof(m) === "string")? m : (m.textContent || m.innerText);
            var mLength = mText.length;

            //Integer added to the end of the calculation to adjust for minor discrepancy.
            var w = Math.round(this.width + Math.min(Math.max(0, (mLength-200)/125), 1) * (this.maxWidth - this.width) + 4);
            el.style.width = w+"px";
            this.width = w;
            domStyle.set(el, "border", "0px");

            var div = d.createElement("div");
               div.className = "lotusInfoBox";
               dijit.setWaiRole(div, "document");
               domAttr.set(div, "aria-labelledby", this.id + "_heading");

               var closeParent = d.createElement("div");
                  closeParent.className = "lotusRight";
                  var closeLink = this.closeLink = d.createElement("a");
                     closeLink.title = close;
                     dijit.setWaiState(closeLink, "label", close);
                     closeLink.className = "lotusDelete";
                     closeLink.href = "javascript:;";
                     this.connect(closeLink, "onclick", "onCancel");
                     dijit.setWaiRole(closeLink, "button");

                     var img = d.createElement("img");
                        img.src = this._blankGif;
                        img.setAttribute("alt", "");
                        dijit.setWaiRole(img, "presentation");
                     closeLink.appendChild(img);

                     var span = d.createElement("span");
                        span.className = "lotusAltText";
                        span.appendChild(d.createTextNode("X"));
                     closeLink.appendChild(span);
                  closeParent.appendChild(closeLink);
               div.appendChild(closeParent);

               var contentDiv = document.createElement("div");
                  contentDiv.id = this.id + "_content";
                  contentDiv.className = "lotusHelpHeader";
                  dijit.setWaiState(closeLink, "describedBy", contentDiv.id);
                  if (m) {
                     if (heading) {
                        h3 = d.createElement("h3");
                           //due to the location of the popup in the DOM, there are no headings above it in the hierarchy, so it's a "h1" semantically
                           //CSS assumes it's a h3 however
                           dijit.setWaiRole(h3, "heading");
                           dijit.setWaiState(h3, "level", "1");
                           h3.id = this.id + "_heading";
                           h3.appendChild(d.createTextNode(heading));
                        div.appendChild(h3);
                     }

                     if (typeof(m) === "string") {
                        p = d.createElement("p");
                           p.appendChild(d.createTextNode(m));
                        contentDiv.appendChild(p);
                     }
                     else
                        contentDiv.appendChild(m);
                  }
               div.appendChild(contentDiv);

            el.appendChild(div);

         this.content = el;
         this.inherited(arguments);
      },

      destroy: function() {
         dijit.popup.close(this);
         this.inherited(arguments);
      },

      closeOnLinkClick: true,
      _attachTemplateNodes: function() {
         this.inherited(arguments);
         // connect the hover events so that hide/show can also apply when the user mouses over the popup
         this.connect(this.domNode, "onmouseover", "onMouseOver");
         this.connect(this.domNode, "onmouseout", "onMouseOut");
         if (this.closeOnLinkClick)
            this.connect(this.domNode, "onclick", "onTooltipClick");
      },

      onCancel: function(e) {
         if (e)
            e.preventDefault(), e.stopPropagation();

         this.inherited(arguments);
      },

      onTooltipClick: function(e) {
         var el = e.target;
         for (var i=0; el && i<5; i++)
            if (el.nodeName.toLowerCase() == "a" && el != this.closeLink) {
               this.onCancel();
               return;
            }
            else if(el == this.containerNode)
               return;
            else
               el = el.parentNode;
      }
   });


   /* Utility method for creating an accessible help tooltip and optionally the link and icon it is attached to.
    * Parameters
    * a: an optional A element to attach to, if one is not passed an A element will be created and returned
    * heading: An optional string to display as a heading for the tool tip, must be a string
    * message: The body of the message, can be a string or a domnode
    * strings: Internationalized utility strings, object should be of the same form as lconn.core.HelpLauncher.strings
    * preserveLink: if true help popup will be attached to the passed in A element, but the element will not be modified in any other way - if false (the default) all content will be replaced
    */
   HelpLauncher.createHelpLink = function(/* DomNode? */a, /* String? */ heading, /* String | DomNode */ message, /* Object */ strings, /* Boolean */ preserveLink) {
      var d = document;
      this.strings = strings || HelpLauncher.strings;

      a = a || document.createElement("a");
      preserveLink = preserveLink || false;

      if (!preserveLink) {
         if(a.childNodes.length > 0)
            while(a.firstChild)
               a.removeChild(a.firstChild);

         a.href = "javascript:;";
         dijit.setWaiRole(a, "button");
         var img = d.createElement("IMG");
            img.className = (locale.getLanguage() === "ar") ?
                  "lconnSprite lconnSprite-iconHelp16-ar" :
                  "lconnSprite lconnSprite-iconHelp16";
            img.src = _Widget.prototype._blankGif;
            img.setAttribute("alt", this.strings.HELP);
         a.appendChild(img);

         var altSpan = d.createElement("span");
            altSpan.className = "lotusAltText";
            altSpan.appendChild(d.createTextNode(locale.getLanguage() === "ar" ? "\u061F" : "?"));
         a.appendChild(altSpan);
      }

      new HelpLauncher({
         optMenu: {
            heading: heading,
            message: message,
            help: this.strings.HELP,
            close: this.strings.CLOSE
         }
      }, a);

      return a;
   }


   HelpLauncher.strings = {
      HELP: "Help",
      CLOSE: "Close"
   };

   return HelpLauncher;
});
