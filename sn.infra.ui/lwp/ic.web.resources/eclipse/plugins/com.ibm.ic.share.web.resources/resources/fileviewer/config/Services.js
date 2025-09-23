/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "./globals"
], function (declare, lang, globals) {
  "use strict";

  function getConnectionsDomain() {
    var connectionsDomain = window.notesiniParameters.bssUrl;

    if (connectionsDomain.charAt(connectionsDomain.length - 1) === "/") {
      connectionsDomain = connectionsDomain.substring(0,
          connectionsDomain.length - 1);
    }

    return connectionsDomain;
  }

  return declare([], {

    constructor: function (args) {
      lang.mixin(this, args);
    },

    getDocsUrl: function () {
      var url;
      if (globals.isVerse) {
        url = (this._connectionsDomain || getConnectionsDomain()) + "/docs";
      } else {
        url = "/docs";
      }
      return url;
    },

    getViewerUrl: function () {
      var url;
      if (globals.isVerse) {
        url = (this._connectionsDomain || getConnectionsDomain()) + "/viewer";
      } else {
        url = "/viewer";
      }
      return url;
    },
    
    getFilesUrl: function () {
      var url;
      if(globals.isVerse){
        url = (this._connectionsDomain || getConnectionsDomain()) + "/files";
      } else {
        url = globals.coreUrl.getServiceUrl(globals.coreServices.files);
        url = url.uri;
      }
      return url;
    },
    
    getContactsUrl: function () {
      var bssUrl = globals.coreUrl.getServiceUrl(globals.coreServices.bss);
      var contactsUrl = "/contacts";
      return (bssUrl ? bssUrl + "/.." + contactsUrl : contactsUrl);
    }
  });
});
