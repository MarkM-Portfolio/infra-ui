/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.paletteOneUI.PaletteContentPanel");

// FIXME: in Dojo 1.3, properties of DataStore items are no longer scalar values, but arrays.
// The paletteOneUI code makes the assumption that properties are scalar values. This code must
// be entirely refactored.

dojo.require("lconn.core.paletteOneUI.WidgetButton");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.require("dojo.parser");

dojo.requireLocalization("lconn.core.paletteOneUI", "PaletteContentPanel");

dojo.declare( // widget name and class
"lconn.core.paletteOneUI.PaletteContentPanel", // superclass
[dijit._Widget, dijit._Templated, dijit._Container], // properties and methods
{
   // summary: Dojo widget representing the left end side of the palette, following OneUI design
   templatePath: dojo.moduleUrl("lconn.core", "paletteOneUI/templates/PaletteContentPanel.html"),

   // pagerNode: DOMNode
   //      dojo attach point
   pagerNode: null,

   // _items: dojo.data.item[]
   _items: null,

   // _currentPageNumber: Int
   //   Keep track of current page. 0-based paging
   _currentPageNumber: 0,

   // _resourceBundle: Map
   //    i18n strings
   _resourceBundle: null,
   
   _nextLinkHandle: null, 
   
   _previousLinkHandle: null, 

   // dojo attach points
   nextNode: null,
   previousNode: null,
   pagerContainerNode: null,
   noWidgetNode: null,
   scrollControlNode: null,   

   // AMOUNT_WIDGET_PER_PAGE: Int const
   //       number of widgets per page
   AMOUNT_WIDGET_PER_PAGE: 12,

   imageContextRoot: "",

   postMixInProperties: function() {
      this._resourceBundle = dojo.i18n.getLocalization("lconn.core.paletteOneUI", "PaletteContentPanel");
   },

   postCreate: function() {
      // summary: post create initialization
      this.inherited("postCreate", arguments);
   },

   _addPaletteButton: function( /* dojo.data.Item */ widgetItem, /* Boolean */ enabled) {
      // summary: add a button representing a widget to the content area
      var imageRoot = this.imageContextRoot;
      var button = new lconn.core.paletteOneUI.WidgetButton({
         widgetItem: widgetItem,
         imageContextRoot: imageRoot,
         initialStatus: enabled
      });
      this.addChild(button);
   },

   _removeAllButtons: function() {
      // summary: clean the widget button area
      var buttons = this.getChildren();
      dojo.forEach(buttons, function(button) {
         this.removeChild(button);
      }, this);
   },

   _removeButtonNotInSet: function( /* Array of Ids*/ ids) {
      // summary: remove the button that are not in the passed set of ids 
      var buttons = this.getChildren();
      dojo.forEach(buttons, function(button) {

         var buttonId = button.widgetItem.id;

         // no array.contains?
         var contain = dojo.some(ids, function(id) {
            return id == buttonId;
         })

         if (!contain) {
            this.removeChild(button);
         }
      }, this);
   },

   goToFirstPage: function() {
      this._currentPageNumber = 0;
   },

   setItems: function( /* dojo.data.Item[]*/ items) {
      // summary: add buttons corresponding to the children of item (category)
      //      note: calling this method also reset the paging to the first page
      this._items = items;

      //this._currentPageNumber = 0;
      this._showWidgetButtons();
      this._updatePaging();
      this._togglePagingButtons();
   },

   _updatePaletteButton: function( /* WidgetButton */ button, /* Boolean */ enabled, /* Boolean */ showMsg) {
      // summary: update the status (enabled/disabled) of the passed button
      
      // keep button enabled if widget allows multiple instances
      if(enabled && button.widgetItem.uniqueInstance && button.widgetItem.uniqueInstance[0] == "false"){
         button.enableButton({
            canHaveMultiple: true,
            showMsg: showMsg
         });
         return;
      }
      if (enabled) {
         button.enableButton();
      } else {
         button.disableButton();
      }
   },

   _showWidgetButtons: function() {
      // summary: displays the widgets for the current page
      var pageNumber = this._currentPageNumber;

      if (this._getTotalNumberWidgets() == 0) {
         this._removeAllButtons();
         this._showNoWidgetMsg();
      } else {
         this._hideNoWidgetMsg();
         if ((pageNumber >= 0) && (this._items != null)) {

            var begin = this._getFirstWidgetIndex();
            var end = this._getLastWidgetIndex();

            // build set of item ids that must be displayed as buttons
            var ids = [];
            for (var i = begin; i <= end; i++) {
               ids.push(this._items[i].item.id);
            }

            // clean up display from the buttons that should no longer be displayed
            this._removeButtonNotInSet(ids);

            var currentChildren = this.getChildren();

            for (var i = begin; i <= end; i++) {
               var widgetItem = this._items[i].item;
               var enabled = this._items[i].enabled;
               var showMsg = this._items[i].showMsg;

               // check whether a button for the current item is already displayed
               var found = false;
               var j = 0;
               while (!found && (j < currentChildren.length)) {
                  if (currentChildren[j].widgetItem.id == widgetItem.id) {
                     found = true;
                  } else {
                     j++;
                  }
               }

               // only add new buttons to the display
               if (!found) {
                  this._addPaletteButton(widgetItem, enabled);
               } else {
                  this._updatePaletteButton(currentChildren[j], enabled, showMsg);
               }

               //var widgetItem = this._items[i].item;
               //var enabled = this._items[i].enabled;
               //this._addPaletteButton(widgetItem, enabled);
            }

            this._currentPageNumber = pageNumber;
         }
      }
   },

   _showNoWidgetMsg: function() {
      // For a11y, to force change the node for read out
      this.noWidgetNode.innerHTML = this._resourceBundle.NO_WIDGET_NO_SHELF;
      dojo.removeClass(this.noWidgetNode, "lotusHidden");
   },

   _hideNoWidgetMsg: function() {
      dojo.addClass(this.noWidgetNode, "lotusHidden");
   },

   _updatePaging: function() {
      // summary: set up the paging based on the widget in this category
      var numberOfWidgets = this._items.length;

      var total = this._getTotalNumberWidgets();

      // SPR THSE7XPK35: Hide pager when no widget available
      if (total != 0) {

         var end = this._getLastWidgetIndex() + 1;
         var begin = Math.min(total, this._getFirstWidgetIndex() + 1);

         var str = dojo.string.substitute(this._resourceBundle.PAGING_STATUS, {
            begin: begin,
            end: end,
            total: total
         });
         dojo.removeClass(this.pagerNode, "lotusHidden");
         this.pagerNode.innerHTML = str;
      } else {
         dojo.addClass(this.pagerNode, "lotusHidden");
      }

      dojo.removeClass(this.pagerContainerNode, "lotusHidden");

   },

   onPrevious: function(evt) {
      if (!this._isFirstPage()) {
         this._currentPageNumber--;
         this._showWidgetButtons(this._currentPageNumber);
         this._updatePaging();
         this._togglePagingButtons();
         this._focusToFirstWidgetButton("previous");
      }

      dojo.stopEvent(evt);
   },

   onNext: function(evt) {
      if (!this._isLastPage()) {
         this._currentPageNumber++;
         this._showWidgetButtons(this._currentPageNumber);
         this._updatePaging();
         this._togglePagingButtons();
         this._focusToFirstWidgetButton("next");
      }

      dojo.stopEvent(evt);
   },

   _focusToFirstWidgetButton: function(current) {
      var widgetNodes = dojo.query(".lotusPaletteWidget");
      var focusableWidget = null;
      for (var i = 0; i < widgetNodes.length; i++) {
         if (!dojo.hasClass(widgetNodes[i], "lotusPaletteDisabledBtn")) {
            focusableWidget = dijit.byNode(widgetNodes[i]);
            dijit.focus(focusableWidget.domNode);
            break;
         }
      }
      if (!focusableWidget) {
         if (current == "next") {
            this._isLastPage() ? dijit.focus(this.previousNode.childNodes[0]) : dijit.focus(this.nextNode.childNodes[0]);
         } else if (current == "previous") {
            this._isFirstPage() ? dijit.focus(this.nextNode.childNodes[0]) : dijit.focus(this.previousNode.childNodes[0]);
         }
      }
   },
   _togglePagingButtons: function() {

      if (this._isFirstPage() && this._isLastPage()) {
         // we're on the first page and this is the only page ==> hide next/previous buttons
         dojo.addClass(this.scrollControlNode, "lotusHidden");
      } else {
         dojo.removeClass(this.scrollControlNode, "lotusHidden");
         this._toggleNextButton();
         this._togglePreviousButton();
      }
   },

   _toggleNextButton: function() {
      // summary: enable/disable the next button      
      var nextText = this._resourceBundle.NEXT;
      if (this._isLastPage()) {
         this.nextNode.innerHTML = nextText;
         dojo.disconnect(this._nextLinkHandle);
      } else {
         this.nextNode.innerHTML = "";
         var node = dojo.create("a", {
            href: "javascript:;",
            role: "link",
            innerHTML: nextText
         }, this.nextNode);
         this._nextLinkHandle = dojo.connect(node, "onclick", this, "onNext");
         
      }
   },

   _togglePreviousButton: function() {
      // summary: enable/disable the next button 
      var previousText = this._resourceBundle.PREVIOUS;
      if (this._isFirstPage()) {
         this.previousNode.innerHTML = previousText;
         dojo.disconnect(this._previousLinkHandle);
      } else {         
         this.previousNode.innerHTML = "";
         var node = dojo.create("a", {
            href: "javascript:;",
            role: "link",
            innerHTML: previousText
         }, this.previousNode);
         //#121001 - JAWS announces onclick events as clickable, move event to DOM node vs. html template
         this._previousLinkHandle =  dojo.connect(node, "onclick", this, "onPrevious");
      }
   },

   _getFirstWidgetIndex: function() {
      // summary: obtain index of the first widget of the current page
      return this.AMOUNT_WIDGET_PER_PAGE * this._currentPageNumber;
   },

   _getLastWidgetIndex: function() {
      // summary: return index of the last widget on the current page
      return Math.min(this.AMOUNT_WIDGET_PER_PAGE * (this._currentPageNumber + 1), this._getTotalNumberWidgets()) - 1;
   },

   _getTotalNumberWidgets: function() {
      // summary: obtain the total number of widgets for this category
      var total = 0;

      if (this._items != null) {
         total = this._items.length;
      }

      return total;
   },

   _isLastPage: function() {
      return (((this._currentPageNumber + 1) * this.AMOUNT_WIDGET_PER_PAGE) >= this._items.length);
   },

   _isFirstPage: function() {
      return this._currentPageNumber == 0;
   }
});
