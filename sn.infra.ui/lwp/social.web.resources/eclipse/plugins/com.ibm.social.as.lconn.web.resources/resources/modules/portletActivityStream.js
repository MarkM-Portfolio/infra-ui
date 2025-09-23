/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.modules.portletActivityStream");

dojo.requireLocalization("com.ibm.social.as", "activitystream");
dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");

//Required for Homepage Filter
dojo.require("com.ibm.social.as.gadget.viewnav.ASGadgetViewTopNavExtension");
dojo.require("com.ibm.social.as.gadget.viewnav.ASGadgetViewTopNav");

//Required for Activity Stream
dojo.require("com.ibm.social.as.ActivityStream");
dojo.require("com.ibm.social.as.portlet.ASPortletUtil");
dojo.require("com.ibm.social.as.extension.CommentLinkToEEExtension");

//Extensions for Activity Stream Views
dojo.require("com.ibm.social.as.extension.CommentExtension");
dojo.require("com.ibm.social.as.lconn.extension.MicroblogDeletionExtension");
dojo.require("lconn.homepage.as.extension.SavedActionExtension");
dojo.require("lconn.homepage.as.extension.SavedViewExtension");
dojo.require("lconn.homepage.as.extension.ActionRequiredViewExtension");
dojo.require("lconn.homepage.as.extension.ActivityReplyExtension");
dojo.require("lconn.homepage.as.extension.NetworkInviteExtension");
dojo.require("lconn.homepage.as.badge.ActionRequiredBadge");
dojo.require("lconn.homepage.as.badge.MyNotificationsBadge");
dojo.require("lconn.homepage.as.badge.MentionsBadge");
dojo.require("lconn.homepage.as.extension.UpdateBadgeExtension");
dojo.require("lconn.homepage.as.extension.UpdateBadgeMyNotificationsExtension");
dojo.require("lconn.homepage.as.extension.UpdateBadgeMentionsExtension");
dojo.require("lconn.homepage.as.extension.UpdateBadgeExtension");
dojo.require("com.ibm.social.as.extension.DirtyCheckExtension");
dojo.require("com.ibm.social.as.extension.RepostExtension");
dojo.require("com.ibm.social.as.extension.TrendingExtension");
dojo.require("com.ibm.social.as.lconn.extension.DisableDynamicLoadExtension");
dojo.require("lconn.homepage.as.extension.UnfollowExtension");

//Extensions for Community Activity Stream
dojo.require("com.ibm.social.as.lconn.extension.CommunitiesStatusUpdateExtension");
dojo.require("com.ibm.social.as.lconn.extension.CommunitiesCommentExtension");
dojo.require("com.ibm.social.as.lconn.extension.CommunitiesShareboxStatusUpdateExtension");
dojo.require("com.ibm.social.as.lconn.extension.CommunitiesMicroblogDeletionExtension");

//Extensions for Profile Board Activity Stream
dojo.require("com.ibm.social.as.lconn.extension.ProfilesStatusUpdateExtension");
dojo.require("com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension");
dojo.require("com.ibm.social.as.lconn.extension.ProfilesMicroblogDeletionExtension");

dojo.require("com.ibm.social.as.util.xhr.DojoXhrHandler");
dojo.require("com.ibm.social.as.util.hashtag.HashtagUtil");
dojo.require("com.ibm.social.as.util.hashtag.ASHashtagUtil");

dojo.require("com.ibm.social.as.portlet.PortletUrlUtil");
dojo.require("lconn.core.PeopleTypeAhead");



