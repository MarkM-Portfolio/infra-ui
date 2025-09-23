/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/query",
	"dojo/request",
	"dijit/_Contained",
	"dijit/form/Form",
	"ic-ui/controls/FormErrors"
], function (dojo, declare, query, request, _Contained, Form, FormErrors) {

	(function() {
						
		var InviteForm = declare("com.ibm.social.personcard.tab.network.InviteForm", [Form, _Contained, FormErrors], {
			focus: function() {
				dijit.focus(query("*[dojoFirstFocus]",this.domNode)[0]);
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
				return request(require.toUrl("ic-core/" + urls[Math.floor(Math.random()*urls.length)]), {method: "GET", handleAs: "json"});
			},
			onInvited: function(response) {},
			_error: function() {
				this.setErrors([{message: "Unable to invite this user."}]);
				// shove a node up top
			}
		});
	})();
	return InviteForm;
});
