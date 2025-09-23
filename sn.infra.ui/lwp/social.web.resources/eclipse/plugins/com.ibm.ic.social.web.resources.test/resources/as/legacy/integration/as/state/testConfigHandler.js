define([
	"ic-as/config/ConfigManager",
	"ic-as/state/ConfigHandler",
	"ic-test/integration/as/config/homepage/config",
	"ic-test/testUtil"
], function (ConfigManager, ConfigHandler, config, testUtil) {

	/*                                                                   */
	/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
	
	/**
	 * Config Handler tests.
	 */
	
	// Register tests for Activity Stream
	testUtil.registerGroup("integration.as.state.testConfigHandler",
		[
			{
				name: "testUpdateConfigStateView",
				description: "Test updating the config state",
				mockConfigObject: {
					filters : {
						options: {	
							myview: {	
								filters: {
									options: [{name: "testoption"}]
								}
							}
						}
					}
				},
				setUp:function(){
					com.ibm.social.as.configManager = new ConfigManager({configObject: window.activityStreamConfig});
					this.configHandler = new ConfigHandler();
					this.configHandler.configObject = this.mockConfigObject;
				},
				stateArr: ["myview"],
				runTest: function(){
					this.configHandler.updateConfigState(this.stateArr);
					doh.is(this.mockConfigObject.filters.selectedItem, "myview");
				}
			}
		]
	);
	return com.ibm.social.test.integration.as.state.testConfigHandler;
});
