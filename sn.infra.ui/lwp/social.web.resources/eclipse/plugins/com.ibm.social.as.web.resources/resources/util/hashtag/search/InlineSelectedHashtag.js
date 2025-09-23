/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.hashtag.search.InlineSelectedHashtag");
dojo.require("com.ibm.social.as.trending.InlineSelectedTag")

dojo.declare("com.ibm.social.as.util.hashtag.search.InlineSelectedHashtag", [com.ibm.social.as.trending.InlineSelectedTag],
{
	postMixInProperties: function(){
		this.delTitle = this.getLocalizedString("removeHashtag", {0:this.label});
	}
});
