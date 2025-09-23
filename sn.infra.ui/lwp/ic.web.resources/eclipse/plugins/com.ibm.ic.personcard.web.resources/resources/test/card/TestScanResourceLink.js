/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"ic-personcard/scanner",
	"ic-ui/util/xhrintercept",
	"ic-ui/util/xhrproxy"
], function (scanner, xhrintercept, xhrproxy) {

	// bring in xhr code
	com.ibm.oneui.util.xhr.addRequestInterceptor(function(request) {
		if (request.method == "GET" && !request.args.contentType)
			request.args.contentType = " ";
	});
	
	
	return com.ibm.social.personcard.test.card.TestScanResourceLink;
});
