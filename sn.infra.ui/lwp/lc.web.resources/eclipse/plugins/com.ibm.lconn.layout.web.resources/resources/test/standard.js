/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.test.standard");

dojo.require("com.ibm.lconn.layout.standard");
dojo.require("lconn.core.test.typeahead.FacesPeopleDataStore");
dojo.require("lconn.core.widget.autocomplete.person");

dojo.require("com.ibm.lconn.layout.community"); // FIXME: needs to be completed
dojo.require("com.ibm.lconn.layout.user"); // FIXME: needs to be completed

dojo.require("dijit.Dialog"); // FIXME: temporary dependency
dojo.require("dojo.hash"); // FIXME: may need to be optional

dojo.require("com.ibm.oneui.util.xhrintercept");
dojo.require("com.ibm.oneui.util.xhrproxy");

dojo.require("com.ibm.oneui.controls._caret"); // FIXME: Needed to get text selection

com.ibm.lconn.layout.test.suggest = {
	people: function() {
		var store = new lconn.core.test.typeahead.FacesPeopleDataStore();
		store.cache = {};
		return {
			store: store,
			messages: {
				suggestion: "See files belonging to people..."
			},
			renderer: lconn.core.widget.autocomplete.person
		};
	}
};
