/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.util.domStore');

com.ibm.lconn.gadget.util.domStore = 
	(function(){
	    var cache_ = [0],
	        elemDataKeyLookup = 'data-iContainer-data-' + +new Date();
	 
	    return function(elem) {
	 
	        var cacheIndex = dojo.attr(elem, elemDataKeyLookup),
	            nextCacheIndex = cache_.length;
	 
	        if(!cacheIndex) {
	        	cacheIndex = nextCacheIndex;
	            dojo.attr(elem, elemDataKeyLookup, nextCacheIndex);
	            cache_[cacheIndex] = {};
	        }
	 
	        return {
	            get : function(key) {
	                return cache_[cacheIndex][key];
	            },
	            set : function(key, val) {
	                cache_[cacheIndex][key] = val;
	                return val;
	            }
	        }	 
	    }	 
	})();
