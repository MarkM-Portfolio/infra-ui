/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */
define([
	"dojo/has",
	"ic-incontext/util/url"
], function (has, urlModule) {

	(function(){
	
	   var uri = com.ibm.social.incontext.util.uri,
	      url = urlModule;
	   uri.parseUri = url.parse;
	   uri.writeUri = url.write;
	   uri.rewriteUri = url.rewrite;
	   uri.splitQuery = url.splitQuery;
	   uri.getRequestParameters = url.getRequestParameters;
	   uri.writeParameters = url.writeParameters;
	
	   uri.makeAtomUrlIESafe = function(urlValue) {
	      if (has("ie") && urlValue) {
	         urlValue = url.parse(urlValue);
	         urlValue.queryParameters.format = "xml";
	         urlValue = url.write(urlValue);
	      }
	      return urlValue;
	   };   
	})();
	
	return com.ibm.social.incontext.util.uri;
});
