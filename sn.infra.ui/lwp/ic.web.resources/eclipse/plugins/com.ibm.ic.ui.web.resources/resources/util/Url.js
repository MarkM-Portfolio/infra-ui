/* Copyright IBM Corp. 2006, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/_base/url"
], function (dojo, declare, lang, _Url) {

   function splitQuery(query) {
      var params = {};
      if (!query) {
         return params;
      }
      if (query.charAt(0) == "?") {
         query = query.substring(1);
      }
   
      var i, args = query.split("&"), separator, key, existing, value;
      for (i=0; i<args.length; i++) {
         if (args[i].length > 0) {
            separator = args[i].indexOf("=");
            if (separator == -1) {
               key = decodeURIComponent(args[i]);
               existing = params[key];
               if (lang.isArray(existing)) {
                  existing.push("");
               }
               else if (existing) {
                  params[key] = [existing,""];
               }
               else {
                  params[key] = "";
               }
            } else if (separator > 0) {
               key = decodeURIComponent(args[i].substring(0, separator));
               value = decodeURIComponent(args[i].substring(separator+1));
               existing = params[key];
               if (lang.isArray(existing)) {
                  existing.push(value);
               }
               else if (existing) {
                  params[key] = [existing,value];
               }
               else {
                  params[key] = value;
               }
            }
         }
      }
      return params;
   }
   
   function writeParameters(map) {
      var key, values, i, out = [];
      for (key in map) {
         if (map.hasOwnProperty(key)) {
            values = map[key];
            if (values !== undefined && values != null) {
               key = encodeURIComponent(key);
               if (lang.isArray(values)) {
                  for (i=0; i<values.length; i++) {
                     if (values[i]) {
                        out.push(out.length==0 ? "?" : "&");
                        out.push(key);
                        out.push("=");
                        out.push(encodeURIComponent(values[i]));
                     }
                  }
               } else {
                  out.push(out.length==0 ? "?" : "&");
                  out.push(key);
                  out.push("=");
                  out.push(encodeURIComponent(values));
               }
            }
         }
      }
      return out.join("");
   }
   
   /**
    * Public URL that does query parameter parsing
    */
   var Url = declare("com.ibm.oneui.util.Url", _Url, {
      getQuery: function() {
         if (!this.queryParameters) {
            this.queryParameters = splitQuery(this.query);
         }
         return this.queryParameters;
      },
      getQueryString: function() {
         var params = this.queryParameters;
         if (params) {
            this.query = writeParameters(params);
            this.queryParameters = null;
         }
         return this.query;
      },
      toString: function() {
          var uri = [];
          if (this.scheme) {
            uri.push(this.scheme);
            uri.push(":");
          }
            
          if (this.authority) {
            uri.push("//");
            uri.push(this.authority);
          }
            
          uri.push(this.path);
          
          var query = this.getQueryString();
          if (query) {
            if (query.charAt(0) != '?') {
               uri.push("?");
            }
            uri.push(query);
          }
          if (this.fragment) {
            uri.push("#");
            uri.push(this.fragment);
          }
            
          return uri.join("");
      }
   });
   
   Url.secure = ((window.location.protocol || "http").replace(':','') == "https");

   return Url;
});
