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

dojo.provide("com.ibm.social.sharebox.ContextualSharebox");

dojo.require("dijit._Widget");
dojo.require("com.ibm.social.incontext.util.url");
dojo.require("com.ibm.social.incontext.util.html");
dojo.require("com.ibm.social.incontext.util.proxy");
dojo.require("com.ibm.social.sharebox.data.ConfigDataStore");
dojo.require("net.jazz.ajax.xdloader");

/**
 * Expected parameters:
 *   newsSvcUrl : the service URL for News
 *   context: the context of this sharebox, includes the following items
 * 	    - resourceId: community id or user id
 *      - resourceType: community or person
 *   
 */

(function() {
var util = com.ibm.social.incontext.util;

dojo.declare("com.ibm.social.sharebox.ContextualSharebox", [dijit._Widget], {
	
	buildRendering: function () {	
		this.inherited(arguments);	
		this.containerNode = dojo.create("div", { }, this.domNode);
		this.loadingDiv = dojo.create("div", { }, this.containerNode);
		this.showLoading();
		var url = this.newsSvcUrl + "/sharebox/config.action";
		var params = { type: "local", resourceType: this.context.resourceType, resourceId: this.context.resourceId };
		if(this.context.userRole) {
		    params.userRole = this.context.userRole;
		}
		url = util.proxy(util.url.rewrite(url, params));
		this.configDs = new com.ibm.social.sharebox.data.ConfigDataStore({ url: url });		
	},
	
	postCreate: function () {
		this.inherited(arguments);
		this.configDs.fetch({
			scope: this,
			onComplete: function (items, request) {
				this.displayForms(items);
			},
			onError: function (errorData, request) {
				this.hideLoading();
			}
		});
	},
	
	displayForms: function (forms) {
		// For this implementation, only the first form returned is displayed
		var ds = this.configDs;
		if (forms.length) {
			var item = forms[0];
			var formClass = ds.getValue(item, "widgetClass");
			if (formClass) {
				// Make sure the form class is loaded
				var self = this;
				net.jazz.ajax.xdloader.load_async(formClass, function () {
					var formConstructor = dojo.getObject(formClass);
					var formNode = dojo.create("div", { }, self.containerNode);
					var formParams = { context: self.context, params: ds.getValue(item, "parameters") };
					dojo.publish(com.ibm.social.as.constants.events.MICROBLOGCONFIGLOADED, [formParams]);
					if(self.xhrHandler) {
						formParams.xhrHandler = self.xhrHandler;
					}
					new formConstructor(formParams, formNode);					
					self.hideLoading();
				});
			} else {
				this.hideLoading();
			}
		}
	},
	
	showLoading: function () {
		util.html.showLoading(this.loadingDiv);
	},
	
	hideLoading: function () {
		this.loadingDiv.style.display = "none";
	}
	
});

})();