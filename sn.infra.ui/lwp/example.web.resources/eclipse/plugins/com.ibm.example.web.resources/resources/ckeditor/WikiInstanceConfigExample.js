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
	dojo.provide("com.ibm.example.ckeditor.WikiInstanceConfigExample");
	dojo.require("lconn.wikis.scenes.CKEditor");
	
	/**
	 * This example shows how to override a method of an existing class, by storing a reference to the original method.
	 * @namespace com.ibm.example.ckeditor.WikiInstanceConfigExample
	 */
	
	// Store a reference to the original implementation
	var _createEditor = lconn.wikis.scenes.CKEditor.prototype.createEditor;
	
	dojo.extend(lconn.wikis.scenes.CKEditor, {
		createEditor: function(opt) {
			// Call original implementation
			_createEditor.apply(this, arguments);
			// Mess with the configuration post-facto
			this.editorInstance.config.width = '90%';
		}
	});
})();