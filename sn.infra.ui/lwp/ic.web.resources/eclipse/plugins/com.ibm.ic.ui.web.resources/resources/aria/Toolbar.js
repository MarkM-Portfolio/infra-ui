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

define([
	"dojo/_base/declare",
	"./_Helper"
], function (declare, _Helper) {

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
	 * @see {coreui.aria._Helper}
	 * @class ic-ui.aria.Toolbar
	 * @extends ic-ui.aria._Helper
	 */
	var Toolbar = declare("com.ibm.oneui.aria.Toolbar", _Helper, /** @lends ic-ui.aria.Toolbar.prototype */ {
	   /** WAI role of the container node to which the helper will be attached. Will throw exception if source node doesn't have this role */
	   containerRole: "toolbar",
	   /** WAI role of active items that are descendants of the helper's source node */
	   itemRole: "button"
	});
	return Toolbar;
});
