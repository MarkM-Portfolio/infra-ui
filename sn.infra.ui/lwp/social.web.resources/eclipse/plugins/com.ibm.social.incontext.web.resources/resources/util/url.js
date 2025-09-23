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
/*																	 */
/* @author Michael Ahern                                             */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.util.url");
//dojo.provide("com.ibm.social.incontext.util.url.UrlStruct");
dojo.provide("com.ibm.social.incontext.util.url.ProxyUrlHelper");
dojo.require("com.ibm.social.incontext.util.proxy");
(function(){
 
   var url = com.ibm.social.incontext.util.url;

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

   url._const = {
      regex: /(^[a-zA-Z]+)\:\/\/([a-zA-Z\d][\a-z\A-Z\d\-\.]*)(:\d{1,5})?([\/\?\#].*)?/,
      protocolPorts: { "http": 80, "https": 443 }
   };
   
   url.parse = function(uri) {
      if (!uri)
         return null;
      if (typeof uri != "string" && console.trace)
         throw "Argument for URI must be a string";
      uri = new dojo._Url(uri);
      uri.queryParameters = url.getRequestParameters(uri);
      return uri;
   };
   url.write = function(obj) {
      if (!obj)
         return null;
      var uri = "";
      if(obj.scheme)
         uri += obj.scheme + ":";
         
      if(obj.authority)
         uri += "//" + obj.authority;
         
      uri += obj.path;
      if(obj.queryParameters)
         uri += url.writeParameters(obj.queryParameters);
      else if(obj.query)
         uri += ((obj.query.charAt(0) != "?") ? "?" : "") + obj.query;
      if(obj.fragment)
         uri += "#" + obj.fragment;
         
      return uri;
   };
   dojo._Url.prototype.toCanonicalString = function() {
      return url.write(this);
   };
   
   url.rewrite = function(urlValue,p) {
      if (urlValue && p) {
         urlValue = url.parse(urlValue);
         dojo.mixin(urlValue.queryParameters,p);
         urlValue = url.write(urlValue);
      }
      return urlValue;
   };
   
   url.splitQuery = function(query) {
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
   
   url.getRequestParameters = function(uri) {
      if (!uri)
         return {};
      if (typeof uri == "string")
         uri = new dojo._Url(uri);
      return url.splitQuery(uri.query);
   };
   
   url.writeParameters = function(map) {
      var out = [];
      for (var key in map) {
         var values = map[key];
         if (typeof values != "undefined" && values != null) {
            key = encodeURIComponent(key);
            if (dojo.isArray(values)) {
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
   };

   url.removeRelativePathFromHost = function(uri){
      var urlValue = url.parse(uri);
      urlValue = urlValue.scheme +"://"+ urlValue.host;
      return urlValue;
   };
   
   /*
   dojo.declare("com.ibm.social.incontext.util.url.UrlStruct", null, {
      isInvalidUrl: false,
      url: '',
      protocol: '',
      host: '',
      port: '',
      hasPort: false,
      urlRemainder: '',
   
      constructor: function(url) {
         // exec will explode on bad input
         if (url != null && url.match(com.ibm.social.incontext.util.url._const.regex)) {
            var t = com.ibm.social.incontext.util.url._const.regex.exec(url);
            this.url = t[0];
            this.protocol = t[1];
            this.host = t[2];       
            this.port = this._parsePort(t[3]);        
            this.urlRemainder = t[4];
         } else {
            this.isInvalidUrl = true;
         }
      },
   
      _parsePort : function(portN) {
         if (portN == null || portN == '')
            return '';
   
         this.hasPort = true;
   
         return portN.substr(portN.indexOf(':')+1);
      },
   
      normalizedPort: function() {
         var pp = com.ibm.social.incontext.util.url._const.protocolPorts;
         if (this.hasPort) return this.port;
         else if (typeof(pp[this.protocol]) == "undefined") return '';
         else return pp[this.protocol];
      } 
   });*/
   
   //FIXME: Eventually all services should use the XHR request filter approach to proxying
   url.ProxyUrlHelper = function() {};
   url.ProxyUrlHelper.prototype = {
      getProxifiedURL: function(url) {
         return com.ibm.social.incontext.util.proxy(url);
      }  
   };
   /*
   dojo.declare("com.ibm.social.incontext.util.url.ProxyUrlHelper", null, {
      proxyURL: '',
      _proxyStruct: null,
      dontParsePortComponent: false,
   
      constructor: function(proxyURL, dontParsePort) {
         if (proxyURL.length > 1 && proxyURL.lastIndexOf('/') == proxyURL.length-1) {
            proxyURL = proxyURL.substr(0,proxyURL.length-1);
         }
         this.proxyURL = proxyURL;
         if(dontParsePort)
         this.dontParsePortComponent = dontParsePort;
         
         this._proxyStruct = new com.ibm.social.incontext.util.url.UrlStruct(this.proxyURL);
      },
   
      getProxifiedURL: function(url) {
         var surl = new com.ibm.social.incontext.util.url.UrlStruct(url);
         var sproxy = this._proxyStruct;
   
         if (this._matchUrlBase(surl)) {
            // done this way due to the URL normalization comparison
            return surl.protocol + "://"
               + surl.host + (sproxy.hasPort ? ':' + sproxy.port : '')
               + surl.urlRemainder;
         }
         if(this.dontParsePortComponent){//used by sametime proxy
            if(surl.urlRemainder){
               return this.proxyURL + "/"
               + surl.protocol + "/"
               +surl.host + (surl.hasPort ? ':' + surl.port : '')+ surl.urlRemainder;     
            }else{
               return this.proxyURL + "/"
               + surl.protocol + "/"
               +surl.host + (surl.hasPort ? ':' + surl.port : '');
            }
         }
   
         return this.proxyURL + "/"
            + surl.protocol + "/"
            + surl.host + (surl.hasPort ? '%3A' + surl.port : '')
            + surl.urlRemainder;
      },
   
      _matchUrlBase: function(surl) {
         var ps = this._proxyStruct;
         return (ps.protocol == surl.protocol && ps.host == surl.host && this._matchPort(surl));
      },
   
      _matchPort: function(surl) {
         var np = this._proxyStruct.normalizedPort();
         return np == surl.normalizedPort();
      }
   });*/   
})();

