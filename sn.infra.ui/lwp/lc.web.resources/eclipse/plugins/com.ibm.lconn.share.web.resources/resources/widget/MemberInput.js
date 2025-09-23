/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited. 2009, 2022                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide('lconn.share.widget.MemberInput');
dojo.require("lconn.core.AddGroups");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.widget.TypeAhead");
dojo.require("lconn.share.widget.PeopleTypeAhead");
dojo.require("lconn.share.util.validation");
dojo.require("dijit._Widget");
dojo.require("lconn.share.scenehelper");

dojo.declare("lconn.share.widget.MemberInput", [dijit._Widget], {

    showCommunities: false,
    showPublicCommunities: false,
    communitySearchAdapter: null,

    showGroups: false,

    //required parameter
    userSearchAdapter: null,

    onHide: function() {
        dojo.forEach(["people", "groups", "communities"], function(type) {
            var popup = dojo.getObject(type + "._popupWidget", false, this);

            if (popup) {
                dijit.popup.close(popup);
            }
        }, this);
    },

    postMixInProperties: function() {
        if (this.app) {
            this.basePath = this.basePath || this.app.routes.getBasePath();
            this.userStore = this.userStore || this.app.getUserTypeAheadStore(this.activeOnly);
            this.communitiesStore = this.communitiesStore || this.app.getCommunityTypeAheadStore();
            this._stringsUser = this._stringsUser || this.app.nls.USERSEARCH;
            this._stringsCommunity = this._stringsCommunity || this.app.nls.COMMUNITYSEARCH;
            this._stringsGroup = this._stringsGroup || this.app.nls.USERSEARCH;
            this._strings =  this._strings || this.app.nls.SEARCH;
        }
        this.personSource = {
            name: this._stringsUser.PERSON_SOURCE,
            typeahead: "people",
            adapter: this.userSearchAdapter,
            id: "people"
        };
        this.groupSource = {
            name: this._stringsGroup.GROUP_SOURCE,
            typeahead: "groups",
            id: "groups"
        };
        this.communitiesSource = {
            name: this._stringsCommunity.SOURCE,
            typeahead: "communities",
            excludeRoles: this.excludeCommunityRoles,
            adapter: this.communitySearchAdapter,
            id: "communities"
        };
        if (!this.sources) {
            this.sources = [];
            if (!this.showCommunityOnly)
                this.sources.push(this.personSource);
            if (this.showGroups)
                this.sources.push(this.groupSource);
            if (this.showCommunities)
                this.sources.push(this.communitiesSource);
        }
        this.roles = this.roles || [];
    },

    resetAddButton: function(){
        if (this.addShareUserNode) {
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
            if (userInfoJson && !userInfoJson["isExternal"])
                this.addShareUserNode.style.display = "none";
            else
                this.addShareUserNode.style.display = "";
        }
    },

    buildRendering: function() {
        var d = document;
        var el = this.domNode = this.srcNodeRef;
        if (this.baseClass) dojo.addClass(el, this.baseClass);

        var sources = this.sources;
        var source = this.sources[0] || {};
        var roles = this.roles;
        var defaultRole = this.defaultRole;

        var defaultText = source.defaultText || "";

        var form = el;
        form.style.whiteSpace = "nowrap";
        dojo.connect(form, "onsubmit", this, "search");

        // Build the table to contain the source/role/combo inputs
        var table = d.createElement("table");
        dijit.setWaiRole(table, "presentation");
        // Table takes up entire width
        table.style.width = "100%";
        table.style.fontSize = "inherit";
        table.cellPadding = table.cellSpacing = 0;

        // Make the last cell greedy
        var colgroup = d.createElement("colgroup");
        var sourceCol = d.createElement("col");
        colgroup.appendChild(sourceCol);
        colgroup.appendChild(d.createElement("col"));
        colgroup.appendChild(d.createElement("col"));
        colgroup.lastChild.width = "100%";
        colgroup.appendChild(d.createElement("col"));
        table.appendChild(colgroup);

        var tbody = d.createElement("tbody");
        var tr = d.createElement("tr");
        var td = this.sourceNodeTD = d.createElement("td");
        tr.appendChild(td);

        var td = this.roleNodeTD = d.createElement("td");
        tr.appendChild(td);

        var td = this.comboNodeTD = d.createElement("td");
        td.style.overflow = "hidden";
        tr.appendChild(td);

        // Help column
        var td = d.createElement("td");
        if (this.help)
            lconn.files.scenehelper.createHelpLink(this.app, td, this.help.topic, this.help.opt);
        td.className = "lotusHelpIconV8";
        tr.appendChild(td);

        tbody.appendChild(tr);
        table.appendChild(tbody);
        form.appendChild(table);

        var selectId = this.id+"_searchSourceDropdown";
        var label = d.createElement("LABEL");
        label.className = "lotusHidden";
        label.appendChild(d.createTextNode(this._strings.SHARE_TYPE_LABEL));
        label.setAttribute("for", selectId);
        this.sourceNodeTD.appendChild(label);
        var select = this.sourceNode = d.createElement("SELECT");
        select.id = selectId;
        select.name = this.sourceName || "searchSourceDropdown";
        if (sources.length < 2)
        {
            if (this.sourceNodeTD && this.sourceNodeTD.parentNode)
                this.sourceNodeTD.parentNode.removeChild(this.sourceNodeTD);
            if (sourceCol && sourceCol.parentNode)
                sourceCol.parentNode.removeChild(sourceCol);
        }
        for (var i=0; i<sources.length; i++) {
            var option = d.createElement("OPTION");
            option.value = sources[i].id;
            option.appendChild(d.createTextNode(sources[i].name));
            select.appendChild(option);
        }
        select.title = this._strings.SHARE_TYPE_LABEL;
        dijit.setWaiState(select, "label", this._strings.SHARE_TYPE_LABEL);
        this.sourceNodeTD.appendChild(select);
        dojo.connect(select, "onchange", this, "changeSource");

        selectId = this.id+"_roleDropdown";
        var label = d.createElement("LABEL");
        label.className = "lotusHidden";
        label.appendChild(d.createTextNode(this._strings.SHARE_ROLE_LABEL));
        label.setAttribute("for", selectId);
        this.roleNodeTD.appendChild(label);
        var select = this.roleNode = d.createElement("SELECT");
        select.id = selectId;
        select.name = this.roleName || "roleDropdown";
        for (var i=0; i<roles.length; i++) {
            var option = d.createElement("OPTION");
            option.value = roles[i].id;
            if (roles[i] == defaultRole)
                option.defaultSelected = option.selected = true;
            option.appendChild(d.createTextNode(roles[i].name));
            select.appendChild(option);
        }
        select.title = this._strings.SHARE_ROLE_LABEL;
        dijit.setWaiState(select, "label", this._strings.SHARE_ROLE_LABEL);
        this.roleNodeTD.appendChild(select);

        if (dojo.some(sources, function(a) {return a.typeahead == "people";})) {
            var comboId = this.id+"_people";
            var label = d.createElement("LABEL");
            label.className = "lotusHidden";
            label.appendChild(d.createTextNode(this._stringsUser.PERSON_HINT_TEXT));
            label.setAttribute("for", comboId);
            this.comboNodeTD.appendChild(label);
            var input = d.createElement("INPUT");
            input.style.display = (source.typeahead == "people") ? "" : "none";
            input.value = defaultText;
            input.size = "30";
            this.comboNodeTD.appendChild(input);
            var opt = {
                _strings: this._stringsUser,
                id: comboId,
                name: this.name,
                orient: dojo._isBodyLtr() ? {'BL':'TL'} : {'BR':'TR'},
                skipFirstFocusSearch: this.skipFirstFocusSearch,
                store: this.userStore,
                hintText: this._stringsUser.PERSON_HINT_TEXT
            };
            var combo = this.people = this.userSearchAdapter.createTypeAhead(input, opt, {
                allowExternal: !this.internalOnly,
                activeOnly: this.activeOnly
            });
            if (dojo.isIE){
                dojo.connect(combo.domNode, "onfocus", dojo.hitch(this, this._fixInputSize, combo.domNode));
            }

            // if typeahead doesn't float left, the add button will always wrap on IE on original rendering
            var adjustTypeAhead = false;
            if (dojo.isIE < 8) {
                adjustTypeAhead = this.userSearchAdapter.showAddButton();
                dojo.toggleClass(combo.domNode, "lotusLeft", adjustTypeAhead);
            }

            if (this.wInputUser) {
                var iuWidth = this.wInputUser;
                // reduce the width of the typeahead for IE with an add button, to avoid pushing out the dialog unnecessarily
                if (adjustTypeAhead) {
                    var parser = /(\d*\.?\d+)\s*(pt|px|em|\%)/i;
                    var parts = parser.exec(iuWidth);

                    if (parts.length == 3) { // original string, number part, unit part
                        var width = parts[1] - 20;
                        iuWidth = width + parts[2];
                    }
                }

                combo.domNode.style.width = iuWidth;
            }

            this.userSearchAdapter.connectOnSelect(this.people, this, "selectPerson");

            if (this.addShareUserNode) {
                this.addShareUserNode.style.display = '';
            } else {

                var a = this.addShareUserNode = dojo.create('a', {
                    'href': 'javascript:void(0)',
                    'role': 'button',
                    'title': this._strings.ADD_TOOLTIP
                });

                var img = a.appendChild(dojo.create('img', {
                    src: dojo.config.blankGif,
                    className: 'lconnSprite lconnSprite-iconPaletteAdd16',
                    alt: this._strings.ADD_TOOLTIP,
                    style: { marginLeft: '4px' }
                }));

                var altSpan = d.createElement("span");
                altSpan.className = "lotusAltText";
                altSpan.appendChild(d.createTextNode("+"));
                a.appendChild(altSpan);
                lconn.share.scenehelper.addToolTip(a);

                dojo.connect(a, 'onclick', dojo.hitch(this, function() {
                    this.userSearchAdapter.doSelectUser(this.people);
                }));

                dojo.connect(img, 'onmouseover', function() {
                    if (!dojo.hasClass(img, 'lconnSprite-iconPaletteAdd16-Hover')) {
                        dojo.removeClass(img, 'lconnSprite-iconPaletteAdd16');
                        dojo.addClass(img, 'lconnSprite-iconPaletteAdd16-Hover');
                    }
                });

                dojo.connect(img, 'onmouseout', function() {
                    if (!dojo.hasClass(img, 'lconnSprite-iconPaletteAdd16')) {
                        dojo.removeClass(img, 'lconnSprite-iconPaletteAdd16-Hover');
                        dojo.addClass(img, 'lconnSprite-iconPaletteAdd16');
                    }
                });

                this.comboNodeTD.appendChild(a);
            }
        }

        if (dojo.some(sources, function(a) {return a.typeahead == "groups";})) {
            var input = d.createElement("INPUT");
            input.style.display = (source.typeahead == "groups") ? "" : "none";
            input.value = defaultText;
            input.size = "30";
            this.comboNodeTD.appendChild(input);

            var params = {
                contextPath: this.basePath,
                NoResultsMessage: this._stringsGroup.NO_RESULTS,
                showRoleSelector: false,
                disableRenderGroupsList:true
            };

            var groupsWidget = this.groupsWidget = new lconn.core.AddGroups(params, input);
            if(groupsWidget.aclLevel_AP)
                groupsWidget.aclLevel_AP.style.display="none";
            if(groupsWidget.addButton_AP)
                groupsWidget.addButton_AP.style.display="none";

            var combo = this.groups = groupsWidget.typeAhead_W;
            if (!combo)
                console.error("AddGroup widget missing typeAhead_W property!");
            if (combo && combo.updateHintText)
                combo.updateHintText(this._stringsGroup.GROUP_HINT_TEXT);

            if (dojo.isIE){
                dojo.connect(combo.domNode, "onfocus", dojo.hitch(this, this._fixInputSize, combo.domNode));
            }

            dojo.connect(this.groupsWidget, 'addMemberData', this, function(type, aclLevel, personId, personEmail, personName){
                this.selectGroup({
                    id:personId,
                    name:personName,
                    type:"directory"
                });
            });

            var textbox = combo.textbox || combo.membersCombo_AP;
            if (this.wInputUser)
                textbox.style.width = this.wInputUser;
            var label = d.createElement("LABEL");
            label.className = "lotusHidden";
            label.appendChild(d.createTextNode(this._stringsGroup.GROUP_HINT_TEXT));
            label.setAttribute("for", combo.id);
            this.comboNodeTD.appendChild(label);
        }

        if (dojo.some(sources, function(a) {return a.typeahead == "communities";})) {
            var input = d.createElement("INPUT");
            input.style.display = (source.typeahead == "communities") ? "" : "none";
            input.value = defaultText;
            input.size = "30";
            this.comboNodeTD.appendChild(input);

            var opt = {
                _strings: this._stringsCommunity,
                id: this.id+"_communities",
                name: this.name,
                searchOpts: {
                    communityType: this.showPublicCommunities ? null : 'private'
                },
                hintText: this._stringsCommunity.HINT_TEXT,
                size: 30
            };
            if(this.internalOnly && this.app.authenticatedUser.orgId)
                opt.orgId = this.app.authenticatedUser.orgId;
            var combo = this.communities = this.communitySearchAdapter.createTypeAhead(input, opt, {
                allowExternal: !this.internalOnly,
                activeOnly: this.activeOnly

            });
            if (dojo.isIE){
                dojo.connect(combo.domNode, "onfocus", dojo.hitch(this, this._fixInputSize, combo.domNode));
            }
            var textbox = combo.textbox;
            textbox.style.display = "none";
            if (this.wInputUser)
                textbox.style.width = this.wInputUser;
            //in cloud mode, the community typeahead should be adjusted to same length with live people typeahead
            if (dojo.getObject("lconn.share.config.isCloudMode"))
                textbox.style.padding = "0px 0px 3px";

            var label = d.createElement("LABEL");
            label.className = "lotusHidden";
            label.appendChild(d.createTextNode(this._stringsCommunity.HINT_TEXT));
            label.setAttribute("for", combo.id);
            this.comboNodeTD.appendChild(label);

            this.communitySearchAdapter.connectOnSelect(this.communities, this, "selectCommunity");
        }

        if (dojo.some(sources, function(a) {return !a.typeahead;})) {
            var input = this.simpleInputNode = d.createElement("INPUT");
            input.name = this.name ? this.name : null;
            input.id = this.id + "_simple";
            input.className = "lotusText";
            input.style.display = (source.typeahead == "people") ? "" : "none";
            input.size = "30";
            input.style.width="99%";
            this.comboNodeTD.appendChild(input);
        }

        this.changeSource();
    },

    _fixInputSize: function(input){
        if (!input || input.style.width) return;
        input.style.width = dojo.position(input).w - 6 + "px";
    },

    resetSource: function() {
        this.sourceNode.selectedIndex = 0;
        this.changeSource();
    },
    getCurrentSource: function() {
        if (this.sources.length == 1)
            return this.sources[0];

        var option = this.sources[this.sourceNode.selectedIndex];
        return option;
    },
    getCurrentRole: function() {
        if (this.roles.length == 0)
            return null;
        if (this.roles.length == 1)
            return this.roles[0];

        var option = this.roles[this.roleNode.selectedIndex];
        return option;
    },

    getInputNode: function() {
        return this.inputNode;
    },

    buildRoleOptions: function(container, select, roles, defaultRole) {
        lconn.share.util.html.removeChildren(select);
        if (roles.length > 0) {
            var d = document;
            for (var i=0; i<roles.length; i++) {
                var option = d.createElement("OPTION");
                option.value = roles[i].id;
                if (roles[i] == defaultRole)
                    option.defaultSelected = option.selected = true;
                option.appendChild(d.createTextNode(roles[i].name));
                select.appendChild(option);
            }
            container.style.display = "";
        }
        else
            container.style.display = "none";
    },

    changeRoles: function(roles, defaultRole) {
        var roles = this.roles = roles || [];
        this.defaultRole = defaultRole;

        var select = this.roleNode;
        var container = this.roleNodeTD;
        if (select)
            this.buildRoleOptions(container, select, roles, defaultRole);
    },
    updateRoles: function(source) {
        var select = this.roleNode;
        var container = this.roleNodeTD;
        if (select) {
            var disabled = source.excludeRoles || {};
            if (dojo.isIE) {
                this.buildRoleOptions(container, select, dojo.filter(this.roles, function(r) {return !disabled[r.id];}), this.getCurrentRole());
            }
            else {
                var options = select.getElementsByTagName("OPTION");
                for (var i=0,option; option=options[i]; i++)
                    option.style.display = (disabled[option.value]) ? "none" : "";
            }
            if (source.excludeRoles)
                select.selectedIndex = 0;
        }
    },

    setShowPublicCommunities: function(show) {
        this.showPublicCommunities = show;
        if(this.communities)
            this.communities.searchOpts.visibility = show ? null : 'private';
    },

    setSkipFirstFocusSearch: function(b) {
        if (this.people)
            this.people.skipFirstFocusSearch = b;
        if (this.communities)
            this.communities.skipFirstFocusSearch = b;
        if (this.groups)
            this.groups.skipFirstFocusSearch = b;
    },

    changeSource: function(optChangeOnly) {
        var source = this.getCurrentSource();
        var i;
        var ip = this.people;
        var ig = this.groupsWidget;
        var ic = this.communities;
        var is = this.simpleInputNode;
        //var oldClass = (this.inputNode ? this.inputNode.className : null);
        if(!optChangeOnly)
            this.updateRoles(source);

        var typeAheadOpts = {
            users: false,
            groups: false,
            communities: false
        };
        var typeAhead;
        if (source.typeahead == "people") {
            ip.domNode.style.display = "";
            if (is) is.style.display = "none";
            if (ig) ig.domNode.style.display = "none";
            if (ic) ic.domNode.style.display = "none";
            i = this.inputNode = ip.textbox;
            this.resetAddButton();
            if (this.internalOnly)
                typeAheadOpts.internal = true;
            typeAheadOpts.users = true;
            typeAhead = this.people;

            if (typeAhead.setInternalOnly)
                typeAhead.setInternalOnly(this.internalOnly);
        }
        else if (source.typeahead == "groups") {
            ig.domNode.style.display = "";
            if (is) is.style.display = "none";
            if (ip) ip.domNode.style.display = "none";
            if (ic) ic.domNode.style.display = "none";
            i = this.inputNode = ip.textbox;
            if (this.addShareUserNode)
                this.addShareUserNode.style.display = 'none';
            typeAheadOpts.groups = true;
        }
        else if (source.typeahead == "communities") {
            ic.domNode.style.display = "";
            if (is) is.style.display = "none";
            if (ip) ip.domNode.style.display = "none";
            if (ig) ig.domNode.style.display = "none";
            i = this.inputNode = ic.textbox;
            if (this.addShareUserNode)
                this.addShareUserNode.style.display = 'none';
            typeAheadOpts.communities = true;
            if (this.internalOnly) {
                typeAheadOpts.orgId = this.app.authenticatedUser.orgId;
                typeAheadOpts.internalOnly = true;
            }else {
                delete typeAheadOpts.orgId;
                delete typeAheadOpts.internalOnly;
            }
            typeAhead = this.communities;
        }
        else {
            is.style.display = "";
            if (ip) ip.domNode.style.display = "none";
            if (ig) ig.domNode.style.display = "none";
            if (ic) ic.domNode.style.display = "none";
            this.addShareUserNode.style.display = 'none';
            i = this.inputNode = is;
        }
        //i.className = oldClass;
        i.old = false;

        if(source.adapter)
            source.adapter.changeTypeAheadOpts(typeAhead, typeAheadOpts);
    },

    isExternalItem: function(item, app){
        var adapter = this.getCurrentSource().adapter;
        return adapter && adapter.isExternalItem(app || this.app, item);
    },

    selectPerson: function(p) {
        var person = this.userSearchAdapter.getSelected(this.people, arguments);
        this.people.setValue("");
        this.onSelectPerson(person, this.getCurrentRole());
    },
    onSelectPerson: function(person, role) {},
    selectCommunity: function(p) {
        var community = this.communitySearchAdapter.getSelected(this.communities, arguments);
        this.communities.setValue("");
        this.onSelectCommunity(community);
    },
    onSelectCommunity: function(community, role) {},
    selectGroup: function(p) {
        this.groups.setValue("");
        this.onSelectGroup(p, this.getCurrentRole());
    },
    onSelectGroup: function(group, role) {},

    search: function(e) {
        if (e) dojo.stopEvent(e);
    },

    clearInput: function() {
        if (this.people)
            this.people.setValue("");
        if (this.groups)
            this.groups.setValue("");
        if (this.communities)
            this.communities.setValue("");
        var memberNode = this.domNode;
        var memberInputNode = this.inputNode;
        if(memberNode && memberInputNode && memberNode.parentNode.parentNode)
            lconn.share.util.validation.removeInlineErrorRow(memberNode.parentNode.parentNode, memberInputNode);
    }
});
