/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.personcard.test.card.TestScanResourceLink");

// bring in xhr code
dojo.require("com.ibm.oneui.util.xhrintercept");
dojo.require("com.ibm.oneui.util.xhrproxy");

com.ibm.oneui.util.xhr.addRequestInterceptor(function(request) {
	if (request.method == "GET" && !request.args.contentType)
		request.args.contentType = " ";
});

dojo.require("com.ibm.social.personcard.scanner");

