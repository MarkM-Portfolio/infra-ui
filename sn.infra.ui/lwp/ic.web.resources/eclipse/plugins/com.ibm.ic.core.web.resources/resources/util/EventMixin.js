/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/aspect"
], function (dojo, declare, lang, aspect) {

/*
	 * Utility mixin for classes that want to use this.subscribe and/or this.connect
	 * like in dijits (which mixin dijit._Widget) without the overhead of
	 * dijit._Widget
	 * <p>
	 * By default subscriptions and connections are undone on destroy. Override
	 * disconnectionFuncName to use another event such as "unLoad"
	 * 
	 * @class ic-core.util.EventMixin
	 * @author David McMullin <dmcmulli@ie.ibm.com>
	 */
	
	var EventMixin = declare("lconn.core.util.EventMixin", null, /** @lends ic-core.util.EventMixin.prototype */
	{
	   /**
	    * All subscriptions and connections will be detached when this method is
	    * called in the mixed in class.
	    */
	   disconnectionFuncName : "destroy",
	
	   /**
	    * Subscribes to a topic
	    * 
	    * @see {@link dijit._Widget#subscribe}
	    */
	   subscribe : function() {
	      var subscriptions = [];
	
	      this.subscribe = function() {
	         return subscriptions.push(dojo.subscribe.apply(dojo, arguments));
	      };
	      aspect.after(this, this.disconnectionFuncName, lang.hitch(null, function() {
	         var subscription;
	         while (subscription = subscriptions.pop()) {
	            subscription.remove();
	         }
	      }), true);
	
	      return this.subscribe.apply(this, arguments);
	   },
	   /**
	    * Connects to an event or a method
	    * 
	    * @see {@link dijit._Widget#connect}
	    */
	   connect : function() {
	      var connections = [];
	
	      this.connect = function() {
	         return connections.push(dojo.connect.apply(dojo, arguments));
	      };
	      aspect.after(this, this.disconnectionFuncName, lang.hitch(null, function() {
	         var connection;
	         while (connection = connections.pop()) {
	            connection.remove();
	         }
	      }), true);
	
	      return this.connect.apply(this, arguments);
	   }
	});
	
	return EventMixin;
});
