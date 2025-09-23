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
dojo.provide("com.ibm.social.ee.widget.MentionsTextArea");

dojo.require("lconn.core.lcTextArea.widgets.ExpandingTextBox");
dojo.require("com.ibm.social.ee.data.PeopleDataStore");
dojo.require("dijit.form.Textarea");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("com.ibm.social.incontext.util.url");
dojo.require("lconn.news.microblogging.sharebox.data.MentionsCommunityMemberChecker");
dojo.require("lconn.news.microblogging.sharebox.MentionsWarningMessage");
dojo.require("lconn.news.microblogging.sharebox.data.SmartCloudAccessChecker");
dojo.require("lconn.news.microblogging.sharebox.data.ExternalUserAccessChecker");
dojo.require("lconn.core.auth");
dojo.require("com.ibm.social.incontext.util.urn");

/* globals com, gadgets, lconn */

dojo.declare("com.ibm.social.ee.widget.MentionsCommunityMemberChecker", lconn.news.microblogging.sharebox.data.MentionsCommunityMemberChecker, {
    constructor: function (args) {
        dojo.mixin(this, args);
    },
    _networkGet: function (opts) {
        if (opts.url && opts.url.indexOf("/rest/people") !== -1) { // Use oauth endpoint
            opts.url = opts.url.replace("/rest/people", "/oauth/rest/people");
        }
        if (opts.url && opts.content) { // put parameters in Url
            opts.url = com.ibm.social.incontext.util.url.rewrite(opts.url, opts.content);
        }

        this.network.get(opts);
    }
});

