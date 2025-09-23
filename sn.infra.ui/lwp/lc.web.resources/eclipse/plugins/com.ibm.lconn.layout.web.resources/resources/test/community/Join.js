/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.test.community.Join");

dojo.require("com.ibm.lconn.layout.test.community.Action");

dojo.requireLocalization("lconn.communities.bizCard", "ui");

dojo.declare("com.ibm.lconn.layout.test.community.Join", [com.ibm.lconn.layout.test.community.Action], {
   getName: function(selection, context) {
   	var community = this.getCommunity(selection, context);
   	return this.nls[community.restricted ? "label.top.buttons.requestToJoin" : "label.top.buttons.join"];
   },
   isVisible: function(selection, context) {
   	var community = this.getCommunity(selection, context);
   	return community && !community.role;
   },
   execute: function(selection, context) {
   	var url = this.getBaseUrl(selection, context, true);
   	url.path += "/joincommunity";
   	window.location.href = url.toString();
   }
});
