/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.paging.NoFeedPagingHandler");

dojo.require("com.ibm.social.as.paging.PagingHandler");

/**
 * Simple duplicate of the regular Paging handler with no
 * "Feed for these items" link
 */

dojo.declare("com.ibm.social.as.paging.NoFeedPagingHandler", 
[com.ibm.social.as.paging.PagingHandler],
{
	postCreate : function() {
		this.inherited(arguments);
		this.feedLink.destroyRecursive();
	}
});
