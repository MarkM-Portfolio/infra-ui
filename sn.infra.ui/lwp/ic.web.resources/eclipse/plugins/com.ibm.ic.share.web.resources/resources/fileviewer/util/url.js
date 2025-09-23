/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/url",
  "dojo/io-query",
  "dojo/_base/lang",
  "../config/globals",
  "jazz/inverted!../util/communities",
  "dojo/when"
], function (dojoUrl, ioQuery, lang, globals, communitiesUtil, when) {

  return {
    rewrite: function (url, parameters) {
      var urlObj = new dojoUrl(url);
      urlObj.queryParameters = lang.mixin(parameters, ioQuery.queryToObject(urlObj.query || ""));
      return this.write(urlObj);
    },

    write: function (urlObj) {
       var uri = "";

      if (urlObj.scheme) {
        uri += urlObj.scheme + ":";
      }

      if (urlObj.authority) {
        uri += "//" + urlObj.authority;
      }

      uri += urlObj.path;

      uri += this.writeParameters(urlObj.queryParameters);

      if (urlObj.fragment) {
        uri += "#" + urlObj.fragment;
      }

      return uri; 
    },

    writeParameters: function (parameters) {
      var queryString = ioQuery.objectToQuery(parameters || {});
      return queryString ? "?" + queryString : "";
    },

    createUri: function (url) {
      var uri = new dojoUrl(url);
      uri.queryParameters = ioQuery.queryToObject(uri.query || "");
      uri.fragmentParameters = ioQuery.queryToObject(uri.fragment || "");
      return uri;
    },

    ensureQualified: function (url){
      if(!url) {
        throw new Error("Null URL is not permitted");
      }
      return new dojoUrl(window.location.toString(),url).toString();
    },

    getServiceUrl: function (serviceReference) {
      if (!serviceReference) {
        return;
      }
      var serviceUrl;
      if (window.location.protocol.indexOf("https:") === 0 && serviceReference.secureEnabled && serviceReference.secureUrl) {
        serviceUrl = serviceReference.secureUrl;
      } else if (serviceReference.url) {
        serviceUrl = serviceReference.url;
      }
      return new dojoUrl(serviceUrl);
    },

    /**
     * Checks if two URLs are equal, ignoring a trailing hash
     */
    areUrlsEqual: function (url1, url2) {
      if (url1 === undefined || url2 === undefined) {
        return false;
      }

      url1 = this._removeTrailingHash(url1);
      url2 = this._removeTrailingHash(url2);

      return url1 === url2;
    },
    
    isSamePage: function (url1, url2) {
      return !!url1 && !!url2 && this.removeHash(url1) === this.removeHash(url2);
    },
    
    removeHost: function (url) {
      return url.replace(new RegExp(".*//[^/]+"), "");
    },
    
    removeHash: function (url) {
      var hashIndex = url.indexOf("#");
      if (hashIndex !== -1) {
        url = url.substring(0, hashIndex);
      }
      return url;
    },
    
    getParameters: function (url) {
      return this.createUri(url).queryParameters;
    },
    
    getHashParameters: function (url) {
      var uri = this.createUri(url);
      return ioQuery.queryToObject(uri.fragment || "");
    },

    _removeTrailingHash: function (url) {
      if (url.slice(-1) === "#") {
        url = url.slice(0, -1);
      }
      return url;
    },

    getFileParameters: function () {
      var uri = this.createUri(window.location.href),
      parameters;
      if (this.isFilesUrl(uri)) {
        uri = this.fromFilesAnchorForm(uri);
        parameters = uri.queryParameters;
      } else {
        parameters = ioQuery.queryToObject(uri.fragment || "");
      }

      return parameters || {};
    },

    fromFilesAnchorForm: function (uri) {
      if (!this.isFilesUrl(uri)) {
        return uri;
      }
      
      if (lang.isString(uri)) {
        uri = this.createUri(uri);
      }
      
      return this.fromAnchorForm(uri, this.getServiceUrl(globals.coreServices.files).path + "/app");
    },

    fromAnchorForm: function(uri, base) {
      var path = uri.path;
      if (uri.fragment && path) {
        if (path == base) {
          var fragment = uri.fragment;

          var uricopy = lang.clone(uri);
          var p = uricopy.queryParameters;
          uricopy.queryParameters = null;
          uricopy.query = null;
          uricopy.fragment = null;
          uricopy.path = path + fragment;

          var url = this.write(uricopy);
          var newuri = this.createUri(url);

          p = lang.mixin(p, ioQuery.queryToObject(newuri.query || ""));
          newuri.queryParameters = p;
          newuri.query = null;
          uri = newuri;
        }
      }
      return uri;
    },

    toFilesAnchorForm: function (uri) {
      if (!this.isFilesUrl(uri)) {
        return uri;
      }
      
      if (lang.isString(uri)) {
        uri = this.createUri(uri);
      }
      
      return this.toAnchorForm(uri, this.getServiceUrl(globals.coreServices.files).path + "/app");
    },

    toAnchorForm: function(uri, base, params) {
      uri = this.fromAnchorForm(uri, base);
      
      var path = uri.path,
      key;
      if (path) {
        if (path.indexOf(base) === 0) {
          var p = {};
          var fragment = path.substring(base.length);
          var newuri = lang.clone(uri);

          if (newuri.queryParameters) {
            var q = newuri.queryParameters;
            if (params) {
              for (key in params) {
                p[key] = q[key] || params[key];
                delete q[key];
              }
            }
            fragment += this.writeParameters(q);
          }
          else {
            for (key in params) {
              p[key] = params[key];
            }
          }
          newuri.path = base;
          newuri.fragment = (fragment.length > 0) ? fragment : "/";
          newuri.queryParameters = p;
          newuri.query = null;

          uri = this.write(newuri);
        }
      }
      return uri;
    },

    isFilesUrl: function (url) {
      var filesUrl = this.getServiceUrl(globals.coreServices.files);

      if (lang.isString(url)) {
        url = this.createUri(url);
      }

      return url.path.indexOf(filesUrl.path) === 0;
    },
    
    isCommunityUrl: function (url) {
      var communitiesUrl = this.getServiceUrl(globals.coreServices.communities);
      if (!url || !communitiesUrl) {
        return false;
      }
      
      if (lang.isString(url)) {
        url = this.createUri(url);
      }
      
      return url.path.indexOf(communitiesUrl.path + "/service/html/") === 0 && !!ioQuery.queryToObject(url.query || "").communityUuid;
    },
    
    isInsideFolder: function(url) {
       if (!url) {
          return false;
        }
       var uriObject = this.createUri(url);
       if (uriObject.fragment) {
          return uriObject.fragment.indexOf("/folder/") === 0;
       }
       return false;
    },
    
    isValidFilesUrl: function (url) {
      if (lang.isString(url)) {
        url = this.createUri(url);
      }
      
      if (this.isCommunityUrl(url)) {
        var communityId = url.queryParameters.communityUuid;
        var fullpageWidgetId = url.fragmentParameters.fullpageWidgetId;
        return communitiesUtil.isFilesWidget(communityId, fullpageWidgetId);
      } else {
        return when(true);
      }
    }
  };
});
