/* Copyright IBM Corp. 2006, 2015  All Rights Reserved.              */
(function() {
	
dojo.provide("com.ibm.oneui.util.Url");

/**
 * Public URL that does query parameter parsing
 */
dojo.declare("com.ibm.oneui.util.Url", dojo._Url, {
	getQuery: function() {
		if (!this.queryParameters)
			this.queryParameters = splitQuery(this.query);
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
	    	if (query.charAt(0) != '?')
	    		uri.push("?");
	    	uri.push(query)
	    }
	    if (this.fragment) {
	    	uri.push("#");
	    	uri.push(this.fragment);
	    }
	   	
 	    return uri.join("");
	}
});

function splitQuery(query) {
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
}

function writeParameters(map) {
   var out = [];
   for (var key in map) {
      var values = map[key];
      if (values !== undefined && values != null) {
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
}

com.ibm.oneui.util.Url.secure = ((window.location.protocol || "http").replace(':','') == "https");

})();
