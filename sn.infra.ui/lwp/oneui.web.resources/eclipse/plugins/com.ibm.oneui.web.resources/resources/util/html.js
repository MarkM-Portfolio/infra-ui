/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
dojo.provide("com.ibm.oneui.util.html");

(function() {

com.ibm.oneui.util.html = {
	
	// summary:
	//		provides functions for escaping and sanitizing user input or untrusted
	//		content, such that it is safe to use with innerHTML and free of scripting.
	//
	//      NOTE: This is provisional API. Clients using this API do so with the
	//		awareness that this class may be removed or substantially changed at
	//		future times without warning.
	// usage notes:
	//		- access this object via 'static' methods (e.g.
	//		  com.ibm.oneui.util.html.escape())
	//		- do not instantiate
	// since:
	//		0.7
	
	/* string */ escape: function(/* string */ text) {
		// summary:
		//		returns a new string with all special html characters in the given string
		//		escaped such that passing the result into innerHTML would produce a text
		//		node containing	the exact same content as the original input.
		//		e.g. "hello <b>world</b>" -> "hello &lt;b&gt;world&lt;/b&gt;"
		// usage notes:
		//		any user input that is passed into innerHTML and where markup is not
		//		supported should be passed through escape beforehand.
		
		// browser knows how to do this
		var span = document.createElement("span");
		span.appendChild(document.createTextNode(text));
		return span.innerHTML;
	},
	
	/* boolean */ hasScript: function(/* string */ html) {
		// summary:
		//		returns whether or not the given HTML snippet contains any scripting.
		//      This includes script tags, event handlers (e.g. onclick="..."), links
		//		with javascript urls (href="javascript:..."), and CSS expressions
		// usage notes:
		//		useful for cases where the user is allowed to input html markup,
		//		but rather than just removing the script on save, you want to alert
		//		the user of their invalid input.
		
		// IE7 and earlier automatically evaluate CSS expressions, so check first
		// IE also doesn't see script tags properly
		if (html.match(/\sstyle\s*=\s*["'`].*e(\/\*.*\*\/)?x(\/\*.*\*\/)?p(\/\*.*\*\/)?r(\/\*.*\*\/)?e(\/\*.*\*\/)?s(\/\*.*\*\/)?s(\/\*.*\*\/)?i(\/\*.*\*\/)?o(\/\*.*\*\/)?n(\/\*.*\*\/)?\s*(\/\*.*\*\/)?\(.+\).*["'`]/gi)
				|| html.match(/\sonerror\s*=\s*["'`].+["'`]/gi)
				|| html.match(/\ssrc\s*=\s*["'`]\s*javascript:.*["'`]/gi)
				|| html.match(/<\s*script/i)) {
			return true;
		}
		// convert to DOM element, then check element
		var div = document.createElement("div");
		div.innerHTML = html;
		if (_handleElement(div, false)) {
			return true;
		}
		return false;
	},
	
	/* string */ removeScript: function(/* string */ html) {
		// summary:
		//		returns a new string with all scripting removed. This includes script
		//		tags, event handlers (e.g. onclick="..."), links with javascript
		//		urls (href="javascript:..."), and CSS expressions
		// usage notes:
		//		this is only necessary when markup is allowed as input and the input is
		//		passed into innerHTML, where scripting is not allowed. e.g. for styled
		//		text input. For all other cases, use escape.
		
		// IE7 and earlier automatically evaluate CSS expressions, even with comments embedded
		// within them, so strip them out first. IE8 no longer supports CSS expressions.
		// IE also tries to load imgs off-DOM, so filter onerror as well
		if (dojo.isIE) {
			html = html.replace(/\sstyle\s*=\s*["'`].*e(\/\*.*\*\/)?x(\/\*.*\*\/)?p(\/\*.*\*\/)?r(\/\*.*\*\/)?e(\/\*.*\*\/)?s(\/\*.*\*\/)?s(\/\*.*\*\/)?i(\/\*.*\*\/)?o(\/\*.*\*\/)?n(\/\*.*\*\/)?\s*(\/\*.*\*\/)?\(.+\).*["'`]/gi, "");
			html = html.replace(/\sonerror\s*=\s*["'`].+["'`]/gi, "");
			if (dojo.isIE <= 7) {
				// some versions of IE7 are vulnerable to 118446
				html = html.replace(/\ssrc\s*=\s*["'`]\s*javascript:.*["'`]/gi, "");
			}
		}
		// convert to DOM element
		var div = document.createElement("div");
		div.innerHTML = html;
		
		// sanitize, convert back to text
		_handleElement(div, true);
		return div.innerHTML;
	}
};

//
// Internal functions; do not call
//

var BLACKLIST_ELEMS = [
	"script", "iframe", "frameset", "object", "embed", "applet"
];

// create set for fast lookup
var BLACKLIST = {};
for (var i=0;i<BLACKLIST_ELEMS.length;i++) {
	BLACKLIST[BLACKLIST_ELEMS[i]] = true;
}

var _handleElement = function(/* Element */ element, /* boolean */ modify) {
	// if modify=true, sanitizes the DOM, else returns whether or not it
	// has any script
	
	// check element
	var nodeName = element.nodeName.toLowerCase();
	if (BLACKLIST[nodeName]) {
		if (modify) {
			element.parentNode.removeChild(element);
		}
		return true;
	}
	
	var isAnchor = (nodeName == "a");
	var attrs = element.attributes;
	var attrsToRemove = [];
	for (var i=0;i<attrs.length;i++) {
		var attr = attrs[i];
		var name = attr.name.toLowerCase();
		var value = attr.value.toLowerCase();
		// strip event handlers (e.g. onload, onclick) and "javascript:" link hrefs
		if (value && value != "null" && (name.indexOf("on") == 0 || (isAnchor && name == "href" && value.indexOf("javascript:") != -1))) {
			if (modify) {
				attrsToRemove.push(name);
			}
			else {
				return true;
			}
		}
	}
	for (var i=0;i<attrsToRemove.length;i++) {
		// deleting on the fly changes indexes, so delete after
		element.removeAttribute(attrsToRemove[i]);
	}
	
	// check child elements recursively
	var children = element.childNodes;
	for (var i=0;i<children.length;i++) {
		var node = children[i];
		if (node.nodeType == 1) {
			var hasScript = _handleElement(node, modify);
			if (!modify && hasScript) {
				return true;
			}
		}
	}
	return false;
};

})();
