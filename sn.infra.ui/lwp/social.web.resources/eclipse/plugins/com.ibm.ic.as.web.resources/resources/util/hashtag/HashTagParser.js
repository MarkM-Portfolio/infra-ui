/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/array",
		"dojo/_base/declare",
		"ic-as/config/ConfigManager",
		"ic-as/util/hashtag/HashtagUtil"
	], function (array, declare, ConfigManager, HashtagUtil) {
	
		 
		
		/**
		 * Class that can be mixed into a NewsItem to provide the facility to parse hashtags
		 * in the item.
		 */
		var HashTagParser = declare(
		"com.ibm.social.as.util.hashtag.HashTagParser",
		null,
		{
			/**
			 * Discover and parse the tags for the NewsItem this function is mixed into.
			 * @param content {String} Content containing unlinked hashtag, e.g.:
			 * 						   "this is a #hashtag"
			 * @param tagsArray {Array} Tag array which is to be applied the the content
			 * @returns {String} Content now with hashtags linkified, e.g.:
			 * 					 "this is a <a href='...'>#hashtag</a>"
			 */
			parseHashTags: function(content, tagsArray) {		
				// if this is a Community SU, need to use links to Community search
				var commId;
				if ( this.newsData.isCommunity() ) {
					commId = this.newsData.getCommunityId();
					// stip off the OpenSocial prefix
					commId = this.getConnectionsCommunityId(commId);
				}
		
				return this._setHashtagLinks(content, tagsArray, commId);
			},
		
			/**
			 * Get tags array from a tags object array.
			 * @param tagsObjArr {Array} e.g. [{objectType: "tag", displayName: "a"}].
			 * @returns {Array|null} null if nothing available, 
			 * 			Array of strings showing tag names otherwise.
			 */
			getTagsArray: function(tagsObjArr){
				if (!tagsObjArr) {
					return [];
				}
				
				// Return the array of tag names.
				return tagsArr = array.map(tagsObjArr, function(x) { return x.displayName;});
			},
		
			/**
			 * Adds links to hashtags in the DOM for this status update.  
			 * See 'parseHashTags' above for params and return values.
			 * @param content {String} Content containing unlinked hashtag, e.g.:
			 * 						   "this is a #hashtag"
			 * @returns {String} Content now with hashtags linkified, e.g.:
			 * 					 "this is a <a href='...'>#hashtag</a>"
			 */
			_setHashtagLinks: function(content, tagsArray, commId){
				// Make sure there is content
				if(content){
					var parser = (ConfigManager.getSearchHashtagUtil()) ? ConfigManager.getSearchHashtagUtil() : HashtagUtil;
					// Update the HTML so that hashtags are wrapped in links.
					return parser.linkifyHashtags(content, tagsArray, commId);
				}
				
				return "";
			}
		});
		return HashTagParser;
	});
