/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * Connections CKEditor Dojo test suite.
 * <p>
 * This test suite encompasses all Connections CKEditor Dojo test cases.
 * 
 * @module lconn.test.ckeditor.testSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
dojo.provide("lconn.test.ckeditor.testSuite");

dojo.require("doh.runner");

// This file loads in all the test definitions.

try {
   dojo.require("lconn.test.ckeditor.ckeditorstaticTests");
   dojo.require("lconn.test.ckeditor.icdocpickerTests");
}
catch (e) {
   doh.debug(e);
}
