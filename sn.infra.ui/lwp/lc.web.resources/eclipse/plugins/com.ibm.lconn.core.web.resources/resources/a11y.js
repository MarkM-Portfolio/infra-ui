/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.a11y");
/**
 * Add the "lotusImagesOff" class to the body element
 * if in high contrast mode.
 * @namespace lconn.core.a11y
 * @author Cameron J Bosnic <cjbosnic@us.ibm.com>
 */
dojo.addOnLoad(function() {
	var bodyElem = document.getElementsByTagName("body")[0];
	if (dojo.hasClass(bodyElem, "dijit_a11y")) {
		dojo.addClass(bodyElem, "lotusImagesOff");
		return;
	}

   // Firefox Quantum (starting with 57.0) changed the behavior by not marking url(/path/to/image) to be none or invalid-url, which makes dojo fail to defect when permission.default.image is set to 2. Images just fail to be loaded. This patch is to use error to defect the the mode.
	var match = navigator.userAgent.match(/Firefox\/([0-9]+)\./);
	var ver = match ? parseInt(match[1]) : 0;
   if (ver >= 57){
      var img = new Image();
      img.src = dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif");

      img.onerror = function() {
         dojo.addClass(bodyElem, "lotusImagesOff");
         console.warn("Failed to load test image. Add class lotusImagesOff to body.");
      };
   }
});
