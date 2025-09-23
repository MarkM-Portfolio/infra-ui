/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget.BlogEntry");

dojo.require("dojo.string");

dojo.require("com.ibm.social.as.item.SharedExternally");
dojo.require("com.ibm.social.ee.data.BlogEntryDataStore");
dojo.require("com.ibm.social.ee.data.BlogCommentFeedDataStore");
dojo.require("com.ibm.social.ee.data.BlogThisCommentFeedDataStore");
dojo.require("com.ibm.social.ee.data.RecommendationsFeedDataStore");
dojo.require("com.ibm.social.incontext.util.url");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.ee.util.misc");

dojo.require("com.ibm.social.ee.gadget._EEGadgetWidget");
dojo.require("com.ibm.social.ee.gadget._WidgetTabsMixin");
dojo.require("com.ibm.social.ee.gadget._CommentsMixin");
dojo.require("com.ibm.social.ee.gadget._ThisCommentMixin");
dojo.require("com.ibm.social.ee.gadget._RecommendationsMixin");
dojo.require("com.ibm.social.ee.gadget._HTMLContentMixin");
dojo.require("com.ibm.social.ee.gadget._HistoryMixin");
dojo.require("com.ibm.social.ee.gadget._TagsMixin");
dojo.require("com.ibm.social.ee.gadget._GadgetMessageMixin");
dojo.require("com.ibm.social.ee.gadget._ActionsToolbarMixin");

dojo.require("com.ibm.social.ee.track.generic");
dojo.require("lconn.core.globalization.bidiUtil");

/**
 * Widget that displays an EE UI for a Blog Entry The following properties are
 * required for creation: - network - An instance of either NetworkOS or
 * NetworkDojo - context - A context object containing the URL of the blog entry
 */

/* globals com, lconn */

