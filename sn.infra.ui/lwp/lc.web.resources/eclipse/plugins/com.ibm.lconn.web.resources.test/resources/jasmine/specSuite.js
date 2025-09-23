/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Suite of all Jasmine specs
 * 
 * @module lconn.test.jasmine.specSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide('lconn.test.jasmine.specSuite');
try {
   dojo.require('lconn.test.jasmine.main');
   dojo.require('lconn.test.jasmine.action.specSuite');
   dojo.require('lconn.test.jasmine.app.specSuite');
   dojo.require('lconn.test.jasmine.bizCard.specSuite');
   dojo.require('lconn.test.jasmine.dijit.specSuite');
   dojo.require('lconn.test.jasmine.dojo.specSuite');
   dojo.require('lconn.test.jasmine.dojox.specSuite');
   dojo.require('lconn.test.jasmine.core.specSuite');
   dojo.require('lconn.test.jasmine.ckeditor.specSuite');
   dojo.require('lconn.test.jasmine.globalization.specSuite');
   dojo.require('lconn.test.jasmine.lcTextArea.specSuite');
   dojo.require('lconn.test.jasmine.mentions.specSuite');
   dojo.require('lconn.test.jasmine.oauth.specSuite');
   dojo.require('lconn.test.jasmine.typeahead.specSuite');
   dojo.require('lconn.test.jasmine.util.specSuite');
   dojo.require('lconn.test.jasmine.widget.specSuite');

   // TODO: move to own specSuite
   dojo.require('com.ibm.lconn.layout.test.jasmine.specSuite');
}
catch (e) {
   console.debug(e);
}
