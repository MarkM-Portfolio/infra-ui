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

dojo.provide("lconn.core.BrowseGroupsList");

dojo.require("dijit.form._ComboBoxMenu");
dojo.require('dijit.Tooltip');
dojo.require("lconn.core.Res");

/**
 * List widget used by {@link lconn.core.BrowseGroups}
 *
 * @class lconn.core.BrowseGroupsList
 * @extends dijit.form._ComboBoxMenu
 * @extends lconn.core.Res
 */
dojo.declare("lconn.core.BrowseGroupsList", [dijit.form._ComboBoxMenu, lconn.core.Res], /** @lends lconn.core.BrowseGroupsList.prototype */ {
   pageSize: 25,
   item: null,
   items: null,
   query: '',
   NoChildGroupsMessage: '',
   NoResultsMessage: '',
   nextMessage: '',
   nextMessageAlt: '',
   previousMessage: '',
   previousMessageAlt: '',
   pageCountMessage: '',
   pageCountMessageAlt: '',
   pagingInfo: '',
   selectMatchingGroupMessage: '',
   templateString:  "<span>" +"<ul tabindex='0' class='groupList' aria-label='${selectMatchingGroupMessage}' dojoAttachPoint='mainListNode' role='listbox' class='dijitReset dijitMenu' dojoAttachEvent='onkeypress:_onKeyPress,onmousedown:_onMouseDown,onmouseup:_onMouseUp,onmouseover:_onMouseOver,onmouseout:_onMouseOut'>" +"<li class='dijitMenuItem lotusAlignLeft resultsNode' dojoAttachPoint='resultsNode' role='option' tabindex='0' aria-label='${NoResultsMessage}'></li>" +"<li style='display: none' dojoAttachPoint='dummyOption'></li>" +"</ul>" + "<div class='lotusPaging' aria-label='${pagingInfo}'>" +"  <div id='browseGroupListPager' dojoAttachPoint='mainPagingNode' style='display:none;' class='lotusLeft' title='' aria-label='' aria-live='polite'></div>" +"  <ul class='lotusRight lotusInlinelist'>" +"     <li dojoAttachPoint='previousButton_ro' tabindex='-1' role='button' aria-disabled='true' class='lotusFirst' aria-labelledby='browseGroupListPager'>${previousMessage}</li>" +"     <li dojoAttachPoint='previousButton' tabindex='0' style='display:none; cursor: pointer;' class='lotusFirst' aria-labelledby='browseGroupListPager' role='button' dojoAttachEvent='onclick:_gotoPrev, onkeypress:_gotoPrev' href='javascript:;' title='${previousMessageAlt}'>${previousMessage}</li>" +"     <li dojoAttachPoint='nextButton_ro' tabindex='-1' role='button' aria-disabled='true' aria-labelledby='browseGroupListPager'>${nextMessage}</li>" +"     <li dojoAttachPoint='nextButton' tabindex='0' style='display:none; cursor: pointer;' aria-labelledby='browseGroupListPager' role='button' dojoAttachEvent='onclick:_gotoNext, onkeypress:_gotoNext' href='javascript:;' title='${nextMessageAlt}'>${nextMessage}</li>" +"  </ul>" +"</div>" +"<span dojoAttachPoint='focusPlaceholderNode' tabindex='-1'></span>" +"</span>",
   
   _messages: null,

   tooltipAroundNode: null,
   //Node that the tooltip is centered around
   tooltipTimeout: null,
   //Return value of setTimeout()
   tooltipDelay: 600,
   //Time to delay before showing tooltip
   tooltipId: 0,
   //Counter used for the tooltips to make sure only the latest one gets drawn
   closable: false,
   popupClosed: true,
   //A flag for the tooltip.  We set to false in _focusOptionNode (when an option
   //  is highlighted).  If the menu is closed, set to true.  This way, a tooltip
   //  won't show itself if the menu has been closed.
   //This flag is not a test for whether the type ahead menu is open.
   debug: false,


   postMixInProperties: function() {
      this.loadDefaultBundle();
      this.inherited("postMixInProperties", arguments);
      //this.baseClass = "lotusText";    // Needed?
      if (!this.NoResultsMessage) this.NoResultsMessage = this.resBundle.rs_noResults || "";
   },

   postCreate: function() {
      //noop this from the inherited.
   },

   setValue: function( /*Object*/ value) {
      // INSERT: removed conditional check for " && parseInt(value.target.item.type) >= 0" from IF
      if (value.target.item) {
         this.value = value;
         this.onChange(value);
      }
   },

   //Convenience function to return the item or null if there isn't one.
   getItem: function() {
      return (this.item ? this.item : null);
   },

   formatItem: function(item, html) {
      var str = "";

      if (typeof item == "string") return html ? this._htmlify(item) : item;
      if (!item || !item.name) return str;

      //If there's a comma in the name and there aren't already quotes around the name, then we'll surround the name in quotes
      if (item.name.indexOf(',') != -1 && item.name.length > 1 && item.name[0] != '"' && item.name[item.name.length - 1] != '"') {
         if (html) {
            str += '&quot;' + this._htmlify(item.name) + '&quot;';
         } else {
            str += '"' + item.name + '"';
         }
      } else {
         if (html) {
            str += this._htmlify(item.name);
         } else {
            str += item.name;
         }
      }

      if (item.member) {
         if (html) {
            str += ' &lt;' + this._htmlify(item.member) + '&gt;&lrm;';
         } else {
            str += ' <' + item.member + '>\u200E';
         }
      }

      return str;
   },

   _htmlify: function(str) {
      if (typeof str == "undefined" || str == null) str = "";
      return str.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;");
   },


   _gotoNext: function(evt) {
      evt = evt || window.event || {
         type: "click",
         charCode: 0,
         keyCode: 0
      };
      var code = (evt.keyCode || evt.charCode);
      if (code == dojo.keys.SPACE || code == dojo.keys.ENTER || evt.type == "click") {
         var pw = this.parentWidget;
         dojo.stopEvent(evt);
         pw._navFromPaging = "nextButton";
         pw._nextSearch(1);

      }
   },

   _gotoPrev: function(evt) {
      evt = evt || window.event || {
         type: "click",
         charCode: 0,
         keyCode: 0
      };
      var code = (evt.keyCode || evt.charCode);
      if (code == dojo.keys.SPACE || code == dojo.keys.ENTER || evt.type == "click") {
         var pw = this.parentWidget;
         dojo.stopEvent(evt);
         pw._navFromPaging = "previousButton";
         pw._nextSearch(-1);

      }
   },

   // lconn.core
   _doSelect: function(tgt) {
      this.debugLog("Entered _doSelect");

      var newValue = this.formatItem(tgt.item);

      if (this.multipleValues) {
         var oldValue = this.keyArr[this.keyIdx];

         this.keyArr[this.keyIdx] = (this.keyIdx != 0 && this.token != ' ' ? ' ' : '') + newValue;

         newValue = this.keyArr.join(this.token);

         //tokenSpace is token + space if token is not already a space
         var tokenSpace = this.token + (this.token != ' ' ? ' ' : '');

         if (newValue.length >= tokenSpace.length && newValue.substring(newValue.length - tokenSpace.length) != tokenSpace) newValue += tokenSpace;
      } else {
         this.item = tgt.item;
      }

      this.attr('value', newValue);
      //this._setCaretPos(this.focusNode, newValue.length);
      this.debugLog("Left _doSelect");
   },

   // lconn.core
   getAttribute: function( /* string */ attr) {
      if (this.item && this.item[attr]) return this.item[attr];
      else return '';
   },


   _curSelOption: 0,
   _selNextOption: function() {
      this._selOption(this._curSelOption + 1);
   },
   _selPrevOption: function() {
      this._selOption(this._curSelOption - 1);
   },
   
   _selOption: function(idx) {
      var allNodes = dojo.query("div[role='option']", this.mainListNode);
      if (idx < 0) idx = allNodes.length - 1;
      if (idx > allNodes.length - 1) idx = 0;
      var pw = this.parentWidget;
      dojo.forEach(allNodes, function(node, i, nodes) {
         if (i == idx) {
            dojo.attr(node, "tabindex", "0");
            if (pw._navFromPaging == false) {
               if (node.style.display != 'none'){
                  node.focus();
                  dojo.addClass(node, "dijitMenuItemHover");
               }
            }
         } else {
            dojo.attr(node, "tabindex", "-1");
            dojo.removeClass(node, "dijitMenuItemHover");
         }

      });

      this._curSelOption = idx;
   },

   _onKeyPress: function(evt) {
      evt = evt || window.event;

      var key = evt.keyCode;

      if (key == dojo.keys.DOWN_ARROW) {
         this._selNextOption();
         dojo.stopEvent(evt);
      } else if (key == dojo.keys.UP_ARROW) {
         this._selPrevOption();
         dojo.stopEvent(evt);
      } else if (key == dojo.keys.ENTER || key == dojo.keys.SPACE) {
         this.parentWidget._selectOption(evt);
         dojo.stopEvent(evt);
      }

   },

   _onMouseUp: function( /*Event*/ evt) {
      if (evt.target === this.domNode) return;
      if (evt.target == this.previousButton) {
         this.onPage(-1);
      } else if (evt.target == this.nextButton) {
         this.onPage(1);
      } else {
         this.onChange(evt);
      }
   },

   _onMouseOver: function( /*Event*/ evt) {
      if (evt.target === this.mainListNode) {
         return;
      }
      //removes any previously highlited options from either mouseHover, or arrowNavigation
      var allNodes = dojo.query("div[role='option']", this.mainListNode);
      dojo.forEach(allNodes, function(node, i, nodes) {
           dojo.removeClass(node, "dijitMenuItemHover");
      });
      var tgt = evt.target;
      if (!(tgt == this.resultsNode)) {
         // while the clicked node is inside the div
         while (!tgt.getAttribute("item")) {
            // recurse to the top
            tgt = tgt.parentNode;
         }
      }
      this._focusOptionNode(tgt);
   },


   // lconn.core: use dijitMenuItemHover
   _focusOptionNode: function( /*DomNode*/ node) {
      // summary:
      //    Does the actual highlight.
      if (this._highlighted_option != node) {
         this._blurOptionNode();
         this._highlighted_option = node;
         dojo.addClass(this._highlighted_option, "dijitMenuItemHover");

         // TODO - Need to show full group description here!!!
         //Show biz card tooltip
         var userid = dojo.attr(node, "exid");
         //check type, making sure we don't put bizcard on a group
         var type = dojo.attr(node, "persontype");

         //check type, making sure we don't put bizcard on a group
         // NOTE: we no longer show a popup tool tip according to the new design.
         //var description = dojo.attr(node, "description");
         var description = null;
         //if (!description) {
         //    description = "This is a test group description!"
         //}
         //Close any open tooltips
         this.closeTooltip();

         //This will make sure that we'll only actually display a tooltip if it's the current one.
         //  If you focus on a person in the drop-down, and then focus on "Search Directory", tooltipId
         //  will increment when you highlight "Search Directory".  Since tooltips get shown via a callback
         //  called after a round trip to the profiles server, it's possible there is a tooltip for a person
         //  that hasn't yet been displayed when the user is highlighting the "Search Directory" menu item.
         //  The end result would be that the last highlighted person would have a tooltip while the user is 
         //  moused over "Search Directory".  By associating an id with each tooltip callback, only the latest
         //  tooltip will be displayed.
         this.tooltipId++;
         this.popupClosed = false;

         if (description && (type == 1)) {
            this.tooltipTimeout = setTimeout(
            dojo.hitch(this, "showTooltip", this.tooltipId, node, description), this.tooltipDelay);
         }
      }
   },

   // lconn.core: use dijitMenuItemHover
   _blurOptionNode: function() {
      // summary:
      // removes highlight on highlighted option
      if (this._highlighted_option) {
         dojo.removeClass(this._highlighted_option, "dijitMenuItemHover");
         this._highlighted_option = null;
      }
   },

   _createOption: function( /*Object*/ item, labelFunc, /*menuNumber*/ i) {
      this.debugLog("Entered _createOption");
 
      var menuitem = this.inherited("_createOption", arguments);

      if (i >= 0) dojo.attr(menuitem, "item", i);
      if (item.userid) dojo.attr(menuitem, "exid", item.userid);

      if (item.type) dojo.attr(menuitem, "persontype", item.type);

      if (item.description != "null") {
         dojo.attr(menuitem, "description", item.description);
      }

      dojo.attr(menuitem, "tabindex", "-1");
      //else
      //{
      //    dojo.attr(menuitem, "description", "Test group description for greatest group");
      //}
      this.debugLog("Left _createOption");
      return menuitem;
   },

   //We only override this function so that we can add a no results message
   createOptions: function(results, dataObject, findGroupSearch, labelFunc) {
      this.debugLog("Entered createOptions");

      // Clear existing result nodes
      this.clearResultList(false);
      this.items = results;

      // Hide Previous Choices/More Choices buttons for now - the group selection servlet and
      // Waltz does not support paging for typeahead.

      // create options using _createOption function defined by parent
      // ComboBox (or FilteringSelect) class
      // #2309:
      //      iterate over cache nondestructively
      dojo.forEach(results, function(item, i) {
         if (dataObject.count && (i >= dataObject.count)) return;

         var menuitem = this._createOption(item, labelFunc, i);
         menuitem.className = "dijitReset dijitMenuItem lotusAlignLeft";
         dojo.attr(menuitem, "id", this.id + i);

         this.mainListNode.insertBefore(menuitem, this.dummyOption);
      }, this);

      this._selOption(0); //set focus to the first one.



      //display the prev button
      if (!dataObject.start || dataObject.start == 0) {
         dojo.style(this.previousButton, "display", "none");
         dojo.style(this.previousButton_ro, "display", "inline");
      } else {
         dojo.style(this.previousButton, "display", "inline");
         dojo.style(this.previousButton_ro, "display", "none");
      }

      //diplay the next button
      if ((dataObject.start + dataObject.count) < dataObject.totalItemCount) {
         dojo.style(this.nextButton, "display", "inline");
         dojo.style(this.nextButton_ro, "display", "none");
      } else {
         dojo.style(this.nextButton, "display", "none");
         dojo.style(this.nextButton_ro, "display", "inline");
      }

      var pw = this.parentWidget;
      if (pw._navFromPaging != false) {
         try {
            var el = this[pw._navFromPaging];
            if (!el || dojo.style(el, "display") == "none") {
               el = this[pw._navFromPaging + "_ro"];
            } else {
               el = dojo.query("a", el)[0]; //get the first link to set the focus
            }

            if (el && dojo.style(el, "display") != "none") el.focus();

         } catch (e) {
            this.debugLog("createOptions - Unable to set the focus to the navigation link");
         }
         pw._navFromPaging = false;
      }


      // INSERT: Added a message node to display when there are no results
      var el = this.resultsNode;
      if (results.length == 0) {
         var resultsMsg = '';
         if (findGroupSearch && this.NoResultsMessage) {
            resultsMsg = dojo.string.substitute(this.NoResultsMessage, [dataObject.query]);
            dojo.removeAttr(this.mainListNode, "aria-describedby");
         } else if (!findGroupSearch && this.NoChildGroupsMessage) {
            resultsMsg = dojo.string.substitute(this.NoChildGroupsMessage, [dataObject.query]);
            dojo.attr(this.mainListNode, "aria-describedby", "browseGroupsBreadcrumbs");
         }

         while (el.firstChild) el.removeChild(el.firstChild);

         el.appendChild(document.createTextNode(resultsMsg));
         el.item = resultsMsg;
         dojo.attr(el, "aria-disabled", "true");

         this.mainListNode.insertBefore(el, this.dummyOption);

         setTimeout(function() {
            el.focus();
         }, 0);


      } else {

         //set the paging info 
         var total = dataObject.totalItemCount;
         var start = dataObject.start + 1;
         var end = start + dataObject.count - 1;
         if (end > total) end = total;

         var msg = dojo.string.substitute(this.pageCountMessage, [start, end, total]);
         var msgalt = dojo.string.substitute(this.pageCountMessageAlt, [start, end, total]);

         dojo.place(document.createTextNode(msg), this.mainPagingNode, "only");
         this.mainPagingNode.title = msgalt;
         dojo.attr(this.mainPagingNode, "aria-label", msgalt);
         this.mainPagingNode.style.display = "";
         dojo.attr(this.mainListNode, "aria-describedby", "browseGroupsWidgetLabel");

      }

      //give an ID for a11y
      dojo.attr(this.resultsNode, "id", this.id + "_resultsNode");

      this.debugLog("Left createOptions");
   },

   //Override this function just to delete everything between the first and last items
   clearResultList: function(bClearButtons) {
      this.debugLog("Entered clearResultList");

      if (typeof bClearButtons == "undefined") bClearButtons = true;

      //keep the focus on the screen.
      try {
         this.focusPlaceholderNode.focus();
      } catch (e) {}

      // keep the previous and next buttons of course
      // INSERT: Added a message node to display when there are no results
      var last = this.dummyOption;
      while (last.previousSibling)
      this.mainListNode.removeChild(last.previousSibling);

      if (bClearButtons) this.clearPagingButtons();

      dojo.style(this.mainPagingNode, "display", "none");

      this.debugLog("Left clearResultList");
   },

   clearPagingButtons: function() {
      //reset all the paging buttons and info
      dojo.style(this.nextButton, "display", "none");
      dojo.style(this.nextButton_ro, "display", "inline");
      dojo.style(this.previousButton, "display", "none");
      dojo.style(this.previousButton_ro, "display", "inline");
   },


   showTooltip: function(id, node, html) {
      //Make sure that this is the tooltip we're supposed to show.
      //This prevents a tooltip from showing if we've already requested a new one
      if (id == this.tooltipId && !this.popupClosed) {
         this.tooltipAroundNode = node;
         dijit.showTooltip(html, node, ['after', 'before']);
      }

      //this.debugLog("Left showTooltip");
   },

   closeTooltip: function() {
      if (this.tooltipAroundNode) {
         dijit.hideTooltip(this.tooltipAroundNode);
         this.tooltipAroundNode = null;
      }
      if (this.tooltipTimeout) {
         clearTimeout(this.tooltipTimeout);
         this.tooltipTimeout = null;
      }

      //this.debugLog("Left closeTooltip");
   },

   // Sets the focus on the currently selected option or the first option if none selected
   onListFocus: function() {
      this.debugLog("Entered onFocus");
      var hilitedOption = this.getHighlightedOption();
      if (hilitedOption) {
         this._focusOptionNode(hilitedOption);
      } else {
         this.highlightFirstOption();
      }
      this.debugLog("Left onFocus");
   },

   onPage: function( /*Number*/ direction) {
      // summary:
      //    Notifies ComboBox/FilteringSelect that user clicked to advance to next/previous page.
      // tags:
      //    callback
      this.debugLog("Entered onPage: direction = " + direction);
      this.debugLog("Left onPage");
   },

   onClose: function() {
      this.debugLog("Entered onClose");

      this.popupClosed = true;
      this.closeTooltip();
      this._blurOptionNode();

      this.debugLog("Left onClose");
   },

   debugLog: function(message) {
      if (this.debug || (window.debugComm != null)) {
         if (window.console != null) {
            console.log("BrowseGroupsList " + message);
         }
      }
   }
});