(function () {

    var uu = com.ibm.social.incontext.util.url;
    var ut = com.ibm.social.incontext.util.text;
    var g = com.ibm.social.ee.gadget;

    dojo.declare("com.ibm.social.ee.gadget.BlogEntry",
        [g._EEGadgetWidget,
            g._WidgetTabsMixin,
            g._RecommendationsMixin,
            g._CommentsMixin,
            g._ThisCommentMixin,
            g._HTMLContentMixin,
            g._HistoryMixin,
            g._TagsMixin,
            g._GadgetMessageMixin,
            g._ActionsToolbarMixin], {

            templatePath: dojo.moduleUrl("com.ibm.social.ee", "gadget/templates/BlogEntry.html"),

            // Gadget data store
            createDataStore: function () {
                return new com.ibm.social.ee.data.BlogEntryDataStore(this.getDsParams());
            },

            getDsParams: function () {
                return {
                    net: this.network,
                    url: this.routes.getBlogEntryUrl(this.context)
                };
            },

            // Initialize UI
            initializeUI: function () {
                this.inherited(arguments);
                this.setTitle();
                this.initTabContainer();
                this.initializeHistoryTab();
                this.initializeTags();
                this.commentCountChange(this.value("commentCount"));
                this.initActionsToolbar();
                this.initializeRecommendations();
                this.initializeContent();
                this.initializeComments();
                if (this.context.id.indexOf('urn:lsid:lconn.ibm.com:blogs.comment:') !== -1) {
                    this.initializeThisComment();
                }
                // Bidi support
                lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.gadgetBody);
                this.notifyLoaded();
            },
            /**
             * returns the action toolbar DOM node
             */
            getActionsToolbarNode: function () {
                return this.actionsToolbarNode;
            },
            // Tabs
            getTabContainerId: function () {
                return this.tabContainerNode;
            },
            getTabInitializers: function () {
                return { history: "initializeHistory" };
            },
            widgetTabs: {
                thiscomment: { tab: "thiscommentTab", tabLink: "thiscommentTabLink", tabBody: "thiscommentTabBody" },
                comments: { tab: "commentsTab", tabLink: "commentsTabLink", tabBody: "commentsTabBody" },
                history: { tab: "historyTab", tabLink: "historyTabLink", tabBody: "historyTabBody" }
            },
            initialTab: "thiscomment",
            initTabContainer: function () {
                if (this.context.id.indexOf('urn:lsid:lconn.ibm.com:blogs.comment:') === -1) {
                    this.switchTab("commentsTab", this.commentsTab, this.commentsTabLink, this.commentsTabBody, true);
                    this.initialTab = "comments";
                    dojo.addClass(this.commentsTab, "lotusFirst eeFirstTab");
                    dojo.destroy(this.thiscommentTab);
                    dojo.destroy(this.thiscommentTabBody);
                    delete this.widgetTabs.thiscomment;
                }
                this.inherited(arguments);
            },

            // Tags
            getTags: function () {
                return this.value("tags");
            },
            getTagsContainer: function () {
                return this.tagsDiv;
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
                return id ? id.replace(/.*entry-/, "") : null;
            },

            // Comments
            getCommentOpts: function () {
                var count = parseInt(this.value("commentCount"));
                var url = this.routes.anonymous ? this.value("urlFeed") : this.value("commentsFeed");
                if (url.indexOf('/roller-ui/rendering') === -1 && url.indexOf('/api/entrycomments/') !== -1) {
                    var idx1 = url.indexOf('/api/entrycomments/');
                    var idx2 = url.lastIndexOf('/', idx1 - 1);
                    url = url.substring(0, idx2) + '/roller-ui/rendering/api' + url.substring(idx2, idx1) + url.substring(idx1);
                }
                return {
                    commentCount: count,
                    url: uu.rewrite(url, { acls: "true" }),
                    dsOpts: { totalItems: count, anonymous: this.routes.anonymous },
                    dsConstructor: "com.ibm.social.ee.data.BlogCommentFeedDataStore",
                    docTitle: this.value("title"),
                    allowNewComments: this.value("commentsAllowed"),
                    htmlComments: true,
                    linkifyCreateComment: false,
                    mentionsEnabled: com.ibm.social.eeconfig.config.mentionsEnabled,
                    mentionsOpts: this.getMentionsOpts()
                };
            },
            getThisCommentOpts: function () {
                var opts = this.getCommentOpts();

                var url = this.routes.getBlogCommentUrl(this.context, true);
                opts.fetch = {
                    url: url,
                    dsConstructor: "com.ibm.social.ee.data.BlogThisCommentFeedDataStore"
                };
                opts.onCommentAdded = dojo.hitch(this, function (item) {
                    if (this.commentsWidget) {
                        this.commentsWidget.addComment(item);
                    }
                });
                return opts;
            },
            getMentionsOpts: function () {

                var communityId = this.context.communityid ? com.ibm.social.ee.util.misc.getItemId(this.context.communityid) : null;

                return {
                    communityId: communityId,
                    isPublic: this.context.isPublic === "true"
                };
            },
            getCommentsTabLinkId: function () {
                return this.commentsTabLink;
            },
            getCommentsContainer: function () {
                return this.commentsTabBody;
            },
            getThisCommentTab: function () {
                return this.thiscommentTab;
            },
            getThisCommentContainer: function () {
                return this.thiscommentTabBody;
            },

            // Recommendations
            getRecommendInlineDSClass: function () {
                return "com.ibm.social.ee.data.RecommendationsFeedDataStore";
            },
            getRecommendPopupDSClass: function () {
                return "com.ibm.social.ee.data.RecommendationsFeedDataStore";
            },
            getRecommendElement: function () {
                return this.recommendationNode;
            },
            getRecommendDSOptions: function () {
                var url = this.routes.anonymous ? this.value("recommendationUrl") : this.value("recommendationCollectionUrl");
                if (url.indexOf('/roller-ui/rendering') === -1 && url.indexOf('/api/recommend/entries/') !== -1) {
                    var idx1 = url.indexOf('/api/recommend/entries/');
                    var idx2 = url.lastIndexOf('/', idx1 - 1);
                    url = url.substring(0, idx2) + '/roller-ui/rendering/api' + url.substring(idx2, idx1) + url.substring(idx1);
                }
                return {
                    url: url,
                    hasRecommended: this.value("userRecommended"),
                    recommendCount: this.value("recommendCount")
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

            // HTML Content
            getHtmlContent: function () {
                return this.value("content") || "";
            },
            getTitle: function () {
                return this.value("title");
            },
            getHtmlNode: function () {
                return this.contentArea;
            },
            getImagesNode: function () {
                return this.imageContainer;
            },
            getReadMoreStrings: function () {
                return this.nls.blog;
            },
            getItemUrl: function () {
                return this.value("urlAlternate");
            },

            // Gadget lifecycle
            notifyLoaded: function () {
                dojo.publish("social/ee/blogentry/load", [this.context, this.network, this.routes.oauth]);
            },

            // Initialize blog title
            setTitle: function () {
                var _nls = this.nls;
                var title = this.value("title");
                this.itemUrl = this.value("urlAlternate");
                dojo.attr(this.titleNode, "href", this.itemUrl);
                dojo.attr(this.readMoreNode, "href", this.itemUrl);
                ut.breakString(title, dojo.doc, this.titleNode);
                var strings = this.getReadMoreStrings();
                this.titleNode.title = dojo.string.substitute(strings.readMore_tooltip, {"name": title});
                this.titleNode.setAttribute("aria-label", dojo.string.substitute(strings.readMore_a11y, {"name": title}));
                this.readMoreNode.title = dojo.string.substitute(strings.readMore_tooltip, {"name": title});
                this.readMoreNode.setAttribute("aria-label", dojo.string.substitute(strings.readMore_a11y, {"name": title}));
            }
        });
})();