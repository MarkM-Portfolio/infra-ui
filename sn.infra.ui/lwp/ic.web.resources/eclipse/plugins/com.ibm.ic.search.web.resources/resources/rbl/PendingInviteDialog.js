/* Copyright IBM Corp. 2015  All Rights Reserved.             */

define([
	"dojo/request/xhr",
	"dojo/i18n!ic-search/rbl/nls/PendingInviteDialog",
	"dojo/_base/declare",
	"dojo/i18n",
	"dojo/_base/lang",
	"dojo/text!ic-search/rbl/templates/PendingInviteDialog.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-core/config/services",
	"ic-core/url"
], function (xhr, i18nPendingInviteDialog, declare, i18n, lang, template, _Templated, _Widget, services, urlModule) {

	/**
	 * This widget represents the pending invite form for a Restricted but Listed Community
	 * 
	 * @class lconn.search.rbl.PendingInviteDialog
	 */
	var PendingInviteDialog = declare(
		"lconn.search.rbl.PendingInviteDialog",
		[_Widget, _Templated], /** @lends lconn.search.rbl.PendingInviteDialog.prototype */
	{
		templateString: template,
		
		/**
		 * The Community id.
		 * 
		 * @default [""]
		 * @type {String}
		 */
		commUuid: "",
		
		/**
		 * The Community name.
		 * 
		 * @default [""]
		 * @type {String}
		 */
		commName: "",
		
		/**
		 * The Community description.
		 * 
		 * @default [""]
		 * @type {String}
		 */
		commDescription: "",
		
		/**
		 * The directoryUuid of the current user
		 * 
		 * @default [""]
		 * @type {String}
		 */
		directoryUuid: "",
		
		/**
		 * The function to be executed clicking on cancel button.
		 * 
		 * @type {Function}
		 */
		cancelFunction: function() {
			//Nothing here - Callback
		},
		
		_strings: null,
		
		postMixInProperties: function() {
			this.inherited(arguments);
			this._strings = i18nPendingInviteDialog;
			lang.mixin(this, this._strings);
		},
		
		postCreate: function() {
			this.inherited(arguments);
			
			if(!this.commDescription) {
				this.descriptionNode.style.display = "none";
			}
		},
		
		_acceptInvite: function() {
			var that = this;
			var contextRoot = urlModule.getServiceUrl(services.communities);
			var url = contextRoot + "/service/atom/community/members?communityUuid=" + this.commUuid;
			
			xhr(url, {
				data: '<?xml version="1.0" encoding="UTF-8"?>'
					+ '<entry xmlns="http://www.w3.org/2005/Atom" xmlns:snx="http://www.ibm.com/xmlns/prod/sn">'
						+ '<contributor>'
							+ '<snx:userid>' + this.directoryUuid + '</snx:userid>'
						+ '</contributor>'
						+ '<snx:role component="http://www.ibm.com/xmlns/prod/sn/communities">member</snx:role>'
						+ '<category term="person" scheme="http://www.ibm.com/xmlns/prod/sn/type"></category>'
					+ '</entry>',
				method: "POST",
				headers: {"Content-Type": "application/atom+xml"},
				handleAs:"text"
			}).then(lang.hitch(this, this._redirect, contextRoot + "/service/html/communitystart?communityUuid=" + that.commUuid),
				lang.hitch(this, this._redirect, contextRoot + "/service/html/communitystart?communityUuid=" + this.commUuid));
		},
		
		_redirect: function(location) {
			document.location.assign(location);
		},
		
		_cancel: function() {
			return this.cancelFunction();
		}
	});
	return PendingInviteDialog;
});