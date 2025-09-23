/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.util.help");


lconn.highway.util.help.resetSettingsHelp = function() {
	var strings = dojo.i18n.getLocalization("lconn.highway", "strings");
	var helpNode = dojo.byId("configHelpNode");
	var text  = "<span class=\"lotusBold\">"+strings.helpOverviewTitle+"</span><p>"+strings.helpOverviewMessage1+"</p>"+"<p>"+strings.helpOverviewMessage2+"</p>";
	helpNode.innerHTML = text;
}

lconn.highway.util.help.updateSimpleHelp = function(title, message) {
	var helpNode = dojo.byId("configHelpNode");
	var text  = "<span class=\"lotusBold\">"+title+"</span><p>"+message+"</p>";
	helpNode.innerHTML = text;
}

lconn.highway.util.help.updateSettingHelp = function(details, roleNames) {
	var strings = dojo.i18n.getLocalization("lconn.highway", "strings");
	var helpNode = dojo.byId("configHelpNode");
	var infoBoxTableOpen = "<table class=\"lotusInfoBox\" style=\"background:#eef0ff !important; padding: 0px !important; margin: 5px 0 5px 10px !important;\"><tr><td>";
	var infoBoxTableClose = "</td></tr></table>";
	// TODO : Modify Infobox table with CSS class when defined
	
	var text  = "<span class=\"lotusBold\">"+strings.helpSettingTitle + "</span>";
	text += infoBoxTableOpen + details.title + infoBoxTableClose;
	text += "<span class=\"lotusBold\">" + strings.helpSettingDescription + "</span>";
	text += infoBoxTableOpen + details.description + infoBoxTableClose;

	// if editable
	var editableText = (lconn.highway.util.help._getBooleanFromInput(details.canModify)) ? strings.yes : strings.no ;
	text += "<span class=\"lotusBold\">" + strings.helpSettingEditable + "</span>";
	text += infoBoxTableOpen + editableText + infoBoxTableClose;

	// add if roles are supported
	var allowRolesText = (lconn.highway.util.help._getBooleanFromInput(details.allowRoles)) ? strings.yes : strings.no ;
	text += "<span class=\"lotusBold\">" + strings.helpSettingAllowRoles + "</span>";
	text += infoBoxTableOpen + allowRolesText + infoBoxTableClose;
	
	// add the defined roles if provided
	if (details.allowRoles && (roleNames != null)) {
		text += "<span class=\"lotusBold\">" + strings.helpSettingDefinedRoles + "</span>";
		for (roleName in roleNames) {
			if (roleName == "___default_role___") {
				roleName = strings.roleDefaultRoleName;
			}
			text += infoBoxTableOpen + roleName + infoBoxTableClose;
		}
	}
	
	helpNode.innerHTML = text;
}

lconn.highway.util.help._getBooleanFromInput = function(inputValue) {
	if (inputValue != null) {
		if (typeof inputValue == "boolean")
			return inputValue;
		if ((inputValue == "true") || (inputValue == "yes")) {
			return true;
		}
	}
	return false;
}

lconn.highway.util.help._scrollFix = function(container, height) {

	return false;
}

