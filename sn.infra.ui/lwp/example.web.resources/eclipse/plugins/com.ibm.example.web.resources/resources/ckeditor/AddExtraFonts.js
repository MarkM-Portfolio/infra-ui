/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {
	dojo.provide("com.ibm.example.ckeditor.AddExtraFonts");
	dojo.require("lconn.core.ckeditor");

	/**
	 * @namespace com.ibm.example.ckeditor
	 */

	/**
	 * This example shows how to add extra fonts to the CKEditor fonts menu.
	 * @namespace com.ibm.example.ckeditor.AddExtraFonts
	 */

	/**
	 * Adds two new fonts to any CKEditor instance in IBM Connections.
	 * CKEditor requires font definitions to be in this format:
	 * <code>&lt;font label 1&gt;/&lt;comma separated list of fonts 1&gt;;&lt;font label 2&gt;/&lt;comma separated list of fonts 2&gt;;...</code>
	 * @memberof com.ibm.example.ckeditor.AddExtraFonts
	 * @private
	 */
	function addExtraFonts() {
		var fonts = '', fallback = ',arial,helvetica,sans-serif';
		fonts += ";Lucida Grande/'lucida grande',tahoma,verdana" + fallback;
		fonts += ";Proxima Nova Light/'Proxima Nova Light','Helvetica Neue'" + fallback;
		// Append, not replace to current value of font_names
		CKEDITOR.config.font_names += fonts;
	}

	lconn.core.ckeditor.addCustomConfig(function() {
		addExtraFonts();
	});
})();