dojo.declare("com.ibm.social.ee.widget.TextAreaWidget", [dijit.form.Textarea], {
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


dojo.declare("com.ibm.social.ee.widget.MentionsTextArea", [lconn.core.lcTextArea.widgets.ExpandingTextBox], {

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
            this._extraResourceBundle = dojo.i18n.getLocalization("com.ibm.social.ublog", "MentionsExtra");
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
        this.isVisitorModelEnabled = lconn.core.config.properties.visitorModelEnabled === "true";

        if (this.mentionsEnabled) {
            var opts = {
                url: lconn.core.url.getServiceUrl(lconn.core.config.services.opensocial) + "/anonymous/rest/people/@public/@all",
                queryParam: "filterValue",
                openSocialParameters: {  filterBy: "displayName" },
                network: this.network
            };
            this.memberStore = new com.ibm.social.ee.data.PeopleDataStore(opts);
        }
        this.inherited(arguments);
        if (this.mentionsEnabled) {

            this.connect(this, "onChange", "checkHeight");
            this.connect(this, "onFocus", "checkHeight");
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
            dojo.attr(this.textAreaNode, "aria-label", this.ariaLabel || this.shadowText);
        }
        else {
            this.connect(this.textArea, "onHeightChanged", "onHeightChanged");
        }
    },
    checkHeight: function () {
        window.setTimeout(dojo.hitch(this, function () {
            if (this.previousHeight) {
                if (dojo.position(this.textAreaNode).h !== this.previousHeight) {
                    this.onHeightChanged();
                    this.previousHeight = dojo.position(this.textAreaNode).h;
                }
            }
            else {
                this.previousHeight = dojo.position(this.textAreaNode).h;
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

        this._originalAriaLiveRegionState = dijit.getWaiState(ariaLabelMentionsNode, "live");
    },
    _changeAriaLiveRegionState: function(/*string*/ stateValue){
        var ariaLabelMentionsNode = this._getAriaLabelMentionsNode();

        if(ariaLabelMentionsNode && stateValue){
            dijit.setWaiState(ariaLabelMentionsNode, "live", stateValue);
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
       var user = lconn.core.auth.getUser();
       if (user){
          this.organizationId = com.ibm.social.incontext.util.urn.getOrganizationIdFromURN(user.orgId);
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
        this._smartCloudChecker = new lconn.news.microblogging.sharebox.data.SmartCloudAccessChecker();
        this._externalUserChecker = new lconn.news.microblogging.sharebox.data.ExternalUserAccessChecker();

        // Callbacks that hook into the mentionshelper, firing when mentions are added or removed.
        var onCreateMention =
            dojo.hitch(this,
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
            dojo.hitch(this,
                function (user) {
                    this._mentionRemoval(user);
                }
            );

        // Create the mentions helper message.
        var warningMessageArgs = {};

        if ((this.isSmartCloud || this.isVisitorModelEnabled) && !this._inCommunityPrivate) {
            warningMessageArgs.promptKey = "WARNING_SMARTCLOUD_GENERIC";
        }

        this._mentionsWarningMessage = new lconn.news.microblogging.sharebox.MentionsWarningMessage(warningMessageArgs, this.mentionsWarningPlaceholder);
        dojo.addClass(this._mentionsWarningMessage.domNode, "mentionsWarning");

        var nonMemberOfPrivateCommunity = dojo.hitch(this,
            function (user) {
                this._mentionsWarningMessage.addUser(user);
                user.removeSymbol();
                this._mentionsWarningMessage.showMessage();
                this.onHeightChanged();
            });

        var memberOfPrivateCommunity = dojo.hitch(this,
            function (user) {
                user.addSymbol();
                this._mentionsWarningMessage.removeUser(user);
                this.onHeightChanged();
            });

        var checkCompleteCallback = dojo.hitch(this,
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
            dojo.hitch(this,
                function (user) {
                    this.disablePostAction();
                    this._visibilityChecker.checkAccess(user);
                }
            );

        var onRemoveMention =
            dojo.hitch(this,
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

        this._mentionsWarningMessage = new lconn.news.microblogging.sharebox.MentionsWarningMessage(warningMsgOpts, this.mentionsWarningPlaceholder);
        dojo.addClass(this._mentionsWarningMessage.domNode, "mentionsWarning");

        var nonMemberOfPrivateCommunity = dojo.hitch(this,
            function (user) {
                this._mentionsWarningMessage.addUser(user);
                user.removeSymbol();
                this._mentionsWarningMessage.showMessage();
                this.onHeightChanged();
            });

        var memberOfPrivateCommunity = dojo.hitch(this,
            function (user) {
                user.addSymbol();
                this._mentionsWarningMessage.removeUser(user);
                this.onHeightChanged();
            });

        var checkCompleteCallback = dojo.hitch(this,
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
        /*
         var typeAhead = this._mentionsHelper.typeaheadField;
         typeAhead.__originalShowResultList = typeAhead._showResultList;
         typeAhead.__originalHideResultList = typeAhead._hideResultList;
         var adjustHeight = dojo.hitch(this, function () {
         var taPosition = dojo.position(this.textAreaNode, true); 
         var minHeight = taPosition.y + taPosition.h + this.POPUPHEIGHT;
         var currentHeight = dojo.position(dojo.body()).h;
         var height = Math.max(minHeight, currentHeight);
         this.onHeightChanged(height, true); // Pass flag to not scroll to the bottom
         });
         var self = this;
         typeAhead._showResultList = function() {
         var args = arguments;
         adjustHeight();
         window.setTimeout(dojo.hitch(this, function() { 
         this.__originalShowResultList.apply(this, args);
         self.onHeightChanged();
         }), 50);
         };

         typeAhead._hideResultList = function() {
         var args = arguments;
         this.__originalHideResultList.apply(this, args);
         self.onHeightChanged();
         };
         */

        var leftPosition;
        var self = this;

        function getHorizontalPosition() {
            if (leftPosition === undefined) {
                leftPosition = Math.floor(dojo.position(self.domNode, true).x);
            }
            return leftPosition;
        }

        this._mentionsHelper.positionTypeahead = function () {
            var node = this._currentNode;
            if (node) {
                var pos = dojo.position(node.domNode, true);
                var popupPos = {
                    top: (pos.y + pos.h - 5) + "px"
                };
                if (dojo._isBodyLtr()) {
                    popupPos.left = getHorizontalPosition() + "px";
                }
                else {
                    popupPos.right = getHorizontalPosition() + "px";
                }
                dojo.style(this.getActiveType_Field().domNode, popupPos);
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