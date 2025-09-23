/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.autocomplete.ProfilesTagDataStore");
dojo.require("lconn.core.widget.autocomplete.TagDataStore");

dojo.declare("lconn.core.widget.autocomplete.ProfilesTagDataStore", lconn.core.widget.autocomplete.TagDataStore, {
	getValue: function(item, attr, defaultValue) {
		if (attr == "name")
			return item.name;
		return defaultValue;
	}
});
