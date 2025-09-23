/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.widgets.communities.CommunitiesActivityStreamEdit");
dojo.requireLocalization("com.ibm.social.as.lconn", "activitystream_lconn");
/**
 * Widget used to display the edit settings on the Communities Activity Stream 
 * This is used to set Microblogging access rights.
 * 
 * @author scrawford
 */

dojo.declare(
"com.ibm.social.as.lconn.widgets.communities.CommunitiesActivityStreamEdit", 
[dijit._Widget, dijit._Templated],
{
	
	templatePath: dojo.moduleUrl("com.ibm.social.as.lconn", "widgets/communities/templates/communitiesActivityStreamEdit.html"),
	
	apiUrl: null,
	
	microblogSettings: null,
	
	strings: null,
	
	iContext: null,
	
	errorMsg: null,
	
	abstractHelper: null,
	
	/**
	 * Called before the widget is rendered in the UI.
	 */
	postMixInProperties: function() {
		//No config on the edit screen currently - setup the abstractHelper which will default
		//to non gadget mode by default.
		this.abstractHelper = (typeof activityStreamAbstractHelper != "undefined") ? 
				activityStreamAbstractHelper : new com.ibm.social.as.util.AbstractHelper({});
		
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as.lconn","activitystream_lconn");	
		this.apiUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.news).uri 
		+ "/microblogging/settings/"+resourceId+".action";
		this.setupAccessForm();
	},
	
	/**
	 * Setup the form initially with the current Access value
	 * retrieved from News Rest endpoint.
	 */
	setupAccessForm: function() {
		as_console_debug("com.ibm.social.as.lconn.widgets.communities.CommunitiesActivityStreamEdit setupAccessForm");
		//ensure we clear all errors.
		this.clearErrorMessages();
		this.abstractHelper.xhrGet({
			url: this.apiUrl,
			headers: {
				"Content-Type":"application/json"
			},
			handleAs: "json",
			load: dojo.hitch(this, function(data){	
				this.microblogSettings = data;				
				this.owner.checked = (data.acl == "OWNER") ? true : false;
				this.owner_member.checked = (data.acl == "OWNER_MEMBER") ? true : false;
				this.none.checked = (data.acl == "NONE") ? true : false;
			}),
			timeout: 10000,
			error: dojo.hitch(this, function(e){
				console.error("CommunitiesActivitySreamEdit - could not retrieve settings: %o", e);
				this.showErrorMessage(this.strings.ACLSettingsRetrieveError);
			})
		});
	},
	
	/**
	 * Handle submit action update the microblogSettings based on form selection
	 * and post them to News. Return to View if successful otherwise error message
	 */	
	submitAccessForm: function(evt) {
		var refreshNeeded = false;
		as_console_debug("com.ibm.social.as.lconn.widgets.communities.CommunitiesActivityStreamEdit submitAccessForm");

		if (evt.target.id === "btnSaveClose"){
			refreshNeeded = true;
		}

		var selectedAccess;
		dojo.forEach(this.accessForm.accessACL, function(entry){
			if(entry.checked === true){
				selectedAccess = entry.value;
			}
		});
		
		this.microblogSettings.acl = selectedAccess;
		this.abstractHelper.xhrPut({
			url: this.apiUrl,
			putData: dojo.toJson(this.microblogSettings),
			headers: {
				"Content-Type":"application/json"
			},
			handleAs: "json",
			load: dojo.hitch(this, function(data){		
				try {
					if (refreshNeeded === true){
						this.successRefreshView();
					} else {
						console.debug("CommunitiesActivitySreamEdit - updated settings.");
					}
				}catch(e){}
			}),
			timeout: 10000,
			error: dojo.hitch(this, function(e){
				console.error("CommunitiesActivitySreamEdit - could not update settings: %o", e);
				this.showErrorMessage(this.strings.ACLSettingsUpdateError);
			})
		});
		
		return false;
	},
	
	/**
	 * Submit the Access form and refresh the widget main view
	 */
	successRefreshView: function() {
		as_console_debug("com.ibm.social.as.lconn.widgets.communities.CommunitiesActivityStreamEdit submitAccessForm");
		this.iContext.iEvents.fireEvent("onRefreshNeeded");
		this.cancelAccessForm();
	},

	/**
	 * Cancel the Access form and return to the Widget View
	 */
	cancelAccessForm: function() {
		as_console_debug("com.ibm.social.as.lconn.widgets.communities.CommunitiesActivityStreamEdit cancelAccessForm");
		this.clearErrorMessages();
		this.iContext.iEvents.fireEvent("onModeChanged", "", "{'newMode': '" + this.iContext.constants.mode.VIEW + "'}");			
	},

	clearErrorMessages: function() {
		if(this.errorMessageSection){
			dojo.addClass(this.errorMessageSection, "lotusHidden");			
		}
	},
		
	/**
	 * Insert the error message and show the error section
	 */
	showErrorMessage: function(errorMsg) {
		this.errorMessage.innerHTML = errorMsg;
		dojo.removeClass(this.errorMessageSection, "lotusHidden");
	}
	
});
