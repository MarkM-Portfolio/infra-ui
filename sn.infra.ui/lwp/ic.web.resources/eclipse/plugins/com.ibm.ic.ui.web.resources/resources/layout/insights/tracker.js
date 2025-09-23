/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dijit/_Widget",
      "dojox/lang/functional/object"
], function(declare, lang, _Widget, df) {

   /**
    * Pluggable tracker for page insights
    * <p>
    * This tracker supports plugins that can register a callback using the
    * {@see #register} method. Plugin callbacks must accept an
    * <code>event</code> argument and a <code>type</code> object.
    * <p>
    * Note: It is important that no Sensitive Personal Information (SPI) is
    * funnelled into the page insight API. Please scrub your content before
    * calling this API.
    * 
    * @namespace ic-ui.layout.insights.tracker
    */

   var registry = {};

   var tracker = lang.mixin(lang.getObject("com.ibm.lconn.layout.insights.tracker", true), /** @lends ic-ui.layout.insights.tracker */
   {
      /**
       * Button click action
       * 
       * @type {String}
       * @const
       */
      BUTTON_CLICK : 'button_click',
      /**
       * Form submit action
       * 
       * @type {String}
       * @const
       */
      FORM_SUBMIT : 'form_submit',
      /**
       * Generic action
       * 
       * @type {String}
       * @const
       */
      ACTION : 'action',
      /**
       * Add an event through all registered plugins
       * 
       * @param {String}
       *           event The event type
       * @param {Object}
       *           data Metadata for the event
       */
      track : function(event, data) {
         /* for each registered plugin, call plugin specific callback */
         df.forIn(registry, function(value, key) {
            value(event, data);
         });
      },
      /**
       * Register a plugin. Use a unique lowercase string for each plugin, e.g.
       * "coremetrics".
       * 
       * @param {String}
       *           name The plugin's name
       * @param {Function}
       *           callback The plugin's callback
       */
      register : function(name, callback) {
         if (registry[name]) {
            throw "Insights plugin '" + name + "' already registered!";
         }
         registry[name] = callback;
      },
      /**
       * Resets registered plugins
       * 
       * @private
       */
      _reset : function() {
         registry = {};
      }
   });

   //Class returned by tracker.getInstance() in order to use standard event naming
   var TrackerClass = declare(
      _Widget,
   {
      BUTTON_CLICK: tracker.BUTTON_CLICK,
      FORM_SUBMIT: tracker.FORM_SUBMIT,
      ACTION: tracker.ACTION,
      EVENT_PREFIX: "ic",

      componentName: "",

      setComponentName: function(component) {
         this.componentName = component;
      },

      register: function(name, callback) {
         tracker.register(name, callback);
      },

      track: function(eventName, data) {
         var event = [this.EVENT_PREFIX, this.componentName, eventName].join(".");
         tracker.track(event, data);
      }
   });

   tracker.getInstance = function(component) {
      return new TrackerClass({componentName: component ? component : ""});
   }

   return tracker;
});
