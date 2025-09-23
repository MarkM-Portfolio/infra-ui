/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * Controller tests.
 */

dojo.provide("com.ibm.social.test.unit.as.controller.testController");


dojo.require("com.ibm.social.test.testUtil");
dojo.require("com.ibm.social.test.integration.as.config.homepage.config");

dojo.require("com.ibm.social.as.controller.Controller");
dojo.require("com.ibm.social.as.config.ConfigManager");

com.ibm.social.as.configManager = new com.ibm.social.as.config.ConfigManager({configObject: window.activityStreamConfig});

com.ibm.social.test.testUtil.registerGroup("unit.as.controller.testController", [
	{	name: "testUpdateState",
	 	description: "Test that the update state function behaves properly",
		setUp: function(){
			window.abstractHelper = { register: function() {}, unregister: function(){}};
			
			dojo.setObject("lconn.core.config.services.opensocial.url", "http://fake.url.com/opensocial");
			
			this.spyOn(this.testClass.prototype, "buildAndFetchFeed");
			
			this.controller = new this.testClass({configManager: com.ibm.social.as.configManager});
			
			this.spyOn(this.controller.configHandler, "updateConfigState");
		},
		runTest: function(){
			// A test to show a state array is passed on OK.
			var stateArr = ["testfilter"];
			this.controller.onUpdateState(stateArr);
			doh.t(this.controller.configHandler.updateConfigState.calledWith(stateArr));
		}
	},
	{	name: "testChangeFilters",
	 	description: "Test that the function to change the first and second filters works correctly",

		setUp: function() {
			this.spyOn(this.testClass.prototype, "attachAndFetch");

			// Create the controller instance.
			this.controller = new com.ibm.social.as.controller.Controller({configManager: com.ibm.social.as.configManager});
		},
		runTest: function() {
	
			// Test the instance where a first filter is provided.		
			var stateArr = ["testView", "testfilter"];

			this.controller.onUpdateState(stateArr);
			
			doh.t(this.testClass.prototype.attachAndFetch.calledWith()); // just check that attachAndFetch was called with any args
		}
	}
	],
	function setUpGroup(){},
	function tearDownGroup(){},
	null,
	{
		testClass: com.ibm.social.as.controller.Controller,
		controller: null,
		tearDown: function() {
			this.controller.destroy();
		}
	});