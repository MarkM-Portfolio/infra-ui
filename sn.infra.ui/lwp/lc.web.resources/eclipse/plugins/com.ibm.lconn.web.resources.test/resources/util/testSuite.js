/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

dojo.provide("lconn.test.util.testSuite");

dojo.require("doh.runner");

//This file loads in all the test definitions.  

try{
	dojo.require("lconn.test.util.promisesTests");
	dojo.require("lconn.test.util.LCChainedDeferredTests");
	dojo.require("lconn.test.util.PreferenceCacheTests");
	dojo.require("lconn.test.util.textTests");
}catch(e){
	doh.debug(e);
}
