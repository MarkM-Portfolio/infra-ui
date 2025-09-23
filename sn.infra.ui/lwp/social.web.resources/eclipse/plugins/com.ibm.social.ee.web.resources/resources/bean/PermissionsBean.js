/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.bean.PermissionsBean");

dojo.declare("com.ibm.social.ee.bean.PermissionsBean", null, {
   constructor: function(opts) {
      dojo.mixin(this,opts);
   },
   override: function() {
      return false;
   },
   canTag: function(ds, file) {
      return this.canEdit(ds, file);
   },
   canRate: function(ds, file) {
      return this.isAuthenticated();
   },
   canEdit: function(ds, file) {
      return this.override() || (ds && file && this.isAuthenticated() && (this.isOwner(ds, file) || ds.getValue(file, "permissions").Edit));
   },
   canShare: function(ds, file) {
      return ds && file && this.isAuthenticated() && (this.isOwner(ds, file) || ds.getValue(file, "permissions").GrantAccess);
   },
   canDelete: function(ds, file) {
      return this.override() || (this.isAuthenticated() && (this.isOwner(ds, file)));
   },
   canLock: function(ds, file) {
      return false; // No lock/unlock support for now
   },
   canUnlock: function(ds, file) {
      return false; // No lock/unlock support for now
   },
   canOverrideLock: function(ds, file) {
      return this.override() || ds.getValue(file,"permissions").LockOverride;
   },
   canChangeVisibility: function(ds, file) {
      return this.isAuthenticated() && (this.isOwner(ds, file) || this.isAdministrator());
   },
   canDemote: function(ds, file) {
      return this.isAuthenticated() && (ds.getValue(file,"permissions").GrantAccess || this.isOwner(ds, file) || this.isAdministrator());
   },
   canShareWithEdit: function(ds, file) {
      return this.isAuthenticated() && (this.isOwner(ds, file) || this.isAdministrator());
   },
   canSetHomepage: function(ds, file) {
      return this.isAuthenticated() && (this.isOwner(ds, file) || this.isAdministrator());
   },
   canDeleteShare: function(ds, file) {
      return this.isAuthenticated() && (ds.getValue(file,"permissions").GrantAccess || this.isOwner(ds, file) || this.isAdministrator());
   },
   canUpload: function(ds, folder) {
      return this.override() || (folder && this.isAuthenticated() && (ds.getValue(folder,"permissions").AddChild || this.isAdministrator()));
   },
   canAddFolder: function(ds, folder) {
      return false; // No folder support for now
   },
   isOwner: function(ds, file) {
      return this.owner || (file && this.authenticatedId && this.authenticatedId == ds.getValue(file, "author").id);
   },
   isShareOwner: function(ds, share, file) {
      return this.owner || (file && this.authenticatedId && this.authenticatedId == ds.getValue(file, "author").id) || (share && this.authenticatedId && this.authenticatedId == ds.getValue(share,"owner").id);
   },
   isAuthenticated: function() {
      return this.override() || (typeof this.authenticatedId == "string");
   },
   isAdministrator: function() {
      return this.admin ? this.admin : false;
   }
});