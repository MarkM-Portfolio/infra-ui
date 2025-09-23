/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"ic-as/lconn/extension/ProfilesMicroblogDeletionExtension",
	"ic-as/ActivityStream",
	"ic-as/ee/EEManager",
	"ic-as/extension/RepostExtension",
	"ic-as/lconn/extension/DisableDynamicLoadExtension",
	"ic-as/lconn/extension/GadgetPreloaderExtension",
	"ic-as/lconn/extension/ProfilesStatusUpdateExtension",
	"ic-as/lconn/extension/ShareboxStatusUpdateExtension",
	"ic-as/util/hashtag/ASHashtagUtil",
	"ic-as/util/hashtag/HashtagUtil",
	"ic-as/util/xhr/DojoXhrHandler",
	"ic-sharebox/ContextualSharebox"
], function (ProfilesMicroblogDeletionExtension, ActivityStream, EEManager, RepostExtension, DisableDynamicLoadExtension, GadgetPreloaderExtension, ProfilesStatusUpdateExtension, ShareboxStatusUpdateExtension, ASHashtagUtil, HashtagUtil, DojoXhrHandler, ContextualSharebox) {

	//This is only required as-needed - so pull it into module to include in initial load
	
	return com.ibm.social.as.lconn.modules.profilesActivityStream;
});
