/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Suite of OneUI utils Jasmine specs
 * 
 * @module com.ibm.oneui.test.jasmine.util.specSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide('com.ibm.oneui.test.jasmine.util.specSuite');
try {
   dojo.require('com.ibm.oneui.test.jasmine.util.cssSpec');
   dojo.require('com.ibm.oneui.test.jasmine.util.openAroundSpec');
   dojo.require('com.ibm.oneui.test.jasmine.util.proxySpec');
   dojo.require('com.ibm.oneui.test.jasmine.util.urlSpec');
} catch (e) {
   console.debug(e);
}
