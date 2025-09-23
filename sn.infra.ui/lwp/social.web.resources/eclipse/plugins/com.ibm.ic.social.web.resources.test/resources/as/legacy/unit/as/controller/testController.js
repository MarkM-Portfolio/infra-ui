/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/lang",
	"ic-as/config/ConfigManager",
	"ic-as/controller/Controller",
	"ic-test/integration/as/config/homepage/config",
	"ic-test/testUtil"
], function (lang, ConfigManager, Controller, config, testUtil) {

	/**
	 * Controller tests.
	 */
	
	com.ibm.social.as.configManager = new ConfigManager({configObject: window.activityStreamConfig});
	
	testUtil.registerGroup("unit.as.controller.testController", [
		{	name: "testUpdateState",
		 	description: "Test that the update state function behaves properly",
			setUp: function(){
				window.abstractHelper = { register: function() {}, unregister: function(){}};
				
				lang.setObject("lconn.core.config.services.opensocial.url", "http://fake.url.com/opensocial");
				
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
				this.controller = new Controller({configManager: com.ibm.social.as.configManager});
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
			testClass: Controller,
			controller: null,
			tearDown: function() {
				this.controller.destroy();
			}
		});
	return com.ibm.social.test.unit.as.controller.testController;
});
