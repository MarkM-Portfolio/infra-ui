/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/lang"
], function (lang) {

	var constants = lang.mixin(lang.getObject("lconn.search.Constants", true), {
		
		FacetIds: {
			DATE:				"Date",
			ECM_DOCUMENT_TYPE:	"EcmDocumentType",
			PERSON:				"Person",
			TAG:				"Tag",
			TREND:				"Trend"
		},
		
		FacetOrder: ["Trend", "Tag", "EcmDocumentType", "Person", "Date"],
		
		Namespaces: [
			{prefix:	"atom",			nameSpaceURI:	"http://www.w3.org/2005/Atom"}, 
			{prefix:	"sn",			nameSpaceURI:	"http://www.ibm.com/xmlns/prod/sn"}, 
			{prefix:	"xhtml",		nameSpaceURI:	"http://www.w3.org/1999/xhtml"},
			{prefix:	"ibmss",		nameSpaceURI:	"http://www.ibm.com/search/social/2011"},
			{prefix:	"ibmsc",		nameSpaceURI:	"http://www.ibm.com/search/content/2010"},
			{prefix:	"openSearch",	nameSpaceURI:	"http://a9.com/-/spec/opensearch/1.1/"},
			{prefix:	"app",			nameSpaceURI:	"http://www.w3.org/2007/app"}
		]
		
	});
	return constants;
});
