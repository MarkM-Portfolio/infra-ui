/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"ic-as/util/DialogHelper",
		"ic-as/util/RouteHelper",
		"ic-as/util/service/ServiceEventHandler",
		"ic-as/util/xhr/XhrHandler"
	], function (declare, lang, DialogHelper, RouteHelper, ServiceEventHandler, XhrHandler) {
	
		/**
		 * Abstracts functions that the Activity Stream needs. If the OpenSocial
		 * gadget API is available, it will be used. Otherwise, normal Dojo APIs
		 * will be called.
		 * @author Robert Campion
		 */
		
		var AbstractHelper = declare("com.ibm.social.as.util.AbstractHelper", 
		[ServiceEventHandler,
		 RouteHelper,
		 DialogHelper],
		{
			constructor: function(){
				lang.mixin(this, XhrHandler);
			}
		});
		return AbstractHelper;
	});
