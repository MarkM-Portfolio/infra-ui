/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/kernel",
	"dojo/data/api/Read",
	"ic-incontext/NetworkDojo"
], function (dojo, declare, lang, kernel, Read, NetworkDojoModule) {

	/**
	 * Sharebox configuration data store.
	 * Expected constructor arguments: 
	 * 	   url,
	 *     net (instance of network. If not specified, NetworkDojo is used)
	 */
	var ConfigDataStore = declare("com.ibm.social.sharebox.data.ConfigDataStore", Read, {
		constructor: function (params) {
			lang.mixin(this, params);
			if (!this.net) {
				this.net = new NetworkDojoModule();
			}
		},
		getValue: function (item, attribute, defaultValue) {
			return item[attribute] || defaultValue;
		},
		getValues: function (item, attribute) {
			return [ this.getValue(item, attribute) ];
		},
		fetch: function (req) {
			var dfd = this.net.getJson({
				url: this.url,
				preventCache: true,
				load: lang.hitch(this, this.handleData, req),
				error: lang.hitch(this, this.handleError, req)
			});
		},
		handleData: function (req, data) {
			var items = data.forms || [];
			var scope = req.scope || kernel.global;
			if (req.onBegin) req.onBegin.call(scope, items.length, req);
			if (req.onItem) {
				for (var i = 0; i < items.length; i++)
					req.onItem.call(scope, items[i], req);
			}
			if (req.onComplete) req.onComplete.call(scope, req.onItem ? null : items, req);
		},
		handleError: function (req, error) {
			if (req.onError) {
				req.onError.call(req.scope || kernel.global, error, req);
			}
		}
	});
	return ConfigDataStore;
});
