/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Core Connections Dojo test suite.
 * <p>
 * This test suite encompasses all Core Connections Dojo test cases.
 * 
 * @module lconn.test.core.testSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
dojo.provide("lconn.test.core.testSuite");

dojo.require("doh.runner");

// This file loads in all the test definitions.

try {
   dojo.require("lconn.test.core.localeTests");
   dojo.require("lconn.test.core.helpTests");
   dojo.require("lconn.test.core.urlTests");
}
catch (e) {
   doh.debug(e);
}
