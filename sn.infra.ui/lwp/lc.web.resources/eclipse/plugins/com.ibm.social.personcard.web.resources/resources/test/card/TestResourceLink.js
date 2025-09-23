/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.personcard.test.card.TestResourceLink");

dojo.require("com.ibm.oneui.controls.ResourceLink");

// bring in xhr code
dojo.require("com.ibm.oneui.util.xhrintercept");
dojo.require("com.ibm.oneui.util.xhrproxy");

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
