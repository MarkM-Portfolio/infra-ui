/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
dojo.provide("net.jazz.ajax.ui.internal.HoverMenu");

dojo.require("jazz.ui.MenuPopup");

(function() {

dojo.declare("net.jazz.ajax.ui.internal.HoverMenu", [jazz.ui.MenuPopup], {
	constructor: function() {
		dojo.deprecated("net.jazz.ajax.ui.internal.HoverMenu is deprecated.", "Use jazz.ui.MenuPopup instead.", "3.0.1");
	}
});
})();