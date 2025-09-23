/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.urlPreview.URLPreviewDataFetcher");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated")
dojo.require("dojo.io.script");

/**
 * Common widgets
 * @namespace lconn.core.widget
 */

/**
 * Common URL Preview components
 * @namespace lconn.core.widget.urlPreview
 */

/**
 * URL Preview Data Fetcher widget
 * @class lconn.core.widget.urlPreview.URLPreviewDataFetcher
 * @author Piyush Agarwal <pagarwal@us.ibm.com>
 */
dojo.declare("lconn.core.widget.urlPreview.URLPreviewDataFetcher", null,
      /** @lends lconn.core.widget.urlPreview.URLPreviewDataFetcher.prototype */ {
 
   getDataFromExternalService : function(url) {
      return this.checkUrlIsMedia(url);
   },
   
   // FIXME: remove
   getDataFromInternalService : function(url) {
     return {
            url : url,
            title : 'Engadget',
            description : "Engadget is a web magazine with significant daily coverage of everything new in gadgets and consumer electronics.",
            thumbnails : [ {
               src : "http://img.engadget.com/common/images/2768755886686308.JPG",
               alt : "Engadget"
            }]
         };
   },

   checkUrlIsMedia : function(url) {
      var regexYouTubeVimeo = /https?:\/\/(?:www\.)?(vimeo|youtube)\.com\/(?:watch\?v=)?(.*)(?:\z|$|&)/i;

      var match = regexYouTubeVimeo.exec(url);
      if (match) {
         var protocol = location.protocol;
         var feedUrl = "";
         var loadCallback = null;
         var errorCallback = dojo.hitch(this, this.errorPublicPopulate);
         if (match[1] == "youtube") {
            feedUrl = protocol + "//gdata.youtube.com/feeds/api/videos/" + match[2] + "?alt=json";
            this._embedUrl = protocol + "//www.youtube.com/embed/" + match[2] + "?feature=player_detailpage&autoplay=1";
            loadCallback = dojo.hitch(this, this.populateFromYouTube);
         } else if (match[1] == "vimeo") {
            feedUrl = protocol + "//vimeo.com/api/v2/video/" + match[2] + ".json";
            this._embedUrl = protocol + "//player.vimeo.com/video/" + match[2] + "?autoplay=1";
            loadCallback = dojo.hitch(this, this.populateFromVimeo);
         }

         // The parameters to pass to xhrGet, the url, how to handle it, and the callbacks.
         var jsonpArgs = {
            url : feedUrl,
            callbackParamName : "callback",
            content : {},

            load : loadCallback,
            error : errorCallback
         };
         dojo.io.script.get(jsonpArgs);
         
         if(this.enablePlayback) {
            dojo.removeClass(this.playBtn, "lotusHidden");
            dojo.connect(this.thumbnailContainer, "onclick", this, this.showMedia);
            dojo.attr(this.thumbnailContainer, "href", "javascript:;");
         } else {
            dojo.style(this.thumbnailContainer, "cursor", "default");
            dojo.removeAttr(this.thumbnailContainer, "href");
         }
         
         return true;
      }
      return false;
   },
   
   populateFromOpenGraph : function (data) {
      var internalData = {
            url: data.data["og:url"],
            title: data.data["og:title"],
            description: data.data["og:description"],
            thumbnails: [{ src: data.data["og:image"], alt: data.data["og:title"] }]
      }
      this.data = internalData;
      this.renderData(internalData);
   },

   populateFromYouTube : function(data) {
      var internalData = {
            url : this.url,
            title : data.entry.title.$t,
            description : data.entry.content.$t,
            thumbnails : [{ src : data.entry.media$group.media$thumbnail[1].url, alt : data.entry.media$group.media$title.$t }]
         };
      
      this.data = internalData;
      this.renderData(internalData);
   },

   populateFromVimeo : function(data) {
      var internalData = {
            url : this.url,
            title : data[0].title,
            description :  data[0].description,
            thumbnails : [{ src : data[0].thumbnail_medium, alt : data[0].title }]
         };
      
      this.data = internalData;
      this.renderData(internalData);
   },

   errorPublicPopulate : function(error) {
      console.log("An unexpected error occurred: " + error);
      this.closePreview();
   }
});
