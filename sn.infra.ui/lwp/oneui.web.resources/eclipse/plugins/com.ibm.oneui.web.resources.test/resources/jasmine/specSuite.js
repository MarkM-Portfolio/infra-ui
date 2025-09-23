/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Suite of all OneUI Jasmine specs
 * 
 * @module com.ibm.oneui.test.jasmine.specSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide('com.ibm.oneui.test.jasmine.specSuite');
try {
   dojo.require('com.ibm.oneui.test.jasmine.controls.specSuite');
   dojo.require('com.ibm.oneui.test.jasmine.util.specSuite');
   dojo.require('com.ibm.oneui.test.jasmine.layoutSpec');
} catch (e) {
   console.debug(e);
}
