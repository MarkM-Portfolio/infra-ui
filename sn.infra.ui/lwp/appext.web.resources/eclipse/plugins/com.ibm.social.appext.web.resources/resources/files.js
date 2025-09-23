/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {

/**
 * This object represents the public Javascript extension API for Connections Files
 */
var files_ext = dojo.provide("com.ibm.social.appext.files");

var btns = [];

/**
 * Adds a button to the File Summary page. Accepts a Button control as first argument, and an optional position relative to other buttons.
 * 
 * @param {com.ibm.oneui.controls.Button} btn Represents a button.
 * @param {string} pos Position of the button, can be one of “first”, ”last”, “only”.
 * @return {number} A handle representing the button.
 */
files_ext.addButton = function(btn, pos) {
   if (!btn)
      // Nothing to do here
      return;
   if (!pos)
      pos = "last";
   return btns.push({btn: btn, pos: pos}) - 1;
};

/**
 * Removes a button previously added to the File Summary page. Accepts a handle returned by #addButton.
 * 
 * @param {number} idx The handle representing the button, returned by #addButton
 */
files_ext.removeButton = function(idx) {
   if (!idx)
      // Nothing to do here
      return;
   btns.splice(idx, 1);
};

/**
 * Returns an array of extra buttons added to the File Summary page.
 * 
 */
files_ext.getButtons = function() {
   return btns;
};

})();
