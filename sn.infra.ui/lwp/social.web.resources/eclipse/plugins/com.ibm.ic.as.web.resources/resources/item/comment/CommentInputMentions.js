/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom",
		"dojo/dom-attr",
		"dojo/dom-class",
		"dojo/i18n!ic-ublog/nls/MentionsExtra",
		"dojo/json",
		"dojo/string",
		"com/ibm/ajax/auth",
		"ic-news/microblogging/sharebox/CommunityVisibilityUtil",
		"ic-as/constants/events",
		"ic-as/config/enablement",
		"ic-as/item/comment/FileAttach",
		"ic-core/config/properties",
		"ic-core/widget/mentions/utilities",
		"ic-news/microblogging/sharebox/MentionsWarningMessage",
		"ic-news/microblogging/sharebox/data/ExternalUserAccessChecker",
		"ic-news/microblogging/sharebox/data/MentionsCommunityMemberChecker",
		"ic-news/microblogging/sharebox/data/MentionsDataFormatter",
		"ic-news/microblogging/sharebox/data/SmartCloudVisibilityChecker"
	], function (dojo, declare, lang, dom, domAttr, domClass, i18nMentionsExtra, JSON, string, auth, CommunityVisibilityUtil, events, enablement, FileAttach, properties, utilities, MentionsWarningMessage, ExternalUserAccessChecker, MentionsCommunityMemberChecker, MentionsDataFormatter, SmartCloudVisibilityChecker) {
	
		/**
		 * Class that allows commenting with mentions in the ActivityStream.
		 * @author Jim Antill
		 */
		
		/* globals activityStreamAbstractHelper, com, lconn */
		
		var CommentInputMentions = declare("com.ibm.social.as.item.comment.CommentInputMentions",
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
		            this._extraResourceBundle = i18nMentionsExtra;
		        },
		
		        _onFocus: function () {
		
		            this.expand();
		            this.inherited(arguments);
		        },
		
		        postCreate: function () {
		            this.inherited(arguments);
		
		            // Inherited sets created to true - but we haven't finished yet.
		            this.created = false;
		
		            this._mentionsDataFormatter = new MentionsDataFormatter();
		
		            var eventCallbacks = {};
		            eventCallbacks.onkeypress = lang.hitch(this, this.onInput);
		
		            var argsForHelper = {};
		
		            argsForHelper.inputField = this.commentTextAP;
		            argsForHelper.multiline = true;
		            argsForHelper.network = activityStreamAbstractHelper;
		            argsForHelper.disableBizCard = activityStreamAbstractHelper.isGadget;
		            argsForHelper.context = {environment: this.environment};
		
		            eventCallbacks.onfocus = lang.hitch(this, this._onFocus);
		
		            argsForHelper.eventHandles = eventCallbacks;
		
		            this._mentionsHelper =
		                lconn.core.lcTextArea.providers.addMentionsFeature(this.commentTextAP, eventCallbacks, null, argsForHelper);
		
		            this.commentTextAP = this._mentionsHelper.textAreaNode;
		
		            this.isSmartCloud = utilities.isSmartCloud({environment: this.environment});
		
		            /* The defaultTypeaheadHeader attribute contains what we want to show if we're not in
		             * a private community etc. */
		            if (this.isSmartCloud) {
		                this._defaultTypeaheadHeader = this._extraResourceBundle.WARNING_SMARTCLOUD_TOOLTIP_COMMENT;
		            }
		
		            //is visitorModel enabled?
		            this.isVisitorModelEnabled = properties.visitorModelEnabled === "true";
		
		            this._mentionsHelper.setTypeaheadHeader(this._defaultTypeaheadHeader);
		            CommunityVisibilityUtil.setUseOauth(activityStreamAbstractHelper.useOauth);
		
		            // Set up the private community checking functionality.
		            this._setupPrivateCommunityChecker();
		
		            // Check visibility of a community if we are in one.
		            if (this.newsItem.newsData.connections.communityid) {
		                this._communityId = this.newsItem.newsData.connections.communityid.replace(this._communityPrefix, "");
		                CommunityVisibilityUtil.isCommunityPublic(this._communityId).addCallback(
		                    lang.hitch(this, function (isPublic) {
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
		
		                if (enablement.checkEnablement(enablement.AS_COMMENT_FILE_ATTACH) ||
		                    enablement.checkEnablement(enablement.AS_COMMENT_FILE_ATTACH_ATT)) {
		                    this._fileAttachWidget = new FileAttach({communityId: this._communityId}, this.commentFileAttachContainer);
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
		
		            this._mentionsWarningMessage = new MentionsWarningMessage(warningMessageArgs, this.mentionsWarningPlaceholder);
		        },
		        /**
		         * Utility function to set up the routines that check membership of
		         * private communities.
		         */
		        _setupPrivateCommunityChecker: function () {
		            // Create the mentions checker.
		            this._communityChecker = new MentionsCommunityMemberChecker();
		            this._smartCloudChecker = new SmartCloudVisibilityChecker();
		            this._externalUserChecker = new ExternalUserAccessChecker();
		
		            // Callbacks that hook into the mentionshelper, firing when mentions are added or removed.
		            var onCreateMention =
		                lang.hitch(this,
		                    function (user) {
		                        this._updateRemainingChars();
		
		                        if (this._communityId) {
		                            this.disablePostAction();
		
		                            if (typeof this._inPublicCommunity === "undefined") {
		                                CommunityVisibilityUtil.isCommunityPublic(this._communityId)
		                                    .addCallback(lang.hitch(this, function (isPublic) {
		
		                                        this._inPublicCommunity = isPublic;
		
		                                        lang.hitch(this, this._privateCommunityMentionAdd(user, this._communityId));
		                                    }));
		                            } else {
		                                lang.hitch(this, this._privateCommunityMentionAdd(user, this._communityId));
		                            }
		                        } else {
		                            this._smartCloudMentionAdd(user);
		                        }
		                    });
		
		            var onRemoveMention =
		                lang.hitch(this,
		                    function (user) {
		                        this._updateRemainingChars();
		
		                        if (this._communityId) {
		                            if (typeof this._inPublicCommunity === "undefined") {
		                                CommunityVisibilityUtil.isCommunityPublic(this._communityId)
		                                    .addCallback(lang.hitch(this, function (isPublic) {
		
		                                        this._inPublicCommunity = isPublic;
		
		                                        lang.hitch(this, this._privateCommunityMentionRemoval(user));
		                                    }));
		                            } else {
		                                lang.hitch(this, this._privateCommunityMentionRemoval(user));
		                            }
		                        } else {
		                            this._smartCloudMentionRemoval(user);
		                        }
		                    });
		
		            var nonMemberOfPrivateCommunity = lang.hitch(this,
		                function (user) {
		                    this._mentionsWarningMessage.addUser(user);
		                    user.removeSymbol();
		                    this._mentionsWarningMessage.showMessage();
		                });
		
		            var memberOfPrivateCommunity = lang.hitch(this,
		                function (user) {
		                    user.addSymbol();
		                    this._mentionsWarningMessage.removeUser(user);
		                });
		
		            var checkCompleteCallback = lang.hitch(this,
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
		            domClass.remove(this.commentTextAP, "lotusTextCollapsed");
		            domAttr.set(this.commentTextAP, "placeholder", "");
		
		           this.showActions();
		        },
		
		        /**
		         * Collapse the text area and update the placeholder text
		         */
		        collapseTextArea: function () {
		            domClass.add(this.commentTextAP, "lotusTextCollapsed");
		            domAttr.set(this.commentTextAP, "placeholder", this.strings.addCommentText);
		            this._mentionsHelper.setShadowText();
		            domClass.add(this.commentCountdownContainer, "lotusHidden");
		        },
		
		        _updateRemainingChars: function () {
		            this.maxCount = com.ibm.social.as.comment.commentInputManager.maxCount;
		            
		            if (!this.created) {
		                return;
		            }
		
		            var remainingChars = this.maxCount - this._mentionsHelper.getText().replace(/^\s*/, "").length;
		
		            if (remainingChars > this.showCharCount) {
		                domClass.add(this.commentCountdownContainer, "lotusHidden");
		            } else {
		                domClass.remove(this.commentCountdownContainer, "lotusHidden");
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
		                domClass.remove(this.commentErrorAP, "lotusHidden");
		            } else {
		                domClass.add(this.commentErrorAP, "lotusHidden");
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
		                deferred.then(lang.hitch(this, "_postFileCallback"));
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
		                postData: JSON.stringify(commentObj),
		                headers: {"Content-Type": "application/json; charset=utf-8"},
		                handleAs: "json",
		                handle: function (response) {
		                    _this._resetDefaultHandler();
		
		                    if (response instanceof Error || response instanceof SyntaxError) {
		                        if (typeof response.dojoType !== 'undefined' && response.dojoType === "unauthenticated") {
		                            _this.showCommentError(string.substitute(_this.strings.commentSessionTimedOut, ["/homepage"]));
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
		                    var ariaMessageDiv = dom.byId("hiddenAriaMessage");
		
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
		                    domClass.add(this.addCommentAP, "lotusHidden");
		                } else {
		                    domClass.remove(this.addCommentAP, "lotusHidden");
		                    this.hideActions();
		                }
		            }

		            this._resetNoDeselectEventSetFocus(inlineComments);
		            this._remainingChars = this.maxCount;
		            this.commentCountdownAP.innerHTML = this._remainingChars;
		            this.setIsCommenting(false);
		            this.dirty = false;
		            topic.publish(events.PAGECLEAN, "asComment");
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
		return CommentInputMentions;
	});
