/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
(function() {

dojo.provide("jazz.core.debug");
dojo.require("jazz.client.xhr");
dojo.require("net.jazz.ajax.contextRoot");

var JS_SERVLET = net.jazz.ajax.contextRoot() + "/web/_js/";

jazz.core.debug = function(exception) {
	if (exception instanceof Error)
		try {
			return primDebug(exception);
		} catch (e) {
		}
	return null;
};

function primDebug(exception) {
	var result, url = getURL(exception);
	console.log(exception.toString()); 
	jazz.client.xhrPost({
		sync: true,
		url: JS_SERVLET,
		postData: dojo.toJson({
			url: url,
			message: getMessage(exception),
			line: getLine(exception),
			stack: getStack(exception)
		}),
		headers: {
			'Content-Type': "text/json",
			'Accept': "text/json"
		},
		handleAs: "json",
		load: function(json) {
			result = json.message;
		},
		error: onError
	});
	return result;
};

function getMessage(exception) {
	return exception.message;
}

function getStack(exception) {
	var result = exception.stack.split("\n");
	for (var i = 0; i < result.length; i++)
		result[i] = parseStackFrame(result[i]);
	return result;
}

var getURL, getLine, parseStackFrame;
if (dojo.isWebKit) {
	getURL = function(exception) {
		return exception.sourceURL;
	};
	getLine = function(exception) {
		return exception.line;
	};
	/*Object*/ parseStackFrame = function(/*String*/ line) {
		var match= line.match(new RegExp(".*?(http\\S*):(\\d*):(\\d*).*"));
		if (match != null) {
			return {
				url: match[1],
				line: parseInt(match[2])
			};
		}
		return {text: line};
	};
} else if (dojo.isFF) {
	getURL = function(exception) {
		return exception.fileName;
	};
	getLine = function(exception) {
		return exception.lineNumber;
	};
	/*Object*/ parseStackFrame = function(/*String*/ line) {
		var idx0 = line.indexOf("("),
			idx1= line.lastIndexOf("@"),
			idx2= line.lastIndexOf(":");
		if (idx1 >= 0 && idx1 < idx2) {
			return {
				token: line.substring(0, idx0),
				url: line.substring(idx1 + 1, idx2),
				line: parseInt(line.substring(idx2 + 1))
			};
		}
		return {text: line};
	};
}

function onError() {
	console.log("onError");
}

})();