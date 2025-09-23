/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Suite of globalization Jasmine specs
 * @module lconn.test.jasmine.globalization.specSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide('lconn.test.jasmine.globalization.specSuite');
try {
   dojo.require('lconn.test.jasmine.globalization.apiSpec');
   dojo.require('lconn.test.jasmine.globalization.bidiSpec');
   dojo.require('lconn.test.jasmine.globalization.bidiDateSpec');
   dojo.require('lconn.test.jasmine.globalization.configSpec');
} catch (e) {
   console.debug(e);
}
