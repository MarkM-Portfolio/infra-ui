/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.community");

com.ibm.lconn.layout.community = {
	get: function(community) {
		var dfd = new dojo.Deferred();
		setTimeout(dojo.hitch(dfd, "callback", dojo.mixin({name: "Deferred name"},community)), 1000);
		dfd.addCallback(function(value) {com.ibm.lconn.layout.page.data.community=value;});
		return dfd;
	},
	updateLocation: function(node) {
		var community = com.ibm.lconn.layout.page.data.community;
		node.label = community.name;
		return node;
	}
};
