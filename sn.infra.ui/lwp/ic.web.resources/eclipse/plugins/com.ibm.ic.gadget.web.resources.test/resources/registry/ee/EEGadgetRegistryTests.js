/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
	"doh/runner",
	"ic-gadget/registry/ee/iEEGadgetRegistry"
], function (runner, iEEGadgetRegistry) {

	/*
	 * Note to U.S. Government Users Restricted Rights:
	 * Use, duplication or disclosure restricted by GSA ADP Schedule
	 * Contract with IBM Corp.
	 *******************************************************************************/
	
	(function(){
		doh.register("com.ibm.lconn.gadget.test.registry.ee.EEGadgetRegistryTests", [
			function todo_tests_and_implement_function() {
				doh.is("Implemented.", "Not implemented.");
			}
		]);
	})();
	return com.ibm.lconn.gadget.test.registry.ee.EEGadgetRegistryTests;
});
