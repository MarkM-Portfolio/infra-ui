/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/window",
	"dojo/_base/declare",
	"dojo/aspect",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"dojo/_base/array",
	"dojo/dom-class",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/text!ic-ee/widget/templates/History.html",
	"dojo/topic",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/registry",
	"ic-incontext/util/DateFormat",
	"ic-ee/data/HistoryDataStore",
	"ic-core/globalization/bidiUtil",
	"ic-core/auth",
	"ic-ee/data/OpenSocialRoutes",
	"ic-ee/util/misc",
	"ic-incontext/util/html",
	"ic-incontext/util/text"
], function (dojo, windowModule, declare, aspect, i18nsocialEEStrings, array, domClass, lang, dom, domConstruct, query, template, topic, _Templated, _Widget, registry, DateFormat, HistoryDataStore, bidiUtil, auth, OpenSocialRoutes, misc, html, text) {

	/* globals com, lconn */
	
	var History = declare("com.ibm.social.ee.widget.History", [_Widget, _Templated], {
	    nls: i18nsocialEEStrings,
	    _strings: i18nsocialEEStrings.HISTORY,
	    _ds: null,
	    net: null,
	    url: null,
	    uuid: null,
	    loading: null,
	    disableSort: true,
	    disablePaging: false,
	    focusDiv: null,
	    templateString: template,
	    postCreate: function () {
	        this.inherited(arguments);
	        if (!this.rollupUrl) {
	            var openSocialRoutes = new OpenSocialRoutes(this.routeOptions);
	            this.rollupUrl = openSocialRoutes.getRollupUrl(this.uuid);
	        }
	        this._ds = new HistoryDataStore({
	            net: this.net,
	            disableSort: this.disableSort,
	            url: this.rollupUrl
	        });
	        this.own(aspect.after(this, "_showEmptyMsg", lang.hitch(this, "onDisplayChange"), true));
	        this.own(aspect.after(this, "_showErrorMsg", lang.hitch(this, "onDisplayChange"), true));
	        this._getHistoryItems(true);
	    },
	    _getHistoryItems: function (isInitial) {
	        this._showLoading();
	        this._ds.fetch({
	            query: {uuid: this.uuid},
	            onComplete: lang.hitch(this, function (obj, request) {
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
	                topic.publish("com/ibm/social/ee/data/loaded", '');
	
	                var waitSomeMillis = lang.hitch(this, function () {
	                    this.onDisplayChange();
	                });
	
	                setTimeout(waitSomeMillis, 100);
	            }),
	            onError: lang.hitch(this, function (errorData, request) {
	                this._showErrorMsg(isInitial, errorData);
	            })
	        });
	    },
	    scrollToBottom: function () {
	        window.setTimeout(function () {
	            topic.publish("com/ibm/social/ee/event/scrollBottom", '');
	        }, 0);
	    },
	    onLoaded: function () {
	    },
	    /* We get to this case when we originally had more items to fetch, but they were deleted once we tried to fetch them. */
	    _doNothing: function () {
	        this.loading.style.display = "none";
	    },
	    _showEmptyMsg: function () {
	        var div = domConstruct.create("div", {}, this.empty);
	        div.appendChild(windowModule.doc.createTextNode(this._strings.NO_HISTORY));
	        domClass.add(div, "lconnEmpty");
	        this.empty.style.display = "";
	        this.loading.style.display = "none";
	    },
	    _showMoreHistory: function () {
	        this.moreLink.style.display = "none";
	        this._getHistoryItems(false);
	    },
	    _showLoading: function () {
	        domConstruct.empty(this.loading);
	        html.showLoading(this.loading);
	        this.loading.style.display = "";
	        this.onDisplayChange();
	        this.scrollToBottom();
	    },
	    _showHistoryUI: function (histArray, moreExists, isInitial) {
	        var scope = this;
	        var d = windowModule.doc;
	        var isFirst = true;
	        array.forEach(histArray, function (item, i) {
	            var actor = scope._ds.getValue(item, "author");
	            var shortTitle = scope._ds.getValue(item, "shortTitle");
	
	            // if the user is external then we don't show links for user profiles
	            var isUserExternal = auth.getUser() && auth.getUser().isExternal;
	
	            if(isUserExternal){
	                shortTitle = html.removeProfileLinks(shortTitle);
	            }
	
	            var df = new DateFormat(scope._ds.getValue(item, "published"));
	            var published = df.formatByAge(scope._strings.TIMESTAMP.CREATED);
	            var liClass = (isFirst ? "lotusCommentItem lotusFirst" : "lotusCommentItem");
	            isFirst = false;
	            var li = domConstruct.create("li", {className: liClass}, scope.listCtnr);
	            var div = domConstruct.create("div", {className: "lotusPost eeCommentContent", tabindex: "0"}, li);
	            if (i === 0) {
	                scope.focusDiv = div;
	            }
	            var divAuthor = domConstruct.create("div", {className: "lotusPostAuthorInfo"}, div);
	            var divAvatar = domConstruct.create("div", {className: "lotusPostAvatar"}, divAuthor);
	            if (scope.generateUserImage) {
	                var entryUser = { name: actor.name, id: misc.getItemId(actor.id) };
	                scope.generateUserImage(entryUser, divAvatar, 35, 35, null, {imagePop: false, title: scope._strings.PROFILE_TITLE, generateLink: false});
	            }
	            var id = registry.getUniqueId("eeComment");
	            var contentCtnr = domConstruct.create("div", {className: "lotusPostContent", id: id}, div);
	            div.setAttribute("aria-labelledby", id);
	            var postAction = domConstruct.create("div", {className: "lotusPostAction"}, contentCtnr);
	            postAction.innerHTML = shortTitle;
	            text.breakStringHTML(postAction, 15);
	            var anchors = query("a", postAction);
	            for (var idx = 0; idx < anchors.length; idx++) {
	                anchors[idx].setAttribute("target", "_blank");
	                domClass.add(anchors[idx], "eeActionLinks");
	            }
	            var date = domConstruct.create("div", {className: "lotusMeta"}, contentCtnr);
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
	        bidiUtil.enforceTextDirectionOnPage(this.listCtnr.parentNode);
	        if (this.focusDiv && !isInitial) {
	            this.focusDiv.focus();
	        } //If show more is clicked, we should focus on the first new item.
	
	        misc.addMessageToNewWindowLinks();
	    },
	    _showErrorMsg: function (isInitial, errorData) {
	        domConstruct.empty(this.error);
	        var span = domConstruct.create("span");
	        var d = windowModule.doc;
	        var scope = this;
	        var errorMsg = this.prevItem ? this._strings.ERROR_ADDTL : this._strings.ERROR;
	        html.substitute(d, span, errorMsg, {
	            again: function () {
	                var a = domConstruct.create("a");
	                a.href = "#";
	                a.setAttribute("role", "button");
	                a.title = scope._strings.ERROR_AGAIN_TITLE;
	                a.appendChild(d.createTextNode(scope._strings.ERROR_AGAIN));
	                scope.connect(a, "onclick", lang.hitch(scope, scope._tryAgain, isInitial));
	                return a;
	            }
	        });
	
	        var div;
	
	        if (!isInitial) {
	            div = domConstruct.create("div", {className: "lotusMessage2", role: "alert"}, this.error);
	            div.style.margin = "10px 0 0 0";
	            var img = domConstruct.create("img", {className: "lconnSprite lconnSprite-iconError16", alt: this.ERROR_ALT, title: this.ERROR_ALT, src: this._blankGif}, div);
	            img.style.marginRight = "10px";
	            var msg = domConstruct.create("span", {}, div);
	            msg.appendChild(span);
	        }
	        else {
	            div = domConstruct.create("div", {className: "lconnEmpty", role: "alert"}, this.error);
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
	        domConstruct.empty(this.listCtnr);
	        this.main.style.display = "none";
	        this._clearErrors();
	        if (!this.disablePaging) {
	            this.moreLink.style.display = "none";
	        }
	    },
	    _clearErrors: function () {
	        this.error.style.display = "none";
	        domConstruct.empty(this.error);
	    },
	    /* User has switched from desc to asc, start counters over */
	    _sortAsc: function () {
	        dom.byId("sortAsc").style.display = "";
	        dom.byId("sortDesc").style.display = "none";
	        this._sort();
	        this._ds.switchSort(false);
	        this._getHistoryItems();
	    },
	    /* User has switched from asc to desc, start counters over */
	    _sortDesc: function () {
	        dom.byId("sortDesc").style.display = "";
	        dom.byId("sortAsc").style.display = "none";
	        this._sort();
	        this._ds.switchSort(true);
	        this._getHistoryItems();
	    },
	    onDisplayChange: function () {
	    }
	});
	return History;
});
