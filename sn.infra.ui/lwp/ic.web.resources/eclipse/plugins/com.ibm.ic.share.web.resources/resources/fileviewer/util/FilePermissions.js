/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/when"
], function (declare, lang, when) {
  return declare([], {
    constructor: function (args) {
      lang.mixin(this, args);
      this._permissions = {};
    },
    
    setPermissionsObject: function (permissions) {
      this._permissions = permissions;
    },
    
    canTag: function () {
      return this.canEdit();
    },
    
    canEdit: function () {
      return this._permissions.Edit;
    },
    
    canAddToFolder: function () {
      var hasPermission;
      if (this.file.get("libraryType") === "communityFiles") {
        hasPermission = this.file.get("repository").then(lang.hitch(this, function (repository) {
          return !!repository.get("permissions").AddChild;
        }));
      } else {
        hasPermission = !!this._permissions.GrantAccessView;
      }
      
      return when(hasPermission);
    },
    
    canGrantAccess: function () {
      return this._permissions.GrantAccess;
    },
    
    canGrantAccessEdit: function () {
      return this._permissions.GrantAccessEdit;
    },
    
    canGrantAccessView: function () {
      return this._permissions.GrantAccessView;
    },
    
    canDelete: function () {
      return this._permissions.Delete;
    },
    
    canChangeSharingIntent: function () {
      return this._permissions.ChangeSharingIntent;
    },
    
    canLock: function () {
      return this._permissions.Lock;
    },
    
    canUnlock: function () {
      return this._permissions.Unlock;
    },
    
    canGrantShareLink: function () {
      return this._permissions.GrantShareLink;
    }
  });
});
