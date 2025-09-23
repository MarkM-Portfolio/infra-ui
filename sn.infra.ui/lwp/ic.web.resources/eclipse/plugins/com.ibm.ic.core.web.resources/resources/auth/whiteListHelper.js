define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang"
], function (array, declare, lang) {

	/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
	
	var whiteListHelper = declare("lconn.core.auth.whiteListHelper", null, {
	    // summary: An help utility to handle whitelisted URLs for the FBA auth mechanism
	    
	    // _list: Array of strings
	    //		List of "whitelisted" URL patterns
	    _list: null,
	    
	    // _serviceJson: JSON Obj
	    //		JSON object containing the url to the Connections services configured in LotusConnections-Config.xml
	    _serviceJson: null,
	    
	    // _proxyUrl: String
	    //		url for the Ajax proxy.
	    //		Needed to avoid false-positive in the isWhiteListedURL routine as the proxy url is likely to be part of the whitelist patterns
	    _proxyUrl: null,
	    
	    constructor: function(serviceJson, proxyUrl){
	        if (serviceJson == null) {
	            throw new Error("serviceJson or proxyUrl is null");
	        }
	        
	        this._serviceJson = serviceJson;
	        
	        if (proxyUrl != null) {
	            this._proxyUrl = proxyUrl;
	        }
	        
	        this._initList();
	    },
	    
	    _initList: function(){
	        // summary: init the white list. Called by the constructor
	        
	        if (this._list == null) {
	            this._list = [];
	            try {
	                for (var key in this._serviceJson) {
	                    // we compare both with the url as registered in LotusConnections-Config.xml and
	                    // the "proxyfied" url. That means that we ignore the potential FBA returned by the proxy
	                    // for 3rd party widgets as well (no way to distinguish them for FBA returned by the remote
	                    // 3rd party service)						
	                    
	                    // deliberatly includes both non-secure and secure urls to the list regardless of the way the page is accessed
	                    // we remove the schema in the patterns to facilite detection in case of proxfied url
	                    
	                    // note: only handle http and https: schema. There is no other supported schemas in 2.5.
	                    
	                    if ((this._serviceJson[key].url != null) && (lang.isString(this._serviceJson[key].url))) {
	                        var urlPattern = this._serviceJson[key].url.replace("http://", "");
	                        var urlPattern = urlPattern.replace("https://", "");
	                        
	                        if (array.indexOf(this._list, urlPattern) == -1) {
	                            this._list.push(urlPattern);
	                        }
	                    }
	                    
	                    if ((this._serviceJson[key].secureUrl != null) && (lang.isString(this._serviceJson[key].secureUrl))) {
	                        var urlPattern = this._serviceJson[key].secureUrl.replace("http://", "");
	                        var urlPattern = urlPattern.replace("https://", "");
	                        
	                        if (array.indexOf(this._list, urlPattern) == -1) {
	                            this._list.push(urlPattern);
	                        }
	                    }
	                }
	            } 
	            catch (e) {
	                console.log("Error while creating the whitelisted urls");
	                console.log(e);
	                this._list = [];
	            }
	        }
	    },
	    
	    isWhiteListedURL: function(/* String */url){
	        // summary: Check whether the passed url matches one of the white listed url patterns        
	        
	        var isWhiteListed = false;
	        if(typeof(url) == "undefined") return false;
	
	        
	        // relative urls are always whitelisted (except when using proxyUrl where we still need to check)
	        if ((url.indexOf("http://") != 0) && (url.indexOf("https://") != 0) &&
	        ((this._proxyUrl == null) || (this._proxyUrl != null && url.indexOf(this._proxyUrl) == -1))) {
	            // TODO: more robust test for relative URLs
	            // this will make it for 2.5 usecases
	            isWhiteListed = true;
	        }
	        else {
	            // remove the proxy part of the url if any
	            if ((this._proxyUrl != null) && (url.indexOf(this._proxyUrl) == 0)) {
	                // "proxyied" urls are escaped
	                url = unescape(url);
	                url = url.replace(this._proxyUrl, "");
	            }
	            
	            isWhiteListed = !array.every(this._list, function(urlPattern){
	            
	                return (url.indexOf(urlPattern) == -1);
	            });
	        }
	              
	        return isWhiteListed;
	    }
	});
	
	return whiteListHelper;
});
