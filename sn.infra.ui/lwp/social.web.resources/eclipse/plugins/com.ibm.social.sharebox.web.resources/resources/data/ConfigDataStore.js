/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.sharebox.data.ConfigDataStore");

dojo.require("dojo.data.api.Read");
dojo.require("com.ibm.social.incontext.NetworkDojo");

/**
 * Sharebox configuration data store.
 * Expected constructor arguments: 
 * 	   url,
 *     net (instance of network. If not specified, NetworkDojo is used)
 */
dojo.declare("com.ibm.social.sharebox.data.ConfigDataStore", [dojo.data.api.Read], {
	constructor: function (params) {
		dojo.mixin(this, params);
		if (!this.net) {
			this.net = new com.ibm.social.incontext.NetworkDojo();
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
			load: dojo.hitch(this, this.handleData, req),
			error: dojo.hitch(this, this.handleError, req)
		});
	},
	handleData: function (req, data) {
		var items = data.forms || [];
		var scope = req.scope || dojo.global;
		if (req.onBegin) req.onBegin.call(scope, items.length, req);
		if (req.onItem) {
			for (var i = 0; i < items.length; i++)
				req.onItem.call(scope, items[i], req);
		}
		if (req.onComplete) req.onComplete.call(scope, req.onItem ? null : items, req);
	},
	handleError: function (req, error) {
		if (req.onError) {
			req.onError.call(req.scope || dojo.global, error, req);
		}
	}
});