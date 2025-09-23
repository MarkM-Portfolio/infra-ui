/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/lang"
], function (lang) {
  "use strict";

  return function (fileBean) {
    var fileAdapter = {
        getVisibility: lang.hitch(fileBean, function () { return fileBean.get("visibility"); }),
        getLibraryType: lang.hitch(fileBean, function () { return fileBean.get("libraryType"); }),
        isPublic: lang.hitch(fileBean, function () { return fileBean.get("visibility") === "public"; }),
        getPermissions: lang.hitch(fileBean, function () { return fileBean.get("permissions")._permissions; }),
        isExternal: lang.hitch(fileBean, function () { return fileBean.get("isExternal"); }),
        isPrivate: lang.hitch(fileBean, function () { return fileBean.get("visibility") === "private"; }),
        getAuthor: lang.hitch(fileBean, function () { return fileBean.get("author"); }),
        getLibraryAuthor: lang.hitch(fileBean, function () { return fileBean.get("libraryAuthor"); }),
        getId: lang.hitch(fileBean, function () { return fileBean.get("id"); }),
        getName: lang.hitch(fileBean, function () { return fileBean.get("name"); }),
        getTags: lang.hitch(fileBean, function () { return fileBean.get("tags"); }),
        getConfiguration: lang.hitch(fileBean, function () { return; }),
        isPersonalFilesInCommunity: lang.hitch(fileBean, function (environmentType) { return (environmentType === "communityFiles") && (fileBean.libraryType === "personalFiles"); }),
        isSyncable: lang.hitch(fileBean, function () { return fileBean.get("isSyncable"); }),
        isIndirectSyncable: lang.hitch(fileBean, function () { return fileBean.get("isIndirectSyncable"); })
    };

    return fileAdapter;
  };
});