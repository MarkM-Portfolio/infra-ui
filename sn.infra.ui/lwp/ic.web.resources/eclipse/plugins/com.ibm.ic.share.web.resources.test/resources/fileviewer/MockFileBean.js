/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/Stateful",
  "dojo/Deferred",
  "dojo/_base/declare",
  "ic-share/fileviewer/util/FilePermissions"
], function (Stateful, Deferred, declare, FilePermissions) {

  var createdTimestamp = 1427288400000;
  var updatedTimestamp = createdTimestamp + (60 * 60 * 1000); // 1 hour
   
  return new Stateful({
    id: "f2bfae48-1271-4d24-a552-102bef1dd57f",
    visibility: "public",
    libraryType: "personalFiles",
    permissions: new FilePermissions({file: this}),
    isExternal: false,
    author: {
      id: "d8a42d71-bdb9-46bd-a71c-1fe1226897b4"
    },
    _fullEntryGetter: function () {
      var def = new Deferred();
      def.resolve(true);
      return def.promise;
    },
    _commentFeedGetter: function () {
      return {
        refresh: function () { return {}; },
        getTotal: function () { return 0; },
        hasNext: function () { return false; }
      };
    },
    _versionFeedGetter: function () {
      return {
        refresh: function () { return {}; },
        getTotal: function () { return 0; },
        hasNext: function () { return false; }
      };
    },
    update: function () {
      return {
        then: function () { return; } // Play nice with JSLint
      };
    },
    size: 184459,
    totalSize: 184459,
    created: new Date(createdTimestamp),
    updated: new Date(updatedTimestamp),
    modifier: {
      id: "d8a42d71-bdb9-46bd-a71c-1fe1226897b4"
    },
    recommendations: 4,
    downloads: 4,
    downloadsAnonymous: 1,
    summary: "Not a very long test summary"
  });
});