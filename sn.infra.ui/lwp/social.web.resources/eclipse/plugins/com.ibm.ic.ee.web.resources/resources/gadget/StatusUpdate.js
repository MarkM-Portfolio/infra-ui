/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/on",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/config",
	"dojo/DeferredList",
	"dojo/_base/array",
	"dojo/topic",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/dom",
	"dojo/i18n!ic-as/nls/activitystream",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"dojo/json",
	"dojo/query",
	"dojo/string",
	"dojo/Deferred",
	"ic-ee/bean/Bean",
	"ic-ee/data/FilesRoutes",
	"ic-core/auth",
	"ic-as/util/hashtag/HashtagUtil",
	"ic-as/config/enablement",
	"ic-as/item/SharedExternally",
	"ic-ee/bean/AtomBean",
	"com/ibm/lconn/layout/people",
	"ic-ee/gadget/_CommentsMixin",
	"ic-ee/gadget/_ActionsToolbarMixin",
	"ic-ee/data/SURecommendationsDataStore",
	"ic-ee/data/QCSFeedDataStore",
	"ic-ee/gadget/_SimpleTabsMixin",
	"ic-ee/gadget/_PreviewVideoMixin",
	"ic-ee/gadget/_HistoryMixin",
	"ic-ee/gadget/_GadgetMessageMixin",
	"ic-ee/gadget/_PreviewImageMixin",
	"ic-ee/gadget/_RecommendationsMixin",
	"ic-ee/gadget/_SimpleEEGadget",
	"ic-ee/gadget/_TagsMixin",
	"ic-ee/util/misc",
	"ic-eeconfig/config",
	"ic-incontext/util/text",
	"ic-incontext/util/url",
	"ic-incontext/widget/MessageContainer"
	"com.ibm.social.incontext.widget.Tooltip"
], function (dojo, on, declare, lang, dojoConfig, DeferredList, array, topic, domStyle, domAttr, windowModule, domConstruct, dom, i18nactivitystream, i18nsocialEEStrings, JSON, query, string, Deferred, Bean, FilesRoutes, auth, HashtagUtil, enablement, SharedExternally, AtomBean, people, _CommentsMixin, _ActionsToolbarMixin, SURecommendationsDataStore, QCSFeedDataStore, _SimpleTabsMixin, _PreviewVideoMixin, _HistoryMixin, _GadgetMessageMixin, _PreviewImageMixin, _RecommendationsMixin, _SimpleEEGadget, _TagsMixin, misc, config, text, urlModule, MessageContainer, Tooltip) {

	/* globals com, lconn */
	
	(function () {
	
	    var g = com.ibm.social.ee.gadget;
	    var tu = text;
	    var uu = urlModule;
	
	    var StatusUpdate = declare("com.ibm.social.ee.gadget.StatusUpdate",
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
	
	            nlsAs: i18nactivitystream,
	            
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
	            			this.sharedExternally = new SharedExternally({}, dojo.byId(this.prefix + "_sharedExternally"));	
	            		}
	                }
	            },
	            
	            /**
	             * returns the action toolbar DOM node
	             */
	            getActionsToolbarNode: function () {
	                var ctnr = dom.byId(this.prefix + "_actionLinks");
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
	                    commentLikes: config.commentLikes,
	                    mentionsEnabled: config.mentionsEnabled,
	                    mentionsOpts: this.getMentionsOpts(),
	                    likeDsFactory: this.getCommentLikeDsFactory(),
	                    likeOpts: this.getCommentLikeOpts(),
	                    useDeleteIcon: true
	                };
	            },
	            getMentionsOpts: function () {
	                var communityId = this.context.communityid ? misc.getItemId(this.context.communityid) : null;
	                return {
	                    communityId: communityId,
	                    isPublic: this.data["public"]
	                };
	            },
	            getCommentsTabLinkId: function () {
	                return this.prefix + "_commentsLink";
	            },
	            getCommentsContainer: function () {
	                return dom.byId(this.prefix + "_comments");
	            },
	            getCommentLikeDsFactory: function () {
	                var commonOpts = {
	                    net: this.network,
	                    authUser: lang.clone(this.authUser)
	                };
	
	                function addCommentOpts(opts, comment, ds) {
	                    lang.mixin(opts, {
	                        url: ds.getValue(comment, "likesFeed"),
	                        recommendCount: ds.getValue(comment, "totalRecommendations"),
	                        hasRecommended: ds.getValue(comment, "hasRecommended"),
	                        retrievedRecommend: true
	                    });
	                }
	
	                return {
	                    getInlineDs: function (comment, ds) {
	                        var opts = lang.mixin({ countOnly: true }, commonOpts);
	                        addCommentOpts(opts, comment, ds);
	                        return new SURecommendationsDataStore(opts);
	                    },
	                    getPopupDs: function (comment, ds) {
	                        var opts = lang.mixin({ }, commonOpts);
	                        addCommentOpts(opts, comment, ds);
	                        return new SURecommendationsDataStore(opts);
	                    }
	                };
	            },
	            getCommentLikeOpts: function () {
	                var profilesRoutes = this.getProfilesRoutes();
	                var canComment = this.data.canComment;
	                var opts = {
	                    getUserProfileUrl: lang.hitch(profilesRoutes, profilesRoutes.getUserProfileUrl),
	                    getUserPhotoUrl: lang.hitch(profilesRoutes, profilesRoutes.getUserPhotoUrl)
	                };
	                if (!canComment) {
	                    lang.mixin(opts, { currentUserId: "" });
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
	                return dom.byId(this.prefix + "_recommendation");
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
	                return dom.byId(this.prefix + "_msgNode");
	            },
	            getMissingErrorMessage: function () {
	                return this.nls.statusUpdate.error_404;
	            },
	
	            onMissingItem: function () {
	                topic.publish("com/ibm/social/ee/event/scrollTop", '');
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
	
	
	            initializeComments: function () {
	                this.inherited(arguments);
	                var comments = this.commentsWidget;
	                comments.setFixedMaxLength(this.DEFAULT_MAX_LENGTH);
	                if ("maxCommentLength" in this.data) {
	                    comments.setFixedMaxLength(this.data.maxCommentLength);
	                }
	            },
	
	            initStatus: function () {
	                var htUtil = new HashtagUtil(),
	                    tagsArray = this.data.tags || [],
	                    communityId = this.context.communityid ? misc.getItemId(this.context.communityid) : null;
	                var statusEL = dom.byId(this.prefix + "_status");
	                statusEL.innerHTML = htUtil.linkifyHashtags(this.data.message, tagsArray, communityId);
	                
	                query("a", statusEL).forEach(function(node, index, arr){
	                	domAttr.set(node, "target", "_blank");
	                	new Tooltip({
	        				connectId: [node],
	        				label: domAttr.get(node, "title"),
	        				position: ['after', 'above', 'below', 'before']
	        			});
	                });
	                
	                tu.breakStringHTML(statusEL, 15);
	            },
	
	            initProfileImage: function () {
	                var createImage = lang.getObject("com.ibm.lconn.layout.people.createImage");
	                var link;
	                if (createImage && createImage.isImageEnabled()) {
	                    link = people.createImage(this.data.author, 60, true);
	                    domConstruct.place(link, dom.byId(this.prefix + "_userPhotoLink"), "replace");
	                    domAttr.set(link, "target", "_blank");
	                    domAttr.remove(link, "aria-describedby");
	                }
	                else {
	                    var img = dom.byId(this.prefix + "_profileImage");
	                    img.src = this.getProfilesRoutes().getUserPhotoUrl(this.data.author.id);
	                    link = dom.byId(this.prefix + "_userPhotoLink");
	                }
	                link.title = string.substitute(this.nls.file.profile_title, {user: this.data.author.name});
	                link.setAttribute("aria-label", string.substitute(this.nls.file.profile_a11y, {user: this.data.author.name}));
	                var label = link.title + " " + this.nlsAs.opensInNewWindow;
	                new Tooltip({
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
	                        execute: lang.hitch(scope, function () {
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
	                                var postBody = JSON.stringify(repostObj);
	                                var osRoutes = new com.ibm.social.ee.data.OpenSocialRoutes(scope.getRouteOptions());
	                                scope.network.postJson({
	                                    url: osRoutes.getRepostUrl(),
	                                    postData: postBody,
	                                    handleAs: "json",
	                                    requireData: true,
	                                    headers: {"Content-Type": "application/json; charset=utf-8"},
	                                    handle: lang.hitch(scope, function (response) {
	                                        var div = domConstruct.create("div");
	                                        var message = {refId: null, canClose: true, message: div, onRemove: lang.hitch(scope, function () {
	                                            domStyle.set(dom.byId(this.prefix + "_msgNode"), "display", "none");
	                                        })};
	
	                                        if (response instanceof Error) {
	                                            message.error = true;
	                                            div.appendChild(windowModule.doc.createTextNode(nls.repost.msg_generic));
	                                        } else {
	                                            message.success = true;
	                                            div.appendChild(windowModule.doc.createTextNode(nls.repost.msg_success));
	                                        }
	
	                                        if (!this.messageContainer) {
	                                            this.messageContainer = new MessageContainer({items: [message], nls: nls.MESSAGE},
	                                                dom.byId(this.prefix + "_msgNode").appendChild(windowModule.doc.createElement("div")));
	                                            this.messageContainer.onDisplayChange();
	                                            on(this.messageContainer, "DisplayChange", lang.hitch(this, "onSizeChange"));
	                                        }
	                                        else {
	                                            this.messageContainer.clear();
	                                            this.messageContainer.add(message, true);
	                                        }
	                                        domStyle.set(dom.byId(this.prefix + "_msgNode"), "display", "");
	                                        this.onSizeChange();
	                                        topic.publish("com/ibm/social/ee/event/scrollTop", '');
	                                    })
	                                });
	                            }
	                        }
	                    );
	                }
	
	                var ctnr = dom.byId(this.prefix + "_actionLinks");
	
	                array.forEach(actions, lang.hitch(this, function (action) {
	                    if (action.isVisible()) {
	                        var link = domConstruct.create("a", { href: "javascript:;", role: "button" }, domConstruct.create("li", { }, ctnr));
	                        link.appendChild(windowModule.doc.createTextNode(action.name));
	                        on(link, "click", lang.hitch(action, "execute"));
	                    }
	                }));
	            },
	            initAttachment: function () {
	                if (this.data.ref && this.data.ref.id) {
	                    var id = this.getAttachmentId(this.data);
	                    this.getAttachmentDetails(id, lang.hitch(this, this.attachmentEntryLoaded));
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
	
	                    var previewNode = dom.byId(this.prefix + "_urlPreview");
	
	                    this.createUrlPreviewNode(previewNode);
	                }
	            },
	
	            initVideoPreview: function () {
	                if(this.isVideoPlayable() && this.previewEnabled()){
	                    var authorInfoLink = null;
	
	                    var previewNode = dom.byId(this.prefix + "_urlPreview");
	                    var metaDataNode = dom.byId(this.prefix + "_attachmentMeta");
	
	                    var fileUrl =  this.data.ref ? this.data.ref.url : "";
	
	                    if(this.data.ref && this.data.ref.author){
	                        var authorInfo = this.data.ref.author;
	
	                        // if the user is external then we don't show links for user profiles
	                        var isUserExternal = auth.getUser() && auth.getUser().isExternal;
	
	                        if(!isUserExternal){
	                            var itemUtil = lang.getObject("com.ibm.social.as.util.ItemUtil");
	                            var itemUtilClass = new itemUtil();
	                            authorInfoLink = itemUtilClass.createNewsUser(authorInfo.id, authorInfo.name);
	                        }else{
	                            authorInfoLink = authorInfo.name;
	                        }
	                    }
	
	                    if (this.data.ref && this.data.ref.displayName){
	                        this.initPreviewVideo(previewNode, this.data.ref.displayName , fileUrl, fileUrl, authorInfoLink);
	                    }
	                    domConstruct.place(previewNode,metaDataNode,"before");
	                    previewNode.style.display = "";
	                }
	            },
	
	            isVideoPlayable: function(){
	
	                if (this.data.ref && this.data.ref.displayName){
	                    var fileType = text.getExtension(this.data.ref.displayName);
	
	                    return fileType === "mp4" || fileType === "mov";
	                }else{
	                  return false;
	                }
	
	            },
	
	            previewEnabled: function(){
	                return enablement.checkEnablement(enablement.AS_VIDEO_PREVIEW);
	            },
	
	
	            getAttachmentDetails: function (id, callBack, errCallback) {
	                var entryUrl = this.fileEntryUrl = uu.rewrite(this.getFilesRoutes().getEntryUrl(id), {includeTags: true, rendition: "mediumview"});
	                var ds = new QCSFeedDataStore({ net: this.network });
	                var bean = new Bean();
	                bean.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
	                bean.getUrlEntry = function () {
	                    return entryUrl;
	                };
	                ds.loadItem({
	                    item: bean,
	                    onItem: lang.hitch(this, callBack, ds),
	                    onError: lang.hitch(this, errCallback)
	                }, {});
	            },
	
	            attachmentEntryLoaded: function (ds, item) {
	                // Initialize the title of the attachment
	                var titleNode = dom.byId(this.prefix + "_attachmentTitle");
	                var h1 = domConstruct.create("h1", { className: "lotusHeading" }, titleNode);
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
	                var tooltip = string.substitute(this.nls.file.download.TOOLTIP, { size: formattedSize });
	                var name = ds.getValue(item, "name");
	                var extension = tu.getExtension(name);
	                var img = domConstruct.create("img", { src: dojoConfig.blankGif, className: "lconn-ftype16 lconn-ftype16-" + extension, "aria-hidden": true, role: "presentation", alt: ""}, h1);
	
	                this.addSharedExternallyWidget(titleNode);
	
	                var a = domConstruct.create("a", {target: "_blank", dir: 'ltr', href: downloadUrl, title: this.nls.file.download.DOWNLOAD_ALT}, h1);
	                tu.breakString(name, windowModule.doc, a);
	                titleNode.style.display = "";
	
	                // Initialize the preview image if present
	                if (renditionUrl) {
	                    var imageNode = dom.byId(this.prefix + "_imgPrev");
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
	                var metaDiv = dom.byId(this.prefix + "_attachmentMeta");
	                var ul = domConstruct.create("ul", { className: "lotusInlinelist lotusMeta" }, metaDiv);
	                var li;
	                if (this.data.ref.imageUrl) {
	                    li = domConstruct.create("li", { className: "lotusFirst"}, ul);
	                    var previewUrl = this.routes.getStatusUpdateEEPreviewUrl(this.context.id, this.getFilesRoutes().getImagePreviewLink(fileId, name, this.data["public"], true), this.data["public"]);
	                    a = domConstruct.create("a", { target: "_blank", href: previewUrl, title: this.nls.file.PREVIEW.TITLE, id: this.prefix + "_previewLink"}, li);
	                    a.appendChild(windowModule.doc.createTextNode(this.nls.file.PREVIEW.LINK));
	                    li = domConstruct.create("li", { }, ul);
	                    a = domConstruct.create("a", { target: "_blank", href: downloadUrl, title: tooltip, id: this.prefix + "_downloadLink"}, li);
	                    a.appendChild(windowModule.doc.createTextNode(this.nls.file.download.DOWNLOAD_ALT));
	                }
	                else {
	                    li = domConstruct.create("li", { className: "lotusFirst" }, ul);
	                    a = domConstruct.create("a", { target: "_blank", href: downloadUrl, title: tooltip, id: this.prefix + "_downloadLink"}, li);
	                    a.appendChild(windowModule.doc.createTextNode(this.nls.file.download.DOWNLOAD_ALT));
	                }
	                li = domConstruct.create("li", { }, ul);
	                var span = domConstruct.create("span", { }, li);
	                span.appendChild(windowModule.doc.createTextNode(formattedSize));
	                if (tags.length > 0) {
	                    var d = windowModule.doc;
	                    li = domConstruct.create("li", { }, ul);
	                    var tspan = domConstruct.create("span", {role: "list"}, li);
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
	                topic.publish("com/ibm/social/ee/data/loaded", '');
	                this.onSizeChange();
	            },
	            getEntryUrl: function () {
	                return this.routes.getStatusUpdateEEUrl(this.context.id, this.context.containerid, 1);
	            },
	            checkExists: function (scope, callback) {
	                var dfdSU = new Deferred();
	                var reqOptsSU = {
	                    handleAs: "text",
	                    url: scope.getEntryUrl(),
	                    preventCache: true,
	                    load: lang.hitch(this, function (data) {
	                        var jsonData = null;
	                        query("textarea.data", this.domNode).forEach(function (node) {
	                            jsonData = JSON.parse(node.value);
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
	
	                var dfdFile = new Deferred();
	                var reqOptsFile = {
	                    handleAs: "xml",
	                    url: scope.fileEntryUrl,
	                    preventCache: true,
	                    load: lang.hitch(this, function (e) {
	                        var bean = new AtomBean(e.documentElement);
	                        dfdFile.callback(bean);
	                    }),
	                    error: function () {
	                        dfdFile.errback();
	                    }
	                };
	
	                scope.network.get(reqOptsSU); //check if status update still exists
	                scope.network.get(reqOptsFile); //check if file still exists
	
	                var dl = new DeferredList([dfdSU, dfdFile]);
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
	                    this.filesRoutes = new FilesRoutes(this.getRouteOptions());
	                }
	                return this.filesRoutes;
	            },
	            getPrefix: function () {
	                return this.prefix;
	            }
	        });
	
	})();
	return StatusUpdate;
});
