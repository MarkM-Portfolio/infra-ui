/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/aspect"
], function (array, declare, lang, aspect) {

	// ---------------- ConnectionManager -------------------
	// Allows managing connections by scope so that
	// connections are always kept track of and destroyed
	// ------------------------------------------------------
	
	var ConnectionManager = declare("com.ibm.social.incontext.ConnectionManager", null, {
	   // Initializes a map that will keep a set of connection scopes
	   // The key into the map is the name of a scope (arbitrary string)
	   // The value is an array of connections related to that scope
	   constructor: function() {
	      this._cm = { };
	   },
	
	   // Replacement for the dojo.connect method. Takes in an extra
	   // parameter that specifies the scope of the connection. The scope
	   // is then used to decide which array in the map will keep track
	   // of the connection.
	   cmconnect: function(scope, obj, event, context, method) {
	      var conn = this._cm;
	      if (!conn[scope]) {
	         conn[scope] = [];
	      }
	      conn[scope].push(aspect.after(obj, event, lang.hitch(context, method), true));      
	      //console.log(scope + "=" + conn[scope].length);
	   },
	
	   // Destroys all connections that have been made given a scope
	   clearConnScope: function (scope) {      
	      var conn = this._cm;
	      array.forEach(conn[scope], function(item) { item.remove(); });
	      conn[scope] = null;
	      //console.log("clearing scope=" + scope);
	   },
	
	   // Destroys connections in all scopes
	   clearAllConn: function() {
	      var conn = this._cm;
	      if (conn) {
	         for (var scope in conn) {
	            this.clearConnScope(scope);
	            //console.log("clearing scope=" + scope);
	         }   
	      }
	   }
	});
	return ConnectionManager;
});
