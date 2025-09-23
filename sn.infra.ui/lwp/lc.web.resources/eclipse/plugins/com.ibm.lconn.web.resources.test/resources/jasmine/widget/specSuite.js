/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Suite of Widget Jasmine specs
 * @module lconn.test.jasmine.widget.specSuite
 * @author Kristina Mayo <ktopchi@us.ibm.com>
 */

dojo.provide('lconn.test.jasmine.widget.specSuite');
try {
   dojo.require('lconn.test.jasmine.widget.CommonTags.specSuite');
   dojo.require('lconn.test.jasmine.widget.palette.specSuite');
   dojo.require('lconn.test.jasmine.widget.urlPreview.specSuite');
} catch (e) {
   console.debug(e);
}
