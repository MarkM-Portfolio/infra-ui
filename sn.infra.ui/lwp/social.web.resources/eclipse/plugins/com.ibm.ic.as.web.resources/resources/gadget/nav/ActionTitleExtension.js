/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/dom-construct",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/string",
		"ic-as/constants/events",
		"ic-as/extension/interfaces/IExtension",
		"ic-as/gadget/nav/BackToMainButton"
	], function (dojo, declare, domConstruct, i18nactivitystream, string, events, IExtension, BackToMainButton) {
	
		var ActionTitleExtension = declare("com.ibm.social.as.gadget.nav.ActionTitleExtension", 
		IExtension,
		{
			onLoad: function(){
				var strings = i18nactivitystream;
				var domNode = domConstruct.create("span");
				var title = string.substitute(strings.updatesFor, {0:asc.actionUser.displayName});
				domConstruct.create("h3", {"innerHTML":title, "class":"ASActiontitle"}, domNode);
				domConstruct.place(new BackToMainButton().domNode, domNode);
				
				topic.publish(events.PLACEHOLDERADD, com.ibm.social.as.view.placeholder.location.headerLeft, domNode);
			},
			
			onUnload: function(){
				this.added = false;
		 		topic.publish(events.PLACEHOLDERREMOVE, com.ibm.social.as.view.placeholder.location.headerLeft);
			}
		});
		
		return ActionTitleExtension;
	});
