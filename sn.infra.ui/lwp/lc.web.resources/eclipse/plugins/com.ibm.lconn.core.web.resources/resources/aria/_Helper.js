/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * lconn.core.aria._Helper
 * 
 * Abstract ARIA helper class that adds keyboard behavior to existing underlying markup
 * 
 * This is an abstract base class and it should not be instantiated directly
 * 
 * @see lconn.core.aria.TabPanel
 * @see lconn.core.aria.Toolbar
 * 
 */
dojo.provide("lconn.core.aria._Helper");

/**
 * FIXME: make a wrapper of {@link com.ibm.oneui.util.aria._Helper}
 * 
 * @class lconn.core.aria._Helper
 */
dojo.declare("lconn.core.aria._Helper", null, /** @lends lconn.core.aria._Helper.prototype */ {
   /* Array of associated active items, e.g. tabs in a tab panel */
   allItems: null,
   /* Index of keyboard selection within items */
   selIdx: -1,
   /* Store the return values of dojo.connect() for later cleanup */
   _connects: null,
   /* Flag to detect inverted DOM and visual layout, used to set inverted keyboard focusing order */
   detectInvert: false,
   /* Flag to invert keyboard focusing order */
   invert: false,
   /* Flag to cycle items, i.e. moving focus past last item will assign focus to first item */
   cycle: true,
   /* WAI role of the container node to which the helper will be attached. Will throw exception if source node doesn't have this role */
   containerRole: "",
   /* WAI role of active items that are descendants of the helper's source node */
   itemRole: "",
   /* Flag to enable up and down arrow keys to select items */
   scrollVertical: true,
   /* Flag to enable left and right arrow keys to select items */
   scrollHorizontal: true,
   
   constructor: function(srcNodeRef, opts) {
      dojo.safeMixin(this, opts || {});
      
      this._connects = [];
      
      var cn = this.containerNode = this._getNode(srcNodeRef),
         ai = this.allItems = dojo.query(["[role='", this.itemRole, "']"].join(""), cn),
         dfe = dojo.forEach;
      /* Auto detect inversion */
      if (this.detectInvert)
         dfe(ai, dojo.hitch(this, this._detectInvert));

      /* Gets index of currently selected item */
      for (var i=0, item; item = ai[i]; i++) {
         if (this._isSelected(item)) {
            this.selIdx = i;
            break;
         }
      } 
      
      /* Gets index of first focusable item */
      if (this.selIdx == -1)
         this.selIdx = this._getSelIdx(!this.invert);
      
      /* Pushes inactive items out of tab index */
      dfe(ai, dojo.hitch(this, this._resetItem, ai[this.selIdx]));
      /* Attaches click handlers */
      this._connects.push(dojo.connect(cn, "onclick", this, "_onItemClick"));
      /* Attaches key handler */
      this._connects.push(dojo.connect(cn, "onkeydown", this, "_onKeyDown"));
   },
   destroy: function() {
      dojo.forEach(this._connects, dojo.hitch(dojo, dojo.disconnect));
   },
   /**
    * Focuses the current item, or the first item if there is not a current one
    */
   focus: function() {
      if (this.selIdx >= 0)
         dijit.focus(this.allItems[this.selIdx]);
      else
         this.focusNextItem();
   },
   /**
    * Assigns focus to next item, generally as a result of a key event
    * Removes all items from tabbing order except focused item
    */
   focusNextItem: function() {
      this._focusItem(!this.invert);
   },
   /**
    * Assigns focus to previous item, generally as a result of a key event
    * Removes all items from tabbing order except focused item
    */
   focusPrevItem: function() {
      this._focusItem(this.invert);
   },
   /**
    * Calculates index of next item that will receive focus, then if different
    * from current one, moves current one out of tabbing order, pushes new one in
    * and focuses it, reassigns value of selIdx
    */
   _focusItem: function(fwd) {
      var ai = this.allItems, si = this._getSelIdx(fwd);
      if (si != this.selIdx) {
         this._kickOut(ai[this.selIdx]);
         this._kickIn(ai[si]);
         dijit.focus(ai[si]);
         this.selIdx = si;
      }
   },
   /**
    * Gets a reference to and validates the source node to attach the helper to
    */
   _getNode: function(srcNodeRef) {
      var node = dojo.byId(srcNodeRef);
      if (!node)
         throw [this.declaredClass, ": " + srcNodeRef, " is not a valid node or id"].join("");
      if (!dijit.hasWaiRole(node, this.containerRole))
         throw [this.declaredClass, " needs a source node with role='", this.containerRole, "'"].join("");
      return node;
   },
   /**
    * Moves the item out of tab index to prevent it from obtaining focus
    */
   _kickOut: function(item, i) {
      dojo.attr(item, "tabindex", -1);
   },
   /**
    * Moves the item back into tab index and gives it focus
    */
   _kickIn: function(item, i) {
      dojo.removeAttr(item, "tabindex");
   },
   /**
    * Adjusts tab index of active items
    */
   _onItemClick: function(e) {
      var idx = this._getIndexOfItemFromEvent(e);
      if (idx != -1) {
        this.selIdx = idx;
        var tgt = this.allItems[idx];
        dojo.forEach(this.allItems, dojo.hitch(this, this._resetItem, tgt));
      }
   },
   
   /**
    * Finds index of target for event in allItems by traversing DOM
    * from event target up to container node.
    * Returns null if no valid target has been found 
    */
   _getIndexOfItemFromEvent: function(e) {
      var idx = -1, tgt;
      do {
         tgt = tgt ? tgt.parentNode : e.target;
         idx = dojo.indexOf(this.allItems, tgt);
      } while (idx == -1 && tgt && tgt != this.containerNode);
      return idx;
   },
   /**
    * Handles key events for this widget
    */
   _onKeyDown:function(e) {
      var dk = dojo.keys;

      // We are not interested in events with modifiers
      if (e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return;

      var nextArrow = dojo._isBodyLtr() ? dk.RIGHT_ARROW : dk.LEFT_ARROW;
      var prevArrow = dojo._isBodyLtr() ? dk.LEFT_ARROW : dk.RIGHT_ARROW;
      
      switch (e.keyCode) {
         case this.scrollHorizontal ? nextArrow : -1:
         case this.scrollVertical ? dk.DOWN_ARROW : -1:
            dojo.stopEvent(e);
            this.focusNextItem();
            break;
         case this.scrollHorizontal ? prevArrow : -1:
         case this.scrollVertical ? dk.UP_ARROW : -1:
            dojo.stopEvent(e);
            this.focusPrevItem();
            break;
      }
   },
   /**
    * Restores the pristine state of items to match current selection
    */
   _resetItem: function(sel, item, i) {
      if (item == sel) {
         this._kickIn(item);
      } else {
         this._kickOut(item);
      }
   },
   /**
    * Uses a supposedly smart algorithm to detect whether the DOM and visual layout orders are inverted
    * Will fail if some active items are floated and some aren't 
    */
   _detectInvert: function(item, i) {
      var ps = [], pp = item, n = 0;
      do {
         ps.push(dojo.style(pp, "float"));
         pp = pp.parentNode;
      } while (pp != this.containerNode && n++ < 10);
      var rh = (dojo._isBodyLtr() ? "right" : "left");
      if (dojo.indexOf(ps, rh) != -1) {
         this.invert = true;
      }
   },
   
   /**
    * Return true if the given item is selected.
    * Abstract implementation should be overridden.
    */
   _isSelected: function(item) {
      return false;
   },
   
   /**
    * Returns true if the given item is hidden
    */
   _isHidden: function(item) {
      var cn = this.containerNode;
      var n = item;
      while (n && n != cn) {
         if (dojo.style(n, "display") == "none" || dijit.getWaiState(n, "hidden") == "true")
            return true;
         n = n.parentNode;
      }
      return false;
   },
   
   /**
    * Gets index of next focusable item, e.g. skipping invisible items
    */
   _getSelIdx: function(/* Boolean */ fwd) {
      var n = 0, c = this.allItems.length, r = this.selIdx;
      do {
         r = fwd ? this._nextSelIdx(r) : this._prevSelIdx(r);
      } while (this._isHidden(this.allItems[r]) && n++ < c);
      return r;
   },
   /**
    * Returns previous selection index taking into account current DOM inversion, bidi and cycling settings
    */
   _prevSelIdx: function(selIdx) {
      var ret = -1;
      if (this.cycle) {
         ret = selIdx - 1;
         if (ret < 0) ret = this.allItems.length - 1;
      } else {
         ret = Math.max(0, selIdx - 1);
      }
      return ret;
   },
   /**
    * Returns next selection index taking into account current DOM inversion, bidi and cycling settings
    */
   _nextSelIdx: function(selIdx) {
      var ret = -1;
      if (this.cycle) {
         ret = selIdx + 1;
         if (ret >= this.allItems.length) ret = 0;
      } else {
         ret = Math.min(this.allItems.length - 1, selIdx + 1);
      }
      return ret;
   }
});
