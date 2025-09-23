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

dojo.provide("com.ibm.social.test.integration.as.config.homepage.dynamicLoadControllerConfig");

dojo.require("com.ibm.social.test.integration.as.config.homepage.config");
dojo.require("com.ibm.social.test.integration.as.model.TestDynamicLoadModel");

window.dynamicLoadControllerConfig = dojo.mixin({
	activityStreamModelClass: "com.ibm.social.test.integration.as.model.TestDynamicLoadModel"
}, window.activityStreamConfig);