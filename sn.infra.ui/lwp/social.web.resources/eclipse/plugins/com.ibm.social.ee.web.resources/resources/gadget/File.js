/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget.File");

dojo.require("com.ibm.social.ee.widget.Button");
dojo.require("dijit.Menu");
dojo.require("dojo.html");
dojo.require("com.ibm.social.ee.data.CommunityRoutes");
dojo.require("com.ibm.social.ee.data.PreloadedCommentsDataStore");
dojo.require("com.ibm.social.ee.data.FileFollowingDataStore");
dojo.require("com.ibm.social.ee.data.SharingInfoDataStore");
dojo.require("com.ibm.social.ee.data.ShareFileDataStore");
dojo.require("com.ibm.social.ee.data.FileEntryDataStore");
dojo.require("com.ibm.social.ee.data.RecommendationsDataStore");
dojo.require("com.ibm.social.ee.widget.SharingInfo");
dojo.require("com.ibm.social.incontext.util.url");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.ee.gadget._SimpleEEGadget");
dojo.require("com.ibm.social.ee.gadget._SimpleTabsMixin");
dojo.require("com.ibm.social.ee.gadget._TagsMixin");
dojo.require("com.ibm.social.ee.gadget._CommentsMixin");
dojo.require("com.ibm.social.ee.gadget._RecommendationsMixin");
dojo.require("com.ibm.social.ee.gadget._HistoryMixin");
dojo.require("com.ibm.social.ee.gadget._PreviewImageMixin");
dojo.require("com.ibm.social.ee.gadget._PreviewVideoMixin");
dojo.require("com.ibm.social.ee.gadget._GadgetMessageMixin");
dojo.require("com.ibm.social.ee.data.FileAccessChecker");
dojo.requireLocalization("com.ibm.social.as", "activitystream");
dojo.requireLocalization("lconn.files", "ui");
dojo.require("com.ibm.social.ee.gadget._ActionsToolbarMixin");
dojo.require("com.ibm.social.ee.track.file");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.as.config.enablement");
dojo.require("com.ibm.social.as.util.ItemUtil");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.ee.util.misc");

/* globals com, lconn */

