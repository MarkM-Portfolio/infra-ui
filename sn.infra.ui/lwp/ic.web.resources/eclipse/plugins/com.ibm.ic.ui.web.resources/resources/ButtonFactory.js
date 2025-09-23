/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo/dom-construct", // domConstruct.create
      "dojo/_base/config",
      "dojo/_base/declare"
], function(domConstruct, config, declare) {

   /**
    * A factory for OneUI buttons
    * 
    * @class ic-ui.ButtonFactory
    * @author Claudio Procida <procidac@ie.ibm.com>
    */

   function getButtonClass(opts, type) {
      var c = [];
      switch (type) {
         case "image":
            c.push("lotusBtnImg");
            break;
         // case "form":
         // TODO:
         default:
            c.push("lotusBtn");
      }
      if (opts.special) {
         c.push("lotusBtnSpecial");
      }
      if (opts.disabled) {
         c.push("lotusBtnDisabled");
      }
      return c.join(' ');
   }

   /**
    * Creates a plain &lt;button&gt; button
    * 
    * @memberof ic-ui.ButtonFactory
    * @func createButton
    * @param {Object}
    *           opts Options
    * @param {Node}
    *           [refNode] DOM node used as a reference for
    *           <code>dojo.place()</code>
    * @param {String}
    *           [pos] Position string accepted by <code>dojo.place()</code>
    * @returns the button's node
    */
   function createButton(opts, refNode, pos) {
      opts = opts || {};
      var btn = domConstruct.create("button", {
         className : getButtonClass(opts),
         innerHTML : opts.label
      }, refNode, pos);
      return btn;
   }

   /**
    * Creates a menu button
    * 
    * @memberof ic-ui.ButtonFactory
    * @func createMenuButton
    * @param {Object}
    *           opts Options
    * @param {Node}
    *           [refNode] DOM node used as a reference for
    *           <code>dojo.place()</code>
    * @param {String}
    *           [pos] Position string accepted by <code>dojo.place()</code>
    * @returns the button's node
    */
   function createMenuButton(opts, refNode, pos) {
      opts = opts || {};
      opts.hasMenu = true;
      var btn = createButton(opts, refNode, pos);
      // Yes there's a space between text and arrow
      domConstruct.place(document.createTextNode('\u00a0'), btn);
      // Add arrow sprited image
      domConstruct.create('img', {
         'class' : 'lotusArrow lotusDropDownSprite',
         src : config.blankGif
      }, btn);
      // Add label for accessibility
      domConstruct.create('span', {
         'class' : 'lotusAltText',
         innerHTML : '&#x25bc;'
      }, btn);
      return btn;
   }

   /**
    * Creates a form button. Form buttons have subtle spacing differences.
    * 
    * @memberof ic-ui.ButtonFactory
    * @func createFormButton
    * @param {Object}
    *           opts Options
    * @returns the button's node
    */
   function createFormButton(opts) {
      // TODO:
      return;
   }

   var factory = {
      createButton : createButton,
      createMenuButton : createMenuButton,
      createFormButton : createFormButton
   };

   /* Hack to ensure com.ibm.oneui.controls.ButtonFactory exists */
   declare("com.ibm.oneui.controls.ButtonFactory", null, {});
   com.ibm.oneui.controls.ButtonFactory = factory;

   return factory;
});
