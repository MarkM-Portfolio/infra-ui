/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/Deferred",
  "dojo/cookie",
  "dojo/_base/kernel",
  "dojo/_base/lang",
  "dojo/io-query",
  "./data/util/routes",
  "./network/request"
], function (Deferred, cookie, kernel, lang, ioQuery, routes, request) {
  "use strict";

  function makeExtensionsRequest(deferred) {
    var query = {
        "max-age": lang.getObject("lconn.share.config.services.maxAge"),
        "etag": lang.getObject("lconn.files.config.version"),
        "lang": kernel.locale
    },
    queryString = ioQuery.objectToQuery(query),
    extensionsUrl = routes.getExtensionsUrl();

    if (!extensionsUrl) {
       deferred.resolve(false);
       return;
    }

    extensionsUrl += queryString;
    
    request(extensionsUrl, {
      auth: {secured: false},
      noStatus: true,
      method: "GET",
      handleAs: "json",
      headers: {
         "X-Csrf-Token": cookie("token")
      },
      handle: lang.hitch(this, function (data, ioArgs) {
        handleExtensionsResponse(deferred, data, ioArgs);
      })
    });
    
  }
  
  function handleExtensionsResponse(deferred, data, ioArgs) {
    if (data instanceof Error) {
      return deferred.resolve(false);
    }

    return deferred.resolve(data);
    
  }
  
  return {
    getExtensions: function () {
      var deferred = new Deferred();
      
      makeExtensionsRequest(deferred);      
      
      return deferred;
    }
  };
});