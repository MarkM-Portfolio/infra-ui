/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/topic",
   "ic-core/action/_base"
], function (declare, topic, baseAction) {

   /**
    * OAuth actions
    * @namespace ic-oauth.action
    */

   /**
    * Emitted when an OAuth action completes
    *
    * @event ic-oauth/action/completed
    * @type {List}
    * @property {Object|Array} [0] Messages
    * @property {Action} [1] The action firing the event
    */
   var TOPIC = "ic-oauth/action/completed";

   /**
    * Base abstract OAuth action
    *
    * <h3>Usage</h3>
    * Actions are controller objects that perform a task on a target item.
    * They are instantiated by view objects (scenes, widgets and controls) and delegated control when the user
    * interacts with associated UI elements.
    * Usually, an action's {@link ic-oauth.action._base#execute|execute} method would be connected with a button's
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
    * 
    * @author Claudio Procida <procidac@ie.ibm.com>
    * @class Base abstract OAuth action
    * @name ic-oauth.action._base
    * @extends ic-core.action._base
    */
   var _base = declare("lconn.oauth.action._base", baseAction, /** @lends ic-oauth.action._base.prototype */ {
      /**
       * Subclassers must override this method.
       * All OAuth actions are expected to emit the topic <code>ic-oauth/action/completed</code> when successful.
       * @param {Object} item Target of this action
       * @param {Object} opt Options
       * @param {Event} e Event triggering this action
       * @fires ic-oauth/action/completed
       */
      execute: function(item, opt, e) {
         if (e) {
            e.preventDefault();
            e.stopPropagation();
         }
         // Implementors must issue this dojo topic 
         topic.publish(TOPIC);
      }
   });

   /**
    * Name of the topic emitted when the action completes
    * @const TOPIC
    * @memberof ic-oauth.action._base
    */
   _base.TOPIC = TOPIC;

   return _base;
});
