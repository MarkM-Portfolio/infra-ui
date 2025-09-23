/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo/_base/config",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "ic-core/auth",
      "ic-core/widget/mentions/MentionsHelper",
      "ic-core/widget/mentions/PersonMentionsType"
], function(dojoConfig, declare, lang, auth, MentionsHelper, PersonMentionsType) {

   /**
    * A provider to give the mentions capability to a text area. When the
    * mentionsProvider is required the mixin is run to add "static" functions
    * that are then called to support the mentions feature. No instance of the
    * class is required.
    * 
    * @namespace ic-core.lcTextArea.providers.MentionsProvider
    * @author Jim Antill <antillj@ie.ibm.com>
    */
   // Types of mentions we want to register with the mentions helper
   // dojo.require("lconn.core.widget.mentions.TagMentionsType");
   // Mixin the functions to provide the mentions support.
   var providers = lang.mixin(lang.getObject("lconn.core.lcTextArea.providers", true), /** @lends ic-core.lcTextArea.providers */
   {
      /**
       * Adds the mentions feature to the textcontrol passed in.
       * 
       * @param {DOMNode}
       *           textArea The textarea to add the mentions feature to.
       * @param {Array}
       *           eventCallbacks Associative array holding eventnames against a
       *           function
       * @param {Object}
       *           memberStore
       * @param {Object}
       *           argsForHelper Object containing arguments for the mentions
       *           helper
       * @returns {Object} The helper instance to support the mentions feature
       *          or null if helper isn't created.
       */
      addMentionsFeature : function(textArea, eventCallbacks, memberStore, argsForHelper) {
         var argsForHelper = argsForHelper || {};

         argsForHelper.inputField = textArea;
         argsForHelper.eventHandles = eventCallbacks;
         argsForHelper.multiline = true;

         // FIXME: normalization?
         if (argsForHelper.context && argsForHelper.network) {
            argsForHelper.context.network = argsForHelper.network;
         }

         if (memberStore)
            argsForHelper.memberStore = memberStore;

         var helper = null;

         /*
          * Create the helper, use try/catch to trap any problems. If something
          * bad does happen then return null.
          */
         try {
            helper = new MentionsHelper(argsForHelper);

            /*
             * Mentions are currently enabled for internal users only
             */
            var user = auth.getUser();
            if (user && !user.isExternal) {
               // register @ for people typeahead
               var personType = new PersonMentionsType({
                  parentNode : helper.domNode,
                  context : argsForHelper.context,
                  network : argsForHelper.network
               });
               helper.registerActivatorType(personType);
            }

            // register # for tags typeahead
            // var tagsType = new lconn.core.widget.mentions.TagMentionsType({
            // parentNode : helper.domNode
            // });
            // helper.registerActivatorType(tagsType);

         }
         catch (e) {
            if (dojoConfig.isDebug) {
               console.debug("Error creating @mentions helper");
               console.debug(e);
            }
            helper = null;
         }

         return helper;
      }
   });

   /*
    * FIXME: unused, remove
    */
   var MentionsProvider = declare("lconn.core.lcTextArea.providers.MentionsProvider", null, {

   });

   return providers;
});
