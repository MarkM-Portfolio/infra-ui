/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/window",
	"dojo/_base/declare",
	"dojo/dom-class",
	"dojo/_base/array",
	"dojo/dom-attr",
	"dojo/html",
	"dojo/dom",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/i18n!ic-as/nls/activitystream",
	"dojo/i18n!ic-files/nls/ui",
	"dojo/on",
	"dojo/query",
	"dojo/string",
	"dojo/topic",
	"dojo/Deferred",
	"ic-ee/data/FileFollowingDataStore",
	"ic-ee/data/CommunityRoutes",
	"ic-ee/data/FileAccessChecker",
	"ic-ee/gadget/_CommentsMixin",
	"ic-ee/gadget/_ActionsToolbarMixin",
	"ic-core/auth",
	"ic-ee/gadget/_GadgetMessageMixin",
	"ic-ee/data/RecommendationsDataStore",
	"ic-as/config/enablement",
	"ic-ee/gadget/_HistoryMixin",
	"ic-ee/bean/AtomBean",
	"ic-ee/gadget/_RecommendationsMixin",
	"ic-ee/gadget/_TagsMixin",
	"ic-ee/util/misc",
	"ic-ee/widget/SharingInfo",
	"ic-eeconfig/config",
	"ic-incontext/util/text",
	"ic-incontext/util/url"
], function (dojo, windowModule, declare, domClass, array, domAttr, html, dom, lang, domConstruct, i18nactivitystream, i18nui, on, query, string, topic, Deferred, FileFollowingDataStore, CommunityRoutes, FileAccessChecker, _CommentsMixin, _ActionsToolbarMixin, auth, _GadgetMessageMixin, RecommendationsDataStore, enablement, _HistoryMixin, AtomBean, _RecommendationsMixin, _TagsMixin, misc, SharingInfo, ibmSocialEeconfigConfig, text, urlModule) {

	/* globals com, lconn */
	
	(function () {
	    // URL utility
	    var uu = urlModule;
	    var ut = text;
	    var g = com.ibm.social.ee.gadget;
	
	    var File = declare("com.ibm.social.ee.gadget.File",
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
	
	            nlsAs: i18nactivitystream,
	            nlsFiles: i18nui,
	
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
	                var ctnr = dom.byId(this.prefix + "_actionLinks");
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
	                        domAttr.set(tab, "role", "presentation");
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
	                return dom.byId(this.prefix + "_tags");
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
	                    mentionsEnabled: ibmSocialEeconfigConfig.mentionsEnabled,
	                    mentionsOpts: this.getMentionsOpts(),
	                    htmlComments: true,
	                    linkifyMentions: true,
	                    uuid: self.data.id
	                };
	            },
	            getMentionsOpts: function () {
	                var communityId = this.context.communityid ? misc.getItemId(this.context.communityid) : null;
	                return {
	                    communityId: communityId,
	                    isPublic: this.data.isPublic,
	                    visibilityChecker: new FileAccessChecker({fileId: this.getId(), routes: this.routes})
	                };
	            },
	            getCommentsTabLinkId: function () {
	                return this.prefix + "_comments_link";
	            },
	            getCommentsContainer: function () {
	                return dom.byId(this.prefix + "_comments");
	            },
	
	            // Recommendations Mixin
	            getRecommendElement: function () {
	                return dom.byId(this.prefix + "_recommendation");
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
	                return dom.byId(this.prefix + "_msgNode");
	            },
	            getMissingErrorMessage: function () {
	                return this.nls.file.error_404;
	            },
	            onMissingItem: function () {
	                topic.publish("com/ibm/social/ee/event/scrollTop", '');
	            },
	            getCommentsTab: function () {
	                return dom.byId(this.prefix + "_commentsTab");
	            },
	            getSharingTab: function () {
	                return dom.byId(this.prefix + "_sharingTab");
	            },
	            // History Mixin
	            getHistoryTab: function () {
	                return dom.byId(this.prefix + "_historyTab");
	            },
	            getHistoryContainer: function () {
	                return dom.byId(this.prefix + "_history");
	            },
	            getId: function () {
	                return this.data.id;
	            },
	
	            isVideoPlayable: function(){
	                var fileType = text.getExtension(this.data.title);
	
	                return fileType === "mp4" || fileType === "mov";
	            },
	
	            isImage: function(){
	                var fileExtension = text.getExtension(this.data.title);
	
	                var isImg = misc.isImage(fileExtension);
	
	                return isImg;
	            },
	
	            previewEnabled: function(){
	                return enablement.checkEnablement(enablement.AS_VIDEO_PREVIEW);
	            },
	
	            initializePreviewVideo: function(){
	                if(this.isVideoPlayable() && this.previewEnabled()){
	
	                    var previewNode = this.getPreviewVideoNode();
	                    var fileUrl = this._getDownloadLink(this.data.downloadLink)
	                    var filePageUrl = this.context.itemUrl ? this.context.itemUrl : null;
	
	                    var authorInfo = this.data.createdBy ? this.data.createdBy : null;
	                    var itemUtil = lang.getObject("com.ibm.social.as.util.ItemUtil");
	                    var itemUtilClass = new itemUtil();
	
	                    // if the user is external then we don't show links for user profiles
	                    var isUserExternal = auth.getUser() && auth.getUser().isExternal;
	
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
	                return dom.byId(this.prefix + "_imgPrev");
	            },
	            getPreviewVideoNode: function () {
	
	                var nodelist = query(".eeHeading");
	
	                if (nodelist && nodelist.length > 0) {
	                    var titleNode = nodelist[0];
	                    var videoPreviewDiv = domConstruct.create("div", {id: this.prefix+"_videoPreview", className: "videoPreview"}, titleNode, "after");
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
	                var launchPreviewLink = dom.byId(this.prefix + "_previewLink");
	
	                // if not an image file, we will remove preview link as well
	                var isImg = this.isImage();
	
	                if (launchPreviewLink && isImg) {
	
	                    var attrs = {
	                    	target: "_blank", 
	                        href: this.routes.getImagePreviewLink(this.data.id, this.data.title, this.data.isPublic),
	                        title: this.nls.file.PREVIEW.TITLE,
	                        innerHTML: this.nls.file.PREVIEW.LINK
	                    };
	                    domAttr.get(launchPreviewLink, attrs);
	
	                }else if (launchPreviewLink){
	                     var liNode = launchPreviewLink.parentNode;
	                     domConstruct.destroy(launchPreviewLink);
	                     domConstruct.destroy(liNode);
	                     var downloadLink = dom.byId(this.prefix + "_downloadLink");
	                     var liDownloadNode = downloadLink.parentNode;
	                     domClass.add(liDownloadNode, "lotusFirst");
	                }
	            },
	            checkExists: function (scope, callback) {
	                var reqOpts = {
	                    handleAs: "xml",
	                    url: scope.getEntryUrl(),
	                    preventCache: true,
	                    load: lang.hitch(this, function (e) {
	                        var bean = new AtomBean(e.documentElement);
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
	
	                var nodelist = query(".eeHeading");
	
	                if (nodelist && nodelist.length > 0) {
	                    var titleNode = nodelist[0];
	
	                    if (titleNode) {
	                        this.addSharedExternallyWidget(titleNode);
	                    }
	                }
	
	            },
	            // Initialize the download link
	            initDownloadLink: function () {
	                var downloadLink = dom.byId(this.prefix + "_downloadLink");
	                if(this.isVideoPlayable()){
	                    domAttr.set(downloadLink.parentNode, "className", "lotusFirst");
	                }
	                var attrs = {
	                	target: "_blank", 
	                    href: this._getDownloadLink(downloadLink.href),
	                    title: string.substitute(this.nls.file.download_tooltip, [ut.formatSize(this.data.size)]),
	                    role: "button",
	                    innerHTML: this.nls.file.download.DOWNLOAD_ALT
	                };
	                domAttr.get(downloadLink, attrs);
	            },
	
	            initFileSize: function () {
	                var fileSizeNode = dom.byId(this.prefix + "_fileSize");
	                domAttr.set(fileSizeNode, { innerHTML: ut.formatSize(this.data.size) });
	            },
	
	            initializeTagsLabel: function () {
	                if (this.data.tags && this.data.tags.length > 0) {
	                    var label = windowModule.doc.createTextNode(this.nls.generic.tags);
	                    domConstruct.place(label, dom.byId(this.prefix + "_tagsContainer"), "first");
	                }
	            },
	
	            initializeTabLabels: function () {
	                var commentsLink = dom.byId(this.prefix + "_comments_link");
	                var sharingLink = dom.byId(this.prefix + "_sharing_link");
	                var historyLink = dom.byId(this.prefix + "_history_link");
	                var commentsLabel = string.substitute(this.nls.COMMENTS.TAB_TITLE, [ this.data.commentsCount ]);
	                domAttr.set(commentsLink, { innerHTML: commentsLabel });
	                domAttr.set(sharingLink, { innerHTML: this.nlsFiles.DOCUMENTCONTENT.SHAREDWITH });
	                domAttr.set(historyLink, { innerHTML: this.nls.HISTORY.TAB_TITLE });
	            },
	
	            // Initialize the sharing tab (hide if community file)
	            initSharingTab: function () {
	                if (this.data.inCommunity) {
	                    var tab = dom.byId(this.prefix + "_sharingTab");
	                    if (tab) {
	                        tab.style.display = "none";
	                    }
	                }
	            },
	
	            // Initialize the file name and description
	            breakNameAndDesc: function () {
	                var d = windowModule.doc, fileName = dom.byId(this.prefix + "_fileName");
	                ut.breakString(this.data.title, d, fileName);
	                fileName.title = string.substitute(this.nls.file.tooltip, {name: this.data.title});
	                fileName.setAttribute("aria-label", string.substitute(this.nls.file.a11y_help, {name: this.data.title}));
	                if (this.data.summary !== "") {
	                    ut.breakString(this.data.summary, d, dom.byId(this.prefix + "_description"), 15);
	                }
	
	                if (!dojo._isBodyLtr()) {
	                    domAttr.set(fileName, "dir", "ltr");
	                }
	            },
	
	
	            toggleFollowing: function (followBtn) {
	                if (this.followingInProgress) {
	                    return;
	                }
	                this.followingInProgress = true;
	                var ds = new FileFollowingDataStore({ url: this.data.documentEntry, net: this.network });
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
	                        html.set(followBtn, newValue ? this.nls.file.following.remove : this.nls.file.following.add);
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
	                        isVisible: lang.hitch(scope, function () {
	                            return !!this.authUser.id;
	                        }),
	                        execute: lang.hitch(scope, function () {
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
	                            return !scope.data.isAnonymous && scope.data.canShare && lang.getObject("com.ibm.social.ee.config.files.canShare");
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
	                var ctnr = dom.byId(this.prefix + "_actionLinks");
	                array.forEach(actions, lang.hitch(this, function (action) {
	                    if (action.isVisible()) {
	                        var link = domConstruct.create("a", { href: "javascript:;", title: action.title, role: "button" }, domConstruct.create("li", { }, ctnr));
	                        link.appendChild(windowModule.doc.createTextNode(action.name));
	                        on(link, "click", lang.hitch(action, "execute"));
	                        if (action.isFollow) {
	                            domAttr.set(link, "aria-live", "polite");
	                            scope.followBtn = link;
	                        }
	                    }
	                }));
	            },
	
	            _initSharing: function () {
	                var dfd = new Deferred();
	                if (!this.hasSharing) {
	                    this.hasSharing = true;
	                    var sharingTab = dom.byId(this.prefix + "_sharing");
	                    var sharingDiv = domConstruct.create("div", { }, sharingTab);
	                    var commRoutes = this.getCommunityRoutes();
	                    var nls = this.nls;
	                    var constructSharingInfo = lang.hitch(this, function (filesStrings) {
	                        this.sharingInfo = new SharingInfo({
	                            net: this.network,
	                            owner: this.data.createdBy,
	                            url: this.routes.getSharesFeed(this.data.documentEntry),
	                            dsConstructor: "com.ibm.social.ee.data.SharingInfoDataStore",
	                            shareFileUrl: this.data.documentFeed,
	                            shareFileDsConstructor: "com.ibm.social.ee.data.ShareFileDataStore",
	                            generateUserLink: lang.hitch(this, this.generateUserLink),
	                            generateCommunityLink: lang.hitch(this, this.generateCommunityLink),
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
	                            canShare: this.data.canShare && lang.getObject("com.ibm.social.ee.config.files.canShare"),
	                            canMakePublic: (this.data.canMakePublic || this.data.isPublic),
	                            onDataLoaded: function () {
	
	                                var focusSourceChooser = lang.hitch(this, function () {
	                                    this.focusSourceChooser();
	                                });
	
	                                dfd.addCallback(focusSourceChooser);
	
	                                dfd.callback();
	                            },
	                            orgName: this.data.orgName,
	                            filesStrings: filesStrings
	                        }, sharingDiv);
	                        on(this.sharingInfo, "DisplayChange", lang.hitch(this, "onSizeChange"));
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
	                    this.communityRoutes = new CommunityRoutes(this.getRouteOptions());
	                }
	                return this.communityRoutes;
	            },
	
	            generateCommunityLink: function (div, community) {
	                var d = windowModule.doc;
	                var a = domConstruct.create("a", { href: this.getCommunityRoutes().getCommunityLink(community.id), target: "_blank" }, div);
	                ut.breakString(community.name, d, a);
	            },
	            onSizeChange: function (height) {
	            },
	            getPrefix: function () {
	                return this.prefix;
	            }
	        });
	})();
	return File;
});
