/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/topic"
], function (declare, topic) {

   /**
    * Emitted when an action completes
    *
    * @event ic-core/action/completed
    * @type {List}
    * @property {Object|Array} [0] Messages
    * @property {Action} [1] The action firing the event
    */
   
   /**
    * Core actions toolkit
    * @namespace ic-core.action
    */
   var _base = declare("lconn.core.action._base", null, /** @lends ic-core.action._base.prototype */ {
      nls: null,
      /**
       * Base abstract action.
       *
       * <h3>Usage</h3>
       * Actions are controller objects that perform a task on a target item.
       * They are instantiated by view objects (scenes, widgets and controls) and delegated control when the user
       * interacts with associated UI elements.
       * Usually, an action's {@link ic-core.action._base#execute|execute} method would be connected with a button's
       * <code>onclick</code> event handler.
       *
       * This snippet shows a common use case for this class:
       * <pre>
       *    var action = new Action(app, scene, opt);
       *    // Check if action is valid before applying
       *    if (action.isValid(item)) {
       *       var a = dojo.create("a", {
       *          "class": "lotusAction",
       *          href: "javascript:;",
       *          // Use getName() to set the label of a button
       *          innerHTML: action.getName(item),
       *          // Use getTooltip() to set the tooltip of a button
       *          title: action.getTooltip(item)
       *       }, td);
       *       dijit.setWaiRole(a, "button");
       *       // getTooltip() can also be used to set the ARIA label
       *       dijit.setWaiState(a, "label", action.getTooltip(item));
       *       // Connect the button's onclick event handler with the action's execute method.
       *       // Hitch the target item and options at this time.
       *       dojo.connect(a, "onclick", dojo.hitch(action, action.execute, item, {}));
       *    }
       * </pre>
       * @constructs
       * @param {Object} app Application instance
       * @param {Object} scene Scene instance
       * @param {Object} [opt] Options
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      constructor: function(app, scene, opts) {
         this.app = app;
      },
      /**
       * @returns true if the action is valid (i.e. applicable) in the current context
       */
      isValid: function() {
         return true;
      },
      /**
       * @param {Object} [item] Target of the action
       */
      getName: function(/* unused */item) {
         return this.nls.action;
      },
      /**
       * @param {Object} [item] Target of the action
       */
      getTooltip: function(item) {
         return this.nls.action_tooltip;
      },
      /**
       * Subclassers must override this method to perform the action.
       * All core actions are expected to emit the evebt {@link event:ic-core/action/completed} when successful.
       * @param {Object} item Target of the action
       * @param {Object} opt Options
       * @param {Event} e Event
       * @fires ic-core/action/completed
       */
      execute: function(item, opt, e) {
         if (e) {
            e.preventDefault();
            e.stopPropagation();
         }
         // Implementors must issue this dojo topic 
         topic.publish("ic-core/action/completed");
      }
   });
   return _base;
});
