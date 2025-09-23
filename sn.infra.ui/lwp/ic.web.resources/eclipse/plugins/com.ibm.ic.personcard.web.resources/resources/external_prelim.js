/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
define([
	"dojo",
	"dojo/i18n!ic-communities/bizCard/nls/ui",
	"dojo/i18n!ic-profiles/bizCard/nls/ui",
	"dojo/i18n!ic-profiles/sametime/nls/awareness",
	"ic-core/auth",
	"ic-core/config/services",
	"ic-core/utilities"
], function (dojo, i18nui, i18nui, i18nawareness, auth, services, utilities) {

	
	/*global SemTagSvcConfig:true*/
	/**
	 * Loads and initializes the business card strings, map module paths, and 
	 * load some core lconn code.
	 * 
	 * This module must be included prior to page load.
	 */
	//try to register these module paths just case something needs to be loaded that isn't already
	try {
		if (typeof dojo.registerModulePath === "function") {
			dojo.registerModulePath("lconn.profiles.bizCard", SemTagSvcConfig.resourcesSvc + "/web/lconn.profiles.bizCard");
			dojo.registerModulePath("lconn.communities.bizCard", SemTagSvcConfig.resourcesSvc + "/web/lconn.communities.bizCard");		
			dojo.registerModulePath("lconn.profiles.sametime", SemTagSvcConfig.resourcesSvc + "/web/lconn.profiles.sametime");
		}
	} catch (ignore) {}
	
	
	//this forces the loading of the necessary strings
	//load some of the core features needed by bizcard
	
	return com.ibm.lconn.personcard.external_prelim;
});