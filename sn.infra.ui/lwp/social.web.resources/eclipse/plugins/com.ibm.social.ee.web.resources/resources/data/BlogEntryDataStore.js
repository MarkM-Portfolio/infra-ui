/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.data.BlogEntryDataStore");

dojo.require("com.ibm.social.ee.data.EntryDataStore");
dojo.require("com.ibm.social.ee.bean.BlogEntry");
dojo.require("com.ibm.social.ee.util.misc");

dojo.declare("com.ibm.social.ee.data.BlogEntryDataStore", [com.ibm.social.ee.data.EntryDataStore], {

	itemFromDocEl: function(el, base) {
		var entry = this._createBean(el, base);
		var id = com.ibm.social.ee.util.misc.getItemId(entry.getId());
		if (id === "empty") {
			var error = new Error();
			error.code = error.type ="ItemNotFound";
			throw error;
		}
		return entry;
	},

	_createBean: function(el, base) {
	   return new com.ibm.social.ee.bean.BlogEntry(el, base);
	},

	dataLoaded: function (request, doc, ioArgs, opts) {
		try {
			this.inherited(arguments);
		}
		catch (error) {
			this.dataError(request, error);
		}
	}

});
