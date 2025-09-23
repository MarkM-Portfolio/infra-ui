/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
	"doh/runner",
	"ic-gadget/test/registry/ee/EEGadgetRegistryTests",
	"ic-gadget/test/registry/ee/_EEGadgetMapperTests"
], function (runner, EEGadgetRegistryTests, _EEGadgetMapperTests) {

	/*
	 * Note to U.S. Government Users Restricted Rights:
	 * Use, duplication or disclosure restricted by GSA ADP Schedule
	 * Contract with IBM Corp.
	 *******************************************************************************/
	
	//This file loads in all the test definitions.  
	
	try{
		//Load in the demoFunctions module test.
			}catch(e){
		doh.debug(e);
	}
	
	return com.ibm.lconn.gadget.test.registry.ee.module;
});
