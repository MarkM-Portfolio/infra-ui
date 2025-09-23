/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_Widget",
	"dijit/_Templated",
	"dojo/i18n!./nls/resultsView"
], function (declare, lang, _Widget, _Templated, i18nresultsView) {
	
	var SearchResultsFeed = declare(
		"lconn.search.SearchResultsFeed",
		[_Widget, _Templated],
	{
		templateString: '<div class="lotusFeeds"><a target="_self" class="lotusFeed lotusAction" data-dojo-attach-event="onclick: createSearchResultsFeed" href="{feedUrl}">{feedTitle}</a></div>',
		resourceBundle: null,
		searchResultsFeed: null,	// the REST API passed from 
		feedTitle: null, 
		
		postMixInProperties: function () {
			this.resourceBundle = i18nresultsView;
			var feedLinkTitle = this.resourceBundle["FEED_TITLE"];
			this.createSearchResultsFeed(); 
			this.templateString = lang.replace(this.templateString,{"feedUrl" : this.searchResultsFeed, "feedTitle" : feedLinkTitle});
		},
		
		_removeParametersFromUrl: function(paramKey) {
			var prevUrl = this.searchResultsFeed;
			var paramKeyLength = paramKey.length;
			var start = prevUrl.indexOf(paramKey);
			var end = -1;
			var newUrl = prevUrl;
			while (start !== -1) {
				end = prevUrl.indexOf("&", start + paramKeyLength);
				newUrl = prevUrl.substring(0, start);
				if (end !== -1) {
					newUrl = newUrl + prevUrl.substring(end);
				}
				prevUrl = newUrl;
				start = prevUrl.indexOf(paramKey);
			}
			this.searchResultsFeed = newUrl;
		},
		
		_useBasicAtomApi: function(){
			var basicPattern = "/search/atom/";
			var fbaPattern = "/search/atomfba/";
			var oauthPatten = "/search/oauth/";
			var prevUrl = this.searchResultsFeed;
			var newUrl = prevUrl;
			if (prevUrl.indexOf(fbaPattern) !== -1){
				newUrl = prevUrl.replace(fbaPattern, basicPattern);
			}
			if (prevUrl.indexOf(oauthPatten) !== -1){
				newUrl = prevUrl.replace(oauthPatten, basicPattern);
			}
			this.searchResultsFeed = newUrl;
		},
		
		createSearchResultsFeed: function() {
			this._removeParametersFromUrl("&facet");
			this._removeParametersFromUrl("&promoteStatusUpdates");
			this._useBasicAtomApi();
		},
		
		showSearchResultsFeed: function() {
			document.location = this.searchResultsFeed;
		}
		
	});
	
	return SearchResultsFeed;
});