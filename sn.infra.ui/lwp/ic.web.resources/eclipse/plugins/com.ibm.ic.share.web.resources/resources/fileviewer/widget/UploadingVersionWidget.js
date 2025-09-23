/* Copyright IBM Corp. 2016  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "../panels/EntryWidget",
  "../preview/util",
  "../dialog/VersionDialog",
  "../config/globals",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/_base/lang"
], function (declare, EntryWidget, util, VersionDialog, globals, i18n, lang) { //get rid of unnecessary things
  return declare([ EntryWidget ], {
    postMixInProperties: function () {
      this.baseClasses = "version";
      this.reloadItem = true; //??
      this.DialogFactory = VersionDialog;
      this.dialogArgs = { version: this._getVersionNumber(this.currentFile), isLast: false };  //last true?

      this.h1 = "<span class='versionNumber'>" + this._getVersionNumber(this.currentFile) + "</span>" + " ";
      this.h2 = this.formatDate(new Date());
      this.h3 = globals.formatFileSize(parseInt(this.uploadFile.size));
      this.content = "";
      this.footer = "";
      this.usernameMaxWidth = 225;
    },

    postCreate: function () {
      this.inherited(arguments);
      var currentUser = this._getCurrentUser(globals.currentUser);
      this.setUserName(currentUser, this.h1Node);
    },
    
    _getVersionNumber: function(currentFile) {
       return parseInt(currentFile.get("version")) + 1;
    },
    
    _getCurrentUser: function(globalCurrentUser) {
       var currentUser = lang.clone(globalCurrentUser);
       currentUser.name = globalCurrentUser.displayName;
       return currentUser;
    }
    
  });
});
