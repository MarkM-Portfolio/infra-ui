/* Copyright IBM Corp. 2016  All Rights Reserved.              */

define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/TypeAheadBox.html",
    "dojo/text!./templates/TypeAheadBoxMulti.html",
    "dojo/_base/lang",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/dom-attr",
    "../config/globals",
    "dojo/aspect",
    "dojo/_base/array",
    "dojo/on",
    "dojox/validate/web",
    "dojo/dom",
    "dojo/_base/config",
    "dojo/topic",
    "dojo/i18n!../nls/FileViewerStrings",
    "./typeAheadFactory",
    "dojo/string",
    "dojo/dom-attr",
    "dojo/when",
    "../panels/SharingWidget"
], function (declare, _WidgetBase, _TemplatedMixin, template, templateMulti, lang, domStyle, domClass, domConstruct,
             domAttr, globals, aspect, array, on, validate, dom, config, topic, i18n, typeAheadFactory, string, domAttr, when,
             SharingWidget) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,

        showShadowText: true,
        cancelOnBlur: false,
        searchCommunity: false,
        userInfo: {},

        constructor: function (args) {
            if (args.isMulti)
                this.templateString = templateMulti;

            this.pendingUsers = [];
            this.pendingCommunities = [];
            this.pendingEmails = [];
            this.userInfo = this._getUserInfo();
        },
        
        _getUserInfo: function(){
            var userInfoJson
            var userInfo = document.getElementById('userInfo');
            if(userInfo) {
               userInfoJson = JSON.parse(userInfo.innerText);
            } else {
         	  var userInfoParent = parent.document.getElementById('userInfo');
         	  if(userInfoParent)
                 userInfoJson = JSON.parse(userInfoParent.innerText);
         	  else
                 userInfoJson = lconn.core.auth.getUser();
            }
            
            return userInfoJson;
        },

        postMixInProperties: function () {
            this.nls = i18n.TYPEAHEAD_BOX;
            this.shareNLS = i18n.SHARE;
            this._saveText = this.nls.SAVE;
            this.blank = config.blankGif || dijit._WidgetBase.prototype._blankGif;

            if (!this.nls.ROLE_LABEL)
                this.nls.ROLE_LABEL = "Role";

            if (!this.nls.ROLE_EDIT)
                this.nls.ROLE_EDIT = "Editor";

            if (!this.nls.ROLE_VIEW)
                this.nls.ROLE_VIEW = "Reader";

            if (!this.nls.ADD_OPTIONAL_MESSAGE)
                this.nls.ADD_OPTIONAL_MESSAGE = "Add Optional Message";
            if (!this.nls.MEMBER_TYPE)
                this.nls.MEMBER_TYPE = "Member Type";
        },

        postCreate: function () {
            domStyle.set(this.textarea, "display", "none");
            domClass.add(this.domNode, "active");

            this.setupEveryoneOption();
            this.setupSelectorOptions();

            this._setupUserTypeahead();

            this._disableButton(this.manualAdd);

            if (this.isMulti && this.roleSelector && this.defaultRole) {
                array.forEach(this.roleSelector.options, lang.hitch(this, function (option) {
                    if (option.value === this.defaultRole) {
                        domAttr.set(option, "selected", true);
                    }
                }));
            }

            if (this.isMulti && this.roleSelector && (this.file.get("author").id !== globals.currentUser.id)) {
                array.forEach(this.roleSelector.options, lang.hitch(this, function (option) {
                    if (option && option.value === "editor") {
                        domConstruct.destroy(option);
                    }
                }));
            }

            if (this.externalAddContainer && this.userInfo && !this.userInfo["isExternal"]) {
                domStyle.set(this.externalAddContainer, "display", "none");
            }

            domAttr.set(this.typeaheadSelectorLabel, "for", this.typeaheadSelector.id);
            domAttr.set(this.inputNodeLabel, "for", this._typeahead.id);

            on(this.typeaheadSelector, "change", lang.hitch(this, "changeTypeahead"));

            this.focusHandler = on(document, "mousedown", lang.hitch(this, function (evt) {
                var el = evt.target;

                if (!this.isMulti && !dom.isDescendant(el, this.sectionNode) &&
                    (!this._typeahead.dropDown || !dom.isDescendant(el,this._typeahead.dropDown.domNode))) {
                    this._cancel();
                }
            }));

            if (lang.isFunction(this._typeahead.updateHintText))
                this._typeahead.updateHintText(this._typeahead.hintText);
        },

        clear: function () {
            this._typeahead.setDisplayedValue("");
            if (!this.isMulti) {
                this._disableButton(this.manualAdd);
            }
        },

        _isOrganizationPublic: function () {
            return when(globals.policy).then(lang.hitch(this, function (policy) {
                return policy && !!policy.organizationPublic;
            }));
        },

        _isExternalUser: function () {
            return this.userInfo && this.userInfo["isExternal"];
        },

        _isEveryoneOptionVisible: function() {
            return this._isOrganizationPublic().then(lang.hitch(this, function (isOrgPublic) {
                if (isOrgPublic) {
                    if (this.filePermission === "Edit" || this.file.get("visibility") === "public" || !this.file.get("permissions").canGrantAccess() || this._isExternalUser()) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            }), function () {return false;});
        },

        setupEveryoneOption: function () {
            this._isEveryoneOptionVisible().then(lang.hitch(this, function (isEveryoneVisible) {
                if(!isEveryoneVisible) {
                    array.forEach(this.typeaheadSelector.options, lang.hitch(this, function (option) {
                        if (option.value === "everyone") {
                            domConstruct.destroy(option);
                        }
                    }));
                }
            }));
        },

        setupSelectorOptions: function () {
            when(globals.policy).then(lang.hitch(this, function (policy) {
                if(!lang.getObject("capabilities.canView.communities", false, policy)){
                    array.forEach(this.typeaheadSelector.options, lang.hitch(this, function (option) {
                        if (option.value === "community") {
                            domConstruct.destroy(option);
                        }
                    }));
                }
            }));
        },

        changeTypeahead: function () {
            if (this.typeaheadSelector.value === "everyone") {
                this.shareWithEveryone();

            } else if (this.typeaheadSelector.value === "user") {
                this._setupUserTypeahead();

            } else if (this.typeaheadSelector.value === "community") {
                this._setupCommunityTypeahead();
            }

            domAttr.set(this.inputNodeLabel, "for", this._typeahead.id);
            this.toggleShareOptions();
            this.focusTypeahead();

            if (lang.isFunction(this._typeahead.updateHintText))
                this._typeahead.updateHintText(this._typeahead.hintText);
        },

        shareWithEveryone: function () {
            if (!this.isMulti) {
                this.emit("save", {everyone: true});
                this._typeahead.setDisplayedValue("");
                this._disableButton(this.manualAdd);
            } else if (this.isMulti) {
                this._enableButton(this.manualAdd);
            }
        },

        toggleShareOptions: function () {
            var displayStyle = this.typeaheadSelector.value === "everyone" ? "none" : "";

            if (this.isMulti) {
                domStyle.set(this.memberSelector,"display", displayStyle);
                domStyle.set(this.messageContainer,"display", displayStyle);
                domStyle.set(this.entryContainer,"display", displayStyle);
            }
        },

        initPlaceholderField: function () {
            var inputNode = domConstruct.create("input", {
                type: "text",
                id: this.domNode.id + "_" + (new Date().getTime())
            });

            domConstruct.place(inputNode, this.typeAheadInput, "only");

            var inputNodeLabel = this.inputNodeLabel = domConstruct.create("label", {
                "for": inputNode.id,
                "innerHTML": this.nls.USER,
                "class": "lotusOffScreen"
            });

            domConstruct.place(inputNodeLabel, this.typeAheadInput, "first");

            return inputNode;
        },

        _setupUserTypeahead: function () {
            if (this.externalAddContainer && this.userInfo && !this.userInfo["isExternal"]) {
                domStyle.set(this.externalAddContainer, "display", "none");
            } else if (this.externalAddContainer && this.userInfo && this.userInfo["isExternal"]) {
                domStyle.set(this.externalAddContainer, "display", "");
            }
            this._createTypeAhead(typeAheadFactory.createPeopleTypeAhead, i18n.TYPEAHEAD_BOX.PERSON_ARIA);
        },

        _setupCommunityTypeahead: function () {
            if (this.externalAddContainer) {
                domStyle.set(this.externalAddContainer, "display", "none");
            }
            this._createTypeAhead(typeAheadFactory.createCommunityTypeAhead, i18n.TYPEAHEAD_BOX.COMMUNITY_ARIA);
        },

        _createTypeAhead: function (createFunction, ariaText) {
            if (this._typeahead) {
                this._typeahead.destroy();
            }

            if (this.isMulti) {
                this.selectFunction = this._multiSelect;
            } else {
                this.selectFunction = this._save;
            }

            var placeholder = this.initPlaceholderField();

            this._typeahead = createFunction(placeholder, {
                onSelect: lang.hitch(this, this.selectFunction),
                file: this.file
            });

            if (ariaText) {
                var expectedId = placeholder.id + 'people',
                    input = this._typeahead.domNode;

                if (domAttr.get(input, 'id') !== expectedId) {
                    input = array.filter(this._typeahead.domNode.getElementsByTagName('input'), function (input) {
                        return domAttr.get(input, 'id') === expectedId;
                    })[0];
                }

                if (input) {
                    dojo.connect(input, "onkeydown", this, this._onEnterInput);
                    var descriptionId = input.id + '_fido_description';

                    var description = domConstruct.create('span', {
                        id: descriptionId,
                        style: {
                            display: 'none'
                        },
                        innerHTML: ariaText
                    });

                    domConstruct.place(description, input, 'after');
                    domAttr.set(input, 'aria-describedby', descriptionId);
                }
            }

            on(this._typeahead, "keyup", lang.hitch(this, "_shareButton"));
            on(this._typeahead, "mouseup", lang.hitch(this, "_shareButton"));
            on(this._typeahead, "cut", lang.hitch(this, "_shareButtonCutPaste"));
            on(this._typeahead, "paste", lang.hitch(this, "_shareButtonCutPaste"));

            this.focusTypeahead();
        },

        _onEnterInput: function( event ) {
            if (event) {
                if ( event.keyCode != dojo.keys.ENTER ) {
                    return;
                }
                dojo.stopEvent(event);
            }
            this._multiSelect();
        },

        _multiSelect: function (item) {
            var roleContainer = this.roleSelector.value + "Container",
                text = lang.trim(this._typeahead.getValue());

            if ((item && item.userid === globals.currentUser.id) || (text === globals.currentUser.email)) {
                this.shareSelfError();
            } else if (item && item.userid === this.file.get("author").id) {
                this.shareOwnerError(item.name);
            } else if (this._shouldAddByEmail(item, text)) {
                this.addEmail(text, item);
            } else if (item && item.name) {
                this.addUserOrCommunity(item);
            } else {
                return;
            }
            this.clear();
        },

        _shouldAddByEmail: function(item, text) {
            if ((!item || !item.name) && validate.isEmailAddress(text)) {
                return true;
            }
            if (this._isGuestContact(item)) {
                return true;
            }
            return false;
        },

        _isGuestContact: function(item) {
            if (item && item.userid && item.userid.lastIndexOf("c_", 0) === 0) {
                return true;
            }
            return false;
        },

        addUserOrCommunity: function (item) {
            var roleContainer = this.roleSelector.value + "Container",
                permission = this.roleSelector.value === "editor" ? "Edit" : "View",
                createArgs = {
                    container: roleContainer,
                    id: item.userid,
                    name: item.name,
                    title: item.title || item.name,
                    communityUuid: item.id,
                    communityType: item.communityType,
                    permission: permission,
                    type: this.typeaheadSelector.value
                },
                widget = this.createEntry(createArgs),
                existingEntry = this.getExistingEntry(widget);

            if (existingEntry)
                existingEntry.remove();

            if (item && item.communityType) {
                this.pendingCommunities.push(widget);
            } else if (item) {
                this.pendingUsers.push(widget);
            }

            widget.placeAt(this[roleContainer]);

            if (this.isMulti) {
                this._enableButton(this.manualAdd);
            }

            domStyle.set(this[roleContainer],"display", "");
        },

        addEmail: function (text, item) {
            var roleContainer = this.roleSelector.value + "Container";
            var permission = this.roleSelector.value === "editor" ? "Edit" : "View";

            createArgs = {
                container: roleContainer,
                id: (this._isGuestContact(item)) ? item.userid : text,
                email: (this._isGuestContact(item)) ? item.email : text,
                name: (this._isGuestContact(item)) ? item.name : text,
                title: text,
                permission: permission,
                type: this.typeaheadSelector.value
            };
            var widget = this.createEntry(createArgs),
                existingEntry = this.getExistingEntry(widget);

            if (existingEntry)
                existingEntry.remove();
            this.pendingEmails.push(widget);

            widget.placeAt(this[roleContainer]);

            if (this.isMulti) {
                this._enableButton(this.manualAdd);
            }

            domStyle.set(this[roleContainer],"display", "");
        },

        shareOwnerError: function (username) {
            topic.publish("ic-fileviewer/push/messages", {
                type: "warning",
                message: string.substitute(this.shareNLS.SHARE_FAIL.EXISTING_USER, {user: username}),
                cancelable: true
            });
        },

        shareSelfError: function () {
            topic.publish("ic-fileviewer/push/messages", {
                type: "warning",
                message: this.shareNLS.SHARE_FAIL.SELF,
                cancelable: true
            });
        },

        createEntry: function (createArgs) {

            var entry = this.file.get("sharingFeed").newItem(createArgs),

                widget = new SharingWidget({
                    entry: entry,
                    file: this.file,
                    isTemporary: true
                });

            widget.remove = lang.hitch(this, this._destroyEntry, widget);

            return widget;
        },

        getExistingEntry: function (widget) {
            var existingEntry = false;
            if (widget.entry.get("type") === "user") {
                array.some(this.pendingUsers.concat(this.pendingEmails), function (user) {
                    if (widget.entry.get("id") === user.entry.get("id")) {
                        existingEntry = user;
                        return true;
                    }
                });
            }

            if (widget.entry.get("type") === "community") {
                array.some(this.pendingCommunities, function (community) {
                    if (widget.entry.get("communityUuid") === community.entry.get("communityUuid")) {
                        existingEntry = community;
                        return true;
                    }
                });
            }

            return existingEntry;
        },

        _destroyEntry: function (entry) {
            domConstruct.destroy(entry.domNode);
            this.removeItem(entry);
        },

        removeItem: function (item) {
            var indexToSplice, arrayToSplice, filteredArray,
                roleContainer = item.entry.get("container");

            if (item.get("type") === "user" && !item.entry.get("email")) {
                arrayToSplice = "pendingUsers";
            } else if (item.get("type") === "community") {
                arrayToSplice = "pendingCommunities";
            } else {
                arrayToSplice = "pendingEmails";
            }

            array.some(this[arrayToSplice], function (widget, index) {
                if (widget.get("id") === item.get("id")) {
                    indexToSplice = index;
                    widget.destroy();
                    return true;
                }
            });

            this[arrayToSplice].splice(indexToSplice, 1);

            //After splicing, determine if all arrays are empty
            var totalSize = this["pendingUsers"].length + this["pendingCommunities"].length + this["pendingEmails"].length;
            if (this.isMulti && totalSize === 0) {
                this._disableButton(this.manualAdd);
            }

            filteredArray = array.filter(this.pendingUsers.concat(this.pendingCommunities.concat(this.pendingEmails)),
                function (widget) {
                    return widget.entry.get("permission") === item.entry.get("permission");
                });

            if (filteredArray.length === 0 ){
                domStyle.set(this[roleContainer], "display", "none");
            }
        },

        _multiShare: function () {
            var allItems = this.pendingUsers.concat(this.pendingCommunities.concat(this.pendingEmails));

            if (this.typeaheadSelector.value === "everyone") {
                this.emit("save", {everyone: true});
            } else if (allItems.length > 0) {
                this.emit("save", {users: this.pendingUsers, communities: this.pendingCommunities, emails: this.pendingEmails});
            }
        },

        hasChanges: function () {
            return this.pendingUsers.length || this.pendingCommunities.length || this.pendingEmails.length;
        },

        _showMessageField: function () {
            if (this.messageBox) {
                domStyle.set(this.messageBox.domNode, "display", "");
                domStyle.set(this.optionalMsgLinkContainer, "display", "none");
            }
        },

        _shareButton: function(arg) {
            if (!this.isMulti) {
                var text = lang.trim(this._typeahead.getValue());
                if ((text) && (text !== "") && (validate.isEmailAddress(text))) {
                    this._enableButton(this.manualAdd);
                } else {
                    this._disableButton(this.manualAdd);
                }
            }
        },

        _shareButtonCutPaste: function(arg) {
            if (!this.isMulti) {
                this._enableButton(this.manualAdd);
            }
        },

        _addByEmail: function () {
            var text = lang.trim(this._typeahead.getValue()),
                item = {email: text};

            if (!text || text === "" || !validate.isEmailAddress(text)) {
                this._disableButton(this.manualAdd);
                return;
            }

            if (validate.isEmailAddress(text)) {
                this.emit("save", {typeaheadItem: item});
            } else {
                topic.publish("ic-fileviewer/push/messages", {
                    type: "error",
                    message: string.substitute(this.shareNLS.SHARE_FAIL.ERROR, {user: text}),
                    cancelable: true
                });
            }
        },

        _save: function (item) {
            if (item) {
                this.emit("save", {typeaheadItem: item});
            }
        },

        _cancel: function () {
            this.emit("cancel", {typeahead: this});
            this.focusHandler.remove();
        },

        focusTypeahead: function () {
            this._typeahead.focus();
            setTimeout(lang.hitch(this, function () {
                this._typeahead.focus();
            }));
        },

        onsave: function () {
            return;
        },

        oncancel: function () {
            return;
        },

        destroy: function () {
            this.focusHandler.remove();
            if (this._typeahead) {
                this._typeahead.destroy();
            }
            this.inherited(arguments);
        },

        _enableButton: function (domNode) {
            domAttr.remove(domNode, "disabled");
            domAttr.set(domNode, "tabindex", "");
            domAttr.set(domNode, "aria-disabled", "false");
        },

        _disableButton: function (domNode) {
            domAttr.set(domNode, "disabled", "disabled");
            domAttr.set(domNode, "tabindex", "-1");
            domAttr.set(domNode, "aria-disabled", "true");
        }
    });
});
