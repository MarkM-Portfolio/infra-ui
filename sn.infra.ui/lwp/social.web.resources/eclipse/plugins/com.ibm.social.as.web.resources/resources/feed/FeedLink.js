/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.feed.FeedLink");

dojo.require("com.ibm.social.as.constants.events");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

/**
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.feed.FeedLink", 
[dijit._Widget, dijit._Templated],
{
	// Resource bundle
	strings: null,
	
	templatePath: dojo.moduleUrl("com.ibm.social.as", "feed/templates/feedLink.html"),
	
	postMixInProperties: function(){
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
	},
	
	postCreate: function(){
		// Hide the feed link whenever a new feed request is initiated
		this.subscribe(com.ibm.social.as.constants.events.UPDATESTATE, 
										dojo.hitch(this, "hide"));
		
		// Update the feed link whenever the feed is finally fetched
		this.subscribe(com.ibm.social.as.constants.events.FEEDFETCHED, 
										dojo.hitch(this, "onFeedFetched"));
	},
	
	onFeedFetched: function(url, destroyNewsFeed){
		// Only update the feed is the feed URL is a brand new page load
		// (in which case 'destroyNewsFeed' will be true).
		if(url && destroyNewsFeed){
			// Make sure we're showing in the UI
			this.show();
			
			// Change the format to XML (default is JSON) and append the count
			url = this.attachUrlQueryParam(url, "format", "atom");
			
			// All non-anonymous feeds should use basic auth
			// /opensocial/anonymous/rest --> /opensocial/anonymous/rest
			// /opensocial/basic/rest --> /opensocial/basic/rest
			// /opensocial/oauth/rest --> /opensocial/basic/rest
			// /opensocial/rest --> /opensocial/basic/rest
			if ( !url.match(/\/anonymous\/rest\//) ) {
				url = url.replace(/((\/basic)?(\/oauth)?\/rest\/)/, "/basic/rest/");
			}
			
			// Update the feed link href to point to this URL
			this.feedLinkNode.href = url;
		}
	},
	
	show: function(){
		dojo.removeClass(this.domNode, "lotusHidden");
	},
	
	hide: function(){
		dojo.addClass(this.domNode, "lotusHidden");
	},
	
	/**
	 * Attach a parameter to a URL
	 * @param url {String} URL to append the param to
	 * @param paramName {String} name of the parameter
	 * @param paramValue {String} value of the parameter
	 * @returns {String} URL with param attached
	 */
	attachUrlQueryParam: function(url, paramName, paramValue){
		// Check for a current param
		if(url.indexOf("?") != -1) {
			// If it already exists
			return url + "&" + paramName + "=" + paramValue;
		}else{
			// There isn't one
			return url + "?" + paramName + "=" + paramValue;
		}
	}
});
