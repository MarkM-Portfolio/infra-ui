/* Copyright IBM Corp. 2006, 2015  All Rights Reserved.              */
/*																	 */
/* @author Michael Ahern                                             */
/* ***************************************************************** */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/url",
	"ic-incontext/util/proxy"
], function (dojo, lang, URL, proxy) {

	return {
	
	   /**
	
	   Use com.ibm.social.incontext.util.url.parse() to break a URL into component parts.  Use com.ibm.social.incontext.util.url.write() to
	   take those component parts and write them to a valid URL.  Use com.ibm.social.incontext.util.url.rewrite() to take
	   a URL and quickly add or update query parameters.
	   
	   The component parts returned by parse() are:
	      uri
	      scheme
	      authority
	      path
	      query
	      queryParameters
	         A map of string keys and either string values or string array values.  Takes precedence
	         over .query during write()
	      fragment
	      authority
	      user
	      password
	      host
	      port
	         Can be empty, null, or a string value.  This value will NOT be normalized
	
	   ProxyUrlHelper is a helper class that determines if the
	      var proxyURL = "http://ahernmt60:9080/profiles/ajax.proxy"; 
	      var ph = new com.ibm.social.incontext.util.url.ProxyUrlHelper(proxyURL);
	      
	      ph.getProxifiedURL("http://ahernmt60:9080/communities/foobar.html")
	         = "http://ahernmt60:9080/communtties/foobar.html"
	      ph.getProxifiedURL("https://ahernmt60:9443/profiles/foo.html")
	         = "http://ahernmt60:9080/profiles/ajaxProxy/https/ahernmt60%3A9443/profiles/foo.html"
	 **/
	
	   _const:{
	      regex: /(^[a-zA-Z]+)\:\/\/([a-zA-Z\d][\a-z\A-Z\d\-\.]*)(:\d{1,5})?([\/\?\#].*)?/,
	      protocolPorts: { "http": 80, "https": 443 }
	   },
	   
	   parse: function(uri) {
	      if (!uri)
	         return null;
	      if (typeof uri != "string" && console.trace)
	         throw "Argument for URI must be a string";
	      uri = new URL(uri);
	      uri.queryParameters = this.getRequestParameters(uri);
	      return uri;
	   },
	   write: function(obj) {
	      if (!obj)
	         return null;
	      var uri = "";
	      if(obj.scheme)
	         uri += obj.scheme + ":";
	         
	      if(obj.authority)
	         uri += "//" + obj.authority;
	         
	      uri += obj.path;
	      if(obj.queryParameters)
	         uri += this.writeParameters(obj.queryParameters);
	      else if(obj.query)
	         uri += ((obj.query.charAt(0) != "?") ? "?" : "") + obj.query;
	      if(obj.fragment)
	         uri += "#" + obj.fragment;
	         
	      return uri;
	   },
	 
	   rewrite: function(urlValue,p) {
	      if (urlValue && p) {
	         urlValue = this.parse(urlValue);
	         lang.mixin(urlValue.queryParameters,p);
	         urlValue = this.write(urlValue);
	      }
	      return urlValue;
	   },
	   
	   splitQuery: function(query) {
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
	               if (lang.isArray(existing))
	                  existing.push("");
	               else if (existing)
	                  params[key] = [existing,""];
	               else
	                  params[key] = "";
	            } else if (separator > 0) {
	               var key = decodeURIComponent(args[i].substring(0, separator));
	               var value = decodeURIComponent(args[i].substring(separator+1));
	               var existing = params[key];
	               if (lang.isArray(existing))
	                  existing.push(value);
	               else if (existing)
	                  params[key] = [existing,value];
	               else
	                  params[key] = value;
	            }
	         }
	      return params;
	   },
	   
	   getRequestParameters: function(uri) {
	      if (!uri)
	         return {};
	      if (typeof uri == "string")
	         uri = new URL(uri);
	      return this.splitQuery(uri.query);
	   },
	   
	   writeParameters: function(map) {
	      var out = [];
	      for (var key in map) {
	         var values = map[key];
	         if (typeof values != "undefined" && values != null) {
	            key = encodeURIComponent(key);
	            if (lang.isArray(values)) {
	               for (var i=0; i<values.length; i++)
	                  if (values[i]) {
	                     out.push(out.length==0 ? "?" : "&");
	                     out.push(key);
	                     out.push("=");
	                     out.push(encodeURIComponent(values[i]));
	                  }
	            } else {
	               out.push(out.length==0 ? "?" : "&");
	               out.push(key);
	               out.push("=");
	               out.push(encodeURIComponent(values));
	            }
	         }
	      }
	      return out.join("");
	   },
	
	   removeRelativePathFromHost: function(uri){
	      var urlValue = this.parse(uri);
	      urlValue = urlValue.scheme +"://"+ urlValue.host;
	      return urlValue;
	   },
	   
      getProxifiedURL: function(url) {
         return proxy(url);
      }
	};
});
