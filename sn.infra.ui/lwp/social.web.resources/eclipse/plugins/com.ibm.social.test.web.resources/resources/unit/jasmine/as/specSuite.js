/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * Suite of Social Jasmine specs
 * @module com.ibm.social.unit.jasmine.as
 */

dojo.provide('com.ibm.social.test.unit.jasmine.as.specSuite');
try {
   dojo.require('com.ibm.social.test.unit.jasmine.as.util.hashtag.HashTagUtilSpec');
   dojo.require('com.ibm.social.test.unit.jasmine.as.paging.PagingHandlerSpec');
} catch (e) {
   console.debug(e);
}