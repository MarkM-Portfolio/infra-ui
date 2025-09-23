/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

/**
 * ARIA helper class that implements the Toolbar pattern.
 * See {@link http://www.w3.org/TR/wai-aria-practices/#toolbar|WAI-ARIA 1.0 Authoring Practices} for more details.
 * 
 * <h3>Usage</h3>
 * Instantiate by passing the container node with role='toolbar' as first argument.
 * Second argument is a dictionary of mix-in properties
 * 
 * <h3>Behavior</h3>
 * The toolbar is a single tab stop. Focus is given to the active button first, then use arrow keys to move focus to other buttons.
 * Buttons are not activated as they're focused.
 * 
 * @see {@link com.ibm.oneui.util.aria._Helper}
 * @class com.ibm.oneui.util.aria.Toolbar
 * @extends com.ibm.oneui.util.aria._Helper
 * @author Claudio Procida <procidac@ie.ibm.com> 
 */
dojo.provide("com.ibm.oneui.util.aria.Toolbar");

dojo.require("com.ibm.oneui.util.aria._Helper");

dojo.declare("com.ibm.oneui.util.aria.Toolbar", com.ibm.oneui.util.aria._Helper, /** @lends com.ibm.oneui.util.aria.Toolbar.prototype */ {
   /** WAI role of the container node to which the helper will be attached. Will throw exception if source node doesn't have this role */
   containerRole: "toolbar",
   /** WAI role of active items that are descendants of the helper's source node */
   itemRole: "button"
});
