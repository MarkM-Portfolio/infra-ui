/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget.ForumTopic");
dojo.require("dojo.string");
dojo.require("dojo.html");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.html");
dojo.require("com.ibm.social.ee.data.ForumTopicDataStore");
dojo.require("com.ibm.social.ee.data.ForumSummaryDataStore");
dojo.require("com.ibm.social.ee.data.ForumRepliesFeedDataStore");
dojo.require("com.ibm.social.ee.data.ForumRecommendationsDataStore");
dojo.require("com.ibm.social.ee.widget.Replies");
dojo.require("com.ibm.social.ee.widget.ReplyToReply");
dojo.require("com.ibm.social.incontext.widget.MessageContainer");

dojo.require("com.ibm.social.ee.gadget._EEGadgetWidget");
dojo.require("com.ibm.social.ee.gadget._WidgetTabsMixin");
dojo.require("com.ibm.social.ee.gadget._CommentsMixin");
dojo.require("com.ibm.social.ee.gadget._RecommendationsMixin");
dojo.require("com.ibm.social.ee.gadget._HTMLContentMixin");
dojo.require("com.ibm.social.ee.gadget._HistoryMixin");
dojo.require("com.ibm.social.ee.gadget._TagsMixin");
dojo.require("com.ibm.social.ee.gadget._ActionsToolbarMixin");

dojo.require("com.ibm.social.ee.track.generic");
dojo.require("lconn.core.globalization.bidiUtil");

/* globals com, lconn */

