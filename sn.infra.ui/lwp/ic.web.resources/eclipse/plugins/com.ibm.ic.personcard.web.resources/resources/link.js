/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/lang",
      "dojo/has",
      "dojo/query",
      "ic-core/config/services",
      "ic-ui/ResourceLink",
      "ic-ui/util/Url",
      "ic-ui/util/proxy"
], function(lang, has, queryModule, services, ResourceLink, Url, proxy) {

   var linkModule = lang.getObject("com.ibm.lconn.personcard.link", true);

   var PERSONCARD_PATH = "/app/person/";
   var PERSONCARD_SUBPATH = "/forms/card";
   var PROFILE_PATH = "/html/profileView.do";
   // var microformatToParameter = {'x-lconn-userid':'uid', dn:
   // 'distinguishedName', email: 'email'};
   var urlParameters = {
      userid : 1,
      uid : 1,
      key : 1,
      dn : 1,
      email : 1
   };

   /**
    * If Profiles is installed, register a simple provider that looks for
    * Profile-like URLs
    */
   var profiles = lang.getObject("lconn.core.config.services.profiles");

   var profilesUrl, profilesSecureUrl, path;

   function updateProfilesUrl(profiles) {
      profilesUrl = new Url(profiles.url);
      profilesSecureUrl = new Url(profiles.secureUrl);
      path = profilesUrl.path + PROFILE_PATH;
   }

   function _addPathId(query) {
      var key;
      for (key in urlParameters) {
         if (urlParameters.hasOwnProperty(key)) {
            if (query[key]) {
               return key + "_" + encodeURIComponent(query[key]);
            }
         }
      }
   }

   function textContents(el) {
      return el ? (el.textContent || el.innerText) : null;
   }

   function oslcDocument(el, uri) {
      var queryParams;
      if (uri) {
         queryParams = uri.getQuery();
         delete queryParams.lang;
      }
      /*
       * else { for (var key in microformatToParameter) { var value =
       * textContents(dojo.query("."+key, el)[0]); if (value) { queryParams =
       * {}; queryParams[microformatToParameter[key]] = value; break; } } if
       * (!queryParams) { if(dojo.config.isDebug) { console.debug("No
       * microformat identifier found for node", el) } return; } }
       */

      var fullName = textContents(queryModule(".fn", el)[0]) || el.title || textContents(el);
      el.title = "";

      var isSecure = window.location.protocol.replace(':', '') == "https";
      var url = new Url(isSecure ? profiles.secureUrl : profiles.url);
      url.path += PERSONCARD_PATH + _addPathId(queryParams) + PERSONCARD_SUBPATH;

      var contentsUrl = url.toString();
      var obj = {
         smallPreview : {
            document : contentsUrl,
            hintWidth : "500px",
            initialHeight : "145px"
         },
         title : fullName
      };

      /**
       * When the profile server is located on a different domain and we are
       * using a browser that does not support window.postMessage, enable the
       * large preview mode. This will allow users to toggle between a full size
       * business card and a compact one. TODO: replace with safer test for
       * whether the profile service is on a different domain
       */
      if (has("ie") < 8 && contentsUrl != proxy(contentsUrl)) {
         obj.largePreview = {
            document : contentsUrl + "&large=true",
            hintWidth : "500px",
            hintHeight : "600px"
         };
      }
      return obj;
   }

   function detectPersonLink(uri, link) {
      if (uri.indexOf(path + "?") != -1) {
         var url = new Url(uri);
         var authority = url.authority;
         if (url.path.indexOf(profilesUrl.path) == 0 && (!authority || authority == profilesUrl.authority || authority == profilesSecureUrl.authority)) {
            return oslcDocument(link, url);
         }
      }
      /*
       * TODO: Determine whether microformat scanning should run a different
       * path else { var node = link; var i = 0; while (!dojo.hasClass(node,
       * "vcard")) { node = node.parentNode; if (!node || i++ > 5) return; }
       * return oslcDocument(node); }
       */
   }

   if (profiles) {
      updateProfilesUrl(profiles);

      ResourceLink.register(detectPersonLink);
   }

   /**
    * Expose a semi-internal API for changing the current Profiles for testing
    */
   linkModule._setUrls = updateProfilesUrl;

   return linkModule;
});
