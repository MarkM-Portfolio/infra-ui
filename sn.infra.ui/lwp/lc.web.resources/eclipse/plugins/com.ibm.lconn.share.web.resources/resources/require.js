/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

/**
 * @namespace lconn
 */

/**
 * @namespace lconn.share
 */

(function(){
   dojo.provide("lconn.share.require");
   dojo.require("dojo.DeferredList");
   dojo.require("net.jazz.ajax.xdloader");

   var _d = dojo;
   var _ls = dojo.getObject("lconn.share", true);
   var _dfds = _ls.bundleDfd = {};
   _ls.bundles = {};
   
   function _parallelScript(url) {
      var d = document;
      var head = d.getElementsByTagName("head")[0];
      var s = d.createElement("script");
      s.type = "text/javascript";
      s.src = url;
      
      if(dojo.isIE)
         setTimeout(function(){head.appendChild(s);}, 0);
      else
         head.appendChild(s);
   }
   
   // topic for available subscription
   function available(s) {
      var dfd = _dfds[s];
      if (!dfd) {
         dfd = _dfds[s] = new dojo.Deferred();
      }
      
      // Always init module check if necessary
      dfd.modules = dfd.modules || {};
      
      // Flag as ready
      dfd.ready = true;
      
      // Delegate to callback first (in case a callback defines one of the modules checked for)
      dfd.callback(dojo.getObject(s));

      // Run module checks      
      for (var key in dfd.modules)
         if (!dojo.exists(key))
            console.error("The module '"+key+"' was missing from an async require of module '"+s+"'");
   }
   dojo.subscribe("lconn/share/require/available", available);
   
   /**
    * Load the class 's', calling dojo.require() on 'b' if necessary.  Will check
    * lconn.share.bundles if b is null for a suggested bundle.
    */
   _ls.require = function(s, b) {
      var e = dojo.getObject(s);
      if (e) return e;
      if (!b)
         b = _ls.bundles[s];
      if (b) {
         if (dojo.isArray(b))
            for (var i=0,l=b.length;i<l;i++)
               _d.require(b[i], true);
         else
            _d.require(b, true);
         e = dojo.getObject(s);
         if (e)
            return e;
      }
      _d.require(s);
      return dojo.getObject(s);
   }
   
   /**
    * Provide a credible impersonation of Dojo xd loading.  Should eventually replace
    * with XD, assuming we can solve the other necessary issues.  If passed an array
    * of strings, will return a deferred that depends on all functions
    */
   _ls.requireAsync = function(b, moduleCheck, concurrent) {
	  var dfd = new dojo.Deferred();
	  net.jazz.ajax.xdloader.load_async(b, dojo.hitch(dfd, "callback", {}), concurrent);
      return dfd;
   }
   
   /**
    * Return a deferred that will execute when a bundle becomes available
    */
   _ls.whenRequired = function(b) {
      var dfd = _dfds[b];
      if (!dfd)
         dfd = _dfds[b] = new dojo.Deferred();
      return dfd;
   }
})();
