/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.gadget.viewnav.ASGadgetViewTopNavExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.social.as.filter.FilterContainer");

dojo.declare("com.ibm.social.as.gadget.viewnav.ASGadgetViewTopNavExtension", 
[com.ibm.social.as.extension.interfaces.IExtension],
{
	added: false,
	
	onLoad: function(){
		var container = com.ibm.social.as.filter.FilterContainer.prototype;
		container.asNarrowMode = true;
		if ( asc.util.getViewCount() > 1 ) {
			this.added = true;
			var topNav = new com.ibm.social.as.gadget.viewnav.ASGadgetViewTopNav({ configObject: asc.cfg });
			dojo.publish(com.ibm.social.as.constants.events.PLACEHOLDERADD,
					[com.ibm.social.as.view.placeholder.location.headerTopLeft, topNav.domNode]);
		}
	},
	
	onUnload: function(){
		if ( this.added ) {
			this.added = false;
	 		dojo.publish(com.ibm.social.as.constants.events.PLACEHOLDERREMOVE,
	 				[com.ibm.social.as.view.placeholder.location.headerTopLeft]);
		}
	}
});
