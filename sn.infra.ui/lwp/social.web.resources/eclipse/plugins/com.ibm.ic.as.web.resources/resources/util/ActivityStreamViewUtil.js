/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/array",
		"dojo/_base/declare",
		"dojo/query",
		"dijit/registry"
	], function (array, declare, query, registry) {
	
		/**
		 * Utility helper for working with news items
		 * @author Jim Antill
		 */
		
		var ActivityStreamViewUtil = declare("com.ibm.social.as.util.ActivityStreamViewUtil", null,
		{
			/**
			 * Get the last news item displayed in the stream.
			 * @returns {NewsItem} dijit 
			 */
			getLastNewsItem: function(){
				// Get the last <div class="lastNewsItem"> from the immediate children of the news
				// feed node. Query returns an array so have to cater for an empty one.
				var lastChildren = query("> li.lastNewsItem:last-child", this.newsFeedNode);
				
				if(lastChildren && lastChildren.length > 0){
					// Get the lastChild
					var lastChild = lastChildren[0];
					
					// If the lastChild and it's id exist
					if(lastChild && lastChild.id){
						// Return the dijit with this id
						return registry.byId(lastChild.id);
					}
				}
				
				return null;
			},
			/**
			 * Get the first news item displayed in the stream.
			 * @returns {NewsItem} dijit 
			 */
			getFirstNewsItem: function(){
				var firstChild = this.newsFeedNode.childNodes[0];
				// If the firstChild and its id exist
				if(firstChild && firstChild.id){
					// Return the dijit with this id
					return registry.byId(firstChild.id);
				}
				return null;
			},
			
			containsNewsItemWithId : function(id) {
				var dij;
				return array.some(this.newsFeedNode.childNodes, function(node){
					if(node && (dij = registry.byId(node.id)) && dij.newsData && dij.newsData.getId().indexOf(id)) {
						return true;
					}
				});
			}
		});
		
		return ActivityStreamViewUtil;
	});
