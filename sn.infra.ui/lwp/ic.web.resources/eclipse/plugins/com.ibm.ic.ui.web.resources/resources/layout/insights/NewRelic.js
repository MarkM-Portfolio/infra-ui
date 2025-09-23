/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo/_base/lang",
      "dojo/_base/config",
      "ic-core/config/features",
      "./tracker",
      "./debug/NewRelicDebug"
], function(lang, config, has, tracker) {
   /**
    * New Relic plugin for page insights instrumentation
    * 
    * @namespace ic-ui.layout.insights.NewRelic
    */

   var NEWRELIC = "newrelic";

   function NewRelic_addPageAction() {
      if (lang.getObject("newrelic") && lang.isFunction(lang.getObject("newrelic.addPageAction")) && has('insights-new-relic')) {
         // TODO: use Function.prototype.bind once dropped support for IE8 >_<
         newrelic.addPageAction.apply(newrelic, arguments)
      } else if (config.isDebug) {
         console.warn("New Relic instrumentation was invoked but is missing");
      }
   }

   var NewRelic = lang.mixin(lang.getObject("com.ibm.lconn.layout.insights.NewRelic", true), /** @lends ic-ui.layout.insights.NewRelic */
   {
      /**
       * Name of this plugin
       * 
       * @type {String}
       */
      name : NEWRELIC,
      /**
       * Signals a page event. The caller must pass an event name and optional
       * metadata
       * 
       * @method
       * @param {String}
       *           event The event name
       * @param {Object}
       *           data The event metadata
       */
      track : NewRelic_addPageAction,
      /**
       * Registers this plugin with the insights tracker
       */
      register : function() {
         tracker.register(NEWRELIC, NewRelic_addPageAction);
      }
   });

   // Auto register
   NewRelic.register();

   return NewRelic;
});
