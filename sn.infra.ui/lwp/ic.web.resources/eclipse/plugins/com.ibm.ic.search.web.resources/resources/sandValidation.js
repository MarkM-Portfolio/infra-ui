/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/i18n!./nls/searchValidation",
	"dojo/request/xhr",
	"dojo/text!./templates/sandValidation.html",
	"dijit/registry",
	"ic-core/config/services",
	"ic-core/url",
	"./searchValidation"
], function (declare, lang, domConstruct, i18nsearchValidation, xhr, template, registry, services, urlModule, searchValidation) {

	var sandValidation = declare(
		"lconn.search.sandValidation",
		searchValidation,
	{
		
		URL_PATH:		"/json/validate/SAND",
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
			var id = registry.getUniqueId(this.declaredClass);
			var sandInfo = obj.validatingSANDIndexing_token;
			var nameOfNode = obj.nodeInfoName;
			
			this._createHeading(this._strings.NODE + nameOfNode.nodeName, id);
			this._printInfoMsgsAdvanced(this._strings.CHECK_FOR_SAND_FILES, sandInfo, this._strings.IS_FILE_AVAILABLE);
		}
	});
	return sandValidation;
});
