/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

/**
 * Class that allows commenting with mentions in the ActivityStream.
 * @author Jim Antill
 */

dojo.provide("com.ibm.social.as.item.comment.CommentInputMentions");

dojo.require("com.ibm.ajax.auth");
dojo.require("lconn.core.widget.mentions.MentionsHelper");
dojo.require("lconn.core.widget.mentions.PersonMentionsType");
dojo.require("lconn.core.lcTextArea.providers.MentionsProvider");
dojo.require("com.ibm.social.as.item.comment.FileAttach");
dojo.require("com.ibm.social.as.item.comment.FileAttached");

dojo.require("lconn.news.microblogging.sharebox.data.MentionsDataFormatter");
dojo.require("lconn.news.microblogging.sharebox.MentionsWarningMessage");
dojo.require("lconn.news.microblogging.sharebox.data.MentionsCommunityMemberChecker");
dojo.require("lconn.news.microblogging.sharebox.CommunityVisibilityUtil");
dojo.require("lconn.news.microblogging.sharebox.data.SmartCloudVisibilityChecker");
dojo.require("lconn.news.microblogging.sharebox.data.ExternalUserAccessChecker");
dojo.require("com.ibm.social.as.config.enablement");

dojo.require("lconn.core.widget.mentions.utilities");

dojo.requireLocalization("com.ibm.social.ublog", "MentionsExtra");

/* globals activityStreamAbstractHelper, com, lconn */

