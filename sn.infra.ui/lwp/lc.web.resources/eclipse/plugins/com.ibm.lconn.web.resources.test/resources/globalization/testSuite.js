/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Connections Globalization test suite.
 * <p>
 * This test suite encompasses all Connections Globalization test cases.
 * 
 * @module lconn.test.globalization.testSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
dojo.provide("lconn.test.globalization.testSuite");

dojo.require("doh.runner");

// This file loads in all the test definitions.

try {
   dojo.require("lconn.test.globalization.bidiTests");
   dojo.require("lconn.test.globalization.routesTests");
   dojo.require("lconn.test.globalization.configTests");
}
catch (e) {
   doh.debug(e);
}
