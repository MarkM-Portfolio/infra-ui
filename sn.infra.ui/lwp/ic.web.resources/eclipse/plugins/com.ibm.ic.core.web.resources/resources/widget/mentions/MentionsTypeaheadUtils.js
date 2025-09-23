/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/array",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/aspect"
], function (dojo, array, declare, lang, aspect) {

   
   /**
    * Mixin for mention typeahead utilities
    * 
    * @mixin ic-core.widget.mentions.MentionsTypeaheadUtils
    * @author Piyush K Agarwal <pagarwal@us.ibm.com>
    */
   var MentionsTypeaheadUtils = declare("lconn.core.widget.mentions.MentionsTypeaheadUtils", null, /** @lends ic-core.widget.mentions.MentionsTypeaheadUtils.prototype */
   {
      _registeredTypes : null,
      _activeType : null,
   
      // register a mentionsType, but only register if a particular
      // type doesn't exist already.
      registerActivatorType : function(mentionsType) {
         if (!this._registeredTypes) {
            this._registeredTypes = [];
         }
   
         var isRegistered = array.some(this._registeredTypes, function(item) {
            return item._type == mentionsType._type;
         });
   
         if (!isRegistered) {
            this._registeredTypes.push(mentionsType);
            var templateClass = mentionsType.templateClass;
            if (!dojo.exists(templateClass)) {
               // FIXME: do not require classes at runtime
               dojo.require(templateClass);
            }
         }
         else {
            this.printDebug("Type: " + mentionsType._type + " has already been registered, please remove existing registration.");
         }
      },
   
      // unregister a mentionsType, and clean up any associated dom
      // nodes
      unregisterActivatorType : function(type) {
         var indexesToRemove = [];
   
         array.forEach(this._registeredTypes, function(item, i) {
            if (item._type == type) {
               indexesToRemove.push(i);
            }
         });
   
         for (i = 0; i < indexesToRemove.length; i++) {
            var removedType = this._registeredTypes.splice(indexesToRemove[i], 1);
            removedType.destroy();
         }
      },
   
      // FIXME: move to MentionsKeyHandlers
      isTrackedKeyCode : function(e) {
         var isTrackedKey = false;
         var activeType = null;
         var _this = this;
   
         if (e.keyCode == 16) {
            e.charCode = 58;
         }
   
         if (!this._isTracking && (e.charCode || e.keyCode) && e.charCode != dojo.keys.SPACE && e.keyCode != dojo.keys.ENTER) {
            this._lastActivatorTrack += String.fromCharCode(e.charCode);
         }
         else if (e.keyCode != (dojo.keys.BACKSPACE || dojo.keys.DELETE)) {
            var curSel = this.getSelection();
            var sel = curSel.selection;
            var range = curSel.range;
            var container = range.endContainer;
            var next = null;
   
            while (container && container.nodeType == 3 && container.parentNode == this.textAreaNode && container.data == ""
                  && this.textAreaNode.childNodes.length > 0) {
               next = container.previousSibling;
               this.textAreaNode.removeChild(container);
               container = next;
            }
   
            // FIXME: relevant side effect in method that is supposed to check if a key code is tracked
            var contentNode;
            if (!this.disableURLPreview) {
               var URLPreviewContainer = container && container.data == '\u200B' && container.previousSibling && container.previousSibling.data ? container.previousSibling : container;
               contentNode = this.detectURL(URLPreviewContainer);
            }
   
            if (contentNode && contentNode != this.textAreaNode && contentNode.parentNode != null) {
               range.setStartAfter(contentNode);
               range.setEndAfter(contentNode);
               sel.removeAllRanges();
               sel.addRange(range);
               this.saveSelectionIE(sel);
            }
            this._lastActivatorTrack = "";
         }
   
         if (!this.disableMentions && this._registeredTypes) {
            array.some(this._registeredTypes, function(item) {
               if (_this.enableActivateAnyKey) {
                  isTrackedKey = !(((e.ctrlKey || e.metaKey) && !e.altKey && e.charCode != 0) || _this.isRightArrow(e)
                        || (e.charCode || e.keyCode) == dojo.keys.SPACE || _this.isLeftArrow(e) || _this.isRightArrow(e) || _this.isUpDownArrow(e)
                        || _this.isEscape(e) || _this.isTab(e) || _this.isBoldHotkey(e) || _this.isItalicsHotkey(e) || _this.isUnderlineHotkey(e)
                        || _this.isPasteHotkey(e) || _this.isBackspace(e) || _this.isDelete(e) || _this.isCtrlEnter(e) && _this.isEnter(e));
               }
               else if (item._activatorChar) {
                  isTrackedKey = (e.charCode || e.keyCode) == item._activatorChar.charCodeAt(0);
               }
               // FIXME: dead code
               else if (item._activatorString) {
                  isTrackedString = (item._activatorString == this._lastActivatorTrack);
               }
   
               if (isTrackedKey) {
                  activeType = item;
                  return true;
               }
               else {
                  activeType = null;
               }
            });
   
            if (activeType) {
               if (this._activeSelectMouseEvent) {
                  this._activeSelectMouseEvent.remove();
               }
               this._activeType = activeType;
               if (this.getActiveType_Field())
                  this._activeSelectMouseEvent = aspect.after(this.getActiveType_Field(), "_selectOption", lang.hitch(this, this.selectOption), true);
            }
         }
   
         return isTrackedKey;
      },
   
      handleActiveType_KeyPress : function(e) {
   
      },
   
      handleActiveType_HideResults : function() {
         if (this._activeType) {
            this._activeType.hideResults();
         }
      },
   
      handleTypeaheadKeyInput : function() {
         var pw = this.getActiveType_Popup();
         if (pw) {
            var curNode = this._currentNode;
            var value = curNode.value;
            var highLightedOpt = pw.getHighlightedOption();
            if (highLightedOpt) {
               var activeFieldID = this.getActiveType_Field().id;
               var item = pw.items[highLightedOpt.getAttribute('item')]
               // Item from the typeahead results selected
               if (item) {
                  if (array.indexOf([ activeFieldID + "_popup_searchDir", activeFieldID + "_popup_resultsNode" ], highLightedOpt.id) === -1) {
                     this.completeMention(item);
                     // fix to scroll to the new line
                     this.textAreaNode.scrollTop = curNode.domNode.offsetTop - this.textAreaNode.offsetTop;
                  }
               }
               // "Person not listed? Use full search..." Selected
               else if (highLightedOpt.id == (activeFieldID + "_popup_searchDir")) {
                  pw.searchDirectory();
                  pw._blurOptionNode();
               }
               // If an item is not selected, highlight the first option
               // in the Typeahead Popup ---- Review: Is this necessary?
            }
            else {
               this.handleUpDownArrow();
            }
         }
      },
   
      /**
       * Returns a value of vertical offset to adjust the position of the typeahead menu with respect to the typeahead field.
       */
      getActiveType_VOffset : function() {
         return this._activeType && lang.isFunction(this._activeType.getVOffset) && this._activeType.getVOffset() || 0;
      },
   
      getActiveType_Field : function() {
         return this._activeType && lang.isFunction(this._activeType.getTypeaheadField) ? this._activeType.getTypeaheadField() : null;
      },
   
      getActiveType_Popup : function() {
         return this._activeType ? this._activeType.getTypeaheadPopup() : null;
      },
   
      getActiveType_Results : function() {
         return this._activeType ? this._activeType.getTypeaheadResults() : null;
      },
   
      getActiveType_IsShowing : function() {
         return this._activeType ? this.getActiveType_Field()._opened : false;
      },
   
      getActiveType_NodeTemplateClass : function() {
         return this._activeType ? this._activeType.templateClass : null;
      },
   
      setActiveType_FieldValue : function(text) {
         if (this._activeType) {
            this._activeType.setTypeaheadValue(text);
         }
      }
   });
   
   return MentionsTypeaheadUtils;
});
