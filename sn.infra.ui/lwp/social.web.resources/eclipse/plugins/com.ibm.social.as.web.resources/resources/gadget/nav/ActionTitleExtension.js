/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.gadget.nav.ActionTitleExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.constants.events");
dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.gadget.nav.ActionTitleExtension", 
[com.ibm.social.as.extension.interfaces.IExtension],
{
	onLoad: function(){
		var strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
		var domNode = dojo.create("span");
		var title = dojo.string.substitute(strings.updatesFor, {0:asc.actionUser.displayName});
		dojo.create("h3", {"innerHTML":title, "class":"ASActiontitle"}, domNode);
		dojo.place(new com.ibm.social.as.gadget.nav.BackToMainButton().domNode, domNode);
		
		dojo.publish(com.ibm.social.as.constants.events.PLACEHOLDERADD,
				[com.ibm.social.as.view.placeholder.location.headerLeft, domNode]);
	},
	
	onUnload: function(){
		this.added = false;
 		dojo.publish(com.ibm.social.as.constants.events.PLACEHOLDERREMOVE,
 				[com.ibm.social.as.view.placeholder.location.headerLeft]);
	}
});
