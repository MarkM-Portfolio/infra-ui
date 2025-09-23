/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

/**
 * A provider to give the mentions capability to a text area.
 *
 * When the mentionsProvider is required the mixin is run to add "static"
 * functions that are then called to support the mentions feature. No instance
 * of the class is required.
 *
 * @namespace lconn.core.lcTextArea.providers.MentionsProvider
 * @author Jim Antill <antillj@ie.ibm.com>
 */
dojo.provide("lconn.core.lcTextArea.providers.MentionsProvider");
dojo.require("lconn.core.widget.mentions.MentionsHelper");
dojo.require("lconn.core.auth");

// Types of mentions we want to register with the mentions helper
dojo.require("lconn.core.widget.mentions.PersonMentionsType");
//dojo.require("lconn.core.widget.mentions.TagMentionsType");

// Mixin the functions to provide the mentions support.
dojo.mixin(lconn.core.lcTextArea.providers, /** @lends lconn.core.lcTextArea.providers */ {
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
    * @returns {Object} The helper instance to support the mentions feature or
    *          null if helper isn't created.
    */
   addMentionsFeature: function(textArea, eventCallbacks, memberStore, argsForHelper) {
      var argsForHelper = argsForHelper || {};

      argsForHelper.inputField = textArea;
      argsForHelper.eventHandles = eventCallbacks;
      argsForHelper.multiline = true;

      if(argsForHelper.context && argsForHelper.network) {
         argsForHelper.context.network = argsForHelper.network;
      }

      if (memberStore)
         argsForHelper.memberStore = memberStore;

      var helper = null;

      /* Create the helper, use try/catch to trap any problems. If something bad does happen
         then return null. */
      try {
         helper = new lconn.core.widget.mentions.MentionsHelper(argsForHelper);

         /*
          * Mentions are currently enabled for internal users only
          */
         var user = lconn.core.auth.getUser();
         if (!(user && user.isExternal)) {
            // register @ for people typeahead
            var personType = new lconn.core.widget.mentions.PersonMentionsType({
               parentNode : helper.domNode,
               context: argsForHelper.context,
               network: argsForHelper.network
            });
            helper.registerActivatorType(personType);
         }

         // register # for tags typeahead
         //var tagsType = new lconn.core.widget.mentions.TagMentionsType({
         //   parentNode : helper.domNode
         //});
         //helper.registerActivatorType(tagsType);

      } catch(e) {
         if(dojo.config.isDebug) {
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
dojo.declare("lconn.core.lcTextArea.providers.MentionsProvider", null, {

});
