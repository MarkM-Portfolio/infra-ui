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
 * lconn.core.aria.Toolbar
 * 
 * ARIA helper class that implements the Toolbar pattern (http://www.w3.org/TR/wai-aria-practices/#toolbar)
 * 
 * Usage
 * =====
 * Instantiate by passing the container node with role='toolbar' as first argument.
 * Second argument is a dictionary of mix-in properties
 * 
 * Behavior
 * ========
 * The toolbar is a single tab stop. Focus is given to the active button first, then use arrow keys to move focus to other buttons.
 * Buttons are not activated as they're focused.
 * 
 * @see lconn.core.aria._Helper
 *  
 */
dojo.provide("lconn.core.aria.Toolbar");

dojo.require("lconn.core.aria._Helper");

dojo.declare("lconn.core.aria.Toolbar", lconn.core.aria._Helper, {
   /* WAI role of the container node to which the helper will be attached. Will throw exception if source node doesn't have this role */
   containerRole: "toolbar",
   /* WAI role of active items that are descendants of the helper's source node */
   itemRole: "button"
});
