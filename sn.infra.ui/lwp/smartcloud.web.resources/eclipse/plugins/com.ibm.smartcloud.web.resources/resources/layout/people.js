/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * Provides an implementation of the People Layout API for SmartCloud
 */
(function() {

   dojo.provide('com.ibm.smartcloud.layout.people');

   dojo.require('com.ibm.social.layout.people');
   dojo.requireLocalization('lconn.core', 'strings');

   var CLASSNAME = "fn vcard";
   var CLASSNAMENOVCARD = "fn";
   var ARGS_TOP = {
      className: CLASSNAME
   };
   var ARGS_USER_ID = {
      className: "x-lconn-userid",
      style: {
         display: "none"
      }
   };
   var ARGS_EMAIL_ID = {
      className: "email",
      style: {
         display: "none"
      }
   };
   var url = dojo.getObject("gllConnectionsData.srvUrls.profiles");
   var PROFILE_PATH = "/profiles/view/";
   var PROFILE_PHOTO_PATH = "/profiles/photo/";
   var strings = dojo.i18n.getLocalization('lconn.core', 'strings');

   var blankGif = (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")).toString();

   var keyMap = {id: 'userid', userid: 'userid', uid: 'uid', email: 'email', dn: 'distinguishedName', profileId: 'key'};
   function _getQueryKey(person) {
      for (var key in keyMap)
         if (keyMap[key] == 'userid')
            return encodeURIComponent(person[key]);
      return null;
   }  
   function _imageLoad(src) {
      this.src = src;
   }

   dojo.mixin(com.ibm.social.layout.people, {
      /**
       * Return a link to a person.
       *
       * @param person
       *       An object with the following required properties
       *          name: The display name of the person
       *
       *       and the following optional properties
       *          userid: The IBM Connections snx:userid attribute
       *          uid: The directory unique identifier of the person
       *          dn: The distinguished name of the person
       *          email: The e-mail address of the person
       *          key: A value representing the unique identifier of the person, system-specific.
       *             For IBM Connections this value represents the Profiles UUID for the person.
       * @param child
       *       (Optional) a DOM element to append to the link.
       *       If not provided, a text node with the person's name will be appended.
       * @param parent
       *       (Optional) a DOM element to use as link.
       *       If provided, it will be used as the link element and its href replaced.
       */
      createLink: function(person, child, parent) {

         var href = url + PROFILE_PATH + _getQueryKey(person);
         var a;
         var peopleName = person.name;
         if (person.state == "inactive") peopleName = dojo.string.substitute(strings.rs_inactivePerson, [peopleName]);

         if (parent) {
            dojo.addClass(parent, CLASSNAME);
            if (person.state == "inactive") {
               dojo.addClass(parent, "lotusPersonInactive");
            } else dojo.addClass(parent, "lotusPerson");
            dojo.attr(parent, "href", href);
            a = parent;
            a.setAttribute('aria-describedby', 'semtagmenu');
            a.appendChild(child ? child : dojo.doc.createTextNode(peopleName));
         } else {
            a = dojo.create("a", {
               href: href
            });
            dojo.addClass(a, CLASSNAMENOVCARD);
            if (person.state == "inactive") {
               dojo.addClass(a, "lotusPersonInactive");
            } else dojo.addClass(a, "lotusPerson");
            a.setAttribute('aria-describedby', 'semtagmenu');
            a.appendChild(child ? child : dojo.doc.createTextNode(peopleName));
         }

         if ((person.uid != null) && (person.uid != "")) {
            var uidspan = dojo.create("span", ARGS_USER_ID, a);
            uidspan.appendChild(dojo.doc.createTextNode(person.uid));
         } else if ((person.userid != null) && (person.userid != "")) {
            var uidspan = dojo.create("span", ARGS_USER_ID, a);
            uidspan.appendChild(dojo.doc.createTextNode(person.userid));
         } else if ((person.email != null) && (person.email != "")) {
            var emailspan = dojo.create("span", ARGS_EMAIL_ID, a);
            emailspan.appendChild(dojo.doc.createTextNode(person.email));
         }

         return a;
      },
      createImage: function(person, size, link) {
         if (!person) {
            console.log("Person parameter is null.");
            return;
         }
         var defer = (!dojo._postLoad && size >= 0);
         var src = this.getImageUrl(person, size);
         var alttxt = dojo.string.substitute(strings.rs_PersonPicture, [person.name]);
         var img = dojo.create("img", {
            src: defer ? blankGif : src,
            alt: link ? alttxt : "",
            style: (size >= 0) ? {
               width: size + "px",
               height: size + "px"
            } : null
         });
         // RTC 82674 Add a opacity to inactive users.
         if (person.state == "inactive") {
            dojo.addClass(img, "lotusDim");
         }

         if (defer) dojo.addOnLoad(dojo.hitch(img, _imageLoad, src));
         var out = link ? com_ibm_lconn_layout_people.createLink(person, img) : img;
         out.title = person.name;
         return out;
      },
      getImageUrl: function(person, size) {
         var imgUrl = url + PROFILE_PHOTO_PATH + _getQueryKey(person);
         if (size > 32)
            imgUrl += "/1";
         return imgUrl;
      },
      isImageEnabled: function() {
         return true;
      }
   });

})();
