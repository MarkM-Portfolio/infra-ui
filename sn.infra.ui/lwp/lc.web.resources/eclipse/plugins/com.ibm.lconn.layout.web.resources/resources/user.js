/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.user");

dojo.require("com.ibm.oneui.util.Url");

com.ibm.lconn.layout.user = {
	get: function() {
		var dfd = new dojo.Deferred();
		setTimeout(dojo.hitch(dfd, "callback", {
			name: "Bob user",
			email: "random@random.com",
			id: "somerandomnumber"
		}), 1500);
		dfd.addCallback(function(value) {com.ibm.lconn.layout.page.data.user=value;});
		return dfd;
	},
	update: function() {
		var user = com.ibm.lconn.layout.page.data.user;
		var headerNode = dojo.byId("headerMenuContainer");
		if (user) {
         dojo.byId("headerUserName").appendChild(document.createTextNode(user.name));
         var moderation = dojo.byId("lotusBannerModeration");
         if (moderation && user.isModerator) {
            moderation.style.display = "";
         }
         var a = dojo.byId("lotusBannerCommunitiesLink");
         var href = new com.ibm.oneui.util.Url(a.href);
         href.getQuery().authenticated = true;
         dojo.attr(a, "src", href.toString());
         dojo.byId("loginLink").style.display = "none";
		}
      else {
         dojo.byId("headerUserText").style.display = "none";
         var settings = dojo.byId("headerSettingsLi");
         if (settings) {
            settings.style.display = "none";
         }
         dojo.byId("logoutLink").style.display = "none";
      }
		
      var items = dojo.query("li", headerNode);
      items.forEach(function(el) {dojo.removeClass(el, "lotusFirst");});
      dojo.addClass(items[0], "lotusFirst");
      
		headerNode.style.display = "";
	}
};
