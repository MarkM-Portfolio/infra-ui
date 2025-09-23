/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Connections Dojo test suite.
 * <p>
 * This test suite encompasses all Connections Dojo test suites.
 * 
 * @module lconn.test.testSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
dojo.provide("lconn.test.testSuite");

dojo.require("doh.runner");

// This file loads in all the test definitions.

try {
   dojo.require("lconn.test.core.testSuite");
   dojo.require("lconn.test.ckeditor.testSuite");
   dojo.require("lconn.test.globalization.testSuite");
   dojo.require("lconn.test.mentions.testSuite");
   dojo.require("lconn.test.util.testSuite");
}
catch (e) {
   doh.debug(e);
}