(function () {
    // URL utility
    var uu = com.ibm.social.incontext.util.url;
    var ut = com.ibm.social.incontext.util.text;
    var g = com.ibm.social.ee.gadget;

    dojo.declare("com.ibm.social.ee.gadget.File",
        [g._SimpleEEGadget,
            g._HistoryMixin,
            g._PreviewImageMixin,
            g._PreviewVideoMixin,
            g._CommentsMixin,
            g._RecommendationsMixin,
            g._TagsMixin,
            g._SimpleTabsMixin,
            g._GadgetMessageMixin,
            g._ActionsToolbarMixin], {

            nlsAs: dojo.i18n.getLocalization("com.ibm.social.as", "activitystream"),
            nlsFiles: dojo.i18n.getLocalization("lconn.files", "ui"),

            initializeUI: function () {
                this.inherited(arguments);
                this.initializeTabLabels();
                this.initTabContainer();
                this.initializeHistoryTab();
                this.initializeTagsLabel();
                this.initializeTags();
                this.setButtonActions();
                this.initActionsToolbar();
                this.initializeRecommendations();
                this.initializeComments();
                this.breakNameAndDesc();
                this.initSharedExternally();
                this.initSharingTab();
                this.initPreviewLink();
                this.initDownloadLink();
                this.initFileSize();
                this.initializePreviewImage();
                this.initializePreviewVideo();
            },
            /**
             * returns the action toolbar DOM node
             */
            getActionsToolbarNode: function () {
                var ctnr = dojo.byId(this.prefix + "_actionLinks");
                return ctnr;
            },
            initTabContainer: function () {
                this.inherited(arguments);

                var commentsTab = this.getCommentsTab();
                var sharingTab = this.getSharingTab();
                var historyTab = this.getHistoryTab();

                var tabs = [commentsTab, sharingTab, historyTab];

                for (var tabCount = 0; tabCount < tabs.length; tabCount++) {

                    var tab = tabs[tabCount];

                    if (tab) {
                        dojo.attr(tab, "role", "presentation");
                    }
                }
            },
            // Simple tabs mixin
            getTabContainerId: function () {
                return this.prefix + "_file-ee-tablist";
            },
            getTabStylePrefix: function () {
                return "file-ee";
            },
            getTabInitializers: function (tab) {
                return {
                    sharing: "_initSharing",
                    history: "initializeHistory"
                };
            },

            // Tags Mixin
            getTags: function () {
                return this.data.tags;
            },
            getTagsNode: function () {
                return dojo.byId(this.prefix + "_tags");
            },

            // Comments Mixin
            getCommentOpts: function () {
                var self = this;
                return {
                    commentCount: self.data.commentsCount,
                    url: uu.rewrite(self.data.documentFeed, { acls: "true" }),
                    dsConstructor: "com.ibm.social.ee.data.PreloadedCommentsDataStore",
                    dsOpts: { items: self.data.comments, totalItems: self.data.commentsCount },
                    docTitle: self.data.title,
                    showVersion: true,
                    createdStrings: self.nls.COMMENT_CREATED,
                    currVersion: self.data.currentVersionLabel,
                    mentionsEnabled: com.ibm.social.eeconfig.config.mentionsEnabled,
                    mentionsOpts: this.getMentionsOpts(),
                    htmlComments: true,
                    linkifyMentions: true,
                    uuid: self.data.id
                };
            },
            getMentionsOpts: function () {
                var communityId = this.context.communityid ? com.ibm.social.ee.util.misc.getItemId(this.context.communityid) : null;
                return {
                    communityId: communityId,
                    isPublic: this.data.isPublic,
                    visibilityChecker: new com.ibm.social.ee.data.FileAccessChecker({fileId: this.getId(), routes: this.routes, network: this.network})
                };
            },
            getCommentsTabLinkId: function () {
                return this.prefix + "_comments_link";
            },
            getCommentsContainer: function () {
                return dojo.byId(this.prefix + "_comments");
            },

            // Recommendations Mixin
            getRecommendElement: function () {
                return dojo.byId(this.prefix + "_recommendation");
            },
            getRecommendDSOptions: function () {
                var url = this.routes.getRecommendationsFeed(this.data.documentEntry);
                var entryUrl = this.routes.getRecommendationEntry(this.data.documentEntry, this.data.authUser.id);
                return {
                    url: url,
                    entryUrl: entryUrl,
                    documentFeed: this.data.documentFeed,
                    hasRecommended: this.data.recommended,
                    recommendCount: this.data.recommendCount
                };
            },
            getMissingErrorNode: function () {
                return dojo.byId(this.prefix + "_msgNode");
            },
            getMissingErrorMessage: function () {
                return this.nls.file.error_404;
            },
            onMissingItem: function () {
                dojo.publish("com/ibm/social/ee/event/scrollTop", null);
            },
            getCommentsTab: function () {
                return dojo.byId(this.prefix + "_commentsTab");
            },
            getSharingTab: function () {
                return dojo.byId(this.prefix + "_sharingTab");
            },
            // History Mixin
            getHistoryTab: function () {
                return dojo.byId(this.prefix + "_historyTab");
            },
            getHistoryContainer: function () {
                return dojo.byId(this.prefix + "_history");
            },
            getId: function () {
                return this.data.id;
            },

            isVideoPlayable: function(){
                var fileType = com.ibm.social.incontext.util.text.getExtension(this.data.title);

                return fileType === "mp4" || fileType === "mov";
            },

            isImage: function(){
                var fileExtension = com.ibm.social.incontext.util.text.getExtension(this.data.title);

                var isImg = com.ibm.social.ee.util.misc.isImage(fileExtension);

                return isImg;
            },

            previewEnabled: function(){
                return com.ibm.social.as.config.enablement.checkEnablement(com.ibm.social.as.config.enablement.AS_VIDEO_PREVIEW);
            },

            initializePreviewVideo: function(){
                if(this.isVideoPlayable() && this.previewEnabled()){

                    var previewNode = this.getPreviewVideoNode();
                    var fileUrl = this._getDownloadLink(this.data.downloadLink)
                    var filePageUrl = this.context.itemUrl ? this.context.itemUrl : null;

                    var authorInfo = this.data.createdBy ? this.data.createdBy : null;
                    var itemUtil = dojo.getObject("com.ibm.social.as.util.ItemUtil");
                    var itemUtilClass = new itemUtil();

                    // if the user is external then we don't show links for user profiles
                    var isUserExternal = lconn.core.auth.getUser() && lconn.core.auth.getUser().isExternal;

                    if(!isUserExternal){
                        var authorInfoLink = itemUtilClass.createNewsUser(authorInfo.id, authorInfo.name);
                    }else{
                        var authorInfoLink = authorInfo.name;
                    }

                    this.initPreviewVideo(previewNode, this.data.title, fileUrl, filePageUrl, authorInfoLink);

                }
            },

            // Preview Image mixin
            getPreviewImageLink: function () {
                if (this.data.previewAvailable) {
                    var url = this.data.previewLink;
                    url = this.network.rewriteUrl(url);
                    return url;
                }
                return null;
            },
            getPreviewImageNode: function () {
                return dojo.byId(this.prefix + "_imgPrev");
            },
            getPreviewVideoNode: function () {

                var nodelist = dojo.query(".eeHeading");

                if (nodelist && nodelist.length > 0) {
                    var titleNode = nodelist[0];
                    var videoPreviewDiv = dojo.create("div", {id: this.prefix+"_videoPreview", className: "videoPreview"}, titleNode, "after");
                    return videoPreviewDiv;
                }
            },
            getPreviewImageData: function () {
                var self = this;
                return {
                    size: self.data.size,
                    downloadTooltip: self.nls.file.download_tooltip,
                    downloadLink: self._getDownloadLink(self.data.downloadLink)
                };
            },
            getEntryUrl: function () {
                return this.data.documentEntry;
            },
            // Initialize the preview link
            initPreviewLink: function () {
                var launchPreviewLink = dojo.byId(this.prefix + "_previewLink");

                // if not an image file, we will remove preview link as well
                var isImg = this.isImage();

                if (launchPreviewLink && isImg) {

                    var attrs = {
                    	target: "_blank", 	
                        href: this.routes.getImagePreviewLink(this.data.id, this.data.title, this.data.isPublic),
                        title: this.nls.file.PREVIEW.TITLE,
                        innerHTML: this.nls.file.PREVIEW.LINK
                    };
                    dojo.attr(launchPreviewLink, attrs);

                }else if (launchPreviewLink){
                     var liNode = launchPreviewLink.parentNode;
                     dojo.destroy(launchPreviewLink);
                     dojo.destroy(liNode);
                     var downloadLink = dojo.byId(this.prefix + "_downloadLink");
                     var liDownloadNode = downloadLink.parentNode;
                     dojo.addClass(liDownloadNode, "lotusFirst");
                }
            },
            checkExists: function (scope, callback) {
                var reqOpts = {
                    handleAs: "xml",
                    url: scope.getEntryUrl(),
                    preventCache: true,
                    load: dojo.hitch(this, function (e) {
                        var bean = new com.ibm.social.ee.bean.AtomBean(e.documentElement);
                        callback(bean);
                    }),
                    error: function () {
                        callback(null);
                    }
                };
                scope.network.get(reqOpts);
            },
            _getDownloadLink: function (url) {
                if (this.routes.oauth) {
                    url = url.replace("/anonymous/", "/"); // Workaround for files defect
                    url = this.network.rewriteUrl(url);
                }
                return url;
            },
            //shared externally
            initSharedExternally: function () {

                var nodelist = dojo.query(".eeHeading");

                if (nodelist && nodelist.length > 0) {
                    var titleNode = nodelist[0];

                    if (titleNode) {
                        this.addSharedExternallyWidget(titleNode);
                    }
                }

            },
            // Initialize the download link
            initDownloadLink: function () {
                var downloadLink = dojo.byId(this.prefix + "_downloadLink");
                if(this.isVideoPlayable()){
                    dojo.attr(downloadLink.parentNode, "className", "lotusFirst");
                }
                var attrs = {
                    href: this._getDownloadLink(downloadLink.href),
                    title: dojo.string.substitute(this.nls.file.download_tooltip, [ut.formatSize(this.data.size)]),
                    role: "button",
                    innerHTML: this.nls.file.download.DOWNLOAD_ALT,
                    target: '_blank'
                };
                dojo.attr(downloadLink, attrs);
            },

            initFileSize: function () {
                var fileSizeNode = dojo.byId(this.prefix + "_fileSize");
                dojo.attr(fileSizeNode, { innerHTML: ut.formatSize(this.data.size) });
            },

            initializeTagsLabel: function () {
                if (this.data.tags && this.data.tags.length > 0) {
                    var label = dojo.doc.createTextNode(this.nls.generic.tags);
                    dojo.place(label, dojo.byId(this.prefix + "_tagsContainer"), "first");
                }
            },

            initializeTabLabels: function () {
                var commentsLink = dojo.byId(this.prefix + "_comments_link");
                var sharingLink = dojo.byId(this.prefix + "_sharing_link");
                var historyLink = dojo.byId(this.prefix + "_history_link");
                var commentsLabel = dojo.string.substitute(this.nls.COMMENTS.TAB_TITLE, [ this.data.commentsCount ]);
                dojo.attr(commentsLink, { innerHTML: commentsLabel });
                dojo.attr(sharingLink, { innerHTML: this.nlsFiles.DOCUMENTCONTENT.SHAREDWITH });
                dojo.attr(historyLink, { innerHTML: this.nls.HISTORY.TAB_TITLE });
            },

            // Initialize the sharing tab (hide if community file)
            initSharingTab: function () {
                if (this.data.inCommunity) {
                    var tab = dojo.byId(this.prefix + "_sharingTab");
                    if (tab) {
                        tab.style.display = "none";
                    }
                }
            },

            // Initialize the file name and description
            breakNameAndDesc: function () {
                var d = dojo.doc, fileName = dojo.byId(this.prefix + "_fileName");
                ut.breakString(this.data.title, d, fileName);
                fileName.title = dojo.string.substitute(this.nls.file.tooltip, {name: this.data.title});
                fileName.setAttribute("aria-label", dojo.string.substitute(this.nls.file.a11y_help, {name: this.data.title}));
                if (this.data.summary !== "") {
                    ut.breakString(this.data.summary, d, dojo.byId(this.prefix + "_description"), 15);
                }

                if (!dojo._isBodyLtr()) {
                    dojo.attr(fileName, "dir", "ltr");
                }
            },


            toggleFollowing: function (followBtn) {
                if (this.followingInProgress) {
                    return;
                }
                this.followingInProgress = true;
                var ds = new com.ibm.social.ee.data.FileFollowingDataStore({ url: this.data.documentEntry, net: this.network });
                var newValue = !this.data.following;
                var item = ds.newItem({following: this.data.following });
                ds.revert();
                ds.setValue(item, "following", newValue);
                ds.save({
                    scope: this,
                    onError: function (error) {
                        this.onErrorMessage();
                        this.followingInProgress = false;

                    },
                    onComplete: function () {
                        this.followingInProgress = false;
                        this.data.following = newValue;
                        dojo.html.set(followBtn, newValue ? this.nls.file.following.remove : this.nls.file.following.add);
                    }
                });
            },
            setButtonActions: function () {
                var scope = this;
                var nls = this.nls;
                var actions = [
                    {
                        name: this.nlsAs.commentText,
                        title: nls.COMMENTS.ADD_COMMENT_TOOLTIP,
                        isVisible: dojo.hitch(scope, function () {
                            return !!this.authUser.id;
                        }),
                        execute: dojo.hitch(scope, function () {
                            if (this.commentsWidget) {
                                this.switchTab("comments");
                                this.commentsWidget.createComment();
                            }
                        })
                    },
                    {
                        name: nls.file.share.label,
                        title: nls.file.share.title,
                        isVisible: function () {
                            return !scope.data.isAnonymous && scope.data.canShare && dojo.getObject("com.ibm.social.ee.config.files.canShare");
                        },
                        execute: function () {
                            scope.switchTab("sharing");
                            scope.sharingInfo.showSharing();
                        }
                    },
                    {
                        name: this.data.following ? nls.file.following.remove : nls.file.following.add,
                        title: nls.file.following.title,
                        isVisible: function () {
                            if (!scope.data.isAnonymous) {
                                return scope.data.canFollow;
                            }
                            else {
                                return false;
                            }
                        },
                        execute: function () {
                            scope.toggleFollowing(scope.followBtn);
                        },
                        isFollow: true
                    }
                ];
                var ctnr = dojo.byId(this.prefix + "_actionLinks");
                dojo.forEach(actions, dojo.hitch(this, function (action) {
                    if (action.isVisible()) {
                        var link = dojo.create("a", { href: "javascript:;", title: action.title, role: "button" }, dojo.create("li", { }, ctnr));
                        link.appendChild(dojo.doc.createTextNode(action.name));
                        dojo.connect(link, "onclick", action, "execute");
                        if (action.isFollow) {
                            dojo.attr(link, "aria-live", "polite");
                            scope.followBtn = link;
                        }
                    }
                }));
            },

            _initSharing: function () {
                var dfd = new dojo.Deferred();
                if (!this.hasSharing) {
                    this.hasSharing = true;
                    var sharingTab = dojo.byId(this.prefix + "_sharing");
                    var sharingDiv = dojo.create("div", { }, sharingTab);
                    var commRoutes = this.getCommunityRoutes();
                    var nls = this.nls;
                    var constructSharingInfo = dojo.hitch(this, function (filesStrings) {
                        this.sharingInfo = new com.ibm.social.ee.widget.SharingInfo({
                            net: this.network,
                            owner: this.data.createdBy,
                            url: this.routes.getSharesFeed(this.data.documentEntry),
                            dsConstructor: "com.ibm.social.ee.data.SharingInfoDataStore",
                            shareFileUrl: this.data.documentFeed,
                            shareFileDsConstructor: "com.ibm.social.ee.data.ShareFileDataStore",
                            generateUserLink: dojo.hitch(this, this.generateUserLink),
                            generateCommunityLink: dojo.hitch(this, this.generateCommunityLink),
                            entryUrl: this.data.documentEntry,
                            entryDsConstructor: "com.ibm.social.ee.data.FileEntryDataStore",
                            nls: nls.FILE_SHARE_INFO,
                            messageNls: nls.MESSAGE,
                            file: this.data,
                            isPublic: this.data.isPublic,
                            filesUrl: this.routes.getServiceUrl(),
                            communitiesTypeAheadUrl: commRoutes.getTypeAheadUrl(),
                            communitiesEnabled: commRoutes.isServiceEnabled(),
                            authUser: this.data.authUser,
                            canShare: this.data.canShare && dojo.getObject("com.ibm.social.ee.config.files.canShare"),
                            canMakePublic: (this.data.canMakePublic || this.data.isPublic),
                            onDataLoaded: function () {

                                var focusSourceChooser = dojo.hitch(this, function () {
                                    this.focusSourceChooser();
                                });

                                dfd.addCallback(focusSourceChooser);

                                dfd.callback();
                            },
                            orgName: this.data.orgName,
                            filesStrings: filesStrings
                        }, sharingDiv);
                        dojo.connect(this.sharingInfo, "onDisplayChange", this, "onSizeChange");
                    });
                    if (this.data.orgName) {
                        constructSharingInfo(this.nlsFiles.SHARING.USERS_POPUP_FILE);
                    }
                    else {
                        constructSharingInfo();
                    }
                }
                else {
                    dfd.callback();
                }

                return dfd;
            },

            getCommunityRoutes: function () {
                if (!this.communityRoutes) {
                    this.communityRoutes = new com.ibm.social.ee.data.CommunityRoutes(this.getRouteOptions());
                }
                return this.communityRoutes;
            },

            generateCommunityLink: function (div, community) {
                var d = dojo.doc;
                var a = dojo.create("a", { href: this.getCommunityRoutes().getCommunityLink(community.id), target: "_blank" }, div);
                ut.breakString(community.name, d, a);
            },
            onSizeChange: function (height) {
            },
            getPrefix: function () {
                return this.prefix;
            }
        });
})();