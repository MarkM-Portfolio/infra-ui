/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/i18n!./nls/searchValidation",
	"dojo/request/xhr",
	"dojo/text!./templates/searchSystemOutValidation.html",
	"dijit/registry",
	"ic-core/config/services",
	"ic-core/url",
	"./searchValidation"
], function (declare, lang, domConstruct, i18nsearchValidation, xhr, template, registry, coreServices, urlModule, searchValidation) {

	var searchSystemOutValidation = declare(
		"lconn.search.searchSystemOutValidation",
		searchValidation,
	{
	
		URL_PATH:						"/json/validate/searchlogs",
		TIMEOUT:						240000,
		_strings:						i18nsearchValidation,
		templateString:					template,
		
		runRequest: function(){
			
			var searchService = coreServices.search;
			if (urlModule.secure){
				var searchUrl = searchService.secureUrl;
			} else {
				var searchUrl = searchService.url;
			}
			
			var url = searchUrl + this.URL_PATH;
			this.showLoading();
			domConstruct.empty(this.container);
			xhr(url, {
				method: "GET",
				handleAs: "json",
				timeout: this.TIMEOUT,
				sync: false
			}).then(lang.hitch(this,"_handleResults"), lang.hitch(this,"_onError"));
		},
		
		_handleResults: function(/* Object */obj) {
			this.hideLoading();
			var id = registry.getUniqueId(this.declaredClass);
			var errors = obj.checkLogsForErrors_token;
			var nameOfNode = obj.nodeInfoName;
			
			this._createHeading(this._strings.NODE + nameOfNode.nodeName, id);
			this._printInfoMsgsAdvanced(this._strings.LOGS, errors, this._strings.LOGSMSG);
		}	
	});
	return searchSystemOutValidation;
});
