/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.           */

/**
 * Tests for the utilities classes used for the sharebox feature.
 */

dojo.provide("lconn.test.mentions.utilityTests");

dojo.require("doh.runner");

dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");

dojo.require("lconn.core.widget.mentions.utilities");

doh.register("lconn.test.mentions.utilities.test",
	[
	 	/*
	 	 * Test isSmartCloud function.
	 	 */
	 	{	name: "testIsInCloud",
	 		contextCloud: null,
	 		contextOnPremise: null,
	 		
	 		setUp: function() {
	 			this.contextCloud = {environment:"SmartCloud"}
	 			this.contextOnPremise = {environment:"OnPremise"}
	 		},	
		  
	 		runTest: function() {
	 			doh.t(lconn.core.widget.mentions.utilities.isSmartCloud(this.contextCloud));
	 			doh.f(lconn.core.widget.mentions.utilities.isSmartCloud(this.contextOnPremise));
	 			doh.f(lconn.core.widget.mentions.utilities.isSmartCloud(null));
	 		} 
	 	},
	 	
	 	/*
	 	 * Test isProfilesEnabled function.
	 	 */
	 	{	name: "testIsProfilesEnabled",
	 		
	 		setUp: function() {

	 		},	
		  
	 		runTest: function() {
	 			lconn.core.config.services["profiles"] = "dummyurl";
	 			doh.t(lconn.core.widget.mentions.utilities.isProfilesEnabled());

	 			// Simulate turning off Profiles.
	 			lconn.core.config.services["profiles"] = undefined;
	 			doh.f(lconn.core.widget.mentions.utilities.isProfilesEnabled());
	 		} 
	 	}
	 ]);
