/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo/_base/array",
   "dojo/_base/declare",
   "dojo/_base/lang"
], function (array, declare, lang) {

   /**
    * A mixin class to support declarative-style page management in the Application toolkit.
    * <p>
    * This mixin enables declarative page layout and easy manipulation of page layouts in an application instance.
    * See the Examples section for supported patterns.
    * </p>
    *
    * <h3>Usage</h3>
    * <p>
    * Applications mixed in with this class will expose a <code>scene.page</code> property, whose members reflect the
    * structure of a OneUI page template, i.e. <code>columns.left</code>, <code>columns.right</code>, <code>content</code>, etc.
    * </p><p>
    * These objects will offer an <code>add()</code> method that accepts controls, references to, or ids of DOM nodes, or arrays
    * of the former.
    * </p><p>
    * This mixin augments the application class with a <code>decorate()</code> method that accepts a scene as arguement.
    * In order to leverage declarative layout, implementors must call <code>decorate()</code> on every scene created by the application,
    * usually in the <code>resolveScene()</code> method.
    * </p>
    *
    * <h3>Examples</h3>
    * <pre>
    * // Add one control
    * app.scene.page.content.add(new com.ibm.oneui.controls.MessageBox());
    * app.scene.page.columns.left.add(com.ibm.oneui.controls.ButtonFactory.createButton());
    *
    * // Add a list of controls
    * app.scene.page.columns.right.add([
    *    new com.ibm.oneui.controls.MessageBox(),
    *    com.ibm.oneui.controls.ButtonFactory.createButton()
    * ]);
    * </pre>
    *
    * @mixin ic-core.app._DeclarativeLayoutMixin
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   function add(scene, prop, node) {
      if (lang.isArray(node))
         return array.forEach(node, lang.partial(add, scene, prop));
      // Return immediately if caller passes no argument
      if (!scene || !scene[prop] || !node) return;
      scene[prop].appendChild(node.domNode || node);
   }

   var _DeclarativeLayoutMixin = declare("lconn.core.app._DeclarativeLayoutMixin", null, /** @lends ic-core.app._DeclarativeLayoutMixin.prototype */ {
      /**
       * Augments the scene with a <code>page</code> member that exposes a set of members reflecting the
       * structure of a OneUI page template, i.e. <code>page.columns.left</code>, <code>page.columns.right</code>,
       * <code>page.content</code>, etc.
       * @param {Scene} scene Scene instance
       * @returns the scene instance
       */
      decorate: function(scene) {
         return lang.mixin(scene, {
            page: {
               columns: {
                  left: {
                     /**
                      * @function scene.page.columns.left.add
                      * @param {Control|Node|String} noderef Appends the control represented by a reference, the DOM node, or the id to the left column
                      */
                     add: lang.partial(add, scene, 'colLeft')
                  },
                  right: {
                     /**
                      * @function scene.page.columns.right.add
                      * @param {Control|Node|String} noderef Appends the control represented by a reference, the DOM node, or the id to the right column
                      */
                     add: lang.partial(add, scene, 'colRight')
                  }
               },
               content: {
                  /**
                   * @function scene.page.content.add
                   * @param {Control|Node|String} noderef Appends the control represented by a reference, the DOM node, or the id to the page content
                   */
                  add: lang.partial(add, scene, 'content')
               }
            }
         });
      }
   });

   return _DeclarativeLayoutMixin;
});
