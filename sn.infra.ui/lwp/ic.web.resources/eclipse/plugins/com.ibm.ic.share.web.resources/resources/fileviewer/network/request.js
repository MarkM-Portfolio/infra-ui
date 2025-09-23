/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/request",
  "dojo/_base/xhr",
  "dojo/topic",
  "../util/url",
  "ic-core/ajax/auth",
  "dojo/aspect",
  "dojo/_base/array",
  "dojo/_base/lang"
], function (dojoRequest, dojoXhr, topic, urlUtil, auth, aspect, array, lang) {

  // In IE8, the dojo request module will use an xml handler that does not support default namespaces.
  // So, we are using the old dojo xhr module, which uses a handler that does support default namespaces.
  // We can move back to using the dojo request module when IE8 is no longer supported.
  var useRequestModule = false,
    attachedAuthHandler = false,
    securedUrls = ["/files/form/api/", "/files/basic/api/"];
  
  function attachAuthHandler(options) {
    if (!shouldAttachAuthHandler(options)) {
      return;
    }
    
    auth.prepareSecure(options);
    
    if (!attachedAuthHandler) {
      aspect.around(auth, "authenticationHandler", function (originalFunction) {
        return function (response, ioArgs) {
          if (lang.getObject("args._fileviewerRequest", false, ioArgs)) {
            topic.publish("ic-fileviewer/authenticationRequired");
          } else {
            originalFunction.apply(this, arguments);
          }
        };
      });
    }
    attachedAuthHandler = true;
  }
  
  function shouldAttachAuthHandler(options) {
    var uri = urlUtil.createUri(options.url);
    var shouldAttach = array.some(securedUrls, function (secureUrl) {
      return uri.path.indexOf(secureUrl) === 0;
    });
    return shouldAttach;
  }
  
  function xhr(url, options) {
    options._fileviewerRequest = true;
    if (useRequestModule) {
      return dojoRequest(url, options);
    } else {
      options = options || {};
      if (options.query) {
        url = urlUtil.rewrite(url, options.query);
        delete options.query;
      }
      
      options.url = url;
      
      if (options.data) {
        options.postData = options.data;
        delete options.data;
      }
      
      attachAuthHandler(options);
      
      var hasBody = options.method === "POST" || options.method === "PUT";
      
      return dojoXhr(options.method || "GET", options, hasBody);
    }
  }
  
  return xhr;
});
