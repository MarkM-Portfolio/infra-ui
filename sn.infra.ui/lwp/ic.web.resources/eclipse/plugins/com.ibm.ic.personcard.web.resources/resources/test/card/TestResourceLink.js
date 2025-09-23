/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"ic-ui/controls/ResourceLink",
	"ic-ui/util/xhrintercept",
	"ic-ui/util/xhrproxy"
], function (ResourceLink, xhrintercept, xhrproxy) {

	// bring in xhr code
	com.ibm.oneui.util.xhr.addRequestInterceptor(function(request) {
		if (request.method == "GET" && !request.args.contentType)
			request.args.contentType = " ";
	});
	
	/*lconn.core.card.providers.register(function(uri, link) {
		if (/\.oslccompact$/.exec(uri))
			return {
				"initialSmallHeight":200,
				"smallWidth":400,
				"smallPreview": "../../../lconn.core/test/card/person1Small.html",
				"largePreview": "../../../lconn.core/test/card/person1Large.html",
				"title": link.textContent,
				"icon":"https://nsjazz.raleigh.ibm.com:8001/jazz/web/com.ibm.team.process.web/ui/internal/images/project.gif"
			}
	});*/
	return com.ibm.social.personcard.test.card.TestResourceLink;
});
