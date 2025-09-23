/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean",
	"ic-ee/data/RecommendationsDataStore",
	"ic-ee/data/_JsonRecommendationsMixin"
], function (declare, AtomBean, RecommendationsDataStore, _JsonRecommendationsMixin) {

	var ECMRecommendationsDataStore = declare("com.ibm.social.ee.data.ECMRecommendationsDataStore", [RecommendationsDataStore, _JsonRecommendationsMixin], {
	   fetchItemByIdentity: function (request) {
	      this._getRecommendation(request);
	   },
	   _getNewItemUrl: function(item) {
	      return this.url;
	   },
	   _addAddtlParams: function(request) {return {pageSize: "25"};},
	   /**
	    * If fetch() is called with a request parameter that does not contain a
	    * nonzero count field, the data store will not actually make an AJAX
	    * request. Instead, it will use this method to construct a fake response
	    * object that does not contain the user information.
	    */ 
	   
	   _getEmptyResult: function() {
	      return { items: [ ], totalRecommendations: this.recommendCount };
	   },
	   
	   _getList: function(data) {
	      return data.items;
	   },
	   
	   _getAuthorName: function(item) {
	      return item.name;
	   },
	   
	   _getAuthorId: function(item) {
	      return item.id;
	   },
	   
	   _getTotalResults: function(data) {
	      return data.totalRecommendations;
	   },
	   itemFromDocEl: function(el, base) {
	      return new AtomBean(el, base);
	   },
	   captureResponseUrl: function(response) {
	      var likeResponse = response.documentElement;
	      if (likeResponse) {
	         var unlikeUrl = this.itemFromDocEl(likeResponse).getUrlEntry();
	         this.entryUrl = unlikeUrl; //update entry url      
	      }	   
	   }
	});
	return ECMRecommendationsDataStore;
});
