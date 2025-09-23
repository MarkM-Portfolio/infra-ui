/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.test.blog.BlogMenu");

dojo.require("com.ibm.lconn.layout.test.blog.Action");
dojo.require("com.ibm.lconn.layout.test.blog.Manage");

dojo.declare("com.ibm.lconn.layout.test.blog.BlogMenu", [com.ibm.lconn.layout.test.blog.Action], {
   hasChildren: true,
   
   constructor: function() {
	   this.name = "Blog Actions";
	   this.tooltip = null;
   },
   isVisible: function(selection, context) {
   	var blog = this.getBlog(selection, context);
   	return blog && {contributor: 1, member: 1, owner: 1}[blog.role];
   },
   execute: function() {
   	var dfd = new dojo.Deferred();
   	dfd.callback([
         new com.ibm.lconn.layout.test.blog.Manage()
      ]);
   	return dfd;
   }
});
