/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/i18n!ic-as/nls/activitystream",
	"ic-as/ActivityStream",
	"ic-as/lconn/extension/ShareboxStatusUpdateExtension",
	"ic-as/extension/RepostExtension",
	"ic-as/extension/CommentExtension",
	"ic-as/lconn/extension/CommunitiesCommentExtension",
	"ic-as/lconn/extension/CommunitiesMicroblogDeletionExtension",
	"ic-as/lconn/extension/CommunitiesShareboxStatusUpdateExtension",
	"ic-as/lconn/extension/CommunitiesStatusUpdateExtension",
	"ic-as/lconn/extension/MicroblogDeletionExtension",
	"ic-as/util/hashtag/ASHashtagUtil",
	"ic-as/util/hashtag/HashtagUtil",
	"ic-as/util/xhr/DojoXhrHandler"
], function (dojo, i18nactivitystream, ActivityStream, ShareboxStatusUpdateExtension, RepostExtension, CommentExtension, CommunitiesCommentExtension, CommunitiesMicroblogDeletionExtension, CommunitiesShareboxStatusUpdateExtension, CommunitiesStatusUpdateExtension, MicroblogDeletionExtension, ASHashtagUtil, HashtagUtil, DojoXhrHandler) {

	i18nactivitystream;
	
	//Required for Homepage Filter
	//Required for Activity Stream
	//Extensions for Activity Stream Views
	//Extensions for Community Activity Stream
	//Extensions for Profile Board Activity Stream
	
	return com.ibm.social.as.lconn.modules.portletActivityStream;
});
