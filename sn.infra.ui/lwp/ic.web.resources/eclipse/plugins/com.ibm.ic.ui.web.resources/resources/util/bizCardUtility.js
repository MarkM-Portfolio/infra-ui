/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
        "dojo/_base/array",
        "dojo/_base/lang",
        "dojo/dom",
        "dojo/query",
        "dojo/on",
        "dijit/focus",
        "dijit/popup",
        "ic-ui/BizCard",
        "dojo/NodeList-traverse"
], function(array, lang, ddom, query, on, focusUtil, popup, BizCard) {

   var businessCard, targetSaved;

   /**
    * Return the business card, in case it doesn't exists, create a new instance
    */
   function updateBusinessCard(key) {
      if (!businessCard) {
         businessCard = new BizCard({
            key : key,
            onShow : function() {
               // Focus the first element in the BusinessCard
               setTimeout(lang.hitch(this, function() {
                  this.focus();
               }), 200);
            },
            _onBlur : function() {
               // User must have clicked a blank area of the screen, so close
               // the dialog
               popup.close(businessCard);
               // Restore of the focus
               setTimeout(lang.hitch(this, function() {
                  focusUtil.focus(targetSaved);
               }), 200);
            }
         });
      }
      else {
         // populate
         businessCard.update(key);
      }
   }

   /**
    * Show business card based on the id of the DOM element, the DOM element or
    * the event
    */
   function showBusinessCard(o) {
      if (typeof o === 'string') { // id of the DOM element
         targetSaved = ddom.byId(o);
      }
      else if (o.nodeType === 1) { // DOM element
         targetSaved = o;
      }
      else { // event
         targetSaved = o.target;
      }
      var spanInfo = dojo.query(targetSaved).next()[0]; // class property would
                                                         // be "x-lconn-userid"
                                                         // "email", "DN",
                                                         // "mailNextId" (???)
      // generate business card key
      var key = {}; // create an empty object
      key[spanInfo.className] = spanInfo.innerHTML;
      // update the business card
      updateBusinessCard(key);
      // display the business card
      popup.open({
         popup : businessCard,
         around : targetSaved,
         onCancel : function() {
            // User pressed escape, so close myself
            businessCard._onBlur();
         }
      });
   }

   /**
    * Utility to apply the onclick handlers to display the business card
    * 
    * @namespace ic-ui.util.bizCardUtility
    */
   var bizCardUtility = {
      /**
       * Checks the elements with class "vcard" on the page and apply the
       * onclick handler.
       */
      checkAll : function() {
         query(".vcard").on("click", showBusinessCard);
      },
      /**
       * Checks the existence of the node passed and apply the onclick handler.
       * 
       * @param {Object}
       *           node The node to update
       */
      checkNode : function(node) {
         if (node !== undefined) {
            on(node, "click", showBusinessCard);
         }
         else {
            console.warn('Node not found. Unable to apply handler to display the Business Card.');
         }
      },
      /**
       * Open the Business Card (create a new instance if not available). "ESC
       * key" or "click-outside" will close it
       * 
       * @param {Object}
       *           it could be the event (returned by the handler), the node, or
       *           the node id
       */
      open : function(o) {
         if (o !== undefined) {
            showBusinessCard(o);
            console.log(o);
         }
         else {
            console.warn('Object not found. Unable to open the Business Card.');
         }
      },
      /**
       * Force the closing of the Business Card currently open for example in a
       * setTimeout: setTimeout(function(){bizCardUtility.close();}, 5000);
       */
      close : function() {
         if (businessCard !== undefined && businessCard.isFocusable()) {
            businessCard._onBlur();
         }
         else {
            console.warn('An open Business Card is not available. Unable to close it.');
         }
      }
   };

   return bizCardUtility;
});
