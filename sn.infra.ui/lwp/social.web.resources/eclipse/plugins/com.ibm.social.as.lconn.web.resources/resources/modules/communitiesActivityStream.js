/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.modules.communitiesActivityStream");

dojo.require("com.ibm.social.as.ActivityStream");
dojo.require("com.ibm.social.sharebox.ContextualSharebox");
dojo.require("com.ibm.social.as.ee.EEManager");

dojo.require("com.ibm.social.as.lconn.extension.CommunitiesViewRecentUpdatesExtension");
dojo.require("com.ibm.social.as.lconn.extension.CommunitiesCommentExtension");
dojo.require("com.ibm.social.as.lconn.extension.CommunitiesMicroblogDeletionExtension");
dojo.require("com.ibm.social.as.lconn.extension.CommunitiesShareboxStatusUpdateExtension");
dojo.require("com.ibm.social.as.lconn.extension.CommunitiesStatusUpdateExtension");
dojo.require("com.ibm.social.as.lconn.extension.GadgetPreloaderExtension");

dojo.require("com.ibm.social.as.extension.RepostExtension");

dojo.require("com.ibm.social.as.lconn.widgets.communities.CommunitiesActivityStreamEdit");
dojo.require("com.ibm.social.as.util.hashtag.HashtagUtil");
dojo.require("com.ibm.social.as.util.hashtag.ASHashtagUtil");

// This is only required as-needed - so pull it into module to include in initial load
dojo.require("com.ibm.social.as.util.xhr.DojoXhrHandler");
