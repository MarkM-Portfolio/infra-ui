/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo",
      "dojo/dom-attr",
      "dojo/_base/declare",
      "dojo/_base/kernel",
      "dojo/text!./templates/PeopleTypeAheadMenu.html",
      "dojo/_base/lang",
      "dojo/on",
      "dojo/query",
      "dojo/dom-class",
      "dojo/string",
      "dojo/dom-style",
      "dojo/_base/array",
      "dojo/topic",
      "dijit/Tooltip",
      "dijit/form/ComboBox",
      "dijit/form/_ComboBoxMenu",
      "dojo/dom-geometry",
      "ic-core/Res"
],
   function(dojo, domAttr, declare, kernel, template, lang, on, queryModule, domClass, string, domStyle, array, topic, Tooltip, ComboBox, _ComboBoxMenu, domGeometry, Res) {

      /**
       * @class lconn.core.PeopleTypeAheadMenu
       */
      return declare("lconn.core.PeopleTypeAheadMenu", [
            _ComboBoxMenu,
            Res
      ],
      /** @lends lconn.core.PeopleTypeAheadMenu.prototype */
      {
         rs_searchDirectory : ' ',
         NoResultsMessage : '',
         HeaderMessage : '',
         templateString : template,
         _messages : null,
         searchDirectoryClass : "",
         disableSearchDirectory : false,
         disableBizCard : false,

         inputWidget : null,
         tooltipFocused : false,
         // mark if the focus is on bizcard
         tooltipAroundNode : null,
         // Node that the tooltip is centered around
         tooltipTimeout : null,
         // Return value of setTimeout()
         tooltipDelay : 600,
         // Time to delay before showing tooltip
         tooltipId : 0,
         // Counter used for the tooltips to make sure only the latest one gets
         // drawn
         popupClosed : true,
         // A flag for the tooltip. We set to false in _focusOptionNode (when an
         // option
         // is highlighted). If the menu is closed, set to true. This way, a
         // tooltip
         // won't show itself if the menu has been closed.
         // This flag is not a test for whether the type ahead menu is open.
         postMixInProperties : function() {
            //RTC 165967/163936 removing all the line breaks and tabs from the template. 
            this.templateString = this.templateString.replace(/\r\n|\n|\r|\t/gim, '');
            
            this.loadDefaultBundle();
            this.inherited("postMixInProperties", arguments);
            if (this.disableSearchDirectory)
               this.searchDirectoryClass = "lotusHidden";
            if (!this.NoResultsMessage)
               this.NoResultsMessage = this.resBundle.rs_noResults || "";
         },

         postCreate : function() {
            // RTC 89423 Using "More" and "Previous" strings from the resource
            // bundle as we have nothing else.
            domAttr.set(this.previousButton, "aria-label", this.resBundle.rs_navPrevLabel);
            domAttr.set(this.searchButton, "aria-label", this.rs_searchDirectory);
            domAttr.set(this.nextButton, "aria-label", this.resBundle.rs_more);

            this.searchButton.selectHandler = lang.hitch(this, function(evt) {
               evt.preventDefault(), evt.stopPropagation();
               this.searchDirectory();
               return true; // Return true to skip the rest of the default
               // behavior
            });

            this.resultsNode.selectHandler = lang.hitch(this, function(evt) {
               evt.preventDefault(), evt.stopPropagation();
               return true; // Return true to skip the rest of the default
               // behavior
            });

            this.inherited("postCreate", arguments);
         },

         searchDirectory : function() {},

         setValue : function( /* Object */value) {
            // INSERT: removed conditional check for " &&
            // parseInt(value.target.item.type) >= 0" from IF
            if (value && value.target && value.target.item) {
               this.value = value;
               this.onChange(value);
            }
         },

         _onMouseDown:function(/*Event*/ evt){
            evt.preventDefault();
         },

         _onClick:function(/*Event*/ evt){
            if(evt.target==this.searchButton){
               this.searchDirectory();
            }else if(evt.target!=this.resultsNode){
               this.inherited("_onClick", arguments);
            }
         },

         _onMouseUp : function( /* Event */evt) {
            if(evt.target==this.searchButton){
               this.searchDirectory();
            }else if(evt.target!=this.resultsNode){
               this.inherited("_onMouseUp", arguments);
            }
         },

         _onMouseOver : function( /* Event */evt) {
            if (evt.target === this.domNode) {
               return;
            }
            var tgt = evt.target;
            if (!(tgt == this.previousButton || tgt == this.nextButton || tgt == this.searchButton || tgt == this.resultsNode)) {
               // while the clicked node is inside the div
               while (tgt && !tgt.getAttribute('item')) {
                  // recurse to the top
                  tgt = tgt.parentNode;
               }
            }
            this._focusOptionNode(tgt);
         },

         // lconn.core: use dijitMenuItemHover
         _focusOptionNode : function( /* DomNode */node) {
            // summary:
            // Does the actual highlight.
            if (this._highlighted_option != node) {
               this._blurOptionNode();
               this._highlighted_option = node;
               domClass.remove(this._highlighted_option, "dijitMenuItemSelected");
               domClass.add(this._highlighted_option, "dijitMenuItemHover");
               // Show biz card tooltip
               var userid = domAttr.get(node, "exid");
               // check type, making sure we don't put bizcard on a group
               var type = domAttr.get(node, "persontype");

               // Close any open tooltips
               this.closeTooltip();

               // This will make sure that we'll only actually display a tooltip
               // if it's the current one.
               // If you focus on a person in the drop-down, and then focus on
               // "Search Directory", tooltipId
               // will increment when you highlight "Search Directory". Since
               // tooltips get shown via a callback
               // called after a round trip to the profiles server, it's
               // possible there is a tooltip for a person
               // that hasn't yet been displayed when the user is highlighting
               // the "Search Directory" menu item.
               // The end result would be that the last highlighted person would
               // have a tooltip while the user is
               // moused over "Search Directory". By associating an id with each
               // tooltip callback, only the latest
               // tooltip will be displayed.
               this.tooltipId++;
               this.popupClosed = false;
               if (userid && (type == 0) && !this.disableBizCard) {
                  this.renderBizCard(userid, node);
               }
               else if (type != -1) {
                  this.inputWidget._announceOption(node);

               }
            }
         },

         renderBizCard : function(userId, node) {
            if (lang.isFunction(lang.getObject('lconn.profiles.bizCard.bizCard.renderMiniBizCard'))) {
               this.tooltipTimeout = setTimeout(lang.hitch(lconn.profiles.bizCard.bizCard, "renderMiniBizCard", userId, lang.hitch(this,
                  "showTooltip",
                  this.tooltipId,
                  node)), this.tooltipDelay);
            }
            else {
               this.inputWidget._announceOption(node);
            }
         },

         // lconn.core: use dijitMenuItemHover
         _blurOptionNode : function() {
            // summary:
            // removes highlight on highlighted option
            if (this._highlighted_option) {
               domClass.remove(this._highlighted_option, "dijitMenuItemHover");
               this._highlighted_option = null;
            }
         },

         _createOption : function( /* Object */item, labelFunc) {
            var menuitem = this.inherited("_createOption", arguments);

            if (item.userid) {
               domAttr.set(menuitem, "exid", item.userid);
               domAttr.set(menuitem, "aria-labelledby", "bc_document_node");
            }

            if (item.type)
               domAttr.set(menuitem, "persontype", item.type);

            return menuitem;
         },

         // We only override this function so that we can make it insert options
         // before searchButton
         // instead of before nextButton, and also to conditionally display the
         // search button
         createOptions : function(results, dataObject, labelFunc) {
            topic.publish("ic-core/typeahead/open");
            if (!dataObject) {
               // TODO: error handling
               return;
            }
            // Clear existing result nodes
            this.clearResultList();

            this.items = results;

            // this._dataObject=dataObject;
            // this._dataObject.onComplete=dojo.hitch(comboBox,
            // comboBox._openResultList);
            // display "Previous . . ." button
            if (!dataObject.start || dataObject.start == 0) {
               this.previousButton.style.display = "none";
            }
            else {
               this.previousButton.style.display = "";
               domAttr.remove(this.previousButton, "tabindex");
            }
            domAttr.set(this.previousButton, "id", this.id + "_prev");

            if (this.HeaderMessage) {
               var el = this.headerNode;
               while (el.firstChild)
                  el.removeChild(el.firstChild);
               el.appendChild(document.createTextNode(this.HeaderMessage));
               domAttr.set(el, "id", this.id + "_headerMessage");
               domAttr.set(el, "item", this.HeaderMessage);
               domAttr.set(this.domNode, "aria-describedby", this.id + "_headerMessage");
               domClass.remove(el, "lotusHidden");
               if (!domGeometry.isBodyLtr()) {
                  domClass.add(el, "dijitMenuItemRtl");
               }
            }

            // create options using _createOption function defined by parent
            // ComboBox (or FilteringSelect) class
            // #2309:
            // iterate over cache nondestructively
            var pageStart = dataObject.start || 0;
            var pageEnd = pageStart + (dataObject.count || 0);
            array.forEach(results, function(item, i) {
               if (dataObject.count && (i < pageStart || i >= pageEnd))
                  return;

               var menuitem = this._createOption(item, labelFunc);
               var text = menuitem.innerHTML;
               if (results[i].userid == "null" && results[i].type == -1) {
                  while (menuitem.firstChild)
                     menuitem.removeChild(menuitem.firstChild);
                  menuitem.appendChild(document.createTextNode(text));
                  menuitem.item = text;
                  this.resultsNode = menuitem;
               }
               else {
                  domAttr.set(menuitem, "id", this.id + i);
                  menuitem.className = domGeometry.isBodyLtr() ? "dijitMenuItem" : "dijitMenuItem dijitMenuItemRtl";
                  // index to this.items; use indirection to avoid mem leak
                  menuitem.setAttribute("item", i);
               }
               domStyle.set(menuitem, "overflow", "hidden");
               // Removed aria-label for defect 69657, aria-describedby read
               // only if no other aria-label attribute exists.
               // dojo.attr(menuitem, "aria-label", item.name);
               this.domNode.insertBefore(menuitem, this.nextButton);
            }, this);

            // display "Next . . ." button
            this.nextButton.style.display = (dataObject.count && pageEnd < results.length) ? "" : "none";
            domAttr.set(this.nextButton, "id", this.id + "_next");

            // INSERT: Added a message node to display when there are no results
            var el = this.resultsNode;
            if (results.length == 0 && this.NoResultsMessage) {
               var noResultsMsg = string.substitute(this.NoResultsMessage, [ dataObject.query
               ]);
               while (el.firstChild)
                  el.removeChild(el.firstChild);
               el.appendChild(document.createTextNode(noResultsMsg));
               el.item = noResultsMsg;
               this.domNode.insertBefore(el, this.nextButton);
            }
            // give an ID for a11y
            domAttr.set(this.resultsNode, "id", this.id + "_resultsNode");

            // INSERT: Add a search directory button if we haven't already
            // searched
            if (!dataObject.queryOptions.searchDirectory && dataObject.searchType != "directory") {
               this.domNode.insertBefore(this.searchButton, this.nextButton);
            }
            // give an ID for a11y
            domAttr.set(this.searchButton, "id", this.id + "_searchDir");
            if (!domGeometry.isBodyLtr())
               domClass.add(this.searchButton, "dijitMenuItemRtl");
         },

         // Override this function just to delete everything between the first
         // and last items
         clearResultList : function() {
            // keep the previous and next buttons of course
            // INSERT: Added a message node to display when there are no results
            var first = this.previousButton;
            var last = this.nextButton;
            while (first.nextSibling && first.nextSibling != last)
               this.domNode.removeChild(first.nextSibling);
         },

         // Override this function just to change 2 to 3 since we added an extra
         // node into the menu
         getListLength : function() {
            // INSERT: Added a message node to display when there are no results
            return this.domNode.childNodes.length - 2 - (this.searchButton.parentNode ? 1 : 0) - (this.resultsNode.parentNode ? 1 : 0)
                  - (this.headerNode.parentNode ? 1 : 0);
         },

         showTooltip : function(id, node, html) {
            // Make sure that this is the tooltip we're supposed to show.
            // This prevents a tooltip from showing if we've already requested a
            // new one
            if (node.parentNode && node.parentNode.parentNode && node.parentNode.parentNode.style.display === 'none') { // extra
               // check
               // as
               // the
               // showTooltip
               // is
               // called
               // with
               // some
               // delay
               this.popupClosed = true;
            }
            if (id == this.tooltipId && !this.popupClosed) {
               this.tooltipAroundNode = node;
               dijit.showTooltip(html, node, [
                     'after',
                     'before'
               ]);

               // Remove the wairole/role "alert" from tooltip, bizcard should
               // not interrupt what is already being spoken.
               dijit._masterTT.containerNode.removeAttribute("wairole");
               dijit._masterTT.containerNode.removeAttribute("role");
               this.inputWidget._announceOption(node);
               topic.publish("com/ibm/social/incontext/typeahead/onMiniBizCardDisplay", html);

               // put focus on the link in bizcard
               var a = queryModule("a", "cardBody")[0];
               if (a) {
                  // this.tooltipFocused = true;
                  // a.focus();
                  // if focus leave bizcard and is NOT on people typeahead
                  // input, close people typeahead menu
                  this.connect(a, "onblur", lang.hitch(this, function() {
                     this.tooltipFocused = false;
                     var iw = this.inputWidget;
                     setTimeout(function() {
                        if (!(iw && iw.focused)) {
                           iw._hideResultList();
                        }
                     }, 100);
                  }));

                  on(a, "keypress", lang.hitch(this, function(evt) {
                     var key = evt.charOrCode;
                     var dk = dojo.keys;
                     var iw = this.inputWidget;
                     switch (key) {
                        // if press ESC key, close bizcard, move focus to people
                        // typeahead input
                        case dk.ESCAPE:
                           this.closeTooltip();
                           if (iw && iw.domNode) {
                              iw.domNode.focus();
                           }
                           break;
                        case dk.TAB:
                           if (iw && iw.domNode) {
                              iw.domNode.focus();
                           }
                           evt.preventDefault(), evt.stopPropagation();
                           break;
                     }
                  }));
               }
            }
         },

         onPage : function( /* Number */direction) {
            // summary:
            // Notifies ComboBox/FilteringSelect that user clicked to advance to
            // next/previous page.
            // tags:
            // callback
            this.debugLog("Entered PeopleTypeAheadMenu onPage: direction = " + direction);
            this.debugLog("Left PeopleTypeAheadMenu onPage");
         },

         closeTooltip : function() {

            if (this.tooltipAroundNode) {
               dijit.hideTooltip(this.tooltipAroundNode);
               this.tooltipAroundNode = null;
            }
            if (this.tooltipTimeout) {
               clearTimeout(this.tooltipTimeout);
               this.tooltipTimeout = null;
            }
         },

         onClose : function() {
            topic.publish("ic-core/typeahead/close");
            this.popupClosed = true;
            this.closeTooltip();
            this._blurOptionNode();
         }
      });
   });
