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

dojo.provide("com.ibm.social.ee.gadget._EEGadget");

dojo.require("com.ibm.social.ee.util.misc");
dojo.require("com.ibm.lconn.layout.people");
dojo.requireLocalization("com.ibm.social.ee", "socialEEStrings");
dojo.require("com.ibm.social.as.item.SharedExternally");

/* globals com, lconn */

dojo.declare("com.ibm.social.ee.gadget._EEGadget", null, {

    // Blank Gif
    _blankGif: null,
    nls: null,

    constructor: function () {
        this._blankGif = dojo.config.blankGif;
        this.nls = dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings");
    },

    // To be implemented by subclasses and mixins to initialize the UI
    initializeUI: function () {
    },
    destroyUI: function () {
    },

    postCreate: function () {
        this.inherited(arguments);

        if (this.isSharedExternally()) {
            this.sharedExternally = new com.ibm.social.as.item.SharedExternally({}, this.sharedExternally);
        }
    },

    isSharedExternally: function () {

        return this.context && this.context.isSharedExternally;
    },

    // Common utility functions
    getProfilesRoutes: function () {
        if (!this.profilesRoutes) {
            this.profilesRoutes = new com.ibm.social.ee.data.ProfilesRoutes(this.getRouteOptions());
        }
        return this.profilesRoutes;
    },

    getRouteOptions: function () {
        return {
            oauth: this.routes.oauth,
            anonymous: this.routes.anonymous,
            network: this.routes.network
        };
    },

    _isValidUser: function (user) {
        var sysId = "00000000-0000-0000-0000-000000000000";
        return user.id !== sysId;
    },

    generateUserImage: function (user, el, width, height, cssFloat, opt) {
        opt = opt || {};
        var peopleLayout = dojo.getObject("com.ibm.lconn.layout.people");
        if (peopleLayout && peopleLayout.isImageEnabled()) {
            var optGenerateLink = opt.hasOwnProperty("generateLink") ? opt.generateLink : true;
            var generateLink = this._isValidUser(user) && optGenerateLink;
            var imageContainer = peopleLayout.createImage(user, width, generateLink);
            el.appendChild(imageContainer);
            if (generateLink) {
                dojo.attr(imageContainer, "target", "_blank");
                if (opt.title && user.name) {
                    imageContainer.title = dojo.string.substitute(opt.title, { user: user.name });
                }
            }
            else {
                imageContainer.title = "";
            }
            return imageContainer;
        }
        else {
            var id = (user && user.id) ? com.ibm.social.ee.util.misc.getItemId(user.id) : "";
            var profilesRoutes = this.getProfilesRoutes();
            var src = profilesRoutes.getUserPhotoUrl(id);
            var person_href = el;
            if (profilesRoutes.isServiceEnabled()) {
                person_href = dojo.create("a", {className: "lotusPerson vcard fn", href: profilesRoutes.getUserProfileUrl(id), target: "_blank"}, el);
                if (opt.title && user.name) {
                    person_href.title = dojo.string.substitute(opt.title, {user: user.name});
                }
            }

            return this.createThumbnail(dojo.doc, person_href, src, width, height, cssFloat, opt);
        }
    },

    createThumbnail: function (d, el, src, width, height, cssFloat, opt) {
        if (!src) {
            return null;
        }
        width = width || height;
        height = height || width;
        var img = dojo.create("img", {src: src}, el);

        if (cssFloat === "left") {
            dojo.addClass(img, "lotusLeft");
        }
        else if (cssFloat === "right") {
            dojo.addClass(img, "lotusRight");
        }
        img.style.width = width + "px";
        img.style.height = height + "px";
        var span = dojo.create("span", null, el);

        opt = opt || {imagePop: true};
        img.alt = opt.alt || "";
        return img;
    },

    generateLinkToPerson: function (user, div) {
        this.formatUserName(user, div);
    },

    generateUserLink: function (div, user) {
        this.formatUserName(user, div);
    },
    formatUserName: function (user, div, preventEEActionLinksCss, personString) {
        if (dojo.getObject("com.ibm.lconn.layout.people.createLink")) {
            var a = com.ibm.lconn.layout.people.createLink({userid: user.userid || user.id, state: user.state, name: user.name, email: user.email});
            if (a) {
                if (!preventEEActionLinksCss) {
                    dojo.addClass(a, "eeActionLinks");
                }
                dojo.attr(a, "target", "_blank");
                dojo.removeAttr(a, "aria-describedby");
                if (personString || (this.nls && this.nls.common)) {
                    dojo.attr(a, "title", dojo.string.substitute(personString || this.nls.common.PERSON_TITLE, {user: user.name}));
                }
                dojo.empty(div);
                div.appendChild(a);
            }
        }
    },

    onSizeChange: function (height) {
    },

    addSharedExternallyWidget: function (node) {

        if (this.isSharedExternally()) {
            var sharedExternallyNode = dojo.create("span");
            dojo.place(sharedExternallyNode, node, "after");
            this.sharedExternally = new com.ibm.social.as.item.SharedExternally({}, sharedExternallyNode);
        }
    }
});