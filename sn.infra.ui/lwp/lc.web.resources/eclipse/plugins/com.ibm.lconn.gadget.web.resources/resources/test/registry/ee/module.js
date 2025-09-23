/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

dojo.provide("com.ibm.lconn.gadget.test.registry.ee.module");

dojo.require("doh.runner");

//This file loads in all the test definitions.  

try{
	//Load in the demoFunctions module test.
	dojo.require("com.ibm.lconn.gadget.test.registry.ee._EEGadgetMapperTests");
	dojo.require("com.ibm.lconn.gadget.test.registry.ee.EEGadgetRegistryTests");
}catch(e){
	doh.debug(e);
}
