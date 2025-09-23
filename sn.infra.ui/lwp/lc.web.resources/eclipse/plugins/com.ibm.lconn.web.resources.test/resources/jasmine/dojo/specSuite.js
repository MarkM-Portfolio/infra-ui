/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Suite of Dojo Jasmine specs
 * @module lconn.test.jasmine.dojo.specSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide('lconn.test.jasmine.dojo.specSuite');
try {
   dojo.require('lconn.test.jasmine.dojo.querySpec');
   dojo.require('lconn.test.jasmine.dojo.i18nSpec');
} catch (e) {
   console.debug(e);
}
