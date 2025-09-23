define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/gadget/_EEGadget"
], function (declare, lang, _EEGadget) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2012                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	var _SimpleEEGadget = declare("com.ibm.social.ee.gadget._SimpleEEGadget", _EEGadget, {
	   constructor: function(opts) {
	      lang.mixin(this, opts);
	   }
	});
	return _SimpleEEGadget;
});