/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.controls.Like");

(function() {

   var preloadTemplates = {
      inline : {
         templatePath : dojo.moduleUrl("com.ibm.oneui", "recommend/templates/Inline.html")
      },
      popup : {
         templatePath : dojo.moduleUrl("com.ibm.oneui", "recommend/templates/PopupContents.html")
      }
   };

   dojo.require("com.ibm.oneui.recommend.Popup");
   dojo.require("com.ibm.oneui.recommend.Inline");

   /**
    * @class com.ibm.oneui.controls.Like
    * @extends com.ibm.oneui.recommend.Inline
    * @author Bernadette Carter <bacarter@us.ibm.com>
    */
   dojo.declare("com.ibm.oneui.controls.Like", [ com.ibm.oneui.recommend.Inline
   ], /** @lends com.ibm.oneui.controls.Like.prototype */
   {
      getPopup : function(popupArgs) {
         if (!this._popup) {
            popupArgs.dataStore = this.popupDataStore || this.dataStore;
            popupArgs.getUserProfileUrl = this.getUserProfileUrl;
            popupArgs.getUserPhotoUrl = this.getUserPhotoUrl;
            this._popup = new com.ibm.oneui.controls.LikePopup(popupArgs);
         }
         return this._popup;
      },
      getUserProfileUrl : function(id) {
         return "";
      },
      getUserPhotoUrl : function(id) {
         return "";
      }
   });

   /**
    * @class com.ibm.oneui.controls.LikePopup
    * @extends com.ibm.oneui.recommend.Popup
    * @author Bernadette Carter <bacarter@us.ibm.com>
    */
   dojo.declare("com.ibm.oneui.controls.LikePopup", [ com.ibm.oneui.recommend.Popup
   ], /** @lends com.ibm.oneui.controls.LikePopup */
   {
      popupWidth : 300,
      fixedMaxHeight : true,
      createPersonNode : function(pObj) {
         pObj.profileURL = this.getUserProfileUrl(pObj.id);
         if (!pObj.photoURL || pObj.photoURL == "") {
            pObj.photoURL = this.getUserPhotoUrl(pObj.id);
         }
         var pWid = new com.ibm.oneui.controls.LikePerson(pObj);
         this._getStateObject().widgets.push(pWid);
         dojo.publish("com/ibm/oneui/likePopup/personAdded", [ pWid
         ]);
         return pWid.domNode;
      }
   });

   /**
    * @class com.ibm.oneui.controls.LikePerson
    * @author Bernadette Carter <bacarter@us.ibm.com>
    */
   dojo.declare("com.ibm.oneui.controls.LikePerson", [
         dijit._Widget,
         dijit._Templated
   ], /** @lends com.ibm.oneui.controls.LikePerson.prototype */
   {
      displayName : null,
      photoURL : null,
      profileURL : null,
      templatePath : dojo.moduleUrl("com.ibm.oneui", "controls/templates/LikePerson.html"),
      constructor : function(person) {
         this.profileURL = person.profileURL;
         this.photoURL = person.photoURL;
         this.displayName = person.name;
         this.inherited(arguments, [ null
         ]);
      },

      postscript : function(params, node) {
         this.inherited(arguments, [
               null,
               node
         ]);

         var personLink = com.ibm.lconn.layout.people.createLink({
            name : params.name,
            userid : params.id,
            email : params.email,
            state : params.userState
         });
         if (!personLink) {
            personLink = dojo.create("span", {
               "aria-describedby" : "semtagmenu",
               className : "fn lotusBold",
               href : params.profileURL,
               innerHTML : params.name + "<span style='display: none;' class='x-lconn-userid'>" + params.id + "</span>"
            });
         }

         personLink.target = "_blank";
         this.personLinkAP.appendChild(personLink);

         if (window.SemTagSvc && SemTagSvc.parseDom) {
            SemTagSvc.parseDom(0, this.personLinkAP);
         }
      }
   });

})();
