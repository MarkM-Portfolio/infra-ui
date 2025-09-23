/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.AbstractRoutes");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.configUtil");

dojo.declare("lconn.share.AbstractRoutes", null, {
  /* Subclasses should define:
   globalParameters: null,
   _basic: null,
   _basicAnon: null,
   _form: null,
   _formAnon: null,
   */
   getQueryString: function(map) {
      var quu = lconn.share.util.uri;
      var global = this.globalParameters;
      if (map) {
         if (global) {
            var p = dojo.clone(global);
            for (var key in map)
               p[key] = map[key];
            return quu.writeParameters(p);
         }
         return quu.writeParameters(map);
      } 
      else if (global)
         return quu.writeParameters(global);
      return "";
   },
   getAuthenticatedUser: function() {
      return null;
   },
   isAuthenticatedUser: function(userId) {
      var u = this.getAuthenticatedUser();
      if (!userId)
         return typeof u == "object" && u != null;
      return u && u.id == userId;
   },
   
   _getSB: function(path, opt, pathAuth) {
      // Force an anonymous URL, even when authenticated, for things like public feeds
      var anonymous = opt && opt.anonymous && !this.disableAnonymous;
      var basicAuth = opt && opt.basicAuth;

      // Force a non-personal url, for things like feed subscriptions
      var nonPersonal = opt && opt.nonPersonal;
      if (nonPersonal)
         pathAuth = null;

      if (basicAuth) {
         if (!anonymous && this.isAuthenticatedUser())
            return this._basic + (pathAuth || path);
         return this._basicAnon + path;
      }
      if (!anonymous && this.isAuthenticatedUser())
         return this._form + (pathAuth || path);
      return this._formAnon + path;      
   },
   _getUSB: function(userId, path, pathPersonal, opt) {
      // Force an anonymous URL, even when authenticated, for things like public feeds
      var anonymous = opt && opt.anonymous && !this.disableAnonymous;
      var basicAuth = opt && opt.basicAuth;

      // Force a non-personal url, for things like feed subscriptions
      var nonPersonal = opt && opt.nonPersonal;
      if (nonPersonal)
         pathPersonal = null;

      var s;
      if (basicAuth) {
         if (!anonymous && this.isAuthenticatedUser())
            if (pathPersonal && this.getAuthenticatedUser().id == userId)
               s = this._basic + pathPersonal;
            else
               s = this._basic + path.replace("{userId}", encodeURIComponent(userId));
         else 
            s = this._basicAnon + path.replace("{userId}", encodeURIComponent(userId));
      }
      else {
         if (!anonymous && this.isAuthenticatedUser())
            if (pathPersonal && this.getAuthenticatedUser().id == userId)
               s = this._form + pathPersonal;
            else
               s = this._form + path.replace("{userId}", encodeURIComponent(userId));
         else
            s = this._formAnon + path.replace("{userId}", encodeURIComponent(userId));
      }
      return s;
   },
   
   getHostUrl: function(url) {
      var temp = url;
      if (url.indexOf("://") >= 0) {
         var protocal = url.substring(0, url.indexOf("://") + 3);
         temp = url.substring(url.indexOf("://") + 3);
         var host = temp.substring(0, temp.indexOf("/"));
         return protocal + host;
      }
      return url;
   },
   
   getOrganizationURLs: function(url) {
      if (url){
         if (url.indexOf("http://") < 0 && url.indexOf("https://") < 0)
            return url;
      }
      if (this.isAuthenticatedUser()) {
         if (!(lconn.core.config.multiTenantEnabled && lconn.core.config.properties.OrganizationURLs == "true")){
            return url;
         }
      }else {
         return url;
      }
      if (!url)
         return url;
      var serviceUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.files).uri;
         serviceUrl = (serviceUrl ? serviceUrl.toString(): null) || '/';
      return url.replace(this.getHostUrl(url), this.getHostUrl(serviceUrl));
   },
   
   getProxiedUrl: function(url, opt) {
      var uri = lconn.share.util.uri.parseUri(url);
      var serviceUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.files).uri;
         serviceUrl = (serviceUrl ? serviceUrl.toString(): null) || '/';
      var appUri = lconn.share.util.uri.parseUri(this.getOrganizationURLs(serviceUrl));
      if ((uri.scheme == null || uri.scheme == appUri.scheme) && (uri.authority == null || uri.authority == appUri.authority))
         return url;
      else if(opt && opt.commonProxy) {
         var lccs_d = dojo.getObject("lconn.core.config.services.deploymentConfig");
         var commonUrl = lccs_d && lccs_d.url ? lconn.share.util.uri.parseUri(lconn.core.url.getServiceUrl(lccs_d).uri).path : "";
         return commonUrl + '/proxy/commonProxy/' + url.replace("://","/");
      }
      else
         return dojo.getObject("ibmConfig.proxyURL") + url.replace("://","/");
   }   
});
