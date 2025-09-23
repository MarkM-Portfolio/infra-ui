/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
        "dojo",
        "dojo/_base/lang",
        "dojo/json",
        "ic-core/TypeAheadDataStore",
        "./_Handler",
        "dojo/i18n!../../../nls/mentions"
], function(dojo, lang, JSON, TypeAheadDataStore, _Handler, strings) {

   /**
    * Handler for hashtags
    * 
    * @namespace ic-ui.ckeditor.plugins.mentions.HashtagHandler
    * @extends ic-ui.ckeditor.plugins.mentions._Handler
    */
   var HashtagHandler = /** @lends ic-ui.ckeditor.plugins.mentions.HashtagHandler */
   {
      /**
       * Activator character
       * 
       * @type char
       */
      activatorChar : '#',

      /**
       * ARIA labels for various states of composition
       * 
       * @type Object
       */
      ariaLabels : {
         compose : strings.hashtag.compose_aria,
         completed : strings.hashtag.completed_aria,
         cancelled : strings.hashtag.cancelled_aria,
         removed : strings.hashtag.removed_aria
      },

      /**
       * Returns the data store for people lookup
       */
      getStore : function() {
         return new TypeAheadDataStore({
            queryParam : 'name',
            url : 'tags.json'
         });
      },

      /**
       * Returns text from the item
       * 
       * @param {Object}
       *           item The selected item
       */
      getTextFromItem : function(item) {
         return item ? item.displayName : null;
      },

      /**
       * Returns a string representation of the mentioned item
       * 
       * @param {Object}
       *           item The item
       */
      formatData : function(item) {
         // FIXME: some attributes are required by
         // lconn.news.microblogging.sharebox.data.MentionsDataFormatter
         var data = {
            value : item.displayName,
            // Legacy attribute
            type : 'TagMentions',
            // Must be set
            hasSymbol : true
         };

         return JSON.stringify(data);
      },

      /**
       * Adds the microformat to the node. Note: this implementation is a no-op
       * 
       * @param {Object}
       *           item The item
       */
      addMicroFormat : function(item) {
         return;
      },

      /**
       * Removes the mention from the node. Note: this implementation is a no-op
       * 
       * @param {DOMNode}
       *           node The node
       * @param {Object}
       *           item The item
       */
      remove : function(node, item) {
         return;
      },

      /**
       * Returns true if the selection contains a mention of this type
       * 
       * @param {CKEDITOR.dom.range}
       *           range The current selection range
       * @returns true if the range contains a mention of this type
       */
      isMention : function(range) {
         // TODO: implement
         return false;
      }
   };
   // Mixin base handler logic
   lang.mixin(HashtagHandler, _Handler);

   return HashtagHandler;
});
