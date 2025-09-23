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

dojo.provide("com.ibm.social.ee.gadget.StatusUpdate");

dojo.requireLocalization("com.ibm.social.ee", "socialEEStrings");

dojo.require("com.ibm.social.ee.data.FilesRoutes");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.url");
dojo.require("com.ibm.social.ee.data.SUCommentsDataStore");
dojo.require("com.ibm.social.ee.data.SURecommendationsDataStore");
dojo.require("com.ibm.social.ee.data.QCSFeedDataStore");
dojo.require("com.ibm.social.ee.bean.Bean");
dojo.require("dojo.string");
dojo.require("com.ibm.social.ee.gadget._SimpleEEGadget");
dojo.require("com.ibm.social.ee.gadget._SimpleTabsMixin");
dojo.require("com.ibm.social.ee.gadget._TagsMixin");
dojo.require("com.ibm.social.ee.gadget._CommentsMixin");
dojo.require("com.ibm.social.ee.gadget._RecommendationsMixin");
dojo.require("com.ibm.social.ee.gadget._HistoryMixin");
dojo.require("com.ibm.social.ee.gadget._PreviewImageMixin");
dojo.require("com.ibm.social.ee.gadget._PreviewVideoMixin");
dojo.require("com.ibm.social.ee.gadget._UrlPreviewMixin");
dojo.require("com.ibm.social.as.util.hashtag.HashtagUtil");
dojo.require("com.ibm.social.ee.gadget._GadgetMessageMixin");
dojo.require("com.ibm.social.ee.util.misc");
dojo.require("com.ibm.social.eeconfig.config");
dojo.require("dojo.DeferredList");
dojo.require("lconn.core.widget.urlPreview.URLPreviewNode");
dojo.requireLocalization("com.ibm.social.as", "activitystream");
dojo.require("com.ibm.social.as.item.SharedExternally");
dojo.require("com.ibm.social.ee.gadget._ActionsToolbarMixin");
dojo.require("com.ibm.social.as.config.enablement");
dojo.require('com.ibm.social.incontext.widget.Tooltip');

/* globals com, lconn */

