/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * Widget to show the Shared Externally message block in Comments
 * 
 * @author Marco Vicente
 */

dojo.provide("com.ibm.social.as.item.comment.SharedExternallyComments");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.item.comment.SharedExternallyComments", 
		[dijit._Widget, dijit._Templated], {
	
	// show
	toShow:false,
	
	// Resource bundle
	strings: null,

    // default timeout to wait before firing the ARIA alerts
    DEFAULT_TIMEOUT: 3500,

    // use a timeout to wait before firing the ARIA alerts
    useTimeout: false,

    // timeout to wait before firing the ARIA alerts
    timeout: null,

    // warning message
    warningMessage: null,

	// Path to the template HTML
	templatePath: dojo.moduleUrl("com.ibm.social.as", "item/comment/templates/sharedExternallyComments.html"),
	
	postMixInProperties: function(){
		this.inherited(arguments);
		
		// Get the strings bundle
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");

        // set the warning message
        this.warningMessage = this.strings.externalUsersCommentsMsg;

        // set default timeout
        if (this.useTimeout && !this.timeout) {
            this.timeout = this.DEFAULT_TIMEOUT;
        }
	},

	postCreate: function(){
		
		this.inherited(arguments);
		
		if(this.toShow) {
            this.show();
        }
	},

	toggleVisibility: function(show){
		
		var alertInnerDiv = dojo.query(".lotusWarning", this.domNode)[0]; 
		
		if(show){
			dojo.removeClass(this.domNode, "lotusHidden");

            // kick aria events a little bit later
            var fireAriaEvts = dojo.hitch(this, function(){
                dijit.setWaiRole(alertInnerDiv, "alert");
                dijit.setWaiState(alertInnerDiv, "live", "polite");
            });

            if(this.useTimeout) {
                setTimeout(fireAriaEvts, this.timeout);
            }
            else {
                fireAriaEvts();
            }
		}
		else {
			dijit.removeWaiRole(alertInnerDiv, "alert");
			dijit.removeWaiState(alertInnerDiv, "live");
            dojo.addClass(this.domNode, "lotusHidden");
		}


	},
	
	show: function(){
		
		this.toggleVisibility(true);
	},
	
	hide: function(){
		
		this.toggleVisibility(false);
	}
});
