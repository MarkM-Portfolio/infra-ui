/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/Deferred",
   "dojo/_base/lang",
   "dojo/request/xhr",
   "dojo/cookie",
   "dojo/_base/array",
   "dojox/encoding/base64",
   "../util/SAMLFrameLogin",
   "../config/globals",
   "ic-core/config/properties"
], function (declare, Deferred, lang, xhr, cookie, array, base64, SAMLFrameLogin, globals, properties) {
   "use strict";

   var entitlementDfds = {};

   function getEntitlementStrings(entitlementInfo) {
      var encodedStrings, byteArray;

      encodedStrings = entitlementInfo.split("-")[1];
      if (encodedStrings) {
         byteArray = base64.decode(encodedStrings);

         return array.map(byteArray, function (b) {
            return String.fromCharCode(b);
         }).join("");
      }

      return "";
   }

   return declare([], {
      constructor: function (args) {
         this.cookie = cookie;
         lang.mixin(this, args);
      },

      getViewerDfd: function () {
         if (entitlementDfds.viewer) {
            return entitlementDfds.viewer;
         }

         this.configureDocsCloudSSO();

         var dfd = new Deferred();

         if (!lang.isFunction(this.isAuthenticated)) {
            dfd.resolve(true);
         } else if (!this.isAuthenticated()) {
            dfd.resolve(false);
         } else if (this.cookie("entitlements")) {
            dfd.resolve(true);
         } else if (!globals.coreServices.viewer && properties["com.ibm.docs.types.files.view"] !== "true" && !window.viewer) {
            dfd.resolve(false);
         } else {
            var headers = {};
            if (this.isCCM) {
              headers["X-VIEWER-REPOID"] = "ecm";
            }
            xhr.get("/viewer/api/entitlement", {
               handleAs: "json",
               timeout: 30000,
               preventCache: true,
               headers: headers
            }).then(function (data) {
               dfd.resolve(data.entitled === "true");
            }, function () {
               dfd.resolve(false);
            });
         }

         entitlementDfds.viewer = dfd;
         return dfd;
      },

      getDocsDfd: function (args) {
         if (entitlementDfds.docs) {
            return entitlementDfds.docs;
         }

         this.configureDocsCloudSSO();

         var dfd = new Deferred(),
            entitlementInfo = (args && args.cookie) || cookie("entitlements"),
            entitlementStrings;

         if (entitlementInfo) {
            entitlementStrings = getEntitlementStrings(entitlementInfo);

            if (entitlementStrings.indexOf("bh_docs") !== -1) {
               dfd.resolve(true);
            } else {
               dfd.resolve(false);
            }
         } else if (!lang.isFunction(this.isAuthenticated)) {
            dfd.resolve(false);
         } else if (!this.isAuthenticated()) {
            dfd.resolve(false);
         } else if (!globals.coreServices.docs && properties["com.ibm.docs.types.files.edit"] !== "true" && !window.concord) {
            dfd.resolve(false);
         } else {
            xhr.get("/docs/api/entitlement", {
               handleAs: "json",
               timeout: 30000,
               preventCache: true
            }).then(function (data) {
               dfd.resolve(data.entitlement_allowed);
            }, function () {
               dfd.resolve(false);
            });
         }

         entitlementDfds.docs = dfd;
         return dfd;
      },

      resetDfds: function () {
         entitlementDfds = {};
      },
      
      configureDocsCloudSSO: function () {
        if (this.cookie("entitlements") && !entitlementDfds.SAMLFrameLoginCreated ) {
          var glb_docsLoginFrm = new SAMLFrameLogin();
          glb_docsLoginFrm.login(0);

          entitlementDfds.SAMLFrameLoginCreated = true;
        }
      }
   });
});
