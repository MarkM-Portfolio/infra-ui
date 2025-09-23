/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/topic"
], function (topic) {

	define([
		"dojo/_base/declare",
		"ic-as/constants/events",
		"ic-as/extension/interfaces/IExtension",
		"ic-as/filter/FilterContainer",
		"ic-as/gadget/viewnav/ASGadgetViewTopNav"
	], function (declare, events, IExtension, FilterContainer, ASGadgetViewTopNav) {
	
		var ASGadgetViewTopNavExtension = declare("com.ibm.social.as.gadget.viewnav.ASGadgetViewTopNavExtension", 
		IExtension,
		{
			added: false,
			
			onLoad: function(){
				var container = FilterContainer.prototype;
				container.asNarrowMode = true;
				if ( asc.util.getViewCount() > 1 ) {
					this.added = true;
					var topNav = new ASGadgetViewTopNav({ configObject: asc.cfg });
					topic.publish(events.PLACEHOLDERADD, com.ibm.social.as.view.placeholder.location.headerTopLeft, topNav.domNode);
				}
			},
			
			onUnload: function(){
				if ( this.added ) {
					this.added = false;
			 		topic.publish(events.PLACEHOLDERREMOVE, com.ibm.social.as.view.placeholder.location.headerTopLeft);
				}
			}
		});
		
		return ASGadgetViewTopNavExtension;
	});
});
