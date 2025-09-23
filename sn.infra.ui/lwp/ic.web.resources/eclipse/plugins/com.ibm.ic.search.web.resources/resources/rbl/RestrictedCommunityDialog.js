/* Copyright IBM Corp. 2015  All Rights Reserved.             */

define([
	"dojo/dom-class",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/fx",
	"dojo/query",
	"dojo/request/xhr",
	"dojo/cookie",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/Dialog",
	"ic-core/config/services",
	"ic-core/url",
	"ic-core/auth",
	"./RbLForm",
	"./PendingInviteDialog"
], function (domClass, array, declare, lang, fx, query, xhr, cookie, _Templated, _Widget, Dialog, services, urlModule, auth, RbLForm, PendingInviteDialog) {

	var COOKIE_ID = "lconn.search.rbl.RestrictedCommunityDialog.loginCookie";
	var COOKIE_EXPIRE_OFFSET = 2; //offset in minutes
	
	var RestrictedCommunityDialog = declare(
		"lconn.search.rbl.RestrictedCommunityDialog",
		[_Widget, _Templated],
	{
		templateString: '<div style="width: 100%; display: none;"></div>',
		templateXmlContent: '<?xml version="1.0" encoding="UTF-8"?><entry xmlns="http://www.w3.org/2005/Atom"><content type="html">{content}</content></entry>',
		pageContent: null,
		leftColumn: null,
		scrollLevel: null,
		formNode: null,
		rblForm: null,
		
		SERVICE_URL: "/service/atom/community/requestsToJoin",
		
		postCreate: function() {
			this.inherited(arguments);
			this.pageContent = query(".lotusContent")[0];
			this.leftColumn = query(".lotusColLeft")[0];
			if(!this.pageContent || !this.leftColumn) {
				return;
			}
			this.pageContent.appendChild(this.domNode);
		},
		
		showJoinForm: function(commId, commName, commDescription, placeDisplayId) {
			if(!this.pageContent || !this.leftColumn) {
				return;
			}
			
			if(!auth.isAuthenticated()) {
				var date = new Date();
				date.setMinutes(date.getMinutes() + COOKIE_EXPIRE_OFFSET);
				cookie(COOKIE_ID, JSON.stringify({
					pathname: window.location.pathname,
					widgetId: placeDisplayId,
					scroll: document.body.scrollTop
				}), {expires: date.toUTCString()});
				auth.login();
			}
			
			var contextRoot = urlModule.getServiceUrl(services.communities);
			var url = contextRoot + "/service/json/community/accessstatus?communityUuid=" + commId;
			xhr(url, {
				method: "GET",
				handleAs: "json",
				failOk: true
			}).then(lang.hitch(this, function(data) {
				if (data && data.canView) {
					window.location = contextRoot + "/service/html/communitystart?communityUuid=" + commId;
				} else if(data && data.canAcceptInvite) {
					this._showInviteDialog(commId, commName, commDescription, data.directoryUuid);
				} else {
					this._showForm(commId, commName, commDescription);
				}
			}), lang.hitch(this, function() {
				this._showForm(commId, commName, commDescription);
			}));
		},
		
		_showForm: function(commId, commName, commDescription) {
			this.domNode.innerHtml = "";
			this.formNode = document.createElement("div");
			this.domNode.appendChild(this.formNode);
			this.rblForm = new RbLForm({
				commName: commName || "",
				commDescription: commDescription || "",
				submitFunction: lang.hitch(this, "_submitForm", commId),
				cancelFunction: lang.hitch(this, "_cancelForm")
			}, this.formNode);
			this.rblForm.startup();
			
			var that = this;
			this.scrollLevel = document.body.scrollTop;
			array.forEach(this.leftColumn.children, function(node, i) {
				fx.fadeOut({
					node: node,
					duration: 200,
					onEnd: function() {
						domClass.add(node, "lotusHidden");
					}
				}).play();
			});
			array.forEach(this.pageContent.children, function(node, i) {
				if(node == that.domNode) {
					return;
				}
				fx.fadeOut({
					node: node,
					duration: 200,
					onEnd: function() {
						domClass.add(node, "lotusHidden");
					}
				}).play();
			});
			fx.fadeIn({
				node: that.domNode,
				duration: 200,
				onBegin: function() {
					that.domNode.style.display = "";
				}
			}).play();
		},
		
		_showInviteDialog: function(commId, commName, commDescription, directoryUuid) {
			var dialog = new Dialog();
			var dialogContent = new PendingInviteDialog({
				commUuid: commId,
				commName: commName,
				commDescription: commDescription,
				directoryUuid: directoryUuid,
				cancelFunction: function() {
					dialog.hide();
				}
			});
			dialogContent.startup();
			dialog.startup();
			dialog.connect(dialog, "hide", function() {
				dialogContent.destroy();
			});
			dialog.set("content", dialogContent.domNode);
			dialog.show();
		},
		
		_submitForm: function(commId, content) {
			var url = urlModule.getServiceUrl(services.communities) + this.SERVICE_URL + "?communityUuid=" + commId;
			var xhrArgs = {
				method: "POST",
				handleAs: "xml",
				headers: {
					"Content-Type": "application/atom+xml"
				},
				data: lang.replace(this.templateXmlContent, {content: content}),
				failOk: true
			};
			var that = this;
			xhr(url, xhrArgs).response.then(lang.hitch(this, "_handleResponse"), lang.hitch(this, "_handleError"));
			
			//return false to prevent form submit
			return false;
		},
		
		_handleResponse: function(response) {
			if (response.xhr.status == 201) {
				this._cancelForm();
				this.onSuccess();
			} else {
				this._handleError(null);
			}
		},
		
		_handleError: function(error) {
			this._cancelForm();
			this.onError();
		},
		
		_cancelForm: function() {
			if(!this.pageContent || !this.leftColumn) {
				return;
			}
			
			var that = this;
			array.forEach(this.leftColumn.children, function(node, i) {
				fx.fadeIn({
					node: node,
					duration: 200,
					onBegin: function() {
						domClass.remove(node, "lotusHidden");
					}
				}).play();
			});
			array.forEach(this.pageContent.children, function(node, i) {
				if(node == that.domNode) {
					return;
				}
				fx.fadeIn({
					node: node,
					duration: 200,
					onBegin: function() {
						domClass.remove(node, "lotusHidden");
					},
					onEnd: function() {
						window.scrollTo(0, that.scrollLevel);
					}
				}).play();
			});
			fx.fadeOut({
				node: that.domNode,
				duration: 200,
				onEnd: function() {
					that.domNode.style.display = "none";
					that.rblForm.destroy();
				}
			}).play();
		},
		
		onSuccess: function() {
			//Callback - nothing here
		},
		
		onError: function() {
			//Callback - nothing here
		}
	});
	
	return RestrictedCommunityDialog;
});