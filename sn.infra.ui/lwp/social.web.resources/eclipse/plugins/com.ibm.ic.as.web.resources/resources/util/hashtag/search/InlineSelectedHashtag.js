/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/trending/InlineSelectedTag"
	], function (declare, InlineSelectedTag) {
	
		var InlineSelectedHashtag = declare("com.ibm.social.as.util.hashtag.search.InlineSelectedHashtag", InlineSelectedTag,
		{
			postMixInProperties: function(){
				this.delTitle = this.getLocalizedString("removeHashtag", {0:this.label});
			}
		});
		return InlineSelectedHashtag;
	});
