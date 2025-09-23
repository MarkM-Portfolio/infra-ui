/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.Recommend');
dojo.require("lconn.share.widget.AbstractRecommend");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.html");

/**
 * An implementation of Recommend widget that is specific to Files/Wikis
 */
dojo.declare("lconn.share.widget.Recommend", lconn.share.widget.AbstractRecommend, {
   
   /** URLs for the feed and recommendation, Share specific */
   urlRecommendation: null,
   urlFeed: null,
   
   recommend: function(recommended,e) {
      if (e) dojo.stopEvent(e);
      if (this._request)
         return;
      
      var doc = lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE, [lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE]);
      var entry = doc.documentElement;
         var category = lconn.share.util.dom.createElementNS(doc,"category",lconn.share.util.dom.ATOM_NAMESPACE);
            category.setAttribute("term","recommendation");
            category.setAttribute("scheme","tag:ibm.com,2006:td/type");
            category.setAttribute("label","recommendation");
         entry.appendChild(category);
      var text = lconn.share.util.dom.serializeXMLDocument(entry, true);
      if (recommended && this.urlFeed) {
         this._request = this.net.postXml({
            url: this.urlFeed,
            contentType: "application/atom+xml",
            postData: text,
            handle: dojo.hitch(this, this.handleRecommend, recommended, Math.max(1, this.timesRated + 1))
         });
      }
      else if(!recommended && this.urlRecommendation){
         this._request = this.net.deleteXml({
            url: this.urlRecommendation,
            contentType: "application/atom+xml",
            postData: text,
            handle: dojo.hitch(this, this.handleRecommend, recommended, Math.max(0, this.timesRated - 1))
         });
      }
      else return;
   },
   
   handleRecommend: function(recommended, timesRated, response, ioArgs){
      try {
         if (response instanceof Error) {
            error = response.code;
            if (recommended && error == "ItemExists") {
               // Tolerate a recommendation already existing
               timesRated--;
            }
            else if (!recommended && error == "ItemNotFound") {
               // Tolerate removing a recommendation that no longer exists
               timesRated++;
            } 
            else {
               // We actually care about notifying them of this error
               this.onError(error);
               return;
            }
         }
         
         // Handle success
         this.userRecommended = recommended;
         this.timesRated = timesRated;
   
         this.update();
         this.onrecommend(this.userRecommended, this.timesRated);
      } finally {
         this._request = null;
      }
   },
   
   onError: function(code) {
      var msg;
      if (code == "cancel")
         msg = this._strings.SAVE_ERROR_CANCEL;
      else if (code == "timeout")
         msg = this._strings.SAVE_ERROR_TIMEOUT;
      else if (code == "ItemNotFound")
         msg = this._strings.SAVE_ERROR_NOT_FOUND;
      else if (code == "AccessDenied")
         msg = this._strings.SAVE_ERROR_ACCESS_DENIED;
      else if (code == "unauthenticated") {
      }
      else
         msg = this._strings.SAVE_ERROR;
      
      if (msg)
         lconn.share.util.html.alert(msg);
   }
   
});
