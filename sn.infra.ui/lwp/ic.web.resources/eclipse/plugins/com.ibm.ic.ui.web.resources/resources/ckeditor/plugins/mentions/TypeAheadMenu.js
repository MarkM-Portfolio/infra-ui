/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
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
        "dojo/dom-construct",
        "dojo/dom-attr",
        "dojo/has",
        "dojo/dom-geometry",
        "dojo/dom-style",
        "dojo/window",
        "../../../util/openAround",
        "ic-core/PeopleTypeAhead",
        "ic-core/PeopleTypeAheadMenu",
        "ic-core/PeopleTypeAheadFormatMixin",
        "ic-core/TypeAhead",
        "ic-core/config/properties",
        "ic-core/lcTextArea/mixins/ITextBoxUtils"
],
   function(dojo, declare, lang, domConstruct, domAttr, has, domGeometry, domStyle, win, openAround, PeopleTypeAhead, PeopleTypeAheadMenu, PeopleTypeAheadFormatMixin, TypeAhead, properties, ITextBoxUtils) {
      var textBoxUtils = new ITextBoxUtils();

      /*
       * Fixes the size and relocates the TA
       */
      function fixTA(node, spaceAbove, textPos) {
                 
         // Reduces the size of the typeahead 
         var fixedHeight = domStyle.get(node, 'height') - 2;
         var locationOfTA = domGeometry.position(node);
         var scrolledDistanceToTop = win.getBox().t;
         var fixedStyle = {};
         var isRTL = !domGeometry.isBodyLtr();
   
         // Fixing the vertical position
         if ((spaceAbove | 0) > (locationOfTA.y | 0)) {
            // Space on top is not enough so we just decrease the height instead of moving it up
            if (locationOfTA.y < textPos.h) {
               fixedHeight = fixedHeight - textPos.h;
            }
            else {
               fixedStyle.top = locationOfTA.y - textPos.h + scrolledDistanceToTop + "px";
            }
         }
         fixedStyle.height = fixedHeight + "px";
   
         // Fixing the horizontal position
         if (isRTL && locationOfTA.x < 0) {
            // RTL language and there is no space on the left
            fixedStyle.right = win.getBox().w - locationOfTA.w + "px";
         }
         else if (locationOfTA.x + locationOfTA.w > win.getBox().w) {
            // the TA is wider that the space left on the right
            fixedStyle.left = win.getBox().w - locationOfTA.w + "px";
         }
   
         domStyle.set(node, fixedStyle);
      }

      /**
       * Typeahead menu for the CKEditor mentions plugin
       * 
       * @class ic-ui.ckeditor.plugins.mentions.TypeAheadMenu
       * @extends ic-core.PeopleTypeAheadFormatMixin
       */
      var TypeAheadMenu = declare("com.ibm.oneui.ckeditor.plugins.mentions.TypeAheadMenu", PeopleTypeAheadFormatMixin, /** @lends ic-ui.ckeditor.plugins.mentions.TypeAheadMenu.prototype */
      {
         focusNode : null,
         store : null,
         isShowing : false,
         inputWidget : {},
         /**
          * Flag to avoid the lost of editor focus after making a selection from the TA with the mouse
          * in IE8 only
          * 
          * @type Boolean
          */
         editorFocus : false,
         
         /**
          * flag to avoid IE8 menu closure when next, previous, or searchMore buttons are clicked.
          */
         cancelBlur : false,
         /**
          * Variable that defines the number of results shown in the TA
          * 
          * @type Integer
          */
         pageSize : properties["people.typeahead.pageSize"] || 15,
         constructor : function(params) {
            lang.mixin(this, params);
         },
         /**
          * Performs a search for matches
          * 
          * @param {Object}
          *           opts Search options
          */
         search : function(opts) {
            this.focusNode = {
               value : opts.input
            };
            if (!this.menu) {
               this.createMenu();
            }
            var dataObject = this.store.fetch({
               queryOptions : {
                  ignoreCase : true,
                  deep : true
               },
               query : opts.input,
               onComplete : lang.hitch(this, this.show, opts.node),
               onError : lang.hitch(this, function(errText) {
                  console.error('dijit.form.ComboBox: ' + errText);
                  this.hide();
               }),
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
            };
            this._nextSearch = this.menu.onPage = lang.hitch(this, nextSearch, dataObject);
            this.menu.searchDirectory = lang.hitch(this, lang.hitch(this, function() {
               // this._startSearch(key, {searchDirectory:true});
               dataObject.queryOptions.searchDirectory = true;
               this.store.fetch(dataObject);
            }));

         },

         /**
          * Creates the instance for the type-ahead menu
          */
         createMenu : function() {
            this.menu = new PeopleTypeAheadMenu({
               store : this.store,
               "class" : "typeAhead",
               disableBizCard : false,
               minChars : 2,
               multipleValues : false,
               searchDelay : 600,
               onSelect : lang.hitch(this, function() {
                  if (dojo.isIE >= 8 || textBoxUtils.isIE11){
                     this.editorFocus = true;
                  }
                  this.onSelect();
               }),
               HeaderMessage : this.typeaheadHeaderString || ''
            });
            domConstruct.place(document.createTextNode(this.menu.resBundle.rs_searchDirectory), this.menu.searchButton);
            this.menu.NoResultsMessage = this.menu.resBundle.rs_noResults;
            this.menu.inputWidget = {
               _announceOption : function(node) {
                  /* DO NOTHING */
                  return;
               }
            };
            this.menu.domNode.onKeyDown = lang.hitch(this, function() {
               this.onMenuKeyDown();
            });
         },

         /**
          * Shows the typeahead menu
          * 
          * @param {Node}
          *           node The node used to dock the typeahead menu
          * @param {Array}
          *           results The list of matches
          * @param {Object}
          *           kwArgs Options from the data store
          */
         show : function(node, results, kwArgs) {
            var framePos = domGeometry.position((node.ownerDocument.defaultView || node.ownerDocument.parentWindow).frameElement);
            var scrolledDistanceToTop = win.getBox().t;
            var textPos = domGeometry.position(node);
            var spaceAbove = framePos.y + textPos.y + textPos.h;
            var isRTL = !domGeometry.isBodyLtr();

            this.menu.createOptions(results, kwArgs, lang.hitch(this, "_getMenuLabelFromItem"));

            openAround(this.menu.id, undefined, {
               noFocus : true,
               orient : [
                         "below",
                         "above"
               ]
            }, undefined, {
               x : framePos.x + textPos.x,
               y : spaceAbove + scrolledDistanceToTop
            });
            // Move the TA to the left for RTL languages
            if (isRTL) {
               openAround(this.menu.id, undefined, {
                  noFocus : true,
                  orient : [
                            "below",
                            "above"
                  ]
               }, undefined, {
                  x : framePos.x + textPos.x - this.menu._popupWrapper.clientWidth,
                  y : spaceAbove + scrolledDistanceToTop
               });
            }

            this.isShowing = true;

            fixTA(this.menu._popupWrapper, spaceAbove, textPos);
         },

         _getMenuLabelFromItem : function() {
            return PeopleTypeAhead.prototype._getMenuLabelFromItem.apply(this, arguments);
         },

         /**
          * Hides the typeahead menu
          */
         hide : function() {
            if (this.menu) {
               dijit.popup.close(this.menu);
               this.isShowing = false;
            }
         },
         /**
          * Handles key down events on menu. Must be set by callers.
          * 
          * @param {Event}
          *           e The keyboard event
          */
         onMenuKeyDown : function(e) {
            return;
         },
         /**
          * Handles key up events on menu. Must be set by callers.
          * 
          * @param {Event}
          *           e The keyboard event
          */
         onMenuKeyPress : function(e) {
            return;
         },
         /**
          * Callback for selection
          */
         onSelect : function() {
            return;
         },
         /**
          * Focuses previous element in menu, or last if first one is focused
          */
         focusPrevious : function(node) {
            var highlightedOpt = this.getHighlightedOption();
            if (highlightedOpt) {
               if (highlightedOpt.previousSibling != this.menu.previousButton) {
                  this.menu._focusOptionNode(highlightedOpt.previousSibling);
               }
            }
            else {
               // Focuses last item in the list
               this.menu._focusOptionNode(this.menu.searchButton);
            }
            this.menu.selected = this.getHighlightedOption();
            domAttr.set(node, "aria-activedescendant", this.menu.selected.id);
         },
         /**
          * Focuses next element in menu, or first if last one is focused
          */
         focusNext : function(node) {
            var highlightedOpt = this.getHighlightedOption();
            if (highlightedOpt) {
               if (highlightedOpt.nextSibling != this.menu.nextButton) {
                  this.menu._focusOptionNode(highlightedOpt.nextSibling);
               }
            }
            else {
               // Focuses 1st item in the list
               this.menu._focusOptionNode(this.menu.previousButton.nextSibling);
            }
            this.menu.selected = this.getHighlightedOption();
            domAttr.set(node, "aria-activedescendant", this.menu.selected.id);
         },

         /**
          * Returns this menu's current highlighted option, or null if there's
          * no menu
          */
         getHighlightedOption : function() {
            return (this.menu && this.menu._highlighted_option) || null;
         },

         /**
          * Returns the value of this menu's current highlighted option
          */
         getCurrentValue : function() {
            var opt = this.getHighlightedOption();
            return has('ie') < 9 ? opt.innerText : opt.textContent;
         },

         /**
          * Returns the item of the current selected option
          */
         getSelectedItem : function() {
            var highlightedOption = this.getHighlightedOption();
            return (highlightedOption && this.menu.items[highlightedOption.getAttribute("item")]) || null;
         },

         /**
          * Returns the label that JAWS reads when TA opens
          */
         getTypeaheadLabel : function() {
            // FIXME: nls
            return "type ahead list box";
         },

         /**
          * Returns true if there are no matches displayed in the TA menu
          */
         noResultsFound : function() {
            return this.menu.items && !this.menu.items.length;
         },
         
         /**
          * Sets the header on the typeahead used to select a person.
          * 
          * @param {String}
          *           s Text for header of typeahead dropdown.
          */
         setTypeaheadHeader : function(s) {
            this.menu.HeaderMessage = s;
         }
      });

      return TypeAheadMenu;
   });
