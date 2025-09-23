/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.personcard.test");
dojo.require('com.ibm.lconn.personcard.link');
dojo.require('com.ibm.oneui.util.Url');

// Suggest the best default profiles url
var profiles;
if (dojo.getObject("lconn.core.config.services.profiles")) 
	profiles = lconn.core.config.services.profiles.url;
else {
	var base = new com.ibm.oneui.util.Url(window.location.href);
	base.path = "/profiles";
	profiles = base.toString();
}
dojo.byId("url").value = profiles;

function getUrl(param, value) {
	var base = dojo.byId("url").value;
	var url = new com.ibm.oneui.util.Url(base);
	url.path += "/html/profileView.do";
	url.getQuery()[param] = value;
	return url.toString();
}
function setUrlFromInput(id, param, input) {
	dojo.byId(id).href = getUrl(param, input.value);
}
function changeUrl() {
	var url = dojo.byId("url").value;
	com.ibm.lconn.personcard.link._setUrls({
		url: url,
		secureUrl: url
	});
	resetLinks();
	rebuildLinks();
}

function resetLinks() {
	dojo.query("a").forEach(function(a) {
		if (dojo.hasClass(a, "lotusResourceLink")) {
			var id = dojo.attr(a, "widgetid");
			if (id) {
				var w = dijit.byId(id);
				w.destroyRecursive(true); // tear down the link
				dojo.attr(a, "widgetid", null);
				a._scanned = false; // reset the scanner
			}
		}
	});
	dojo.query(".lotusResourceLinkArrow").forEach(dojo.destroy);
}

function rebuildLinks() {
	dojo.query("input").forEach(function(input) {
		var key = dojo.attr(input, "data-key");
		var id = dojo.attr(input, "data-for");
		if (key && id) {
			dojo.connect(input, "onblur", function() {
				resetLinks();
				setUrlFromInput(id, key, input);
			});
			setUrlFromInput(id, key, input);
		}
	});
}
