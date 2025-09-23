/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-incontext/typeahead/data/DataStore"
], function (declare, DataStore) {

	var CommunityDataStore = declare("com.ibm.social.incontext.typeahead.data.CommunityDataStore", DataStore, {
	    _getCacheKey: function(keywordArgs) {
	        var cacheKey = this.inherited(arguments)
	            + "\n" + (keywordArgs.queryOptions.communityType || "")
	        return cacheKey;
	    },
	
	    _getParams: function(keywordArgs) {
	    	  var params = this.inherited(arguments);
	
	        params.communityType = keywordArgs.queryOptions.communityType;
	        params.orgId = keywordArgs.queryOptions.orgId;
	
	        return params;
	    }, 
	    
	    _getResponseItems: function(response,keywordArgs){
	    	  var items = response.entry || [];
	        return items;
	    }
	});
	
	return CommunityDataStore;
});
