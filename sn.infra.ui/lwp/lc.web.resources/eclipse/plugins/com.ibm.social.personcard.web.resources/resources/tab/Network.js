/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
	dojo.provide("com.ibm.social.personcard.tab.Network");
	dojo.require("dijit._Widget");
	dojo.require("dijit._Templated");
	dojo.require("dijit._Container");
	dojo.require("com.ibm.social.personcard.tab.network.InviteForm");
	dojo.requireLocalization("com.ibm.social.personcard.tab", "Network");
	var _strings = dojo.i18n.getLocalization("com.ibm.social.personcard.tab", "Network");
	
	dojo.declare("com.ibm.social.personcard.tab.Network", [dijit._Widget, dijit._Templated, dijit._Container], {
		widgetsInTemplate: true,

		templatePath: dojo.moduleUrl("com.ibm.social.personcard", "tab/templates/Network.html"),
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
						node = dojo.query("*[dojoFirstFocus]",node)[0] || node;
						dijit.focus(node);
					}
				}
			}
		},
		
		onReflow: function() {},
		
		_getInvitation: function() {
			//TODO: TEST ONLY
			var urls = ["test/card/api/outofnetwork.json", "test/card/api/innetwork.json", "test/card/api/error.json", "test/card/api/pending.json", "test/card/api/unauth.json"];
			return dojo.xhrGet({handleAs: "json", url: dojo.moduleUrl("com.ibm.social.personcard", urls[Math.floor(Math.random()*urls.length)])});
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
			this.context.contentChanged(dojo.hitch(this, "focus"));
		},
		
		_error: function(response) {
			this.context.contentChanging();
			dojo.empty(this.loadingNode);
			var msg = _strings.error;
			if (response.dojoType == "cancel" && response.code == "unauthenticated")
				msg = _strings.notLoggedIn;
			this.loadingNode.appendChild(dojo.doc.createTextNode(msg));
			this.context.contentChanged();
		}
	});
})();
