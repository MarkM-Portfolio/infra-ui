/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"ic-test/scripts/results/ResultCollector"
], function (ResultCollector) {

	/**
	 * Module for events constants tests.
	 */
	
	try{
			
		doh.registerUrl("com.ibm.social.test.unit.as.constants.ConstantTests", 
				require.toUrl("ic-test/unit/as/constants/testEventConstants.html"));
	}catch(e){
		doh.debug(e);
	}
	
	return com.ibm.social.test.unit.as.constants.module;
});
