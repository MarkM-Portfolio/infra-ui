/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/lang",
      "dojo/dom-class",
      "dojo/dom-construct",
      "dojo/query",
      "dojo/topic",
      "com/ibm/lconn/layout/people"
], function(dojo, lang, domClass, domConstruct, query, topic, people) {

   /**
    * Use the common people api's to generate the User link Will check within
    * span.vcard for span.x-lconn-username and span.x-lconn-userid elements and
    * insert the link where necessary. Any vcard with a link already will be
    * skipped, assuming already rendered
    */
   lang.setObject("lconn.highway.util", "userLinkGenerator", {

      // event fired by SemTagSvc.parseDom
      tagChanged : "/com/ibm/mashups/livetext/livetextchanged",

      linkifyUser : function() {
         try {
            require([ "dojo/domReady!"
            ], lang.hitch(this, "updateProfileLinks"));
         }
         catch (err) {
         }
      },

      /**
       * Override the SemTagSvc.parseDom function and provide our own function
       * which will linkify profiles correctly before firing the event to
       * continue business card processing.
       */
      updateProfileLinks : function() {
         SemTagSvc.parseDom = lang.hitch(this, function(some, containerNode) {
            query("span.vcard", containerNode).forEach(lang.hitch(this, function(personCardLink) {
               this.linkifyProfilesInFragment(personCardLink);
            }));
            // now call publish the event to kick start business card processing
            topic.publish(this.tagChanged, containerNode);
         });

      },

      /**
       * Take a person card link fragment span.vcard check that no anchor tags
       * already exist, we only process empty ones where span.x-lconn-username
       * and span.x-lconn-userid are present and call the people api to render.
       */
      linkifyProfilesInFragment : function(personCardLink) {
         var linknode = query("a", personCardLink)[0];
         // if an anchor exists then dont process.
         if (!linknode) {
            userIdNode = query(".x-lconn-userid", personCardLink)[0];
            userNameNode = query(".x-lconn-username", personCardLink)[0];
            var person = {
               userid : userIdNode.innerHTML,
               name : userNameNode.innerHTML
            };
            var renderedProfileLink = people.createLink(person);
            if (renderedProfileLink) {
               // if a link has been returned add, otherwise style plain text
               // bold
               var profileLink = query("a", renderedProfileLink)[0];
               domConstruct.place(renderedProfileLink, personCardLink, "first");
            }
            else {
               domClass.remove(userNameNode, "lotusHidden");
               domClass.add(userNameNode, "lotusPerson lotusBold");
            }

         }
      }
   });
   return lconn.highway.util.userLinkGenerator;
});
