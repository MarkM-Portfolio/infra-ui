/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * This module provides the standard Connections Person image and link API.
 * 
 * @namespace ic-ui.layout.people
 * @author Cameron Bosnic <cjbosnic@us.ibm.com>
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

define([
   "dojo",
   "dojo/_base/lang",
   "dojo/_base/config",
   "dojo/_base/window",
   "dojo/ready",
   "dojo/has",
   "dojo/string",
   "dojo/dom-attr",
   "dojo/dom-class",
   "dojo/dom-construct",
   "dojo/i18n",
   "dojo/i18n!ic-core/nls/strings",
   "ic-core/config/services",
   "ic-core/url",
   "../util/Url"
   //XXX to fix once module is AMD converted
   //"com.ibm.social.layout.people"
], function(dojo, lang, config, win, ready, has, string, domAttr, domClass, domConstruct, i18n, i18nStrings, services, coreUrl, Url/*, socialPeopleModule*/) {

   /**
    * This module provides the standard Connections Person image and link API.
    */
   var com_ibm_lconn_layout_people = lang.getObject("com.ibm.lconn.layout.people", true);

   var com_ibm_social_layout_people = lang.getObject("com.ibm.social.layout.people");
   if(!com_ibm_social_layout_people) {
      com_ibm_social_layout_people = lang.mixin(lang.getObject("com.ibm.social.layout.people", true), {
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
          */
         createLink: function(person) {
            return null;
         },
         createImage: function(person, size, link) {
            return null;
         },
         getImageUrl: function(person, size) {
            return null;
         },
         isImageEnabled: function() {
            return false;
         }
      });
   }

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
   var strings = i18nStrings;

   // Only newer browsers cache redirects, which allows us to be more efficient when someone has no profile image.
   var browserCacheRedirectParam = (has("chrome") > 11 || has("ie") > 8 || has("ff") > 4) ? true : null;

   var profilesService = services.profiles;
   var blankGif = (config.blankGif || require.toUrl("dojo/resources/blank.gif")).toString();

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

      var issecure = Url.secure;
      var url;

      if (issecure) {
         url = profilesService.secureUrl;
      } else {
         url = profilesService.url;
      }

      lang.mixin(com_ibm_lconn_layout_people, /** @lends ic-ui.layout.people */ {

          /**
           * Returns the URL to a person's profile
           * 
           * @param {Object}
           *           person A person
           * @returns {String} the URL to a person's profile
           */
         getProfileUrl: function(person) {
            var href = url + PROFILE_PATH + coreUrl.writeParameters(_addQueryKey(person, {}));
            return href;
         },

         /**
          * Creates a link to a person's profile. Callers can optionally pass
          * the child node for the anchor node, and / or the anchor node itself.
          * 
          * @param {Object}
          *           person A person
          * @param {DOMNode}
          *           [child] The child node of the link
          * @param {DOMNode}
          *           [parent] The anchor node
          * @returns {DOMNode} The anchor node
          */
         createLink: function(person, child, parent) {
            var href = this.getProfileUrl(person);
            var a;
            var peopleName = person.name;
            if (person.state == "inactive") {
               peopleName = string.substitute(strings.rs_inactivePerson, [peopleName]);
            }

            if (parent) {
               domClass.add(parent, CLASSNAME);
               if (person.state == "inactive") {
                  domClass.add(parent, "lotusPersonInactive");
               } else {
                  domClass.add(parent, "lotusPerson");
               }

               // Play nice with IE8 which resets the innerHTML when the href contains a '@'
               var html;
               if (has("ie") === 8) {
                  html = parent.innerHTML;
               }
               domAttr.set(parent, "href", href);
               if (has("ie") === 8) {
                  parent.innerHTML = html;
               }
               a = parent;
               a.appendChild(child || win.doc.createTextNode(peopleName));
            } else {
               a = domConstruct.create("a", {
                  href: href
               });
               domClass.add(a, CLASSNAMENOVCARD);
               if (person.state == "inactive") {
                  domClass.add(a, "lotusPersonInactive");
               } else {
                  domClass.add(a, "lotusPerson");
               }
               a.appendChild(child || win.doc.createTextNode(peopleName));
            }

            if ((person.uid != null) && (person.uid != "")) {
               domConstruct.create("span", ARGS_USER_ID, a).appendChild(win.doc.createTextNode(person.uid));
            } else if ((person.userid != null) && (person.userid != "")) {
               domConstruct.create("span", ARGS_USER_ID, a).appendChild(win.doc.createTextNode(person.userid));
            } else if ((person.email != null) && (person.email != "")) {
               domConstruct.create("span", ARGS_EMAIL_ID, a).appendChild(win.doc.createTextNode(person.email));
            }

            domClass.add(a, "bidiAware");

            return a;
         },

         /**
          * Creates an image showing a person's profile picture. Callers must
          * pass a size and an optional flag to wrap the image in an anchor
          * linking to the person's profile, using {@link #createLink}.
          * 
          * @param {Object}
          *           person A person
          * @param {Number}
          *           size The size of the image (the side of a square)
          * @param {Boolean}
          *           [link] Pass true to wrap the image in a link
          * @returns {DOMNode} The image node, or the anchor if link is true
          */
         createImage: function(person, size, link) {
            if (!person && console) {
               console.log("Person parameter is null.");
               return;
            }
            //XXX can't find how to convert dojo._postLoad. Requesting for dojo module to have it available
            var defer = (!dojo._postLoad && size >= 0);
            var src = this.getImageUrl(person, size);
            var alttxt = string.substitute(strings.rs_PersonPicture, [person.name]);
            var img = domConstruct.create("img", {
               src: defer ? blankGif : src,
               alt: alttxt,
               style: (size >= 0) ? {
                  width: size + "px",
                  height: size + "px"
               } : null
            });
            // RTC 82674 Add a opacity to inactive users.
            if (person.state == "inactive") {
               domClass.add(img, "lotusDim");
            }
            domClass.add(img, "usersRadius");
            if (defer) {
               ready(lang.hitch(img, _imageLoad, src));
            }
            var out = link ? com_ibm_lconn_layout_people.createLink(person, img) : img;
            out.title = alttxt;
            return out;
         },

         /**
          * Returns the URL of a person's profile picture. Callers must pass a
          * size.
          * 
          * @param {Object}
          *           person A person
          * @param {Number}
          *           size The size of the image (the side of a square)
          * @returns {String} The URL of the profile picture
          */
         getImageUrl: function(person, size) {
            var query = {
               r: browserCacheRedirectParam,
               small: (size <= 64) ? true : null
            };
            _addQueryKey(person, query);
            return url + PROFILE_PHOTO_PATH + coreUrl.writeParameters(query);
         },

         /**
          * Returns true if profile pictures are enabled.
          * 
          * @returns {Boolean} true if profile pictures are enabled.
          */
         isImageEnabled: function() {
            return true;
         }
      });

      /**
       * Expose the Connections implementation into the generic social module.
       */
      lang.mixin(com_ibm_social_layout_people, com_ibm_lconn_layout_people);
   } else {
      com.ibm.lconn.layout.people = com_ibm_social_layout_people;
      com_ibm_lconn_layout_people = com_ibm_social_layout_people;
   }

   return com_ibm_lconn_layout_people;
});