/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
	dojo.provide("com.ibm.social.personcard.tab.network.InviteForm");
	dojo.require("dijit.form.Form");
	dojo.require("dijit._Contained");
	dojo.require("com.ibm.oneui.controls.FormErrors");
	
	dojo.declare("com.ibm.social.personcard.tab.network.InviteForm", [dijit.form.Form, dijit._Contained, com.ibm.oneui.controls.FormErrors], {
		focus: function() {
			dijit.focus(dojo.query("*[dojoFirstFocus]",this.domNode)[0]);
		},
		onSubmit: function() {
			var obj = dojo.formToObject(this.domNode);
			this.setErrors();
			this._update(obj)
				.addCallback(this, "onInvited")
				.addErrback(this, "_error");
			return false;
		},
		
		_update: function(obj) {
			//TODO: TEST ONLY
			var urls = ["test/card/api/error.json", "test/card/api/pending.json"];
			return dojo.xhrGet({handleAs: "json", url: dojo.moduleUrl("lconn.core", urls[Math.floor(Math.random()*urls.length)])});
		},
		onInvited: function(response) {},
		_error: function() {
			this.setErrors([{message: "Unable to invite this user."}]);
			// shove a node up top
		}
	});
})();
