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

define([
	"dojo",
	"dojo/dom-class",
	"dojo/domReady!"
], function (dojo, domClass) {

	
	/**
	 * Add the "lotusImagesOff" class to the body element
	 * if in high contrast mode.
	 * @namespace ic-core.a11y
	 * @author Cameron J Bosnic <cjbosnic@us.ibm.com>
	 */
	var bodyElem = document.getElementsByTagName("body")[0];
	if (domClass.contains(bodyElem, "dijit_a11y")) {
		domClass.add(bodyElem, "lotusImagesOff");
	}
});
