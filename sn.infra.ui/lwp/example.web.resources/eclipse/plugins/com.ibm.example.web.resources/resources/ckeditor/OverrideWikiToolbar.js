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
	dojo.provide("com.ibm.example.ckeditor.OverrideWikiToolbar");
	dojo.require("lconn.wikis.ckeditor");
	dojo.require("lconn.core.ckeditor");

	/**
	 * This example shows how to modify the toolbar definition of Wikis.
	 * @namespace com.ibm.example.ckeditor.OverrideWikiToolbar
	 */

	lconn.core.ckeditor.addCustomConfig(function() {
		dojo.mixin(CKEDITOR.config, {
			toolbar_Wiki: [{
				name: 'tools',
				items: ['Undo', 'Redo', 'MenuPaste', 'Find', 'LotusSpellChecker', 'ShowBlocks']
			}, {
				name: 'custom',
				items: ['Foo', 'Bar']
			}, // Adds an extra toolbar group with two buttons
			{
				name: 'styles',
				items: ['Format', 'Font', 'FontSize', 'Bold', 'Italic', 'Underline', 'Strike', 'TextColor', 'BGColor', 'Subscript', 'Superscript', 'RemoveFormat']
			}, {
				name: 'paragraph',
				items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'NumberedList', 'BulletedList', 'Indent', 'Outdent', 'Blockquote', 'BidiLtr', 'BidiRtl']
			}, {
				name: 'paragraph',
				items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'NumberedList', 'BulletedList', 'Indent', 'Outdent', 'Blockquote', 'BidiLtr', 'BidiRtl']
			}, {
				name: 'insert',
				items: ['Table', 'WikiImage', 'MenuLink', 'QuickLink', 'WikiMacros', 'Anchor', 'Iframe', 'Flash', 'PageBreak', 'HorizontalRule', 'SpecialChar', 'Smiley']
			}]
		});

		// Adds two extra plugins
		lconn.core.ckeditor.addExtraPlugin('foo');
		lconn.core.ckeditor.addExtraPlugin('bar');
	});
})();
