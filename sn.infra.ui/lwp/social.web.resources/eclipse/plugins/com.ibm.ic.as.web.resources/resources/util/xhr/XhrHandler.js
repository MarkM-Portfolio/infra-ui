/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/array",
		"dojo/_base/lang",
		"dojo/Deferred",
		"ic-as/util/xhr/DojoXhrHandler"
	], function (dojo, declare, array, lang, Deferred, DojoXhrHandler) {
	
		/**
		 * Make XHR requests with this object.
		 * A singleton which must be inited once and only once
		 * init can be empty (use dojo), use an options hash
		 * recognized by connections (eg: {"isGadget":true})
		 * or contain a totally separate xhrHandler (eg: {"xhr":yourHandlerFunc}) which understands
		 * the params expected by dojo.xhr.
		 * 
		 * @author Robert Campion
		 */
			var inited = false;
			return {
				
				_queuedRequests: [],
				noInitTimeout: false,
				useOauth: false,
				init: function(options){
					inited = true;
					if(this.noInitTimeout) {
						window.clearTimeout(this.noInitTimeout);
					}
					this.init = function(){
						as_console_debug("com.ibm.social.as.util.xhr.XhrHandler.init called twice!");		
					};
					
					options = options || {}; // for simplicity below - dojo is the else/default case.
					
					// If the gadgets.io API is available
					if(options.isGadget){
						// Use the OpenSocial XHR handler
						require(["ic-as/util/xhr/OSXhrHandler"], lang.hitch(this, function(OSXhrHandler) {
							lang.mixin(this, OSXhrHandler);
							this.initOSXhrHander();
							this.processQueue();
				    	 }));
						if(options.useOauth){
		                    this.useOauth = options.useOauth;
		                }						
					}else if(options.xhr) {
						lang.mixin(this, options);
					} else {
						lang.mixin(this, DojoXhrHandler);
						this.processQueue();
					}
					
				},
				
				processQueue: function(){
					// handle anything that was queued
					array.forEach(this._queuedRequests, function(reqObj) {
						this.xhr.apply(this, reqObj.args).addCallbacks(
								lang.hitch(reqObj.deferred, "callback"), 
								lang.hitch(reqObj.deferred, "errback"));
					}, this);
				},
				
				xhr: function(options){
					var df = new Deferred();
					this._queuedRequests.push({"args": arguments, "deferred": df});
					
					if(!inited && !this.noInitTimeout) {
						this.noInitTimeout = window.setTimeout(lang.hitch(this, function(){
							// inform anything that was queued
							array.forEach(this._queuedRequests, function(reqObj) {
								reqObj.deferred.errback("something is trying to use com.ibm.social.as.util.xhr.XhrHandler without calling init! Call init() with no params to simply use dojo's xhr service");
							}, this);
							as_console_debug("something is trying to use com.ibm.social.as.util.xhr.XhrHandler without calling init! Call init() with no params to simply use dojo's xhr service");
							throw new Error("something is trying to use com.ibm.social.as.util.xhr.XhrHandler without calling init! Call init() with no params to simply use dojo's xhr service");
						}), 3000);
					}
					
					return df;
				},
				
				/**
				 * Make an XHR HEAD request.
				 * @param args
				 */
				xhrGet: function(args){
					// Call directly into the main 'xhr' function.
					return this.xhr("GET", args);
				},
				
				/**
				 * Make an XHR POST request.
				 * @param args
				 */
				xhrPost: function(args){
					// Call directly into the main 'xhr' function.
					return this.xhr("POST", args);
				},
				
				/**
				 * Make an XHR PUT request.
				 * @param args
				 */
				xhrPut: function(args){
					// Call directly into the main 'xhr' function.
					return this.xhr("PUT", args);
				},
				
				/**
				 * Make an XHR DELETE request.
				 * @param args
				 */
				xhrDelete: function(args){
					// Call directly into the main 'xhr' function.
					return this.xhr("DELETE", args);
				},
				
				/**
				 * Make an XHR GET request.
				 * @param args
				 */
				xhrHead: function(args){
					// Call directly into the main 'xhr' function.
					this.xhr("HEAD", args);
				}
				
			};			
			
	});
