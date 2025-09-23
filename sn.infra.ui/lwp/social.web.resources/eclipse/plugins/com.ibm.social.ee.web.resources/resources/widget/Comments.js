/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.Comments");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("com.ibm.social.incontext.util.uri");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.atom");
dojo.require("com.ibm.social.incontext.util.html");
dojo.require("com.ibm.social.incontext.util.DateFormat");
dojo.require("com.ibm.social.ee.util.validation");
dojo.require("com.ibm.social.ee.action.FlagItem");
dojo.require("com.ibm.social.incontext.widget.MessageContainer");
dojo.require("com.ibm.social.ee.bean.PermissionsBean");
dojo.require("com.ibm.social.ee.data.ShowMoreDataStore");
dojo.require("com.ibm.social.ee.widget.MentionsCkeTextArea");
dojo.requireLocalization("com.ibm.social.ee", "socialEEStrings");
dojo.requireLocalization("com.ibm.social.ublog", "Mentions");
dojo.requireLocalization("com.ibm.social.ublog", "MentionsExtra");
dojo.requireLocalization("lconn.core.lcTextArea.widgets", "ExpandingTextBox");
dojo.require("com.ibm.social.ee.data.ProfilesRoutes");
dojo.require("com.ibm.social.ee.config");
dojo.require("com.ibm.social.ee.widget.TextArea");
dojo.require("lconn.news.microblogging.sharebox.data.MentionsDataFormatter");
dojo.require("lconn.core.ext.timeago.Timeago");
dojo.requireLocalization("com.ibm.social.as", "activitystream");
dojo.require("dojo.fx");
dojo.require("dojo.fx.easing");
dojo.require("lconn.core.globalization.bidiUtil");
dojo.require("com.ibm.social.as.item.comment.SharedExternallyComments");
dojo.require("com.ibm.social.as.util.hashtag.HashtagUtil");
dojo.require("com.ibm.social.as.util.hashtag.HashTagParser");
dojo.require("dojox.html.entities");
dojo.require("lconn.core.auth");
dojo.require("lconn.core.util.text");
dojo.require("lconn.core.config.features");
dojo.require('com.ibm.social.incontext.widget.Tooltip');

/* globals com, djConfig, lconn, net */

