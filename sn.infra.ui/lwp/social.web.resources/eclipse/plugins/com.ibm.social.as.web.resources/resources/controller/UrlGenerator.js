/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.controller.UrlGenerator");

dojo.require("dojo.string");

/**
 * Class that generates and controls the AS URL for the controller.
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.controller.UrlGenerator", null,
{
	// The current state object to hold the state of AS
	currentState: null,
	
	/**
	 * Constructor for this class.
	 * @param options - must contain defaultUrlTemplateValues
	 */
	constructor: function(options){
		
		this.currentState = {
				params: {}, 
				urlTemplate: ""
			};
		
		// Mix the options in with this class
		if(options){
			dojo.mixin(this, options);
		}
		
		// Set the currentState params to be whatever is in the default templates
		this.currentState.params = dojo.clone(this.getUrlParams());
		
		// Set the URL template
		var urlTemplate = "";
		
		var co = com.ibm.social.as.configManager.getConfigObject();
		if(co && co.defaultUrlTemplate){
			// if template provide by config, to override default, use that
			urlTemplate = co.defaultUrlTemplate;
		}else{
			// else generate based on service url for opensocial
			urlTemplate = lconn.core.url.getServiceUrl(lconn.core.config.services.opensocial)
								+ (window.asc && asc.useOAuth ? "/oauth" : "" )
								+ "/rest/activitystreams/${userId}/${groupId}/${appId}/${itemId}";
		}
		
		// Store the urlTemplate
		this.currentState.urlTemplate = urlTemplate;
	},
	
	/**
	 * Update the currentState object with URL Obj passed in.
	 * If the passed URL object contains the 'url' property,
	 * that value will be used as the currentState.urlTemplate
	 * URL object should contain a 'params' or 'url' property.
	 * @param urlObj - Object containing URL properties
	 * object's type
	 */
	attachUrlPart: function(urlObj){
		// If there is no url or urlPart, return
		if(!urlObj.url && !urlObj.params){
			return
		}
		
		// If there is a 'url' property
		if(urlObj.url){
			// Use it as the main URL
			// This allows consumers to override the templating
			// method of building URLs, and provide a full one
			// e.g. for third-party filters
			this.currentState.urlTemplate = urlObj.url;
			return;
		}
		
		// Mixin in the passed parameters with the currentState parameters.
		// Old params will be overridden.
		dojo.mixin(this.currentState.params, urlObj.params);
	},
	
	/**
	 * Attach a parameter to a URL
	 * @param url - URL to append the param to
	 * @param paramName - name of the parameter
	 * @param paramValue - value of the parameter
	 * @returns {String} URL with param attached
	 */
	attachUrlQueryParam: function(url, paramName, paramValue){
		// Check for a current param
		if(url.indexOf("?") != -1) {
			// If it already exists
			return url + "&" + paramName + "=" + encodeURIComponent(paramValue);
		}else{
			// There isn't one
			return url + "?" + paramName + "=" + encodeURIComponent(paramValue);
		}
	},
		
	/**
	 * Generate the URL according to currentState object. 
	 * @returns url {String} the generated URL
	 */
	getCurrentUrl: function(){
		var url = this.currentState.urlTemplate;
		var params = this.currentState.params;
		
		//Iterate through the params and either replace the urlTemplate
		// or append the param as a query param.
		for(var param in params){
			// If the current URL contains a template for this param
			if(url.indexOf("${" + param + "}") != -1){
				// Substitute it out for the value of the param
				url = url.replace("${" + param + "}", params[param]);
			}else{
				// Just attach the param to the URL
				url = this.attachUrlQueryParam(url, param, params[param]);
			}
		}
		
		// remove any un-filled parameters (with preceding /)
		url = url.replace(/\/\$\{[\w]*\}/, "");
		
		// Return the built URL
		return url;
	},
	
	getUrlParams: function(){
		return com.ibm.social.as.configManager.getDefaultUrlTemplateValues();
	},
	
	/**
	 * Reset the params back to their defaults
	 */
	resetUrl: function(){
		this.currentState.params = dojo.clone(this.getUrlParams());
	},
	
	/**
	 * Reset the currentState object and attach a URL part.
	 * Usually called at the start of the building process.
	 * @param urlObj
	 */
	resetUrlAttachUrlPart: function(urlObj){
		this.resetUrl();
		this.attachUrlPart(urlObj);
	}
});
