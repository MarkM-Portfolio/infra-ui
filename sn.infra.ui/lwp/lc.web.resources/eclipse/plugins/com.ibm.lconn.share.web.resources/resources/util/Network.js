/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.util.Network");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.atom");
dojo.require("dojo.io.iframe");
dojo.require("dojo.cookie");

dojo.declare("lconn.share.util.Network",null,{

   csrf: {
      cookie: "X-Update-Nonce",
      header: "X-Update-Nonce",
      param:  "nonce"
   },
   
   _handleAsMap: {
      "text" : "Text",
      "html" : "Text",
      "xml" : "Xml",
      "json" : "Json",
      "json-embedded" : "Json",
      "json-comment-optional" : "Json",
      "json-comment-filtered" : "Json"
   },
   
   constructor: function(opts) {
      if (opts)
         dojo.mixin(this, opts);
      this.inflight = [];
   },
   
   _validate: function(opts) {
      if (!opts) throw "opts is a required argument";
      if (!opts.url) throw "url is a required argument";
   },
   
   _getNonce: function(opts) {
      var nonce = null
      
      if(opts && opts.nonce)
         nonce = opts.nonce;
      
      var authenticatedUser = this.getAuthenticatedUser();
      if(!nonce && authenticatedUser && authenticatedUser.nonce)
         nonce = authenticatedUser.nonce;
      
      var cookieValue = dojo.cookie(this.csrf.cookie);
      if(!nonce && cookieValue)
         nonce = cookieValue;
      
      /*
      TODO: Generate a token as a last resort
      if(!nonce)
         nonce = dojox.uuid.generateRandomUuid();

      TODO: set cookie if it doesn't match the current nonce
      if(nonce && nonce != cookieValue)
         dojo.cookie(this.csrf.cookie, nonce, {path: "/"}); // TODO: path? domain?
      */
      
      return nonce || "true";
   },
   
   _setDefaults: function(verb, opts) {
      var authenticatedUser = this.getAuthenticatedUser();
      opts.verb = verb = verb.toLowerCase();
      
      switch(verb) {
         case 'put':
         case 'post':
         case 'delete':
            // update requests shouldn't trigger refresh after login by default
            opts.auth = opts.auth || {};
            if (typeof opts.auth.preventReload == "undefined")
               opts.auth.preventReload = true;
            
            if (typeof opts.timeout == "undefined")
               opts.timeout = (dojo.getObject("lconn.share.config.services.timeout.update") || 10)*1000;

            break;
         default:
            if (typeof opts.timeout == "undefined")
               opts.timeout = (dojo.getObject("lconn.share.config.services.timeout.request") || 10)*1000;
      }

      // Always set up nonce
      opts.nonce = this._getNonce(opts);
      
      // Suppress dojo error logging... we handle our own errors
      opts.failOk = true;

      if (verb == 'get' && opts.requireData !== false)
         opts.requireData = true;
      
      var ifMatch = opts.ifMatch;

      opts.headers = opts.headers || {};
      if (!ifMatch && opts.headers["If-Match"])
         ifMatch = opts.headers["If-Match"];
      delete opts.headers["If-Match"];
      ifMatch = dojo.trim(ifMatch || "");
      var secured = (opts.auth ? opts.auth.secured : undefined);
      if (authenticatedUser && secured != false && (secured == true || this.isSecuredUrl(opts.url))) {
         if (ifMatch.length > 0)
            ifMatch += ":"
         ifMatch += "uid="+authenticatedUser.id;
      }
      if (ifMatch.length > 0)
         opts.ifMatch = ifMatch;
      else
         delete opts.ifMatch;
      
      if (opts.handleAs == "xml" && dojo.isIE) {
         var url = lconn.share.util.uri.parseUri(opts.url);
         if (!url.queryParameters.format) {
            url.queryParameters.format = "xml";
            opts.url = lconn.share.util.uri.writeUri(url);
         }
      }
   },

   _setXmlDefaults: function(verb, opts) {
      this._validate(opts);
      opts.handleAs = "xml";
      this._setDefaults(verb, opts);
   },

   _setJsonDefaults: function(verb, opts) {
      this._validate(opts);
      opts.handleAs = opts.handleAs || "json";
      this._setDefaults(verb, opts);
   },

   _setTextDefaults: function(verb, opts) {
      this._validate(opts);
      opts.handleAs = opts.handleAs || "text";
      this._setDefaults(verb, opts);
   },

   _setMultipartDefaults: function(verb, opts) {
      this._validate(opts);
      if (typeof opts.timeout == "undefined")
         opts.timeout = (dojo.getObject("lconn.share.config.services.timeout.upload") || 0) * 1000;
      opts.handleAs = opts.handleAs || "json-embedded";
      this._setDefaults(verb, opts);
   },

   _addDirectives: function(opts, directives, addToHeaders, addToURL, addToContent) {
      if (addToHeaders) {
         opts.headers = opts.headers || {};
         if (opts.csrf && opts.csrf.header) {
            opts.headers[opts.csrf.header] = opts.nonce;            
         }
         else {
            opts.headers[this.csrf.header] = opts.nonce;            
         }
      }
      if (addToURL) {
         var uri = lconn.share.util.uri.parseUri(opts.url);
         uri.queryParameters[this.csrf.param] = opts.nonce;
      }
      if (addToContent) {
         opts.content = opts.content || {};
         opts.content[this.csrf.param] = opts.nonce;
      }

      for (var key in directives) {
         var value = directives[key];
         if (typeof(value) != "undefined" && directives.hasOwnProperty(key)) {
            if (addToHeaders)
               opts.headers[key] = value;
            if (addToURL)
               uri.queryParameters[key] = value;
            if (addToContent)
               opts.content[key] = value;
         }
      }

      if (addToURL)
         opts.url = lconn.share.util.uri.writeUri(uri);
   },

   _dfdcaller: function(f, response) {
      try {
         return f(response, this.ioArgs);
      }
      catch(e) {
         console.error("Network._dfdcaller", e);
         if (dojo.config.isDebug)
         	debugger;
         throw e;
      }
   },

   /**
    * Cancel all inflight requests
    */
   cancel: function() {
      for (var i=0,dfd; dfd=this.inflight[i];)
         if (dfd.interruptible !== false) {
            this.inflight.splice(i, 1);
            try {dfd.cancel();} catch (e) {console.error(e);}
         }
         else
            i++;
   },
   
   get: function(opts)  { return this._delegate("get", opts);  },
   head: function(opts)  { return this._delegate("head", opts);  },
   put: function(opts)  { return this._delegate("put", opts);  },
   post: function(opts) { return this._delegate("post", opts); },
   _delegate: function(verb, opts) {
      this._validate(opts);
      var type = this._handleAsMap[opts.handleAs];
      if (!type)
         throw ("Unsupported handleAs type " + opts.handleAs);
      var op = this[verb.toLowerCase() + type];
      if (typeof(op) != "function")
         throw ("Unsupported operation " + verb + " for handleAs type " + opts.handleAs);
      return op.apply(this, [opts]);
   },

   _sendXhr: function(method, opts, raw) {
      if(this.wrapOpts)
         opts = this.wrapOpts(opts);
      try {
         if (opts.onUploadProgress) {
            var f = dojo._xhrObj;
            dojo._xhrObj = function() {
               var ret = f.apply(this, arguments);
               dojo._xhrObj = f;
               if (ret.upload)
                  ret.upload.addEventListener("progress", opts.onUploadProgress, false);
               return ret;
            }
         }

         var dfdcaller = this._dfdcaller;
         var handle = opts.handle ? dojo.hitch(opts, dfdcaller, opts.handle) : null;
         var load = opts.load ? dojo.hitch(opts, dfdcaller, opts.load) : null;
         var error = opts.error ? dojo.hitch(opts, dfdcaller, opts.error) : null;

         opts.handle = dojo.hitch(this, "_handle");
         opts.load = opts.error = null;
         
         if (opts.handleAs == "json-embedded") {
            opts.handleAs = "html";
            opts._xhrHandleAs = "json-embedded";
         }

         this.onNetwork(opts);
         var dfd = dojo.xhr(method, opts, raw);
         this.inflight.push(dfd);
         opts.dfd = dfd;
         if (method != "GET" || opts.background)
            dfd.interruptible = false;
         
         // original handlers are added as follow up callers
         if (handle)
            dfd.addBoth(handle);
         if (load) 
            dfd.addCallback(load);
         if (error) 
            dfd.addErrback(error);
         
         return dfd;
      } catch (e) {
         this._openFailure(e, opts);
      }
   },
   _sendIframe: function(opts) {
      try {
         var dfdcaller = this._dfdcaller;
         var handle = opts.handle ? dojo.hitch(opts, dfdcaller, opts.handle) : null;
         var load = opts.load ? dojo.hitch(opts, dfdcaller, opts.load) : null;
         var error = opts.error ? dojo.hitch(opts, dfdcaller, opts.error) : null;

         opts.handle = dojo.hitch(this, "_handle");
         opts.load = opts.error = null;

         if (opts.handleAs == "json-embedded") {
            opts.handleAs = "html";
            opts._xhrHandleAs = "json-embedded";
         }

         this.onNetwork(opts);

			// TODO: IE8 will set the values null or undefined as string values onto a hidden
         // input and Dojo 1.4 does not work around this.  Replace values with empty string
         // to match other browsers behavior.  Remove when Dojo fixes.
			var content = opts.content;
			if (dojo.isIE && content)
				for (var key in content)
					if (content[key] == undefined) // also == null
						content[key] = "";
			
         var dfd = dojo.io.iframe.send(opts);
         this.inflight.push(dfd);
         opts.dfd = dfd;
         dfd.interruptible = false;
         
         // original handlers are added as follow up callers
         if (handle)
            dfd.addBoth(handle);
         if (load) 
            dfd.addCallback(load);
         if (error) 
            dfd.addErrback(error);
         
         return dfd;
      } catch (e) {
         this._openFailure(e, opts);
      }
   },
   
   getXml: function(opts) {
      this._setXmlDefaults('get', opts);
      this._addDirectives(opts, {"If-Match": opts.ifMatch}, true, false, false);
      return this._sendXhr("GET", opts, false);
   },
   headXml: function(opts) {
      this._setXmlDefaults('head', opts);
      this._addDirectives(opts, {"If-Match": opts.ifMatch}, true, false, false);
      return this._sendXhr("HEAD", opts, false);
   },   
   postXml: function(opts) {
      this._setXmlDefaults('post', opts);
      this._addDirectives(opts, {"If-Match": opts.ifMatch}, true, false, false);
      return this._sendXhr("POST", opts, true);
   },
   putXml: function(opts) {
      this._setXmlDefaults('put', opts);
      this._addDirectives(opts, {"X-Method-Override": "PUT", "If-Match": opts.ifMatch}, true, false, false);
      return this._sendXhr("POST", opts, true);
   },
   deleteXml: function(opts) {
      this._setXmlDefaults('delete', opts);
      this._addDirectives(opts, {"X-Method-Override": "DELETE", "If-Match": opts.ifMatch}, true, false, false);
      return this._sendXhr("POST", opts, true);
   },
   getJson: function(opts) {
      this._setJsonDefaults('get', opts);
      this._addDirectives(opts, {
         "If-Match": opts.ifMatch
      }, true, false, false);
      return this._sendXhr("GET", opts, false);
   },
   postJson: function(opts) {
	   this._setJsonDefaults('post', opts);
      this._addDirectives(opts, {"If-Match": opts.ifMatch}, true, false, false);
      return this._sendXhr("POST", opts, false);
   },
   getText: function(opts) {
      this._setTextDefaults('get', opts);
      this._addDirectives(opts, {
         "If-Match": opts.ifMatch
      }, true, false, false);
      return this._sendXhr("GET", opts, false);
   },
   putMultipart: function(opts) {
      this._setMultipartDefaults('put', opts);
      this._addDirectives(opts, {
         "X-Method-Override": "PUT",
         "If-Match": opts.ifMatch
      }, false, true, true);
      return this._sendIframe(opts);
   },
   postMultipart: function(opts) {
      this._setMultipartDefaults('post', opts);
      this._addDirectives(opts, {
         "If-Match": opts.ifMatch
      }, false, true, true);
      return this._sendIframe(opts);
   },
   
   /**
    * Preload an iframe post request so that non-encrypt form submission will not fail when browser popup security warning message.  
    */
   preload: function(app){
      if(app.preload) {
         var dfd = new dojo.Deferred();
         dfd.callback(true);
         return dfd;
      }
      else {
         app.preload = true;
         return dojo.io.iframe.send({
            handleAs: "html",
            url: app.routes._getSB("nonce"),
            noStatus: true,
            auth: {preventLogin: true}
         });
      }
   },
  
   onNetwork: function(opts) {},
   onNetworkEnd: function(opts) {},

   _handle: function(response, ioArgs) {
      var ret;
      try {
         var opts = ioArgs.args;
         this.onNetworkEnd(opts);
         
         // remove the dfd from the inflight list
         var dfd = opts.dfd;
         var i = dojo.indexOf(this.inflight, dfd);
         if (i != -1)
            this.inflight.splice(i, 1);
         opts.dfd = null;
         
         opts.ioArgs = ioArgs; // so that the dfd callers can get access
         var error = lconn.share.util.atom.getError(response, ioArgs, opts);
         if (!error && opts._xhrHandleAs == "json-embedded") {
            response = lconn.share.util.atom.getJsonResponseFromHtml(response);
            error = lconn.share.util.atom.getJsonError(response);
         }
         ret = (error) ? error : response;
      } catch (e) {
         console.error(e);
         throw e;
      }
      return ret;
   },
   
   _openFailure: function(e, opts) {
      console.error(e);
      this.onNetworkEnd(opts);
      e = new Error(e);
      e.dojoType = "init";
      var f = opts.error || opts.handle;
      if (f)
         f.apply(opts,[e, {args: opts}]);
      else
         throw e;
   },
   
   getAuthenticatedUser: function() {
      return null;
   },
   
   isSecuredUrl: function(url) {
      return false;
   },
   
   onError: function(error, ioArgs) {
      return error;
   }
});
