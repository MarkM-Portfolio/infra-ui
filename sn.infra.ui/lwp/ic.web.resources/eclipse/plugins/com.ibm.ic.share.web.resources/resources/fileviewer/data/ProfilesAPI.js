/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojox/xml/parser",
  "dojo/Deferred",
  "../network/request",
  "../util/network",
  "../util/dom"
], function (declare, parser, Deferred, request, networkUtil, dom) {
  "use strict";

  var Profile = declare([], {
    constructor: function (xml) {
      this.xml = xml;
    },

    getFeed: function () {
      return dom.getFirstTag(this.xml, "feed", undefined, this.xml);
    },
      
    getEntry: function () {
      var parent = this.getFeed();
      if (!parent) return {};
      return dom.getFirstTag(this.xml, "entry", undefined, parent);
    },
    
    getUser: function () {
      var parent = this.getEntry();
      if (!parent) return {};
      return dom.getUser(this.xml, "contributor", undefined, parent);
    }
  });
  
  function fromXML(xml) {
    if (typeof xml === "string") {
      xml = parser.parse(xml);
    }

    return new Profile(xml);
  }
  
  function fromURL(url) {
    var deferred = new Deferred();

    request(url, {
      handleAs: "xml",
      withCredentials: true,
      query: {}
    }).then(function (xml) {
      var profile = fromXML(xml);
      deferred.resolve(profile);
    }, function (error) {
      deferred.reject(networkUtil.parseError(error));
    });

    return deferred;
  }

  return {
    fromXML: fromXML,
    fromURL: fromURL,

    _getTestInstance: function () {
      return new Profile();
    }
  };
});
