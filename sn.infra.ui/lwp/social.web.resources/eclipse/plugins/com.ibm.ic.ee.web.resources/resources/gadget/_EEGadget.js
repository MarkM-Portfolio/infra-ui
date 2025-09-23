define([
	"dojo",
	"dojo/dom-attr",
	"dojo/_base/declare",
	"dojo/_base/config",
	"dojo/dom-construct",
	"dojo/_base/window",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/string",
	"com/ibm/lconn/layout/people",
	"ic-as/item/SharedExternally",
	"ic-ee/data/ProfilesRoutes",
	"ic-ee/util/misc"
], function (dojo, domAttr, declare, config, domConstruct, windowModule, i18nsocialEEStrings, lang, domClass, string, people, SharedExternally, ProfilesRoutes, misc) {

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	/* globals com, lconn */
	
	var _EEGadget = declare("com.ibm.social.ee.gadget._EEGadget", null, {
	
	    // Blank Gif
	    _blankGif: null,
	    nls: null,
	
	    constructor: function () {
	        this._blankGif = config.blankGif;
	        this.nls = i18nsocialEEStrings;
	    },
	
	    // To be implemented by subclasses and mixins to initialize the UI
	    initializeUI: function () {
	    },
	    destroyUI: function () {
	    },
	
	    postCreate: function () {
	        this.inherited(arguments);
	
	        if (this.isSharedExternally()) {
	            this.sharedExternally = new SharedExternally({}, this.sharedExternally);
	        }
	    },
	
	    isSharedExternally: function () {
	
	        return this.context && this.context.isSharedExternally;
	    },
	
	    // Common utility functions
	    getProfilesRoutes: function () {
	        if (!this.profilesRoutes) {
	            this.profilesRoutes = new ProfilesRoutes(this.getRouteOptions());
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
	        var createImage = lang.getObject("com.ibm.lconn.layout.people.createImage");
	        if (createImage && createImage.isImageEnabled()) {
	            var optGenerateLink = opt.hasOwnProperty("generateLink") ? opt.generateLink : true;
	            var generateLink = this._isValidUser(user) && optGenerateLink;
	            var imageContainer = people.createImage(user, width, generateLink);
	            el.appendChild(imageContainer);
	            if (generateLink) {
	                domAttr.set(imageContainer, "target", "_blank");
	                if (opt.title && user.name) {
	                    imageContainer.title = string.substitute(opt.title, { user: user.name });
	                }
	            }
	            else {
	                imageContainer.title = "";
	            }
	            return imageContainer;
	        }
	        else {
	            var id = (user && user.id) ? misc.getItemId(user.id) : "";
	            var profilesRoutes = this.getProfilesRoutes();
	            var src = profilesRoutes.getUserPhotoUrl(id);
	            var person_href = el;
	            if (profilesRoutes.isServiceEnabled()) {
	                person_href = domConstruct.create("a", {className: "lotusPerson vcard fn", href: profilesRoutes.getUserProfileUrl(id), target: "_blank"}, el);
	                if (opt.title && user.name) {
	                    person_href.title = string.substitute(opt.title, {user: user.name});
	                }
	            }
	
	            return this.createThumbnail(windowModule.doc, person_href, src, width, height, cssFloat, opt);
	        }
	    },
	
	    createThumbnail: function (d, el, src, width, height, cssFloat, opt) {
	        if (!src) {
	            return null;
	        }
	        width = width || height;
	        height = height || width;
	        var img = domConstruct.create("img", {src: src}, el);
	
	        if (cssFloat === "left") {
	            domClass.add(img, "lotusLeft");
	        }
	        else if (cssFloat === "right") {
	            domClass.add(img, "lotusRight");
	        }
	        img.style.width = width + "px";
	        img.style.height = height + "px";
	        var span = domConstruct.create("span", null, el);
	
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
	        if (lang.getObject("com.ibm.lconn.layout.people.createLink")) {
	            var a = people.createLink({userid: user.userid || user.id, state: user.state, name: user.name, email: user.email});
	            if (a) {
	                if (!preventEEActionLinksCss) {
	                    domClass.add(a, "eeActionLinks");
	                }
	                domAttr.set(a, "target", "_blank");
	                domAttr.remove(a, "aria-describedby");
	                if (personString || (this.nls && this.nls.common)) {
	                    domAttr.set(a, "title", string.substitute(personString || this.nls.common.PERSON_TITLE, {user: user.name}));
	                }
	                domConstruct.empty(div);
	                div.appendChild(a);
	            }
	        }
	    },
	
	    onSizeChange: function (height) {
	    },
	
	    addSharedExternallyWidget: function (node) {
	
	        if (this.isSharedExternally()) {
	            var sharedExternallyNode = domConstruct.create("span");
	            domConstruct.place(sharedExternallyNode, node, "after");
	            this.sharedExternally = new SharedExternally({}, sharedExternallyNode);
	        }
	    }
	});
	return _EEGadget;
});
