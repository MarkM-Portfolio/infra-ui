/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/lang",
      "dojo/dom",
      "dojo/dom-attr",
      "dojo/dom-class",
      "dojo/query",
      "./page",
      "ic-ui/util/Url"
], function(dojo, lang, dom, domAttr, domClass, query, page, Url) {

   return lang.mixin(lang.getObject("com.ibm.lconn.layout.user", true), {
      get : function() {
         var dfd = new dojo.Deferred();
         setTimeout(lang.hitch(dfd, "callback", {
            name : "Bob user",
            email : "random@random.com",
            id : "somerandomnumber"
         }), 1500);
         dfd.addCallback(function(value) {
            page.data.user = value;
         });
         return dfd;
      },
      update : function() {
         var user = page.data.user;
         var headerNode = dom.byId("headerMenuContainer");
         if (user) {
            dom.byId("headerUserName").appendChild(document.createTextNode(user.name));
            var moderation = dom.byId("lotusBannerModeration");
            if (moderation && user.isModerator) {
               moderation.style.display = "";
            }
            var a = dom.byId("lotusBannerCommunitiesLink");
            var href = new Url(a.href);
            href.getQuery().authenticated = true;
            domAttr.set(a, "src", href.toString());
            dom.byId("loginLink").style.display = "none";
         }
         else {
            dom.byId("headerUserText").style.display = "none";
            var settings = dom.byId("headerSettingsLi");
            if (settings) {
               settings.style.display = "none";
            }
            dom.byId("logoutLink").style.display = "none";
         }

         var items = query("li", headerNode);
         items.forEach(function(el) {
            domClass.remove(el, "lotusFirst");
         });
         domClass.add(items[0], "lotusFirst");

         headerNode.style.display = "";
      }
   });
});
