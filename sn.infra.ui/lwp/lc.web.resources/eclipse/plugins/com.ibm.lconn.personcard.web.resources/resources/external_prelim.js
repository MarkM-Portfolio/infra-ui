/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Loads and initializes the some bizcard config info
 * 
 */
dojo.provide("com.ibm.lconn.personcard.external_prelim");


//try to register these module paths just case something needs to be loaded that isn't already
(function() {
	var registerInternalModulePath_ = function(connModule, connPath) {
		try {
			if (typeof connPath === "undefined") connPath = connModule;
			connPath = SemTagSvcConfig.resourcesSvc + "/web/" + connPath;
			
			if (typeof window.dojoConfig !== "undefined") {
				if (!dojoConfig.packages) dojoConfig.packages = [];
				dojoConfig.packages.push({
					name: connModule,
					location: connPath
				});
			}
			
			if (typeof window.dojo !== "undefined" && typeof dojo.registerModulePath == "function") {
				dojo.registerModulePath(connModule, connPath);
			}
			
		} catch (e) {
			console.error("Unable to register modulePath: " + connModule);
			console.error(e);
		}			
	};
	
	registerInternalModulePath_("lconn.profiles.bizCard");
	registerInternalModulePath_("lconn.communities.bizCard");
	registerInternalModulePath_("lconn.profiles.sametime");
	registerInternalModulePath_("lconn");
	registerInternalModulePath_("com.ibm", "com/ibm");
	registerInternalModulePath_("ic-core");
	registerInternalModulePath_("ic-gadget");
	registerInternalModulePath_("ic-ui");

})();


//this forces the loading of the necessary strings
dojo.requireLocalization("lconn.profiles.bizCard", "ui");
dojo.requireLocalization("lconn.communities.bizCard", "ui");
dojo.requireLocalization("lconn.profiles.sametime", "awareness");

