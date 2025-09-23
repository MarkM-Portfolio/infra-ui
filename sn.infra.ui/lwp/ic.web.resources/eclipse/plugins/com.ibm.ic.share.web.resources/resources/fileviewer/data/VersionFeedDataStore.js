/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/string",
  "../bean/Version",
  "../util/url",
  "./FeedDataStore",
  "dojo/i18n!../nls/FileViewerStrings",
  "../util/ModerationUtil"
], function (declare, lang, string, Version, url, FeedDataStore, i18n, moderationUtil) {

  return declare([FeedDataStore], {
    EntryClass: Version,

    _getFeedQuery: function () {
      return {
        category: "version",
        acls: true,
        page: this._page,
        pageSize: this._pageSize
      };
    },
    
    _getDeleteUrl: function(item, args) {
      if (args.deleteFrom) {
        return url.rewrite(this.url, {
          category: "version",
          deleteFrom: item.get("version")
        });
      } else {
        return item.get("entryUrl");
      }
    },
    
    _getUpdateUrl: function () {
      return this.file.get("entryUrl");
    },
    
    _newItem: function () {
      var item = this.inherited(arguments);
      item.restore = lang.hitch(this, this.restoreVersion, item);
      return item;
    },
    
    restoreVersion: function (item, args) {
      this.file.set({
        changeSummary: string.substitute(i18n.ACTION.RESTORE_VERSION.CHANGE_SUMMARY, {version: item.get("version")}),
        versionUuid: item.get("id")
      });
       sessionStorage.setItem('/versionChanged/'+ this.file.id, true);
       var promise = this.file.update();
       
       // Delete properties after update completes so that they are not available
       // properties on the file
       promise.then(lang.hitch(this, function () {
         this._checkModerationStatus(this.file);
         this.file.deleteProperty("changeSummary");
         this.file.deleteProperty("versionUuid");
       }));
       
       return promise;
    },
    
    _checkModerationStatus: function(file) {
       if (moderationUtil.isFileModerated(file)) {
          moderationUtil.launchModerationDialog();
       }
    }
  });
});
