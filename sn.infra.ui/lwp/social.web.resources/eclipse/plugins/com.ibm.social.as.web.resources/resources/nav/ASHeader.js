/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.nav.ASHeader");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("com.ibm.social.as.constants.events");
dojo.requireLocalization("lconn.homepage", "activitystream");

dojo.declare("com.ibm.social.as.nav.ASHeader", 
[dijit._Widget, dijit._Templated],
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "nav/templates/asHeader.html"),
	
	postMixInProperties: function(){
		// Setup the strings
		this.strings = dojo.i18n.getLocalization("lconn.homepage", "activitystream");
	},
	
	postCreate: function(){
		// Subscribe to state updates. 
		this.subscribe(com.ibm.social.as.constants.events.STATEUPDATED, dojo.hitch(this, function(stateObj){
			if(stateObj.view){
				this.showHeader(stateObj.view);
			}
		}));
	},
	
	showHeader: function(newViewId) {
		var cfg = com.ibm.social.as.configManager.getConfigObject();
		if ( !cfg ) return;
		
		var view = cfg.filters.options[newViewId];
		if ( !view ) return;
		
		this.asTitle.innerHTML = view.label;
		this.asDesc.innerHTML = "<p>"+view.description+"</p>";
	},
	
	/**
	 * Simply refresh the activity stream UI.
	 */
	refreshStream: function(){
		dojo.publish(com.ibm.social.as.constants.events.UPDATESTATE, [{}]);
	}
});
