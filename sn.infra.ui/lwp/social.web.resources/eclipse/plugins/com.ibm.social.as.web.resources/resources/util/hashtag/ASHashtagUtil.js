/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.           */

dojo.provide("com.ibm.social.as.util.hashtag.ASHashtagUtil");

dojo.require("com.ibm.social.as.util.hashtag.HashtagUtil");

/**
 * @author Stephen Crawford
 */
dojo.declare("com.ibm.social.as.util.hashtag.ASHashtagUtil", 
		[com.ibm.social.as.util.hashtag.HashtagUtil],
{
	
	getSearchHashtagUrl: function(communityId, tag){
		//noop
	},
	
	/**
	 * linkify the necessary components to create a hash tag anchor
	 */
	createAnchorLink: function(tagText, commId, origUzvcxnescapedTag, options){
		var hashLink = dojo.create("a", options);
		hashLink.href = "javascript:;";
		hashLink.setAttribute("class", "hashtagSearchLink");
		hashLink.innerHTML = tagText;
		return hashLink.outerHTML;
	}
});