(function () {
    var util = com.ibm.social.incontext.util;
    var profileRoutes = new com.ibm.social.ee.data.ProfilesRoutes();
    dojo.declare("com.ibm.social.ee.widget.Comments", [dijit._Widget, dijit._Templated], {
        has: lconn.core.config.features,
        templatePath: dojo.moduleUrl("com.ibm.social.ee", "widget/templates/Comments.html"),
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
        _asStrings: dojo.i18n.getLocalization("com.ibm.social.as", "activitystream"),
        _strings: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").COMMENTS,
        _stringsMsg: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").MESSAGE,
        _stringsSubmitted: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").COMMENTS_SUBMITTED,
        _stringsCommon: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").common,
        _stringsFile: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").file,
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
        hashTagParser: new com.ibm.social.as.util.hashtag.HashTagParser(),
        hashtagUtil: new com.ibm.social.as.util.hashtag.HashtagUtil(),
        sendDocTitle: true,
        postMixInProperties: function () {
            this.inherited(arguments);
            var dsConstructor = dojo.getObject(this.dsConstructor);
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
            this._moreDs = new com.ibm.social.ee.data.ShowMoreDataStore(opts);

            if (this.htmlComments) {
                this.mimeType = "html";
            }
        },
        postCreate: function () {

            this._showLoading();
            this.inherited(arguments);
            this.permissions = new com.ibm.social.ee.bean.PermissionsBean({
                owner: false,
                authenticatedId: this.authUser
            });
            var scope = this;

            this.connect(this, "handleCreate", "onDisplayChange");
            this.connect(this, "handleEdit", "onDisplayChange");
            this.connect(this, "updateItem", "onDisplayChange");
            this.connect(this, "hideActions", "onDisplayChange");
            this.connect(this, "showActions", "onDisplayChange");
            this.connect(this, "_showCommentsUI", "onDisplayChange");
            this.connect(this, "showInlineCommentError", "onDisplayChange");
            this.connect(this, "removeInlineCommentError", "onDisplayChange");
            this.connect(this, "_getCommentItems", "onDisplayChange");
            this.connect(this, "onCommentsDisplayed", "onDisplayChange");

            // add the shared externally comments block
            if (this.isExternal) {
                this.sharedExternallyComments = new com.ibm.social.as.item.comment.SharedExternallyComments({toShow: false}, this.sharedExternallyComments);
            }

            this.textAreaDfd = new dojo.Deferred();
            this._getCommentItems(true);
            if (this.commentCount === 0) {
                this._showEmptyMsg();
            }

            var opts;

            if (!this.has("ckeditor-lite-mentions-ee") && this.mentionsEnabled) {
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
                    disablePostAction: dojo.hitch(this, function () {
                        this.disableSubmit(this.addCommentNode);
                    }),
                    enablePostAction: dojo.hitch(this, function () {
                        this.enableSubmit(this.addCommentNode);
                    }),
                    mentionsWarningPlaceholder: this.atMentionsMessages
                };

                dojo.mixin(opts, {
                    reachedCharLimitCallback: dojo.hitch(this, function (flag) {
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
                dojo.removeClass(parentDiv, "lotusFieldEmphasis");
                com.ibm.social.incontext.util.html.showLoading(this.textCtnr);

                net.jazz.ajax.xdloader.load_async("com.ibm.social.ee.widget.MentionsTextArea", dojo.hitch(this, function () {
                    this.newCmtTxtArea = new com.ibm.social.ee.widget.MentionsTextArea(opts, this.textCtnr);
                    dojo.addClass(parentDiv, "lotusFieldEmphasis");
                    var ta = dojo.query("textarea", this.newCmtTxtArea.domNode)[0];
                    if (ta) {
                        ta.style.overflowX = "hidden"; //needs to be set after this.newCmtTxtArea is created, doesn't work if you pass this in the opt as the style param
                    }
                    this.connect(this.newCmtTxtArea, "onChange", "checkIfModified");
                    this.connect(this.newCmtTxtArea, "onHeightChanged", "onDisplayChange");
                    // Bidi support
                    lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.addCommentNode);
                    this.newCmtTxtArea.startup();
                    this.textAreaDfd.callback();

                    //aria-live makes JAWS read the comment box when it opens up, which is wrong. this removes aria-live
                    this.newCmtTxtArea.turnOffAriaLiveRegion();

                    this.mentionsDataFormatter = new lconn.news.microblogging.sharebox.data.MentionsDataFormatter(this.plainTextMentions);
                }));
            } else if (this.has("ckeditor-lite-mentions-ee") && this.mentionsEnabled) {
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
                
                dojo.addClass(this.textCtnr.parentNode, "cke_loaded");

            } else {
                opts = {
                    value: this._strings.PLACEHOLDER_TXT,
                    id: this.id + "addCommentBody"
                };

                this.newCmtTxtArea = new com.ibm.social.ee.widget.TextArea(opts, this.textCtnr);
                this.connect(this.newCmtTxtArea, "onFocus", "textAreaFocused");
                this.connect(this.newCmtTxtArea, "onChange", "checkIfModified");
                this.connect(this.newCmtTxtArea, "onHeightChanged", "onDisplayChange");
                this.connect(this.newCmtTxtArea, "onBlur", "onDisplayChange");
                var ta = dojo.query("textarea", this.newCmtTxtArea.domNode)[0];
                if (ta) {
                    dojo.addClass(ta, "bidiAware");
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
                this.textAreaConnection = this.connect(this.newCmtTxtArea, "onHeightChanged", "scrollToBottom");
            }
            if (this.newCmtTxtArea.getText() === "") {
                this.actionBtns.style.top = "0";
            }
            this.newCmtTxtArea.onHeightChanged();
            this._processTextPopulatation();

        },
        checkIfModified: function () {
            window.setTimeout(dojo.hitch(this, function () {
                // check if the new comment situation changed and notify the gadget
                if (this.commentModified === (this.newCmtTxtArea.getText() === "")) {
                    this._updateListener(!this.commentModified);
                }

                // for ECM CCM gadget
                if (dojo.isIE && !this.mentionsEnabled) {
                    this.onDisplayChange();
                    this.scrollToBottom();
                }
            }), 0);
        },
        setFixedMaxLength: function (maxLength) {
            this.textAreaDfd.addCallback(dojo.hitch(this, function () {
                this.newCmtTxtArea.maxLength = maxLength;
            }));
        },
        
        // Controls if the Confirm Close Dialog is displayed
        _updateListener: function (commentModified) {
            this.commentModified = commentModified;
            dojo.publish("com/ibm/social/ee/event/modified", [
                {modified: commentModified}
            ]);
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
                onComplete: dojo.hitch(this, function (items, request) {
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
                onError: dojo.hitch(this, function (errorData, request) {
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
            var string, spanMeta, span, link, h4, format, self = this, d = dojo.doc;
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
                li = dojo.create("li", {className: "lotusCommentItem", role: "article", tabindex: "0"}, ul);
            }
            var div = dojo.create("div", {className: "lotusPost eeComment"}, li);
            var anchor = dojo.create("a", {className: "lotusHidden"}, div);
            anchor.name = anchor.id = "comment-" + ds.getValue(comment, "id");

            var u = ds.getValue(comment, "author");
            var divAuthor, divAvatar, divContent, divMeta;

            if ((modStatus === "quarantined") && !ds.getValue(comment, "stateChangedBy") && this._strings.MODERATION_QUARANTINED) {
                divContent = dojo.create("div", null, div);
                spanMeta = dojo.create("span", {className: "lotusMeta"}, divContent);
                spanMeta.appendChild(d.createTextNode(this._strings.MODERATION_QUARANTINED));
            } else if ((modStatus === "rejected") && !this.displayRejectedStateChangedBy()) {
                divContent = this.addRejectedDivContentNoPersonRef(div);
            } else {

                divAuthor = dojo.create("div", {className: "lotusPostAuthorInfo"}, div);
                divAvatar = dojo.create("div", {className: "lotusPostAvatar"}, divAuthor);
                divContent = null;
                if (modStatus === "pending") {
                    if (this.generateUserImage) {
                        this.generateUserImage(u, divAvatar, this.userIconSize, this.userIconSize, null, {imagePop: false, title: this._strings.PROFILE_TITLE, generateLink: false});
                    }
                    divContent = dojo.create("div", null, div);
                    spanMeta = dojo.create("span", {className: "lotusMeta"}, divContent);
                    spanMeta.appendChild(d.createTextNode(this._strings.MODERATION_PENDING));
                }
                else if ((modStatus === "quarantined") || (modStatus === "rejected")) {
                    if (this.generateUserImage) {
                        this.generateUserImage(u, divAvatar, this.userIconSize, this.userIconSize, null, {imagePop: false, title: this._strings.PROFILE_TITLE, generateLink: false});
                    }
                    divContent = dojo.create("div", null, div);
                    spanMeta = dojo.create("span", {className: "lotusMeta"}, divContent);
                    //span.className = "lotusLeft";
                    format = new util.DateFormat(ds.getValue(comment, "stateChangedDate"));
                    string = format.formatByAge((modStatus === "quarantined") ? this._strings.MODERATION_REMOVED : this._strings.MODERATION_REJECTED);
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
                    var id = dijit.getUniqueId("eeComment");
                    divContent = dojo.create("div", {className: "lotusPostContent"}, div);
                    divMeta = dojo.create("div", {className: "lotusMeta", id: id}, divContent);
                    if (!isDeleted) {

                        if (this.showTitles) {
                            h4 = dojo.create("h4", null, divMeta);
                            h4.appendChild(d.createTextNode(ds.getValue(comment, "title")));
                        }

                        var metaList = dojo.create("ul", { className: "lotusInlinelist" }, divMeta);
                        var metaItem = dojo.create("li", { className: "lotusFirst"}, metaList);
                        var authorSpan = dojo.create("span", { className: "vcard" }, metaItem);
                        util.text.breakString(u.name, d, authorSpan);

                        // if the user is external then we don't show links for user profiles
                        var isUserExternal = lconn.core.auth.getUser() && lconn.core.auth.getUser().isExternal;

                        if (self.generateLinkToPerson && !isUserExternal){
                            self.generateLinkToPerson(u, authorSpan);
                        }
                        metaItem = dojo.create("li", { className: "lotusFirst" }, metaList);
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
                        var timeTitle = dojo.string.substitute(titleStr, params);
                        var abbr = dojo.create("abbr", { title: dojo.date.stamp.toISOString(ts), className: "timeNode" }, metaItem);
                        dojo.html.set(abbr, timeTitle);
                        var timeAgo = new lconn.core.ext.timeago.Timeago({}, abbr);
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

                        var commentAriaLabel = dojo.string.substitute(ariaString, [u.name, ariaTimestampStr]);
                        //aria-label
                        li.setAttribute("aria-label", commentAriaLabel);
                    }
                    else {
                        if (this.showTitles) {
                            h4 = dojo.create("h4", null, divMeta);
                            h4.appendChild(d.createTextNode(ds.getValue(comment, "title")));
                        }

                        var newSpan = dojo.create("span", {}, divMeta);
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
                    divDetails = dojo.create("div", {className: "lotusPostDetails eeCommentContent"}, divContent);
                    var contents = ds.getValue(comment, "contents");
                    if (this.plainTextMentions) {
                       contents = dojox.html.entities.encode(contents);
                    }
                    divDetails.commentBody = contents;
                    var p = dojo.create("p", { }, divDetails);
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
                    _blankGif: dojo.config.blankGif,
                    onSizeChange: function (height) {
                        thisWidget.onDisplayChange(height);
                    },
                    onErrorMessage: dojo.hitch(this, this.onLikeError, comment)
                };
                if (this.likeOpts) {
                    dojo.mixin(commentLikeOpts, this.likeOpts);
                }
                var cannotLike = commentLikeOpts.currentUserId ? false : true;

                //deleted items should not get the like option
                if (isDeleted) {
                    cannotLike = true;
                }

                var likeCount;
                var dfd = new dojo.Deferred();
                likeDs.fetch({ onBegin: function (count) {
                    likeCount = count;
                    dfd.callback();
                }  });
                dfd.addCallback(function () {
                    if (likeCount > 0 || !cannotLike) {
                        var likeDiv;
                        if (divMeta.firstChild && divMeta.firstChild.tagName && divMeta.firstChild.tagName.toLowerCase() === "ul") {
                            var likeParent = dojo.create("li", {}, divMeta.firstChild);
                            likeDiv = dojo.create("div", { className: "lotusCommentLike"}, likeParent);
                        }
                        else {
                            likeDiv = dojo.create("div", { className: "lotusChunk lotusCommentLike" }, divMeta, "after");
                        }
                        new com.ibm.social.ee.widget.Recommendation(commentLikeOpts, likeDiv);
                    }
                });
            }

            if (this.useDeleteIcon && canDelete) {
                var deleteLink = dojo.create("a", { className: "lotusDelete keepFocus", href: "javascript:;", title: this._strings.DELETE, alt: this._strings.DELETE}, divContent);
                dijit.setWaiRole(deleteLink, "button");
                dijit.setWaiState(deleteLink, "label", this._strings.DELETE);
                dojo.connect(deleteLink, "onfocus", dojo.hitch(this, this._forceVisibleActions, div));
                dojo.create("img", { src: dojo.config.blankGif, alt: "" }, deleteLink);
                dojo.create("span", { className: "lotusAltText", innerHTML: "X"}, deleteLink);
                dojo.connect(deleteLink, "onclick", this, dojo.hitch(this, this.deleteComment, comment));
                
                if(this.has(com.ibm.social.ee.util.misc.CONNECTIONS_TOOLTIP_GK)){
                	// set aria tooltip
                    new com.ibm.social.incontext.widget.Tooltip({
        				connectId: [deleteLink],
        				label: this._strings.DELETE
        			});	
                }
            }

            var divActions = this._createActionsDiv(divContent);
            divActions.style.display = "none";
            var divFlagItem = dojo.create("div", null, divContent);
            ul = dojo.create("ul", {className: "lotusInlinelist lotusActions"}, divActions);
            comment.element = div;
            //this._toggleEditBtns(div, true);
            this.connect(div, "onmouseenter", dojo.hitch(this, "_toggleEditBtns", div, true));
            this.connect(div, "onmouseleave", dojo.hitch(this, "_toggleEditBtns", div, false));
            this.connect(div, "onfocusin", dojo.hitch(this, "_toggleEditBtns", div, true));
            this.connect(div, "onfocusout", dojo.hitch(this, "_toggleEditBtns", div, false));
            this.renderActionLinks(ds, divActions, ul, d, comment, divDetails, divContent, canEdit, canDelete, isUserComment, isFileOwner, isDeleted, divFlagItem, li);
            if (ul.hasChildNodes()) {
                divActions.style.display = "";
            }
            else {
                dojo.empty(divActions); //we can't have an empty ul for a11y
            }

            if (!isEdit && !isInitial && isNew) {
                this.commentCount++;
                this.onCountChange(this.commentCount);
            }
            this._placeCommentNode(li, isNew, isEdit);
            dojo.connect(div, "onfocus", dojo.hitch(this, this._forceVisibleActions, div));
            lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.domNode);
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
            return dojo.create("div", {className: "lotusPostMore"}, divContent);
        },
        _placeCommentNode: function (li, isNew, isEdit) {
            if (isNew) {
                var afterNode = this.sharedExternallyComments && this.sharedExternallyComments.domNode ? this.sharedExternallyComments.domNode : this.addCommentCtnr;
                dojo.place(li, afterNode, "before");
            }
            else if (!isEdit) {
                var node;
                if (this.commentContainer) {
                    dojo.place(li, this.commentContainer, "first");
                }
                else {
                    node = (this.showMoreLink.style.display === "") ? this.showMoreLink : this.addCommentLink;
                    dojo.place(li, node, "after");
                }
            }
        },
        _focusNewCmt: function () {
            this._forceVisibleActions(this.addCmtNode);
        },
        _forceVisibleActions: function (div) {

            /* used for keyboard accessibility */
            var scope = this;
            var allLinks = dojo.query("a", this.cmtList);
            var cmts = dojo.query("div.eeComment", this.cmtList);
            dojo.forEach(cmts, function (cmt) {
                scope._toggleEditBtns(cmt, false);
            });
            //now show the links (and add them to the tab index) for the container that has focus
            var divLinks = dojo.query("a", div);
            dojo.forEach(divLinks, function (link) {
                link.setAttribute("tabIndex", "0");
                scope._toggleEditBtns(div, true);
            });
        },
        performLinkifyMentions: function (contents) {

            var self = this;

            var div = dojo.create("div", { innerHTML: contents});

            dojo.query(".vcard", div).forEach(function (node, index, arr) {

                var fn = dojo.query(".fn", node)[0];

                var xLconnUserId = dojo.query(".x-lconn-userid", node)[0];

                if (fn && xLconnUserId) {

                    var userName = fn.innerHTML;
                    var userId = xLconnUserId.innerHTML;

                    var person = {};
                    person.userid = userId;
                    person.name = userName;
                    var wrapperDiv = dojo.create("div");
                    self.generateLinkToPerson(person, wrapperDiv);
                    var link = dojo.query("a", wrapperDiv)[0];
                    dojo.place(link, node, "after");
                    var spanNode = dojo.clone(xLconnUserId);
                    dojo.setStyle(spanNode, "display", "none");
                    dojo.place(spanNode, link, "after");

                    dojo.destroy(node);
                }
            });

            var result = div.innerHTML;
            return result;
        },
        setCommentContent: function (isDeleted, divDetails, p, contents, ds, comment) {
            var d = dojo.doc;

            var originalContents = contents;

            if (this.htmlEncoded) {
                contents = dojox.html.entities.decode(contents);
            }
            
            if (this.plainTextMentions) {
               contents = lconn.core.util.text.htmlify(contents);
            }

            if (this.linkifyMentions) {
                contents = this.performLinkifyMentions(contents);
            }

            if (this.htmlComments) {
                p.innerHTML = contents;
                util.text.breakStringHTML(p);
                dojo.query("a", p).attr("target", "_blank");
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

            var plainTxt = com.ibm.social.ee.util.ContentManipulation.generate_summary(contents, length || -1);
            dojo.empty(p);

            if (this.htmlEncoded) {
                plainTxt = dojox.html.entities.decode(plainTxt);
            }

            if (this.linkifyMentions) {
                plainTxt = this.performLinkifyMentions(plainTxt);
            }

            p.innerHTML = plainTxt;
            util.text.breakStringHTML(p);
        },
        _toggleEditBtns: function (div, display) {
            if (display) {
                dojo.addClass(div, "lotusPostHover");
            }
            else {
                dojo.removeClass(div, "lotusPostHover");
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
                    li = dojo.create("li", {className: "lotusFirst eeActionLinks"}, ul);
                    a = dojo.create("a", {href: "javascript:;", title: this._strings.EDIT_TOOLTIP, role: "button", className: "editBtn"}, li);
                    this.connect(a, "onclick", dojo.hitch(this, this.editComment, comment));
                    a.appendChild(d.createTextNode(this._strings.EDIT));
                    if (this.focusEdit) {
                        a.focus();
                        this.focusEdit = false;
                    }
                }
                if (canDelete && !this.useDeleteIcon) {
                    fc = ul.firstChild;
                    li = dojo.create("li", null, ul);
                    if (!fc) {
                        li.className = "lotusFirst eeActionLinks";
                    }
                    a = dojo.create("a", {href: "javascript:;", title: this._strings.DELETE_TOOLTIP, role: "button", className: "deleteBtn"}, li);
                    this.connect(a, "onclick", dojo.hitch(this, this.deleteComment, comment));
                    a.appendChild(d.createTextNode(this._strings.DELETE));
                }
            }

            if (this.permissions.authenticatedId && this.postModerationEnabled) {
                fc = ul.firstChild;
                li = dojo.create("li", null, ul);
                if (!fc) {
                    li.className = "lotusFirst eeActionLinks";
                }
                a = dojo.create("a", {href: "javascript:;", title: this._strings.FLAG_ITEM.COMMENT.TITLE, role: "button"}, li);
                //this.connect(a, "onclick", dojo.hitch(this, this.flagComment, comment, ul));
                this.connect(a, "onclick", dojo.hitch(this, this.flagComment, comment, divActions, divFlagItem));
                a.appendChild(d.createTextNode(this._strings.FLAG_ITEM.ACTION));
                var idDesc = dijit.getUniqueId("qkrLW_describe");
                a.setAttribute("aria-label", this._strings.FLAG_ITEM.ACTION);
                a.setAttribute("aria-describedby", idDesc);
                var a11y = dojo.create("span", {className: "lotusAccess", id: idDesc}, a);
                a11y.appendChild(d.createTextNode(this._strings.FLAG_ITEM.COMMENT.A11Y));
            }
        },
        flagComment: function (comment, divActions, divFlagItem) {
            var prevLink = dojo.doc.activeElement, flagDialog;
            this._clearMessages(comment);
            divActions.style.display = "none";
            divFlagItem.style.display = "";
            var scope = this;
            flagDialog = new com.ibm.social.ee.action.FlagItem({rootNode: divFlagItem, flagRefitemType: "Comment", net: this.net, scene: this, comment: comment, previousLink: prevLink});
            this.connect(flagDialog, "cancelAction", dojo.hitch(flagDialog, function (divActions, divFlagItem) {
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
                dojo.stopEvent(e);
            }
            this._clearMessages(comment);
            var el = comment.element;
            var ds = this._moreDs;
            var d = dojo.doc;
            var div = dojo.query("DIV._qkrEditSection", el)[0];
            if (div) {
                dojo.destroy(div);
            }

            dojo.query(".lotusPostContent", el)[0].style.display = "none";
            div = dojo.create("div", {className: "lotusPostContent _qkrEditSectionWrapper"}, el);
            var wrapper = dojo.create("div", {className: "lotusPostInlineActions _qkrEditSection"}, div);
            var form = dojo.create("form", {className: "lotusForm2 lotusStreamUpdate"}, wrapper);
            var taCtnr = dojo.create("div", {className: "lotusFieldEmphasis"}, form);
            var txtCtnr = dojo.create("div", {}, taCtnr);
            var contents = ds.getValue(comment, "contents");
            var self = this;
            var opts = {
                noPlaceholder: true,
                baseClass: "lotusText eeTextArea",
                value: contents,
                name: "description",
                id: dijit.getUniqueId("commentBody"),
                ariaLabel: self._strings.COMMENT_LABEL
            };

            var editTa = new com.ibm.social.ee.widget.TextArea(opts, txtCtnr);
            editTa.setText(contents);
            this.connect(editTa, "onFocus", "onDisplayChange");
            this.connect(editTa, "onBlur", "onDisplayChange");
            this.connect(editTa, "onChange", function () {
                // check if the new comment situation changed and notify the gadget (in this case not checking for empty as that would be considered a change)
                if (self.commentModified === (editTa.getText() === contents)) {
                    self._updateListener(!self.commentModified);
                }
            });
            dojo.connect(editTa, "onHeightChanged", this, "onDisplayChange");
            comment.taWidget = editTa;

            var actionsCtnr = dojo.create("div", {className: "lotusActions"}, form);
            var ul = dojo.create("ul", {className: "lotusInlinelist"}, actionsCtnr);
            var li = dojo.create("li", {className: "lotusFirst eeActionLinks"}, ul);
            var input = comment.submitBtn = dojo.create("a", {className: "lotusAction submitEnabled", role: "button", href: "javascript:;"}, li);
            var strong = dojo.create("strong", {}, input);
            strong.appendChild(d.createTextNode(this._strings.SAVE));
            this.connect(input, "onclick", dojo.hitch(this, this.performEdit, comment));
            li = dojo.create("li", {}, ul);
            var a = dojo.create("a", {className: "lotusAction", role: "button", href: "javascript:;"}, li);
            this.connect(a, "onclick", dojo.hitch(this, this.cancelEdit, comment));
            a.appendChild(d.createTextNode(this._strings.CANCEL));
            editTa.focus();
            this.onDisplayChange();
        },
        cancelEdit: function (comment, e) {
            if (e) {
                dojo.stopEvent(e);
            }
            var el = comment.element;
            var div = dojo.query("DIV._qkrEditSectionWrapper", el)[0];
            if (div) {
                dojo.destroy(div);
            }

            dojo.query(".lotusPostContent", el)[0].style.display = "";
            this._clearMessages(comment);
            this.onDisplayChange();
            var editBtn = dojo.query(".lotusPostContent a.editBtn", el)[0];
            if (editBtn) {
                dijit.focus(editBtn);
            }
            this._updateListener(false);
        },
        performEdit: function (comment, e) {
            if (e) {
                dojo.stopEvent(e);
            }
            if (dojo.hasClass(comment.submitBtn, "submitEnabled")) {
                var el = comment.element;
                var form = dojo.query("DIV._qkrEditSection > FORM", el)[0];
                this.disableSubmit(form);
                if (!this.validateComment(form, comment, true)) {
                    this.enableSubmit(form);
                    return;
                }

                var commentText = comment.taWidget.getText();
                var handleEditFunction = dojo.hitch(this, this.handleEdit, comment);
                var handleEditErrorFunction = dojo.hitch(this, this.onEditError, comment);
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
                dojo.publish("com/ibm/social/ee/comment/beforeUpdate");
                ds.save({scope: this, onComplete: handleEditFunction, onError: handleEditErrorFunction});
            }
        },
        handleEdit: function (comment, item, ioArgs) {
            if (item && !(item instanceof Error)) {
                this.hideActions(comment.element);
                this.cancelEdit(comment);

                var handleUpdateFunction = dojo.hitch(this, this.updateItem, comment);
                var handleErrorFunction = dojo.hitch(this, this.getItemError, comment, item, ioArgs);
                var obj = {
                    item: comment,
                    onItem: handleUpdateFunction,
                    onError: handleErrorFunction,
                    forceLoad: true
                };
                this._moreDs.loadItem(obj);

                this.confirmSubmission(item, dojo.hitch(this, function (comment, item, skipEditFocus) {
                    if (this.permissions.authenticatedId && this.postModerationEnabled) {
                        this.updateItem(comment, item);
                    }
                    this.showActions(comment.element);
                    var editBtn = dojo.query(".editBtn", comment.element)[0];
                    if (editBtn && !skipEditFocus) {
                        editBtn.focus();
                    }
                    else {
                        dojo.query("a.lotusActiveSort", this.domNode)[0].focus();
                    }
                }, comment, item));
            }
        },
        updateItem: function (comment, item) {
            dojo.publish("com/ibm/social/ee/comment/updated", [this._moreDs.getValue(item, "updated")]);
            var li = comment.element.parentNode;
            li.removeChild(comment.element);
            this._createCommentUItem(item, li, false, true, false);
            dojo.publish("com/ibm/social/ee/comment/afterUpdated");
            var editBtn = dojo.query(".lotusPostContent a.editBtn", comment.element)[0];
            if (editBtn) {
                dijit.focus(editBtn);
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
            form = dojo.query("DIV._qkrEditSection > FORM", comment.element)[0];
            this.showInlineCommentError(comment, msg, null, form);
        },
        deleteComment: function (comment, e) {
            if (e) {
                dojo.stopEvent(e);
            }
            this._clearMessages(comment);
            var el = comment.element;
            var ds = this._moreDs;

            var postContentNode = dojo.query(".lotusPostContent", el)[0];
            this.hideActions(postContentNode);
            var div = dojo.query("div.comment-delete-prompt", el)[0];

            var input = null;

            if (div) {
                div.style.display = "";
                input = dojo.query("a.submitEnabled", el)[0];
            }
            else {

                div = dojo.create("div", {className: "lotusPostInlineActions comment-delete-prompt"}, postContentNode, "first");
                dijit.setWaiRole(div, "presentation");
                var form = dojo.create("form", {className: "lotusActionBox", role: "presentation"}, div);
                var span = dojo.create("span", {className: "lotusActionMessage delete-confirm", innerHTML: this._strings.DELETE_CONFIRM, "aria-live": "assertive", role: "alert"}, form);
                var actionsCtnr = dojo.create("div", {className: "lotusActions lotusClear", role: "presentation"}, form);
                var ul = dojo.create("ul", {className: "lotusInlinelist", role: "presentation"}, actionsCtnr);
                var li = dojo.create("li", {className: "lotusFirst", role: "presentation"}, ul);
                input = comment.submitBtn = dojo.create("a", {className: "lotusAction submitEnabled", role: "button", href: "javascript:;"}, li);
                input.appendChild(dojo.doc.createTextNode(this._strings.YES));
                this.connect(input, "onclick", dojo.hitch(this, this.doRemove, comment));
                dojo.addClass(input, "comments-refresh-btn");
                li = dojo.create("li", {role: "presentation"}, ul);
                var a = dojo.create("a", {className: "lotusAction cancel-button", role: "button", href: "javascript:;"}, li);
                this.connect(a, "onclick", dojo.hitch(this, this.cancelRemove, comment));
                a.appendChild(dojo.doc.createTextNode(this._strings.CANCEL));
            }

            dojo.query(">.lotusMeta>.lotusInlinelist", postContentNode).style("display", "none");

            dijit.focus(input);

            this.onDisplayChange();
        },
        cancelRemove: function (comment, e) {
            var el = comment.element;
            this._clearMessages(comment);
            dojo.query(".lotusPostContent div.comment-delete-prompt", el).style("display", "none");
            dojo.query(".lotusPostContent > .lotusMeta > .lotusInlinelist", el).style("display", "");
            this.showActions(el);
            var deleteBtn = dojo.query(".lotusPostContent a.deleteBtn", el)[0];
            if (deleteBtn) {
                dijit.focus(deleteBtn);
            }

            this.onDisplayChange();
        },
        doRemove: function (comment, e) {
            if (e) {
                dojo.stopEvent(e);
            }

            if (dojo.hasClass(comment.submitBtn, "submitEnabled")) {
                var form = dojo.query("div.comment-delete-prompt > form", comment.element)[0];
                this.disableSubmit(form);
                this._clearMessages(comment);
                var el = comment.element;
                var ds = this._moreDs;
                var handleRemoveFunction = dojo.hitch(this, this.handleRemove, comment);
                var handleRemoveError = dojo.hitch(this, this.onRemoveError, comment);
                var item = ds.newItem({urlEntry: ds.getValue(comment, "urlEntry"), category: this.category});
                ds.deleteItem(item);
                dojo.publish("com/ibm/social/ee/comment/beforeDelete");
                ds.save({scope: this, onComplete: handleRemoveFunction, onError: handleRemoveError});
            }
        },
        handleRemove: function (comment, response, ioArgs) {
            if (!response || (response && !(response instanceof Error))) {
                dojo.publish("com/ibm/social/ee/comment/deleted");

                if (this.commentCount > 1) {
                    //get previous comment sibling
                    var previous = comment.element.parentNode.previousSibling;
                    var next = comment.element.parentNode.nextSibling;

                    //focus there
                    if (previous) {
                        try {
                            var els = dojo.query("a.lotusPerson", previous);
                            if (els.length > 0) {
                                dijit.focus(els[0]);
                            }
                        } catch (ex) {

                            //if there are no previous comments, focus goes to the next div
                            if (next) {
                                els = dojo.query("a.lotusPerson", next);
                                if (els.length > 0) {
                                    dijit.focus(els[0]);
                                }
                            }
                        }
                    }
                }

                comment.element.parentNode.parentNode.removeChild(comment.element.parentNode);

                this.commentCount--;

                if (this.commentCount === 0 && this.addCmtNode) {
                    dijit.focus(this.addCmtNode);
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
            form = dojo.query("div.comment-delete-prompt > form", comment.element)[0];
            this.showInlineCommentError(comment, msg, null, form);
        },
        disableSubmit: function (node) {
            dojo.query("a.submitEnabled", node).forEach(function (item) {
                item.setAttribute("aria-disabled", true);
                dojo.addClass(item, "submitDisabled");
                dojo.removeClass(item, "submitEnabled");
                dojo.addClass(item, "lotusPersonInactive");
            });
        },
        enableSubmit: function (node) {
            dojo.query("a.submitDisabled", node).forEach(function (item) {
                item.setAttribute("aria-disabled", false);
                dojo.addClass(item, "submitEnabled");
                dojo.removeClass(item, "submitDisabled");
                dojo.removeClass(item, "lotusPersonInactive");
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
                    this.commentContainer = dojo.create("div", {style: {display: "none"}}, node, "after");
                }

                var scope = this;
                dojo.forEach(commentArray, function (item) {
                    scope._createCommentUItem(item, null, isInitial, false, isInitial);
                });
                this.empty.style.display = "none";
                this.startIndex += length;
                if (this.commentContainer) {
                    dojo.fx.wipeIn({
                        node: this.commentContainer,
                        duration: length <= 5 ? 250 : length <= 15 ? 375 : 750,
                        easing: dojo.fx.easing.quadInOut,
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
            dojo.publish("com/ibm/social/ee/data/loaded");
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
            var span = dojo.create("span");
            var d = dojo.doc;
            var scope = this;
            var errorMsg = this.prevItem ? this._strings.ERROR_ADDTL : this._strings.ERROR;
            com.ibm.social.incontext.util.html.substitute(d, span, errorMsg, {
                again: function () {
                    var a = dojo.create("a");
                    a.href = "#";
                    a.setAttribute("role", "button");
                    a.title = scope._strings.ERROR_AGAIN_TITLE;
                    a.appendChild(d.createTextNode(scope._strings.ERROR_AGAIN));
                    scope.connect(a, "onclick", dojo.hitch(scope, scope._tryAgain, isInitial));
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
                dojo.publish("com/ibm/social/ee/event/scrollBottom");
            }, 50);
        },
        createComment: function (e) {
            if (e) {
                dojo.stopEvent(e);
            }
            if (this.newCmt) {
                this._clearMessages(this.newCmt);
            }

            this.onDisplayChange();

            var fn = dojo.hitch(this, function(){
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
                dojo.stopEvent(e);
            }
            this._clearMessages(this.newCmt);
            this._resetText();
            this.onDisplayChange();
            dijit.focus(this.addCmtNode);
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
                dojo.stopEvent(e);
            }
            if (dojo.hasClass(this.newCmtBtn, "submitEnabled")) {
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

                    var node = dojo.create("span");
                    util.html.createTextNode(dojo.doc, node, commentText);
                    commentText = dojox.html.entities.decode(node.innerHTML);
                    //strip out non-breaking break space
                    if (dojo.isIE || dojo.isWebKit) {
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
            dojo.publish("com/ibm/social/ee/comment/beforeCreate");
            ds.save({scope: this, onComplete: this.handleCreate, onError: this.onCreateError});
        },
        handleCreate: function (item, ioArgs) {
            var success = false;

            var li;

            if (!(item instanceof Error)) {
                dojo.publish("com/ibm/social/ee/comment/created", [this._moreDs.getValue(item, "published")]);
                // this.addCommentLink.style.display = "none";
                this.cancelCreate();
                this.empty.style.display = "none";
                // this.addCommentLink.style.display = "";
                li = this._createCommentUItem(item, null, true, false, false);
                dojo.publish("com/ibm/social/ee/comment/afterCreated");
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

            if (dojo.isIE && this.mentionsEnabled) {
                // Delay settign the focus just for IE with @mentions
                var node = this.addCmtNode;
                window.setTimeout(function () {
                    dijit.focus(node);
                }, 0);
            }
            else {
                dijit.focus(this.addCmtNode);
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
                var div = dojo.create("div");
                div.appendChild(dojo.doc.createTextNode(this._stringsSubmitted.CONFIRM));
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
                dojo.query("a.lotusDelete", el).style("display", "none");
            }
            dojo.query("div.lotusPostMore", el).style("display", "none");
        },
        showActions: function (el) {
            if (this.useDeleteIcon) {
                dojo.query("a.lotusDelete", el).style("display", "");
            }
            dojo.query(".lotusPostContent div.lotusPostMore", el).style("display", "");
        },
        addTopLevelSuccessMessage: function (messageNode, refId, onRemove) {
            if (this.messageLocation) {
                this.messageLocation.style.display = "";
                this.messageJustAdded = true;
                var d = dojo.doc;
                var message = {success: true, refId: refId, canClose: true, message: messageNode, onRemove: onRemove};
                if (!this.messageContainer) {
                    this.messageContainer = new com.ibm.social.incontext.widget.MessageContainer({items: [message], nls: this._stringsMsg}, this.messageLocation.appendChild(d.createElement("div")));
                    this.messageContainer.onDisplayChange();
                    dojo.connect(this.messageContainer, "onDisplayChange", this, "onDisplayChange");
                }
                else {
                    this.messageContainer.add(message, true);
                }
            }
        },
        addTopLevelErrorMessage: function (messageNode, isInitial, refId, onRemove) {
            if (this.messageLocation) {
                this.messageJustAdded = true;
                var d = dojo.doc;
                if (!isInitial) {
                    var message = {error: true, refId: refId, canClose: true, message: messageNode, onRemove: onRemove};
                    if (!this.messageContainer) {
                        dojo.empty(this.messageLocation); //in case the italics msg was showing
                        this.messageContainer = new com.ibm.social.incontext.widget.MessageContainer({items: [message], nls: this._stringsMsg}, this.messageLocation.appendChild(d.createElement("div")));
                        this.messageContainer.onDisplayChange();
                        dojo.connect(this.messageContainer, "onDisplayChange", this, "onDisplayChange");
                    }
                    else {
                        this.messageContainer.add(message, true);
                    }
                }
                else {
                    dojo.empty(this.messageLocation);
                    var div = dojo.create("div", {className: "lconnEmpty", role: "alert"}, this.messageLocation);
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
            com.ibm.social.incontext.util.html.showLoading(this.loading);
            this.loading.style.display = "";
        },
        validateComment: function (form, comment, isEdit) {
            if (form) {
                var userInput = comment.taWidget.getText();
                if (util.text.trim(userInput).length === 0) {
                    this.showInlineCommentError(comment, isEdit ? this._strings.ERROR_NO_CONTENT_EDIT : this._strings.ERROR_NO_CONTENT, null, form);
                    return false;
                }
                else if (userInput.length > com.ibm.social.ee.config.common.maxCommentLength) {
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
            var i = util.text.getCharIndexForUtf8Index(userInput, com.ibm.social.ee.config.common.maxCommentLength);
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
            var d = dojo.doc;

            var toFocus = null;

            var div = null;

            if (!comment.hasError) {
                //don't display the error again if it's already displayed
                div = dojo.create("div", {className: "lotusMessage2", role: "alert", name: "errorMsg", tabindex: "0"});
                if (dojo._isBodyLtr()) {
                    div.style.paddingRight = "25px";
                }
                else {
                    div.style.paddingLeft = "25px";
                }
                comment.errNode = div;
                dojo.place(div, comment.element, "first");
                dojo.addClass(comment.element, "eeCommentError");
                var img = dojo.create("img", {className: "lconnSprite lconnSprite-iconError16", src: this._blankGif, alt: this._stringsMsg.ERROR, title: this._stringsMsg.ERROR}, div);
                img.style.marginRight = "10px";
                var span = dojo.create("span", {}, div);
                if (msg) {
                    span.appendChild(d.createTextNode(msg));
                }
                else if (errType === "length" && form) {
                    var scope = this;
                    util.html.substitute(d, span, this._strings.WARN_LONG_COMMENT, {
                        shorten: function () {
                            var a = dojo.create("a", {href: "javascript:;", className: "keepFocus"});
                            var trimHandler = dojo.hitch(scope, "trimField", comment, form);
                            scope.connect(a, "onclick", trimHandler);
                            a.appendChild(d.createTextNode(scope._strings.TRIM_LONG_COMMENT));
                            return a;
                        }
                    });
                }
                var a = dojo.create("a", {href: "javascript:;", className: "lotusDelete keepFocus", title: this._stringsMsg.DISMISS}, div);
                dojo.connect(a, "onclick", dojo.hitch(this, "removeInlineCommentError", comment));
                dijit.setWaiRole(a, "button");
                dijit.setWaiState(a, "hidden", false);
                img = dojo.create("img", {src: this._blankGif, alt: this._stringsMsg.DISMISS, title: this._stringsMsg.DISMISS}, a);
                dijit.setWaiRole(img, "presentation");
                span = dojo.create("span", {className: "lotusAltText"}, a);
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
                    dojo.query(".lotusMessage2", comment.element)[0].focus();
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
                dojo.removeClass(comment.element, "eeCommentError");
            }
        },
        updateCountText: function () {
            if (this.commentCountNode) {
                var text = this._asStrings.commentsCounter;
                text = dojo.string.substitute(text, [this.startIndex, this.commentCount]);
                dojo.attr(this.commentCountNode, "innerHTML", text);
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
                var tooltip = dojo.string.substitute(this._stringsFile.download_tooltip, {0: fileName});

                var fileDetailsDiv = dojo.create("div", {}, refNode, "last");
                var img = dojo.create("img", { src: dojo.config.blankGif, className: imageClass, "aria-hidden": true, role: "presentation", alt: ""}, fileDetailsDiv);
                var a = dojo.create("a", {dir: "ltr", href: "#no", title: tooltip}, fileDetailsDiv);
                comment.fileURL = downloadUrl;
                comment.domLink = a;
                comment.fileDetailsDiv = fileDetailsDiv;
                comment.downloadLinkConnect = dojo.connect(a, "onclick", dojo.hitch(this, "getCommentAttachmentDetails", comment));
                a.appendChild(dojo.doc.createTextNode(fileName));
            }
        },
        getCommentAttachmentDetails: function (comment) {
            if (comment.ref && comment.ref.id) {
                var id = this.getAttachmentId(comment, comment.ref.id);
                this.getAttachmentDetails(id,
                    dojo.hitch(this, this.downloadCommentAttachment, comment),
                    dojo.hitch(this, this.showDownloadCommentAttachmentError, comment.fileDetailsDiv));
            }
        },
        downloadCommentAttachment: function (comment, ds, item) {
            comment.domLink.href = comment.fileURL;
            dojo.disconnect(comment.downloadLinkConnect);
            comment.domLink.click();
        },
        showDownloadCommentAttachmentError: function (fileDetailsDiv) {
            dojo.empty(fileDetailsDiv);
            var errorDiv = dojo.create("div", {className: "lotusMessage2", role: "alert", tabindex: "0"}, fileDetailsDiv);
            errorDiv.appendChild(dojo.doc.createTextNode(this._stringsFile.error_404));
            var x = this.addXtoMessage(errorDiv);

            dojo.connect(x, "onclick", dojo.hitch(this, function () {
                dojo.destroy(fileDetailsDiv);
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