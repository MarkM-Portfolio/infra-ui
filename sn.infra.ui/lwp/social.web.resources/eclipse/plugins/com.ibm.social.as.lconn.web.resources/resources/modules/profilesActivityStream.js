/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.modules.profilesActivityStream");

dojo.require("com.ibm.social.as.ActivityStream");
dojo.require("com.ibm.social.sharebox.ContextualSharebox");
dojo.require("com.ibm.social.as.ee.EEManager");

dojo.require("com.ibm.social.as.lconn.extension.ProfilesStatusUpdateExtension");
dojo.require("com.ibm.social.as.lconn.extension.ProfilesCommentExtension");
dojo.require("com.ibm.social.as.lconn.extension.DisableDynamicLoadExtension");
dojo.require("com.ibm.social.as.lconn.extension.GadgetPreloaderExtension");
dojo.require("com.ibm.social.as.lconn.extension.ProfilesMicroblogDeletionExtension");
dojo.require("com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension");

dojo.require("com.ibm.social.as.extension.RepostExtension");

dojo.require("com.ibm.social.as.util.hashtag.HashtagUtil");
dojo.require("com.ibm.social.as.util.hashtag.ASHashtagUtil");

//This is only required as-needed - so pull it into module to include in initial load
dojo.require("com.ibm.social.as.util.xhr.DojoXhrHandler");
