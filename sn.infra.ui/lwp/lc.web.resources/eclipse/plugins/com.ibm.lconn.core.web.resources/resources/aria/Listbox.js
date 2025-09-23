/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

/**
 * lconn.core.aria.Listbox
 * 
 * ARIA helper class that implements the Listbox pattern (http://www.w3.org/TR/wai-aria-practices/#listbox)
 * 
 * Usage
 * =====
 * Instantiate by passing the container node with role='listbox' as first argument.
 * Second argument is a dictionary of mix-in properties
 * 
 * Behavior
 * ========
 * The lsit is a single tab stop. Focus is given to the active button first, then use arrow keys to move focus to other buttons.
 * Buttons are not activated as they're focused.
 * 
 * @see lconn.core.aria._Helper
 * 
 */
dojo.provide("lconn.core.aria.Listbox");

dojo.require("lconn.core.aria._Helper");

dojo.declare("lconn.core.aria.Listbox", lconn.core.aria._Helper, {
   /* WAI role of the container node to which the helper will be attached. Will throw exception if source node doesn't have this role */
   containerRole: "listbox",
   /* WAI role of active items that are descendants of the helper's source node */
   itemRole: "option"
});
