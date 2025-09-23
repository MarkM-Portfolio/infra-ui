/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/dom-construct",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/i18n!ic-personcard/tab/nls/Network",
	"dojo/query",
	"dojo/request",
	"dojo/text!ic-personcard/tab/templates/Network.html",
	"dijit/_Container",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-personcard/tab/network/InviteForm"
], function (dojo, domConstruct, declare, lang, windowModule, i18nNetwork, query, request, template, _Container, _Templated, _Widget, InviteForm) {

	(function() {
								var _strings = i18nNetwork;
		
		var Network = declare("com.ibm.social.personcard.tab.Network", [_Widget, _Templated, _Container], {
			widgetsInTemplate: true,
	
			templateString: template,
			_strings: _strings,
			
			postMixInProperties: function() {
				this.user = this.user || this.context.user;
				for (var i in {"inNetwork":1, "labelMessage":1, "pendingNetwork":1})
					this["_m_"+i] = dojo.string.substitute(_strings[i], [this.user.name]);
			},
			
			postCreate: function() {
				this.inherited(arguments);
				this.connect(this.formNode, "setErrors", function() {this.context.contentChanged();});
				this._getInvitation()
					.addCallback(this, "_loaded")
					.addErrback(this, "_error");
			},
			
			onActive: function() {
				this._takeFocus = true;
				this.focus();
			},
			
			onInactive: function() {
				this._takeFocus = false;
			},
			
			focus: function() {
				if (this._takeFocus) {
					var nodes = {"networkNode":1, "loadingNode":1, "formNode":1, "pendingNode":1};
					for (var i in nodes) {
						var node = this[i];
						if (node.declaredClass && node.isFocusable())
							node.focus();
						else if (node.style.display == "") {
							node = query("*[dojoFirstFocus]",node)[0] || node;
							dijit.focus(node);
						}
					}
				}
			},
			
			onReflow: function() {},
			
			_getInvitation: function() {
				//TODO: TEST ONLY
				var urls = ["test/card/api/outofnetwork.json", "test/card/api/innetwork.json", "test/card/api/error.json", "test/card/api/pending.json", "test/card/api/unauth.json"];
				return request(require.toUrl("ic-personcard/" + urls[Math.floor(Math.random()*urls.length)]), {method: "GET", handleAs: "json"});
			},
			
			_loaded: function(response) {
				this.context.contentChanging();
				this.loadingNode.style.display = this.formNode.domNode.style.display = "none";
				if (response.pending)
					this.pendingNode.style.display = "";
				else if (response.inNetwork)
					this.networkNode.style.display = ""
				else {
					this.context.setCloseable(false);
					this.formNode.domNode.style.display = "";
				}
				this.context.contentChanged(lang.hitch(this, "focus"));
			},
			
			_error: function(response) {
				this.context.contentChanging();
				domConstruct.empty(this.loadingNode);
				var msg = _strings.error;
				if (response.dojoType == "cancel" && response.code == "unauthenticated")
					msg = _strings.notLoggedIn;
				this.loadingNode.appendChild(windowModule.doc.createTextNode(msg));
				this.context.contentChanged();
			}
		});
	})();
	return Network;
});
