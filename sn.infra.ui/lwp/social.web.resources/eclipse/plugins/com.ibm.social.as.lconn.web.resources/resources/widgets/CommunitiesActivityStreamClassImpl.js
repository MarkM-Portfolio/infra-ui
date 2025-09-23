/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.widgets.CommunitiesActivityStreamClassImpl");

dojo.require("com.ibm.social.as.lconn.modules.communitiesActivityStream");
dojo.require("lconn.core.theme");
dojo.require("com.ibm.social.as.util.xhr.XhrHandler");

com.ibm.social.as.util.xhr.XhrHandler.init();	// empty init since we're in Connections and can use dojo's xhr
												// outside class scope to make sure called only once.

dojo.extend(com.ibm.social.as.lconn.widgets.CommunitiesActivityStreamClass, {	
	
	/**
	 * Called when the iWidget has loaded.
	 */
	onLoad: function(){
		as_console_debug("com.ibm.social.as.lconn.widgets.CommunitiesActivityStreamClassImpl onLoad");
		
		//store the widget dom id for prepending to node id's
		this.domID = "_" + this.iContext.widgetId + "_";	
		
		this.loadCSS();
		
		//If this is a load in search mode, call the appropriate Search function
		//This passes off to the Search component to display the results in it's own
		//Activity Stream.
		var mode = this.iContext.getiDescriptor().getItemValue("mode");
		if(mode === "search"){
			var scope = "status_updates";
			var resultContainerDomNode = dojo.byId(this.getWidgetNodeId("activityStreamSearchNode"));
			lconn.core.widgetUtils.search(this.iContext, scope, resultContainerDomNode);
			return; 
		}
		else if(mode === "edit"){
			this.onEdit();
			return;
		}
		
		var userRole = "NONE";
		if("true" == widgetUserInfo.canPersonalize) {
			userRole = "OWNER";
		} else if ("true" == widgetUserInfo.canContribute) {
			userRole = "MEMBER";
		} 					
		
		this.userRole = userRole;
				
		this.createShareBoxNode();
		
		var asc = window.activityStreamConfig;
		//edit screen does not have config set
		if (asc) {
			// set container/context info
			if( !asc.containerInfo) {
			    asc.containerInfo = {};
			}
			asc.containerInfo.resourceId = resourceId;
			asc.containerInfo.relationship = userRole;
			var userProfile = this.iContext.getUserProfile();
			asc.containerInfo.canContribute = userProfile.widgetUserInfo.canContribute === "true" ? true : false;
			
			// For better UX - instead of showing error to users who cannot contribute
			// (i.e. non-members in moderated community), dont give them option
			if ( !asc.containerInfo.canContribute && window.communityType === "publicInviteOnly" ) {
				asc.readonlyLikes = "true";
			}

            // disable shared externally on communities AS
            asc.containerInfo.disableSharedExternally = true;
		}
		
		// Defect 53723 - Pause slightly so the display renders properly in IE.
		setTimeout(dojo.hitch(this, function() {
			//Check for existance of the widget node - in case loading in edit mode
			if(dojo.byId("activityStream")){
				// Attach the ActivityStream dijit for Communities onto the page
				this.activityStreamWidget = new com.ibm.social.as.ActivityStream({
					configObject: window.activityStreamConfig,
					domNode: dojo.byId("activityStream"),
					selectedState: true
				});
			}
		}), 500);
	},
		
	/**
	 * Called when the iWidget has been unloaded.
	 */
	onUnload: function() {
		as_console_debug("com.ibm.social.as.lconn.widgets.CommunitiesActivityStreamClassImpl onUnload");
		
		// Destroy the old dijit
		var asDijit = dijit.byId("activityStream");
		
		if(asDijit){
			asDijit.destroyRecursive(true);
		}
		
		this.removeShareBoxNode();
		
		// Destroy the old edit view if initialized.
		var editAccessDijit = dijit.byId(this.getWidgetNodeId("activityStreamEditNode"));
		
		if (editAccessDijit) {
			editAccessDijit.destroyRecursive(true);
		}

		// Invoke the destroy method on the activitystream object that will clean it up.
		if (this.activityStreamWidget) {
			this.activityStreamWidget.destroy();
		}
		// Reset container info
		var asc = window.activityStreamConfig;
		if(asc && asc.containerInfo){
			delete asc.containerInfo.resourceId;
			delete asc.containerInfo.relationship;			
		}
	},
	
	/**
	 * This is called when moving from onEdit back to view - as the access may have been
	 * changed to none, we need a full refresh to remove the sharebox. Otherwise
	 * HTTP 500 errors and unpredictable outcome.
	 */
	onRefresh: function() {
		this.removeShareBoxNode();
		this.createShareBoxNode();
	},
	
	/**
	 * Called when the iWidget goes into edit mode. Only create the dijit once.
	 */
	onEdit: function() {
		as_console_debug("com.ibm.social.as.lconn.widgets.CommunitiesActivityStreamClassImpl onEdit");		
		
		if(!this.editAccessDijit) {
			this.editAccessDijit = 	new com.ibm.social.as.lconn.widgets.communities.CommunitiesActivityStreamEdit({iContext: this.iContext}, 
					dojo.byId(this.getWidgetNodeId("activityStreamEditNode")));
		}
		else {
			this.editAccessDijit.setupAccessForm();
		}
	
	},
	
	/**
	 * Create the sharebox dijit and pass in the parent node
	 */
	createShareBoxNode: function() {
		this.shareBoxWidget = new com.ibm.social.sharebox.ContextualSharebox({
			newsSvcUrl : lconn.core.url.getServiceUrl(lconn.core.config.services.news),
			context : {	
				resourceId : resourceId,
				resourceType : "community",
				userRole: this.userRole
			}
		}, dojo.byId(this.getWidgetNodeId("shareboxContainer")));	
	},
	
	/**
	 * Destroy the sharebox node
	 */
	removeShareBoxNode: function() {
		// Destroy the old sharebox.
		var shareboxDijit = dijit.byId(this.getWidgetNodeId("shareboxContainer"));
		if (shareboxDijit) {
			shareboxDijit.destroyRecursive(true);
		}
	},
		
	/**
	 * Given the node id - prepend the current widget id
	 */
	getWidgetNodeId: function(node) {
		return this.domID+node;
	},
	
	/**
	 * Loads the ActivityStream CSS
	 * Need to do it dynamically to set etag, and choose direction.
	 */
	loadCSS: function() {
		lconn.core.theme.addStylesheet("activityStream");
	}

});
