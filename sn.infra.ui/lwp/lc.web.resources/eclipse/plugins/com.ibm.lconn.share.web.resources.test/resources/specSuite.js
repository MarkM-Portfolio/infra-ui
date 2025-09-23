/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Suite of all Jasmine specs
 * 
 * @module lconn.share.test.specSuite
 * @author Kristina Mayo <ktopchi@us.ibm.com>
 */

dojo.provide('lconn.share.test.specSuite');
try {
   dojo.require('lconn.share.test.bean.specSuite');
   dojo.require('lconn.share.test.widget.specSuite');
   dojo.require("lconn.share.test.util.TestHelperSpec");
   dojo.require("lconn.share.test.util.Html5utilSpec");
} catch (e) {
   console.debug(e);
}
