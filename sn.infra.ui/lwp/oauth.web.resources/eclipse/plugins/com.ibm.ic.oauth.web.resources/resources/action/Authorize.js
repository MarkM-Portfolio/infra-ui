/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/string",
      "dojo/topic",
      "ic-oauth/action/_base"
], function(dojo, declare, string, topic, _base) {

   /**
    * Emitted when an OAuth authorization grant request is approved
    * 
    * @event ic-oauth/application/authorized
    * @type {List}
    * @property {Object} [0] Target of the action
    * @property {Action} [1] The action firing the event
    */
   var TOPIC = "ic-oauth/application/authorized";

   var Authorize = declare("lconn.oauth.action.Authorize", _base, /** @lends ic-oauth.action.Authorize.prototype */
   {
      /**
       * Authorizes an OAuth authorization request
       * 
       * @constructs
       * @extends ic-oauth.action._base
       * @author Claudio Procida <procidac@ie.ibm.com>
       * @param {Object}
       *           app Application instance
       * @param {Object}
       *           scene Scene instance
       * @param {Object}
       *           [opt] Options
       */
      constructor : function(app, scene, opts) {
         this.nls = (app && app.nls && app.nls.authorize) || {};
      },
      /**
       * Returns the tooltip for this action
       * 
       * @param {Object}
       *           item Target of this action
       * @returns the tooltip for this action
       */
      getTooltip : function(item) {
         return string.substitute(this.nls.action_tooltip || "", [ (item && item.getName && item.getName()) || ""
         ]);
      },
      /**
       * Emits the topic <code>ic-oauth/application/authorized</code> that
       * signals that the authorization was granted
       * 
       * @param {Object}
       *           item Target of the action
       * @param {Object}
       *           opt Options
       * @param {Event}
       *           e Event
       * @fires ic-oauth/action/completed
       * @fires ic-oauth/application/authorized
       */
      execute : function(item, opt, e) {
         if (e) {
            e.preventDefault();
            e.stopPropagation();
         }
         // TODO:
         var t = {
            messages : {
               success : true,
               message : string.substitute(this.nls.success || "", [ (item && item.getName && item.getName()) || ""
               ])
            }
         };
         topic.publish(_base.TOPIC, t, this);
         // All this action does is to publish this topic
         topic.publish(TOPIC, item, this);
      }
   });

   /**
    * Name of the topic emitted when the action completes
    * 
    * @const TOPIC
    * @memberof ic-oauth.action.Authorize
    */
   Authorize.TOPIC = TOPIC;

   return Authorize;
});
