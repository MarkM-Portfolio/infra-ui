/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.util.urifragment");
dojo.require("lconn.share.util.uri");

lconn.share.util.urifragment = {
   toAnchorForm: function(uri, base, params) {
      var path = uri.path;
      if (path) {
         if (path.indexOf(base) == 0) {
            var p = {};
            var fragment = path.substring(base.length);
            var newuri = dojo.clone(uri);

            if (newuri.queryParameters) {
               var q = newuri.queryParameters;
               if (params) {
                  for (var key in params) {
                     p[key] = q[key] || params[key];
                     delete q[key];
                  }
               }
               fragment += lconn.share.util.uri.writeParameters(q);
            }
            else {
              for (var key in params) {
                 p[key] = params[key];
              }
            }
            newuri.path = base;
            newuri.fragment = (fragment.length > 0) ? fragment : "/";
            newuri.queryParameters = p;
            newuri.query = null;
            
            uri = newuri;
         }
      }
      return uri;
   },

   fromAnchorForm: function(uri, base) {
      if (!uri)
         return uri;
      var path = uri.path;
      if (uri.fragment && path) {
         if (path == base) {
            var fragment = uri.fragment;
            
            var uricopy = dojo.clone(uri);
            var p = uricopy.queryParameters;
            uricopy.queryParameters = null;
            uricopy.query = null;
            uricopy.fragment = null;
            uricopy.path = path + fragment;

            var url = lconn.share.util.uri.writeUri(uricopy);
            var newuri = new dojo._Url(url);

            dojo.mixin(p, lconn.share.util.uri.splitQuery(newuri.query));
            newuri.queryParameters = p;
            newuri.query = null;
            uri = newuri;
         }
      }
      return uri;
   }
};
