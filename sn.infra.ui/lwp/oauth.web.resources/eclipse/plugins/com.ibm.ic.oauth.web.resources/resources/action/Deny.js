/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/string",
      "dojo/topic",
      "./_base"
], function(dojo, declare, string, topic, _base) {

   /**
    * Emitted when an OAuth authorization grant request is denied
    * 
    * @event ic-oauth/application/denied
    * @type {List}
    * @property {Object} [0] Target of the action
    * @property {Action} [1] The action firing the event
    */
   var TOPIC = "ic-oauth/application/denied";

   var Deny = declare("lconn.oauth.action.Deny", _base, /** @lends ic-oauth.action.Deny.prototype */
   {
      /**
       * Denies an OAuth authorization request
       * 
       * @constructs
       * @extends ic-oauth.action._base
       * @param {Object}
       *           app Application instance
       * @param {Object}
       *           scene Scene instance
       * @param {Object}
       *           [opt] Options
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      constructor : function(app, scene, opt) {
         this.nls = (app && app.nls && app.nls.deny) || {};
      },
      /**
       * Returns the tooltip for this action
       * 
       * @param {Object}
       *           item Target of this action
       * @returns the tooltip for this action
       */
      getTooltip : function(item) {
         return string.substitute(this.nls.action_tooltip || "", [ (item && item.clientDisplayName) || ""
         ]);
      },
      /**
       * Emits the topic <code>ic-oauth/application/denied</code> that signals
       * that the authorization was denied
       * 
       * @param {Object}
       *           item Target of the action
       * @param {Object}
       *           opt Options
       * @param {Event}
       *           e Event
       * @fires ic-oauth/action/completed
       * @fires ic-oauth/application/denied
       */
      execute : function(item, opt, e) {
         if (e) {
            e.preventDefault();
            e.stopPropagation();
         }
         // TODO:
         var t = {};
         topic.publish(_base.TOPIC, t, this);
         // All this action does is to publish this topic
         topic.publish(TOPIC, item, this);
      }
   });

   /**
    * Name of the topic emitted when the action completes
    * 
    * @const TOPIC
    * @memberof ic-oauth.action.Deny
    */
   Deny.TOPIC = TOPIC;

   return Deny;
});
