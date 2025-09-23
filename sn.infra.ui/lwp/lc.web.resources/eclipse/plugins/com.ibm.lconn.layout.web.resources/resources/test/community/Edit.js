/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.test.community.Edit");

dojo.require("com.ibm.lconn.layout.test.community.Action");

dojo.declare("com.ibm.lconn.layout.test.community.Edit", [com.ibm.lconn.layout.test.community.Action], {
	isVisible: function(selection, context) {
   	return (this.getCommunity(selection, context).role == "owner");
   },
   getName: function(selection, context) {
   	return this.nls["label.top.buttons." + (this.getCommunity(selection, context).isSubcommunity ? "editsub" : "edit")];
   },
   execute: function(selection, context) {
   	var url = this.getBaseUrl(selection, context, true);
   	url.path += "/editcommunity";
   	window.location.href = url.toString();
   }
});
