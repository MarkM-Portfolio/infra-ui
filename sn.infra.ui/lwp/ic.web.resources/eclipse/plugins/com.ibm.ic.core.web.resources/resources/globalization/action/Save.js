/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/json",
      "dojo/request",
      "dojo/topic",
      "ic-core/action/_base"
], function(declare, lang, JSON, request, topic, _base) {

   function getPreferences(item) {
      return (item && item.getPreferences()) || {};
   }

   var Save = declare("lconn.core.globalization.action.Save", _base, /** @lends ic-core.globalization.action.Save.prototype */
   {
      /**
       * Constructs an action
       * 
       * @class Action that saves globalization preferences
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
         this.nls = app && app.nls && app.nls.save || {};
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
       *           item Item
       * @param {Object}
       *           opt Options (ignored)
       * @param {Event}
       *           [e] Event
       */
      execute : function(item, /* ignored */opt, e) {
         if (e) {
            e.preventDefault();
            e.stopPropagation();
         }
         var url = this.app && this.app.routes && this.app.routes.getPreferencesSettingsServiceUrl();
         request(url, {
            method : "POST",
            data : JSON.stringify(getPreferences(item))
         }).then(lang.hitch(this, function(r, i) {
            var e, success = false;
            if (r instanceof Error) {
               e = {
                  messages : {
                     error : true,
                     message : this.nls.error
                  }
               };
            }
            else {
               e = {
                  messages : {
                     success : true,
                     message : this.nls.success
                  }
               };
               success = true;
            }
            topic.publish("ic-core/action/completed", e, this);
            if (success)
               topic.publish("ic-core/globalization/saved", this, getPreferences(item));
         }));
      }
   });
   return Save;
});
