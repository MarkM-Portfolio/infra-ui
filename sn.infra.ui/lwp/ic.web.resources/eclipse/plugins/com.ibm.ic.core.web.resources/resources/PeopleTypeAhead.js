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
      "dojo/dom-construct",
      "dojo/has",
      "dojo/_base/declare",
      "dojo/text!./templates/ComboBox.html",
      "dojo/_base/lang",
      "dojo/on",
      "dojo/query",
      "dojo/dom-class",
      "dojo/dom-geometry",
      "dojo/string",
      "dojo/dom-style",
      "dojo/keys",
      "dojo/_base/array",
      "dojo/topic",
      "dijit/Tooltip",
      "dijit/form/ComboBox",
      "dijit/form/_ComboBoxMenu",
      "./Res",
      "./TypeAhead",
      "./PeopleTypeAheadMenu",
      "./PeopleTypeAheadFormatMixin",
      "ic-core/config/properties"
],
   function(dojo, domAttr, domConstruct, has, declare, template, lang, on, queryModule, domClass, domGeometry, string, domStyle, keys, array, topic, Tooltip, ComboBox, _ComboBoxMenu, Res, TypeAhead, PeopleTypeAheadMenu, PeopleTypeAheadFormatMixin, properties) {

      /**
       * @class ic-core.PeopleTypeAhead
       * @author Ryan Silva <rsilva@us.ibm.com>
       */
      var PeopleTypeAhead = declare("lconn.core.PeopleTypeAhead", [
            TypeAhead,
            Res,
            PeopleTypeAheadFormatMixin
      ], {
         isGroup : false,
         isPersonAndGroup : false,
         isCommunity : false,
         size : "",
         // default pageSize = 15. if no configuration property defined
         pageSize : properties["people.typeahead.pageSize"] ? properties["people.typeahead.pageSize"] : 15,
         multipleValues : false,
         NoResultsMessage : '',
         HeaderMessage : '',
         showHintText : true,
         disableSearchDirectory : false,
         autoSelectChars : [ ","
         ],
         focused : false,
         // mark if the input dom has the focus
         templateString : null,
         templateString : template,
         disableBizCard : false,

         postMixInProperties : function() {
            this.loadDefaultBundle();
            this.searchDirectory = this.resBundle.rs_searchDirectory;
            if (this.isGroup) {
               this.searchDirectory = this.resBundle.rs_searchGroupDirectory;
            }
            else if (this.isCommunity) {
               this.searchDirectory = this.resBundle.rs_searchCommunityDirectory;
            }
            else if (this.isPersonAndGroup) {
               this.searchDirectory = this.resBundle.rs_searchPersonAndGroupDirectory;
            }

            if (this.showHintText) {
               this.hintText = this.resBundle.rs_shadowText_searchDirectory;

               if (this.isGroup) {
                  // hintText is defined in "lconn.core.TypeAhead"
                  this.hintText = this.resBundle.rs_shadowText_searchGroupDirectory;
               }
               else if (this.isCommunity) {
                  // hintText is defined in "lconn.core.TypeAhead"
                  this.hintText = this.resBundle.rs_shadowText_searchCommunityDirectory;
               }
               else if (this.isPersonAndGroup) {
                  // hintText is defined in "lconn.core.TypeAhead"
                  this.hintText = this.resBundle.rs_shadowText_searchPersonAndGroupDirectory;
               }
            }
            else {
               this.hintText = null;
            }

            this.inherited(arguments);
            this.baseClass = "lotusText";
         },

         postCreate : function() {
            this.inherited(arguments);

            // RTC#69640 - add aria-describedby to name type ahead fields
            var ariaDescribedByText = this.resBundle.rs_shadowText_searchDirectory;
            if (this.isGroup) {
               ariaDescribedByText = this.resBundle.rs_shadowText_searchGroupDirectory;
            }
            else if (this.isCommunity) {
               ariaDescribedByText = this.resBundle.rs_shadowText_searchCommunityDirectory;
            }
            else if (this.isPersonAndGroup) {
               ariaDescribedByText = this.resBundle.rs_shadowText_searchPersonAndGroupDirectory;
            }

            var node = domConstruct.place('<div id="' + this.id + '_ariaDescribedBy' + '" style="display:none;">' + ariaDescribedByText + '</div>',
               this.domNode,
               "after");
            domAttr.set(this.domNode, "aria-describedby", this.id + '_ariaDescribedBy');
         },

         // Convenience function to return the item or null if there isn't one.
         getItem : function() {
            return (this.item ? this.item : null);
         },

         // overrides the '_onKey' of TypeAhead (onKeyDown handler)
         _onKey : function( /* Event */evt) {
            // summary:
            // Handles keyboard events

            this.inherited(arguments); // inherits from TypeAhead
            //Sets the text back to what the user was typing.
            if(this.focusNode.value && this._currentInput && this.focusNode.value != this._currentInput && evt.keyCode !== dojo.keys.ENTER){
               this.focusNode.value = this._currentInput;
               
               //Fix for defect 162826 sets the cursor to the end
               if(has("ie") || (!!navigator.userAgent.match(/Trident\/7\./)))
               {         
                  var element = this.focusNode;
                  element.focus();
                  var range = element.createTextRange();
                  range.collapse(false);
                  range.select();
               }
            }
            
            switch (evt.keyCode) {
               case keys.PAGE_DOWN:
               case keys.DOWN_ARROW:
               case keys.PAGE_UP:
               case keys.UP_ARROW:
                  if (this._opened) {
                     // Keystroke caused ComboBox_menu to move to a different
                     // item.
                     // Copy new item to <input> box.
                     this._popupWidget._focusOptionNode(this._popupWidget.getHighlightedOption());
                  }
                  break;
               case keys.ENTER:
                  var pw = this._popupWidget;
                  if (pw.getHighlightedOption() == pw.searchButton) {
                     // the user select "Person not listed? Use full search..."
                     pw.searchDirectory();
                  }
                  break;
            }
         },

         _onFocus : function( /* Event */evt) {
            this.inherited(arguments);
            this.focused = true;
         },

         _onBlur : function( /* Event */evt) {
            this.focused = false;

            // if focus is on bizcard, not close people typeahead menu
            var pw = this._popupWidget;
            if (!(pw && pw.tooltipFocused)) {
               this.inherited(arguments);
            }

            // RTC: 87198 - Have to remove this style when typeahead loses focus
            // otherwise it interferes with other popups
            if (has("ie") && this.dropdownNode) {
               domClass.remove(this.dropdownNode, "lconnTypeAhead");
            }
            this.updateHintText();
         },

         _startSearch : function( /* String */key, opt) {
            opt = opt || {};

            if (opt.searchImmediately) {
               opt.searchBoth = true;
            }

            var popupId = this.id + "_popup";
            if (!this._popupWidget) {
               this._popupWidget = this.dropDown = new PeopleTypeAheadMenu({
                  _strings : this._strings,
                  rs_searchDirectory : this.searchDirectory,
                  NoResultsMessage : this.NoResultsMessage,
                  HeaderMessage : this.HeaderMessage,
                  disableSearchDirectory : this.disableSearchDirectory,
                  onChange : lang.hitch(this, this._selectOption),
                  id : popupId,
                  inputWidget : this,
                  disableBizCard : this.disableBizCard
               });

               // waiRole, waiState
               var role = this.textbox.getAttribute("wairole");
               if (role) {
                  dijit.setWaiRole(this.textbox, role);
               }
               dijit.setWaiState(this._popupWidget.domNode, "live", "polite");
               dijit.removeWaiState(this.focusNode, "activedescendant");
               // dijit.setWaiState(this.textbox, "owns", popupId); // associate
               // popup with textbox
            }
            else {
               dijit.setWaiState(this.focusNode, "activedescendant", popupId);
            }

            // create a new query to prevent accidentally querying for a hidden
            // value from FilteringSelect's keyField
            this.item = null; // #4872
            var query = lang.clone(this.query); // #5970
            this._lastQuery = query = key;
            // #5970: set _lastQuery, *then* start the timeout
            // otherwise, if the user types and the last query returns before
            // the timeout,
            // _lastQuery won't be set and their input gets rewritten
            // this.searchTimer=setTimeout(dojo.hitch(this, function(query,
            // _this){
            this.searchTimer = this.defer(lang.hitch(this, function(query, _this) {
               var dataObject = this.store.fetch({
                  queryOptions : lang.mixin({
                     ignoreCase : this.ignoreCase,
                     deep : true
                  }, opt),
                  query : query,
                  onComplete : lang.hitch(this, "_openResultList"),
                  onError : function(errText) {
                     console.error('dijit.form.ComboBox: ' + errText);
                     lang.hitch(_this, "_hideResultList")();
                  },
                  start : 0,
                  count : this.pageSize
               });

               var nextSearch = function(dataObject, direction) {
                  dataObject.start += dataObject.count * direction;
                  // #4091:
                  // tell callback the direction of the paging so the screen
                  // reader knows which menu option to shout
                  dataObject.direction = direction;
                  this.store.fetch(dataObject);
               }
               this._nextSearch = this._popupWidget.onPage = lang.hitch(this, nextSearch, dataObject);
               this._popupWidget.searchDirectory = lang.hitch(this, lang.hitch(this, function() {
                  // this._startSearch(key, {searchDirectory:true});
                  dataObject.queryOptions.searchDirectory = true;
                  this.store.fetch(dataObject);
               }));

            }, query, this), opt.searchImmediately ? 1 : this.searchDelay);
         },

         _openResultList : function( /* Object */results, /* Object */dataObject) {
            if (this.disabled || this.readOnly || (dataObject.query != this._lastQuery)) {
               return;
            }
            this._popupWidget.clearResultList();

            if (results.length) {
               // Fill in the textbox with the first item from the drop down
               // list,
               // and highlight the characters that were auto-completed. For
               // example, if user typed "CA" and the drop down list appeared,
               // the
               // textbox would be changed to "California" and "ifornia" would
               // be
               // highlighted.
               var zerothvalue = new String(this.formatItem(results[0]));
               if (zerothvalue && this.autoComplete && !this._prev_key_backspace && (dataObject.query != "")) {
                  // when the user clicks the arrow button to show the full
                  // list,
                  // startSearch looks for "*".
                  // it does not make sense to autocomplete
                  // if they are just previewing the options available.
                  this._autoCompleteText(zerothvalue);
               }
            }
            dataObject._maxOptions = this._maxOptions;
            this._popupWidget.createOptions(results, dataObject, lang.hitch(this, "_getMenuLabelFromItem"));

            this.results = results;

            // RTC 88769 - State of global sharebox esc key handler is not set
            // properly
            // This is happening because the form.ComboBox always calls a
            // hideResultsList
            // in the showResultsList function, but this is unnecessary and
            // causes
            // issues with our publish open/close methods. Here we remove the
            // hideResultList
            // functionality before calling the show method, then restore it
            // afterwards.
            var hideFunction = ComboBox.prototype._hideResultList;
            ComboBox.prototype._hideResultList = function() { /* do nothing */
            };

            // show our list (only if we have content, else nothing)
            this._showResultList();

            ComboBox.prototype._hideResultList = hideFunction;

            // Moving the header message out of the list of items
            domConstruct.place(this._popupWidget.headerNode, this._popupWidget.domNode, "before");

            domAttr.set(this._popupWidget.domNode.parentNode, "aria-label", "Type Ahead");
            domAttr.remove(document.activeElement, "aria-owns")
            // #125526 we need to restore the old logic. No item is pre-selected
            // when the typeahead popup is displayed
            this._popupWidget.selected = null;

            // In IE, body will get focus if set node visibility into hidden,
            // so that focusNode will lose focus causing its onBlur never hit,
            // then the pop-up widget will never close. Reset focus here.
            if (has("ie") && (this.focusNode != document.activeElement) && !this.focusNode.preventFocus)
               this.focusNode.focus();

            // #4091:
            // tell the screen reader that the paging callback finished by
            // shouting the next choice
            if (dataObject.direction) {
               if (1 == dataObject.direction) {
                  this._popupWidget.highlightFirstOption();
               }
               else if (-1 == dataObject.direction) {
                  this._popupWidget.highlightLastOption();
               }
            }
         }
      });

      return PeopleTypeAhead;

   });
