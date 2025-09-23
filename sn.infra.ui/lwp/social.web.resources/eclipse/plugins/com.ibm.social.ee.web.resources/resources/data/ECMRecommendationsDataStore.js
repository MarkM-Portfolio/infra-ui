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

dojo.provide("com.ibm.social.ee.data.ECMRecommendationsDataStore");

dojo.require("com.ibm.social.ee.data.RecommendationsDataStore");
dojo.require("com.ibm.social.ee.data._JsonRecommendationsMixin");
dojo.require("com.ibm.social.ee.bean.AtomBean");

dojo.declare("com.ibm.social.ee.data.ECMRecommendationsDataStore", [com.ibm.social.ee.data.RecommendationsDataStore, com.ibm.social.ee.data._JsonRecommendationsMixin], {
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
      return new com.ibm.social.ee.bean.AtomBean(el, base);
   },
   captureResponseUrl: function(response) {
      var likeResponse = response.documentElement;
      if (likeResponse) {
         var unlikeUrl = this.itemFromDocEl(likeResponse).getUrlEntry();
         this.entryUrl = unlikeUrl; //update entry url      
      }	   
   }
});