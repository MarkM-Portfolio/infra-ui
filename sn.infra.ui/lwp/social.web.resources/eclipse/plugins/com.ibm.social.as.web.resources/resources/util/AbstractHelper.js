/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.AbstractHelper");

dojo.require("com.ibm.social.as.util.service.ServiceEventHandler");
dojo.require("com.ibm.social.as.util.xhr.XhrHandler");
dojo.require("com.ibm.social.as.util.RouteHelper");
dojo.require("com.ibm.social.as.util.DialogHelper");

/**
 * Abstracts functions that the Activity Stream needs. If the OpenSocial
 * gadget API is available, it will be used. Otherwise, normal Dojo APIs
 * will be called.
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.util.AbstractHelper", 
[com.ibm.social.as.util.service.ServiceEventHandler,
 com.ibm.social.as.util.RouteHelper,
 com.ibm.social.as.util.DialogHelper],
{
	constructor: function(){
		dojo.mixin(this, com.ibm.social.as.util.xhr.XhrHandler);
	}
});