dojo.declare("com.ibm.social.as.item.comment.CommentInputMentions",
    com.ibm.social.as.item.comment.CommentInput, {

        _mentionsHelper: null,
        _mentionsDataFormatter: null,
        _mentionsWarningMessage: null,

        _communityChecker: null,
        _communityCheckerCallbacks: null,

        _smartCloudChecker: null,

        _externalUserChecker: null,

        _communityPrefix: "urn:lsid:lconn.ibm.com:communities.community:",
        _communityId: undefined,

        _organizationId: undefined,

        _extraResources: null,
        _inPublicCommunity: undefined,
        _defaultTypeaheadHeader: "",
        _fileDetails: null,
        _selectedFileAttachment: null,

        postMixInProperties: function () {
            this.inherited(arguments);
            this._extraResourceBundle = dojo.i18n.getLocalization("com.ibm.social.ublog", "MentionsExtra");
        },

        _onFocus: function () {

            this.expand();
            this.inherited(arguments);
        },

        postCreate: function () {
            this.inherited(arguments);

            // Inherited sets created to true - but we haven't finished yet.
            this.created = false;

            this._mentionsDataFormatter = new lconn.news.microblogging.sharebox.data.MentionsDataFormatter();

            var eventCallbacks = {};
            eventCallbacks.onkeypress = dojo.hitch(this, this.onInput);

            var argsForHelper = {};

            argsForHelper.inputField = this.commentTextAP;
            argsForHelper.multiline = true;
            argsForHelper.network = activityStreamAbstractHelper;
            argsForHelper.disableBizCard = activityStreamAbstractHelper.isGadget;
            argsForHelper.context = {environment: this.environment};

            eventCallbacks.onfocus = dojo.hitch(this, this._onFocus);

            argsForHelper.eventHandles = eventCallbacks;

            this._mentionsHelper =
                lconn.core.lcTextArea.providers.addMentionsFeature(this.commentTextAP, eventCallbacks, null, argsForHelper);

            this.commentTextAP = this._mentionsHelper.textAreaNode;

            this.isSmartCloud = lconn.core.widget.mentions.utilities.isSmartCloud({environment: this.environment});

            /* The defaultTypeaheadHeader attribute contains what we want to show if we're not in
             * a private community etc. */
            if (this.isSmartCloud) {
                this._defaultTypeaheadHeader = this._extraResourceBundle.WARNING_SMARTCLOUD_TOOLTIP_COMMENT;
            }

            //is visitorModel enabled?
            this.isVisitorModelEnabled = lconn.core.config.properties.visitorModelEnabled === "true";

            this._mentionsHelper.setTypeaheadHeader(this._defaultTypeaheadHeader);
            lconn.news.microblogging.sharebox.CommunityVisibilityUtil.setUseOauth(activityStreamAbstractHelper.useOauth);

            // Set up the private community checking functionality.
            this._setupPrivateCommunityChecker();

            // Check visibility of a community if we are in one.
            if (this.newsItem.newsData.connections.communityid) {
                this._communityId = this.newsItem.newsData.connections.communityid.replace(this._communityPrefix, "");
                lconn.news.microblogging.sharebox.CommunityVisibilityUtil.isCommunityPublic(this._communityId).addCallback(
                    dojo.hitch(this, function (isPublic) {
                        if (isPublic) {
                            this._mentionsHelper.setTypeaheadHeader(this._defaultTypeaheadHeader);
                        } else {
                            this._mentionsHelper.setTypeaheadHeader(this._extraResourceBundle.WARNING_PRIVATE_COMMUNITY_TOOLTIP_COMMENT);
                        }

                        this._inPublicCommunity = isPublic;

                        this._setupMentionsHelperWarningMessage();
                    }));
            } else {
                this._setupMentionsHelperWarningMessage();
            }

            var isGadget = (activityStreamAbstractHelper && activityStreamAbstractHelper.isGadget);
            if (!isGadget) {

                if (com.ibm.social.as.config.enablement.checkEnablement(com.ibm.social.as.config.enablement.AS_COMMENT_FILE_ATTACH) ||
                    com.ibm.social.as.config.enablement.checkEnablement(com.ibm.social.as.config.enablement.AS_COMMENT_FILE_ATTACH_ATT)) {
                    this._fileAttachWidget = new com.ibm.social.as.item.comment.FileAttach({communityId: this._communityId}, this.commentFileAttachContainer);
                }
            }
            this.collapseTextArea();
            this.created = true;
        },

        _privateCommunityMentionAdd: function (user, communityId) {
            if (!(this._inPublicCommunity)) {
                var defList = this._communityChecker.checkMembersInCommunity(
                    [user],
                    communityId,
                    this._communityCheckerCallbacks
                );
            } else {
                this._smartCloudMentionAdd(user);
            }
        },

        _smartCloudMentionAdd: function (user) {
            if (this.isSmartCloud &&
                this.newsItem && this.newsItem.newsData && this.newsItem.newsData.connections &&
                this.newsItem.newsData.connections.organizationId) {
                var defList = this._smartCloudChecker.checkMicroblogVisibility(
                    [user],
                    this.newsItem.newsData.connections.organizationId,
                    this._communityCheckerCallbacks);
            } else if (this.isVisitorModelEnabled) {
                this._externalUserChecker.checkAccess(user, this._communityCheckerCallbacks);
            } else {
                this.enableAction();
            }
        },

        _privateCommunityMentionRemoval: function (user) {
            if (!(this._inPublicCommunity)) {
                this._mentionsWarningMessage.removeUser(user);

                if (this._mentionsWarningMessage.getNumberUsers() === 0) {
                    this._mentionsWarningMessage.hideMessage();
                }
            } else {
                this._smartCloudMentionRemoval(user);
            }
        },

        _smartCloudMentionRemoval: function (user) {
            if ((this.isSmartCloud &&
                this.newsItem && this.newsItem.newsData && this.newsItem.newsData.connections &&
                this.newsItem.newsData.connections.organizationId) || this.isVisitorModelEnabled) {
                this._mentionsWarningMessage.removeUser(user);

                if (this._mentionsWarningMessage.getNumberUsers() === 0) {
                    this._mentionsWarningMessage.hideMessage();
                }
            }
        },
        /**
         * Sets up the helpers mention warning message
         */
        _setupMentionsHelperWarningMessage: function () {

            var warningMessageArgs = {};

            if (this.isSmartCloud || this.isVisitorModelEnabled) {
                warningMessageArgs.promptKey = "WARNING_SMARTCLOUD_GENERIC";
            }

            if (this._communityId && !this._inPublicCommunity) {
                warningMessageArgs.promptKey = "WARNING_PRIVATE_COMMUNITY_GENERIC";
            }

            this._mentionsWarningMessage = new lconn.news.microblogging.sharebox.MentionsWarningMessage(warningMessageArgs, this.mentionsWarningPlaceholder);
        },
        /**
         * Utility function to set up the routines that check membership of
         * private communities.
         */
        _setupPrivateCommunityChecker: function () {
            // Create the mentions checker.
            this._communityChecker = new lconn.news.microblogging.sharebox.data.MentionsCommunityMemberChecker();
            this._smartCloudChecker = new lconn.news.microblogging.sharebox.data.SmartCloudVisibilityChecker();
            this._externalUserChecker = new lconn.news.microblogging.sharebox.data.ExternalUserAccessChecker();

            // Callbacks that hook into the mentionshelper, firing when mentions are added or removed.
            var onCreateMention =
                dojo.hitch(this,
                    function (user) {
                        this._updateRemainingChars();

                        if (this._communityId) {
                            this.disablePostAction();

                            if (typeof this._inPublicCommunity === "undefined") {
                                lconn.news.microblogging.sharebox.CommunityVisibilityUtil.isCommunityPublic(this._communityId)
                                    .addCallback(dojo.hitch(this, function (isPublic) {

                                        this._inPublicCommunity = isPublic;

                                        dojo.hitch(this, this._privateCommunityMentionAdd(user, this._communityId));
                                    }));
                            } else {
                                dojo.hitch(this, this._privateCommunityMentionAdd(user, this._communityId));
                            }
                        } else {
                            this._smartCloudMentionAdd(user);
                        }
                    });

            var onRemoveMention =
                dojo.hitch(this,
                    function (user) {
                        this._updateRemainingChars();

                        if (this._communityId) {
                            if (typeof this._inPublicCommunity === "undefined") {
                                lconn.news.microblogging.sharebox.CommunityVisibilityUtil.isCommunityPublic(this._communityId)
                                    .addCallback(dojo.hitch(this, function (isPublic) {

                                        this._inPublicCommunity = isPublic;

                                        dojo.hitch(this, this._privateCommunityMentionRemoval(user));
                                    }));
                            } else {
                                dojo.hitch(this, this._privateCommunityMentionRemoval(user));
                            }
                        } else {
                            this._smartCloudMentionRemoval(user);
                        }
                    });

            var nonMemberOfPrivateCommunity = dojo.hitch(this,
                function (user) {
                    this._mentionsWarningMessage.addUser(user);
                    user.removeSymbol();
                    this._mentionsWarningMessage.showMessage();
                });

            var memberOfPrivateCommunity = dojo.hitch(this,
                function (user) {
                    user.addSymbol();
                    this._mentionsWarningMessage.removeUser(user);
                });

            var checkCompleteCallback = dojo.hitch(this,
                function () {
                    this.enableAction();
                }
            );

            this._communityCheckerCallbacks = [];
            this._communityCheckerCallbacks.notMember = nonMemberOfPrivateCommunity;
            this._communityCheckerCallbacks["isMember"] = memberOfPrivateCommunity;
            this._communityCheckerCallbacks.onComplete = checkCompleteCallback;

            this._mentionsHelper.addCallback("onCreateMention", onCreateMention);
            this._mentionsHelper.addCallback("onRemoveMention", onRemoveMention);
        },

        /**
         * Expand the text area and update the placeholder text
         */
        expandTextArea: function () {
            dojo.removeClass(this.commentTextAP, "lotusTextCollapsed");
            dojo.attr(this.commentTextAP, "placeholder", "");

           this.showActions();
        },

        /**
         * Collapse the text area and update the placeholder text
         */
        collapseTextArea: function () {
            dojo.addClass(this.commentTextAP, "lotusTextCollapsed");
            dojo.attr(this.commentTextAP, "placeholder", this.strings.addCommentText);
            this._mentionsHelper.setShadowText();
            dojo.addClass(this.commentCountdownContainer, "lotusHidden");
        },

        _updateRemainingChars: function () {
            this.maxCount = com.ibm.social.as.comment.commentInputManager.maxCount;

            if (!this.created) {
                return;
            }

            var remainingChars = this.maxCount - this._mentionsHelper.getText().replace(/^\s*/, "").length;

            if (remainingChars > this.showCharCount) {
                dojo.addClass(this.commentCountdownContainer, "lotusHidden");
            } else {
                dojo.removeClass(this.commentCountdownContainer, "lotusHidden");
            }

            this._remainingChars = remainingChars;
            this.commentCountdownAP.innerHTML = remainingChars;

            if (remainingChars >= 0 && remainingChars != this.maxCount && this._mentionsHelper.getText() !== this._mentionsHelper.placeholder) {
                this.enableAction();
            } else {
                this.disablePostAction();
            }

            if (remainingChars <= -1) {
                this.commentFailureTextAP.innerHTML = this.strings.commentLengthExceeded;
                dojo.removeClass(this.commentErrorAP, "lotusHidden");
            } else {
                dojo.addClass(this.commentErrorAP, "lotusHidden");
            }
        },

        cancel: function () {
            if (!this.cancelDisabled) {
                this._inPublicCommunity = undefined;
                if (this._fileAttachWidget && this._fileAttachWidget.hasFileSelected()) {
                    this._fileAttachWidget.removeAttachment();
                }
                this._inPublicCommunity = undefined;

                // Ensure the mentionshelper is cleared.
                if (this._mentionsHelper) {
                    this._mentionsHelper.resetBox();
                }
            }

            this.inherited(arguments);
        },

        _postFileCallback: function (resp) {
            var comment = this._formatMentionsContent(this._mentionsHelper.getTextAsJson());

            if (resp.success === true) {
                var requestObj = this._fileAttachWidget._buildRequestObj(comment, resp.file);
                var fileType = resp.file.getTitle().substring(resp.file.getTitle().lastIndexOf(".") + 1).toLowerCase();

                var fileDetails = {
                    fileName: resp.file.getTitle(),
                    fileLink: resp.file.urlDownload,
                    imageClass: "lconn-ftype32 lconn-ftype32-" + fileType,
                    fileTypeDisplayName: fileType.toUpperCase(),
                    authorInfo: resp.file.getAuthor().name,
                    tagsText: ""
                };

                this._fileDetails = fileDetails;
                this._postComment(requestObj);
                this._fileAttachWidget.removeAttachment();
            } else {
                this._fileAttachWidget.showUploadProgressBar(false);
                this.showCommentError(resp.error.message);
            }
        },

        post: function () {
            // If the post button is disabled then just return.
            if (this.postDisabled) {
                return;
            }

            this._fileDetails = null; //these are set in _postFileCallback

            if (this._fileAttachWidget && this._fileAttachWidget.hasFileSelected()) {
                this.disablePostAction();
                this.disableCancelBtn();
                this._selectedFileAttachment = this._fileAttachWidget._selectedFileAttachment;
                this._fileAttachWidget.showUploadProgressBar(true);
                var deferred = this._fileAttachWidget.postFile();
                deferred.then(dojo.hitch(this, "_postFileCallback"));
                return;
            } else {
                var comment = this._formatMentionsContent(this._mentionsHelper.getTextAsJson());
                this._postComment({content: comment});
            }
        },

        _postComment: function (commentObj) {
            this._inPublicCommunity = undefined;

            var id = this.newsItem.newsData.getActivityId();
            var commentUrl = activityStreamAbstractHelper.getCommentUrl(id);

            var _this = this;
            _this.disablePostAction();

            _this._mentionsWarningMessage.cleanMessage();
            _this._mentionsWarningMessage.hideMessage();

            var args = {
                url: commentUrl,
                postData: dojo.toJson(commentObj),
                headers: {"Content-Type": "application/json; charset=utf-8"},
                handleAs: "json",
                handle: function (response) {
                    _this._resetDefaultHandler();

                    if (response instanceof Error || response instanceof SyntaxError) {
                        if (typeof response.dojoType !== 'undefined' && response.dojoType === "unauthenticated") {
                            _this.showCommentError(dojo.string.substitute(_this.strings.commentSessionTimedOut, ["/homepage"]));
                            _this.checkLoginOrPerm = false;
                        } else {
                            _this.showCommentError(_this.strings.commentFailureText);
                        }
                        return;
                    }

                    // SHINDIG-1758
                    if (response.list) {
                        response.entry = response.list;
                    }

                    // Look for the area to put hidden aria message.
                    var ariaMessageDiv = dojo.byId("hiddenAriaMessage");

                    // If we have an area populate it. This will cause Jaws to utter the message.
                    if (ariaMessageDiv) {
                        ariaMessageDiv.innerHTML = _this.strings.commentPosted;
                    }

                    _this.addInlineComment(response.entry, _this._fileDetails);
                    _this.reset();

                }
            };
            this._preventLoginRedirect(args);

            activityStreamAbstractHelper.xhrPost(args);
            this.enableCancelBtn();
        },

        resetNoDeselectEvent: function () {
            // Clear up the mentions helper.
            this.collapseTextArea();
            this._mentionsWarningMessage.cleanMessage();
            this._mentionsWarningMessage.hideMessage();

            var inlineComments = this.newsItem.inlineComments;

            if (inlineComments) {
                if (inlineComments.comments.totalItems === 0) {
                    dojo.addClass(this.addCommentAP, "lotusHidden");
                } else {
                    dojo.removeClass(this.addCommentAP, "lotusHidden");
                    this.hideActions();
                }
            }
            
            this._resetNoDeselectEventSetFocus(inlineComments);
            this._remainingChars = this.maxCount;
            this.commentCountdownAP.innerHTML = this._remainingChars;
            this.setIsCommenting(false);
            this.dirty = false;
            dojo.publish(com.ibm.social.as.constants.events.PAGECLEAN, ["asComment"]);
        },

        _formatMentionsContent: function (postText) {
            var formattedText = "";

            formattedText = this._mentionsDataFormatter.formatData(postText);

            return formattedText;
        },

        destroyRecursive: function () {
            this.inherited(arguments);

            if (this._mentionsHelper) {
                this._mentionsHelper.cleanUp();
            }
        }

    });
