/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

/**
 * Suite of lconn.core.typeahead Jasmine specs
 * 
 * @module lconn.test.jasmine.typeahead.specSuite
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */

dojo.provide('lconn.test.jasmine.typeahead.specSuite');
try {
	dojo.require('lconn.test.jasmine.typeahead.DataReaderSpec');
	dojo.require('lconn.test.jasmine.typeahead.ServiceSpec');
	dojo.require('lconn.test.jasmine.typeahead.TypeAheadManagerSpec');
	dojo.require('lconn.test.jasmine.typeahead.ResultDropDownSpec');
	dojo.require('lconn.test.jasmine.typeahead.peopleFinder.specSuite');
	dojo.require('lconn.test.jasmine.typeahead.quickResults.specSuite');
} catch (e) {
	console.debug(e);
}
