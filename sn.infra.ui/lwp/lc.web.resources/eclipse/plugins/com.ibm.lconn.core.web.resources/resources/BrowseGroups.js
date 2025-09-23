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

dojo.provide("lconn.core.BrowseGroups");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.Res");
dojo.require("lconn.core.BrowseGroupsDialog");
dojo.require("lconn.core.BrowseGroupsList");

dojo.requireLocalization("lconn.core", "strings");

/**
 * Legacy widget to pick user groups from a dialog
 *
 * @class lconn.core.BrowseGroups
 * @extends dijit._Widget
 * @extends dijit._Templated
 * @extends lconn.core.Res
 */
dojo.declare("lconn.core.BrowseGroups", [dijit._Widget, dijit._Templated, lconn.core.Res], /** @lends lconn.core.BrowseGroups.prototype */ {
   pageSize: 25,
   memberStore: null,
   item: null,
   query: '',
   findGroupSearch: false,

   breadcrumbItems: null,
   lastSelectedItem: null,
   groupLevel: -1,
   // -1 indicates no selection
   templateString: null,
   templatePath: dojo.moduleUrl("lconn.core", "templates/BrowseGroups.html"),

   /**
    * Browse groups list widget
    * @type lconn.core.BrowseGroupsList
    */
   browseGroupsList_W: null,

   /**
    * Browse groups dialog widget
    * @type lconn.core.BrowseGroupsDialog
    */
   browseGroupsPopupDlg: null,
   hideBrowseGroups: null,
   showBrowseGroups: null,
   disableAddButton: null,
   enableAddButton: null,

   browseGroupsDlg: null,
   addGroupsWidgetRef: null,

   // Resource Strings (with defaults)
   rs_browseGroupsDialogTitle: "Browse Groups",
   rs_browseFindGroups: "Find Groups",
   rs_browseAddButton: "Add",
   rs_browseCancelButton: "Cancel",
   rs_browseEnterString: "Type to find groups",
   rs_browseGroupName: "Type a group name:",
   rs_browseMatchingGroup: "Select a matching group:",
   rs_browseNextPage: "Next",
   rs_browseNextPageAlt: "Next Page",
   rs_browsePagingInfo: "Paging",
   rs_browsePrevPage: "Previous",
   rs_browsePrevPageAlt: "Previous Page",
   rs_browseGroupSelected: "Group Selected:",
   rs_browseGroupNoGroups: "This group does not contain any groups",
   rs_noResults: "No results found",
   rs_browseParentName: "You are in:",
   rs_browsePageInfo: "${0} - ${1} of ${2}",
   rs_browsePageInfoAlt: "Matching groups ${0} through ${1} of ${2}",
   rs_browseRemoveGroup: "Remove nested group selection: ${0}",

   debug: false,

   postMixInProperties: function() {
      this.debugLog("Entered postMixInProperties");

      this.inherited(arguments);
      this.baseClass = "lotusText";

      this.stringResources = dojo.i18n.getLocalization("lconn.core", "strings");

      this._loadLocalString("rs_browseGroupsDialogTitle", "rs_group_browse_groups_dialog_title");
      this._loadLocalString("rs_browseFindGroups", "rs_group_browse_find_groups");
      this._loadLocalString("rs_browseAddButton", "rs_group_browse_add_button");
      this._loadLocalString("rs_browseCancelButton", "rs_group_browse_cancel_button");
      this._loadLocalString("rs_browseEnterString", "rs_group_browse_enter_string");
      this._loadLocalString("rs_browseGroupName", "rs_group_browse_group_typeahead_label");
      this._loadLocalString("rs_browseMatchingGroup", "rs_group_browse_results_label");
      this._loadLocalString("rs_browseNextPage", "rs_group_browse_next");
      this._loadLocalString("rs_browseNextPageAlt", "rs_group_browse_next_page");
      this._loadLocalString("rs_browsePrevPage", "rs_group_browse_previous");
      this._loadLocalString("rs_browsePrevPageAlt", "rs_group_browse_previous_page");
      this._loadLocalString("rs_browseGroupSelected", "rs_group_browse_group_selected");
      this._loadLocalString("rs_browseGroupNoGroups", "rs_group_browse_group_no_groups");
      this._loadLocalString("rs_noResults", "rs_member_no_results");
      this._loadLocalString("rs_browsePagingInfo", "rs_group_browse_paging");
      this._loadLocalString("rs_browseParentName", "rs_group_browse_parent_group_label");
      this._loadLocalString("rs_browsePageInfo", "rs_group_browse_page_info");
      this._loadLocalString("rs_browsePageInfoAlt", "rs_group_browse_page_info_alt");
      this._loadLocalString("rs_browseRemoveGroup", "rs_group_browse_remove_selection");

   },

   _loadLocalString: function(nom, str) {
      if (this.stringResources && typeof this.stringResources[str] !== "undefined") {
         this[nom] = this.stringResources[str];
      }
   },

   postCreate: function() {
      this.debugLog("Entered postCreate");

      this.inherited("postCreate", arguments);

      // Group browsing support
      var groupListId = this.id + "_groupList";
      var args = {
         id: groupListId,
         pageSize: this.pageSize,
         NoChildGroupsMessage: this.rs_browseGroupNoGroups,
         NoResultsMessage: this.rs_noResults,
         nextMessage: this.rs_browseNextPage,
         nextMessageAlt: this.rs_browseNextPageAlt,
         previousMessage: this.rs_browsePrevPage,
         previousMessageAlt: this.rs_browsePrevPageAlt,
         pageCountMessage: this.rs_browsePageInfo,
         pageCountMessageAlt: this.rs_browsePageInfoAlt,
         pagingInfo: this.rs_browsePagingInfo,
         selectMatchingGroupMessage: this.rs_browseMatchingGroup,
         onChange: dojo.hitch(this, this._selectOption)
      };

      this.browseGroupsList_W = new lconn.core.BrowseGroupsList(args, this.groupBrowseList_AP);
      this.browseGroupsList_W.parentWidget = this;

      this.browseGroupsDlg = new lconn.core.BrowseGroupsDialog();

      this.breadcrumbItems = [];

      this.debugLog("Left postCreate");
   },

   uninitialize: function() {
      this.debugLog("Entered uninitialize");
      if (this.browseGroupsList_W != null) {
         this.debugLog("Destroying groups list widget.");
         this.browseGroupsList_W.destroy();
         this.browseGroupsList_W = null;
      }
      if (this.browseGroupsPopupDlg != null) {
         this.debugLog("Destroying browse groups popup dialog widget.");
         if (this.browseGroupsDlg != null) {
            this.browseGroupsDlg.cleanupDialog();
            delete this.browseGroupsDlg;
            this.browseGroupsDlg = null;
         }
         this.browseGroupsPopupDlg = null;
      }
      this.debugLog("Left uninitialize");
   },


   _getMenuLabelFromItem: function( /*Item*/ item) {
      // lconn.core: we don't use labelFunc
      this.debugLog("Entered getMenuLabelFromItem");

      var label = this.formatItemHtml(item);
      this.debugLog("_getMenuLabelFromItem: label = " + label);

      //var description = "Test group description";
      var description = null;
      if (item.description != "null") {
         description = this.browseGroupsList_W._htmlify(item.description);
      }
      this.debugLog("_getMenuLabelFromItem: description = " + description);

      var startIdx = 0;
      var match = null;

      var sbf = [];
      sbf.push("<b>");
      sbf.push(label);
      sbf.push("</b>");
      sbf.push("&nbsp;&nbsp;");
      sbf.push(description);

      this.debugLog("Left getMenuLabelFromItem");
      return {
         html: true,
         label: sbf.join("")
      };
   },

   // lconn.core: shorthand form for html formatting
   formatItemHtml: function(item) {
      return this.browseGroupsList_W.formatItem(item, true);
   },

   //Resets the form and empties the lists
   reset: function() {
      this.debugLog("Entered reset");
      this.browseGroupsList_W.setValue('');
      this.debugLog("Left reset");
   },

   setValue: function( /*Object*/ value) {
      if (value.target.item) {
         this.value = value;
         this.onChange(value);
      }
   },

   _startSearch: function( /*String*/ key, opt) {
      this.debugLog("Entered _startSearch");

      //clear the list right off the start to make sure nothing else is selected
      this.browseGroupsList_W.clearResultList();

      opt = opt || {};

      if (opt.findGroupSearch) {
         this.findGroupSearch = true;
      } else {
         this.findGroupSearch = false;
      }

      // create a new query to prevent accidentally querying for a hidden
      // value from FilteringSelect's keyField
      this.item = null; // #4872
      var query = dojo.clone(this.query); // #5970
      this._lastQuery = query = key;
      // #5970: set _lastQuery, *then* start the timeout
      // otherwise, if the user types and the last query returns before the timeout,
      // _lastQuery won't be set and their input gets rewritten
      this.searchTimer = this.defer(dojo.hitch(this, function(query, _this) {
         var dataObject = this.memberStore.fetch({
            queryOptions: dojo.mixin({
               ignoreCase: this.ignoreCase,
               deep: true
            }, opt),
            sort: [{
               attribute: "name",
               descending: false
            }],
            query: query,
            onBegin: dojo.hitch(this, "_setMaxOptions"),
            onComplete: dojo.hitch(this, "_openResultList"),
            onError: function(err) {
               console.error(err);
               dojo.hitch(_this, "_openResultList")([], dataObject); //if there is an error, show no results
            },
            start: 0,
            totalItemCount: -1,
            count: this.pageSize
         });

         var nextSearch = function(dataObject, direction) {
               dataObject.start += dataObject.count * direction;
               // #4091:
               //      tell callback the direction of the paging so the screen
               //      reader knows which menu option to shout
               dataObject.direction = direction;
               this.memberStore.fetch(dataObject);
            };
         this._nextSearch = this.browseGroupsList_W.onPage = dojo.hitch(this, nextSearch, dataObject);
         this._navFromPaging = false;

      }, query, this), opt.searchImmediately ? 1 : this.searchDelay);

      this.debugLog("Left _startSearch");
   },

   _setMaxOptions: function(size, request) {
      this._maxOptions = size;
   },

   _openResultList: function( /*Object*/ results, /*Object*/ dataObject) {
      this.debugLog("Entered _openResultList");

      if (this.disabled || this.readOnly || (dataObject.query != this._lastQuery)) {
         return;
      }

      this.debugLog("_openResultList: results.lenght = " + results.length);

      dataObject._maxOptions = this._maxOptions;
      this.browseGroupsList_W.createOptions(
      results, dataObject, this.findGroupSearch, dojo.hitch(this, "_getMenuLabelFromItem"));

      // show our list (only if we have content, else nothing)
      //this._showResultList();
      // #4091:
      //      tell the screen reader that the paging callback finished by
      //      shouting the next choice
      if (dataObject.direction) {
         this._announceOption(this.browseGroupsList_W.getHighlightedOption());
      }

      this.debugLog("Left _openResultList");
   },


   //_showResultList: function() {
   //   this.inherited(arguments);
   //   
   //   // Override to set activedescendant when the popup shows if it doesn't already have one
   //   var fn = this.focusNode;
   //   var bgList_w = this._popupWidget;
   //   if (this._isShowingNow && bgList_w && bgList_w.id && !dijit.getWaiState(fn, "activedescendant"))
   //      dijit.setWaiState(fn, "activedescendant", bgList_w.id);
   //},
   _hideResultList: function() {
      //this._abortQuery();
      //if(this._isShowingNow){
      // dijit.popup.close(this._popupWidget);
      this._arrowIdle();
      // this._isShowingNow=false;
      // dijit.setWaiState(this.comboNode, "expanded", "false");
      // dijit.removeWaiState(this.focusNode,"activedescendant");
      //}
   },


   _announceOption: function( /*Node*/ node) {
      // summary:
      //    a11y code that puts the highlighted option in the textbox.
      //    This way screen readers will know what is happening in the
      //    menu.
      if (!node) {
         return;
      }

      // pull the text value from the item attached to the DOM node
      var newValue;

      // lconn.core: we don't call labelFunc here - surprise, it gets called in dojo 1.4 anyhow!
      newValue = this.browseGroupsList_W.formatItem(node.item);
      //currently this method causes the selected value to be written to the textbox.
      //for a multiplevalue typeahead, this wipes out what the user previously typed
      // Don't set the 'item' attribute if multiple values are allowed
      // Doing so resets the input's value, and breaks autocomplete of multiple values
      if (!this.multipleValues) this.attr('item', node.item, false, newValue);


      //set up ARIA activedescendant
      //dijit.setWaiState(this.focusNode, "activedescendant", dojo.attr(node, "id"));
   },


   // lconn.core: override
   _selectOption: function( /*Event*/ evt) {
      this.debugLog("Entered _selectOption");
      var tgt = evt.target;
      while (tgt && tgt.parentNode) {
         //if we find item (with a nodeType for IE), break and move along.
         if(tgt.nodeType && tgt.nodeType == 1 && tgt.getAttribute("item")){
            break;
         }
         tgt = tgt.parentNode;
      }
      //if while loop completed, and still no item, then return.
      if(tgt.nodeType != 1 || !tgt.getAttribute("item")){
         return;
      }
      // summary:
      //    Menu callback function, called when an item in the menu is selected.
      // lconn.core: Need an event that happens after the caret position is adjusted
      var items = this.browseGroupsList_W.items;
      //Ensure that actual results are being selected, will block the selection of "no results".
      if (items && items.length) {
         this.onSelect(items[tgt.getAttribute("item")]);
      }
      this.debugLog("Left _selectOption");
   },

   // lconn.core: Need an event that happens after the caret position is adjusted
   onSelect: function(item) {
      this.debugLog("Entered onSelect");
      this.debugLog("onSelect: item.name = " + item.name + ", item.userid = " + item.userid + ", item.description = " + item.description);

      this.lastSelectedItem = item;

      // Add logic here to initiate subgroup search ...
      this.findGroupChildList(item);

      this.debugLog("Left onSelect");
   },

   //Most of this function is verbatim from base except for a few modifications where noted
   _onKeyPress: function( /*Event*/ evt) {
      return; //noop this!

      // summary:
      //    Handles keyboard events
      var key = evt.charOrCode;
      // except for cutting/pasting case - ctrl + x/v
      if (evt.altKey || ((evt.ctrlKey || evt.metaKey) && (key != 'x' && key != 'v')) || key == dojo.keys.SHIFT) {
         return; // throw out weird key combinations and spurious events
      }

      var bgList_w = this.browseGroupsList_W;
      var dk = dojo.keys;
      var highlighted = null;
      var activeElement = document.activeElement;
      this._prev_key_backspace = false;
      //this._abortQuery();
      //if(this._isShowingNow){
      bgList_w.handleKey(key);
      highlighted = bgList_w.getHighlightedOption();
      //}
      switch (key) {
      case dk.PAGE_DOWN:
      case dk.DOWN_ARROW:
      case dk.PAGE_UP:
      case dk.UP_ARROW:
         this._announceOption(highlighted);
         dojo.stopEvent(evt);
         break;

      case dk.ENTER:
         // if i am in the form input control, then type enter and search!
         if (activeElement == this.groupEntry_AP) {
            this.findGroupList();
            dojo.stopEvent(evt);
            break;
         }
         // prevent submitting form if user presses enter. Also
         // prevent accepting the value if either Next or Previous
         // are selected
         if (highlighted) {
            // only stop event on prev/next
            if (highlighted.item && parseInt(highlighted.item.type) < 0) {
               // No results selected
               dojo.stopEvent(evt);
               break;
            }
         } else {
            // Update 'value' (ex: KY) according to currently displayed text
            this._setBlurValue(); // set value if needed
         }
         // default case:
         // prevent submit, but allow event to bubble
         evt.preventDefault();
         // fall through
      case dk.TAB:
         var newvalue = this.attr('displayedValue');
         // if the user had More Choices selected fall into the
         // _onBlur handler
         if (bgList_w && ((newvalue == bgList_w._messages["previousMessage"]) || (newvalue == bgList_w._messages["nextMessage"]))) {
            break;
         }
         if (highlighted) {
            //in 1.4 bgList_w.attr will call this._selectOption();
            // lconn.core: we need this for keyboard accessibility
            bgList_w.attr('value', {
               target: highlighted
            });
            //this._selectOption();
         }
         //if(this._isShowingNow){
         //- Not applicable since UI is not a typeahead.  Was fouling up nested group keyboard selection
         //- this._lastQuery = null; // in case results come back later
         this._hideResultList();
         //}
         break;

      case ' ':
         if (highlighted) {
            dojo.stopEvent(evt);
            this._selectOption();
            this._hideResultList();
         }
         break;

      case dk.ESCAPE:
         //if(this._isShowingNow){
         dojo.stopEvent(evt);
         this._hideResultList();
         //}
         break;

      case dk.DELETE:
      case dk.BACKSPACE:
         this._prev_key_backspace = true;
         break;

      default:
         // Non char keys (F1-F12 etc..)  shouldn't open list.
         // Ascii characters and IME input (Chinese, Japanese etc.) should.
         // On IE and safari, IME input produces keycode == 229, and we simulate
         // it on firefox by attaching to compositionend event (see compositionend method)
      }
   },

   /////////////// Event handlers /////////////////////
   _arrowPressed: function() {
      if (!this.disabled && !this.readOnly && this.hasDownArrow) {
         dojo.addClass(this.downArrowNode, "dijitArrowButtonActive");
      }
   },

   _arrowIdle: function() {
      if (!this.disabled && !this.readOnly && this.hasDownArrow) {
         dojo.removeClass(this.downArrowNode, "dojoArrowButtonPushed");
      }
   },

   // FIXME: For 2.0, rename to "_compositionEnd"
   compositionend: function( /*Event*/ evt) {
      // summary:
      //    When inputting characters using an input method, such as
      //    Asian languages, it will generate this event instead of
      //    onKeyDown event.
      //    Note: this event is only triggered in FF (not in IE/safari)
      // tags:
      //    private
      // 229 is the code produced by IE and safari while pressing keys during
      // IME input mode
      this._onKeyPress({
         charOrCode: 229
      });
   },

   _setBlurValue: function() {
      // if the user clicks away from the textbox OR tabs away, set the
      // value to the textbox value
      // #4617:
      //    if value is now more choices or previous choices, revert
      //    the value
      var newvalue = this.attr('displayedValue');
      var bgList_w = this.browseGroupsList_W;
      if (bgList_w && (
      newvalue == bgList_w._messages["previousMessage"] || newvalue == bgList_w._messages["nextMessage"])) {
         //this._setValueAttr(this._lastValueReported, true);
      } else if (typeof this.item == "undefined") {
         // Update 'value' (ex: KY) according to currently displayed text
         //this.item = null;
         this.attr('displayedValue', newvalue);
      }
   },

   onBlur: function() {
      // summary:
      //    Called magically when focus has shifted away from this widget and it's drop down
      this._hideResultList();
      this._arrowIdle();
      this.inherited(arguments);
   },

   displayBrowseGroupsDialog: function() {
      this.debugLog("Entered displayBrowseGroupsDialog");
      this.groupEntry_AP.style.fontWeight = '200';
      this.groupEntry_AP.value = "";

      if (this.browseGroupsPopupDlg) {
         this.disableAddButton();

         this.debugLog("displayBrowseGroupsDialog: showing");
         this.showBrowseGroups();
      } else {
         this.debugLog("displayBrowseGroupsDialog: creating");
         var dialogObj = this.browseGroupsDialog_AP;

         this.browseGroupsPopupDlg = this.browseGroupsDlg.popupDialog(this.rs_browseGroupsDialogTitle, dialogObj, this.rs_browseAddButton, this.rs_browseCancelButton, dojo.hitch(this, this.executeBrowseGroups), dojo.hitch(this, this.cancelBrowseGroups));

         this.hideBrowseGroups = this.browseGroupsPopupDlg.hide;
         this.showBrowseGroups = this.browseGroupsPopupDlg.show;

         this.disableAddButton = this.browseGroupsPopupDlg.disableSubmit;
         this.enableAddButton = this.browseGroupsPopupDlg.enableSubmit;

         this.disableAddButton();

         // Make sure width calculations are correct in high contrast mode 
         if (dojo.hasClass(dojo.body(), "lotusImagesOff")) dojo.addClass(this.browseGroupsExp_AP, "lotusImagesOff");

         // Dynamically size the group entry field based upon the size require by the Find Groups button
         var lineWidth = this.findGroupDiv_AP.clientWidth;
         var buttonWidth = dojo.marginBox(this.findGroupSpan_AP).w;
         var entryWidth = lineWidth - buttonWidth;
         dojo.marginBox(this.groupEntry_AP, {
            w: entryWidth
         });

         this.debugLog("wid: " + entryWidth + " linw: " + lineWidth + " bwid: " + buttonWidth);
      }

      setTimeout(dojo.hitch(this, function() {
         this.groupEntry_AP.focus();
      }), 500);

      this.debugLog("Left displayBrowseGroupsDialog");
   },

   findGroupList: function(event) {
      if (event) dojo.stopEvent(event);

      this.debugLog("Entered findGroupList");

      // Get search value from the entry field
      var searchString = this.groupEntry_AP.value;

      //Trim white-space from the beginning and end of searchString
      searchString = dojo.string.trim(searchString);
      this.debugLog("findGroupList: searchString = " + searchString);

      this.memberStore.setGroupTypeahead(false);
      this.memberStore.setBrowsingChildGroups(false);

      if (searchString.length > 0) {
         var opt = {
            searchImmediately: true,
            findGroupSearch: true
         };

         // Update the query var and start the search 
         this.query = searchString;
         this._startSearch(searchString, opt);

         // reset the breadcrumbs
         this.clearBreadcrumbs();
      }

      this.debugLog("Left findGroupList");
   },

   setBreadcrumbLiveRegion: function() {
      try {

         this.groupListLiveRegion_AP.innerHTML = "";
         for (var ii = 0; ii < this.breadcrumbItems.length; ii++) {
            if (ii == 0) {
               dojo.place(dojo.doc.createTextNode(this.rs_browseParentName), this.groupListLiveRegion_AP);
            } else {
               dojo.place(dojo.doc.createTextNode(">"), this.groupListLiveRegion_AP);
            }
            dojo.place(dojo.doc.createTextNode(this.breadcrumbItems[ii].name), this.groupListLiveRegion_AP);
         }

         this.groupListLiveRegion_AP.innerHTML = liveText;
      } catch (e) {}
   },

   findGroupChildList: function(item) {
      this.debugLog("Entered findGroupChildList");

      if (item.type != "1") {
         // Ignore non group entry
         this.debugLog("findGroupChildList: " + item.name + " is not a group!");
         return;
      }

      this.debugLog("findGroupChildList: parent group uuid = " + item.userid);

      // Unhide breadcrumbs field
      this.showGroupListBreadcrumb_AP.style.display = "block";

      // Last query is the key for the browse cache when we need to navigate back to a specific group            
      var bcLinkNode = document.createElement('a');
      bcLinkNode.setAttribute('id', this.query);
      bcLinkNode.setAttribute('href', 'javascript:void(0);');
      bcLinkNode.setAttribute('role', 'button');
      var sTitle = dojo.string.substitute(this.rs_browseRemoveGroup, [item.name]);

      bcLinkNode.setAttribute('title', sTitle);
      var linkBCSym = document.createTextNode(" > ");
      var linkText = document.createTextNode(item.name);

      bcLinkNode.appendChild(linkText);
      this.groupLevel++; // Increment level
      dojo.connect(bcLinkNode, 'onclick', dojo.hitch(this, "navigateGroupsList", this.query, this.groupLevel));
      dojo.connect(bcLinkNode, 'onkeypress', dojo.hitch(this, "breadCrumbKeyListener", this.query, this.groupLevel));

      // Display the breadcrumb entries
      if (this.groupLevel > 0) this.groupListBreadcrumb_AP.appendChild(linkBCSym);

      var bcLinkDesc = document.createElement('span');
      bcLinkDesc.setAttribute('id', this.query + "_desc_" + this.groupLevel);
      dojo.style(bcLinkDesc, "display", "none");
      bcLinkDesc.appendChild(document.createTextNode(sTitle));
      bcLinkNode.setAttribute('aria-describedby', bcLinkDesc.id);

      this.groupListBreadcrumb_AP.appendChild(bcLinkDesc);
      this.groupListBreadcrumb_AP.appendChild(bcLinkNode);


      // Save selection in an array 
      this.breadcrumbItems[this.groupLevel] = item;

      // Unhide group selection field and set selected group name
      this.groupSelected_AP.innerHTML = item.name;
      this.showGroupSelected_AP.style.display = "";

      //set the a11y breadcrumbs
      this.setBreadcrumbLiveRegion();

      // Update store parameters
      this.memberStore.setGroupTypeahead(false);
      this.memberStore.setBrowsingChildGroups(true);

      var opt = {
         searchImmediately: true,
         findGroupSearch: false
      };

      // Update the query var and start the search 
      this.query = item.userid;
      this._startSearch(this.query, opt);

      if (dojo.isFunction(this.enableAddButton))
         this.enableAddButton();


      this.debugLog("Left findGroupChildList");
   },

   breadCrumbKeyListener: function(query, level, evt) {
      this.debugLog("Entered breadCrumbKeyListener");
      //    Handles keyboard events
      var key =  evt.keyCode || evt.charCode;
      var dk = dojo.keys;
      switch (key) {
         case dk.SPACE:
            evt.preventDefault();
            this.navigateGroupsList(query, level);
         default:

      }
   },
   
   navigateGroupsList: function(key, level) {
      this.debugLog("Entered navigateGroupsList");
      this.debugLog("navigateGroupsList: key = " + key + ", level = " + level);

      // Manage the breadcrumbs:  Remove any nodes "after" the selected link node
      this.updateBreadcrumbs(level);

      var opt = {
         searchImmediately: true,
         findGroupSearch: false
      };

      // Update the query var and start the search 
      this.query = key;
      this._startSearch(key, opt);

      // Update group selection
      this.updateGroupSelected();

      this.debugLog("Left navigateGroupsList");
   },

   updateBreadcrumbs: function(level) {
      this.debugLog("Entered updateBreadcrumbs");

      if (this.groupListBreadcrumb_AP.hasChildNodes) {

         if (level == -1) {
            this.debugLog("updateBreadcrumbs: Removing all nodes");

            // Hide breadcrumbs field
            this.showGroupListBreadcrumb_AP.style.display = "none";

            // Level of 0 removes all breadcrumbs
            while (this.groupListBreadcrumb_AP.firstChild) {
               //The list is LIVE so it will re-index each call
               this.debugLog("updateBreadcrumbs: Removing " + this.groupListBreadcrumb_AP.firstChild.nodeName);
               this.groupListBreadcrumb_AP.removeChild(this.groupListBreadcrumb_AP.firstChild);
            }

            // Set the group level index to indicate no selection
            this.groupLevel = -1;

            this.breadcrumbItems.length = 0;

            // Clear selection field
            this.clearGroupSelected();

         } else {

            // Set the group level index to the predecessor of this node
            this.groupLevel = level - 1;

            if (this.groupLevel == -1) {
               // Reset breadcrumb if we are back to initial filter list
               while (this.groupListBreadcrumb_AP.hasChildNodes()) {
                  this.groupListBreadcrumb_AP.removeChild(this.groupListBreadcrumb_AP.lastChild);
               }
               this.showGroupListBreadcrumb_AP.style.display = "none";
               this.breadcrumbItems.length = 0;

            } else {
               // Remove all siblings starting with the selection to the end
               var children = dojo.query("a", this.groupListBreadcrumb_AP);

               var firstNode = children[this.groupLevel];
               while (firstNode && firstNode.nextSibling) {
                  this.debugLog("updateBreadcrumbs: Removing " + firstNode.nextSibling.nodeName);
                  this.groupListBreadcrumb_AP.removeChild(firstNode.nextSibling);
               }
               this.breadcrumbItems.length = level;
            }
         }
      }


      //make sure the a11y area is updated.
      this.setBreadcrumbLiveRegion();

      this.debugLog("Left updateBreadcrumbs");
   },


   updateGroupSelected: function() {
      this.debugLog("Entered updateGroupSelected");
      
      if (this.groupLevel != -1) {
         var parentItem = this.breadcrumbItems[this.groupLevel];
         this.debugLog("updateGroupSelected: new selected value = " + parentItem.name);

         // Update selected group name and last selected item
         this.groupSelected_AP.innerHTML = parentItem.name;
         this.lastSelectedItem = parentItem;
      } else {
         if (this.disableAddButton)
            this.disableAddButton();

         // Clear selection field
         this.clearGroupSelected();
      }

      this.debugLog("Left updateGroupSelected");
   },

   clearBreadcrumbs: function() {
      this.debugLog("Entered clearBreadcrumbs");

      this.updateBreadcrumbs(-1);

      this.debugLog("Left clearBreadcrumbs");
   },

   clearGroupSelected: function() {
      this.debugLog("Entered clearGroupSelected");

      // Hide group selection field and clear selected group name
      this.showGroupSelected_AP.style.display = "none";
      this.groupSelected_AP.innerHTML = "";
      this.lastSelectedItem = null;
      this.breadcrumbItems = [];
      this.memberStore.browsingChildGroups = false;
      this.memberStore.groupTypeahead = true;
      this.debugLog("Left clearGroupSelected");
   },

   clearGroupEntry: function() {
      this.debugLog("Entered clearGroupEntry");

      // Clear the group entry field if there is no active query
      if ((this.groupLevel == -1) && (this.query.length == 0)) {
         this.groupEntry_AP.style.fontWeight = 'normal';
         this.groupEntry_AP.value = '';
      }

      this.debugLog("Left clearGroupEntry");
   },

   resetDataStore: function() {
      this.memberStore.setGroupTypeahead(true);
      this.memberStore.setBrowsingChildGroups(false);
   },


   executeBrowseGroups: function() {
      this.debugLog("Entered executeBrowseGroups");

      this.hideBrowseGroups();

      // Need access to selected item, not just the name!!!!
      if (this.lastSelectedItem != null) {
         // Add the new group member
         this.addGroupsWidgetRef.addNewGroup('authors', this.lastSelectedItem.userid, this.lastSelectedItem.name, this.lastSelectedItem.member);
         this.debugLog("executeBrowseGroups: save item = " + this.lastSelectedItem.name);

         // Clean up browse list
         this.browseGroupsList_W.clearResultList();

         // Clean up breadcrumbs DOM
         this.clearBreadcrumbs();

         // Clear the query search string
         this.query = "";

         // Reset so we can use typeahead
         this.resetDataStore();

         // Close processing
         this.browseGroupsList_W.onClose();

      }
      this.debugLog("Left executeBrowseGroups");
   },


   cancelBrowseGroups: function() {
      this.debugLog("Entered cancelBrowseGroups");

      // Hide the dialog
      this.hideBrowseGroups();

      // Clean up browse list
      this.browseGroupsList_W.clearResultList();

      // Clean up breadcrumbs DOM
      this.clearBreadcrumbs();

      // Clear the query search string
      this.query = "";

      // Reset so we can use typeahead
      this.resetDataStore();

      // Close processing
      this.browseGroupsList_W.onClose();

      //var parentObject = this;
      //parentObject.hideBrowseGroups();
      this.debugLog("Left cancelBrowseGroups");
   },


   debugLog: function(message) {
      if (this.debug || (window.debugComm != null)) {
         if (window.console != null) {
            console.log("BrowseGroups " + message);
         }
      }
   }

});
