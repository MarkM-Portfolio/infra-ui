/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/query",
	"dojo/text!ic-ee/widget/templates/Login.html",
	"dojo/topic",
	"dijit/_Templated",
	"dijit/_Widget"
], function (dojo, declare, lang, dom, domClass, query, template, topic, _Templated, _Widget) {

	var LoginPage = declare("com.ibm.social.ee.widget.LoginPage", [_Widget, _Templated], {
	   url: null,
	   blankGif: null,
	   net: null,
	   _strings: i18nsocialEEStrings.login,
	   templateString: template,
	   postCreate: function() {
	      this.inherited(arguments);   
	      var body = query("body")[0];
	      domClass.add(body, "lotusLogin2");
	   },
	   authenticate: function(e) {
	      e.preventDefault(), e.stopPropagation();
	      var body = this._getBody();
	      if(body) {
	         this.net.postXml({
	            url: this.url + "/j_security_check",
	            handleAs: "text",
	            postData: body,
	            headers: {"Content-Type":"application/x-www-form-urlencoded"},
	            load: lang.hitch(this, this.authSuccess),
	            error: lang.hitch(this, this.authError)
	         });
	      }
	      else {
	         this.error.style.display = "";
	      }
	   },
	   _getBody: function() {
	      var user = dom.byId("username").value;
	      var pw = dom.byId("password").value;
	      if (user) {
	        return "j_username=" + encodeURI(user) + "&j_password=" + encodeURI(pw);
	      }
	      return null;
	         
	   },
	   authSuccess: function(response, opts) {},
	   authError: function(error, opts) {}
	});
	return LoginPage;
});
