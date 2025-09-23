/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.test.blog.Manage");

dojo.require("com.ibm.lconn.layout.test.blog.Action");

dojo.declare("com.ibm.lconn.layout.test.blog.Manage", [com.ibm.lconn.layout.test.blog.Action], {
	//isVisible: function(selection, context) {
   //	return (this.getBlog(selection, context).role == "owner");
   //},
   getName: function(selection, context) {
   	return "Manage this Blog";
   },
   execute: function(selection, context) {
   	//var url = this.getBaseUrl(selection, context, true);
   	//url.path += "/manage.jsp";
   	window.location.href = "manage.jsp" + (context.community ? ("?communityUuid="+encodeURIComponent(context.community.id)) : "");
   }
});
