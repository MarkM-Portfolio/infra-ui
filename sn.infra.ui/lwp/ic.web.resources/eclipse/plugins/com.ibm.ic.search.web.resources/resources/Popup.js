/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.           */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/request/xhr",
	"dojox/xml/parser",
	"dijit/_Widget",
	"ic-core/DialogUtil",
	"ic-core/xslt",
	"ic-core/ajax/auth"
], function (declare, lang, xhr, parser, _Widget, DialogUtil, xsltModule, authModule) {

	var Popup = declare(
		"lconn.search.Popup",
		_Widget,
	{
		
		title: null,
		loadingString: null,
		url: null,
		timeout: null,
		xslt: null,
		xsltArgs: null,
		_dialog: null,
		
		buildRendering: function() {
			var d = DialogUtil._getDialog();
			d.lotusTitleNode.innerHTML = this.title;
			d.lotusContentNode.innerHTML = '<img class="lotusLoading" src="'
				+this._blankGif+'" role="presentation"/>&nbsp;'
				+this.loadingString;
			d.lotusCancelNode.style.display = 'none';
			d.lotusSubmitNode.value=i18nstrings.rs_ok;
			d.lotusSubmitNode.onclick = function() { d.hide(); };
			this._dialog = d;
		},
		
		postCreate: function(){	
			this._dialog.show();
			
			var bindArgs={
				method: "GET",
				handleAs: "text",
				timeout: this.timeout,
				sync: false,
				handle: lang.hitch(this,"_handleResults")
			};
			
			if(!this.publicSearch && (typeof authModule.prepareSecure == "function")) {
				bindArgs = authModule.prepareSecure(bindArgs,lang.hitch(this,"_isLogin"));
			}
		
			var req = xhr(this.url, bindArgs).response.then(
					function(response) {
						var res = lang.mixin({}, response);
						res.args = lang.mixin(res.args, response.options);
						bindArgs.handle(response.data || response.text, res);
					});
		},
	
		_handleResults: function(data) {
			if (this.xslt != null){
				var xml = parser.parse(data);
				var result = xsltModule.transformDocument(xml, this.xslt, this.xsltArgs);
				this._dialog.lotusContentNode.innerHTML = result;
			} else {
				this._dialog.lotusContentNode.innerHTML = data;
			}
		},
		
		_isLogin: function(response) {
			var login = true;
			if (response != null) {
				if (response.substring(0, 5) == "<?xml") {
					login = false;
				}
			}
			return login;
		}
	
	});
	
	return Popup;
});
