/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojo/_base/lang"
], function(declare, lang) {

   var AjaxCall = declare("lconn.core.CommonTags.AjaxCall", null, {
      TAG_URL : '',
      REDIRECT_URL : '',
      TAG_TEMPLATE : '',
      URL_PARAMETERS : null,
      HANDLE_AS : '',

      constructor : function(args) {
         lang.mixin(this, args);
      },

      // load tags for tag widget
      // /Calls generateTagUrl method for tag url and carries out ajax call.
      // ////////
      getTags : function(callback, isFirstLoad, selectedTags) {
         var queryContent = this.generateTagParameters(selectedTags);

         var xhrArgs = {
            url : this.TAG_URL,
            content : queryContent,
            handleAs : this.HANDLE_AS,
            timeout : 30000,
            handle : callback
         };
         dojo.xhrGet(xhrArgs);
      },

      // ////////////////////
      // ////This calls generateTagUrl method for url to redirect and changes
      // the page location
      // ///////////////////

      redirect : function(tags) {

         if (tags != 'undefined' && tags != null) {
            if (this.REDIRECT_URL.indexOf('?') > 0) {// need to modify url to
               // add new tag
               this.REDIRECT_URL = this.REDIRECT_URL.substring(0, this.REDIRECT_URL.indexOf('?'));
               this.REDIRECT_URL += '?';
               this.REDIRECT_URL = this.generateTagUrl(this.REDIRECT_URL, tags);
               this._redirect(this.REDIRECT_URL);
            }
            else {
               this.REDIRECT_URL += '?';
               this.REDIRECT_URL = this.generateTagUrl(this.REDIRECT_URL, tags);
               this._redirect(this.REDIRECT_URL);
            }
         }
         else {
            this._redirect(this.REDIRECT_URL);
         }
      },

      _redirect : function(href) {
         window.location = href;
      },

      // ///////////////////////////////////////////////////////////////////////////////////////////////////////
      // ///ENCODE TAG PARAMETER METHOD
      // ///This method encodes the tag parameter for inclusion in the url
      // //
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////
      encodeTagParameter : function(searchTag) {

         var tagArray = searchTag.split(' '); // service needs to change this
         // depending on delimitting
         // pattern
         var encodedTag = null;
         for (var i = 0; i < tagArray.length; i++) { //
            var tag = tagArray[i];
            if (i > 0) {
               encodedTag += ' ' + encodeURIComponent(tag);
            }
            else {
               encodedTag = encodeURIComponent(tag);
            }

         }
         return encodedTag;
      },
      // ////////////////////////////////////////////////////////////////////////////////////////////////////////
      // URL GENERATION METHOD
      // This method would need to be overriden by sub classes if needed to
      // generate correct query content
      // given the url parameters and tags, this method generates an object as
      // part of the dojo.xhrPost query
      // /////////////////////////////////////////////////////////////////////////////////////////////////////////
      generateTagUrl : function(urlToForm, searchTag) {

         for ( var i in this.URL_PARAMETERS) {
            if (i != this.TAG_TEMPLATE) {
               var parameter = encodeURIComponent(this.URL_PARAMETERS[i]);
               urlToForm += i + "=" + parameter + "&";
            }

         }
         // //////////////////////////////////////////////////////////////////////////////////////////////////////////////
         // /
         // add the tag parameter last
         // /NOTE: Each service will need to change the next few lines depending
         // on how their tag parameter is constructed
         // /
         // /////////////////////////////////////////////////////////////////////////////////////////////////////////
         // get Tags from param

         if (searchTag != 'undefined' && searchTag != null && searchTag != '') {
            var encodedTag = this.encodeTagParameter(searchTag);
            urlToForm += this.TAG_TEMPLATE + '=' + encodedTag;
         }
         return urlToForm;
      },

      // ////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Tag Parameter GENERATION METHOD
      // This method generates correct query content
      // given the url parameters and tags, this method generates an object as
      // part of the dojo.xhrPost query
      // /////////////////////////////////////////////////////////////////////////////////////////////////////////
      generateTagParameters : function(searchTag) {
         var queryContent = {};
         if (this.URL_PARAMETERS != null) {
            queryContent = this.URL_PARAMETERS;
         }

         // //////////////////////////////////////////////////////////////////////////////////////////////////////////////
         // /
         // add the tag parameter last
         // /NOTE: Each service will need to change the next few lines depending
         // on how their tag parameter is constructed
         // /////////////////////////////////////////////////////////////////////////////////////////////////////////
         // get Tags from param

         if (searchTag != 'undefined' && searchTag != null) {
            queryContent[this.TAG_TEMPLATE] = searchTag;
         }

         return queryContent;
      },
      // ///////////////////

      // //////////////////////
      // get total number of tags
      getTotalTagNumber : function(callback, searchText) {
         var xhrArgs = {
            url : this.TAG_URL,
            content : {
               type : 'count',
               search : searchText
            },
            handleAs : 'json',
            timeout : 30000,
            handle : function(response, ioArgs) {
               if (response.total)
                  callback(response.total);
               else
                  callback(response);
            }
         };
         dojo.xhrGet(xhrArgs);
      },
      // //////////////////////////

      // get tags for a page
      getPageTags : function(callback, pageNumber, limitPerPage, searchText) {
         var xhrArgs = {
            url : this.TAG_URL,
            content : {
               type : 'all',
               page : pageNumber,
               ps : limitPerPage,
               search : searchText
            },
            handleAs : this.HANDLE_AS,
            timeout : 30000,
            handle : callback
         };
         dojo.xhrGet(xhrArgs);
      },

      clearParamsFromUrl : function(url) {
         if (url.indexOf('?') > -1) {
            url = url.substring(0, url.indexOf('?'));
         }
         return url;
      }
   });

   return AjaxCall;
});
