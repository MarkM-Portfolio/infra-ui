/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Mentions test suite.
 * <p>
 * This test suite encompasses all mentions test cases.
 * 
 * @module lconn.test.mentions.testSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
dojo.provide("lconn.test.mentions.testSuite");

dojo.require("doh.runner");

// This file loads in all the test definitions.

try {
   dojo.require("lconn.test.mentions.utilityTests");
   dojo.require("lconn.test.mentions.data.DataConverterTests");
}
catch (e) {
   doh.debug(e);
}
