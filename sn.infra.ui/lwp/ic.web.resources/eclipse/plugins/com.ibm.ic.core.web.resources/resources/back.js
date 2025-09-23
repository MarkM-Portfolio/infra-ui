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

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/has"
], function (dojo, lang, windowModule, dom, domConstruct, domStyle, has) {

   var win = windowModule.global;
   
	function shouldIgnoreUrlChange() {
		var ignoreUrlChangeFunction = dojo.getObject("ic-share.fileviewer.FileViewer.shouldIgnoreUrlChange");
		if (ignoreUrlChangeFunction) {
			return ignoreUrlChangeFunction();
		}
		return false;
	}	

	var registerBackButtonSupport = function ()
	{
		// initialize recentLocationHash
		var recentLocationHash = win.location.hash;
		
		// declare vars in outer function so that they're shared by inner functions
		var recentIframeQuery = true;
		var isIframeTransitioning = true;
		var expectedIFrameQuery = true;
		
		var IFRAME_ID = "lc.iframeElement";
		
		var iframeWindow = null;
		var iframeNode = null;
		var iframeLoc = null;
			
		var resetState = function() {
			recentLocationHash = win.location.hash;
			recentIframeQuery = iframeLoc.search;
			isIframeTransitioning = false;
			expectedIFrameQuery = null;
		};
		
		var invokeCallback = function()
		{
			if (win.lconn.core.WidgetPlacement.URLChangeCallBack != null) {
			   for (var i = 0; i < win.lconn.core.WidgetPlacement.URLChangeCallBack.length; i++)
			      win.lconn.core.WidgetPlacement.URLChangeCallBack[i](win.location.href);
			}
		};	
		
		var createBackgroundIframe = function() {
			var iFrame = domConstruct.create("iframe");
			
			var uri = require.toUrl(location.href);
		
			iFrame.id = IFRAME_ID;
			var baseUrl = win.WidgetPlacementConfig.params.contextRoot + "/static/" + win.WidgetPlacementConfig.params.version;
			if(has("ie")){		
				iFrame.src = ( baseUrl + "/nav/blankIE.html" + (uri.fragment ? "?" + uri.fragment : ""));
			}else{
				iFrame.src = ( baseUrl + "/nav/Blank.html" + (uri.fragment ? "?" + uri.fragment : ""));
			}
			domStyle.set(iFrame, "display", "none");
			domConstruct.place(iFrame, win.document.body, "last");
			
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
			if(!(lang.trim(value).length == 0)) { return; }
			
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
	
		if(has("ie"))
		{	
			createBackgroundIframe();
				// shortcuts to the objects we'll be using a lot
			iframeWindow = win[IFRAME_ID];
			iframeNode = dom.byId(IFRAME_ID);
			iframeLoc = iframeWindow.location;
			
			// initialize state (transition to s1)
			resetState();
			var pollLocation = function()
			{
				// check to see if we're in an IFrame location transition (s4 or s5)
				// 
				// Note: recentLocationHash check is a workaround for Defect 30120
				// TODO: Revisit algorithm to verify correctness in all edge cases
				if(isIframeTransitioning && recentLocationHash == win.location.hash) {
					// if the IFrame's location has caught up (s5), transition back to
					// the stable state (s1)
					if (iframeLoc.search == expectedIFrameQuery) {
						resetState();
					}
					// whether we were in s4 or s5, return
					return;
				}
				
				// if we're still in a stable state (s1), do nothing
				if(recentLocationHash == win.location.hash && recentIframeQuery == iframeLoc.search) {
					return;
				}
				
				// if we're still going, either the window's location has changed (s2)
				// or the IFrame's location has changed as a result of the user clicking
				// the back or forward button (s3)
				if(recentLocationHash != win.location.hash) {
					
					// workaround for Defect 30120
					recentLocationHash = win.location.hash;
					
					if (shouldIgnoreUrlChange()) {
						return;
					}
					
					// s2 (window location changed)
					var locationUri = require.toUrl(win.location.href);
					// transition to s4
					isIframeTransitioning = true;
					expectedIFrameQuery = setUriQuery(iframeLoc.search, locationUri.fragment || "");
					iframeNode.src = setUriQuery(iframeNode.src, locationUri.fragment || "");
					return invokeCallback();
				} else {
					// s3 (iframe's location changed via user action)
					var iframeUri = require.toUrl(iframeLoc.href);
					// update the browser's URI
					win.location.href = setUriFragment(win.location.href, iframeUri.query || "");
					// transition to s1
					resetState();
					return invokeCallback();
				}
			};
			win.setInterval(pollLocation, 500);
		}
		else
		{
			var pollLocation = function()
			{
				// bail out early if the value after the hash hasn't changed
				if(win.location.hash == recentLocationHash) {
					return;
				}
				// otherwise, save a reference to the new current hash, and process the new URI
				recentLocationHash = win.location.hash;

				if (shouldIgnoreUrlChange()) {
					return;
				}

				return invokeCallback();
			};
			win.setInterval(pollLocation, 500);
		}
	}
	
	win.registerBackButtonSupport = registerBackButtonSupport;	
	return win;
});
