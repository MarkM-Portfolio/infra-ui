/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
define([
   "dojo/_base/declare",
   "dojo/dom-attr",
   "dojo/dom-class",
   "./AbstractList"
], function(declare, domAttr, domClass, abstractList) {

   /**
    * ul CSS class
    * 
    * @private
    */
   var ulClass = "ic-textList-widget";

   /**
    * textList widget to create a list of links extending the AbstractList
    * widget.
    * 
    * @author Orlando De Mauro <orlando.demauro@ie.ibm.com>
    * @class ic-ui.bizCard.TextList
    */
   return declare(abstractList, /** @lends ic-ui.bizCard.TextList.prototype */
   {
      /** Update the List with new data */
      update : function(data) {
         this.inherited(arguments);
         domClass.add(this.ul, ulClass);
      },

      /** extend the createList method in abstractListSet to set a11y */
      createList : function(item, i, domNode) {
         this.inherited(arguments);
         if (item.ariaText) {
            domAttr.set(this.anchor, "aria-label", item.ariaText);
         }
      },

      /** extend the createToggle method in abstractListSet to set a11y */
      createToggle : function(item, i, domNode) {
         this.inherited(arguments);
         domAttr.set(this.anchor, "role", "button");
         this.setStatusToggle(item, this.anchor);
      },

      /** extend the createToggle method in abstractListSet to set a11y */
      switchToggle : function(item, i, target, res) {
         this.inherited(arguments);
         if (res.response) {
            this.setStatusToggle(item, target);
         }
      },

      /** set a11y for toggle buttons */
      setStatusToggle : function(item, target) {
         if (item.ariaTextStatusTrue && item.ariaTextStatusFalse) {
            if (item.status) {
               domAttr.set(target, "aria-label", item.ariaTextStatusTrue);
            }
            else {
               domAttr.set(target, "aria-label", item.ariaTextStatusFalse);
            }
         }
         domAttr.set(target, "aria-pressed", String(item.status));
      }
   });
});
