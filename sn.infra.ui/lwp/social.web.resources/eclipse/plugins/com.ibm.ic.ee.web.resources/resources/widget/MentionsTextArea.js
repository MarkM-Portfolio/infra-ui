/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/dom-geometry",
	"dojo/dom-style",
	"dojo/on",
	"dijit/form/Textarea",
	"ic-core/auth",
	"ic-news/microblogging/sharebox/data/MentionsCommunityMemberChecker",
	"ic-core/lcTextArea/widgets/ExpandingTextBox",
	"ic-core/config/properties",
	"ic-core/config/services",
	"ic-core/url",
	"ic-ee/data/PeopleDataStore",
	"ic-incontext/util/url",
	"ic-incontext/util/urn",
	"ic-news/microblogging/sharebox/MentionsWarningMessage",
	"ic-news/microblogging/sharebox/data/ExternalUserAccessChecker",
	"ic-news/microblogging/sharebox/data/SmartCloudAccessChecker"
], function (dojo, declare, lang, domAttr, domClass, domGeometry, domStyle, on, Textarea, auth, MentionsCommunityMemberChecker, ExpandingTextBox, properties, services, url, PeopleDataStore, ibmSocialIncontextUtilUrl, urn, MentionsWarningMessage, ExternalUserAccessChecker, SmartCloudAccessChecker) {

	/* globals com, gadgets, lconn */
	
	declare("com.ibm.social.ee.widget.MentionsCommunityMemberChecker", MentionsCommunityMemberChecker, {
	    constructor: function (args) {
	        lang.mixin(this, args);
	    },
	    _networkGet: function (opts) {
	        if (opts.url && opts.url.indexOf("/rest/people") !== -1) { // Use oauth endpoint
	            opts.url = opts.url.replace("/rest/people", "/oauth/rest/people");
	        }
	        if (opts.url && opts.content) { // put parameters in Url
	            opts.url = ibmSocialIncontextUtilUrl.rewrite(opts.url, opts.content);
	        }
	
	        this.network.get(opts);
	    }
	});
	
	declare("com.ibm.social.ee.widget.TextAreaWidget", Textarea, {
	    _onInput: function () {
	        var initialHeight = this.textbox.style.height;
	        this.inherited(arguments);
	        if (initialHeight && this.textbox.style.height !== initialHeight) {
	            this.onHeightChanged();
	        }
	    },
	    onHeightChanged: function () {
	    }
	});
	
	
	var MentionsTextArea = declare("com.ibm.social.ee.widget.MentionsTextArea", ExpandingTextBox, {
	
	    textAreaClass: "com.ibm.social.ee.widget.TextAreaWidget",
	    POPUPHEIGHT: 470,
	    isEE: true,
	    isSmartCloud: false,
	    _communityChecker: null,
	    _smartCloudChecker: null,
	    isVisitorModelEnabled: null,
	    _externalUserChecker: null,
	    _originalAriaLiveRegionState: null,
	    organizationId: null,
	
	    postMixInProperties: function () {
	        this.inherited(arguments);
	        if (this.mentionsEnabled) {
	            this._extraResourceBundle = i18nMentionsExtra;
	            this._communityId = this.mentionsOpts.communityId;
	            this._inCommunityPrivate = this.mentionsOpts.communityId && !this.mentionsOpts.isPublic;
	            this._visibilityChecker = this.mentionsOpts.visibilityChecker;
	        }
	    },
	    postCreate: function () {
	
	        //is SmartCloud?
	        this.isSmartCloud = gadgets.util.hasFeature("smartcloud3");
	
	        //set the orgId value
	        this._initOrganizationId();
	
	        //is visitorModel enabled?
	        this.isVisitorModelEnabled = properties.visitorModelEnabled === "true";
	
	        if (this.mentionsEnabled) {
	            var opts = {
	                url: url.getServiceUrl(services.opensocial) + "/anonymous/rest/people/@public/@all",
	                queryParam: "filterValue",
	                openSocialParameters: {  filterBy: "displayName" },
	                network: this.network
	            };
	            this.memberStore = new PeopleDataStore(opts);
	        }
	        this.inherited(arguments);
	        if (this.mentionsEnabled) {
	
	            this.own(on(this, "Change", lang.hitch(this, "checkHeight")));
	            this.own(on(this, "onFocus",lang.hitch(this, "checkHeight")));
	            //custom visibility checker
	            if (this._visibilityChecker) {
	                this._setupVisibilityChecker();
	            } else {
	                this._setupAccessChecker();
	            }
	
	            // setup header tooltip when the community is private
	            if (this._inCommunityPrivate) {
	                this.setTypeAheadHeader(this._extraResourceBundle.WARNING_PRIVATE_COMMUNITY_TOOLTIP);
	            }
	
	            this._setupHeightListener();
	            domAttr.set(this.textAreaNode, "aria-label", this.ariaLabel || this.shadowText);
	        }
	        else {
	            this.own(on(this.textArea, "HeightChanged", lang.hitch(this, "onHeightChanged")));
	        }
	    },
	    checkHeight: function () {
	        window.setTimeout(lang.hitch(this, function () {
	            if (this.previousHeight) {
	                if (domGeometry.position(this.textAreaNode).h !== this.previousHeight) {
	                    this.onHeightChanged();
	                    this.previousHeight = domGeometry.position(this.textAreaNode).h;
	                }
	            }
	            else {
	                this.previousHeight = domGeometry.position(this.textAreaNode).h;
	            }
	        }), 50);
	    },
	    onHeightChanged: function () {
	    },
	    focus: function () {
	        this.setFocus();
	    },
	    _onFocus: function(){
	        this.inherited(arguments);
	
	        this.turnOnAriaLiveRegion();
	    },
	    turnOffAriaLiveRegion: function(){
	
	        this._saveAriaLiveRegionState();
	        this._changeAriaLiveRegionState("off");
	    },
	    turnOnAriaLiveRegion: function(){
	        this._changeAriaLiveRegionState(this._originalAriaLiveRegionState);
	    },
	    _saveAriaLiveRegionState: function() {
	        var ariaLabelMentionsNode = this._getAriaLabelMentionsNode();
	
	        this._originalAriaLiveRegionState = ariaLabelMentionsNode.getAttribute("live");
	    },
	    _changeAriaLiveRegionState: function(/*string*/ stateValue){
	        var ariaLabelMentionsNode = this._getAriaLabelMentionsNode();
	
	        if(ariaLabelMentionsNode && stateValue){
	            ariaLabelMentionsNode.setAttribute("live", stateValue);
	        }
	    },
	    _getAriaLabelMentionsNode: function(){
	        if(this._mentionsHelper){
	            return this._mentionsHelper.ariaLabel;
	        }
	    },
	    _privateCommunityMentionAdd: function (user) {
	
	        var defList = this._communityChecker.checkMembersInCommunity(
	            [user],
	            this._communityId,
	            this._communityCheckerCallbacks
	        );
	    },
	
	    /**
	     * Sets this.organizationId to the currentUser orgId.
	     *
	     * @returns {string} - the logged user organization ID.
	     * @private
	     */
	    _initOrganizationId: function(){
	       var user = auth.getUser();
	       if (user){
	          this.organizationId = urn.getOrganizationIdFromURN(user.orgId);
	       }
	    },
	
	    _smartCloudMentionAdd: function (user) {
	        if (this.isSmartCloud && this.organizationId) {
	            var options = {orgId: this.organizationId};
	            this._smartCloudChecker.checkAccess(user, this._communityCheckerCallbacks, options);
	        } else if (this.isVisitorModelEnabled) {
	            this._externalUserChecker.checkAccess(user, this._communityCheckerCallbacks);
	        } else {
	            this.enablePostAction();
	        }
	    },
	
	    _mentionRemoval: function (user) {
	
	        if (this._mentionsWarningMessage.getNumberUsers() > 0) {
	
	            this._mentionsWarningMessage.removeUser(user);
	
	            if (this._mentionsWarningMessage.getNumberUsers() === 0) {
	                this._mentionsWarningMessage.hideMessage();
	            }
	
	            this.onHeightChanged();
	        }
	    },
	
	    _setupAccessChecker: function () {
	        // Create the mentions checker.
	        this._communityChecker = new com.ibm.social.ee.widget.MentionsCommunityMemberChecker({ network: this.network });
	        this._smartCloudChecker = new SmartCloudAccessChecker();
	        this._externalUserChecker = new ExternalUserAccessChecker();
	
	        // Callbacks that hook into the mentionshelper, firing when mentions are added or removed.
	        var onCreateMention =
	            lang.hitch(this,
	                function (user) {
	                    this.disablePostAction();
	
	                    if (this._inCommunityPrivate) {
	
	                        this._privateCommunityMentionAdd(user);
	                    } else {
	                        this._smartCloudMentionAdd(user);
	                    }
	                }
	            );
	
	        var onRemoveMention =
	            lang.hitch(this,
	                function (user) {
	                    this._mentionRemoval(user);
	                }
	            );
	
	        // Create the mentions helper message.
	        var warningMessageArgs = {};
	
	        if ((this.isSmartCloud || this.isVisitorModelEnabled) && !this._inCommunityPrivate) {
	            warningMessageArgs.promptKey = "WARNING_SMARTCLOUD_GENERIC";
	        }
	
	        this._mentionsWarningMessage = new MentionsWarningMessage(warningMessageArgs, this.mentionsWarningPlaceholder);
	        domClass.add(this._mentionsWarningMessage.domNode, "mentionsWarning");
	
	        var nonMemberOfPrivateCommunity = lang.hitch(this,
	            function (user) {
	                this._mentionsWarningMessage.addUser(user);
	                user.removeSymbol();
	                this._mentionsWarningMessage.showMessage();
	                this.onHeightChanged();
	            });
	
	        var memberOfPrivateCommunity = lang.hitch(this,
	            function (user) {
	                user.addSymbol();
	                this._mentionsWarningMessage.removeUser(user);
	                this.onHeightChanged();
	            });
	
	        var checkCompleteCallback = lang.hitch(this,
	            function () {
	                this.enablePostAction();
	                this.onHeightChanged();
	            }
	        );
	
	        this._communityCheckerCallbacks = {};
	        this._communityCheckerCallbacks.notMember = nonMemberOfPrivateCommunity;
	        this._communityCheckerCallbacks["isMember"] = memberOfPrivateCommunity;
	        this._communityCheckerCallbacks.onComplete = checkCompleteCallback;
	
	        this._mentionsHelper.addCallback("onCreateMention", onCreateMention);
	        this._mentionsHelper.addCallback("onRemoveMention", onRemoveMention);
	    },
	    _setupVisibilityChecker: function () {
	
	        // Callbacks that hook into the mentionshelper, firing when mentions are added or removed.
	        var onCreateMention =
	            lang.hitch(this,
	                function (user) {
	                    this.disablePostAction();
	                    this._visibilityChecker.checkAccess(user);
	                }
	            );
	
	        var onRemoveMention =
	            lang.hitch(this,
	                function (user) {
	                    this._mentionsWarningMessage.removeUser(user);
	
	                    if (this._mentionsWarningMessage.getNumberUsers() === 0) {
	                        this._mentionsWarningMessage.hideMessage();
	                    }
	
	                    this.onHeightChanged();
	                }
	            );
	
	        // Create the mentions helper message.
	        var warningMsgOpts = {};
	        var warningMessageKey = this._visibilityChecker.warningMessageKey;
	        if (warningMessageKey) {
	            warningMsgOpts = {promptKey: warningMessageKey};
	        }
	
	        this._mentionsWarningMessage = new MentionsWarningMessage(warningMsgOpts, this.mentionsWarningPlaceholder);
	        domClass.add(this._mentionsWarningMessage.domNode, "mentionsWarning");
	
	        var nonMemberOfPrivateCommunity = lang.hitch(this,
	            function (user) {
	                this._mentionsWarningMessage.addUser(user);
	                user.removeSymbol();
	                this._mentionsWarningMessage.showMessage();
	                this.onHeightChanged();
	            });
	
	        var memberOfPrivateCommunity = lang.hitch(this,
	            function (user) {
	                user.addSymbol();
	                this._mentionsWarningMessage.removeUser(user);
	                this.onHeightChanged();
	            });
	
	        var checkCompleteCallback = lang.hitch(this,
	            function () {
	                this.enablePostAction();
	                this.onHeightChanged();
	            }
	        );
	
	        // visibility checker callbacks
	        this._visibilityChecker.addCallback("notMember", nonMemberOfPrivateCommunity);
	        this._visibilityChecker.addCallback("isMember", memberOfPrivateCommunity);
	        this._visibilityChecker.addCallback("onComplete", checkCompleteCallback);
	
	        // mention helper callbacks
	        this._mentionsHelper.addCallback("onCreateMention", onCreateMention);
	        this._mentionsHelper.addCallback("onRemoveMention", onRemoveMention);
	    },
	    _setupHeightListener: function () {	       
	
	        var leftPosition;
	        var self = this;
	
	        function getHorizontalPosition() {
	            if (leftPosition === undefined) {
	                leftPosition = Math.floor(domGeometry.position(self.domNode, true).x);
	            }
	            return leftPosition;
	        }
	
	        this._mentionsHelper.positionTypeahead = function () {
	            var node = this._currentNode;
	            if (node) {
	                var pos = domGeometry.position(node.domNode, true);
	                var popupPos = {
	                    top: (pos.y + pos.h - 5) + "px"
	                };
	                if (domGeometry._isBodyLtr()) {
	                    popupPos.left = getHorizontalPosition() + "px";
	                }
	                else {
	                    popupPos.right = getHorizontalPosition() + "px";
	                }
	                domStyle.get(this.getActiveType_Field().domNode, popupPos);
	            }
	        };
	
	    },
	
	    resetBox: function () {
	        this.inherited(arguments);
	        if (this._mentionsWarningMessage) {
	            this._mentionsWarningMessage.cleanMessage();
	            this._mentionsWarningMessage.hideMessage();
	        }
	    }
	});
	return MentionsTextArea;
});
