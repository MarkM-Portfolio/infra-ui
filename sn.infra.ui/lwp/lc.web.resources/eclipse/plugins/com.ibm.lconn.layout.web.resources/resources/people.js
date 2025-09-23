/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
   /**
    * This module provides the standard Connections Person image and link API.
    */
   var com_ibm_lconn_layout_people = dojo.provide("com.ibm.lconn.layout.people");

   dojo.require("com.ibm.social.layout.people");
   dojo.require("lconn.core.config.services");
   dojo.require("lconn.core.url");
   dojo.require("com.ibm.oneui.util.Url");
   dojo.require("dojo.i18n");
   dojo.require("dojo.string");

   dojo.requireLocalization('lconn.core', 'strings');

   var com_ibm_social_layout_people = com.ibm.social.layout.people;

   var CLASSNAME = "fn vcard";
   var CLASSNAMENOVCARD = "fn";

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
   var PROFILE_PATH = "/html/profileView.do";
   var PROFILE_PHOTO_PATH = "/photo.do";
   var strings = dojo.i18n.getLocalization('lconn.core', 'strings');

   // Only newer browsers cache redirects, which allows us to be more efficient when someone has no profile image.
   var browserCacheRedirectParam = (dojo.isChrome > 11 || dojo.isIE > 8 || dojo.isFF > 4) ? true : null;

   var profilesService = lconn.core.config.services.profiles;
   var blankGif = (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")).toString();

   function _imageLoad(src) {
      this.src = src;
   }

   var keyMap = {
      id: 'userid',
      userid: 'userid',
      uid: 'uid',
      email: 'email',
      dn: 'distinguishedName',
      profileId: 'key'
   };

   function _addQueryKey(person, query) {
      var key;
      for (key in keyMap) {
         if (keyMap.hasOwnProperty(key)) {
            if (person[key]) {
               query[keyMap[key]] = person[key];
               break;
            }
         }
      }
      return query;
   }

   /**
    * Provide the people implementation for Connections when Profiles is enabled.
    */
   if (profilesService) {

      var issecure = com.ibm.oneui.util.Url.secure;
      var url;

      if (issecure) {
         url = profilesService.secureUrl;
      } else {
         url = profilesService.url;
      }

      dojo.mixin(com_ibm_lconn_layout_people, {
         getProfileUrl: function(person) {
            var href = url + PROFILE_PATH + lconn.core.url.writeParameters(_addQueryKey(person, {}));
            return href;
         },
         createLink: function(person, child, parent) {
            var href = this.getProfileUrl(person);
            var a;
            var peopleName = person.name;
            if (person.state == "inactive") {
               peopleName = dojo.string.substitute(strings.rs_inactivePerson, [peopleName]);
            }

            if (parent) {
               dojo.addClass(parent, CLASSNAME);
               if (person.state == "inactive") {
                  dojo.addClass(parent, "lotusPersonInactive");
               } else {
                  dojo.addClass(parent, "lotusPerson");
               }

               // Play nice with IE8 which resets the innerHTML when the href contains a '@'
               var html;
               if (dojo.isIE === 8) {
                  html = parent.innerHTML;
               }
               dojo.attr(parent, "href", href);
               if (dojo.isIE === 8) {
                  parent.innerHTML = html;
               }
               a = parent;
               a.appendChild(child || dojo.doc.createTextNode(peopleName));
            } else {
               a = dojo.create("a", {
                  href: href
               });
               dojo.addClass(a, CLASSNAMENOVCARD);
               if (person.state == "inactive") {
                  dojo.addClass(a, "lotusPersonInactive");
               } else {
                  dojo.addClass(a, "lotusPerson");
               }
               a.appendChild(child || dojo.doc.createTextNode(peopleName));
            }

            if ((person.uid != null) && (person.uid != "")) {
               dojo.create("span", ARGS_USER_ID, a).appendChild(dojo.doc.createTextNode(person.uid));
            } else if ((person.userid != null) && (person.userid != "")) {
               dojo.create("span", ARGS_USER_ID, a).appendChild(dojo.doc.createTextNode(person.userid));
            } else if ((person.email != null) && (person.email != "")) {
               dojo.create("span", ARGS_EMAIL_ID, a).appendChild(dojo.doc.createTextNode(person.email));
            }

            dojo.addClass(a, "bidiAware");

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
               alt: alttxt,
               style: (size >= 0) ? {
                  width: size + "px",
                  height: size + "px"
               } : null
            });
            // RTC 82674 Add a opacity to inactive users.
            if (person.state == "inactive") {
               dojo.addClass(img, "lotusDim");
            }
            dojo.addClass(img, "usersRadius");
            if (defer) {
               dojo.addOnLoad(dojo.hitch(img, _imageLoad, src));
            }
            var out = link ? com_ibm_lconn_layout_people.createLink(person, img) : img;
            out.title = alttxt;
            return out;
         },
         getImageUrl: function(person, size) {
            var query = {
               r: browserCacheRedirectParam,
               small: (size <= 64) ? true : null
            };
            _addQueryKey(person, query);
            return url + PROFILE_PHOTO_PATH + lconn.core.url.writeParameters(query);
         },
         isImageEnabled: function() {
            return true;
         }
      });

      /**
       * Expose the Connections implementation into the generic social module.
       */
      dojo.mixin(com_ibm_social_layout_people, com_ibm_lconn_layout_people);
   } else {
      com.ibm.lconn.layout.people = com_ibm_social_layout_people;
      return null;
   }
}());
