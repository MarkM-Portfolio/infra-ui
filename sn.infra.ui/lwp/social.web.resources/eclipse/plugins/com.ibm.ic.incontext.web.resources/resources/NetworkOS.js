/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/kernel",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/has",
	"dojo/io/iframe",
	"dojo/json",
	"dojo/Deferred",
	"ic-incontext/util/atom",
	"ic-incontext/util/dom",
	"ic-incontext/util/uri"
], function (dojo, declare, kernel, lang, windowModule, domConstruct, has, iframe, JSON, Deferred, atom, dom, uriModule) {

	function cloneAndCorrectIOArgs(cOpts, opts) {
		var k;
		for(k in opts) {
			if (opts[k] != cOpts[k]) {
				switch (k) {
					case "handleAs":
						cOpts[k] = opts.origFormat;
						break;
					case "url":
						cOpts[k] = opts[k].toString(); // ensure string
						break;
					default:
						cOpts[k] = opts[k];
						break;
				}
			}
		}
		return cOpts;
	};
	
	
	var NetworkOS = declare("com.ibm.social.incontext.NetworkOS", null,{
	   oAuthDefaults: {},   
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
	     // "json-embedded" : "Json",
	      "json-comment-optional" : "Json",
	      "json-comment-filtered" : "Json"
	   },
	   
	   constructor: function(opts) {
	      if (opts)
	         lang.mixin(this, opts);
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
	         
	      if (verb == 'get' && opts.requireData !== false)
	         opts.requireData = true;
	         
	      ifMatch = opts.ifMatch;
	
	      opts.headers = opts.headers || {};
	      if (!ifMatch && opts.headers["If-Match"])
	         ifMatch = opts.headers["If-Match"];
	      delete opts.headers["If-Match"];
	      ifMatch = lang.trim(ifMatch || "");
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
	         
	      // Add accept-language header
	      opts.headers["Accept-Language"] = kernel.locale;
	
	      if (opts.handleAs == "xml" && has("ie")) {
	         url = uriModule.parseUri(opts.url);
	         if (!url.queryParameters.handleAs) {
	            url.queryParameters.handleAs = "xml";
	            opts.url = uriModule.writeUri(url);
	         }
	      }
	      
	      if (opts.preventCache) {
	         url = uriModule.parseUri(opts.url);
	         url.queryParameters.preventCache = (new Date().valueOf());
	         opts.url = uriModule.writeUri(url);
	      }
	      
	      if (!opts.sign_viewer)
	    	  opts.sign_viewer = false;
	      if (!opts.sign_owner)
	    	  opts.sign_owner = false;
	    	  
	    	lang.mixin(opts, this.oAuthDefaults);
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
	      opts.handleAs = opts.handleAs || "json-embedded";
	      this._setDefaults(verb, opts);
	   },
	
	   _addDirectives: function(opts, directives, addToHeaders, addToURL, addToContent) {
	      var uri, key, value;
	      if (addToHeaders)
	         opts.headers = opts.headers || {};
	      if (addToURL)
	         uri = uriModule.parseUri(opts.url);
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
	         opts.url = uriModule.writeUri(uri);
	   },
	
	   _decorateHandler: function(opts, retryFunction) {
	      var localOpts = {};
	         localOpts.handle = opts.handle;
	         localOpts.error = opts.error;
	         localOpts.load = opts.load;
	         localOpts.dfd = opts.dfd;
	         localOpts.handleAs = opts.handleAs;
	         localOpts.requireData = opts.requireData;
	         localOpts.origFormat = opts.handleAs;
	      
	      /* Send all requests as text, we'll parse the response to be the original format in the handler*/
	      opts.origFormat = opts.handleAs;
	      opts.handleAs = "text";
	      opts.handle = lang.hitch(this, "_handle", localOpts, opts, retryFunction);
	   },
	
	   get: function(opts)  { 
	      if (!opts.hideLoadingMsg)
	         this.showWorking(); 
	      return this._delegate("get", opts);  
	   },
	   put: function(opts)  { return this._delegate("put", opts);  },
	   post: function(opts) { return this._delegate("post", opts); },
	   head: function(opts) {
		  this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_doHead"));
	      return this._doHead(opts);
	   },
	   _doHead: function(opt) {
	      if (this.xhrHeadOverride) {
	          return this.xhrHeadOverride(opt);
	      } 
	      else {
	          this._convertKeys(opt);
	          opt[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.HEAD;
	          gadgets.io.makeRequest(opt.url, opt.handle, opt);
	          return opt.dfd;
	      }
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
	      this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_doGet"));
	     return this._doGet(opts);
	   },
	   postXml: function(opts) {
	      this._setXmlDefaults('post', opts);
	      this._addDirectives(opts, {"If-Match": opts.ifMatch, "X-Update-Nonce": opts.nonce}, true, false, false);
	      this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_doPost"));
	      return this._doPost(opts);
	   },
	   putXml: function(opts) {
	      this._setXmlDefaults('put', opts);
	      var dirs = {"If-Match": opts.ifMatch, "X-Update-Nonce": opts.nonce};
	      if (this.xmethodoverride)
	         dirs["X-Method-Override"] = "PUT";
	      this._addDirectives(opts, dirs, true, false, false);
	      this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_doPost"));
	      return this.xmethodoverride ? this._doPost(opts) : this._doPut(opts);
	   },
	   deleteXml: function(opts) {
	      this._setXmlDefaults('delete', opts);
	      var dirs = {"If-Match": opts.ifMatch, "X-Update-Nonce": opts.nonce};
	      if (this.xmethodoverride)
	         dirs["X-Method-Override"] = "DELETE";
	      this._addDirectives(opts, dirs, true, false, false);
	      this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_doPost"));
	      return this.xmethodoverride ? this._doPost(opts) : this._doDelete(opts);
	   },
	   getJson: function(opts) {
	      this._setJsonDefaults('get', opts);
	      this._addDirectives(opts, {
	         "If-Match": opts.ifMatch
	      }, true, false, false);
	      // encode GET params so they aren't lost in the makeRequest
	      this._addDirectives(opts,opts.content, false, true, false);
	      this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_doGet"));
	      return this._doGet(opts);
	   },
	   postJson: function(opts) {
	      this._setJsonDefaults('post', opts);
	      this._addDirectives(opts, {
	         "If-Match": opts.ifMatch
	      }, true, false, false);
	      this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_doPost"));
	      return this._doPost(opts);
	   },
	   putJson: function(opts) {
	      this._setJsonDefaults('put', opts);
	      var dirs = {"If-Match": opts.ifMatch, "X-Update-Nonce": opts.nonce};
	      if (this.xmethodoverride)
	         dirs["X-Method-Override"] = "PUT";
	      this._addDirectives(opts, dirs, true, false, false);
	      this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_doPost"));
	      return this.xmethodoverride ? this._doPost(opts) : this._doPut(opts);
	   },
	   deleteJson: function(opts) {
	      this._setJsonDefaults('delete', opts);
	      this._addDirectives(opts, {
	         "If-Match": opts.ifMatch
	      }, true, false, false);
	      if (this.xmethodoverride)
	          dirs["X-Method-Override"] = "DELETE";
	      this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_doPost"));
	      return this.xmethodoverride ? this._doPost(opts) : this._doDelete(opts);
	   },
	   getText: function(opts) {
	      this._setTextDefaults('get', opts);
	      this._addDirectives(opts, {
	         "If-Match": opts.ifMatch
	      }, true, false, false);
	      this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_doGet"));
	      return this._doGet(opts);
	   },
	   putMultipart: function(opts) {
	      this._setMultipartDefaults('put', opts);
	      this._addDirectives(opts, {
	         "X-Method-Override": "PUT",
	         "If-Match": opts.ifMatch,
	         "X-Update-Nonce": opts.nonce
	      }, false, false, true);
	      this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_multiPartPost"));
	      return this._multiPartPost(opts);
	   },
	   postMultipart: function(opts) {
	      this._setMultipartDefaults('post', opts);
	      this._addDirectives(opts, {
	         "If-Match": opts.ifMatch,
	         "X-Update-Nonce": opts.nonce
	      }, false, false, true);
	      this._setupDeferred(opts);
	      this._decorateHandler(opts, lang.hitch(this, "_multiPartPost"));
	      return this._multiPartPost(opts);
	   },
	   getAuthenticatedUser: function() {
	      return null;
	   },
	   logError: function(msg) {
	      if (lang.getObject("gadgets.log")) {
	         gadgets.log(msg);
	      }
	      else {
	         console.error(msg);
	      }
	   },
	   printObj: function (obj) {
	      var txt = "";
	      if (lang.isObject(obj)) {
	         try {
	            txt = JSON.stringify(obj);
	         }
	         catch (e) {
	            // Ignore any exception
	         }
	      }
	      else {
	         txt += obj;
	      }
	      return txt;
	   },
	   /* Note: We assume the format returned is text */
	   _handle: function(opts, retryOpts, retryFunction, dataResponse) {
	      this.showIdle();
	      var statusCode, hadError, errObj, error, result, content, authHeader, headers, header;
	      retryOpts.responseHeaders = dataResponse.headers;
	      if (dataResponse.oauthApprovalUrl) {
	         if (this.onAuthApproval) {
	            this.onAuthApproval(dataResponse.oauthApprovalUrl, retryFunction, retryOpts);
	            return;
	         }
	      }
	      if (dataResponse.ssoReauthNeeded) {
	         if (this.onSSOReauth) {
	            this.onSSOReauth();
	            return;
	         }
	      }
	      if (dataResponse.rc || (dataResponse.rc === 0)) {
	            statusCode = parseInt(dataResponse.rc);
	            hadError = (statusCode >= 0 && !(statusCode >= 200 && statusCode < 300)) ? true : false;
	      }
	      if (hadError) {
	         errObj = new Error();
	            errObj.status = statusCode;
	            errObj.message = dataResponse.content || (dataResponse.error ? dataResponse.error.message : null);
	         error = atom.getError(errObj, {xhr: {status: statusCode}}, this.errorMap);
	         this.lastError = { error: error, request: retryOpts, response: dataResponse };
	         this.logError("Error in network response. Request opts: " + this.printObj(opts)  + ", Request originalOpts: " + this.printObj(retryOpts) + ", dataResponse: " + this.printObj(dataResponse));
	         if (error) {
	            if(opts.dfd)
	               opts.dfd.errback(error);
	         }
	      }
	      else {
	    	 // code needs cleanup; 'retryOpts' is what ends up as 'ioArgs'
	    	 var xhrRes = retryOpts.xhr = opts.xhr = opts.xhr || {};
	    	 xhrRes.status = statusCode || 200;
	    	  
	         if(dataResponse.text) {
	            content = dataResponse.text;
	            switch(opts.origFormat) {
	               case "json-comment-optional":
	                  content = this._textToJsonCmtOptional(content);
	                  break;
	               case "json-comment-filtered":
	                  content = this._textToJsonCmtFiltered(content);
	                  break;
	               case "json":
	                  content = this._textToJson(content);
	                  break;
	               case "html":
	                  content = this._textToHTML(content);
	                  break;
	               case "xml":
	                  content = this._textToXML(content);
	                  break;
	            }
	            if(opts.dfd)
	               opts.dfd.callback(content);
	         } 
	         else {
	            if(dataResponse.text == "") {
	               if(opts.dfd)
	                  opts.dfd.callback();
	            } else {
	               this.logError("Empty network response. Request opts: " + this.printObj(opts)  + ", Request originalOpts: " + this.printObj(retryOpts) + ", dataResponse: " + this.printObj(dataResponse));
	               var err = new Error("No data response error or content");
	               if(opts.dfd)
	                  opts.dfd.errback(err);
	            }
	         }
	      }
	   },
	   setCookies: function(headers) {
	      if(headers && headers["set-cookie"])
	         this.cookie = headers["set-cookie"];
	   },
	   /* Needs to be tested */
	   _textToJsonEmbedded: function(content) {
	      content = this._textToXML(content), json, error;
	      json = atom.getJsonResponseFromHtml(content);
	      error = atom.getJsonError(json);
	      return error ? error : json;
	   },
	   _textToJsonCmtOptional: function(content) {
	      if (content && /^[^{\[]*\/\*/.test(content))
	         return this._textToJsonCmtFiltered(content);
	      else
	         return this._textToJson(content);
	   },
	   _textToJsonCmtFiltered: function(content) {
	      var value = content,
	         cStartIdx = value.indexOf("\/*"),
	         cEndIdx = value.lastIndexOf("*\/");
	      if (cStartIdx == -1 || cEndIdx == -1)
	         throw new Error("JSON was not comment filtered");
	      return JSON.parse(value.substring(cStartIdx+2, cEndIdx));
	   },
	   _textToJson: function(content) {
	      return JSON.parse(content);
	   },
	   _textToHTML: function(content) {
	      var span = domConstruct.create("span");
	         span.innerHTML = content;
	      return span;
	   },
	   _textToXML: function(content) {
	      return dom.xmlDocumentFromString(content);
	   },
	   /* Pass keys OpenSocial is expecting */
	   _convertKeys: function(opt) {     
		  if(gadgets.io.RequestParameters.STREAM){
			  opt[gadgets.io.RequestParameters.STREAM] = true;   
		  }
	      opt[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.TEXT;
	      opt[gadgets.io.RequestParameters.REFRESH_INTERVAL] = -1;      
	      opt[gadgets.io.RequestParameters.GET_FULL_HEADERS] = true;
	      if(opt.content)
	         opt[gadgets.io.RequestParameters.POST_DATA] = opt.content;
	      if (opt.putData)
	         opt[gadgets.io.RequestParameters.POST_DATA] = opt.putData;
	      if (opt.postData)
	         opt[gadgets.io.RequestParameters.POST_DATA] = opt.postData;
	      if (opt.headers)
	         opt[gadgets.io.RequestParameters.HEADERS] = opt.headers;
	   },
	   _setupDeferred: function(opt) {
	      var dfd = new Deferred();
	      opt.dfd = dfd;
	      var cOpts = {};
	      if(opt.load && lang.isFunction(opt.load)) {
	         var loadFunc = opt.load;
	         dfd.addCallback(function(value) {
	        	cloneAndCorrectIOArgs(cOpts, opt);
	            return loadFunc.call(cOpts, value, cOpts);
	         });
	      }
	      if(opt.handle && lang.isFunction(opt.handle)) {
	         var handleFunc = opt.handle;
	         dfd.addBoth(function(value) {  
	        	cloneAndCorrectIOArgs(cOpts, opt);
	            return handleFunc.call(cOpts, value, cOpts);
	         });
	      }
	      if(opt.error && lang.isFunction(opt.error)) {
	         var errorFunc = opt.error;
	         dfd.addErrback(function(value) {
	        	 cloneAndCorrectIOArgs(cOpts, opt);
	            return errorFunc.call(cOpts, value, cOpts);
	         });
	      }
	   },
	   _doGet: function(opt) {
	      if (this.xhrGetOverride) {
	         return this.xhrGetOverride(opt);
	      } 
	      else {
	         this._convertKeys(opt);
	         opt[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.GET;
	         gadgets.io.makeRequest(opt.url, opt.handle, opt);
	         return opt.dfd;
	      }
	   },
	   _doDelete: function(opt) {
	      if (this.xhrDeleteOverride) {
	         return this.xhrDeleteOverride(opt);
	      } else {
	         this._convertKeys(opt);
	         opt[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.DELETE;
	         gadgets.io.makeRequest(opt.url, opt.handle, opt);
	         return opt.dfd;
	      }
	   },
	   
	   _doPost: function(opt) {
	     if (this.rawXhrPostOverride) {
	        return this.rawXhrPostOverride(opt);
	     }  
	     else {
	        this._convertKeys(opt);
	        opt[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.POST;
	        gadgets.io.makeRequest(opt.url, opt.handle, opt);
	        return opt.dfd;
	     }
	   },
	   
	   _doPut: function(opt) {
	      if (this.rawXhrPutOverride) {
	         return this.rawXhrPutOverride(opt);
	      }  
	      else {
	         this._convertKeys(opt);
	         opt[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.PUT;
	         gadgets.io.makeRequest(opt.url, opt.handle, opt);
	         return opt.dfd;
	      }
	    },
	    _multiPartPost: function(opt) {
	      if (this.multiPartPostOverride) {
	         return this.multiPartPostOverride(opt);     
	      } else if (!gadgets.io.proxiedMultipartFormPost) {
	    	  throw "Add <Require feature='proxied-form-post'/> to your gadget.xml";
	      } else {
	    	  var form = opt.form || windowModule.doc.createElement('form');
	    	  
	    	  if (!form.action) {
	    		  form.setAttribute("action", opt.url);
	    	  }
	    	  
	    	  this._convertKeys(opt);
	          opt[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.POST;
			
	    	  gadgets.io.proxiedMultipartFormPost(form, opt, opt.handle, function (ev, canceller) {
	    		  if (opt.progress)
	    			  opt.progress(ev);
	    	  }, opt.rawBody);
	    	  
	    	  return opt.dfd;
	      }
	   },
	   onAuthApproval: function(oauthApprovalUrl, retryFunction, retryOpts) {},   
	   showWorking: function(){},
	   showIdle: function(){},
	   rewriteUrl: function (url) {
	   	if (this.anonymous)
	   	   return url;
	   	else
	         return gadgets.io.getProxyUrl(url, dojo.mixin({"STREAM": true}, this.oAuthDefaults));
	   }   
	});
	
	NetworkOS._instance = null;
	
	NetworkOS.getInstance = function(opts) {
	   if(!NetworkOS._instance)
	      NetworkOS._instance = new NetworkOS(opts);
	   return NetworkOS._instance;
	}
	
	return NetworkOS;
});
