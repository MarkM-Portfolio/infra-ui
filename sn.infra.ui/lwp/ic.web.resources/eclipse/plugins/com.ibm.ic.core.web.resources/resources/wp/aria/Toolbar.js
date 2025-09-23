/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo/_base/array',
   'dojo/_base/declare',
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/dom',
   'dojo/dom-attr',
   'dojo/dom-class',
   'dojo/dom-style',
   'dojo/on',
   'dojo/query',
   '../utils',
   'ic-ui/aria/Toolbar'
], function(array, declare, lang, windowModule, dom, domAttr, domClass, domStyle,
   on, query, utils, Toolbar) {

   var win = windowModule.global;

   /**
    * @class ic-core.WidgetPlacement.aria.Toolbar
    * @extends ic-ui.aria.Toolbar
    */
   var WpToolbar = declare(
      'lconn.core.WidgetPlacement.aria.Toolbar', 
      Toolbar, /** @lends ic-core.WidgetPlacement.aria.Toolbar.prototype */
   {
      selectedClassname : 'lotusSelected',
      connectToFirstLink : true,
      // connect the first link to the parent button
      selIdx : 0,
      // select the first button by default
      _oldIdx : 0,
      // previously selected item
      changeSelectOnClick : true,
      // flag to see if we should change the selection to the new node when
      // clicking on anchor

      setItemIdx : function(node, idx) {
         if (domAttr.get(node, 'role') === 'button') {
            domAttr.set(node, 'itemidx_', idx);
         }
         else {
            if (node.parentNode) {
               return this.setItemIdx(node.parentNode, idx);
            }
         }
      },

      getItemIdx : function(node) {
         ret = this.selIdx;
         if (domAttr.get(node, 'itemidx_') != null) {
            ret = domAttr.get(node, 'itemidx_');
         }
         else {
            if (node.parentNode) {
               return this.getItemIdx(node.parentNode);
            }
         }
         return ret;
      },

      constructor : function() {
         if (typeof win.lconncoreWidgetPlacementariaToolbar !== 'undefined') {
            win.lconncoreWidgetPlacementariaToolbar.destroy();
         }
         // FIXME: do not write to the global namespace
         win.lconncoreWidgetPlacementariaToolbar = this;

         this.inherited(arguments);
         if (this.connectToFirstLink) {
            var ai = this.allItems;
            var si = this.selIdx;

            // loop through all the items and prep them
            array.forEach(ai, lang.hitch(this, function(node, idx) {
               // Reset the state of all items to off/unpressed. We'll set
               // the default one later.
               // Also, set the idx to an atribute of the node so it can be
               // looked up later.
               this.setItemIdx(node, idx);
               if (domClass.contains(node, this.selectedClassname)) {
                  this.selIdx = idx;
               }
               this._pressItem(idx, false);

               // if we're already connecting to the first link, we don't
               // need to tab to it or anything.
               var linkNode = query('a', node)[0];
               domAttr.set(linkNode, 'tabindex', '-1');
               domAttr.remove(linkNode, 'aria-pressed');
               domClass.remove(linkNode, this.selectedClassname);

               if (this.changeSelectOnClick) {
                  this._connects.push(on(linkNode, 'click', lang.hitch(this, function(event) {
                     var newIdx = this.getItemIdx(linkNode);
                     this._pressItem(this._oldIdx, false);
                     this._pressItem(newIdx, true);
                     this._oldIdx = newIdx;
                  })));
               }

               this._connects.push(on(node, 'keypress', function(event) {
                  var code = null;
                  if (!event)
                     event = win.event;

                  if (event) {
                     code = event.keyCode || event.charCode;
                  }

                  if (code === keys.SPACE || code === keys.ENTER) {
                     try {
                        // click on the first link
                        var item = query('a', node)[0];
                        if (item) item.click();
                        event.preventDefault(), event.stopPropagation();
                     }
                     catch (ee) {
                     }
                  }
               }));
            }));

            // now select the first one...
            this._pressItem(this.selIdx, true);
            this._oldIdx = this.selIdx;
         }
      },

      // make sure the tab index is set properly
      _kickIn : function(item, i) {
         this.inherited(arguments);
         if (this.connectToFirstLink) {
            domAttr.set(item, 'tabindex', '0');
         }
      },

      // checks to see if the dom element or any of it's parents are hidden
      _nodeIsHidden : function(node) {
         var bHidden = false;
         try {
            while (node) {
               if (domStyle.get(node, 'display') === 'none') {
                  bHidden = true;
                  break;
               }
               node = node.parentNode;
            }
         }
         catch (ee) {
         }
         return bHidden;
      },

      // function to set/clear pressed state
      _pressItem : function(idx, yn) {
         if (idx >= 0) {
            var el = this.allItems[idx];
            if (el) {
               if (yn) {
                  domClass.add(el, this.selectedClassname);
                  domAttr.set(el, {
                     'aria-pressed' : 'true',
                     'tabindex' : '0'
                  });

                  // Defect 87720: Setting focus on the title bar because
                  // Jaws 14 will not read the screen
                  // if focus is in the left navigation.
                  var focusEl = dom.byId('lotusTitleBar');
                  // Defect 88922: We should only be setting the focus if the
                  // nav is visible.
                  if (focusEl && !this._nodeIsHidden(el)) {
                     focusEl.focus();
                  }

                  var title = _getTitleFromEle(el);
                  if (title) {
                     utils.setTitle(title);
                  }
               }
               else {
                  domClass.remove(el, this.selectedClassname);
                  domAttr.set(el, {
                     'aria-pressed' : 'false',
                     'tabindex' : '-1'
                  });
               }
            }
         }
      }
   });

   return WpToolbar;
});