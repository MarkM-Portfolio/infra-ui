/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.util.load");

dojo.require("lconn.highway.dijit.GatekeeperPanel");

lconn.highway.util.load.loadSettings = function(editDefinitions, editDefaults) {

	var definitions = editDefinitions;
	var defaults = editDefaults;
	function createSettingsPanel() {
		contentArea = dojo.byId("configSettings");
		
		if (lconn.highway.app == undefined) {
			console.log("No app");
		}

		var panelTitle = "configTitleSettings";
		var panelDescription = "configDescSettings";
		if (editDefinitions) {
			panelTitle = "configTitleDefinitions";
			panelDescription = "configDescDefinitions";
		} else if (editDefaults) {
			panelTitle = "configTitleDefaults";
			panelDescription = "configDescDefaults";
		}
		
		// create a panel at the configPanel element and pass it the categories of settings
		var panel = new lconn.highway.dijit.SettingsPanel({
			panelTitle: panelTitle,
			panelDescription: panelDescription,
			editDefinitions: editDefinitions,
			editDefaults: editDefaults
		}, dojo.byId("configPanel"));
		panel.startup();
	}

	dojo.addOnLoad(createSettingsPanel);
};


lconn.highway.util.load.loadGatekeeper = function() {

	function createGatekeeperPanel() {
		contentArea = dojo.byId("configSettings");
		
		if (lconn.highway.app == undefined) {
			console.log("No app");
		}

		// create a panel at the configPanel element and pass it the categories of settings
		var panel = new lconn.highway.dijit.GatekeeperPanel({}, dojo.byId("configPanel"));
		panel.startup();
	}

	dojo.addOnLoad(createGatekeeperPanel);
};

lconn.highway.util.load.loadSystem = function() {

	function createSystemPanel() {
		contentArea = dojo.byId("configSettings");
		
		if (lconn.highway.app == undefined) {
			console.log("No app");
		}

		// create a panel at the configPanel element and pass it the categories of settings
		var panel = new lconn.highway.dijit.SystemPanel({}, dojo.byId("configPanel"));
		panel.startup();
	}

	dojo.addOnLoad(createSystemPanel);
};
