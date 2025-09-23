
define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "./FeedDataStore",
  "../util/dom"
], function (declare, lang, FeedDataStore, dom) {
  "use strict";

  return declare([FeedDataStore], {
     DEFAULT_SCOPE: "PREVIEW, DOWNLOAD",
     
     _getPostBody: function(action, type) {
        var entry = dom.newXmlDocument("entry", dom.NS.ATOM, [dom.NS.TD]);
           var op = dom.createElementNS(entry,"td:op",dom.NS.TD);
           op.setAttribute("type", action);
              var shareLink = dom.createElementNS(entry, "td:shareLink", dom.NS.TD);
              if(type) {
                 shareLink.setAttribute("type", type);
                 shareLink.setAttribute("scope", this.DEFAULT_SCOPE);
              }
           op.appendChild(shareLink);
        entry.documentElement.appendChild(op);
        var text = dom.serializeXMLDocument(entry, true);
        return text;
     },
     
     createItem: function (item, action, type) {
         return this._request(this.url, {
            method: "POST",
            handleAs: "xml",
            data: this._getPostBody(action, type),
            headers: {"Content-Type": "application/atom+xml;charset=UTF-8", "X-Method-Override": "PATCH"},
         }).then(lang.hitch(this, function (response) {
            this._updateShareLinkFromResponse(item, response);
         }), lang.hitch(this, this._handleError));
      },
      
      _updateShareLinkFromResponse: function(item, response) {
         item.set({shareLink: item._getShareLink(response)});
      }
  });
});
