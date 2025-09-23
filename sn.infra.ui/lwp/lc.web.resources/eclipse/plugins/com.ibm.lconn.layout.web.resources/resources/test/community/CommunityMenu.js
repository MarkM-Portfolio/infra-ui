/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.layout.test.community.CommunityMenu");

dojo.require("com.ibm.lconn.layout.test.community.Action");
dojo.require("com.ibm.lconn.layout.test.community.Edit");

dojo.requireLocalization("lconn.communities.bizCard", "ui");

dojo.declare("com.ibm.lconn.layout.test.community.CommunityMenu", [com.ibm.lconn.layout.test.community.Action], {
   hasChildren: true,
   
   constructor: function() {
	   this.name = this.nls["label.top.buttons.com.actions"];
	   this.tooltip = this.nls["label.top.buttons.com.action.menu"];
   },
   isVisible: function(selection, context) {
   	var community = this.getCommunity(selection, context);
   	return community && {member: 1, owner: 1}[community.role];
   },
   execute: function() {
   	var dfd = new dojo.Deferred();
   	var menu = new com.ibm.social.layout.Action();
   	menu.hasChildren = true;
   	menu.name = "Test menu";
   	dfd.callback([
         new com.ibm.lconn.layout.test.community.Edit(),
         menu
      ]);
   	return dfd;
   }
});
