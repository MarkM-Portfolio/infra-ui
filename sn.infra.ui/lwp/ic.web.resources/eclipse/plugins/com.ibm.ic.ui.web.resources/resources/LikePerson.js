/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/*global SemTagSvc: true*/

define([
   "dojo/_base/declare",
   "dojo/dom-attr", // domAttr.set
   "dojo/dom-construct", // domConstruct.create, domConstruct.place
   "dojo/text!./templates/LikePerson.html",
   "dijit/_Templated",
   "dijit/_Widget",
   "./layout/people" // peopleLayout.createLink
], function (declare, domAttr, domConstruct, template, _Templated, _Widget, peopleLayout) {
   
   /**
    * @class ic-ui.LikePerson
    * @author Bernadette Carter <bacarter@us.ibm.com>
    */
   return declare("com.ibm.oneui.LikePerson", [_Widget, _Templated], /** @lends ic-ui.LikePerson.prototype */ {
      displayName : null,
      photoURL : null,
      profileURL : null,
      templateString : template,
      constructor : function(person) {
         this.profileURL = person.profileURL;
         this.photoURL = person.photoURL;
         this.displayName = person.name;
         this.inherited(arguments, [ null ]);
      },

      postscript : function(params, node) {
         this.inherited(arguments, [ null, node ]);

         var pObj = {
            name : params.name,
            userid : params.id,
            email : params.email,
            state : params.userState
         };

         var personLink = peopleLayout.createLink(pObj);
         if (!personLink) {
            personLink = domConstruct.create("span", {
               "aria-describedby" : "semtagmenu",
               className : "fn lotusBold",
               href : params.profileURL,
               innerHTML : params.name
                     + "<span style='display: none;' class='x-lconn-userid'>"
                     + params.id + "</span>"
            });
         }

         personLink.target = "_blank";
         this.personLinkAP.appendChild(personLink);

         // FIXME: common bizcard utility
         if (window.SemTagSvc && SemTagSvc.parseDom) {
            SemTagSvc.parseDom(0, this.personLinkAP);
         }

         if (!params.profileURL) {
            var photo = peopleLayout.createImage(pObj, 32, false);
            domConstruct.place(photo, this.personPhotoAP, "replace");
            this.personPhotoAP = photo;
         }
      }
   });

});
