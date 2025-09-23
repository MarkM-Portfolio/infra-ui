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

  /**
   * Retrieve extension definitions from Appregistry and plug them into Files UI.
   * These extensions are simple links (just like the Lotuslive/BSS extensions), but use a different format,
   * and allow for translated link text, and support entitlement checks.
   */
  function makeExtensionsRequest(deferred) {
    var query = {
        "locale": kernel.locale
    },
    queryString = ioQuery.objectToQuery(query),
    extensionsUrl = routes.getAppregExtensionsUrl();

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