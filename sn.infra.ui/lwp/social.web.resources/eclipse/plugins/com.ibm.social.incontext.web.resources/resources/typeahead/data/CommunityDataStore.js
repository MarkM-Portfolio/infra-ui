/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.typeahead.data.CommunityDataStore");

dojo.require("com.ibm.social.incontext.typeahead.data.DataStore");

dojo.declare("com.ibm.social.incontext.typeahead.data.CommunityDataStore", [com.ibm.social.incontext.typeahead.data.DataStore], {
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
