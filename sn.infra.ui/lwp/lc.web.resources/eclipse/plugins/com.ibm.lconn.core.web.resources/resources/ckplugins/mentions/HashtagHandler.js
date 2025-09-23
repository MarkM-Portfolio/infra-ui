/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Handler for hashtags
 * 
 * @namespace lconn.core.ckplugins.mentions.HashtagHandler
 * @extends lconn.core.ckplugins.mentions._Handler
 */
dojo.provide("lconn.core.ckplugins.mentions.HashtagHandler");
dojo.require("lconn.core.ckplugins.mentions._Handler");
dojo.require("lconn.core.TypeAheadDataStore");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");

lconn.core.ckplugins.mentions.HashtagHandler = /** @lends lconn.core.ckplugins.mentions.HashtagHandler */
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
    * TODO: nls
    * 
    * @type Object
    */
   ariaLabels : {
      compose : 'Created hashtag. Continue typing for type ahead',
      completed : 'Completed hashtag',
      cancelled : 'Cancelled hashtag',
      removed : 'Deleted hashtag'
   },

   /**
    * Returns the data store for people lookup
    */
   getStore : function() {
      return new lconn.core.TypeAheadDataStore({
         queryParam : 'name',
         url : 'tags.json' // lconn.core.url.getServiceUrl(lconn.core.config.services.activities) + "/service/json/tags"
      })
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

      return dojo.toJson(data);
   },

   /**
    * Adds the microformat to the node. Note: this implementation is a no-op
    * 
    * @param {Object}
    *           item The item
    */
   addMicroFormat : function(item) {},

   /**
    * Removes the mention from the node. Note: this implementation is a no-op
    * 
    * @param {DOMNode}
    *           node The node
    * @param {Object}
    *           item The item
    */
   remove : function(node, item) {},

   /**
    * Returns true if the selection contains a mention of this type
    * 
    * @param {CKEDITOR.dom.range}
    *           range The current selection range
    * @returns true if the range contains a mention of this type
    */
   isMention: function(range) {
      // TODO: implement
      return false;
   }
};
// Mixin base handler logic
dojo.safeMixin(lconn.core.ckplugins.mentions.HashtagHandler,
      lconn.core.ckplugins.mentions._Handler);
