/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo",
        "dojo/dom-geometry",
        "dojo/topic",
        "dijit/focus",
        "dijit/popup",
        "dijit/registry"
], function(dojo, domGeometry, topic, focusUtil, popup, registry) {

   /**
    * Opens a dijit pointed by menuId (typically a dijit.Menu) in a popup placed
    * around the node in evt.target typically called on a onclick event in the
    * page, es:
    * <p>
    * &lt;a onclick=&quot;com.ibm.oneui.util.openAround('id of your menu', this,
    * null, event)&quot;&gt;Click me&lt;/a&gt;
    * <p>
    * You can also use dojo.connect to bind it programmatically to a DOM node.
    * 
    * @function openAround
    * @memberof ic-ui.util
    * @param {String|Ref}
    *           menuId DOM id or dijit.Menu object
    * @param {Node}
    *           [openedBy] Explicit DOM node to orient the menu around. If it is
    *           null or undefined, the event target will be used instead
    * @param {Object}
    *           [opt] Map of other options controlling display. May be null or
    *           undefined.
    * @param {Event}
    *           evt
    * @param {Object}
    *           {x, y} coordinates to orient the menu around.
    */
   return function(menuId, openedBy, opt, evt, coords) {
      var menu = registry.byId(menuId);

      // standardize the event (fix cross-browser differences)
      if (evt) {
         evt.preventDefault();
         evt.stopPropagation();
      }

      // If the menu was showing just prior to this function call, don't re-show
      // the menu. Just clear the flag and return.
      if (menu && menu.preventReopen) {
         menu.preventReopen = menu.wasShowing = false;
         return;
      }

      // store the DOM of the action link that opened the menu
      if (evt && !openedBy) {
         openedBy = evt.target;
      }

      // NEW: closes and restores focus when popup is executed or cancelled
      // removes need to have onClose do the focus
      function closeAndRestoreFocus() {
         // user has clicked on a menu or popup
         try {
            focusUtil.focus(openedBy);
         }
         catch (ignore) {
            // Do nothing if this fails
         }
         popup.close(menu);
      }

      if (coords && coords.x && coords.y) {
         // open the menu, place it relative to the (x, y) coordinates
         popup.open({
            popup : menu,
            x : coords.x,
            y : coords.y,
            orient : (opt && opt.orient ? opt.orient : (domGeometry.isBodyLtr() ? {
               'BL' : 'TL',
               'BR' : 'TR',
               'TL' : 'BL',
               'TR' : 'BR'
            } : {
               'BR' : 'TR',
               'BL' : 'TL',
               'TR' : 'BR',
               'TL' : 'BL'
            })),
            onExecute : closeAndRestoreFocus,
            onCancel : closeAndRestoreFocus
         });
      }
      else {
         // open the menu, place it relative to the target position of the node
         popup.open({
            popup : menu,
            around : openedBy,
            orient : (opt && opt.orient ? opt.orient : (domGeometry.isBodyLtr() ? {
               'BL' : 'TL',
               'BR' : 'TR',
               'TL' : 'BL',
               'TR' : 'BR'
            } : {
               'BR' : 'TR',
               'BL' : 'TL',
               'TR' : 'BR',
               'TL' : 'BL'
            })),
            onExecute : closeAndRestoreFocus,
            onCancel : closeAndRestoreFocus
         });
      }

      if (!(opt && opt.noFocus)) {
         menu.focus();
      }

      // close the menu when the user click outside the menu
      if (!menu._blurCloseHandler) {
         menu._blurCloseHandler = menu.connect(menu, "_onBlur", function() {
            // Remember the menu was showing long enough for the mousedown
            // handler to prevent closing and reopening with a single click
            menu.wasShowing = menu.isShowingNow;
            setTimeout(function() {
               menu.wasShowing = false;
            }, 1);
            popup.close(menu);
         });
      }
   };
});
