/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.History");

dojo.require("com.ibm.social.ee.data.HistoryDataStore");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("com.ibm.social.incontext.util.html");
dojo.require("com.ibm.social.ee.data.OpenSocialRoutes");
dojo.require("com.ibm.social.incontext.util.DateFormat");
dojo.require("lconn.core.globalization.bidiUtil");
dojo.requireLocalization("com.ibm.social.ee", "socialEEStrings");

dojo.require("com.ibm.social.ee.util.misc");

/* globals com, lconn */

dojo.declare("com.ibm.social.ee.widget.History", [dijit._Widget, dijit._Templated], {
    nls: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings"),
    _strings: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").HISTORY,
    _ds: null,
    net: null,
    url: null,
    uuid: null,
    loading: null,
    disableSort: true,
    disablePaging: false,
    focusDiv: null,
    templatePath: dojo.moduleUrl("com.ibm.social.ee", "widget/templates/History.html"),
    postCreate: function () {
        this.inherited(arguments);
        if (!this.rollupUrl) {
            var openSocialRoutes = new com.ibm.social.ee.data.OpenSocialRoutes(this.routeOptions);
            this.rollupUrl = openSocialRoutes.getRollupUrl(this.uuid);
        }
        this._ds = new com.ibm.social.ee.data.HistoryDataStore({
            net: this.net,
            disableSort: this.disableSort,
            url: this.rollupUrl
        });
        this.connect(this, "_showEmptyMsg", "onDisplayChange");
        this.connect(this, "_showErrorMsg", "onDisplayChange");
        this._getHistoryItems(true);
    },
    _getHistoryItems: function (isInitial) {
        this._showLoading();
        this._ds.fetch({
            query: {uuid: this.uuid},
            onComplete: dojo.hitch(this, function (obj, request) {
                if (obj) {
                    if (obj.items) {
                        this._showHistoryUI(obj.items, obj.moreExists, isInitial);
                    }
                    else if (!obj.prevItem) {
                        this._showEmptyMsg();
                    }
                    else {
                        this._doNothing();
                    }
                }
                else {
                    this._showErrorMsg();
                }
                if (isInitial) {
                    this.onLoaded();
                }
                else {
                    this.onDisplayChange();
                }
                dojo.publish("com/ibm/social/ee/data/loaded");

                var waitSomeMillis = dojo.hitch(this, function () {
                    this.onDisplayChange();
                });

                setTimeout(waitSomeMillis, 100);
            }),
            onError: dojo.hitch(this, function (errorData, request) {
                this._showErrorMsg(isInitial, errorData);
            })
        });
    },
    scrollToBottom: function () {
        window.setTimeout(function () {
            dojo.publish("com/ibm/social/ee/event/scrollBottom", null);
        }, 0);
    },
    onLoaded: function () {
    },
    /* We get to this case when we originally had more items to fetch, but they were deleted once we tried to fetch them. */
    _doNothing: function () {
        this.loading.style.display = "none";
    },
    _showEmptyMsg: function () {
        var div = dojo.create("div", {}, this.empty);
        div.appendChild(dojo.doc.createTextNode(this._strings.NO_HISTORY));
        dojo.addClass(div, "lconnEmpty");
        this.empty.style.display = "";
        this.loading.style.display = "none";
    },
    _showMoreHistory: function () {
        this.moreLink.style.display = "none";
        this._getHistoryItems(false);
    },
    _showLoading: function () {
        dojo.empty(this.loading);
        com.ibm.social.incontext.util.html.showLoading(this.loading);
        this.loading.style.display = "";
        this.onDisplayChange();
        this.scrollToBottom();
    },
    _showHistoryUI: function (histArray, moreExists, isInitial) {
        var scope = this;
        var d = dojo.doc;
        var isFirst = true;
        dojo.forEach(histArray, function (item, i) {
            var actor = scope._ds.getValue(item, "author");
            var shortTitle = scope._ds.getValue(item, "shortTitle");

            // if the user is external then we don't show links for user profiles
            var isUserExternal = lconn.core.auth.getUser() && lconn.core.auth.getUser().isExternal;

            if(isUserExternal){
                shortTitle = com.ibm.social.incontext.util.html.removeProfileLinks(shortTitle);
            }

            var df = new com.ibm.social.incontext.util.DateFormat(scope._ds.getValue(item, "published"));
            var published = df.formatByAge(scope._strings.TIMESTAMP.CREATED);
            var liClass = (isFirst ? "lotusCommentItem lotusFirst" : "lotusCommentItem");
            isFirst = false;
            var li = dojo.create("li", {className: liClass}, scope.listCtnr);
            var div = dojo.create("div", {className: "lotusPost eeCommentContent", tabindex: "0"}, li);
            if (i === 0) {
                scope.focusDiv = div;
            }
            var divAuthor = dojo.create("div", {className: "lotusPostAuthorInfo"}, div);
            var divAvatar = dojo.create("div", {className: "lotusPostAvatar"}, divAuthor);
            if (scope.generateUserImage) {
                var entryUser = { name: actor.name, id: com.ibm.social.ee.util.misc.getItemId(actor.id) };
                scope.generateUserImage(entryUser, divAvatar, 35, 35, null, {imagePop: false, title: scope._strings.PROFILE_TITLE, generateLink: false});
            }
            var id = dijit.getUniqueId("eeComment");
            var contentCtnr = dojo.create("div", {className: "lotusPostContent", id: id}, div);
            div.setAttribute("aria-labelledby", id);
            var postAction = dojo.create("div", {className: "lotusPostAction"}, contentCtnr);
            postAction.innerHTML = shortTitle;
            com.ibm.social.incontext.util.text.breakStringHTML(postAction, 15);
            var anchors = dojo.query("a", postAction);
            for (var idx = 0; idx < anchors.length; idx++) {
                anchors[idx].setAttribute("target", "_blank");
                dojo.addClass(anchors[idx], "eeActionLinks");
            }
            var date = dojo.create("div", {className: "lotusMeta"}, contentCtnr);
            date.appendChild(d.createTextNode(published));
        });
        this.main.style.display = "";
        this.empty.style.display = "none";
        if (!moreExists || this.disablePaging) {
            this.moreLink.style.display = "none";
        }
        else {
            this.moreLink.style.display = "";
        }
        if (!this.disableSort) {
            this.sortNode.style.display = "";
        }
        this.loading.style.display = "none";
        // Bidi support
        lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.listCtnr.parentNode);
        if (this.focusDiv && !isInitial) {
            this.focusDiv.focus();
        } //If show more is clicked, we should focus on the first new item.

        com.ibm.social.ee.util.misc.addMessageToNewWindowLinks();
    },
    _showErrorMsg: function (isInitial, errorData) {
        dojo.empty(this.error);
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

        var div;

        if (!isInitial) {
            div = dojo.create("div", {className: "lotusMessage2", role: "alert"}, this.error);
            div.style.margin = "10px 0 0 0";
            var img = dojo.create("img", {className: "lconnSprite lconnSprite-iconError16", alt: this.ERROR_ALT, title: this.ERROR_ALT, src: this._blankGif}, div);
            img.style.marginRight = "10px";
            var msg = dojo.create("span", {}, div);
            msg.appendChild(span);
        }
        else {
            div = dojo.create("div", {className: "lconnEmpty", role: "alert"}, this.error);
            div.appendChild(span);
        }
        this.error.style.display = "";
        this.loading.style.display = "none";
    },
    _tryAgain: function (isInitial) {
        this._getHistoryItems(isInitial);
        this._clearErrors();
    },
    _sort: function () {
        dojo.empty(this.listCtnr);
        this.main.style.display = "none";
        this._clearErrors();
        if (!this.disablePaging) {
            this.moreLink.style.display = "none";
        }
    },
    _clearErrors: function () {
        this.error.style.display = "none";
        dojo.empty(this.error);
    },
    /* User has switched from desc to asc, start counters over */
    _sortAsc: function () {
        dojo.byId("sortAsc").style.display = "";
        dojo.byId("sortDesc").style.display = "none";
        this._sort();
        this._ds.switchSort(false);
        this._getHistoryItems();
    },
    /* User has switched from asc to desc, start counters over */
    _sortDesc: function () {
        dojo.byId("sortDesc").style.display = "";
        dojo.byId("sortAsc").style.display = "none";
        this._sort();
        this._ds.switchSort(true);
        this._getHistoryItems();
    },
    onDisplayChange: function () {
    }
});