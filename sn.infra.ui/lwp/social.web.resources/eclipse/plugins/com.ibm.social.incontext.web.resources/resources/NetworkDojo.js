/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.NetworkDojo");
dojo.require("com.ibm.social.incontext.util.atom");
dojo.require("com.ibm.social.incontext.util.uri");
dojo.require("dojo.io.iframe");

dojo.declare("com.ibm.social.incontext.NetworkDojo", null,{
   handleUnauthenticated: false,
   authenticationRequired: false,
   showPermissionDenied: false,
   xhrGetOverride: null,
   xhrDeleteOverride: null,
   rawXhrPostOverride: null,
   rawXhrPutOverride: null,
   multiPartPostOverride: null,
   xmethodoverride: null,
   errorMap: null,
   maxTimeout: null,
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
   },
   
   _validate: function(opts) {
      if (!opts) throw "opts is a required argument";
      if (!opts.url) throw "url is a required argument";
   },
   
   _setDefaults: function(verb, opts) {
      var authenticatedUser = this.getAuthenticatedUser(), ifMatch, url;   
      verb = verb.toLowerCase();
      switch(verb) {
         case 'put':
         case 'post':
         case 'delete':
            if (authenticatedUser)
               opts.nonce = opts.nonce || authenticatedUser.nonce;
            break;
         default:
         	break;

      }
      
      if (!opts.noTimeout) {
         if (!opts.timeout)
            opts.timeout = (this.maxTimeout || 10)*1000;
      }
      else //we want to disable having any timeout, e.g. for importing a spreadsheet on lists which can take a long time
         opts.timeout = null;
      

      if (verb == 'get' && opts.requireData !== false)
         opts.requireData = true;
         
      ifMatch = opts.ifMatch;

      opts.headers = opts.headers || {};
      if (!ifMatch && opts.headers["If-Match"])
         ifMatch = opts.headers["If-Match"];
      delete opts.headers["If-Match"];
      ifMatch = dojo.trim(ifMatch || "");
      if (opts.secured !== false) {
         if (authenticatedUser && authenticatedUser.id) {
            if (ifMatch.length > 0)
               ifMatch += ":";
            ifMatch += ("uid="+authenticatedUser.id);
         }
      }      
      if (ifMatch.length > 0)
         opts.ifMatch = ifMatch;
      else
         delete opts.ifMatch;         

      if (opts.handleAs == "xml" && dojo.isIE) {
         url = com.ibm.social.incontext.util.uri.parseUri(opts.url);
         if (!url.queryParameters.format) {
            url.queryParameters.format = "xml";
            opts.url = com.ibm.social.incontext.util.uri.writeUri(url);
         }
      }
   },

   _setXmlDefaults: function(verb, opts) {
      this._validate(opts);
      opts.handleAs = opts.handleAs || "xml";
      this._setDefaults(verb, opts);
   },

   _setJsonDefaults: function(verb, opts) {
      this._validate(opts);
      opts.handleAs = opts.handleAs || "json-comment-optional";
      this._setDefaults(verb, opts);
   },

   _setTextDefaults: function(verb, opts) {
      this._validate(opts);
      opts.handleAs = opts.handleAs || "text";
      this._setDefaults(verb, opts);
   },

   _setMultipartDefaults: function(verb, opts) {
      this._validate(opts);
      opts.timeout = opts.timeout || (this.maxTimeout * 1000);
      opts.handleAs = opts.handleAs || "json-embedded";
      this._setDefaults(verb, opts);
   },

   _addDirectives: function(opts, directives, addToHeaders, addToURL, addToContent) {
      var uri, key, value;
      if (addToHeaders)
         opts.headers = opts.headers || {};
      if (addToURL)
         uri = com.ibm.social.incontext.util.uri.parseUri(opts.url);
      if (addToContent)
         opts.content = opts.content || {};
      if(directives) {
         for (key in directives) {
            value = directives[key];
            if (typeof(value) != "undefined" && directives.hasOwnProperty(key)) {
               if (addToHeaders)
                  opts.headers[key] = value;
               if (addToURL)
                  uri.queryParameters[key] = value;
               if (addToContent)
                  opts.content[key] = value;
            }
         }
      }

      if (addToURL)
         opts.url = com.ibm.social.incontext.util.uri.writeUri(uri);
   },

   _decorateHandler: function(opts, retryFunction) {
      var localOpts = {};
         localOpts.handle = opts.handle;
         localOpts.handleAs = opts.handleAs;
         localOpts.requireData = opts.requireData;
         localOpts.error = opts.error;
         localOpts.load = opts.load;

      if (opts.handleAs == "json-embedded")
         opts.handleAs = "html";
      opts.error = null;
      opts.load = null;

      opts.handle = dojo.hitch(this, "_handle", localOpts, opts, retryFunction);
   },

   get: function(opts)  { 
      if (!opts.hideLoadingMsg)
         this.showWorking(); 
      return this._delegate("get", opts);  
   },
   put: function(opts)  { return this._delegate("put", opts);  },
   post: function(opts) { return this._delegate("post", opts); },
   head: function(opts) {
      this._decorateHandler(opts, dojo.hitch(this, "_xhrHead"));
      this._xhrHead(opts);
   },
   _xhrHead: function(opts) {
      dojo.xhr("HEAD", opts);
   },
   _delegate: function(verb, opts) {
      this._validate(opts);
      var type = this._handleAsMap[opts.handleAs], op;
      if (!type)
         throw ("Unsupported handleAs type " + opts.handleAs);
      op = this[verb.toLowerCase() + type];
      if (typeof(op) != "function")
         throw ("Unsupported operation " + verb + " for handleAs type " + opts.handleAs);
      return op.apply(this, [opts]);
   },

   getXml: function(opts) {
      this._setXmlDefaults('get', opts);
      this._addDirectives(opts, {
         "If-Match": opts.ifMatch
      }, true, false, false);
      this._decorateHandler(opts, dojo.hitch(this, "_xhrGet"));
     return this._xhrGet(opts);
   },
   postXml: function(opts) {
      this._setXmlDefaults('post', opts);
      this._addDirectives(opts, {"If-Match": opts.ifMatch, "X-Update-Nonce": opts.nonce}, true, false, false);
      this._decorateHandler(opts, dojo.hitch(this, "_rawXhrPost"));
      return this._rawXhrPost(opts);
   },
   putXml: function(opts) {
      this._setXmlDefaults('put', opts);
      var dirs = {"If-Match": opts.ifMatch, "X-Update-Nonce": opts.nonce};
      if (this.xmethodoverride)
         dirs["X-Method-Override"] = "PUT";
      this._addDirectives(opts, dirs, true, false, false);
      this._decorateHandler(opts, dojo.hitch(this, "_rawXhrPost"));
      return this.xmethodoverride ? this._rawXhrPost(opts) : this._rawXhrPut(opts);
   },
   deleteXml: function(opts) {
      this._setXmlDefaults('delete', opts);
      var dirs = {"If-Match": opts.ifMatch, "X-Update-Nonce": opts.nonce};
      if (this.xmethodoverride)
         dirs["X-Method-Override"] = "DELETE";
      this._addDirectives(opts, dirs, true, false, false);
      this._decorateHandler(opts, dojo.hitch(this, "_rawXhrPost"));
      return this.xmethodoverride ? this._rawXhrPost(opts) : this._xhrDelete(opts);
   },
   getJson: function(opts) {
      this._setJsonDefaults('get', opts);
      this._addDirectives(opts, {
         "If-Match": opts.ifMatch
      }, true, false, false);
      this._decorateHandler(opts, dojo.hitch(this, "_xhrGet"));
      return this._xhrGet(opts);
   },
   postJson: function(opts) {
      this._setJsonDefaults('post', opts);
      this._addDirectives(opts, {
         "If-Match": opts.ifMatch
      }, true, false, false);
      this._decorateHandler(opts, dojo.hitch(this, "_rawXhrPost"));
      return this._rawXhrPost(opts);
   },
   getText: function(opts) {
      this._setTextDefaults('get', opts);
      this._addDirectives(opts, {
         "If-Match": opts.ifMatch
      }, true, false, false);
      this._decorateHandler(opts, dojo.hitch(this, "_xhrGet"));
      return this._xhrGet(opts);
   },
   putMultipart: function(opts) {
      this._setMultipartDefaults('put', opts);
      this._addDirectives(opts, {
         "X-Method-Override": "PUT",
         "If-Match": opts.ifMatch,
         "X-Update-Nonce": opts.nonce
      }, false, true, true);
      this._decorateHandler(opts, dojo.hitch(this, "_multiPartPost"));
      return this._multiPartPost(opts);
   },
   postMultipart: function(opts) {
      this._setMultipartDefaults('post', opts);
      this._addDirectives(opts, {
         "If-Match": opts.ifMatch,
         "X-Update-Nonce": opts.nonce
      }, false, true, true);      
      this._decorateHandler(opts, dojo.hitch(this, "_multiPartPost"));
      return this._multiPartPost(opts);
   },
   getAuthenticatedUser: function() {
      return null;
   },
   _handle: function(opts, retryOpts, retryFunction, response, ioArgs) {
      this.showIdle();
      var error = com.ibm.social.incontext.util.atom.getError(response, ioArgs, opts, this.errorMap),
         authHeader, json;
      if (error) {
         if (error.code == "unauthenticated" && this.handleUnauthenticated) {
            authHeader = ioArgs.xhr.getResponseHeader("WWW-Authenticate");
            if (authHeader && authHeader.indexOf("Basic") !== 0) {//don't override the regular basic auth connection
               this.authenticationRequired({retryOpts: retryOpts, retryFunction: retryFunction});
               return false;
            }
         }
         if (error.code == "AccessDenied") {
            if (this.showPermissionDenied) {
               this.showPermissionDenied();
               return false;
            }
         }
         this._callHandlers(opts, ioArgs, error, true);
         return;
      }

      if (opts.handleAs == "json-embedded") {
         json = com.ibm.social.incontext.util.atom.getJsonResponseFromHtml(response);
         error = com.ibm.social.incontext.util.atom.getJsonError(json, this.df.getErrorCodeMap());
         if (error)
            this._callHandlers(opts, ioArgs, error, true); 
         else
            this._callHandlers(opts, ioArgs, json, false);
         return;
      }
      else {
         this._callHandlers(opts, ioArgs, response, false) ;
         return;
      }
   },
   _callHandlers: function(opts, ioArgs, response, isError) {
      if(opts.handle)
         opts.handle(response, ioArgs);
      if (isError) {
         if(opts.error)
            opts.error(response, ioArgs);
      } 
      else {
         if(opts.load)
            opts.load(response, ioArgs);  
      }
   },
   _xhrGet: function(opt) {
      if (this.xhrGetOverride) {
         return this.xhrGetOverride(opt);
      } else {
         return dojo.xhrGet(opt);
      }
   },
   
   _xhrDelete: function(opt) {
      if (this.xhrDeleteOverride) {
         return this.xhrDeleteOverride(opt);
      } else {
         return dojo.xhrDelete(opt);
      }
   },
   
   _rawXhrPost: function(opt) {
     if (this.rawXhrPostOverride) {
        return this.rawXhrPostOverride(opt);
     }  else {
        return dojo.rawXhrPost(opt);
     }
   },
   
   _rawXhrPut: function(opt) {
      if (this.rawXhrPutOverride) {
         return this.rawXhrPutOverride(opt);
      }  else {
         return dojo.rawXhrPut(opt);
      }
    },

    _multiPartPost: function(opt) {
      if (this.multiPartPostOverride) {
         return this.multiPartPostOverride(opt);     
      } else {
         return dojo.io.iframe.send(opt);
      }
   },
   showWorking: function () {   	
   },
   showIdle: function () {},
   rewriteUrl: function (url) { return url; }
   });
   com.ibm.social.incontext.NetworkDojo.getInstance = function(opts) {
      if(!com.ibm.social.incontext.NetworkDojo._instance)
         com.ibm.social.incontext.NetworkDojo._instance = new com.ibm.social.incontext.NetworkDojo(opts);
      return com.ibm.social.incontext.NetworkDojo._instance;
   };