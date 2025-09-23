/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.test.community.Action");

dojo.require("com.ibm.oneui.util.Url");
dojo.require("com.ibm.social.layout.Action");
dojo.require("lconn.core.config.services");

dojo.requireLocalization("lconn.communities.bizCard", "ui");

dojo.declare("com.ibm.lconn.layout.test.community.Action", [com.ibm.social.layout.Action], {
   nls: dojo.i18n.getLocalization("lconn.communities.bizCard", "ui"),

   getCommunity: function(selection, context) {
   	return context.community;
   },
   getBaseUrl: function(selection, context, toCommunity) {
   	var url = new com.ibm.oneui.util.Url(lconn.core.config.services.communities[com.ibm.oneui.util.Url.secure ? "secureUrl" : "url"]);
   	if (toCommunity) {
   		url.path += "/service/html";
   		url.getQuery().communityUuid = this.getCommunity(selection, context).id;
   	}
   	return url;
   }
});
