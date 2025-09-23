/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.           */

	define([
		"dojo/_base/declare",
		"dojo/dom-construct",
		"ic-as/util/hashtag/HashtagUtil"
	], function (declare, domConstruct, HashtagUtil) {
	
		/**
		 * @author Stephen Crawford
		 */
		var ASHashtagUtil = declare("com.ibm.social.as.util.hashtag.ASHashtagUtil", 
				HashtagUtil,
		{
			
			getSearchHashtagUrl: function(communityId, tag){
				//noop
			},
			
			/**
			 * linkify the necessary components to create a hash tag anchor
			 */
			createAnchorLink: function(tagText, commId, origUzvcxnescapedTag, options){
				var hashLink = domConstruct.create("a", options);
				hashLink.href = "javascript:;";
				hashLink.setAttribute("class", "hashtagSearchLink");
				hashLink.innerHTML = tagText;
				return hashLink.outerHTML;
			}
		});
		return ASHashtagUtil;
	});
