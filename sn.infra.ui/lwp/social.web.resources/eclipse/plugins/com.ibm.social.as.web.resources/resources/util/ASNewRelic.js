/* Copyright IBM Corp. 2016  All Rights Reserved.                 */

dojo.provide("com.ibm.social.as.util.ASNewRelic");

dojo.require("com.ibm.lconn.layout.insights.NewRelic");
dojo.require("com.ibm.lconn.layout.insights.tracker");
dojo.require("dojox.uuid.generateRandomUuid");
dojo.require("lconn.core.config.features");

dojo.declare("com.ibm.social.as.util.ASNewRelic", null, {
	
	hasNewRelic : null,
	
	newRelicSession : null,
	
	NAMESPACE : "ic.as.core",
	
	defaultType : "Action",
		
	constructor: function(){ 	
		this.newRelicSession = dojox.uuid.generateRandomUuid();		
	},
	
	track: function(name, args) {
		var tracker = dojo.getObject("com.ibm.lconn.layout.insights.tracker");
		
        if (!tracker || !name || !lconn.core.config.features('activity-stream-new-relic')) return;
        
        var standardArgs = {
          "defaultType": this.defaultType,
          "asSession": this.newRelicSession
          
        };
        dojo.mixin(standardArgs, args);
        
        tracker.track(this.NAMESPACE + '.' + name, standardArgs);
      }
	
});