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
 * @module com.ibm.social.test.specSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide('com.ibm.social.test.specSuite');
try {
   dojo.require('com.ibm.social.test.socialmail.specSuite');
} catch (e) {
   console.debug(e);
}