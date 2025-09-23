/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/array",
   "dojo/Stateful",
   "dojo/date/stamp"
], function (declare, array, Stateful, stamp) {

   return declare([Stateful], {
      _docsResponseSetter: function (docsResponse) {
         this.set({
            editors: this._getUsers(docsResponse.editors),
            lastEditor: this._getUser(docsResponse.lasteditor),
            hasChanges: docsResponse.dirty,
            dateCreated: this._getDate(docsResponse.created),
            dateModified: this._getDate(docsResponse.modified),
            baseVersion: docsResponse.base_version,
            latestVersion: docsResponse.latest_version,
            latestVersionModifed: new Date(docsResponse.latest_version_modified) 
         });
      },

      _getUsers: function (docsUsers) {
         return array.map(docsUsers, function (user) {
            return this._getUser(user);
         }, this);
      },

      _getUser: function (docsUser) {
         return {
            name: docsUser.displayName,
            email: docsUser.email,
            id: docsUser.id
         };
      },

      _getDate: function(dateString) {
         return stamp.fromISOString(dateString);
      }
   });
});