(function () {

    var g = com.ibm.social.ee.gadget;
    var tu = com.ibm.social.incontext.util.text;
    var uu = com.ibm.social.incontext.util.url;

    dojo.declare("com.ibm.social.ee.gadget.StatusUpdate",
        [g._SimpleEEGadget,
            g._HistoryMixin,
            g._PreviewImageMixin,
            g._PreviewVideoMixin,
            g._UrlPreviewMixin,
            g._CommentsMixin,
            g._RecommendationsMixin,
            g._TagsMixin,
            g._SimpleTabsMixin,
            g._GadgetMessageMixin,
            g._ActionsToolbarMixin], {

            actionsToolbar: null,

            DEFAULT_MAX_LENGTH: 250,

            nlsAs: dojo.i18n.getLocalization("com.ibm.social.as", "activitystream"),
            
            /** {com.ibm.social.as.item.SharedExternally} the shared externally widget */
            sharedExternally : null,

            initializeUI: function () {
                this.inherited(arguments);
                this.initProfileImage();
                this.initStatus();
                this.setButtonActions();
                this.initActionsToolbar();
                this.initializeRecommendations();

                // Init Mixins
                this.initTabContainer();
                this.initializeHistoryTab();

                this.initializeComments();

                // Initialize file attachment
                this.initAttachment();
                this.initVideoPreview();
                this.initUrlPreview();
                
                // Initialize shared externally widget
                this._initSharedExternally();	
            },
            
            /**
             * If the status update is external, init and enable the SharedExternally widget. 
             * 
             * @private
             */
            _initSharedExternally : function() {
            	if (this.isSharedExternally()) {
            		var sharedExternallyNode = dojo.byId(this.prefix + "_sharedExternally");
            		if (sharedExternallyNode){
            			this.sharedExternally = new com.ibm.social.as.item.SharedExternally({}, dojo.byId(this.prefix + "_sharedExternally"));	
            		}
                }
            },
            
            /**
             * returns the action toolbar DOM node
             */
            getActionsToolbarNode: function () {
                var ctnr = dojo.byId(this.prefix + "_actionLinks");
                return ctnr;
            },

            // Simple tabs mixin
            getTabContainerId: function () {
                return this.prefix + "_su-ee-tablist";
            },
            getTabStylePrefix: function () {
                return "su-ee";
            },
            getTabInitializers: function (tab) {
                return { history: "initializeHistory" };
            },

            // Comments Mixin
            getCommentOpts: function () {
                var self = this;
                return {
                    commentCount: self.data.totalComments,
                    url: self.data.commentsFeedUrl,
                    dsConstructor: "com.ibm.social.ee.data.SUCommentsDataStore",
                    dsOpts: { items: self.data.comments,
                        totalItems: self.data.totalComments,
                        authUser: self.data.authUser,
                        permissionsUrl: self.routes.getSUPermissionsUrl()
                    },
                    createdStrings: this.nls.COMMENT_CREATED_NOVERSION,
                    docTitle: "(none)",
                    htmlComments: true,
                    allowNewComments: this.data.canComment,
                    commentLikes: com.ibm.social.eeconfig.config.commentLikes,
                    mentionsEnabled: com.ibm.social.eeconfig.config.mentionsEnabled,
                    mentionsOpts: this.getMentionsOpts(),
                    likeDsFactory: this.getCommentLikeDsFactory(),
                    likeOpts: this.getCommentLikeOpts(),
                    useDeleteIcon: true
                };
            },
            getMentionsOpts: function () {
                var communityId = this.context.communityid ? com.ibm.social.ee.util.misc.getItemId(this.context.communityid) : null;
                return {
                    communityId: communityId,
                    isPublic: this.data["public"]
                };
            },
            getCommentsTabLinkId: function () {
                return this.prefix + "_commentsLink";
            },
            getCommentsContainer: function () {
                return dojo.byId(this.prefix + "_comments");
            },
            getCommentLikeDsFactory: function () {
                var commonOpts = {
                    net: this.network,
                    authUser: dojo.clone(this.authUser)
                };

                function addCommentOpts(opts, comment, ds) {
                    dojo.mixin(opts, {
                        url: ds.getValue(comment, "likesFeed"),
                        recommendCount: ds.getValue(comment, "totalRecommendations"),
                        hasRecommended: ds.getValue(comment, "hasRecommended"),
                        retrievedRecommend: true
                    });
                }

                return {
                    getInlineDs: function (comment, ds) {
                        var opts = dojo.mixin({ countOnly: true }, commonOpts);
                        addCommentOpts(opts, comment, ds);
                        return new com.ibm.social.ee.data.SURecommendationsDataStore(opts);
                    },
                    getPopupDs: function (comment, ds) {
                        var opts = dojo.mixin({ }, commonOpts);
                        addCommentOpts(opts, comment, ds);
                        return new com.ibm.social.ee.data.SURecommendationsDataStore(opts);
                    }
                };
            },
            getCommentLikeOpts: function () {
                var profilesRoutes = this.getProfilesRoutes();
                var canComment = this.data.canComment;
                var opts = {
                    getUserProfileUrl: dojo.hitch(profilesRoutes, profilesRoutes.getUserProfileUrl),
                    getUserPhotoUrl: dojo.hitch(profilesRoutes, profilesRoutes.getUserPhotoUrl)
                };
                if (!canComment) {
                    dojo.mixin(opts, { currentUserId: "" });
                }
                return opts;
            },
            // Recommendations Mixin
            getRecommendInlineDSClass: function () {
                return "com.ibm.social.ee.data.SURecommendationsDataStore";
            },
            getRecommendPopupDSClass: function () {
                return this.getRecommendInlineDSClass();
            },
            getRecommendElement: function () {
                return dojo.byId(this.prefix + "_recommendation");
            },
            getRecommendDSOptions: function () {
                var url = this.data.recommendationsFeed;
                return {
                    url: url,
                    recommendCount: this.data.totalRecommendations,
                    hasRecommended: this.data.hasRecommended,
                    retrievedRecommend: true
                };
            },
            getRecommendOptions: function () {
                if (!this.data.canLike) {
                    return { currentUserId: "" };
                }
                else {
                    return { };
                }
            },
            getMissingErrorNode: function () {
                return dojo.byId(this.prefix + "_msgNode");
            },
            getMissingErrorMessage: function () {
                return this.nls.statusUpdate.error_404;
            },

            onMissingItem: function () {
                dojo.publish("com/ibm/social/ee/event/scrollTop", null);
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


            initializeComments: function () {
                this.inherited(arguments);
                var comments = this.commentsWidget;
                comments.setFixedMaxLength(this.DEFAULT_MAX_LENGTH);
                if ("maxCommentLength" in this.data) {
                    comments.setFixedMaxLength(this.data.maxCommentLength);
                }
            },

            initStatus: function () {
                var htUtil = new com.ibm.social.as.util.hashtag.HashtagUtil(),
                    tagsArray = this.data.tags || [],
                    communityId = this.context.communityid ? com.ibm.social.ee.util.misc.getItemId(this.context.communityid) : null;
                var statusEL = dojo.byId(this.prefix + "_status");
                statusEL.innerHTML = htUtil.linkifyHashtags(this.data.message, tagsArray, communityId);
                dojo.query("a", statusEL).forEach(function(node, index, arr){
                	dojo.attr(node, "target", "_blank");
                	if(lconn.core.config.features(com.ibm.social.ee.util.misc.CONNECTIONS_TOOLTIP_GK)){
                		new com.ibm.social.incontext.widget.Tooltip({
            				connectId: [node],
            				label: dojo.getAttr(node, 'title'),
            				position: ['after', 'above', 'below', 'before']
            			});
                	}
                });
                
                tu.breakStringHTML(statusEL, 15);
            },

            initProfileImage: function () {
                var peopleObj = dojo.getObject("com.ibm.lconn.layout.people");
                var link;
                if (peopleObj && peopleObj.isImageEnabled()) {
                    link = com.ibm.lconn.layout.people.createImage(this.data.author, 60, true);
                    dojo.place(link, dojo.byId(this.prefix + "_userPhotoLink"), "replace");
                    dojo.attr(link, "target", "_blank");
                    dojo.removeAttr(link, "aria-describedby");
                }
                else {
                    var img = dojo.byId(this.prefix + "_profileImage");
                    img.src = this.getProfilesRoutes().getUserPhotoUrl(this.data.author.id);
                    link = dojo.byId(this.prefix + "_userPhotoLink");
                }
                
                link.title = dojo.string.substitute(this.nls.file.profile_title, {user: this.data.author.name});
                link.setAttribute("aria-label", dojo.string.substitute(this.nls.file.profile_a11y, {user: this.data.author.name}));
                if(lconn.core.config.features(com.ibm.social.ee.util.misc.CONNECTIONS_TOOLTIP_GK)){
                	var label = link.title + " " + this.nlsAs.opensInNewWindow;
                    new com.ibm.social.incontext.widget.Tooltip({
        				connectId: [link],
        				label: label,
        				position: ['after', 'above', 'below', 'before']
        			});
                }
            },

            setButtonActions: function () {
                var scope = this;
                var context = this.context;
                var nls = this.nls;
                var actions = [];
                if (this.data.canComment) {
                    actions.push({
                        name: this.nlsAs.commentText,
                        title: nls.COMMENTS.ADD_COMMENT_TOOLTIP,
                        isVisible: function () {
                            return true;
                        },
                        execute: dojo.hitch(scope, function () {
                            if (this.commentsWidget) {
                                this.switchTab("comments");
                                this.commentsWidget.createComment();
                            }
                        })
                    });
                }
                if (!this.routes.anonymous && this.context.eventId && this.data.canBoardPost) {
                    actions.push({
                            name: nls.repost.name,
                            title: nls.repost.title,
                            isVisible: function () {
                                if (!scope.data["public"]) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            },
                            execute: function () {
                                var repostObj = {
                                    verb: "bump",
                                    id: context.eventId
                                };
                                var postBody = dojo.toJson(repostObj);
                                var osRoutes = new com.ibm.social.ee.data.OpenSocialRoutes(scope.getRouteOptions());
                                scope.network.postJson({
                                    url: osRoutes.getRepostUrl(),
                                    postData: postBody,
                                    handleAs: "json",
                                    requireData: true,
                                    headers: {"Content-Type": "application/json; charset=utf-8"},
                                    handle: dojo.hitch(scope, function (response) {
                                        var div = dojo.create("div");
                                        var message = {refId: null, canClose: true, message: div, onRemove: dojo.hitch(scope, function () {
                                            dojo.style(dojo.byId(this.prefix + "_msgNode"), "display", "none");
                                        })};

                                        if (response instanceof Error) {
                                            message.error = true;
                                            div.appendChild(dojo.doc.createTextNode(nls.repost.msg_generic));
                                        } else {
                                            message.success = true;
                                            div.appendChild(dojo.doc.createTextNode(nls.repost.msg_success));
                                        }

                                        if (!this.messageContainer) {
                                            this.messageContainer = new com.ibm.social.incontext.widget.MessageContainer({items: [message], nls: nls.MESSAGE},
                                                dojo.byId(this.prefix + "_msgNode").appendChild(dojo.doc.createElement("div")));
                                            this.messageContainer.onDisplayChange();
                                            dojo.connect(this.messageContainer, "onDisplayChange", this, "onSizeChange");
                                        }
                                        else {
                                            this.messageContainer.clear();
                                            this.messageContainer.add(message, true);
                                        }
                                        dojo.style(dojo.byId(this.prefix + "_msgNode"), "display", "");
                                        this.onSizeChange();
                                        dojo.publish("com/ibm/social/ee/event/scrollTop", null);
                                    })
                                });
                            }
                        }
                    );
                }

                var ctnr = dojo.byId(this.prefix + "_actionLinks");

                dojo.forEach(actions, dojo.hitch(this, function (action) {
                    if (action.isVisible()) {
                        var link = dojo.create("a", { href: "javascript:;", role: "button" }, dojo.create("li", { }, ctnr));
                        link.appendChild(dojo.doc.createTextNode(action.name));
                        dojo.connect(link, "onclick", action, "execute");
                    }
                }));
            },
            initAttachment: function () {
                if (this.data.ref && this.data.ref.id) {
                    var id = this.getAttachmentId(this.data);
                    this.getAttachmentDetails(id, dojo.hitch(this, this.attachmentEntryLoaded));
                }
            },

            //FIXME: Hack to obtain the correct file id (wrong id is currently returned by News)
            getAttachmentId: function (data) {
                var id = data.ref.id;
                var re;
                var result;
                if (data.ref.url) {
                    re = /document\/(.*)\/media/;
                    result = re.exec(data.ref.url);
                    if (result && result.length) {
                        id = result[1];
                    }
                }
                else if (data.ref.imageUrl) {
                    re = /document\/(.*)\/thumbnail/;
                    result = re.exec(data.ref.imageUrl);
                    if (result && result.length) {
                        id = result[1];
                    }
                }
                return id;
            },

            initUrlPreview: function () {
                if (this.data.ref && this.data.ref.type === "link") {

                    var previewNode = dojo.byId(this.prefix + "_urlPreview");

                    this.createUrlPreviewNode(previewNode);
                }
            },

            initVideoPreview: function () {
                if(this.isVideoPlayable() && this.previewEnabled() && this.data.ref.type === "file"){
                    var authorInfoLink = null;

                    var previewNode = dojo.byId(this.prefix + "_urlPreview");
                    var metaDataNode = dojo.byId(this.prefix + "_attachmentMeta");

                    var fileUrl =  this.data.ref ? this.data.ref.url : "";

                    if(this.data.ref && this.data.ref.author){
                        var authorInfo = this.data.ref.author;

                        // if the user is external then we don't show links for user profiles
                        var isUserExternal = lconn.core.auth.getUser() && lconn.core.auth.getUser().isExternal;

                        if(!isUserExternal){
                            var itemUtil = dojo.getObject("com.ibm.social.as.util.ItemUtil");
                            var itemUtilClass = new itemUtil();
                            authorInfoLink = itemUtilClass.createNewsUser(authorInfo.id, authorInfo.name);
                        }else{
                            authorInfoLink = authorInfo.name;
                        }
                    }

                    if (this.data.ref && this.data.ref.displayName){
                        this.initPreviewVideo(previewNode, this.data.ref.displayName , fileUrl, fileUrl, authorInfoLink);
                    }
                    dojo.place(previewNode,metaDataNode,"before");
                    previewNode.style.display = "";
                }
            },

            isVideoPlayable: function(){

                if (this.data.ref && this.data.ref.displayName){
                    var fileType = com.ibm.social.incontext.util.text.getExtension(this.data.ref.displayName);

                    return fileType === "mp4" || fileType === "mov";
                }else{
                  return false;
                }

            },

            previewEnabled: function(){
                return com.ibm.social.as.config.enablement.checkEnablement(com.ibm.social.as.config.enablement.AS_VIDEO_PREVIEW);
            },


            getAttachmentDetails: function (id, callBack, errCallback) {
                var entryUrl = this.fileEntryUrl = uu.rewrite(this.getFilesRoutes().getEntryUrl(id), {includeTags: true, rendition: "mediumview"});
                var ds = new com.ibm.social.ee.data.QCSFeedDataStore({ net: this.network });
                var bean = new com.ibm.social.ee.bean.Bean();
                bean.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
                bean.getUrlEntry = function () {
                    return entryUrl;
                };
                ds.loadItem({
                    item: bean,
                    onItem: dojo.hitch(this, callBack, ds),
                    onError: dojo.hitch(this, errCallback)
                }, {});
            },

            attachmentEntryLoaded: function (ds, item) {
                // Initialize the title of the attachment
                var titleNode = dojo.byId(this.prefix + "_attachmentTitle");
                var h1 = dojo.create("h1", { className: "lotusHeading" }, titleNode);
                var downloadUrl = ds.getValue(item, "urlDownload");
                if (!this.routes.anonymous && this.routes.oauth) {
                    downloadUrl = downloadUrl.replace("/anonymous/", "/");
                    downloadUrl = this.network.rewriteUrl(downloadUrl);
                }
                var renditionUrl = ds.getValue(item, "urlRendition");
                var fileId = ds.getValue(item, "id");
                var size = ds.getValue(item, "size");
                var tags = ds.getValue(item, "tags");
                var formattedSize = tu.formatSize(size);
                var tooltip = dojo.string.substitute(this.nls.file.download.TOOLTIP, { size: formattedSize });
                var name = ds.getValue(item, "name");
                var extension = tu.getExtension(name);
                var img = dojo.create("img", { src: dojo.config.blankGif, className: "lconn-ftype16 lconn-ftype16-" + extension, "aria-hidden": true, role: "presentation", alt: ""}, h1);

                this.addSharedExternallyWidget(titleNode);

                var a = dojo.create("a", {target: "_blank", dir: 'ltr', href: downloadUrl, title: this.nls.file.download.DOWNLOAD_ALT}, h1);
                tu.breakString(name, dojo.doc, a);
                titleNode.style.display = "";

                // Initialize the preview image if present
                if (renditionUrl) {
                    var imageNode = dojo.byId(this.prefix + "_imgPrev");
                    this.getPreviewImageLink = function () {
                        return this.network.rewriteUrl(renditionUrl);
                    };
                    this.getPreviewImageNode = function () {
                        return imageNode;
                    };
                    this.getPreviewImageData = function () {
                        var self = this;
                        return {
                            size: size,
                            downloadTooltip: self.nls.file.download_tooltip,
                            downloadLink: downloadUrl
                        };
                    };

                    this.initializePreviewImage();
                }

                // Display file metadata
                var metaDiv = dojo.byId(this.prefix + "_attachmentMeta");
                var ul = dojo.create("ul", { className: "lotusInlinelist lotusMeta" }, metaDiv);
                var li;
                if (this.data.ref.imageUrl) {
                    li = dojo.create("li", { className: "lotusFirst"}, ul);
                    var previewUrl = this.routes.getStatusUpdateEEPreviewUrl(this.context.id, this.getFilesRoutes().getImagePreviewLink(fileId, name, this.data["public"], true), this.data["public"]);
                    a = dojo.create("a", { target: "_blank", href: previewUrl, title: this.nls.file.PREVIEW.TITLE, id: this.prefix + "_previewLink"}, li);
                    a.appendChild(dojo.doc.createTextNode(this.nls.file.PREVIEW.LINK));
                    li = dojo.create("li", { }, ul);
                    a = dojo.create("a", { target: "_blank", href: downloadUrl, title: tooltip, id: this.prefix + "_downloadLink"}, li);
                    a.appendChild(dojo.doc.createTextNode(this.nls.file.download.DOWNLOAD_ALT));
                }
                else {
                    li = dojo.create("li", { className: "lotusFirst" }, ul);
                    a = dojo.create("a", { target: "_blank", href: downloadUrl, title: tooltip, id: this.prefix + "_downloadLink"}, li);
                    a.appendChild(dojo.doc.createTextNode(this.nls.file.download.DOWNLOAD_ALT));
                }
                li = dojo.create("li", { }, ul);
                var span = dojo.create("span", { }, li);
                span.appendChild(dojo.doc.createTextNode(formattedSize));
                if (tags.length > 0) {
                    var d = dojo.doc;
                    li = dojo.create("li", { }, ul);
                    var tspan = dojo.create("span", {role: "list"}, li);
                    tspan.appendChild(d.createTextNode(this.nls.file.TAGS));
                    tspan.appendChild(d.createTextNode(" "));
                    this.getTags = function () {
                        return tags;
                    };
                    this.getTagsNode = function () {
                        return tspan;
                    };
                    this.initializeTags();
                }
                metaDiv.style.display = "";
                dojo.publish("com/ibm/social/ee/data/loaded");
                this.onSizeChange();
            },
            getEntryUrl: function () {
                return this.routes.getStatusUpdateEEUrl(this.context.id, this.context.containerid, 1);
            },
            checkExists: function (scope, callback) {
                var dfdSU = new dojo.Deferred();
                var reqOptsSU = {
                    handleAs: "text",
                    url: scope.getEntryUrl(),
                    preventCache: true,
                    load: dojo.hitch(this, function (data) {
                        var jsonData = null;
                        dojo.query("textarea.data", this.domNode).forEach(function (node) {
                            jsonData = dojo.fromJson(node.value);
                        });
                        if (jsonData) {
                            dfdSU.callback();
                        }
                        else {
                            dfdSU.errback();
                        }
                    }),
                    error: function () {
                        dfdSU.errback();
                    }
                };

                var dfdFile = new dojo.Deferred();
                var reqOptsFile = {
                    handleAs: "xml",
                    url: scope.fileEntryUrl,
                    preventCache: true,
                    load: dojo.hitch(this, function (e) {
                        var bean = new com.ibm.social.ee.bean.AtomBean(e.documentElement);
                        dfdFile.callback(bean);
                    }),
                    error: function () {
                        dfdFile.errback();
                    }
                };

                scope.network.get(reqOptsSU); //check if status update still exists
                scope.network.get(reqOptsFile); //check if file still exists

                var dl = new dojo.DeferredList([dfdSU, dfdFile]);
                dl.addCallback(function (result) {
                    if (result[0][0] === true && result[1][0] === true) {
                        callback(result[1][1]); //pass atom bean
                    }
                    else if (result[0][0] === true && result[1][0] === false) {
                        callback(null, true);  //If the file is deleted, we want to show a specific error message
                    }
                    else {
                        callback(null);
                    }
                });
                dl.addErrback(function (result) {
                    callback(null);
                });
            },
            getFilesRoutes: function () {
                if (!this.filesRoutes) {
                    this.filesRoutes = new com.ibm.social.ee.data.FilesRoutes(this.getRouteOptions());
                }
                return this.filesRoutes;
            },
            getPrefix: function () {
                return this.prefix;
            }
        });

})();