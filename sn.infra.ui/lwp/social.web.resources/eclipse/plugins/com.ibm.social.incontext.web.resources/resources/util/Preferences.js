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

dojo.provide("com.ibm.social.incontext.util.Preferences");

dojo.declare("com.ibm.social.incontext.util.Preferences", null, {
   name: "sic",
   expiration: 40 * 1000 * 60 * 60 * 24,
   path: "/",

   constructor: function(opts) {
      dojo.mixin(this, opts);
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
         var value = dojo.cookie(this.name);
         try {
            this.prefs = dojo.fromJson(value);
         } catch (e) {
         }
         this.prefs = this.prefs || {};
         this._initialized = true;
      }
   },
   _store: function() {
      dojo.cookie(this.name, dojo.toJson(this.prefs), {expires: 30, path: this.path});
   },
   reset: function() {
      this.prefs = {};
      dojo.cookie(this.name, "", {expires: 30, path: this.path});
   }
});

