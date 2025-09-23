/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.gadget.component.ActivityStreamInit");

(function(scope){
	var bootAS;
	var hasOpenViews = false;
	
	function setupPrefs(){
		if(window.location.search){
			var urlParams = window.location.search.substring(1,  window.location.search.length);	
		}

		var prefs = {
				getString: function(key, defaultParam){
					return (this[key]) ? this[key] : defaultParam;
				},
				
				getBool: function(key, defaultParam){
					var param = this.getString(key);
					if(param && param === "true"){
						return true;
					} else if (defaultParam) {
						return defaultParam;
					} else {
						return false;
					}						
				}
		}

		if(urlParams){
			dojo.mixin(prefs, dojo.queryToObject(urlParams));	
		}
		asc = {};
		asc.isDebug = prefs.getBool("debug", false);
		asc.isDebugFF = prefs.getBool("debugFF", false);
		asc.showSharebox = prefs.getBool("showSharebox", false);
		asc.isInlineCommentingEnabled = prefs.getBool("isInlineCommentingEnabled", false);
		asc.shareboxBoardId = prefs.getString("shareboxBoardId", "");
		asc.shareboxPostType = prefs.getString("shareboxPostType", "");
		asc.showFeedLink = prefs.getBool("showFeedLink", false);
		asc.showHeader = prefs.getBool("showHeader", false);
		asc.asMaxWidth = prefs.getString("asMaxWidth", "");
		asc.asMinWidth = prefs.getString("asMinWidth", "");
		asc.isCommunityStream = prefs.getBool("isCommunityStream", false);
		asc.asFeed = prefs.getString("asFeed", null);
		asc.asMode = prefs.getString("asMode", null);
		asc.userEmail = prefs.getString("actionEmail", null);
		asc.asConfig = prefs.getString("asConfig", null);
		asc.getProxiedUrl = function(url){return url;};
		asc.currentView = prefs.getString("currentView", "narrow");
		asc.isRTL = prefs.getBool("isRTL", false);
		asc.theme = prefs.getString("asTheme", "gen4");
		asc.count = prefs.getString("count", null);
		asc.dynamicHeight = prefs.getBool("dynamicHeight", false);
		
		//
		// logging
		//
		asc.log = (function(undef) {								
			var logf = console.debug || console.log;
			
			return (isFunction(logf) && logf.apply) ?
				function() { logf.apply(console, arguments); } :
				function() { logf(Array.prototype.slice.call(arguments)); };	//
			})();
			
		asc.log("ActivityStream.html - gettin' goin'. asc: ", asc);
		
		asc.type = asc.currentView;
		
		asc.log("ActivityStream.html - curViewName: ", asc.currentView);			
		asc.log("ActivityStream.html - asc.isRTL = ", asc.isRTL);
		
		asc.versionStamp = versionStamp_;
		
		setupCSS();
	}
	
	var versionStamp_ = (lconn.core.config.versionStamp)? lconn.core.config.versionStamp : "1234567890";
	var webResourcesUrl_ = "/connections/resources";
	var config = {};
	
	
	function setupCSS(){
		config.activityStreamCss = [
    		"\/web\/_style?include=com.ibm.lconn.core.styles.oneui3\/base\/package3" + ( asc.isRTL ? "RTL" : "" ) + ".css{etag}",
    		"\/web\/_style?include=com.ibm.lconn.core.styles.oneui3\/sprites" + ( asc.isRTL ? "RTL" : "" ) + ".css{etag}",						
    		"\/web\/_lconntheme\/{theme}"+( asc.isRTL ? "RTL" : "" )+".css?{etag}&version=oneui3",              
    		"\/web\/_lconnappstyles\/{theme}\/homepage"+( asc.isRTL ? "RTL" : "" )+".css?{etag}&version=oneui3",
    		"\/web\/_lconnappstyles\/{theme}\/activityStream"+( asc.isRTL ? "RTL" : "" )+".css?{etag}&version=oneui3",
    		"\/web\/_style?include=com.ibm.social.as\/gadget\/css\/gadgetOverride" + ( asc.isRTL ? "RTL" : "" ) + ".css{etag}"               				                   								
    	];
		                    	
    	// before we call the bootloader, check if we want extra css			
    	if ( asc.type === "narrow" ) {
    		config.activityStreamCss.push("\/web\/_style?include=com.ibm.social.as\/gadget\/css\/componentOverrideNarrow" + ( asc.isRTL ? "RTL" : "" ) + ".css{etag}");				
    	}
	}
	
	//
	// utility functions
	//
	function isFunction(func) {
		return func && asc.toString.call(func) === '[object Function]';
	}
	
	
	/**
	 * Load the CSS resources
	 */
	function loadCss_(){				
		var head = document.getElementsByTagName("head")[0];
		
		var extraCss = config && config.activityStreamCss || [];
		forEach_(extraCss, function(cssLink) {					
			loadCssLink_(head, cssLink);
		});
	}
	
	/**
	 * Ligth weight foreach function
	 */
	function forEach_(arr, onItem) {
		if (arr && onItem) {
			var i, len = arr.length;
		
			for (i = 0; i < len; i++) {
				onItem(arr[i], i);
			}	
		}
	}
	
	/**
	 * Load extra CSS resources
	 */
	function loadCssLink_(head, l, id) {
		var isRtl = asc.isRTL;
		var styleEl = null;
		
		l = l.replace("{_rtl}", (isRtl ? "_RTL" : "")); // _RTL
		l = l.replace("{rtl}", (isRtl ? "RTL" : ""));  // RTL
		l = l.replace("{rtlTF}", (isRtl ? "&rtl=true" : "&rtl=false"));
		l = l.replace("{theme}", asc.theme);
		l = l.replace("{etag}", "&etag=" + versionStamp_);
		
		styleEl = document.createElement("link");
		styleEl.href = webResourcesUrl_ + l;
		styleEl.type = "text/css";
		styleEl.rel = "stylesheet";
		
		if (id) {
			styleEl.id = id;
		}
		
		head.appendChild(styleEl);
	}
	
	var stringIfy = window.JSON && window.JSON.stringIfy ?
		function(v) { return JSON.stringIfy(v); } :
		function(v) { return '' + v; };	// dojo.toJSON chokes on circular objects, so avoiding
			
	function noOp() {}
	
	 function sendMessage(msg) {
	      if (window.parent && window.parent.postMessage)
	         window.parent.postMessage(msg, "*");
	 }
	 
	 function attachDynamicHeight(){
		 dojo.subscribe("com/ibm/social/as/event/resizeTextHeight", handleResize);
		 
	 }
	 
	 function getYCoord(elem) {
		 return elem.offsetParent ? (elem.offsetTop + getYCoord(elem.offsetParent)) : elem.offsetTop;
	 }
	 
	 function handleResize(){
		var height = 0;
        dojo.forEach(dojo.body().childNodes, function (n) {
           if (n.getBoundingClientRect) {
               var pos = dojo.position(n, true);
               height = Math.max(height, Math.floor(pos.y + pos.h));
           }
       });
       height += 20;
	   sendMessage("com/ibm/social/height_changed|" +height+'px');
	 }
	
	bootAS = function() {
		asc.log("ActivityStream.html - bootAS - entering");
		
		asc.util = new com.ibm.social.as.gadget.ASComponentUtil();
		asc.util.initLogger(); // must be first.. things will be starting to call as_console_debug

		com.ibm.social.as.util.xhr.XhrHandler.init({isGadget:false, useOauth: asc.useOAuth}); // we need xhr to know its context
		asc.util.initAS();
		asc.log("ActivityStream.html - bootAS - exiting, asc: ", asc);
	};
	
	
	
	scope.start = function(){
		setupPrefs();
		loadCss_();
		dojo.addOnLoad(bootAS);
		if(asc.dynamicHeight){
			dojo.addOnLoad(attachDynamicHeight);
		}
		asc.log("ActivityStream.html - beginning fetch of AS JS");	  
	}
	 		     

})(com.ibm.social.as.gadget.component.ActivityStreamInit);
