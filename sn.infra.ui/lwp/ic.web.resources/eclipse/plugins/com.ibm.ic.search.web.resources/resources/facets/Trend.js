/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.           */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/i18n!../nls/Trend",
	"./Tag"
], function (declare, lang, i18nTrend, Tag) {

	var Trend = declare(
		"lconn.search.facets.Trend",
		Tag,
	{	
		facetId:	"Trend",
		
		postMixInProperties :function(){
			this.inherited(arguments);
			
			// Replace all Tag facet specific strings with Trend facet replacements
			var strings = i18nTrend;
			this.nls = lang.clone(this.nls);
			lang.mixin(this.nls, strings);
		},
		
		buildRendering: function(){
			this.inherited(arguments);
			
			// Remove list view, since trend weight is not the same as tag weight
			var linkElem = this._tagCloudLink;
			var parentLink = linkElem.parentNode;
			parentLink.removeChild(linkElem);
		}
	
	});
	
	return Trend;
});
