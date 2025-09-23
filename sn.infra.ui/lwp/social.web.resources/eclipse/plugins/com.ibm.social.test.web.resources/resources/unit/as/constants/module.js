/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * Module for events constants tests.
 */

dojo.provide("com.ibm.social.test.unit.as.constants.module");

try{
	dojo.require("com.ibm.social.test.scripts.results.ResultCollector");
	
	doh.registerUrl("com.ibm.social.test.unit.as.constants.ConstantTests", 
			dojo.moduleUrl("com.ibm.social.test.unit.as.constants", "testEventConstants.html"));
}catch(e){
	doh.debug(e);
}
