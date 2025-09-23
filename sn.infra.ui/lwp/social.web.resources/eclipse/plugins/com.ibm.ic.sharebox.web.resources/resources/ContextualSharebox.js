/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/topic",
	"dijit/_Widget",
	"ic-sharebox/data/ConfigDataStore",
	"net/jazz/ajax/xdloader"
], function (declare, lang, domConstruct, topic, _Widget, ConfigDataStore, xdloader) {

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
	
	var ContextualSharebox = declare("com.ibm.social.sharebox.ContextualSharebox", _Widget, {
		
		buildRendering: function () {	
			this.inherited(arguments);	
			this.containerNode = domConstruct.create("div", { }, this.domNode);
			this.loadingDiv = domConstruct.create("div", { }, this.containerNode);
			this.showLoading();
			var url = this.newsSvcUrl + "/sharebox/config.action";
			var params = { type: "local", resourceType: this.context.resourceType, resourceId: this.context.resourceId };
			if(this.context.userRole) {
			    params.userRole = this.context.userRole;
			}
			url = util.proxy(util.url.rewrite(url, params));
			this.configDs = new ConfigDataStore({ url: url });		
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
					xdloader.load_async(formClass, function () {
						var formConstructor = lang.getObject(formClass);
						var formNode = domConstruct.create("div", { }, self.containerNode);
						var formParams = { context: self.context, params: ds.getValue(item, "parameters") };
						topic.publish(com.ibm.social.as.constants.events.MICROBLOGCONFIGLOADED, formParams);
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
	return ContextualSharebox;
});
