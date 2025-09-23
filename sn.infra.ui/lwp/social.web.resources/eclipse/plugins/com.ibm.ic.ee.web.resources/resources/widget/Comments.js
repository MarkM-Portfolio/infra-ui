/* Copyright IBM Corp. 2007, 2017  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/_base/dojoConfig",
	"dojo/dom-construct",
	"dojo/_base/declare",
	"dojo/dom-attr",
	"dojo/aspect",
	"dojo/date/stamp",
	"dojo/dom-class",
	"dojo/fx/easing",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"dojo/i18n!ic-core/lcTextArea/widgets/nls/ExpandingTextBox",
	"dojo/i18n!ic-as/nls/activitystream",
	"dojo/html",
	"dojo/has",
	"dojo/fx",
	"dojo/i18n!ic-ublog/nls/Mentions",
	"dojo/i18n!ic-ublog/nls/MentionsExtra",
	"dojo/on",
	"dojo/query",
	"dojo/string",
	"dojo/text!ic-ee/widget/templates/Comments.html",
	"dojo/topic",
	"dijit/_Widget",
	"dijit/_Templated",
	"dijit/focus",
	"dijit/registry",
	"dojo/Deferred",
	"dojox/html/entities",
	"ic-ee/util/ContentManipulation",
	"ic-as/util/hashtag/HashTagParser",
	"ic-as/util/hashtag/HashtagUtil",
	"ic-as/item/comment/SharedExternallyComments",
	"ic-core/auth",
	"ic-incontext/widget/MessageContainer",
	"ic-core/ext/timeago/Timeago",
	"net/jazz/ajax/xdloader",
	"ic-core/util/text",
	"ic-core/globalization/bidiUtil",
	"ic-ee/util/validation",
    "ic-ee/data/ShowMoreDataStore",
    "ic-ee/widget/MentionsCkeTextArea",
	"ic-ee/data/ProfilesRoutes",
	"ic-ee/bean/PermissionsBean",
	"ic-ee/action/FlagItem",
	"ic-ee/config",
	"ic-ee/widget/Recommendation",
	"ic-ee/widget/TextArea",
	"ic-incontext/util/DateFormat",
	"ic-incontext/util/atom",
	"ic-incontext/util/html",
	"ic-incontext/util/text",
	"ic-incontext/util/uri",
	"ic-news/microblogging/sharebox/data/MentionsDataFormatter",
	"ic-core/config/features",
	"ic-incontext/widget/Tooltip",
	"ic-core/globalization/bidiUtil"
], function (dojo, array, lang, windowModule, dojoConfig, domConstruct, declare, domAttr, aspect, stamp, domClass, easingModule, i18nsocialEEStrings, i18nExpandingTextBox, i18nactivitystream, htmlDojo, has, fx, i18nMentions, i18nMentionsExtra, on, queryModule, stringModule, template, topic, _Widget, _Templated, focusUtils, registry, Deferred, entities, ContentManipulation, HashTagParser, HashtagUtil, SharedExternallyComments, auth, MessageContainer, Timeago, xdloader, coreUtilText, bidiUtil, validation, ShowMoreDataStore, MentionsCkeTextArea, ProfilesRoutes, PermissionsBean, FlagItem, config, Recommendation, TextArea, DateFormat, atom, html, textModule, uri, MentionsDataFormatter, has, Tooltip, bidi) {

	/* globals com, djConfig, lconn, net */
	
	(function () {
	    var util = com.ibm.social.incontext.util;
	    var profileRoutes = new ProfilesRoutes();
	    var Comments = declare("com.ibm.social.ee.widget.Comments", [_Widget, _Templated], {
	        templateString: template,
	        commentIdParam: "commentId",
	        commentsLength: 51200,
	        ckeRowHeight: 1.3,
	        mimeType: "text/plain",
	        postModerationEnabled: false,
	        authUser: null,
	        fileOwner: null,
	        showVersion: true,
	        commentCount: 0,
	        currVersion: 1,
	        defaultPageSize: 50,
	        initialPageSize: 5,
	        startIndex: 0,
	        isDraft: false,
	        loading: null,
	        _moreDs: null,
	        allowNewComments: true,
	        category: "comment",
	        commentModified: false,
	        textAreaConnection: null,
	        _asStrings: i18nactivitystream,
	        _strings: i18nsocialEEStrings.COMMENTS,
	        _stringsMsg: i18nsocialEEStrings.MESSAGE,
	        _stringsSubmitted: i18nsocialEEStrings.COMMENTS_SUBMITTED,
	        _stringsCommon: i18nsocialEEStrings.common,
	        _stringsFile: i18nsocialEEStrings.file,
	        htmlComments: false,
	        linkifyComment: false,
	        linkifyMentions: false,
	        plainTextMentions: false,
	        htmlEncoded: false,
	        SHORT_COMMENT_LENGTH: 255,
	        countAvailable: true,
	        commentLikes: false,
	        mentionsEnabled: false,
	        userIconSize: 32,
	        mentionsDataFormatter: null,
	        useDeleteIcon: false,
	        isExternal: false,
	        escapeHTMLBeforePosting: false,
	        hashTagParser: new HashTagParser(),
	        hashtagUtil: new HashtagUtil(),
	        sendDocTitle: true,
	        postMixInProperties: function () {
	            this.inherited(arguments);
	            var dsConstructor = lang.getObject(this.dsConstructor);
	            var dsOpts = this.dsOpts || {};
	            dsOpts.url = util.uri.rewriteUri(this.url, {});
	            dsOpts.net = this.net;
	            var ds = new dsConstructor(dsOpts);
	            var opts = {
	                ds: ds,
	                dateAttr: "published",
	                idAttr: "id",
	                countAvailable: this.countAvailable
	            };
	            this._moreDs = new ShowMoreDataStore(opts);
	
	            if (this.htmlComments) {
	                this.mimeType = "html";
	            }
	        },
	        postCreate: function () {
	
	            this._showLoading();
	            this.inherited(arguments);
	            this.permissions = new PermissionsBean({
	                owner: false,
	                authenticatedId: this.authUser
	            });
	            var scope = this;
	
	            this.own(aspect.after(this, "handleCreate", lang.hitch(this,"onDisplayChange"), true));
	            this.own(aspect.after(this, "handleEdit", lang.hitch(this,"onDisplayChange"), true));
	            this.own(aspect.after(this, "updateItem", lang.hitch(this,"onDisplayChange"), true));
	            this.own(aspect.after(this, "hideActions", lang.hitch(this,"onDisplayChange"), true));
	            this.own(aspect.after(this, "showActions", lang.hitch(this,"onDisplayChange"), true));
	            this.own(aspect.after(this, "_showCommentsUI", lang.hitch(this,"onDisplayChange"), true));
	            this.own(aspect.after(this, "showInlineCommentError", lang.hitch(this,"onDisplayChange"), true));
	            this.own(aspect.after(this, "removeInlineCommentError", lang.hitch(this,"onDisplayChange"), true));
	            this.own(aspect.after(this, "_getCommentItems", lang.hitch(this,"onDisplayChange"), true));
	            this.own(on(this, "CommentsDisplayed", lang.hitch(this,"onDisplayChange")));
	
	            // add the shared externally comments block
	            if (this.isExternal) {
	                this.sharedExternallyComments = new SharedExternallyComments({toShow: false}, this.sharedExternallyComments);
	            }
	
	            this.textAreaDfd = new Deferred();
	            this._getCommentItems(true);
	            if (this.commentCount === 0) {
	                this._showEmptyMsg();
	            }
	
	            var opts;
	
	            if (!has("ckeditor-lite-mentions-ee") && this.mentionsEnabled) {
	                var self = this;
	
	                opts = {
	                    textAreaOpts: {
	                        baseClass: "lotusText eeTextArea",
	                        name: "description"
	                    },
	                    shadowText: this._strings.PLACEHOLDER_TXT,
	                    id: this.id + "addCommentBody",
	                    mentionsEnabled: this.mentionsEnabled,
	                    mentionsOpts: this.mentionsOpts,
	                    network: this.net,
	                    onFocus: function () {
	                        if (self.isExternal) {
	                            self.sharedExternallyComments.show();
	                        }
	                        // Connect textarea to scrollToBottom
	                        if (!scope.textAreaConnection) {
	                            scope.textAreaConnection = scope.connect(this, "onHeightChanged", "scrollToBottom");
	                        }
	                        scope.actionBtns.style.top = "0";
	                        this.onHeightChanged();
	                    },
	                    disablePostAction: lang.hitch(this, function () {
	                        this.disableSubmit(this.addCommentNode);
	                    }),
	                    enablePostAction: lang.hitch(this, function () {
	                        this.enableSubmit(this.addCommentNode);
	                    }),
	                    mentionsWarningPlaceholder: this.atMentionsMessages
	                };
	
	                lang.mixin(opts, {
	                    reachedCharLimitCallback: lang.hitch(this, function (flag) {
	                        if (flag) {
	                            this.disableSubmit(this.addCommentNode);
	                        }
	                        else {
	                            this.enableSubmit(this.addCommentNode);
	                        }
	                    }),
	                    charRemainingDisplay: this.commentCountdownContainer
	                });
	
	                var parentDiv = this.textCtnr.parentNode;
	                domClass.remove(parentDiv, "lotusFieldEmphasis");
	                html.showLoading(this.textCtnr);
	
	                xdloader.load_async("com.ibm.social.ee.widget.MentionsTextArea", lang.hitch(this, function () {
	                    this.newCmtTxtArea = new com.ibm.social.ee.widget.MentionsTextArea(opts, this.textCtnr);
	                    domClass.add(parentDiv, "lotusFieldEmphasis");
	                    var ta = queryModule("textarea", this.newCmtTxtArea.domNode)[0];
	                    if (ta) {
	                        ta.style.overflowX = "hidden"; //needs to be set after this.newCmtTxtArea is created, doesn't work if you pass this in the opt as the style param
	                    }
	                    this.own(on(this.newCmtTxtArea, "Change", lang.hitch(this,"checkIfModified")));
	                    this.own(on(this.newCmtTxtArea, "HeightChanged", lang.hitch(this,"onDisplayChange")));
	                    // Bidi support
	                    bidiUtil.enforceTextDirectionOnPage(this.addCommentNode);
	                    this.newCmtTxtArea.startup();
	                    this.textAreaDfd.callback();
	
	                    //aria-live makes JAWS read the comment box when it opens up, which is wrong. this removes aria-live
	                    this.newCmtTxtArea.turnOffAriaLiveRegion();
	
	                    this.mentionsDataFormatter = new MentionsDataFormatter(this.plainTextMentions);
	                }));
	            } else if (has("ckeditor-lite-mentions-ee") && this.mentionsEnabled) {
	                var options = {
                        isEE: true,
                        useRTE: true,
                        textBoxRows: this.ckeRowHeight,
                        title: this._strings.PLACEHOLDER_TXT,
                        network: this.net,
                        disableURLPreview: true,
                        mentionsOpts: this.mentionsOpts,
                        mentionsWarningPlaceholder: this.atMentionsMessages,
                        charRemainingDisplay: this.commentCountdownContainer,
                        shadowText: this._strings.PLACEHOLDER_TXT,
                        onLoadCallback: dojo.hitch(this, "onDisplayChange"),
                        onFocusCallback: dojo.hitch(this, "textAreaFocused"),
                        textPopulatedCallback: dojo.hitch(this, "_processTextPopulatation"),
                        reachedCharLimitCallback: dojo.hitch(this, "_processTextPopulatation"),
                        disablePostAction: dojo.hitch(this, function () {
                            this.disableSubmit(this.addCommentNode);
                        }),
                        enablePostAction: dojo.hitch(this, function () {
                            this.enableSubmit(this.addCommentNode);
                        })
	                };

	                this.newCmtTxtArea = new com.ibm.social.ee.widget.MentionsCkeTextArea(options, this.textCtnr);
	                this.connect(this.newCmtTxtArea, "onHeightChanged", "onDisplayChange");
	                dojo.subscribe("lconn/core/basictextbox/resized", dojo.hitch(this, function(){this.newCmtTxtArea.onHeightChanged();}));
	                this.mentionsDataFormatter = new lconn.news.microblogging.sharebox.data.MentionsDataFormatter(this.plainTextMentions);

	            } else {
	                opts = {
	                    value: this._strings.PLACEHOLDER_TXT,
	                    id: this.id + "addCommentBody"
	                };
	
	                this.newCmtTxtArea = new TextArea(opts, this.textCtnr);
	                this.own(on(this.newCmtTxtArea, "Focus", lang.hitch(this,"textAreaFocused")));
	                this.own(on(this.newCmtTxtArea, "Change", lang.hitch(this,"checkIfModified")));
	                this.own(on(this.newCmtTxtArea, "HeightChanged", lang.hitch(this,"onDisplayChange")));
	                this.own(on(this.newCmtTxtArea, "Blur", lang.hitch(this,"onDisplayChange")));
	                var ta = queryModule("textarea", this.newCmtTxtArea.domNode)[0];
	                if (ta) {
	                    domClass.add(ta, "bidiAware");
	                }
	                this.textAreaDfd.callback();
	            }
	        },
	        
	        _processTextPopulatation: function() {        
	            this._calculateRemainingCharacters();       
	            this._processRemainingCharacters();
	        },
	        
	        _calculateRemainingCharacters: function() {
	            var commentLength = lconn.core.util.text.length(dojo.string.trim(this.newCmtTxtArea.getText()));
	            var remainingChars = this.newCmtTxtArea.maxLength - commentLength;
	            
	            this._remainingChars = remainingChars;       
	        },
	        
	        _processRemainingCharacters: function() {
	            if (this._remainingChars >= 0 && this._remainingChars != this.newCmtTxtArea.maxLength) {
	                this.enableSubmit()
	                this._updateListener(true);
	            } else {
	                this.disableSubmit();
	                if (this._remainingChars === this.newCmtTxtArea.maxLength) {
	                    this._updateListener(false);
	                }
	            }
	        },
	        
	        textAreaFocused: function () {
	
	            if (this.isExternal) {
	                this.sharedExternallyComments.show();
	            }
	
	            // Connect textarea to scrollToBottom
	            if (!this.textAreaConnection) {
	                this.textAreaConnection = this.own(on(this.newCmtTxtArea, "HeightChanged", lang.hitch(this,"scrollToBottom")));
	            }
	            if (this.newCmtTxtArea.getText() === "") {
	                this.actionBtns.style.top = "0";
	            }
	            this.newCmtTxtArea.onHeightChanged();
	            this._processTextPopulatation();
	
	        },
	        checkIfModified: function () {
	            window.setTimeout(lang.hitch(this, function () {
	                // check if the new comment situation changed and notify the gadget
	                if (this.commentModified === (this.newCmtTxtArea.getText() === "")) {
	                    this._updateListener(!this.commentModified);
	                }
	
	                // for ECM CCM gadget
	                if (has("ie") && !this.mentionsEnabled) {
	                    this.onDisplayChange();
	                    this.scrollToBottom();
	                }
	            }), 0);
	        },
	        setFixedMaxLength: function (maxLength) {
	            this.textAreaDfd.addCallback(lang.hitch(this, function () {
	                this.newCmtTxtArea.maxLength = maxLength;
	            }));
	        },

	        // Controls if the Confirm Close Dialog is displayed
	        _updateListener: function (commentModified) {
	            this.commentModified = commentModified;
	            topic.publish("com/ibm/social/ee/event/modified", {modified: commentModified});
	        },
	        _getCommentItems: function (isInitial, postFunc) {
	            /* What do I actually need to pass? Need to pass in updated count, sort, and start values */
	            this._moreDs.fetch({
	                start: this.startIndex,
	                count: this._getFetchCount(isInitial),
	                query: {uuid: this.uuid},
	                sort: [
	                    {attribute: "published", descending: true}
	                ],
	                onComplete: lang.hitch(this, function (items, request) {
	                    if (postFunc) {
	                        postFunc();
	                    }
	                    if (this.authUser.id && this.allowNewComments && !this.isDraft) {
	                        this.cmtList.style.display = "";
	                        this.addCommentCtnr.style.display = "";
	                    }
	                    if (items && items.length > 0) {
	                        this._showCommentsUI(items, request.hasMore, isInitial);
	                    }
	                    else {
	                        this._doNothing();
	                    }
	                    this.onDisplayChange();
	                }),
	                onError: lang.hitch(this, function (errorData, request) {
	                    if (postFunc) {
	                        postFunc();
	                    }
	                    this._showPagingErrorMsg(isInitial, errorData);  //TODO, make this more general?
	                })
	            });
	        },
	        _getFetchCount: function (isInitial) {
	            return isInitial ? this.initialPageSize : this.defaultPageSize;
	        },
	        /**
	         * Linkifies the content of the Comment object passed in
	         *
	         * @param comment Comment Object to be altered
	         * @returns Altered Comment object
	         */
	        _linkifyCommentForHashtags: function (comment) {
	            comment.communityId = this.params.mentionsOpts ? this.params.mentionsOpts.communityId : null;
	
	            // the EE requests comments for display in two different ways
	            // initial EE display vs realtime update to display
	            // this if else is due to the difference in the objects returned from these requests
	            if (comment.contents) {
	                comment.contents = this.hashtagUtil.linkifyHashtags(comment.contents, comment.tags, comment.communityId);
	            } else {
	                comment.tags = this.hashTagParser.getTagsArray(comment.tags);
	                comment.content = this.hashtagUtil.linkifyHashtags(comment.content, comment.tags, comment.communityId);
	            }
	
	            return comment;
	        },
	        /**
	         * @returns string, the aria label
	         * @protected
	         */
	        _getCommentAriaLabelSameDay: function(){
	            return this._asStrings.commentAriaLabelSameDay;
	        },
	        /**
	         * @returns string, the aria label
	         * @protected
	         */
	        _getCommentAriaLabelOtherDay: function(){
	            return this._asStrings.commentAriaLabel;
	        },
	        /**
	         *
	         * @param {string} sameDay, whether it should use the sameday pattern
	         * @returns {string} the aria-label
	         * @protected
	         */
	        _getCommentAriaLabel: function(/* boolean */ sameDay){
	            if (sameDay){
	                return this._getCommentAriaLabelSameDay();
	            } else {
	                return this._getCommentAriaLabelOtherDay();
	            }
	        },
	        _createCommentUItem: function (comment, li, isNew, isEdit, isInitial) {
	            comment = this._linkifyCommentForHashtags(comment);
	            var string, spanMeta, span, link, h4, format, self = this, d = windowModule.doc;
	            var ds = this._moreDs;
	            var canDelete = ds.getValue(comment, "permissions").Delete;
	            var canEdit = ds.getValue(comment, "permissions").Edit;
	            var isUserComment = (this.authUser && ds.getValue(comment, "author").id === this.authUser.id);
	            var isFileOwner = (this.authUser && this.fileOwner && this.fileOwner.id === this.authUser.id);
	            var isDeleted = ds.getValue(comment, "deleted");
	            var modStatus = ds.getValue(comment, "moderationStatus");
	            var divDetails = null;
	            if (modStatus) {
	                modStatus = modStatus.toLowerCase();
	            }
	            var ul = this.cmtList;
	            //li will only exist if we are editing a comment
	            if (!li) {
	                li = domConstruct.create("li", {className: "lotusCommentItem", role: "article", tabindex: "0"}, ul);
	            }
	            var div = domConstruct.create("div", {className: "lotusPost eeComment"}, li);
	            var anchor = domConstruct.create("a", {className: "lotusHidden"}, div);
	            anchor.name = anchor.id = "comment-" + ds.getValue(comment, "id");
	
	            var u = ds.getValue(comment, "author");
	            var divAuthor, divAvatar, divContent, divMeta;
	
	            if ((modStatus === "quarantined") && !ds.getValue(comment, "stateChangedBy") && this._strings.MODERATION_QUARANTINED) {
	                divContent = domConstruct.create("div", null, div);
	                spanMeta = domConstruct.create("span", {className: "lotusMeta"}, divContent);
	                spanMeta.appendChild(d.createTextNode(this._strings.MODERATION_QUARANTINED));
	            } else if ((modStatus === "rejected") && !this.displayRejectedStateChangedBy()) {
	                divContent = this.addRejectedDivContentNoPersonRef(div);
	            } else {
	
	                divAuthor = domConstruct.create("div", {className: "lotusPostAuthorInfo"}, div);
	                divAvatar = domConstruct.create("div", {className: "lotusPostAvatar"}, divAuthor);
	                divContent = null;
	                if (modStatus === "pending") {
	                    if (this.generateUserImage) {
	                        this.generateUserImage(u, divAvatar, this.userIconSize, this.userIconSize, null, {imagePop: false, title: this._strings.PROFILE_TITLE, generateLink: false});
	                    }
	                    divContent = domConstruct.create("div", null, div);
	                    spanMeta = domConstruct.create("span", {className: "lotusMeta"}, divContent);
	                    spanMeta.appendChild(d.createTextNode(this._strings.MODERATION_PENDING));
	                }
	                else if ((modStatus === "quarantined") || (modStatus === "rejected")) {
	                    if (this.generateUserImage) {
	                        this.generateUserImage(u, divAvatar, this.userIconSize, this.userIconSize, null, {imagePop: false, title: this._strings.PROFILE_TITLE, generateLink: false});
	                    }
	                    divContent = domConstruct.create("div", null, div);
	                    spanMeta = domConstruct.create("span", {className: "lotusMeta"}, divContent);
	                    //span.className = "lotusLeft";
	                    format = new util.DateFormat(ds.getValue(comment, "stateChangedDate"));
	                    string = format.formatByAge((modStatus === "quarantined") ? this._strings.MODERATION_REMOVED : this._strings.MODERATION_REJECTED);
                        string = bidi.numShapeStr(string);
	                    util.html.substitute(d, spanMeta, string, {
	                        user: function () {
	                            var u = ds.getValue(comment, "stateChangedBy");
	                            var div = d.createElement("span");
	                            div.appendChild(d.createTextNode(u.name));
	                            if (self.generateLinkToPerson) {
	                                self.generateLinkToPerson(u, div);
	                            }
	                            return div;
	                        },
	                        timestamp: function () {
	                            return d.createTextNode(new util.DateFormat(ds.getValue(comment, "stateChangedDate")).formatByAge(self._strings.COMMENT_CREATED_TIME));
	                        }
	                    });
	                }
	                else {
	                    if (this.generateUserImage) {
	                        this.generateUserImage(u, divAvatar, this.userIconSize, this.userIconSize, null, {imagePop: false, title: this._strings.PROFILE_TITLE, generateLink: false});
	                    }
	                    var id = registry.getUniqueId("eeComment");
	                    divContent = domConstruct.create("div", {className: "lotusPostContent"}, div);
	                    divMeta = domConstruct.create("div", {className: "lotusMeta", id: id}, divContent);
	                    if (!isDeleted) {
	
	                        if (this.showTitles) {
	                            h4 = domConstruct.create("h4", null, divMeta);
	                            h4.appendChild(d.createTextNode(ds.getValue(comment, "title")));
	                        }
	
	                        var metaList = domConstruct.create("ul", { className: "lotusInlinelist" }, divMeta);
	                        var metaItem = domConstruct.create("li", { className: "lotusFirst"}, metaList);
	                        var authorSpan = domConstruct.create("span", { className: "vcard" }, metaItem);
	                        util.text.breakString(u.name, d, authorSpan);
	
	                        // if the user is external then we don't show links for user profiles
	                        var isUserExternal = auth.getUser() && auth.getUser().isExternal;
	
	                        if (self.generateLinkToPerson && !isUserExternal){
	                            self.generateLinkToPerson(u, authorSpan);
	                        }
	                        metaItem = domConstruct.create("li", { className: "lotusFirst" }, metaList);
	                        var wasEdited = false;
	                        if (dojo.date.difference(ds.getValue(comment, "published"), ds.getValue(comment, "updated"), "second") > 1) {
	                            wasEdited = true;
	                        }
	                        var titleStr;
	                        if ((this.showVersion) && (parseInt(this.currVersion) !== ds.getValue(comment, "versionLabel"))) {
	                            titleStr = wasEdited ? this._strings.COMMENT_EDITED : this._strings.COMMENT_CREATED;
	                        }
	                        else {
	                            titleStr = wasEdited ? this._strings.COMMENT_EDITED_NOVERSION : this._strings.COMMENT_CREATED_TIME;
	                        }
	                        var ts = wasEdited ? ds.getValue(comment, "updated") : ds.getValue(comment, "published");
	
	                        var dateFormat = new util.DateFormat(ts);
	                        titleStr = dateFormat.formatByAge(titleStr);
	                        var timestampStr = new util.DateFormat(ts).formatByAge(self._strings.COMMENT_CREATED_TIME);
	                        var params = {
	                            user: u.name,
	                            timestamp: timestampStr,
	                            version: ds.getValue(comment, "versionLabel")
	                        };
	                        var timeTitle = stringModule.substitute(titleStr, params);
	                        var abbr = domConstruct.create("abbr", { title: stamp.toISOString(ts), className: "timeNode" }, metaItem);
	                        htmlDojo.set(abbr, timeTitle);
	                        var timeAgo = new Timeago({}, abbr);
	                        timeAgo.domNode.title = timeTitle;
	
	                        // Set the aria label on the comment to a string relevant to the date format.
	                        // The aria label should also have the seconds in time to enforce unique labels
	                        var ariaTimeFn = function(date, nls) {
	                            return dojo.date.locale.format(this.dt, {selector:'time', timePattern: 'hh:mm:ss a', locale: djConfig.locale });
	                        };
	                        var parameters = {time: ariaTimeFn};
	                        var ariaDateFormat = new util.DateFormat(ts, parameters);
	                        var ariaTimestampStr = ariaDateFormat.formatByAge(self._strings.COMMENT_CREATED_TIME);
	                        var sameDay = ariaTimestampStr.match(/^\d{1,2}:\d\d/);
	                        var ariaString = this._getCommentAriaLabel(sameDay);
	
	                        var commentAriaLabel = stringModule.substitute(ariaString, [u.name, ariaTimestampStr]);
	                        //aria-label
	                        li.setAttribute("aria-label", commentAriaLabel);
	                    }
	                    else {
	                        if (this.showTitles) {
	                            h4 = domConstruct.create("h4", null, divMeta);
	                            h4.appendChild(d.createTextNode(ds.getValue(comment, "title")));
	                        }
	
	                        var newSpan = domConstruct.create("span", {}, divMeta);
	                        var newString = new util.DateFormat(ds.getValue(comment, "updated")).formatByAge(this._strings.COMMENT_DELETED);
	
	                        util.html.substitute(d, newSpan, newString, {
	                            user: function () {
	                                var u = ds.getValue(comment, "modifier");
	                                var div = d.createElement("span");
	                                div.appendChild(d.createTextNode(u.name));
	                                if (self.generateLinkToPerson) {
	                                    self.generateLinkToPerson(u, div);
	                                }
	                                return div;
	                            }
	                        });
	                    }
	                    this.commentMetaRendered(ds, comment, divMeta, isDeleted);
	                    divDetails = domConstruct.create("div", {className: "lotusPostDetails eeCommentContent"}, divContent);
	                    var contents = ds.getValue(comment, "contents");
	                    if (this.plainTextMentions) {
	                       contents = dojox.html.entities.encode(contents);
	                    }
	                    divDetails.commentBody = contents;
	                    var p = domConstruct.create("p", { }, divDetails);
	                    p.className = "bidiAware";
	                    this.initAttachment(comment, divContent);
	                    this.setCommentContent(isDeleted, divDetails, p, contents, ds, comment);
	                }
	            }
	
	            var moderated = (modStatus === "quarantined" || modStatus === "rejected" || modStatus === "pending");
	            if (this.commentLikes && this.likeDsFactory && !moderated) {
	                var thisWidget = this;
	                var likeDs = this.likeDsFactory.getInlineDs(comment, ds);
	                var commentLikeOpts = {
	                    currentUserId: this.authUser.id,
	                    dataStore: likeDs,
	                    popupDataStore: this.likeDsFactory.getPopupDs(comment, ds),
	                    displayNameAttr: "name",
	                    userIdAttr: "id",
	                    mailAttr: "email",
	                    strings: { },
	                    _blankGif: dojoConfig.blankGif,
	                    onSizeChange: function (height) {
	                        thisWidget.onDisplayChange(height);
	                    },
	                    onErrorMessage: lang.hitch(this, this.onLikeError, comment)
	                };
	                if (this.likeOpts) {
	                    lang.mixin(commentLikeOpts, this.likeOpts);
	                }
	                var cannotLike = commentLikeOpts.currentUserId ? false : true;
	
	                //deleted items should not get the like option
	                if (isDeleted) {
	                    cannotLike = true;
	                }
	
	                var likeCount;
	                var dfd = new Deferred();
	                likeDs.fetch({ onBegin: function (count) {
	                    likeCount = count;
	                    dfd.callback();
	                }  });
	                dfd.addCallback(function () {
	                    if (likeCount > 0 || !cannotLike) {
	                        var likeDiv;
	                        if (divMeta.firstChild && divMeta.firstChild.tagName && divMeta.firstChild.tagName.toLowerCase() === "ul") {
	                            var likeParent = domConstruct.create("li", {}, divMeta.firstChild);
	                            likeDiv = domConstruct.create("div", { className: "lotusCommentLike"}, likeParent);
	                        }
	                        else {
	                            likeDiv = domConstruct.create("div", { className: "lotusChunk lotusCommentLike" }, divMeta, "after");
	                        }
	                        new Recommendation(commentLikeOpts, likeDiv);
	                    }
	                });
	            }
	
	            if (this.useDeleteIcon && canDelete) {
	                var deleteLink = domConstruct.create("a", { className: "lotusDelete keepFocus", href: "javascript:;", title: this._strings.DELETE, alt: this._strings.DELETE}, divContent);	              
	                deleteLink.setAttribute("role", "button");	              
	                deleteLink.setAttribute("label", this._strings.DELETE);
	                on(deleteLink, "focus", lang.hitch(this, this._forceVisibleActions, div));
	                domConstruct.create("img", { src: dojoConfig.blankGif, alt: "" }, deleteLink);
	                domConstruct.create("span", { className: "lotusAltText", innerHTML: "X"}, deleteLink);
	                on(deleteLink, "click", lang.hitch(this, lang.hitch(this, this.deleteComment, comment)));
	            }
	
	            var divActions = this._createActionsDiv(divContent);
	            divActions.style.display = "none";
	            var divFlagItem = domConstruct.create("div", null, divContent);
	            ul = domConstruct.create("ul", {className: "lotusInlinelist lotusActions"}, divActions);
	            comment.element = div;
	            //this._toggleEditBtns(div, true);
	            this.own(on(div, "mouseenter", lang.hitch(this, "_toggleEditBtns", div, true)));
	            this.own(on(div, "mouseleave", lang.hitch(this, "_toggleEditBtns", div, false)));
	            this.renderActionLinks(ds, divActions, ul, d, comment, divDetails, divContent, canEdit, canDelete, isUserComment, isFileOwner, isDeleted, divFlagItem, li);
	            if (ul.hasChildNodes()) {
	                divActions.style.display = "";
	            }
	            else {
	                domConstruct.empty(divActions); //we can't have an empty ul for a11y
	            }
	
	            if (!isEdit && !isInitial && isNew) {
	                this.commentCount++;
	                this.onCountChange(this.commentCount);
	            }
	            this._placeCommentNode(li, isNew, isEdit);
	            on(div, "focus", lang.hitch(this, this._forceVisibleActions, div));
	            bidiUtil.enforceTextDirectionOnPage(this.domNode);
	            return li;
	        },
	        onLikeError: function (comment, e, error, strMsg) {
	            this.showInlineCommentError(comment, strMsg || this._stringsCommon.like_error);
	        },
	        displayRejectedStateChangedBy: function () {
	            return true;
	        },
	        addRejectedDivContentNoPersonRef: function (parentDiv) {
	            return parentDiv;
	        },
	        _createActionsDiv: function (divContent) {
	            return domConstruct.create("div", {className: "lotusPostMore"}, divContent);
	        },
	        _placeCommentNode: function (li, isNew, isEdit) {
	            if (isNew) {
	                var afterNode = this.sharedExternallyComments && this.sharedExternallyComments.domNode ? this.sharedExternallyComments.domNode : this.addCommentCtnr;
	                domConstruct.place(li, afterNode, "before");
	            }
	            else if (!isEdit) {
	                var node;
	                if (this.commentContainer) {
	                    domConstruct.place(li, this.commentContainer, "first");
	                }
	                else {
	                    node = (this.showMoreLink.style.display === "") ? this.showMoreLink : this.addCommentLink;
	                    domConstruct.place(li, node, "after");
	                }
	            }
	        },
	        _focusNewCmt: function () {
	            this._forceVisibleActions(this.addCmtNode);
	        },
	        _forceVisibleActions: function (div) {
	
	            /* used for keyboard accessibility */
	            var scope = this;
	            var allLinks = queryModule("a", this.cmtList);

	            var cmts = queryModule("div.eeComment", this.cmtList);
	            array.forEach(cmts, function (cmt) {
	                scope._toggleEditBtns(cmt, false);
	            });
	            //now show the links (and add them to the tab index) for the container that has focus
	            var divLinks = queryModule("a", div);
	            array.forEach(divLinks, function (link) {
	                link.setAttribute("tabIndex", "0");
	                scope._toggleEditBtns(div, true);
	            });
	        },
	        performLinkifyMentions: function (contents) {
	
	            var self = this;
	
	            var div = domConstruct.create("div", { innerHTML: contents});
	
	            queryModule(".vcard", div).forEach(function (node, index, arr) {
	
	                var fn = queryModule(".fn", node)[0];
	
	                var xLconnUserId = queryModule(".x-lconn-userid", node)[0];
	
	                if (fn && xLconnUserId) {
	
	                    var userName = fn.innerHTML;
	                    var userId = xLconnUserId.innerHTML;
	
	                    var person = {};
	                    person.userid = userId;
	                    person.name = userName;
	                    var wrapperDiv = domConstruct.create("div");
	                    self.generateLinkToPerson(person, wrapperDiv);
	                    var link = queryModule("a", wrapperDiv)[0];
	                    domConstruct.place(link, node, "after");
	                    var spanNode = lang.clone(xLconnUserId);
	                    dojo.setStyle(spanNode, "display", "none");
	                    domConstruct.place(spanNode, link, "after");
	
	                    domConstruct.destroy(node);
	                }
	            });
	
	            var result = div.innerHTML;
	            return result;
	        },
	        setCommentContent: function (isDeleted, divDetails, p, contents, ds, comment) {
	            var d = windowModule.doc;
	
	            var originalContents = contents;
	
	            if (this.htmlEncoded) {
	                contents = entities.decode(contents);
	            }
	            
	            if (this.plainTextMentions) {
	               contents = coreUtilText.htmlify(contents);
	            }
	
	            if (this.linkifyMentions) {
	                contents = this.performLinkifyMentions(contents);
	            }
	
	            if (this.htmlComments) {
	                p.innerHTML = contents;
	                util.text.breakStringHTML(p);
	                queryModule("a", p).attr("target", "_blank");
	            }
	            else if (this.htmlCommentsSummary) {
	                this.setCommentContentSummary(originalContents, p);
	            }
	            else if (this.linkifyComment) {
	                util.html.createTextNode(d, p, contents);
	            }
	            else {
	                util.text.breakString(contents, d, p);
	            }
	        },
	        setCommentContentSummary: function (contents, p, length) {
	
	            var plainTxt = ContentManipulation.generate_summary(contents, length || -1);
	            domConstruct.empty(p);
	
	            if (this.htmlEncoded) {
	                plainTxt = entities.decode(plainTxt);
	            }
	
	            if (this.linkifyMentions) {
	                plainTxt = this.performLinkifyMentions(plainTxt);
	            }
	
	            p.innerHTML = plainTxt;
	            util.text.breakStringHTML(p);
	        },
	        _toggleEditBtns: function (div, display) {
	            if (display) {
	                domClass.add(div, "lotusPostHover");
	            }
	            else {
	                domClass.remove(div, "lotusPostHover");
	            }
	        },
	        renderActionLinks: function (ds, divActions, ul, d, comment, divDetails, divContent, canEdit, canDelete, isUserComment, isFileOwner, isDeleted, divFlagItem) {
	            var li, fc, a, modStatus = ds.getValue(comment, "moderationStatus");
	            if (modStatus) {
	                modStatus = modStatus.toLowerCase();
	            }
	            if ((modStatus === "pending") || (modStatus === "quarantined") || (modStatus === "rejected")) {
	                return;
	            }
	            if (!isDeleted) {
	                if (canEdit) {
	                    li = domConstruct.create("li", {className: "lotusFirst eeActionLinks"}, ul);
	                    a = domConstruct.create("a", {href: "javascript:;", title: this._strings.EDIT_TOOLTIP, role: "button", className: "editBtn"}, li);
	                    this.own(on(a, "click", lang.hitch(this, this.editComment, comment)));
	                    a.appendChild(d.createTextNode(this._strings.EDIT));
	                    if (this.focusEdit) {
	                        a.focus();
	                        this.focusEdit = false;
	                    }
	                }
	                if (canDelete && !this.useDeleteIcon) {
	                    fc = ul.firstChild;
	                    li = domConstruct.create("li", null, ul);
	                    if (!fc) {
	                        li.className = "lotusFirst eeActionLinks";
	                    }
	                    a = domConstruct.create("a", {href: "javascript:;", title: this._strings.DELETE_TOOLTIP, role: "button", className: "deleteBtn"}, li);
	                    this.own(on(a, "click", lang.hitch(this, this.deleteComment, comment)));
	                    a.appendChild(d.createTextNode(this._strings.DELETE));
	                }
	            }
	
	            if (this.permissions.authenticatedId && this.postModerationEnabled) {
	                fc = ul.firstChild;
	                li = domConstruct.create("li", null, ul);
	                if (!fc) {
	                    li.className = "lotusFirst eeActionLinks";
	                }
	                a = domConstruct.create("a", {href: "javascript:;", title: this._strings.FLAG_ITEM.COMMENT.TITLE, role: "button"}, li);
	                //this.own(dojo.connect(a, "onclick", dojo.hitch(this, this.flagComment, comment, ul)));
	                this.own(on(a, "click", lang.hitch(this, this.flagComment, comment, divActions, divFlagItem)));
	                a.appendChild(d.createTextNode(this._strings.FLAG_ITEM.ACTION));
	                var idDesc = registry.getUniqueId("qkrLW_describe");
	                a.setAttribute("aria-label", this._strings.FLAG_ITEM.ACTION);
	                a.setAttribute("aria-describedby", idDesc);
	                var a11y = domConstruct.create("span", {className: "lotusAccess", id: idDesc}, a);
	                a11y.appendChild(d.createTextNode(this._strings.FLAG_ITEM.COMMENT.A11Y));
	            }
	        },
	        flagComment: function (comment, divActions, divFlagItem) {
	            var prevLink = windowModule.doc.activeElement, flagDialog;
	            this._clearMessages(comment);
	            divActions.style.display = "none";
	            divFlagItem.style.display = "";
	            var scope = this;
	            flagDialog = new FlagItem({rootNode: divFlagItem, flagRefitemType: "Comment", net: this.net, scene: this, comment: comment, previousLink: prevLink});
	            this.connect(flagDialog, "cancelAction", lang.hitch(flagDialog, function (divActions, divFlagItem) {
	                divFlagItem.style.display = "none";
	                divActions.style.display = "";
	                flagDialog.gotoPreviousLink();
	                scope.onDisplayChange();
	            }, divActions, divFlagItem));
	            flagDialog.execute(comment, comment, flagDialog);
	            this.onDisplayChange();
	        },
	        editComment: function (comment, e) {
	            if (e) {
	                e.preventDefault(), e.stopPropagation();
	            }
	            this._clearMessages(comment);
	            var el = comment.element;
	            var ds = this._moreDs;
	            var d = windowModule.doc;
	            var div = queryModule("DIV._qkrEditSection", el)[0];
	            if (div) {
	                domConstruct.destroy(div);
	            }
	
	            queryModule(".lotusPostContent", el)[0].style.display = "none";
	            div = domConstruct.create("div", {className: "lotusPostContent _qkrEditSectionWrapper"}, el);
	            var wrapper = domConstruct.create("div", {className: "lotusPostInlineActions _qkrEditSection"}, div);
	            var form = domConstruct.create("form", {className: "lotusForm2 lotusStreamUpdate"}, wrapper);
	            var taCtnr = domConstruct.create("div", {className: "lotusFieldEmphasis"}, form);
	            var txtCtnr = domConstruct.create("div", {}, taCtnr);
	            var contents = ds.getValue(comment, "contents");
	            var self = this;
	            var opts = {
	                noPlaceholder: true,
	                baseClass: "lotusText eeTextArea",
	                value: contents,
	                name: "description",
	                id: registry.getUniqueId("commentBody"),
	                ariaLabel: self._strings.COMMENT_LABEL
	            };
	
	            var editTa = new TextArea(opts, txtCtnr);
	            editTa.setText(contents);
	            this.own(on(editTa, "Focus", lang.hitch(this,"onDisplayChange")));
	            this.own(on(editTa, "Blur", lang.hitch(this,"onDisplayChange")));
	            this.connect(editTa, "onChange", function () {
	                // check if the new comment situation changed and notify the gadget (in this case not checking for empty as that would be considered a change)
	                if (self.commentModified === (editTa.getText() === contents)) {
	                    self._updateListener(!self.commentModified);
	                }
	            });
	            this.own(on(editTa, "HeightChanged", lang.hitch(this, "onDisplayChange")));
	            comment.taWidget = editTa;
	
	            var actionsCtnr = domConstruct.create("div", {className: "lotusActions"}, form);
	            var ul = domConstruct.create("ul", {className: "lotusInlinelist"}, actionsCtnr);
	            var li = domConstruct.create("li", {className: "lotusFirst eeActionLinks"}, ul);
	            var input = comment.submitBtn = domConstruct.create("a", {className: "lotusAction submitEnabled", role: "button", href: "javascript:;"}, li);
	            var strong = domConstruct.create("strong", {}, input);
	            strong.appendChild(d.createTextNode(this._strings.SAVE));
	            this.own(on(input, "click", lang.hitch(this, this.performEdit, comment)));
	            li = domConstruct.create("li", {}, ul);
	            var a = domConstruct.create("a", {className: "lotusAction", role: "button", href: "javascript:;"}, li);
	            this.own(on(a, "click", lang.hitch(this, this.cancelEdit, comment)));
	            a.appendChild(d.createTextNode(this._strings.CANCEL));
	            editTa.focus();
	            this.onDisplayChange();
	        },
	        cancelEdit: function (comment, e) {
	            if (e) {
	                e.preventDefault(), e.stopPropagation();
	            }
	            var el = comment.element;
	            var div = queryModule("DIV._qkrEditSectionWrapper", el)[0];
	            if (div) {
	                domConstruct.destroy(div);
	            }
	
	            queryModule(".lotusPostContent", el)[0].style.display = "";
	            this._clearMessages(comment);
	            this.onDisplayChange();
	            var editBtn = queryModule(".lotusPostContent a.editBtn", el)[0];
	            if (editBtn) {
	                focusUtils.focus(editBtn);
	            }
	            this._updateListener(false);
	        },
	        performEdit: function (comment, e) {
	            if (e) {
	                e.preventDefault(), e.stopPropagation();
	            }
	            if (domClass.contains(comment.submitBtn, "submitEnabled")) {
	                var el = comment.element;
	                var form = queryModule("DIV._qkrEditSection > FORM", el)[0];
	                this.disableSubmit(form);
	                if (!this.validateComment(form, comment, true)) {
	                    this.enableSubmit(form);
	                    return;
	                }
	
	                var commentText = comment.taWidget.getText();
	                var handleEditFunction = lang.hitch(this, this.handleEdit, comment);
	                var handleEditErrorFunction = lang.hitch(this, this.onEditError, comment);
	                var ds = this._moreDs;
	                var item = ds.newItem({category: this.category});
	                ds.revert();
	                ds.setValue(item, "contents", commentText);
	                ds.setValue(item, "comment", commentText);
	                ds.setValue(item, "mimeType", this.mimeType);
	                //setting category and urlEntry here because revert would wipe it out if set during newItem call
	                ds.setValue(item, "urlEntry", ds.getValue(comment, "urlEntry"));
	                ds.setValue(item, "category", this.category);
	                ds.setValue(item, "doctype", "comment");
	                ds.setValue(item, "atomId", ds.getValue(comment, "atomId"));
	                ds.setValue(item, "id", ds.getValue(comment, "id"));
	                topic.publish("com/ibm/social/ee/comment/beforeUpdate");
	                ds.save({scope: this, onComplete: handleEditFunction, onError: handleEditErrorFunction});
	            }
	        },
	        handleEdit: function (comment, item, ioArgs) {
	            if (item && !(item instanceof Error)) {
	                this.hideActions(comment.element);
	                this.cancelEdit(comment);
	
	                var handleUpdateFunction = lang.hitch(this, this.updateItem, comment);
	                var handleErrorFunction = lang.hitch(this, this.getItemError, comment, item, ioArgs);
	                var obj = {
	                    item: comment,
	                    onItem: handleUpdateFunction,
	                    onError: handleErrorFunction,
	                    forceLoad: true
	                };
	                this._moreDs.loadItem(obj);
	
	                this.confirmSubmission(item, lang.hitch(this, function (comment, item, skipEditFocus) {
	                    if (this.permissions.authenticatedId && this.postModerationEnabled) {
	                        this.updateItem(comment, item);
	                    }
	                    this.showActions(comment.element);
	                    var editBtn = queryModule(".editBtn", comment.element)[0];
	                    if (editBtn && !skipEditFocus) {
	                        editBtn.focus();
	                    }
	                    else {
	                        queryModule("a.lotusActiveSort", this.domNode)[0].focus();
	                    }
	                }, comment, item));
	            }
	        },
	        updateItem: function (comment, item) {
	            topic.publish("com/ibm/social/ee/comment/updated", this._moreDs.getValue(item, "updated"));
	            var li = comment.element.parentNode;
	            li.removeChild(comment.element);
	            this._createCommentUItem(item, li, false, true, false);
	            topic.publish("com/ibm/social/ee/comment/afterUpdated");
	            var editBtn = queryModule(".lotusPostContent a.editBtn", comment.element)[0];
	            if (editBtn) {
	                focusUtils.focus(editBtn);
	            }
	
	        },
	        getItemError: function (comment, item, ioArgs, errorObj) {
	            this.onEditError(comment, errorObj);
	        },
	        onEditError: function (comment, errorObj) {
	            var msg, form, code = errorObj.code;
	            if (code === "cancel") {
	                msg = this._strings.ERROR_EDIT_CANCEL;
	            }
	            else if (code === "timeout") {
	                msg = this._strings.ERROR_EDIT_TIMEOUT;
	            }
	            else if (code === "ItemNotFound") {
	                msg = this._strings.ERROR_EDIT_NOT_FOUND;
	            }
	            else if (code === "AccessDenied") {
	                msg = this._strings.ERROR_EDIT_ACCESS_DENIED;
	            }
	            else if (code === "unauthenticated") {
	                msg = this._strings.ERROR_EDIT_NOT_LOGGED_IN;
	            }
	            else {
	                msg = this._strings.ERROR_EDIT;
	            }
	            form = queryModule("DIV._qkrEditSection > FORM", comment.element)[0];
	            this.showInlineCommentError(comment, msg, null, form);
	        },
	        deleteComment: function (comment, e) {
	            if (e) {
	                e.preventDefault(), e.stopPropagation();
	            }
	            this._clearMessages(comment);
	            var el = comment.element;
	            var ds = this._moreDs;
	
	            var postContentNode = queryModule(".lotusPostContent", el)[0];
	            this.hideActions(postContentNode);
	            var div = queryModule("div.comment-delete-prompt", el)[0];
	
	            var input = null;
	
	            if (div) {
	                div.style.display = "";
	                input = queryModule("a.submitEnabled", el)[0];
	            }
	            else {
	
	                div = domConstruct.create("div", {className: "lotusPostInlineActions comment-delete-prompt"}, postContentNode, "first");
	                div.setAttribute("role", "presentation");
	                var form = domConstruct.create("form", {className: "lotusActionBox", role: "presentation"}, div);
	                var span = domConstruct.create("span", {className: "lotusActionMessage delete-confirm", innerHTML: this._strings.DELETE_CONFIRM, "aria-live": "assertive", role: "alert"}, form);
	                var actionsCtnr = domConstruct.create("div", {className: "lotusActions lotusClear", role: "presentation"}, form);
	                var ul = domConstruct.create("ul", {className: "lotusInlinelist", role: "presentation"}, actionsCtnr);
	                var li = domConstruct.create("li", {className: "lotusFirst", role: "presentation"}, ul);
	                input = comment.submitBtn = domConstruct.create("a", {className: "lotusAction submitEnabled", role: "button", href: "javascript:;"}, li);
	                input.appendChild(windowModule.doc.createTextNode(this._strings.YES));
	                this.own(on(input, "click", lang.hitch(this, this.doRemove, comment)));
	                domClass.add(input, "comments-refresh-btn");
	                li = domConstruct.create("li", {role: "presentation"}, ul);
	                var a = domConstruct.create("a", {className: "lotusAction cancel-button", role: "button", href: "javascript:;"}, li);
	                this.own(on(a, "click", lang.hitch(this, this.cancelRemove, comment)));
	                a.appendChild(windowModule.doc.createTextNode(this._strings.CANCEL));
	            }
	
	            queryModule(">.lotusMeta>.lotusInlinelist", postContentNode).style("display", "none");
	
	            focusUtils.focus(input);
	
	            this.onDisplayChange();
	        },
	        cancelRemove: function (comment, e) {
	            var el = comment.element;
	            this._clearMessages(comment);
	            queryModule(".lotusPostContent div.comment-delete-prompt", el).style("display", "none");
	            queryModule(".lotusPostContent > .lotusMeta > .lotusInlinelist", el).style("display", "");
	            this.showActions(el);
	            var deleteBtn = queryModule(".lotusPostContent a.deleteBtn", el)[0];
	            if (deleteBtn) {
	                focusUtils.focus(deleteBtn);
	            }
	
	            this.onDisplayChange();
	        },
	        doRemove: function (comment, e) {
	            if (e) {
	                e.preventDefault(), e.stopPropagation();
	            }
	
	            if (domClass.contains(comment.submitBtn, "submitEnabled")) {
	                var form = queryModule("div.comment-delete-prompt > form", comment.element)[0];
	                this.disableSubmit(form);
	                this._clearMessages(comment);
	                var el = comment.element;
	                var ds = this._moreDs;
	                var handleRemoveFunction = lang.hitch(this, this.handleRemove, comment);
	                var handleRemoveError = lang.hitch(this, this.onRemoveError, comment);
	                var item = ds.newItem({urlEntry: ds.getValue(comment, "urlEntry"), category: this.category});
	                ds.deleteItem(item);
	                topic.publish("com/ibm/social/ee/comment/beforeDelete");
	                ds.save({scope: this, onComplete: handleRemoveFunction, onError: handleRemoveError});
	            }
	        },
	        handleRemove: function (comment, response, ioArgs) {
	            if (!response || (response && !(response instanceof Error))) {
	                topic.publish("com/ibm/social/ee/comment/deleted");
	
	                if (this.commentCount > 1) {
	                    //get previous comment sibling
	                    var previous = comment.element.parentNode.previousSibling;
	                    var next = comment.element.parentNode.nextSibling;
	
	                    //focus there
	                    if (previous) {
	                        try {
	                            var els = queryModule("a.lotusPerson", previous);
	                            if (els.length > 0) {
	                                focusUtils.focus(els[0]);
	                            }
	                        } catch (ex) {
	
	                            //if there are no previous comments, focus goes to the next div
	                            if (next) {
	                                els = queryModule("a.lotusPerson", next);
	                                if (els.length > 0) {
	                                    focusUtils.focus(els[0]);
	                                }
	                            }
	                        }
	                    }
	                }
	
	                comment.element.parentNode.parentNode.removeChild(comment.element.parentNode);
	
	                this.commentCount--;
	
	                if (this.commentCount === 0 && this.addCmtNode) {
	                    focusUtils.focus(this.addCmtNode);
	                }
	
	                this.onCountChange(this.commentCount);
	                if (this.commentCount === 0) {
	                    this._showEmptyMsg();
	                }
	
	                this.onDisplayChange();
	
	            }
	        },
	        onRemoveError: function (comment, errObj) {
	            var msg, form, code = errObj.code;
	            if (code === "cancel") {
	                msg = this._strings.ERROR_DELETE_CANCEL;
	            }
	            else if (code === "timeout") {
	                msg = this._strings.ERROR_DELETE_TIMEOUT;
	            }
	            else if (code === "ItemNotFound") {
	                msg = this._strings.ERROR_DELETE_NOT_FOUND;
	            } else if (code === "AccessDenied") {
	                msg = this._strings.ERROR_DELETE_ACCESS_DENIED;
	            }
	            else if (code === "unauthenticated") {
	                msg = this._strings.ERROR_DELETE_NOT_LOGGED_IN;
	            }
	            else {
	                msg = this._strings.ERROR_DELETE;
	            }
	            form = queryModule("div.comment-delete-prompt > form", comment.element)[0];
	            this.showInlineCommentError(comment, msg, null, form);
	        },
	        disableSubmit: function (node) {
	            queryModule("a.submitEnabled", node).forEach(function (item) {
	                item.setAttribute("aria-disabled", true);
	                domClass.add(item, "submitDisabled");
	                domClass.remove(item, "submitEnabled");
	                domClass.add(item, "lotusPersonInactive");
	            });
	        },
	        enableSubmit: function (node) {
	            queryModule("a.submitDisabled", node).forEach(function (item) {
	                item.setAttribute("aria-disabled", false);
	                domClass.add(item, "submitEnabled");
	                domClass.remove(item, "submitDisabled");
	                domClass.remove(item, "lotusPersonInactive");
	            });
	        },
	        _showCommentsUI: function (commentArray, moreExists, isInitial) {
	            var length = commentArray.length;
	            if (length > 0) {
	                if (isInitial) {
	                    commentArray = commentArray.reverse();
	                }
	                else {
	                    var node = (this.showMoreLink.style.display === "") ? this.showMoreLink : this.addCommentLink;
	                    this.commentContainer = domConstruct.create("div", {style: {display: "none"}}, node, "after");
	                }
	
	                var scope = this;
	                array.forEach(commentArray, function (item) {
	                    scope._createCommentUItem(item, null, isInitial, false, isInitial);
	                });
	                this.empty.style.display = "none";
	                this.startIndex += length;
	                if (this.commentContainer) {
	                    fx.wipeIn({
	                        node: this.commentContainer,
	                        duration: length <= 5 ? 250 : length <= 15 ? 375 : 750,
	                        easing: easingModule.quadInOut,
	                        onEnd: function () {
	                            scope.commentContainer = null;
	                            scope.onCommentsDisplayed();
	                        }
	                    }).play();
	                }
	            }
	            this.loading.style.display = "none";
	            if (moreExists) {
	                this.showMoreLink.style.display = "";
	            }
	            else {
	                this.showMoreLink.style.display = "none";
	            }
	
	            this.cmtList.style.display = "";
	            this.onCommentsDisplayed();
	        },
	        onCommentsDisplayed: function () {
	            this.updateCountText();
	            topic.publish("com/ibm/social/ee/data/loaded");
	        },
	        _showEmptyMsg: function () {
	            this.empty.style.display = "";
	            this.loading.style.display = "none";
	            this.addCommentLink.style.display = "none";
	            this.showMoreLink.style.display = "none";
	        },
	        /* We get to this case when we originally had more items to fetch, but they were deleted once we tried to fetch them. */
	        _doNothing: function () {
	            this.loading.style.display = "none";
	        },
	        _showPagingErrorMsg: function (isInitial, errorData) {
	            var span = domConstruct.create("span");
	            var d = windowModule.doc;
	            var scope = this;
	            var errorMsg = this.prevItem ? this._strings.ERROR_ADDTL : this._strings.ERROR;
	            html.substitute(d, span, errorMsg, {
	                again: function () {
	                    var a = domConstruct.create("a");
	                    a.href = "#";
	                    a.setAttribute("role", "button");
	                    a.title = scope._strings.ERROR_AGAIN_TITLE;
	                    a.appendChild(d.createTextNode(scope._strings.ERROR_AGAIN));
	                    scope.connect(a, "onclick", lang.hitch(scope, scope._tryAgain, isInitial));
	                    return a;
	                }
	            });
	            this.addTopLevelErrorMessage(span, isInitial);
	            if (isInitial) {
	                this.addCommentCtnr.style.display = "none";
	            }
	            this.loading.style.display = "none";
	            this.showMoreLink.style.display = "none";
	            this.onDisplayChange();
	        },
	        _tryAgain: function (isInitial) {
	            this.loading.style.display = "";
	            this._clearMessages();
	            this._getCommentItems(isInitial);
	        },
	        scrollToBottom: function (height, dontScroll) {
	            if (dontScroll) {
	                return;
	            }
	            window.setTimeout(function () {
	                topic.publish("com/ibm/social/ee/event/scrollBottom");
	            }, 50);
	        },
	        createComment: function (e) {
	            if (e) {
	                e.preventDefault(), e.stopPropagation();
	            }
	            if (this.newCmt) {
	                this._clearMessages(this.newCmt);
	            }
	
	            this.onDisplayChange();
	
	            var fn = lang.hitch(this, function(){
	                this.newCmtTxtArea.setFocus();
	                this.scrollToNewComment();
	            });
	
	            setTimeout(fn, 100);
	        },
	        scrollToNewComment: function () {
	            this.scrollToBottom();
	        },
	        cancelCreate: function (e) {
	            if (e) {
	                e.preventDefault(), e.stopPropagation();
	            }
	            this._clearMessages(this.newCmt);
	            this._resetText();
	            this.onDisplayChange();
	            focusUtils.focus(this.addCmtNode);
	            this._updateListener(false);
	        },
	        _getCommentsText: function () {
	            var commentText;
	            if (this.mentionsEnabled) {
	                commentText = this.mentionsDataFormatter.formatData(this.newCmtTxtArea.getTrackedMentions(), this.escapeHTMLBeforePosting);
	            }
	            else {
	                commentText = this.newCmtTxtArea.getText();
	            }
	
	            return commentText || "";
	        },
	        performCreate: function (e) {
	            if (e) {
	                e.preventDefault(), e.stopPropagation();
	            }
	            if (domClass.contains(this.newCmtBtn, "submitEnabled")) {
	                //Disable Save
	                this.disableSubmit(this.addCommentNode);
	
	                var commentNode = this.addCommentNode.getElementsByTagName("textarea")[0];
	                if (!this.newCmt) {
	                    this.newCmt = {
	                        element: this.addCommentCtnr,
	                        taWidget: this.newCmtTxtArea
	                    };
	                }
	                if (!this.validateComment(this.addCommentNode, this.newCmt)) {
	                    this.enableSubmit(this.addCommentNode);
	                    return;
	                }
	                var commentText = this._getCommentsText();
	
	                if (this.linkifyCreateComment) {
	
	                    var node = domConstruct.create("span");
	                    util.html.createTextNode(windowModule.doc, node, commentText);
	                    commentText = dojox.html.entities.decode(node.innerHTML);
	                    //strip out non-breaking break space
	                    if (has("ie") || has("webkit")) {
	                        commentText = commentText.replace(/<wbr>/gi, "");
	                    }
	                    else {
	                        commentText = commentText.replace(/\u200B/gi, "");
	                    }
	                }
	
	                this._handleDS(commentText);
	            }
	        },
	        _handleDS: function (commentText) {
	
	            var ds = this._moreDs;
	            var item = ds.newItem({category: this.category});
	            ds.setValue(item, "doctype", "comment");
	            ds.setValue(item, "contents", commentText);
	            ds.setValue(item, "comment", commentText);
	            ds.setValue(item, "mimeType", this.mimeType);
	            if (this.sendDocTitle) {
	               ds.setValue(item, "title", this.docTitle);
	            }
	            this._doPerformCreate(ds, item);
	        },
	        _doPerformCreate: function (ds, item) {
	            topic.publish("com/ibm/social/ee/comment/beforeCreate");
	            ds.save({scope: this, onComplete: this.handleCreate, onError: this.onCreateError});
	        },
	        handleCreate: function (item, ioArgs) {
	            var success = false;
	
	            var li;
	
	            if (!(item instanceof Error)) {
	                topic.publish("com/ibm/social/ee/comment/created", this._moreDs.getValue(item, "published"));
	                // this.addCommentLink.style.display = "none";
	                this.cancelCreate();
	                this.empty.style.display = "none";
	                // this.addCommentLink.style.display = "";
	                li = this._createCommentUItem(item, null, true, false, false);
	                topic.publish("com/ibm/social/ee/comment/afterCreated");
	                this.confirmSubmission(item);
	                this.enableSubmit(this.addCommentNode);
	                // this.addCommentLink.style.visibility = "visible";
	                success = true;
	                this._updateListener(false);
	            }
	            else {
	                this.enableSubmit(this.addCommentNode);
	                this._resetText();
	            }
	
	            if (has("ie") && this.mentionsEnabled) {
	                // Delay settign the focus just for IE with @mentions
	                var node = this.addCmtNode;
	                window.setTimeout(function () {
	                    focusUtils.focus(node);
	                }, 0);
	            }
	            else {
	                focusUtils.focus(this.addCmtNode);
	            }
	            var scope = this;
	
	            if (success) {
	                this.scrollToBottom();
	            }
	        },
	        confirmSubmission: function (item, callback) {
	            if (!item) {
	                return;
	            }
	            var ds = this._moreDs;
	            var modStatus = ds.getValue(item, "moderationStatus");
	            var isPending = modStatus && (modStatus.toLowerCase() === "pending");
	            if (isPending) {
	                var div = domConstruct.create("div");
	                div.appendChild(windowModule.doc.createTextNode(this._stringsSubmitted.CONFIRM));
	                this.addTopLevelSuccessMessage(div);
	                if (callback) {
	                    callback(true);
	                }
	            }
	            else if (callback) {
	                callback();
	            }
	        },
	        onCreateError: function (errObj) {
	            var msg, code = errObj.code;
	            if (code === "cancel") {
	                msg = this._strings.ERROR_CREATE_CANCEL;
	            }
	            else if (code === "timeout") {
	                msg = this._strings.ERROR_CREATE_TIMEOUT;
	            }
	            else if (code === "ItemNotFound") {
	                msg = this._strings.ERROR_CREATE_NOT_FOUND;
	            }
	            else if (code === "AccessDenied") {
	                msg = this._strings.ERROR_CREATE_ACCESS_DENIED;
	            }
	            else if (code === "unauthenticated") {
	                msg = this._strings.ERROR_CREATE_NOT_LOGGED_IN;
	            }
	            else if (code === "Unauthorized") {
	                msg = this._strings.ERROR_UNAUTHORIZED;
	            }
	            else {
	                msg = this._strings.ERROR_CREATE;
	            }
	            this.showInlineCommentError(this.newCmt, msg, null, this.addCommentNode);
	        },
	        addComment: function (item) {
	            this._createCommentUItem(item, null, true, false, false);
	        },
	        _getMoreComments: function () {
	            var loadingNode = this.showMoreLoadingNode;
	            loadingNode.style.display = "inline-block";
	            this._getCommentItems(false, function () {
	                loadingNode.style.display = "none";
	            });
	        },
	        _clearMessages: function (comment) {
	            if (this.messageContainer) {
	                this.messageContainer.clear();
	            }
	            this.messageLocation.style.display = "none";
	            if (comment) {
	                this.removeInlineCommentError(comment);
	            }
	        },
	        hideActions: function (el) {
	            if (this.useDeleteIcon) {
	                queryModule("a.lotusDelete", el).style("display", "none");
	            }
	            queryModule("div.lotusPostMore", el).style("display", "none");
	        },
	        showActions: function (el) {
	            if (this.useDeleteIcon) {
	                queryModule("a.lotusDelete", el).style("display", "");
	            }
	            queryModule(".lotusPostContent div.lotusPostMore", el).style("display", "");
	        },
	        addTopLevelSuccessMessage: function (messageNode, refId, onRemove) {
	            if (this.messageLocation) {
	                this.messageLocation.style.display = "";
	                this.messageJustAdded = true;
	                var d = windowModule.doc;
	                var message = {success: true, refId: refId, canClose: true, message: messageNode, onRemove: onRemove};
	                if (!this.messageContainer) {
	                    this.messageContainer = new MessageContainer({items: [message], nls: this._stringsMsg}, this.messageLocation.appendChild(d.createElement("div")));
	                    this.messageContainer.onDisplayChange();
	                    on(this.messageContainer, "DisplayChange", lang.hitch(this, "onDisplayChange"));
	                }
	                else {
	                    this.messageContainer.add(message, true);
	                }
	            }
	        },
	        addTopLevelErrorMessage: function (messageNode, isInitial, refId, onRemove) {
	            if (this.messageLocation) {
	                this.messageJustAdded = true;
	                var d = windowModule.doc;
	                if (!isInitial) {
	                    var message = {error: true, refId: refId, canClose: true, message: messageNode, onRemove: onRemove};
	                    if (!this.messageContainer) {
	                        domConstruct.empty(this.messageLocation); //in case the italics msg was showing
	                        this.messageContainer = new MessageContainer({items: [message], nls: this._stringsMsg}, this.messageLocation.appendChild(d.createElement("div")));
	                        this.messageContainer.onDisplayChange();
	                        on(this.messageContainer, "DisplayChange", lang.hitch(this, "onDisplayChange"));
	                    }
	                    else {
	                        this.messageContainer.add(message, true);
	                    }
	                }
	                else {
	                    domConstruct.empty(this.messageLocation);
	                    var div = domConstruct.create("div", {className: "lconnEmpty", role: "alert"}, this.messageLocation);
	                    div.appendChild(messageNode);
	                }
	                this.messageLocation.style.display = "";
	                this.messageLocation.focus();
	            }
	        },
	        _resetText: function () {
	            this.actionBtns.style.top = "-9999px";
	            this.newCmtTxtArea.resetBox();
	            if(this.newCmtTxtArea.setRows){
	                this.newCmtTxtArea.setRows(this.ckeRowHeight);
	            }  
	        },
	        _showLoading: function () {
	            html.showLoading(this.loading);
	            this.loading.style.display = "";
	        },
	        validateComment: function (form, comment, isEdit) {
	            if (form) {
	                var userInput = comment.taWidget.getText();
	                if (util.text.trim(userInput).length === 0) {
	                    this.showInlineCommentError(comment, isEdit ? this._strings.ERROR_NO_CONTENT_EDIT : this._strings.ERROR_NO_CONTENT, null, form);
	                    return false;
	                }
	                else if (userInput.length > config.common.maxCommentLength) {
	                    this.showInlineCommentError(comment, null, "length", form);
	                    return false;
	                }
	            }
	            else {
	                //We should never get here, but just in case
	                this.showInlineCommentError(comment, this._strings.ERROR_GENERAL);
	                return false;
	            }
	            this.removeInlineCommentError(comment);
	            return true;
	        },
	        trimField: function (comment, form) {
	            var userInput = comment.taWidget.getText();
	            var i = util.text.getCharIndexForUtf8Index(userInput, config.common.maxCommentLength);
	            if (i !== -1) {
	                comment.taWidget.setText(userInput.substring(0, i));
	            }
	            this.removeInlineCommentError(comment);
	            if (comment.taWidget) {
	                comment.taWidget.textArea._onInput();
	            } //force textarea to be resized
	            //ta.focus();
	        },
	        showInlineCommentError: function (comment, msg, errType, form) {
	            var d = windowModule.doc;
	
	            var toFocus = null;
	
	            var div = null;
	
	            if (!comment.hasError) {
	                //don't display the error again if it's already displayed
	                div = domConstruct.create("div", {className: "lotusMessage2", role: "alert", name: "errorMsg", tabindex: "0"});
	                if (dojo._isBodyLtr()) {
	                    div.style.paddingRight = "25px";
	                }
	                else {
	                    div.style.paddingLeft = "25px";
	                }
	                comment.errNode = div;
	                domConstruct.place(div, comment.element, "first");
	                domClass.add(comment.element, "eeCommentError");
	                var img = domConstruct.create("img", {className: "lconnSprite lconnSprite-iconError16", src: this._blankGif, alt: this._stringsMsg.ERROR, title: this._stringsMsg.ERROR}, div);
	                img.style.marginRight = "10px";
	                var span = domConstruct.create("span", {}, div);
	                if (msg) {
	                    span.appendChild(d.createTextNode(msg));
	                }
	                else if (errType === "length" && form) {
	                    var scope = this;
	                    util.html.substitute(d, span, this._strings.WARN_LONG_COMMENT, {
	                        shorten: function () {
	                            var a = domConstruct.create("a", {href: "javascript:;", className: "keepFocus"});
	                            var trimHandler = lang.hitch(scope, "trimField", comment, form);
	                            scope.connect(a, "onclick", trimHandler);
	                            a.appendChild(d.createTextNode(scope._strings.TRIM_LONG_COMMENT));
	                            return a;
	                        }
	                    });
	                }
	                var a = domConstruct.create("a", {href: "javascript:;", className: "lotusDelete keepFocus", title: this._stringsMsg.DISMISS}, div);
	                on(a, "click", lang.hitch(this, "removeInlineCommentError", comment));
	                a.setAttribute("role", "button");
	                a.setAttribute("hidden", false);
	                img = domConstruct.create("img", {src: this._blankGif, alt: this._stringsMsg.DISMISS, title: this._stringsMsg.DISMISS}, a);
	                img.setAttribute("role", "presentation");
	                span = domConstruct.create("span", {className: "lotusAltText"}, a);
	                span.appendChild(d.createTextNode("X"));
	                comment.hasError = true;
	                toFocus = a;
	            }
	            if (form) {
	                this.enableSubmit(form);
	            }
	
	            if (!toFocus) {
	                if (div) {
	                    div.focus();
	                } else {
	                    queryModule(".lotusMessage2", comment.element)[0].focus();
	                }
	            }
	            else {
	                toFocus.focus();
	            }
	        },
	        removeInlineCommentError: function (comment) {
	            if (comment.hasError && comment.errNode) {
	                comment.element.removeChild(comment.errNode);
	                comment.hasError = false;
	                comment.errNode = null;
	                domClass.remove(comment.element, "eeCommentError");
	            }
	        },
	        updateCountText: function () {
	            if (this.commentCountNode) {
	                var text = this._asStrings.commentsCounter;
	                text = stringModule.substitute(text, [this.startIndex, this.commentCount]);
	                domAttr.set(this.commentCountNode, "innerHTML", text);
	            }
	        },
	        /*
	         * when hidden comments are fetched they bring the attachment data in a different property
	         */
	        _copyFromAttachments: function (comment) {
	
	            if (!comment.ref && comment.attachments && comment.attachments.length > 0) {
	
	                comment.ref = {id: null, url: null, displayName: null};
	
	                var attach = comment.attachments[0];
	
	                comment.ref.url = attach.url;
	                comment.ref.id = attach.id;
	                comment.ref.displayName = attach.displayName;
	            }
	        },
	        initAttachment: function (comment, refNode) {
	
	            if (!comment.ref) {
	                this._copyFromAttachments(comment);
	            }
	
	            if (typeof comment.ref !== 'undefined' && typeof comment.ref.url !== 'undefined') {
	                var downloadUrl = comment.ref.url;
	                var fileName = comment.ref.displayName;
	                var fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
	                var imageClass = "lconn-ftype32 lconn-ftype32-" + fileExt;
	                var tooltip = stringModule.substitute(this._stringsFile.download_tooltip, {0: fileName});
	
	                var fileDetailsDiv = domConstruct.create("div", {}, refNode, "last");
	                var img = domConstruct.create("img", { src: dojoConfig.blankGif, className: imageClass, "aria-hidden": true, role: "presentation", alt: ""}, fileDetailsDiv);
	                var a = domConstruct.create("a", {dir: "ltr", href: "#no", title: tooltip}, fileDetailsDiv);
	                comment.fileURL = downloadUrl;
	                comment.domLink = a;
	                comment.fileDetailsDiv = fileDetailsDiv;
	                comment.downloadLinkConnect = on(a, "click", lang.hitch(this, "getCommentAttachmentDetails", comment));
	                a.appendChild(windowModule.doc.createTextNode(fileName));
	            }
	        },
	        getCommentAttachmentDetails: function (comment) {
	            if (comment.ref && comment.ref.id) {
	                var id = this.getAttachmentId(comment, comment.ref.id);
	                this.getAttachmentDetails(id,
	                    lang.hitch(this, this.downloadCommentAttachment, comment),
	                    lang.hitch(this, this.showDownloadCommentAttachmentError, comment.fileDetailsDiv));
	            }
	        },
	        downloadCommentAttachment: function (comment, ds, item) {
	            comment.domLink.href = comment.fileURL;
	            comment.downloadLinkConnect.remove();
	            comment.domLink.click();
	        },
	        showDownloadCommentAttachmentError: function (fileDetailsDiv) {
	            domConstruct.empty(fileDetailsDiv);
	            var errorDiv = domConstruct.create("div", {className: "lotusMessage2", role: "alert", tabindex: "0"}, fileDetailsDiv);
	            errorDiv.appendChild(windowModule.doc.createTextNode(this._stringsFile.error_404));
	            var x = this.addXtoMessage(errorDiv);
	
	            on(x, "click", lang.hitch(this, function () {
	                domConstruct.destroy(fileDetailsDiv);
	            }));
	        },
	        getCommentCount: function () {
	            return this.commentCount;
	        },
	        onCountChange: function (count) {
	            this.commentCount = count;
	            this.updateCountText();
	        },
	        generateLinkToPerson: function () {
	        },
	        generateLinkToComment: function () {
	        },
	        onDisplayChange: function () {
	        },
	        commentMetaRendered: function (ds, comment, divMeta) {
	        }
	    });
	})();
	return Comments;
});
