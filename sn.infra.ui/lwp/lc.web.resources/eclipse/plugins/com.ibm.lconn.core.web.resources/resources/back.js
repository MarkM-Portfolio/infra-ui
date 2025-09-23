/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.back");

function registerBackButtonSupport()
{
	// initialize recentLocationHash
	var recentLocationHash = window.location.hash;
	
	// declare vars in outer function so that they're shared by inner functions
	var recentIframeQuery = true;
	var isIframeTransitioning = true;
	var expectedIFrameQuery = true;
	
	var IFRAME_ID = "lc.iframeElement";
	
	var iframeWindow = null;
	var iframeNode = null;
	var iframeLoc = null;
		
	var resetState = function() {
		recentLocationHash = window.location.hash;
		recentIframeQuery = iframeLoc.search;
		isIframeTransitioning = false;
		expectedIFrameQuery = null;
	};
	
	var invokeCallback = function()
	{
		for (var i = 0; lconn.core.WidgetPlacement.URLChangeCallBack != null && i < lconn.core.WidgetPlacement.URLChangeCallBack.length; i++)
			lconn.core.WidgetPlacement.URLChangeCallBack[i](window.location.href);
		
		return;
	};	
	
	var createBackgroundIframe = function() {
		var iFrame = document.createElement("iframe");
		
		var uri = new dojo._Url(location.href);
	
		iFrame.id = IFRAME_ID;
		var baseUrl = WidgetPlacementConfig.params.contextRoot + "/static/" + WidgetPlacementConfig.params.version;
		if(dojo.isIE){		
			iFrame.src = ( baseUrl + "/nav/blankIE.html" + (uri.fragment ? "?" + uri.fragment : ""));
		}else{
			iFrame.src = ( baseUrl + "/nav/Blank.html" + (uri.fragment ? "?" + uri.fragment : ""));
		}
		iFrame.style.display = "none";
		document.body.appendChild(iFrame);
		
		return iFrame;
	};
	
	var setUriQuery = function(uri, queryString) {
		checkNotNull(uri, "uri");
		checkNotNull(queryString, "queryString");
		
		return replaceAfterToken(uri, "?", queryString);
	};
	
	var setUriFragment = function(uri, fragmentString) {
		checkNotNull(uri, "uri");
		checkNotNull(fragmentString, "fragmentString");
		
		return replaceAfterToken(uri, "#", fragmentString);
	};
	
	var checkNotNull = function(value, valueName) {
		if(value != null) { return; }
		
		if(valueName) {
			throw new Error(valueName + " cannot be null");
		}
	
		throw new Error("value cannot be null");
	};
	
	var checkNotEmpty = function(value, valueName) {
		if(!(dojo.trim(value).length == 0)) { return; }
		
		if(valueName) {
			throw new Error(valueName + " must be a non-empty string.  Saw: " + value);
		}
		
		throw new Error("value must be a non-empty string.  Saw: " + value);
	};
	
	var replaceAfterToken = function(string, token, replacement) {
		checkNotNull(token, "token");
		checkNotNull(string, "string");
		checkNotNull(replacement, "replacement");
		
		if(string.indexOf(token) == -1) {
			return string + token + replacement;
		}
		return string.slice(0, string.indexOf(token) + 1) + replacement;
	};

	if(dojo.isIE)
	{	
		createBackgroundIframe();
			// shortcuts to the objects we'll be using a lot
		iframeWindow = window[IFRAME_ID];
		iframeNode = dojo.byId(IFRAME_ID);
		iframeLoc = iframeWindow.location;
		
		// initialize state (transition to s1)
		resetState();
		var pollLocation = function()
		{
			// check to see if we're in an IFrame location transition (s4 or s5)
			// 
			// Note: recentLocationHash check is a workaround for Defect 30120
			// TODO: Revisit algorithm to verify correctness in all edge cases
			if(isIframeTransitioning && recentLocationHash == window.location.hash) {
				// if the IFrame's location has caught up (s5), transition back to
				// the stable state (s1)
				if (iframeLoc.search == expectedIFrameQuery) {
					resetState();
				}
				// whether we were in s4 or s5, return
				return;
			}
			
			// if we're still in a stable state (s1), do nothing
			if(recentLocationHash == window.location.hash && recentIframeQuery == iframeLoc.search) {
				return;
			}
			
			// if we're still going, either the window's location has changed (s2)
			// or the IFrame's location has changed as a result of the user clicking
			// the back or forward button (s3)
			if(recentLocationHash != window.location.hash) {
				
				// workaround for Defect 30120
				recentLocationHash = window.location.hash;
				
				// s2 (window location changed)
				var locationUri = new dojo._Url(window.location.href);
				// transition to s4
				isIframeTransitioning = true;
				expectedIFrameQuery = setUriQuery(iframeLoc.search, locationUri.fragment || "");
				iframeNode.src = setUriQuery(iframeNode.src, locationUri.fragment || "");
				return invokeCallback();
			} else {
				// s3 (iframe's location changed via user action)
				var iframeUri = new dojo._Url(iframeLoc.href);
				// update the browser's URI
				window.location.href = setUriFragment(window.location.href, iframeUri.query || "");
				// transition to s1
				resetState();
				return invokeCallback();
			}
		};
		setInterval(pollLocation, 500);
	}
	else
	{
		var pollLocation = function()
		{
			// bail out early if the value after the hash hasn't changed
			if(window.location.hash == recentLocationHash) {
				return;
			}
			// otherwise, save a reference to the new current hash, and process the new URI
			recentLocationHash = window.location.hash;
			return invokeCallback();
		};
		setInterval(pollLocation, 500);
	}
}
