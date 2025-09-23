/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.gadget.refresh.RefreshButtonExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.constants.events");

dojo.declare("com.ibm.social.as.gadget.refresh.RefreshButtonExtension", 
[com.ibm.social.as.extension.interfaces.IExtension],
{
	onLoad: function(){
		var refreshBtton = new com.ibm.social.as.gadget.refresh.RefreshButton();
		dojo.publish(com.ibm.social.as.constants.events.PLACEHOLDERADD,
				[com.ibm.social.as.view.placeholder.location.headerTopRight, refreshBtton.domNode]);
	},
	
	onUnload: function(){
		this.added = false;
 		dojo.publish(com.ibm.social.as.constants.events.PLACEHOLDERREMOVE,
 				[com.ibm.social.as.view.placeholder.location.headerTopRight]);
	}
});
