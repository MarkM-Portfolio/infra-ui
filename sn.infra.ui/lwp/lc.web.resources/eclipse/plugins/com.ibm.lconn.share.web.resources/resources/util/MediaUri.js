/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.util.MediaUri");
dojo.require("dojo.date.locale");
dojo.require("dojo.cookie");
dojo.require("dojo.number");
dojo.require("dojo.io.iframe");
dojo.require("lconn.core.url");

(function() {
lconn.share.util.MediaUri.parseUri = function(uri) {
   if (!uri)
      return null;
   uri = new dojo._Url(uri);
   var params = lconn.share.util.MediaUri.getRequestParameters(uri);
   uri.queryParameters = params;
   return uri;
};
lconn.share.util.MediaUri.writeUri = function(obj) {
   if (!obj)
      return null;
   var uri = "";
   if(obj.scheme)
      uri += obj.scheme + ":";

   if(obj.authority)
      uri += "//" + obj.authority;

   if(obj.path)
      uri += obj.path;
   if(obj.queryParameters)
      uri += lconn.share.util.MediaUri.writeParameters(obj.queryParameters);
   else if(obj.query)
      uri += ((obj.query.charAt(0) != "?") ? "?" : "") + obj.query;
   if(obj.fragment)
      uri += "#" + obj.fragment;

   return uri;
};
lconn.share.util.MediaUri.makeAtomUrlIESafe = function(url) {
   if (dojo.isIE && url) {
      url = lconn.share.util.MediaUri.parseUri(url);
      url.queryParameters.format = "xml";
      url = lconn.share.util.MediaUri.writeUri(url);
   }
   return url;
};
lconn.share.util.MediaUri.rewriteUriProxyOnly = function(iw, url) {
   if (iw && !iw.overrideCommonProxy && ((iw.communitiesSvcRef ||ic_comm_communitiesSvcRef) && iw.useCommonProxy || iw.isDocSummary && iw.isDocSummary())) {
      // This code will be used in Connections to connect to the common proxy.  It is not setup to be the default ajax proxy.
      // Because of this we cannot use the rewriteURI method on the iContext, and must rewrite the url using a helper method.
      // Todo: this code can be removed once the common proxy is the default.
      var defaultPort = function(scheme) {
         return scheme == "https" ? 443 : 80;
      }
      var commonUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.deploymentConfig, window.location.protocol == "https:" && lconn.core.config.services.deploymentConfig.secureEnabled).uri;
      var proxyUrl = commonUrl + "/proxy/commonProxy";
      var proxyPath = lconn.share.util.MediaUri.parseUri(proxyUrl).path;
      if (proxyPath.charAt(proxyPath.length - 1) == "/")
         proxyPath = proxyPath.substring(0, proxyPath.length - 1);
      var location = window.location;
      var host = location.hostname.toLowerCase() || localhost;
      var scheme = (location.protocol || "http").replace(':','');
      var port = location.port || defaultPort(scheme); 
      var uri = new dojo._Url(url);
      var newHost = uri.host;
      if (newHost) {
         newHost = newHost.toLowerCase();
         var newScheme = uri.scheme || scheme;
         var newPort = uri.port || defaultPort(newScheme);
         if (newScheme != scheme || newPort != port || newHost != host)
            return (iw.useFullCommonProxyPath ? proxyUrl : proxyPath) + "/" + newScheme + "/" + encodeURIComponent(newHost+":"+newPort) + (uri.path || "") + (uri.query ? ("?"+uri.query) : "");
      }
      return url;
   }
   else {
      url = iw.iContext.io.rewriteURI(url);
   }
   return url;
};
lconn.share.util.MediaUri.rewriteUri = function(url,p,proxy,iw) {
   if (url && p) {
      url = lconn.share.util.MediaUri.parseUri(url);
      dojo.mixin(url.queryParameters,p);
      url = lconn.share.util.MediaUri.writeUri(url);
   }
   if (proxy && url) {
      if (iw) {
         url = lconn.share.util.MediaUri.rewriteUriProxyOnly(iw, url);
      }
      else {
         console.log("Missing iw param in rewriteUri: " + url);
      }
   }
   return url;
};

lconn.share.util.MediaUri.splitQuery = function(query) {
   var params = {};
   if (!query)
      return params;
   if (query.charAt(0) == "?")
      query = query.substring(1);

   var args = query.split("&");
   for (var i=0; i<args.length; i++)
      if (args[i].length > 0) {
         var separator = args[i].indexOf("=");
         if (separator == -1) {
            var key = decodeURIComponent(args[i]);
            var existing = params[key];
            if (dojo.isArray(existing))
               existing.push("");
            else if (existing)
               params[key] = [existing,""];
            else
               params[key] = "";
         } else if (separator > 0) {
            var key = decodeURIComponent(args[i].substring(0, separator));
            var value = decodeURIComponent(args[i].substring(separator+1));
            var existing = params[key];
            if (dojo.isArray(existing))
               existing.push(value);
            else if (existing)
               params[key] = [existing,value];
            else
               params[key] = value;
         }
      }
   return params;
};

lconn.share.util.MediaUri.removeQuery = function(uri) {
   if (uri) {
      var ind = uri.indexOf("?");
      if (ind > 0)
         uri = uri.substring(0, ind);
   }
   return uri;
};

lconn.share.util.MediaUri.getRequestParameters = function(uri) {
   var params = {};
   if (!uri)
      return params;
   if (typeof uri == "string")
      uri = new dojo._Url(uri);
   return lconn.share.util.MediaUri.splitQuery(uri.query);
};

lconn.share.util.MediaUri.writeParameters = function(map) {
   var out = [];
   for (var key in map) {
      var values = map[key];
      if (typeof values != "undefined" && values != null) {
         key = encodeURIComponent(key);
         if (dojo.isArray(values)) {
            for (var i=0; i<values.length; i++)
               lconn.share.util.MediaUri.writeParam(key, values[i], out);
         } 
         else           
            lconn.share.util.MediaUri.writeParam(key, values, out);
      }
   }
   return out.join("");
};

lconn.share.util.MediaUri.writeParam = function(key, value, out) {
   if (typeof value != "undefined" && value != null) {
      out.push(out.length==0 ? "?" : "&");
      out.push(key);
      if (!(value === "")) {
         out.push("=");
         out.push(encodeURIComponent(value));
      }
   }
};

lconn.share.util.MediaUri.getHost = function(urlStr) {
	var uri = new dojo._Url(urlStr);
   uri.query = null;
   uri.path = null;
   return lconn.share.util.MediaUri.writeUri(uri);
};

lconn.share.util.MediaUri.getPath = function(urlStr) {
   var uri = new dojo._Url(urlStr);
   uri.queryParameters = null;
   uri.query = null;
   return lconn.share.util.MediaUri.writeUri(uri);
};
})();
