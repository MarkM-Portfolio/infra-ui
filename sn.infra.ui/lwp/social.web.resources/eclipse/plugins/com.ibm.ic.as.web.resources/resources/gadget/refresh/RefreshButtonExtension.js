/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/constants/events",
		"ic-as/extension/interfaces/IExtension",
		"ic-as/gadget/refresh/RefreshButton"
	], function (declare, events, IExtension, RefreshButton) {
	
		var RefreshButtonExtension = declare("com.ibm.social.as.gadget.refresh.RefreshButtonExtension", 
		IExtension,
		{
			onLoad: function(){
				var refreshBtton = new RefreshButton();
				topic.publish(events.PLACEHOLDERADD, com.ibm.social.as.view.placeholder.location.headerTopRight, refreshBtton.domNode);
			},
			
			onUnload: function(){
				this.added = false;
		 		topic.publish(events.PLACEHOLDERREMOVE, com.ibm.social.as.view.placeholder.location.headerTopRight);
			}
		});
		
		return RefreshButtonExtension;
	});
