/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/request",
      "dojo/topic",
      "ic-core/action/_base"
], function(declare, lang, request, topic, _base) {

   /**
    * Globalization actions
    * 
    * @namespace ic-core.globalization.action
    */
   var RestoreDefaults = declare("lconn.core.globalization.action.RestoreDefaults", _base, /** @lends ic-core.globalization.action.RestoreDefaults.prototype */
   {
      /**
       * Constructs an action
       * 
       * @class Action that restores default globalization preferences
       * @extends ic-core.action._base
       * @author Claudio Procida <procidac@ie.ibm.com>
       * @constructs
       * @param {App}
       *           app Application instance
       * @param {Scene}
       *           scene Scene instance
       * @param {Object}
       *           [opt] Options
       */
      constructor : function(app, scene, opts) {
         this.nls = (app && app.nls && app.nls.restore_defaults) || {};
      },
      /**
       * @returns the tooltip for the action
       * @param {Object}
       *           [item] Item
       */
      getTooltip : function(item) {
         return this.nls.action_tooltip || "";
      },
      /**
       * @param {Object}
       *           item Item (ignored)
       * @param {Object}
       *           opt Options (ignored)
       * @param {Event}
       *           [e] Event
       */
      execute : function(/* ignored */item, /* ignored */opt, e) {
         if (e) {
            e.preventDefault();
            e.stopPropagation();
         }
         var url = this.app && this.app.routes && this.app.routes.getPreferencesSettingsServiceUrl();
         request(url, {
            method : "DELETE"
         }).then(lang.hitch(this, function(r, i) {
            var e, success;
            if (r instanceof Error) {
               e = {
                  messages : {
                     error : true,
                     message : this.nls.error
                  }
               };
            }
            else {
               success = true;
               e = {
                  messages : {
                     success : true,
                     message : this.nls.success
                  }
               };
            }
            topic.publish("ic-core/action/completed", e, this);
            if (success) {
               topic.publish("ic-core/globalization/restored", this);
            }
         }));
      }
   });
   return RestoreDefaults;
});
