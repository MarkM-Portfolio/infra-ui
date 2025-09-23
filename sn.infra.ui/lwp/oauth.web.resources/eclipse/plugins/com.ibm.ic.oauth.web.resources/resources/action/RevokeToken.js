/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/i18n!ic-core/nls/strings",
   "dojo/request",
   "dojo/string",
   "dojo/topic",
   "ic-ui/DialogUtil",
   "./_base"
], function (dojo, declare, lang, i18nstrings, request, string, topic, DialogUtil, _base) {

   /**
    * Emitted when an OAuth authorization is revoked
    *
    * @event ic-oauth/authorization/revoked
    * @type {List}
    * @property {Action} [0] The action firing the event
    */
   var TOPIC = "ic-oauth/authorization/revoked";

   // This is our internal private interface
   var _i = /** @lends ic-oauth.action.RevokeToken.prototype */ {
      /**
       * Performs a DELETE on the token REST endpoint, and emits the topic <code>ic-oauth/authorization/revoked</code> if the authorization was successfully revoked.
       * @param {Object} item Target of the action
       * @param {Object} opt Options
       * @param {Boolean} revoke True if the token must be revoked
       * @fires ic-oauth/action/completed
       * @fires ic-oauth/authorization/revoked
       * @private
       */
      revokeToken: function(item, opt, revoke) {
         if (!revoke) {
            return;
         }
         var url = this.app && this.app.routes && this.app.routes.getAuthzEntryServiceUrl(item && item.clientId);
         request(url, {method: "DELETE"}).then(lang.hitch(this, function(r, i) {
            var e, success;
            if (r instanceof Error) {
               e = {messages: {error: true, message: this.nls.error}};
            } else {
               e = {messages: {info: true, message: this.nls.success}};
               success = true;
            }
            if (success) {
               topic.publish(TOPIC, this);
            }
            topic.publish(_base.TOPIC, e, this);
         }));
      }
   };

   var RevokeToken = declare("lconn.oauth.action.RevokeToken", _base, /** @lends ic-oauth.action.RevokeToken.prototype */ {
      /**
       * Revokes an OAuth authorization
       * @constructs
       * @extends ic-oauth.action._base
       * @param {Object} app Application instance
       * @param {Object} scene Scene instance
       * @param {Object} [opt] Options
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      constructor: function(app, scene, opts) {
         this.nls = (app && app.nls && app.nls.revoke_token) || {};
         this._nls = i18nstrings;
      },
      /**
       * Returns the tooltip for this action
       * @param {Object} item Target of this action
       * @returns the tooltip for this action
       */
      getTooltip: function(item) {
         return string.substitute(this.nls.action_tooltip || "", [(item && item.clientDisplayName) || ""]);
      },
      /**
       * Prompts the user with a dialog to confirm the revocation of the authorization
       * @param {Object} item Target of the action
       * @param {Object} opt Options
       * @param {Event} e Event
       */
      execute: function(item, opt, e) {
         if (e) {
            e.preventDefault();
            e.stopPropagation();
         }
         DialogUtil.prompt(this.nls.dialog_title,
               this.nls.confirm,
               this.nls.ok,
               this.nls.cancel,
               lang.hitch(this, _i.revokeToken, item, opt),
               null);
      }
   });

   /**
    * Name of the topic emitted when the action completes
    * @const TOPIC
    * @memberof ic-oauth.action.RevokeToken
    */
   RevokeToken.TOPIC = TOPIC;

   return RevokeToken;
});
