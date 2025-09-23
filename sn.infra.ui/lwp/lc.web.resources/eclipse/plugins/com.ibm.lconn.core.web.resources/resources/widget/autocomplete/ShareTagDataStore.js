/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.autocomplete.ShareTagDataStore");
dojo.require("lconn.core.widget.autocomplete.TagDataStore");

dojo.declare("lconn.core.widget.autocomplete.ShareTagDataStore", lconn.core.widget.autocomplete.TagDataStore, {
	convert: function(response) {
		var items = response.items;
		for (var i=0,l=items.length; i<l; i++)
			items[i].count = items[i].weight;
		items.hasMore = response.hasMore;
		items.total = response.totalItems;
		return items;
	}
});
