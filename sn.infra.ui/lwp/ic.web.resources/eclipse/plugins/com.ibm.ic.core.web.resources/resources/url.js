/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      'ic-core/util/Url'
], function(Url) {

   // dojo.provide("core.url.ProxyUrlHelper");
   // dojo.require("com.ibm.oneui.util.proxy");
   // dojo.require("com.ibm.oneui.util.Url");

   /**
    * IBM Connections URL utilities
    * 
    * @see {@link  http://tools.ietf.org/html/rfc3986}
    * @namespace ic-core.url
    */

   var secure_ = (window.location.protocol || "http").replace(':', '') == "https";

   /**
    * Breaks a URL into component parts. Use {@link ic-core.url#write} to take
    * those component parts and write them to a valid URL. Use
    * {@link ic-core.url#rewrite} to take a URL and quickly add or update query
    * parameters.
    * <p>
    * The component parts returned by parse() are:
    * <ul>
    * <li>uri</li>
    * <li>scheme
    * <li>authority
    * <li>path
    * <li>query</li>
    * <li>queryParameters</li>
    * </ul>
    * A map of string keys and either string values or string array values.
    * Takes precedence over .query during <code>write()</code> fragment
    * authority user password host port Can be empty, null, or a string value.
    * This value will NOT be normalized
    * <p>
    * ProxyUrlHelper is a helper class that determines if the var proxyURL =
    * "http://ahernmt60:9080/profiles/ajax.proxy"; var ph = new
    * core.url.ProxyUrlHelper(proxyURL);
    * <p>
    * ph.getProxifiedURL("http://ahernmt60:9080/communities/foobar.html") =
    * "http://ahernmt60:9080/communtties/foobar.html"
    * ph.getProxifiedURL("https://ahernmt60:9443/profiles/foo.html") =
    * "http://ahernmt60:9080/profiles/ajaxProxy/https/ahernmt60%3A9443/profiles/foo.html"
    * 
    * @memberof ic-core.url
    * @function parse
    * @param {String}
    *           uri The URI to parse
    * @param {String}
    *           [uri2] If provided will be rebased off the first URI
    * @returns {dojo._Url} A URL object
    */
   function parse(uri, uri2) {
      var l = arguments.length, u = null;

      if (!uri) {
         return null;
      }
      else if ((typeof uri != "string" && console.trace) || (uri2 && typeof uri2 != "string" && console.trace)) {
         throw "Arguments for URI must be a string";
      }

      uri = new dojo._Url(uri, uri2);

      uri.queryParameters = getRequestParameters(uri);
      return uri;
   }

   /**
    * Returns a string representing a URL
    * 
    * @memberof ic-core.url
    * @function write
    * @param {dojo._Url}
    *           obj The URL to write
    * @returns {String} A string representing the URL
    */
   function write(obj) {
      if (!obj)
         return null;
      var uri = "";
      if (obj.scheme)
         uri += obj.scheme + ":";

      if (obj.authority)
         uri += "//" + obj.authority;

      uri += obj.path;
      if (obj.queryParameters)
         uri += writeParameters(obj.queryParameters);
      else if (obj.query)
         uri += ((obj.query.charAt(0) != "?") ? "?" : "") + obj.query;
      if (obj.fragment)
         uri += "#" + obj.fragment;

      return uri;
   }
   // Override dojo._Url.prototype.toCanonicalString
   dojo._Url.prototype.toCanonicalString = function() {
      return write(this);
   }

   /**
    * Rewrites a URL by adding and replacing URL parameters
    * 
    * @memberof ic-core.url
    * @function rewrite
    * @param {String}
    *           [url] The URL to rewrite
    * @param {Object}
    *           [p] An object whose key/value pairs represent URL parameters
    * @returns The rewritten URL
    */
   function rewrite(url, p) {
      if (url && p) {
         url = parse(url);
         dojo.mixin(url.queryParameters, p);
         url = write(url);
      }
      return url;
   }

   /**
    * Splits a query string into key/value pairs FIXME: isn't this almost the
    * same as dojo.queryToObject?
    * 
    * @memberof ic-core.url
    * @function splitQuery
    * @param {String}
    *           [query] The query string to split
    * @returns {Object} A dictionary of key/value pairs representing the query
    *          string
    */
   function splitQuery(query) {
      var params = {};
      if (!query)
         return params;
      if (query.charAt(0) == "?")
         query = query.substring(1);

      var args = query.split("&");
      for (var i = 0; i < args.length; i++)
         if (args[i].length > 0) {
            var separator = args[i].indexOf("=");
            if (separator == -1) {
               var key = decodeURIComponent(args[i]);
               var existing = params[key];
               if (dojo.isArray(existing))
                  existing.push("");
               else if (existing)
                  params[key] = [
                        existing,
                        ""
                  ];
               else
                  params[key] = "";
            }
            else if (separator > 0) {
               var key = decodeURIComponent(args[i].substring(0, separator));
               var value = decodeURIComponent(args[i].substring(separator + 1));
               var existing = params[key];
               if (dojo.isArray(existing))
                  existing.push(value);
               else if (existing)
                  params[key] = [
                        existing,
                        value
                  ];
               else
                  params[key] = value;
            }
         }
      return params;
   }

   /**
    * Returns key/value pairs from the query string of a given URL
    * 
    * @memberof ic-core.url
    * @function getRequestParameters
    * @param {String}
    *           [uri] The URL to parse
    * @returns {Object} A dictionary of key/value pairs representing the query
    *          string
    */
   function getRequestParameters(uri) {
      if (!uri)
         return {};
      if (typeof uri == "string")
         uri = new dojo._Url(uri);
      return splitQuery(uri.query);
   }

   /**
    * Transforms a dictionary of key/value pairs into a query string FIXME:
    * isn't this almost the same as dojo.objectToQuery?
    * 
    * @memberof ic-core.url
    * @function writeParameters
    * @param {Object}
    *           map A dictionary of key/value pairs
    * @returns {String} A query string
    */
   function writeParameters(map) {
      var out = [];
      for ( var key in map) {
         var values = map[key];
         if (typeof values != "undefined" && values != null) {
            key = encodeURIComponent(key);
            if (dojo.isArray(values)) {
               for (var i = 0; i < values.length; i++)
                  if (values[i]) {
                     out.push(out.length == 0 ? "?" : "&");
                     out.push(key);
                     out.push("=");
                     out.push(encodeURIComponent(values[i]));
                  }
            }
            else {
               out.push(out.length == 0 ? "?" : "&");
               out.push(key);
               out.push("=");
               out.push(encodeURIComponent(values));
            }
         }
      }
      return out.join("");
   }

   /**
    * Using the passed service ref config object, utilize scheme detection and
    * create an appropriate <code>com.ibm.oneui.util.Url</code> object.
    * Example Usage:
    * <code>core.url.getServiceUrl(core.config.services.cre)</code>
    * <code>core.url.getServiceUrl(core.config.services.oauth, true)</code>
    * 
    * @param <code>core.config.services[i]</code> object.
    * @param <code>boolean</code> force url to be secure.
    * @returns <code>com.ibm.oneui.util.Url</code> Object for the given
    *          service name. If the service config is <code>null</code> OR
    *          neither the HTTP or HTTPS urls are enabled, the method will
    *          return <code>null</code>.
    */
   function getServiceUrl(svcRefConfig, secure) {
      var svcUrl = null;

      /* guard that the service and end points are available */
      if (!svcRefConfig) {
         return null;
      }
      /* handle secure URL desired case */
      else if (secure_ || secure) {
         if (svcRefConfig.secureEnabled && svcRefConfig.secureUrl) {
            svcUrl = svcRefConfig.secureUrl;
         }
         else if (svcRefConfig.url) {
            svcUrl = svcRefConfig.url;
         }
         else {
            return null;
         }
      }
      /* handle unsecure URL desired case */
      else {
         if (svcRefConfig.url) {
            svcUrl = svcRefConfig.url;
         }
         else if (svcRefConfig.secureEnabled && svcRefConfig.secureUrl) {
            svcUrl = svcRefConfig.secureUrl;
         }
         else {
            return null;
         }
      }

      return new Url(svcUrl);
   }

   /**
    * Ensures that a URL string is fully qualified filling out the details using
    * <code>dojo.global.location</code>. This implementation did not take
    * particular pains in its implementation for error checking, it is intended
    * to parse 'friendly' input. The primary motivator is to provide a means to
    * qualify the URLs from the oneui.proxy.proxify() method to allow them to be
    * fed to the url.parse()
    * 
    * @memberof ic-core.url
    * @function ensureQualified
    * @param urlStr
    *           A URL string to qualify.
    * @returns {String} A fully qualified url String.
    */
   function ensureQualified(urlStr) {
      if (!urlStr)
         throw "Null URL is not permitted";

      return new dojo._Url(dojo.global.location.toString(), urlStr).toString();
   }

   // FIXME: Eventually all services should use the XHR request filter approach
   // to
   // proxying
   // core.url.ProxyUrlHelper = function() {};
   // core.url.ProxyUrlHelper.prototype = {
   // getProxifiedURL : function(url) {
   // return com.ibm.oneui.util.proxy(url);
   // }
   // };

   /**
    * Transforms a Connections URL to its canonical form. For most components,
    * the URL is returned as-is. Special treatment is done to URLs of Wikis and
    * Files whose fragment is appended to the path.
    * 
    * @memberof ic-core.url
    * @function canonicalize
    * @param {String}
    *           url The URL to canonicalize
    * @param {String}
    *           [comp] The component name. If not passed, it's resolved from
    *           <code>ibmConfig</code>.
    * @returns The canonical URL
    */
   function canonicalize(url, comp) {
      var _u = parse(url);
      var _c = comp || ibmConfig.serviceName;
      switch (_c) {
         case "wikis":
            if (_u.fragment && _u.fragment.indexOf("!") === 0)
               _u.fragment = _u.fragment.substr(1);
            // Note there's no break here on purpose, cause Wikis URLs need same
            // treatment of Files
         case "files":
            if (_u.fragment) {
               _u.path += _u.fragment;
               delete _u.fragment;
            }
            break;
      }
      return _u.toCanonicalString();
   }

   return {
      parse : parse,
      write : write,
      rewrite : rewrite,
      splitQuery : splitQuery,
      getRequestParameters : getRequestParameters,
      writeParameters : writeParameters,
      ensureQualified : ensureQualified,
      getServiceUrl : getServiceUrl,
      canonicalize : canonicalize,
      secure : secure_
   };

});
