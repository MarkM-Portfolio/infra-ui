/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.oauth.action.Deny");
dojo.require("lconn.oauth.action._base");

/**
 * Emitted when an OAuth authorization grant request is denied
 *
 * @event lconn/oauth/application/denied
 * @type {List}
 * @property {Object} [0] Target of the action
 * @property {Action} [1] The action firing the event
 */

dojo.declare("lconn.oauth.action.Deny", lconn.oauth.action._base, /** @lends lconn.oauth.action.Deny.prototype */ {
   /**
    * Denies an OAuth authorization request
    * @constructs
    * @extends lconn.oauth.action._base
    * @param {Object} app Application instance
    * @param {Object} scene Scene instance
    * @param {Object} [opt] Options
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   constructor: function(app, scene, opt) {
      this.nls = app.nls.deny;
   },
   /**
    * Returns the tooltip for this action
    * @param {Object} item Target of this action
    * @returns the tooltip for this action
    */
   getTooltip: function(item) {
      return dojo.string.substitute(this.nls.action_tooltip, [item.clientDisplayName]);
   },
   /**
    * Emits the topic <code>lconn/oauth/application/denied</code> that signals that the authorization was denied
    * @param {Object} item Target of the action
    * @param {Object} opt Options
    * @param {Event} e Event
    * @fires lconn/oauth/action/completed
    * @fires lconn/oauth/application/denied
    */
   execute: function(item, opt, e) {
      dojo.stopEvent(e);
      // TODO:
      var t = {};
      dojo.publish("lconn/oauth/action/completed", [t, this]);
      // All this action does is to publish this topic
      dojo.publish("lconn/oauth/application/denied", [item, this]);
   }
});
