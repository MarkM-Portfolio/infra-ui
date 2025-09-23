/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/i18n!./nls/searchValidation",
	"dojo/request/xhr",
	"dojo/text!./templates/searchInitialIndexBuildValidation.html",
	"dijit/registry",
	"ic-core/config/services",
	"ic-core/url",
	"./searchValidation"
], function (declare, lang, domConstruct, i18nsearchValidation, xhr, template, registry, services, urlModule, searchValidation) {

	var searchInitialIndexBuildValidation = declare(
		"lconn.search.searchInitialIndexBuildValidation",
		searchValidation,
	{
		
		URL_PATH:		"/json/validate/initialIndexBuildLog",
		TIMEOUT:		240000,
		_strings:		i18nsearchValidation,
		templateString: template,
		
		runRequest: function(){
			
			var searchService = services.search;
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
			var id = registry.getUniqueId(this.declaredClass + "res");
			var feed = obj.checkForCrawlingFailing;
			var nameOfNode = obj.nodeInfoName;
			
			this._createHeading(this._strings.NODE + nameOfNode.nodeName, id);
			this._printCrawlFailedMsg(this._strings.ERRORS_DURING_INITIAL_INDEXING, feed, this._strings.CRAWL_FAILED, this._strings.EXCEPTION_ENCOUNTERED);
		}
	});
	return searchInitialIndexBuildValidation;
});
