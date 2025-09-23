/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/dom",
	"dojo/_base/lang",
	"dojo/has",
	"dojo/dom-class",
	"dojo/query",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/string",
	"dojo/_base/window",
	"dojo/html",
	"dojo/Deferred",
	"dojo/text!ic-ee/gadget/templates/ForumTopic.html",
	"dojo/topic",
	"ic-ee/gadget/_HTMLContentMixin",
	"ic-ee/gadget/_ActionsToolbarMixin",
	"ic-ee/data/ForumTopicDataStore",
	"ic-core/globalization/bidiUtil",
	"ic-ee/gadget/_CommentsMixin",
	"ic-ee/data/ForumSummaryDataStore",
	"ic-ee/gadget/_EEGadgetWidget",
	"ic-ee/data/ForumRecommendationsDataStore",
	"ic-ee/gadget/_HistoryMixin",
	"ic-ee/gadget/_RecommendationsMixin",
	"ic-ee/gadget/_TagsMixin",
	"ic-ee/gadget/_WidgetTabsMixin",
	"ic-ee/track/generic",
	"ic-ee/util/misc",
	"ic-eeconfig/config",
	"ic-incontext/util/html",
	"ic-incontext/util/text",
	"ic-incontext/widget/MessageContainer"
], function (dojo, declare, dom, lang, has, domClass, query, domConstruct, domAttr, string, windowModule, html, Deferred, template, topic, _HTMLContentMixin, _ActionsToolbarMixin, ForumTopicDataStore, bidiUtil, _CommentsMixin, ForumSummaryDataStore, _EEGadgetWidget, ForumRecommendationsDataStore, _HistoryMixin, _RecommendationsMixin, _TagsMixin, _WidgetTabsMixin, generic, misc, ibmSocialEeconfigConfig, ibmSocialIncontextUtilHtml, text, MessageContainer) {

	/* globals com, lconn */
	
	(function () {
	
	    var ut = text;
	    var uth = ibmSocialIncontextUtilHtml;
	    var g = com.ibm.social.ee.gadget;
	
	    var ForumTopic = declare("com.ibm.social.ee.gadget.ForumTopic",
	        [g._EEGadgetWidget,
	            g._WidgetTabsMixin,
	            g._CommentsMixin,
	            g._RecommendationsMixin,
	            g._HTMLContentMixin,
	            g._HistoryMixin,
	            g._TagsMixin,
	            g._ActionsToolbarMixin], {
	
	            templateString: template,
	
	            // Gadget data store and load functions
	            createDataStore: function () {
	                var url;
	                if (!this.replyId) {
	                    this.onlyTopic = true;
	                    url = this.routes.getTopicEntryUrl(this.topicId);
	                    return new ForumTopicDataStore({ net: this.network, url: url });
	                }
	                else {
	                    url = this.routes.getSummaryUrl(this.replyId);
	                    return new ForumSummaryDataStore({ net: this.network, url: url });
	                }
	            },
	            dataLoaded: function (items, ioArgs) {
	                if (!this.onlyTopic) {
	                    this.summary = items[0];
	                    items[0] = this.ds.getValue(this.summary, "topic");
	                    this.isReplyToReply = this.ds.getValue(this.summary, "replyToReply");
	                }
	                this.inherited(arguments);
	            },
	
	            // Initialize UI
	            initializeUI: function () {
	                this.inherited(arguments);
	                this.setTitle();
	                this.initTabContainer();
	                this.initializeHistoryTab();
	                this.initializeAttachments();
	                this.initializeTags();
	                this.initializeMetaDataDiv();
	                this.commentCountChange(this.value("repliesCount"));
	                this.initActionsToolbar();
	                this.initializeRecommendations();
	                this.initializeContent();
	                if (this.onlyTopic) {
	                    this.initializeReplies();
	                }
	                else {
	                    this.initializeThisReply();
	                }
	                this.setMessage();
	                // Bidi support
	                bidiUtil.enforceTextDirectionOnPage(this.gadgetBody);
	                this.notifyLoaded();
	            },
	            /**
	             * returns the action toolbar DOM node
	             */
	            getActionsToolbarNode: function(){
	                return this.actionsToolbarNode;
	            },
	            initializeTags: function () {
	                this.inherited(arguments);
	
	                //remove roles from tag items
	                query(".bidiAware", this.tagsNode).forEach(function (node, index, arr) {
	
	                    domAttr.remove(node, "role");
	                });
	            },
	            // Tabs
	            getTabContainerId: function () {
	                return this.tabContainerNode;
	            },
	            getTabInitializers: function () {
	                if (this.onlyTopic) {
	                    return { history: "initializeHistory" };
	                }
	                else {
	                    return { history: "initializeHistory", thisReply: "initializeThisReply", replies: "initializeReplies"};
	                }
	            },
	            widgetTabs: {
	                thisReply: { tab: "thisReplyTab", tabLink: "thisReplyTabLink", tabBody: "thisReplyTabBody" },
	                replies: { tab: "repliesTab", tabLink: "repliesTabLink", tabBody: "repliesTabBody" },
	                history: { tab: "historyTab", tabLink: "historyTabLink", tabBody: "historyTabBody" }
	            },
	            initialTab: "thisReply",
	            initTabContainer: function () {
	                if (this.onlyTopic) {
	                    this.switchTab("repliesTab", this.repliesTab, this.repliesTabLink, this.repliesTabBody, true);
	                    this.initialTab = "replies";
	                    domClass.add(this.repliesTab, "lotusFirst eeFirstTab");
	                    domConstruct.destroy(this.thisReplyTab);
	                    domConstruct.destroy(this.thisReplyTabBody);
	                    delete this.widgetTabs.thisReply;
	                }
	                this.inherited(arguments);
	            },
	
	            // Tags
	            getTags: function () {
	                return this.value("tags");
	            },
	            getTagsContainer: function () {
	                return this.tagsLi;
	            },
	            getTagsNode: function () {
	                return this.tagsNode;
	            },
	
	            // History
	            getHistoryTab: function () {
	                return this.historyTab;
	            },
	            getHistoryContainer: function () {
	                return this.historyTabBody;
	            },
	            getId: function () {
	                var id = this.value("id");
	                return id ? id.replace(/.*forum:/, "") : null;
	            },
	
	            // Recommendations
	            getRecommendInlineDSClass: function () {
	                return "com.ibm.social.ee.data.ForumRecommendationsDataStore";
	            },
	            getRecommendPopupDSClass: function () {
	                return "com.ibm.social.ee.data.ForumRecommendationsDataStore";
	            },
	            getRecommendElement: function () {
	                return this.recommendationNode;
	            },
	            getRecommendDSOptions: function () {
	                return {
	                    url: this.value("recommendationFeed"),
	                    hasRecommended: this.value("recommendedByUser"),
	                    recommendCount: this.value("recommendationCount")
	                };
	            },
	
	            getMissingErrorNode: function () {
	                if (!this.missingErrorNode) {
	                    this.missingErrorNode = domConstruct.create("div", null, this.gadgetBody, "first");
	                }
	                return this.missingErrorNode;
	            },
	            getMissingErrorMessage: function () {
	                return this.getReadMoreStrings().error_404;
	            },
	
	            onMissingItem: function () {
	                topic.publish("com/ibm/social/ee/event/scrollTop", '');
	            },
	
	            // Replies
	            initializeThisReply: function () {
	                var dfd = new Deferred();
	                if (this.thisReplyWidget) {
	                    // Refresh like controls
	                    this.thisReplyWidget.updateLikes();
	                    return;
	                }
	                this.isReplyToReply = true;
	                this.initializeComments(dfd);
	                this.thisReplyWidget = this.commentsWidget;
	                this.additionalReplies = [];
	                return dfd;
	            },
	            initializeReplies: function () {
	                var dfd = new Deferred();
	                if (this.repliesWidget) {
	                    // Refresh like controls
	                    this.repliesWidget.updateLikes();
	                    return;
	                }
	                this.isReplyToReply = false;
	                this.initializeComments(dfd);
	                this.repliesWidget = this.commentsWidget;
	                return dfd;
	            },
	            initializeAttachments: function () {
	                var count = this.value("attachmentCount");
	                if (!count) {
	                    this.attachmentCountNode.style.display = "none";
	                    domClass.add(this.tagsLi, "lotusFirst");
	                }
	                else {
	                    var msg = (count === 1) ? this.nls.forum.attachments_one : this.nls.forum.attachments;
	                    msg = string.substitute(msg, { count: count });
	                    this.attachmentCountNode.innerHTML = msg;
	                }
	            },
	            initializeMetaDataDiv: function () {
	                // Hide container div if no tags and no attachments to display
	                if (this.tagsLi.style.display === "none" && this.attachmentCountNode.style.display === "none") {
	                    this.metaDataDiv.style.display = "none";
	                }
	            },
	            replyAdded: function (item) {
	                if (this.repliesWidget) {
	                    this.repliesWidget.addReply(item);
	                }
	                else {
	                    this.additionalReplies.push(item);
	                    this.commentCountChange(parseInt(this.value("repliesCount")) + this.additionalReplies.length);
	                }
	            },
	            initializeComments: function () {
	                if (this.isReplyToReply) {
	                    this.commentWidgetClass = "com.ibm.social.ee.widget.ReplyToReply";
	                }
	                else {
	                    this.commentWidgetClass = "com.ibm.social.ee.widget.Replies";
	                }
	                this.inherited(arguments);
	            },
	            commentCountChange: function (count) {
	                var repliesTabTitle = string.substitute(this.nls.REPLIES.TAB_TITLE, [count]);
	                html.set(dom.byId(this.getCommentsTabLinkId()), repliesTabTitle);
	            },
	            getCommentOpts: function () {
	                var count = this.value("repliesCount");
					var url = this.value("urlFeed");
					if (url) {
						url += (url.search('\\?') === -1) ? '?linkify=true' : '&linkify=true'; 
						// the underlying url is retrieved from the forums application itself, hence the postfix
					}
	                var isLocked = this.value("locked");
	                var permissions = this.value("permissions");
	                var opts = {
	                    commentCount: count,
	                    url: url,
	                    topicEntry: this.data,
	                    topicDs: this.ds,
	                    dsOpts: { totalItems: count },
	                    dsConstructor: "com.ibm.social.ee.data.ForumRepliesFeedDataStore",
	                    docTitle: this.value("title"),
	                    topicId: this.getId(),
	                    allowNewComments: !isLocked && !this.routes.anonymous && permissions.create_post,
	                    linkifyCreateComment: false,
	                    htmlComments: true,
	                    htmlEncoded: false,
	                    escapeHTMLBeforePosting : true,
	                    linkifyMentions: false,
	                    generateLinkToTopic: lang.hitch(this, this._generateLinkToTopic),
	                    generateLinkToReply: lang.hitch(this, this._generateLinkToReply),
	                    commentLikes: true,
	                    likeDsFactory: this.getCommentLikeDsFactory(),
	                    likeOpts: this.getCommentLikeOpts(),
	                    mentionsEnabled: ibmSocialEeconfigConfig.mentionsEnabled,
	                    mentionsOpts: this.getMentionsOpts()
	                };
	                if (this.isReplyToReply) {
	                    lang.mixin(opts, {
	                        parentReply: this.ds.getValue(this.summary, "parentReply"),
	                        childReply: this.ds.getValue(this.summary, "childReply"),
	                        onReplyAdded: lang.hitch(this, this.replyAdded),
	                        noCountListener: true
	                    });
	                }
	                else {
	                    lang.mixin(opts, {
	                        additionalReplies: [],
	                        commentCount: (count ? parseInt(count) : 0) + (this.additionalReplies ? this.additionalReplies.length : 0)
	                    });
	                }
	                return opts;
	            },
	            getMentionsOpts: function () {
	                var communityId = this.context.communityid ? misc.getItemId(this.context.communityid) : null;
	                return {
	                    communityId: communityId,
	                    //isPublic is a string
	                    isPublic: this.context.isPublic === "true"
	                };
	            },
	            getCommentLikeOpts: function () {
	                var isLocked = this.value("locked");
	                var profilesRoutes = this.getProfilesRoutes();
	                var canComment = !isLocked && !this.routes.anonymous;
	                var opts = {
	                    getUserProfileUrl: lang.hitch(profilesRoutes, profilesRoutes.getUserProfileUrl),
	                    getUserPhotoUrl: lang.hitch(profilesRoutes, profilesRoutes.getUserPhotoUrl)
	                };
	                if (!canComment) {
	                    lang.mixin(opts, { currentUserId: "" });
	                }
	                return opts;
	            },
	
	            getCommentsTabLinkId: function () {
	                return this.repliesTabLink;
	            },
	            getCommentsContainer: function () {
	                if (this.isReplyToReply) {
	                    return this.thisReplyTabBody;
	                }
	                else {
	                    return this.repliesTabBody;
	                }
	            },
	            getCommentLikeDsFactory: function () {
	                // Cache ensures that same ds object is used for the same comment id
	                if (!this.likeDsCache) {
	                    this.likeDsCache = { };
	                }
	                var _this = this;
	
	                var commonOpts = {
	                    net: this.network,
	                    authUser: lang.clone(this.authUser)
	                };
	
	                function addCommentOpts(opts, comment, ds) {
	                    lang.mixin(opts, {
	                        url: ds.getValue(comment, "recommendationFeed"),
	                        recommendCount: ds.getValue(comment, "recommendationCount"),
	                        hasRecommended: ds.getValue(comment, "recommendedByUser"),
	                        retrievedRecommend: true
	                    });
	                }
	
	                return {
	                    getInlineDs: function (comment, ds) {
	                        var id = ds.getValue(comment, "id");
	                        if (_this.likeDsCache[id]) {
	                            return _this.likeDsCache[id];
	                        }
	                        else {
	                            var opts = lang.mixin({ countOnly: true }, commonOpts);
	                            addCommentOpts(opts, comment, ds);
	                            var inlineDs = new ForumRecommendationsDataStore(opts);
	                            _this.likeDsCache[id] = inlineDs;
	                            return inlineDs;
	                        }
	                    },
	                    getPopupDs: function (comment, ds) {
	                        var id = ds.getValue(comment, "id");
	                        var opts = lang.mixin({ }, commonOpts);
	                        addCommentOpts(opts, comment, ds);
	                        return new ForumRecommendationsDataStore(opts);
	                    }
	                };
	            },
	
	            // HTML Content
	            initializeContent: function () {
	                var content = this.value("content");
	                var temp = domConstruct.create("div");
	                this.htmlContentNode = this.contentArea;
	                this.htmlContent = content;
	                temp.innerHTML = content;
	                // Special handling for Discuss This
	                if (query("> div.discussThisContent", temp).length) {
	                    this.contentArea.innerHTML = content.replace(/&nbsp;/g, " "); // Fix forums use of &nbsp; in discuss this
	                    query("> div.discussThisContent", this.contentArea).removeClass("lotusBorderBottom");
	                    // Get an alternate content node
	                    var comments = query("> div.discussThisContent div.discussThisEditableComment", this.contentArea)[0];
	                    if (comments) {
	                        var txt = ut.trim(uth.htmlText(comments));
	                        comments.innerHTML = ut.trimToLength(txt, 256);
	                        if (has("ie")) {
	                            domClass.add(comments, "lotusChunk"); // Fix display issue in IE
	                        }
	                    }
	                    var topicContent = query("> div.discussThisContent table div[dojoAttachPoint=descriptionNode]", this.contentArea)[0];
	                    if (topicContent) {
	                        this.htmlContentNode = topicContent;
	                        this.htmlContent = topicContent.innerHTML;
	                    }
	                    else {
	                        return; // No need to do regular content summary if there is no content to summarize
	                    }
	                }
	                this.inherited(arguments);
	            },
	            getHtmlContent: function () {
	                return this.htmlContent;
	            },
	            getTitle: function () {
	                return this.value("title");
	            },
	            getHtmlNode: function () {
	                return this.htmlContentNode;
	            },
	            getImagesNode: function () {
	                return this.imageContainer;
	            },
	            getReadMoreStrings: function () {
	                return this.nls.forum;
	            },
	            getItemUrl: function () {
	                return this.value("urlAlternate");
	            },
	
	            // Gadget lifecycle
	            notifyLoaded: function () {
	                topic.publish("social/ee/forumtopic/load", this.context, this.network, this.routes.oauth);
	            },
	
	            // Forums specific methods
	            setMessage: function (isQuestion, isAnswered) {
	                isQuestion = this.value("question");
	                isAnswered = this.value("answered");
	                if (isQuestion) {
	                    this.messageDiv.style.display = "";
	                    var div = domConstruct.create("div", { }, this.messageDiv);
	                    var message;
	                    if (isAnswered) {
	                        message = {success: true, message: this.nls.forum.QUESTION_ANSWERED };
	                    }
	                    else {
	                        message = {question: true, message: this.nls.forum.QUESTION_NOT_ANSWERED };
	                    }
	                    new MessageContainer({items: [message], nls: this.nls.MESSAGE }, div);
	                }
	            },
	            setTitle: function () {
	                var title = this.value("title");
	                var itemUrl = this.value("urlAlternate");
	                domAttr.set(this.titleNode, "href", itemUrl);
	                domAttr.set(this.readMoreNode, "href", itemUrl);
	                ut.breakString(title, windowModule.doc, this.titleNode);
	                this.titleNode.title = string.substitute(this.nls.forum.readMore_tooltip, {"name": title});
	                this.titleNode.setAttribute("aria-label", string.substitute(this.nls.forum.readMore_a11y, {"name": title}));
	                this.readMoreNode.title = string.substitute(this.nls.forum.readMore_tooltip, {"name": title});
	                this.readMoreNode.setAttribute("aria-label", string.substitute(this.nls.forum.readMore_a11y, {"name": title}));
	            },
	            _generateLinkToTopic: function (topicId) {
	                return this.routes.getTopicWebUrl(topicId);
	            },
	            _generateLinkToReply: function (topicId, replyId) {
	                return this.routes.getReplyWebUrl(topicId, replyId);
	            }
	        });
	})();
	return ForumTopic;
});
