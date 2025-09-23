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
 * Config Handler tests.
 */

dojo.provide("com.ibm.social.test.integration.as.state.testConfigHandler");


dojo.require("com.ibm.social.test.testUtil");
dojo.require("com.ibm.social.test.integration.as.config.homepage.config");

dojo.require("com.ibm.social.as.state.ConfigHandler");
dojo.require("com.ibm.social.as.config.ConfigManager");

// Register tests for Activity Stream
com.ibm.social.test.testUtil.registerGroup("integration.as.state.testConfigHandler",
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
				com.ibm.social.as.configManager = new com.ibm.social.as.config.ConfigManager({configObject: window.activityStreamConfig});
				this.configHandler = new com.ibm.social.as.state.ConfigHandler();
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