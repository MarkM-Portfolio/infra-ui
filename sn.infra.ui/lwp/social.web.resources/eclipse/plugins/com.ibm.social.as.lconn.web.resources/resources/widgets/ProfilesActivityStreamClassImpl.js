/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.widgets.ProfilesActivityStreamClassImpl");

dojo.require("com.ibm.social.as.lconn.modules.profilesActivityStream");
dojo.require("lconn.core.theme");
dojo.require("com.ibm.social.as.util.xhr.XhrHandler");


com.ibm.social.as.util.xhr.XhrHandler.init(); // empty init since we're in Connections and can use dojo's xhr
											  // outside class scope to make sure called only once.

dojo.extend(com.ibm.social.as.lconn.widgets.ProfilesActivityStreamClass, {

	activityStream: null,
	
	/**
	 * Called when the iWidget has loaded.
	 */
	onLoad: function(){
		as_console_debug("com.ibm.social.as.lconn.widgets.ProfilesActivityStreamClassImpl onLoad");

		
		this.loadCSS();
		
		// Create the sharebox.
		new com.ibm.social.sharebox.ContextualSharebox({
			newsSvcUrl : lconn.core.url.getServiceUrl(lconn.core.config.services.news),
			context : {	
				resourceId : profilesData.displayedUser.userid,
				resourceType : "person"
			}
		}, dojo.byId("shareboxContainer"));
		
		// Attach the ActivityStream dijit for Profiles onto the page
		this.activityStream = 
		  new com.ibm.social.as.ActivityStream({
			configObject: window.activityStreamConfig,
			domNode: dojo.byId("activityStream"),
			selectedState: true
		});
	},
	
	/**
	 * Called when the iWidget has been unloaded.
	 */
	onUnload: function() {
		as_console_debug("com.ibm.social.as.lconn.widgets.ProfilesActivityStreamClassImpl onUnload");
		
		// Destroy the old dijit
		var asDijit = dijit.byId("activityStream");
		
		if(asDijit){
			asDijit.destroyRecursive(true);
		}
		
		// Destroy the old sharebox.
		var shareboxDijit = dijit.byId("shareboxContainer");
		
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
		lconn.core.theme.addStylesheet("activityStream");
	}
});
