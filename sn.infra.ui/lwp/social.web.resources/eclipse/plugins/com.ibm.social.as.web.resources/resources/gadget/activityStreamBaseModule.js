/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.gadget.activityStreamBaseModule");

dojo.require("com.ibm.social.as.ActivityStream");
dojo.require("com.ibm.social.as.util.AbstractHelper");
dojo.require("com.ibm.social.as.util.hashtag.HashtagUtil");
dojo.require("com.ibm.social.as.extension.CommentExtension");
dojo.require("com.ibm.social.as.extension.CommentLinkToEEExtension");
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
dojo.require("com.ibm.social.as.lconn.extension.DisableDynamicLoadExtension");
dojo.require("com.ibm.social.as.gadget.ActivityStreamConfigUtil");
dojo.require("com.ibm.social.as.nav.ASHeader");
dojo.require("com.ibm.social.as.nav.ASSideNav");
dojo.require("com.ibm.social.as.gadget.viewnav.ASGadgetViewTopNav");
dojo.require("com.ibm.social.as.gadget.viewnav.ASGadgetViewTopNavExtension");
dojo.require("com.ibm.social.as.gadget.refresh.RefreshButton");
dojo.require("com.ibm.social.as.gadget.refresh.RefreshButtonExtension");
dojo.require("com.ibm.social.as.gadget.nav.BackToMainButton");
dojo.require("com.ibm.social.as.gadget.nav.ActionTitleExtension");
dojo.require("com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension");
dojo.require("com.ibm.social.as.lconn.extension.CommunitiesStatusUpdateExtension");
dojo.require("com.ibm.social.as.extension.TrendingExtension");
dojo.require("com.ibm.social.as.paging.NoFeedPagingHandler");

dojo.require("lconn.core.util.LCDeferred");
dojo.require("lconn.core.util.LCDeferredList");
dojo.require("lconn.core.util.promises");
