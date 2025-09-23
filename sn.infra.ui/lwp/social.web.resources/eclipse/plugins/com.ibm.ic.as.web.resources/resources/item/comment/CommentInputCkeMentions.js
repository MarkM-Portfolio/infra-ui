/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

/**
 * Allows commenting with mentions using the CKEditor in the ActivityStream.
 * 
 */

dojo.provide("com.ibm.social.as.item.comment.CommentInputCkeMentions");

dojo.require("com.ibm.ajax.auth");
dojo.require("lconn.core.widget.mentions.MentionsHelper");
dojo.require("lconn.core.widget.mentions.PersonMentionsType");
dojo.require("lconn.core.lcTextArea.providers.MentionsProvider");
dojo.require("lconn.core.lcTextArea.widgets.BasicTextBox");
dojo.require("com.ibm.social.as.item.comment.FileAttach");
dojo.require("com.ibm.social.as.item.comment.FileAttached");
dojo.require("com.ibm.social.as.item.comment.CommentInput");
dojo.require("com.ibm.social.as.util.AbstractHelper");

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

dojo.declare("com.ibm.social.as.item.comment.CommentInputCkeMentions",
    com.ibm.social.as.item.comment.CommentInput, {

    _communityPrefix: "urn:lsid:lconn.ibm.com:communities.community:",
    
    templatePath: dojo.moduleUrl("com.ibm.social.as", "item/comment/templates/commentInputCkeMentions.html"),

    postMixInProperties: function () {
        this.inherited(arguments);
        this._extraResourceBundle = dojo.i18n.getLocalization("com.ibm.social.ublog", "MentionsExtra");
    },
    
    postCreate: function () {
        this.inherited(arguments);
        
        this._mentionsDataFormatter = new lconn.news.microblogging.sharebox.data.MentionsDataFormatter();
        
        // Create the text box, hooking in callbacks and specifying the max
        // length and show characters limit.
        var options = {
                useRTE: true,
                disableURLPreview: true,
                context: this.params,
                network: activityStreamAbstractHelper.network,
                customCSS: 'lotusTextCollapsed lconnInlineCommentCke',
                height: '26px',
                shadowText: this.strings.addCommentText,
                title: this.strings.ariaAddCommentText,
                maxLength: this.maxCount,
                maxByteLength: this._maxByteCount,
                showRemainingLimit: this.showCharCount,
                charRemainingDisplay: this.commentCountdownContainer,
                xhrHandler: dojo.getObject("com.ibm.social.as.util.xhr.XhrHandler") || dojo,
                onFocusCallback: dojo.hitch(this, "_onFocus"),
                onBlurCallback: dojo.hitch(this, "_ckeOnBlur"),
                reachedCharLimitCallback: dojo.hitch(this, "_processTextPopulatation"),
                textPopulatedCallback: dojo.hitch(this, function(pop) {
                    this._processTextPopulatation(pop)
                })
        };

        this.textBoxControl = new lconn.core.lcTextArea.widgets.BasicTextBox(options, this.commentInputTextBox);        
        
        var isGadget = (activityStreamAbstractHelper && activityStreamAbstractHelper.isGadget);
        if (!isGadget) {

            if (com.ibm.social.as.config.enablement.checkEnablement(com.ibm.social.as.config.enablement.AS_COMMENT_FILE_ATTACH) ||
                com.ibm.social.as.config.enablement.checkEnablement(com.ibm.social.as.config.enablement.AS_COMMENT_FILE_ATTACH_ATT)) {
                this._fileAttachWidget = new com.ibm.social.as.item.comment.FileAttach({communityId: this._communityId}, this.commentFileAttachContainer);
            }
        }

        this.isSmartCloud = lconn.core.widget.mentions.utilities.isSmartCloud({environment: this.environment});

        /* The defaultTypeaheadHeader attribute contains what we want to show if we're not in
         * a private community etc. */
        if (this.isSmartCloud) {
            this._defaultTypeaheadHeader = this._extraResourceBundle.WARNING_SMARTCLOUD_TOOLTIP_COMMENT;
        }

        //is visitorModel enabled?
        this.isVisitorModelEnabled = lconn.core.config.properties.visitorModelEnabled === "true";

        this.textBoxControl.setTypeAheadHeader(this._defaultTypeaheadHeader);
        lconn.news.microblogging.sharebox.CommunityVisibilityUtil.setUseOauth(activityStreamAbstractHelper.useOauth);

        // Set up the private community checking functionality.
        this._setupPrivateCommunityChecker();

        // Check visibility of a community if we are in one.
        if (this.newsItem.newsData.connections.communityid) {
            this._communityId = this.newsItem.newsData.connections.communityid.replace(this._communityPrefix, "");
            lconn.news.microblogging.sharebox.CommunityVisibilityUtil.isCommunityPublic(this._communityId).addCallback(
                dojo.hitch(this, function (isPublic) {
                    if (isPublic) {
                        this.textBoxControl.setTypeAheadHeader(this._defaultTypeaheadHeader);
                    } else {
                        this.textBoxControl.setTypeAheadHeader(this._extraResourceBundle.WARNING_PRIVATE_COMMUNITY_TOOLTIP_COMMENT);
                    }

                    this._inPublicCommunity = isPublic;

                    this._setupMentionsHelperWarningMessage();
                }));
        } else {
            this._setupMentionsHelperWarningMessage();
        }
         
        this.collapseTextArea();    
        
        if (dojo.isIE){
            this._blurPatchesForWidgetsBlurInIE();
        }
    },
    
    _ckeOnBlur: function() {
        // if not IE; as IE uses _connectPatchesForWidgetsBlurOnIE
        if (!dojo.isIE && this.focused === false) {
            this._onBlur();
        }
    },
    
    // This is needed as the Didget's _onblur event and this.focused property does not work in IE due to the CKEditor's iframe
    // There are four exit points of the widget where blurring needs to be handled (CKEditor, 'Add a File' / 'Post' / 'Cancel' actions)
    _blurPatchesForWidgetsBlurInIE: function () {
        this._createConnectForBlurPatchesInIE(this, "_ckeOnBlur");
        this._createConnectForBlurPatchesInIE(this.commentPostActoin, "onblur");
        this._createConnectForBlurPatchesInIE(this.commentCancelBtn, "onblur");
        this._createConnectForBlurPatchesInIE(this.closeBtn, "onblur");
        // this._fileAttachWidget is only available when configured
        if (this._fileAttachWidget) {
            this._createConnectForBlurPatchesInIE(this._fileAttachWidget.attachActionButtonNode, "onblur"); 
        }
    },
    
    /**
    * This function creates Dojo's Connects for the Comment Input's widget; needed due to CKEditor iframe
    * @param {object} objectOfConnect The object the Connect is to connect to
    * @param {string} functionOfConnect The function of the object the Connect is to connect to
    */
    _createConnectForBlurPatchesInIE: function (objectOfConnect, functionOfConnect) {
        this.connect(
            objectOfConnect, 
            functionOfConnect, 
            dojo.hitch(
                    this, 
                    function() {
                        // if focus is not on any of the widget's elements, call widget's blur
                        if (this._fileAttachWidget
                                && !this.textBoxControl.isFocused()
                                && document.activeElement !== this._fileAttachWidget.attachActionButtonNode
                                && document.activeElement !== this.commentPostActoin
                                && document.activeElement !== this.commentCancelBtn
                                && document.activeElement !== this.closeBtn) {
                            this._onBlur();
                        } else if (!this.textBoxControl.isFocused()
                                && document.activeElement !== this.commentPostActoin
                                && document.activeElement !== this.commentCancelBtn
                                && document.activeElement !== this.closeBtn) {
                            this._onBlur();
                        }
                    }));
    },
    
    _setupMentionsHelperWarningMessage: function () {
        var warningMessageArgs = {};

        if (this.isSmartCloud || this.isVisitorModelEnabled) {
            warningMessageArgs.promptKey = "WARNING_SMARTCLOUD_GENERIC";
        }

        if (this._communityId && !this._inPublicCommunity) {
            warningMessageArgs.promptKey = "WARNING_PRIVATE_COMMUNITY_GENERIC";
        }

        this._mentionsWarningMessage = new lconn.news.microblogging.sharebox.MentionsWarningMessage(
                warningMessageArgs, this.mentionsWarningPlaceholder);
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

        this.textBoxControl.addMentionsCallback("onCreateMention", onCreateMention);
        this.textBoxControl.addMentionsCallback("onRemoveMention", onRemoveMention);
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
    
    _getTextFromTextArea: function() {
        return this.textBoxControl.getText();
    },
    
    _setTextForTextArea: function(text) {
        this.textBoxControl.setText(text);
    },

    _onFocusSubclassSkip: function() {
        // due to CKE iFrame being contained within dijit, when tabbing from within the iFrame
        // to another element of the dijit, a unneeded onFocus is called on the dijit
        if (this._fileAttachWidget
                && document.activeElement === this._fileAttachWidget.attachActionButtonNode) {
            return true;
        } else if (document.activeElement === this.commentPostActoin) {
            return true;
        }
        return false;
    },
    
    _onBlurSubclassSkip : function(){
        // due to CKE iFrame being contained within dijit, when tabbing to iFrame
        // from within another dijit element, a unneeded onBlur is called on the dijit
        return this.textBoxControl.isFocused();
    },
    
    _focusTextArea: function() {
        this._processTextPopulatation();
        
        this.textBoxControl.setFocus();

        if(this.checkLoginOrPerm){
            this._checkLogin();
            // show after permission check, since the not permitted case is rare
            this.checkPermission();
        }
    },
    
    expandTextArea: function() {
        this.textBoxControl.expandTextBox();
        this.textBoxControl._hideShadowText();
    },

    collapseTextArea: function() {
        this.textBoxControl.resetBox();
        this.textBoxControl.collapseTextBox();
        this.textBoxControl._showShadowText();
    },
    
    _processTextPopulatation: function() {        
        this._calculateRemainingCharacters();  
        this._showHideCommentLengthError();        
        this._enableDisablePostAction();
    },
    
    _calculateRemainingCharacters: function() {
        var commentLength = lconn.core.util.text.length(dojo.string.trim(this.textBoxControl.getText()));
        var remainingChars = this.maxCount - commentLength;
        
        this._remainingChars = remainingChars;       
    },
    
    _showHideCommentLengthError: function() {
        if (this._remainingChars <= -1) {            
            // IE8 doesn't support textContent
            if ('textContent' in this.commentFailureTextAP) {
                this.commentFailureTextAP.textContent = this.strings.commentLengthExceeded;
            } else {
                this.commentFailureTextAP.innerText = this.strings.commentLengthExceeded;
            }

            dojo.removeClass(this.commentErrorAP, "lotusHidden");
        } else {
            dojo.addClass(this.commentErrorAP, "lotusHidden");
        }        
    },
    
    _enableDisablePostAction: function() {
        if (this._remainingChars >= 0 && this._remainingChars != this.maxCount) {
            this.enableAction()
        } else {
            this.disablePostAction();
        }
    },

    resetNoDeselectEvent: function () {
        this.collapseTextArea();
        // Clear up the mentions helper.
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
        this.setIsCommenting(false);
        this.dirty = false;
        dojo.publish(com.ibm.social.as.constants.events.PAGECLEAN, ["asComment"]);
    },

    cancel: function () {
        if (!this.cancelDisabled) {
            this._inPublicCommunity = undefined;
            if (this._fileAttachWidget && this._fileAttachWidget.hasFileSelected()) {
                this._fileAttachWidget.removeAttachment();
            }
        }

        this.inherited(arguments);
    },

    _postFileCallback: function (resp) {
        var comment = this._formatMentionsContent(this.textBoxControl.getTrackedMentions());

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
            var comment = this._formatMentionsContent(this.textBoxControl.getTrackedMentions());
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

    _formatMentionsContent: function (postText) {
        var formattedText = "";
        formattedText = this._mentionsDataFormatter.formatData(postText);
        return formattedText;
    },

    onKeyPress : function() {
    },
    
    onInput : function() {
    }
});