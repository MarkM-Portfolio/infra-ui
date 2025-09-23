/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Suite of lconn.core.util Jasmine specs
 * @module lconn.test.jasmine.util.specSuite
 * @author Jorge Manso <jorgeman@ie.ibm.com>
 */

dojo.provide('lconn.test.jasmine.util.specSuite');
try {
   dojo.require('lconn.test.jasmine.util.htmlSpec');
   dojo.require('lconn.test.jasmine.util.imagecheckerSpec');
   dojo.require('lconn.test.jasmine.util.languageSpec');
   dojo.require('lconn.test.jasmine.util.MessageBoxSpec');
   dojo.require('lconn.test.jasmine.util.PreferenceCacheSpec');
   dojo.require('lconn.test.jasmine.util.promisesSpec');
   dojo.require('lconn.test.jasmine.util.textSpec');
   dojo.require('lconn.test.jasmine.util.XSLCacheSpec');
} catch (e) {
   console.debug(e);
}
