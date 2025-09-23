/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.test.community.FollowMenu");

dojo.require("com.ibm.lconn.layout.test.community.Action");

dojo.requireLocalization("lconn.communities.bizCard", "ui");

dojo.declare("com.ibm.lconn.layout.test.community.FollowMenu", [com.ibm.lconn.layout.test.community.Action], {
   hasChildren: true,

   constructor: function() {
      this.name = this.nls["label.top.buttons.follow.menu"];
   },
   getUser: function(selection, context) {
      var user = context.user;
      if (!user) {
         user = dojo.getObject("com.ibm.lconn.layout.page.data.user");
      }
      return user;
   },
   isVisible: function(selection, context) {
      return !!this.getUser(selection,context);
   },
   execute: function() {
      var dfd = new dojo.Deferred();
      dfd.callback([
         new com.ibm.social.layout.Action().mixin({name: "Test 1"}),
         new com.ibm.social.layout.Action().mixin({name: "Test 2"})
      ]);
      return dfd;
   }
});
