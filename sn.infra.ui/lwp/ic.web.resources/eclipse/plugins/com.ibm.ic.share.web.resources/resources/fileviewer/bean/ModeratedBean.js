/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "../util/dom",
  "../network/request",
  "dojo/string",
  "dojox/html/entities",
  "dojo/_base/lang"
], function (declare, dom, request, string, entities, lang) {

  return declare([], {

    flag: function (summary) {
      return this._request(this.get("reportUrl"), {
        method: "POST",
        handleAs: "xml",
        data: this._getPostBody(summary),
        headers: {"Content-Type": "application/atom+xml;charset=UTF-8"},
     }).then(lang.hitch(this, function (response) {
        return response;
     }), lang.hitch(this, this._handleError));
    },
    
    _getPostBody: function (summary) {
      var template = '<entry xmlns="http://www.w3.org/2005/Atom">';
      template += '<in-ref-to xmlns="http://www.ibm.com/xmlns/prod/sn" rel="http://www.ibm.com/xmlns/prod/sn/report-item" ' +
        'ref-item-type="${type}" ref="${id}"></in-ref-to>';
      
      if (summary && summary != "") {
        template += '<content>${summary}</content>';
      }
      
      template += '</entry>';
      
      return string.substitute(template, {
        type: this.moderatedBeanType,
        id: this.get("id"),
        summary: entities.encode(summary),  
      });
      
    },

    _request: function (url, options) {
      return request(url, options);
   },

   _handleError: function (err) {
     return err;
   }
  });
});
