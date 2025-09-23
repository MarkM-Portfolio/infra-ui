/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/paging/PagingHandler"
	], function (declare, PagingHandler) {
	
		/**
		 * Simple duplicate of the regular Paging handler with no
		 * "Feed for these items" link
		 */
		
		var NoFeedPagingHandler = declare("com.ibm.social.as.paging.NoFeedPagingHandler", 
		PagingHandler,
		{
			postCreate : function() {
				this.inherited(arguments);
				this.feedLink.destroyRecursive();
			}
		});
		
		return NoFeedPagingHandler;
	});
