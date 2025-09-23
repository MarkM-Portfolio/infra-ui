/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

/**
 * OAuth actions
 * @namespace lconn.oauth.action
 */

/**
 * Emitted when an OAuth action completes
 *
 * @event lconn/oauth/action/completed
 * @type {List}
 * @property {Object|Array} [0] Messages
 * @property {Action} [1] The action firing the event
 */
 
/**
 * Base abstract OAuth action
 *
 * <h3>Usage</h3>
 * Actions are controller objects that perform a task on a target item.
 * They are instantiated by view objects (scenes, widgets and controls) and delegated control when the user
 * interacts with associated UI elements.
 * Usually, an action's {@link lconn.oauth.action._base#execute|execute} method would be connected with a button's
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
 * @name lconn.oauth.action._base
 * @extends lconn.core.action._base
 */
dojo.provide("lconn.oauth.action._base");
dojo.require("lconn.core.action._base");

dojo.declare("lconn.oauth.action._base", lconn.core.action._base, /** @lends lconn.oauth.action._base.prototype */ {
   /**
    * Subclassers must override this method.
    * All OAuth actions are expected to emit the topic <code>lconn/oauth/action/completed</code> when successful.
    * @param {Object} item Target of this action
    * @param {Object} opt Options
    * @param {Event} e Event triggering this action
    * @fires lconn/oauth/action/completed
    */
   execute: function(item, opt, e) {
      dojo.stopEvent(e);
      // Implementors must issue this dojo topic 
      dojo.publish("lconn/oauth/action/completed");
   }
});
