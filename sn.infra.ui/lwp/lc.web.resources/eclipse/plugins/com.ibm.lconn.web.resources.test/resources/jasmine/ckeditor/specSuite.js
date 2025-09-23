/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * Connections CKEditor Dojo spec suite for Jasmine.
 * <p>
 * This test suite encompasses all Connections CKEditor Dojo test cases.
 * 
 * @module lconn.test.jasmine.ckeditor.specSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
dojo.provide("lconn.test.jasmine.ckeditor.specSuite");

// This file loads in all the test definitions.

try {
   dojo.require("lconn.test.jasmine.ckeditor._ARIAMixinSpec");
   dojo.require("lconn.test.jasmine.ckeditor._HandlerSpec");
   dojo.require("lconn.test.jasmine.ckeditor.ckeditorstaticSpec");
   dojo.require("lconn.test.jasmine.ckeditor.editLiveSpec");
   dojo.require("lconn.test.jasmine.ckeditor.HashtagHandlerSpec");
   dojo.require("lconn.test.jasmine.ckeditor.icdocpickerSpec");
   dojo.require("lconn.test.jasmine.ckeditor.icpublishBinaryDataSpec");
   dojo.require("lconn.test.jasmine.ckeditor.mentionsSpec");
   dojo.require("lconn.test.jasmine.ckeditor.PersonHandlerSpec");
   dojo.require("lconn.test.jasmine.ckeditor.TypeAheadMenuSpec");
   dojo.require("lconn.test.jasmine.ckeditor.urldetectSpec");
   dojo.require("lconn.test.jasmine.ckeditor.ckeditorSpec");
}
catch (e) {
   console.debug(e);
}
