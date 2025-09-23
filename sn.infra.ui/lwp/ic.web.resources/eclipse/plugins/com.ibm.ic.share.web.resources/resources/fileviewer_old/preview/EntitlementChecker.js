/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/Deferred",
   "dojo/_base/lang",
   "dojo/request/xhr",
   "dojo/cookie",
   "dojo/_base/array",
   "dojox/encoding/base64"
], function (declare, Deferred, lang, xhr, cookie, array, base64) {
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
         lang.mixin(this, args);
      },

      getViewerDfd: function () {
         if (entitlementDfds.viewer) {
            return entitlementDfds.viewer;
         }

         var dfd = new Deferred();

         if (!this.isAuthenticated()) {
            dfd.resolve(false);
         } else if (cookie("entitlements")) {
            dfd.resolve(true);
         } else {
            xhr.get("/viewer/api/entitlement", {
               handleAs: "json",
               timeout: 30000,
               preventCache: true
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
         } else if (!this.isAuthenticated()) {
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
      }
   });
});
