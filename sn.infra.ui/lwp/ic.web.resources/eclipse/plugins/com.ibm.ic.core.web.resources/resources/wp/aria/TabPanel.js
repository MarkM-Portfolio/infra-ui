/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo/_base/array',
   'dojo/_base/declare',
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/dom-attr',
   'dojo/dom-class',
   'dojo/dom-style',
   'dojo/on',
   'dojo/query',
   'ic-ui/aria/TabPanel'
], function(array, declare, lang, windowModule, domAttr, domClass, domStyle, on,
   query, TabPanel) {

   var win = windowModule.global;

   /**
    * @class ic-core.WidgetPlacement.aria.TabPanel
    * @extends ic-ui.aria.TabPanel
    */
   var WpTabPanel = declare(
      'lconn.core.WidgetPlacement.aria.TabPanel', 
      TabPanel, /** @lends ic-core.WidgetPlacement.aria.TabPanel.prototype */
      {
         selectedClassname : 'lotusSelected',
         connectToFirstLink : false,
         // connect the first link to the parent button
         selIdx : 0,
         // select the first tab by default
         _prevIdx : 0,
         // holds the previously selected tab

         constructor : function() {
            this.inherited(arguments);
            var ai = this.allItems;
            var si = this.selIdx;

            // loop through all the items and prep them
            array.forEach(ai, lang.hitch(this, function(node, idx) {
               domStyle.set(node, {
                  cursor : 'pointer'
               });

               this._connects.push(on(node, 'click', lang.hitch(this, function(event) {
                  this.selIdx = idx;
                  this._setItemVisuals();
               })));

               if (this.connectToFirstLink) {
                  try {
                     // if we're already connecting to the first link, we don't
                     // need to tab to it.
                     domAttr.set(query('a', node)[0], 'tabindex', '-1');
                  }
                  catch (ee) {
                  }

                  this._connects.push(on(node, 'click', lang.hitch(this, function(event) {
                     try {
                        var item = query('a', node)[0];
                        if (win.document.createEvent) {
                           var evt = win.document.createEvent('HTMLEvents');
                           evt.initEvent('click', false, true);
                           item.dispatchEvent(evt);
                        }
                        else { // IE
                           item.fireEvent('onclick');
                        }
                     } catch (e) {
                     }
                  })));
               }
            }));

            // now select the first one...
            this._selectItem(this.selIdx, true);
            this._activate(ai[this.selIdx]);
         },

         /**
          * Activates an item by firing a click event
          */
         _activate : function(item, forceLink) {
            if (forceLink || !this.connectToFirstLink) {
               return this.inherited(arguments);
            }
            else {
               return this._activate((query('a', item)[0]), true);
            }
         },

         _setItemVisuals : function() {
            var ai = this.allItems;
            var si = this._prevIdx;

            if (this.selIdx != this._prevIdx) {
               domClass.remove(ai[this._prevIdx], this.selectedClassname);
               domAttr.set(ai[this._prevIdx], {
                  'tabindex' : '-1',
                  'aria-selected' : 'false'
               });
            }

            domClass.add(ai[this.selIdx], this.selectedClassname);
            domAttr.set(ai[this.selIdx], {
               'tabindex' : '0',
               'aria-selected' : 'true'
            });

            this._prevIdx = this.selIdx;
         },

         _selectItem : function(si, bSkipFocus) {
            if ('undefined' === typeof bSkipFocus) {
               bSkipFocus = false;
            }

            this._prevIdx = si;
            this._setItemVisuals();

            this.inherited(arguments);

            if (!bSkipFocus) {
               this.allItems[this.selIdx].focus();
            }
         }
      });

   return WpTabPanel;
});