(function () {

    var ut = com.ibm.social.incontext.util.text;
    var uth = com.ibm.social.incontext.util.html;
    var g = com.ibm.social.ee.gadget;

    dojo.declare("com.ibm.social.ee.gadget.ForumTopic",
        [g._EEGadgetWidget,
            g._WidgetTabsMixin,
            g._CommentsMixin,
            g._RecommendationsMixin,
            g._HTMLContentMixin,
            g._HistoryMixin,
            g._TagsMixin,
            g._ActionsToolbarMixin], {

            templatePath: dojo.moduleUrl("com.ibm.social.ee", "gadget/templates/ForumTopic.html"),

            // Gadget data store and load functions
            createDataStore: function () {
                var url;
                if (!this.replyId) {
                    this.onlyTopic = true;
                    url = this.routes.getTopicEntryUrl(this.topicId);
                    return new com.ibm.social.ee.data.ForumTopicDataStore({ net: this.network, url: url });
                }
                else {
                    url = this.routes.getSummaryUrl(this.replyId);
                    return new com.ibm.social.ee.data.ForumSummaryDataStore({ net: this.network, url: url });
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
                lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.gadgetBody);
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
                dojo.query(".bidiAware", this.tagsNode).forEach(function (node, index, arr) {

                    dojo.removeAttr(node, "role");
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
                    dojo.addClass(this.repliesTab, "lotusFirst eeFirstTab");
                    dojo.destroy(this.thisReplyTab);
                    dojo.destroy(this.thisReplyTabBody);
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
                    this.missingErrorNode = dojo.create("div", null, this.gadgetBody, "first");
                }
                return this.missingErrorNode;
            },
            getMissingErrorMessage: function () {
                return this.getReadMoreStrings().error_404;
            },

            onMissingItem: function () {
                dojo.publish("com/ibm/social/ee/event/scrollTop", null);
            },

            // Replies
            initializeThisReply: function () {
                var dfd = new dojo.Deferred();
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
                var dfd = new dojo.Deferred();
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
                    dojo.addClass(this.tagsLi, "lotusFirst");
                }
                else {
                    var msg = (count === 1) ? this.nls.forum.attachments_one : this.nls.forum.attachments;
                    msg = dojo.string.substitute(msg, { count: count });
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
                var repliesTabTitle = dojo.string.substitute(this.nls.REPLIES.TAB_TITLE, [count]);
                dojo.html.set(dojo.byId(this.getCommentsTabLinkId()), repliesTabTitle);
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
                    generateLinkToTopic: dojo.hitch(this, this._generateLinkToTopic),
                    generateLinkToReply: dojo.hitch(this, this._generateLinkToReply),
                    commentLikes: true,
                    likeDsFactory: this.getCommentLikeDsFactory(),
                    likeOpts: this.getCommentLikeOpts(),
                    mentionsEnabled: com.ibm.social.eeconfig.config.mentionsEnabled,
                    mentionsOpts: this.getMentionsOpts()
                };
                if (this.isReplyToReply) {
                    dojo.mixin(opts, {
                        parentReply: this.ds.getValue(this.summary, "parentReply"),
                        childReply: this.ds.getValue(this.summary, "childReply"),
                        onReplyAdded: dojo.hitch(this, this.replyAdded),
                        noCountListener: true
                    });
                }
                else {
                    dojo.mixin(opts, {
                        additionalReplies: [],
                        commentCount: (count ? parseInt(count) : 0) + (this.additionalReplies ? this.additionalReplies.length : 0)
                    });
                }
                return opts;
            },
            getMentionsOpts: function () {
                var communityId = this.context.communityid ? com.ibm.social.ee.util.misc.getItemId(this.context.communityid) : null;
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
                    getUserProfileUrl: dojo.hitch(profilesRoutes, profilesRoutes.getUserProfileUrl),
                    getUserPhotoUrl: dojo.hitch(profilesRoutes, profilesRoutes.getUserPhotoUrl)
                };
                if (!canComment) {
                    dojo.mixin(opts, { currentUserId: "" });
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
                    authUser: dojo.clone(this.authUser)
                };

                function addCommentOpts(opts, comment, ds) {
                    dojo.mixin(opts, {
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
                            var opts = dojo.mixin({ countOnly: true }, commonOpts);
                            addCommentOpts(opts, comment, ds);
                            var inlineDs = new com.ibm.social.ee.data.ForumRecommendationsDataStore(opts);
                            _this.likeDsCache[id] = inlineDs;
                            return inlineDs;
                        }
                    },
                    getPopupDs: function (comment, ds) {
                        var id = ds.getValue(comment, "id");
                        var opts = dojo.mixin({ }, commonOpts);
                        addCommentOpts(opts, comment, ds);
                        return new com.ibm.social.ee.data.ForumRecommendationsDataStore(opts);
                    }
                };
            },

            // HTML Content
            initializeContent: function () {
                var content = this.value("content");
                var temp = dojo.create("div");
                this.htmlContentNode = this.contentArea;
                this.htmlContent = content;
                temp.innerHTML = content;
                // Special handling for Discuss This
                if (dojo.query("> div.discussThisContent", temp).length) {
                    this.contentArea.innerHTML = content.replace(/&nbsp;/g, " "); // Fix forums use of &nbsp; in discuss this
                    dojo.query("> div.discussThisContent", this.contentArea).removeClass("lotusBorderBottom");
                    // Get an alternate content node
                    var comments = dojo.query("> div.discussThisContent div.discussThisEditableComment", this.contentArea)[0];
                    if (comments) {
                        if (dojo.isIE) {
                            dojo.addClass(comments, "lotusChunk"); // Fix display issue in IE
                        }
                    }
                    var topicContent = dojo.query("> div.discussThisContent table div[dojoAttachPoint=descriptionNode]", this.contentArea)[0];
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
                dojo.publish("social/ee/forumtopic/load", [this.context, this.network, this.routes.oauth]);
            },

            // Forums specific methods
            setMessage: function (isQuestion, isAnswered) {
                isQuestion = this.value("question");
                isAnswered = this.value("answered");
                if (isQuestion) {
                    this.messageDiv.style.display = "";
                    var div = dojo.create("div", { }, this.messageDiv);
                    var message;
                    if (isAnswered) {
                        message = {success: true, message: this.nls.forum.QUESTION_ANSWERED };
                    }
                    else {
                        message = {question: true, message: this.nls.forum.QUESTION_NOT_ANSWERED };
                    }
                    new com.ibm.social.incontext.widget.MessageContainer({items: [message], nls: this.nls.MESSAGE }, div);
                }
            },
            setTitle: function () {
                var title = this.value("title");
                var itemUrl = this.value("urlAlternate");
                dojo.attr(this.titleNode, "href", itemUrl);
                dojo.attr(this.readMoreNode, "href", itemUrl);
                ut.breakString(title, dojo.doc, this.titleNode);
                this.titleNode.title = dojo.string.substitute(this.nls.forum.readMore_tooltip, {"name": title});
                this.titleNode.setAttribute("aria-label", dojo.string.substitute(this.nls.forum.readMore_a11y, {"name": title}));
                this.readMoreNode.title = dojo.string.substitute(this.nls.forum.readMore_tooltip, {"name": title});
                this.readMoreNode.setAttribute("aria-label", dojo.string.substitute(this.nls.forum.readMore_a11y, {"name": title}));
            },
            _generateLinkToTopic: function (topicId) {
                return this.routes.getTopicWebUrl(topicId);
            },
            _generateLinkToReply: function (topicId, replyId) {
                return this.routes.getReplyWebUrl(topicId, replyId);
            }
        });
})();