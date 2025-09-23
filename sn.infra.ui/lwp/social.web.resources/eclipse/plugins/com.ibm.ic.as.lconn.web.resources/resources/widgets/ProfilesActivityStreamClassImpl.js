/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/lang",
	"dojo/dom",
	"dijit/registry",
	"ic-as/ActivityStream",
	"ic-as/util/xhr/XhrHandler",
	"ic-core/theme",
	"ic-sharebox/ContextualSharebox"
], function (lang, dom, ActivityStream, XhrHandler, theme, ContextualSharebox) {

	XhrHandler.init(); // empty init since we're in Connections and can use dojo's xhr
												  // outside class scope to make sure called only once.
	
	lang.extend(com.ibm.social.as.lconn.widgets.ProfilesActivityStreamClass, {
	
		activityStream: null,
		
		/**
		 * Called when the iWidget has loaded.
		 */
		onLoad: function(){
			as_console_debug("com.ibm.social.as.lconn.widgets.ProfilesActivityStreamClassImpl onLoad");
	
			
			this.loadCSS();
			
			// Create the sharebox.
			new ContextualSharebox({
				newsSvcUrl : lconn.core.url.getServiceUrl(lconn.core.config.services.news),
				context : {	
					resourceId : profilesData.displayedUser.userid,
					resourceType : "person"
				}
			}, dom.byId("shareboxContainer"));
			
			// Attach the ActivityStream dijit for Profiles onto the page
			this.activityStream = 
			  new ActivityStream({
				configObject: window.activityStreamConfig,
				domNode: dom.byId("activityStream"),
				selectedState: true
			});
		},
		
		/**
		 * Called when the iWidget has been unloaded.
		 */
		onUnload: function() {
			as_console_debug("com.ibm.social.as.lconn.widgets.ProfilesActivityStreamClassImpl onUnload");
			
			// Destroy the old dijit
			var asDijit = registry.byId("activityStream");
			
			if(asDijit){
				asDijit.destroyRecursive(true);
			}
			
			// Destroy the old sharebox.
			var shareboxDijit = registry.byId("shareboxContainer");
			
			if (shareboxDijit) {
				shareboxDijit.destroyRecursive(true);
			}
			
			// Carry out any destruction that the ActivityStream requires.
			if (this.activityStream) {
				this.activityStream.destroy();
			}
		},
		
		/**
		 * Loads the ActivityStream CSS
		 * Need to do it dynamically to set etag, and choose direction.
		 */
		loadCSS: function() {
			theme.addStylesheet("activityStream");
		}
	});
	
	return com.ibm.social.as.lconn.widgets.ProfilesActivityStreamClassImpl;
});
