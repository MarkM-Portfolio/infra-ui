/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
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
dojo.provide("net.jazz.ajax.ui.internal.OpenSocialJazz");

dojo.require("jazz.util.internal.login");
dojo.require("jazz.ui.underlay");

dojo.require("net.jazz.ajax.viewletWebUIRoot");

(function() {

if (!dojo.getObject("gadgets.io.makeRequest"))
	return;

var gio = gadgets.io;

var _baseUrl = (function(){
	var baseURI = net.jazz.ajax.viewletWebUIRoot();
	if (!baseURI) {
		baseURI = document.baseURI;
		if (!baseURI) {
			var baseTags = document.getElementsByTagName('base');
			baseURI = (baseTags && baseTags[0].href) || document.location.href;
		}
	}
	return new dojo._Url(baseURI);
})();
var _baseHost = _baseUrl.scheme + "://" + _baseUrl.authority;

// set the appropriate content related headers before making a gadget xhr call
function addContent(args, params) {
	var headers = args.headers || {};
	// In dojo.xhr, contentType overrides the value specified in headers
	if (args.contentType) {
		headers["Content-Type"] = args.contentType;
	} else if (args.headers && args.headers["Content-Type"]) {
		headers["Content-Type"] = args.headers["Content-Type"];
	} else {
		headers["Content-Type"] = "application/x-www-form-urlencoded";
	}
	if (args.handleAs && args.handleAs.toLowerCase() == "json") {
		params.CONTENT_TYPE = "JSON";
		headers["Accept"] = "text/json";
	}
	params.HEADERS = headers;
	if (args._jazzXHR) {
		params.AUTHORIZATION = "OAUTH";
		params.REFRESH_INTERVAL = 0;
	}
};

function fixUrl(url) {
	if (url.charAt(0) === "/")
		url = _baseHost + url;
	var result;
	while (url !== (result = url.replace(/\/[^\/]+\/\.\.\//g, "/")))
		url = result;
	return result;
};

var oldXhr = dojo.xhr;

var activeRequest = false;
var requestQueue = [];

function issueRequest(method, args, deferred) {
	var params = {};
	if (args.sync) {
		args.url = gadgets.io.getProxyUrl(fixUrl(args.url), {'STREAM': true});
		return oldXhr(method, args);
	} else {
		addContent(args, params);
		params.METHOD = method;
		switch(method) {
			case "GET":
			case "HEAD":
				params.REFRESH_INTERVAL = 0;
				break;
			case "POST":
				if (args.postData || args.content)
					params.POST_DATA = args.postData || gio.encodeValues(args.content);
				break;
		}
		
		switch (args.handleAs) {
			case "xml":
				params.CONTENT_TYPE = gadgets.io.ContentType.DOM; 
				break;
			case "json":
			case "json-comment-optional":
			case "json-comment-filtered":
				params.CONTENT_TYPE = gadgets.io.ContentType.JSON;
				break;
			case "text":
			case "javascript":
				params.CONTENT_TYPE = gadgets.io.ContentType.TEXT;
				break;
		}
		
		/* 
		 * This is a workaround for JIRA. We hit the following defect when using 'Accept' headers with Shindig.
		 * See https://issues.apache.org/jira/browse/SHINDIG-1181
		 * 
		 * Forwarding the 'Accept' header as a custom, internal header works, but we need support on the server for it. 
		 */
		if (params.HEADERS["accept"] != null) {
			params.HEADERS["X-com-ibm-opensocial-accept"] = params.HEADERS["accept"];
		}
		
		params.HEADERS["X-Jazz-CSRF-Prevent"] = dojo.cookie("JSESSIONID");
		//params[gadgets.io.RequestParameters.GET_FULL_HEADERS] = true;
		if(gadgets.io.RequestParameters.STREAM){
			params[gadgets.io.RequestParameters.STREAM] = true;// turn on streaming mode   
	  	}
		
		var url = fixUrl(args.url);
		gio.makeRequest(url,function(response) {			
			if (response.rc == 504) {
				/* WORKAROUND ALERT: makeRequest on iGoogle will time out if a request takes longer than 
				 * ~10 seconds and return a 504. The workaround is to simply re-issue the request. */
				var retryDeferred = jazz.client.xhr(method, args);
				retryDeferred.addCallback(function (resp) {
					deferred.callback(resp.data || resp);
				});
				retryDeferred.addErrback(function (err) {
					deferred.errback(err);
				});
			} else {
				if (!response.oauthApprovalUrl && response.oauthError) {
					var errorText = response.oauthErrorText;
					var errorObject = new Error(errorText);
					errorObject.responseText = errorText;
					deferred.errback(errorObject);
				} else {
					deferred.callback(response.data || response);
				}
				_interceptorCallback && _interceptorCallback(response);
			}	
			
			if (requestQueue.length > 0) {
				var req = requestQueue.pop();
				issueRequest(req.method, req.args, req.deferred);
			} else {
				activeRequest = false;
			}
			
		}, params);
		
		var load = args.load, err = args.error, handle = args.handle;
		if(load && dojo.isFunction(load))
			deferred.addCallback(function(value){
				return load(value, deferred.ioArgs);
			});
		if(err && dojo.isFunction(err))
			deferred.addErrback(function(value){
				return load(value, deferred.ioArgs);
			});
		if(handle && dojo.isFunction(handle))
			deferred.addBoth(function(value){
				return handle(value, deferred.ioArgs);
			});
	}		
};

dojo.xhr = function xhr(method, args) {
	var deferred = new dojo.Deferred();
	deferred.ioArgs = {
		args : args,
		url: args.url,
		xhr: new XHRImpl()
	};
	if (activeRequest) {
		requestQueue.push({
			method: method,
			args: args,
			deferred: deferred
		});
		return deferred;
	}
	activeRequest = true;
	
	issueRequest(method, args, deferred);
	return deferred;
};

// dummy implementation of XMLHttpRequest with just the methods and fields used in jazz.client.xhr 
function XHRImpl(){
	this.status = 0;
	this.getResponseHeader = function(headerName){
	},
	this.abort = function() {
	}
};

var isWinOpen = false;

net.jazz.ajax.ui.internal.OpenSocialJazz = function(request, response, reqMgr) {
	// check to see if the response contained an OAuth authorization request
	var oauthUrlStr = response.dojoResponse
			&& response.dojoResponse.oauthApprovalUrl;
	//TODO check for reponse.dojoResponse.oauthError & oauthErrorText
	if(!oauthUrlStr)
		return false;
	
	// OAuth challenge - clear all requests 
	activeRequest = false;
	while (requestQueue.length > 0) {
		var req = requestQueue.pop();
	}
	
	jazz.ui.underlay.show({
		zIndex: 1000,
		animate: false,
		opacity: 1,
		stopEvents: true,
		color: "white"
	});

	var loginDiv = dojo.create("div", {id: "net-jazz-ajax-ui-internal-OpenSocialJazz-login", className: "net-jazz-ajax-ui-internal-OpenSocialJazz-login"}, document.body);
	var link = jazz.util.internal.login.insertLoginLink(loginDiv, _baseUrl.authority);
	var linkConnect = dojo.connect(link, "onclick", null, function(e) {
		dojo.stopEvent(e);
		if (!isWinOpen) {
			// if there is not already an oauth popup open, then launch a new window
			// for the user to accept or reject the authorization request
			isWinOpen = true;
			var win = window.open(oauthUrlStr, "oauthPopup", "location=1,status=1,scrollbars=1,width=650,height=500");
			function replayRequest () {
				var deferred = jazz.client.xhr(request.method, request.args);
				deferred.addCallback(function (resp) {
					request.remoteDeferred.ioArgs = deferred.ioArgs;
					request.clientDeferred.callback(resp);
				});
				deferred.addErrback(function (err) {
					request.remoteDeferred.ioArgs = deferred.ioArgs;
					request.clientDeferred.errback(err);
				});
			}
			
			function onPopupClose() {
				if(win.closed) {
					clearInterval(onPopupCloseInterval);
					win = null;
					isWinOpen = false;
					dojo.disconnect(linkConnect);
					loginDiv.parentNode.removeChild(loginDiv);
					jazz.ui.underlay.hide();
					replayRequest();
				}
			}
			var onPopupCloseInterval = setInterval(onPopupClose, 100);
		}
	});
	return true;
};

net.jazz.ajax.ui.internal.OpenSocialJazz.RequestInterceptor = function(request) {
	if (request.args)
		request.args._jazzXHR = true;
}

var _interceptorCallback;
/* Allow piggybacking off this response interceptor. */
net.jazz.ajax.ui.internal.OpenSocialJazz._registerResponseListener = function(/* func */ callback) {
	_interceptorCallback = callback;
}

})();
