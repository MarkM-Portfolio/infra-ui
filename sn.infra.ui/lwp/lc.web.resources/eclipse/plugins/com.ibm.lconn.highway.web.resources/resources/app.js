/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.app");

dojo.require("dojo.cookie");
dojo.require("dojo.parser");
dojo.require("lconn.highway.dijit.Info");
dojo.require("lconn.highway.dijit.Setting");
dojo.require("lconn.highway.dijit.SettingDef");
dojo.require("lconn.highway.dijit.SettingDefDlg");
dojo.require("lconn.highway.dijit.SettingDefDlgRow");
dojo.require("lconn.highway.dijit.Section");
dojo.require("lconn.highway.dijit.SettingsPanel");
dojo.require("lconn.highway.dijit.GatekeeperFlag");
dojo.require("lconn.highway.dijit.GatekeeperPanel");
dojo.require("lconn.highway.dijit.SystemPanel");
dojo.require("lconn.highway.util.load");

dojo.requireLocalization("lconn.core","strings");
dojo.requireLocalization("lconn.highway","strings");

dojo.declare("lconn.highway.app",
		null,
{
	// The context root and Get URL
	contextRootPath : lconn.highway.global.contextRoot,
	settingsAPIPath: lconn.highway.global.contextRoot + "/rest"
	
});
