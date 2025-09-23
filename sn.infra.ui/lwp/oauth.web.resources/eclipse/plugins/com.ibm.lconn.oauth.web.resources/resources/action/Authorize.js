/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.oauth.action.Authorize");
dojo.require("lconn.oauth.action._base");

/**
 * Emitted when an OAuth authorization grant request is approved
 *
 * @event lconn/oauth/application/authorized
 * @type {List}
 * @property {Object} [0] Target of the action
 * @property {Action} [1] The action firing the event
 */

dojo.declare("lconn.oauth.action.Authorize", lconn.oauth.action._base, /** @lends lconn.oauth.action.Authorize.prototype */ {
   /**
    * Authorizes an OAuth authorization request
    * @constructs
    * @extends lconn.oauth.action._base
    * @author Claudio Procida <procidac@ie.ibm.com>
    * @param {Object} app Application instance
    * @param {Object} scene Scene instance
    * @param {Object} [opt] Options
    */
   constructor: function(app, scene, opts) {
      this.nls = app.nls.authorize;
   },
   /**
    * Returns the tooltip for this action
    * @param {Object} item Target of this action
    * @returns the tooltip for this action
    */
   getTooltip: function(item) {
      return dojo.string.substitute(this.nls.action_tooltip, [item.getName()]);
   },
   /**
    * Emits the topic <code>lconn/oauth/application/authorized</code> that signals that the authorization was granted
    * @param {Object} item Target of the action
    * @param {Object} opt Options
    * @param {Event} e Event
    * @fires lconn/oauth/action/completed
    * @fires lconn/oauth/application/authorized
    */
   execute: function(item, opt, e) {
      dojo.stopEvent(e);
      // TODO:
      var t = {messages: {success:true, message:dojo.string.substitute(this.nls.success, [item.getName()])}};
      dojo.publish("lconn/oauth/action/completed", [t, this]);
      // All this action does is to publish this topic
      dojo.publish("lconn/oauth/application/authorized", [item, this]);
   }
});
