/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/cookie",
	"dojo/json"
], function (declare, lang, cookie, JSON) {

	var Preferences = declare("com.ibm.social.incontext.util.Preferences", null, {
	   name: "sic",
	   expiration: 40 * 1000 * 60 * 60 * 24,
	   path: "/",
	
	   constructor: function(opts) {
	      lang.mixin(this, opts);
	   },
	   get: function(key) {
	      this._init();
	      return this.prefs[key];
	   },
	   put: function(key,value) {
	      this._init();
	      if (!key || key === "")
	         return;
	      if (typeof value == "undefined" || value === null)
	         delete this.prefs[key];
	      else
	         this.prefs[key] = value;
	      this._store();
	   },
	   _init: function() {
	      if (!this._initialized) {
	         var value = cookie(this.name);
	         try {
	            this.prefs = JSON.parse(value);
	         } catch (e) {
	         }
	         this.prefs = this.prefs || {};
	         this._initialized = true;
	      }
	   },
	   _store: function() {
	      cookie(this.name, JSON.stringify(this.prefs), {expires: 30, path: this.path});
	   },
	   reset: function() {
	      this.prefs = {};
	      cookie(this.name, "", {expires: 30, path: this.path});
	   }
	});
	
	
	return Preferences;
});
