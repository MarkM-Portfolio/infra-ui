/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.oauth.action.RevokeToken");
dojo.require("lconn.oauth.action._base");
dojo.require("lconn.core.DialogUtil");

dojo.requireLocalization("lconn.core", "strings");

/**
 * Emitted when an OAuth authorization is revoked
 *
 * @event lconn/oauth/authorization/revoked
 * @type {List}
 * @property {Action} [0] The action firing the event
 */

(function(window, document) {
   
   // This is our internal private interface
   var _i = /** @lends lconn.oauth.action.RevokeToken.prototype */ {
      /**
       * Performs a DELETE on the token REST endpoint, and emits the topic <code>lconn/oauth/authorization/revoked</code> if the authorization was successfully revoked.
       * @param {Object} item Target of the action
       * @param {Object} opt Options
       * @param {Boolean} revoke True if the token must be revoked
       * @fires lconn/oauth/action/completed
       * @fires lconn/oauth/authorization/revoked
       * @private
       */
      revokeToken: function(item, opt, revoke) {
         if (!revoke) {
            return;
         }
         dojo.xhrDelete({
            url: this.app.routes.getAuthzEntryServiceUrl(item.clientId),
            handle: dojo.hitch(this, function(r, i) {
               var e, success;
               if (r instanceof Error) {
                  e = {messages: {error: true, message: this.nls.error}};
               } else {
                  e = {messages: {info: true, message: this.nls.success}};
                  success = true;
               }
               if (success) {
                  dojo.publish("lconn/oauth/authorization/revoked", [this]);
               }
               dojo.publish("lconn/oauth/action/completed", [e, this]);
            })
         });
      }
   };

   dojo.declare("lconn.oauth.action.RevokeToken", lconn.oauth.action._base, /** @lends lconn.oauth.action.RevokeToken.prototype */ {
      /**
       * Revokes an OAuth authorization
       * @constructs
       * @extends lconn.oauth.action._base
       * @param {Object} app Application instance
       * @param {Object} scene Scene instance
       * @param {Object} [opt] Options
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      constructor: function(app, scene, opts) {
         this.nls = app.nls.revoke_token;
         this._nls = dojo.i18n.getLocalization("lconn.core", "strings");
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
       * Prompts the user with a dialog to confirm the revocation of the authorization
       * @param {Object} item Target of the action
       * @param {Object} opt Options
       * @param {Event} e Event
       */
      execute: function(item, opt, e) {
         dojo.stopEvent(e);
         lconn.core.DialogUtil.prompt(this.nls.dialog_title,
               this.nls.confirm,
               this.nls.ok,
               this.nls.cancel,
               dojo.hitch(this, _i.revokeToken, item, opt),
               null);
      }
   });
//Create a closure on window and document so we're safe in case custom code tampers with them
}(window, document));
