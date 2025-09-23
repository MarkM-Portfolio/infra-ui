/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.test.blog.Action");

dojo.require("com.ibm.oneui.util.Url");
dojo.require("com.ibm.social.layout.Action");
dojo.require("lconn.core.config.services");

dojo.declare("com.ibm.lconn.layout.test.blog.Action", [com.ibm.social.layout.Action], {

   getBlog: function(selection, context) {
   	return context.blog;
   },
   getBaseUrl: function(selection, context) {
   	var url = new com.ibm.oneui.util.Url(lconn.core.config.services.blogs[com.ibm.oneui.util.Url.secure ? "secureUrl" : "url"]);
   	return url;
   }
});
