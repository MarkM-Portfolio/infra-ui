/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.StreamPermissions");

dojo.declare("lconn.share.bean.StreamPermissions", null, {
   constructor: function(opts) {
      if (opts)
         dojo.mixin(this,opts);
   },
   canFollow: function(item){
      return this._policyAllow(item, "contentFollowing");
   },
   canSync: function(item){
      return this._policyAllow(item, "contentSync");
   },
   canShareWithPublic: function(item) {
      return this._policyAllow(item, "organizationPublic");
   },
   _policyAllow: function(item, policyName){
      if(dojo.isArray(item)){
         for(var i=0; i<item.length; i++){
            if(!this._policyAllow(item[i], policyName))
               return false;
         }
         return true;
      }
      var policy;
      if(item){
         policy = item.getPolicy && item.getPolicy() || (this.policy? item.getOrgId && this.policy[item.getOrgId()] || this.policy: null);
      }else
         policy = this.policy;
      return (!this.guest) && (policy ? policy[policyName] != false : true) && (!item || item.getOrgId() == this.orgId || !item.getOrgId());
   },
   canShareInternal: function() {
   	return !this.guest && dojo.getObject("lconn.share.config.features.sharingIntent") == true;
   },
   canMakeInternal: function(sharingIntentEnabled) {
      return !this.guest && sharingIntentEnabled;
   },
   canTag: function(file) {
      return this.canEdit(file);
   },
   canRate: function(file) {
      return this.isAuthenticated();
   },
   canEdit: function(file) {
      if (!file.hasFullPermissions())
         throw "Caller did not load permissions with this object, cannot check edit permissions";
      return file.getPermissions().Edit;
   },
   canShare: function(file) {
      if (!file.hasFullPermissions())
         throw "Caller did not load permissions with this object, cannot check share permissions";
      return this.isAuthenticated() && file.getPermissions().GrantAccessView;
   },
   canDelete: function(file) {
      if (!file.hasFullPermissions())
         throw "Caller did not load permissions with this object, cannot check delete permissions";
      return file.getPermissions().Delete;
   },
   canChangeVisibility: function(file) {
      return this.canDemote(file);
   },
   canDemote: function(file) {
      if (!file.hasFullPermissions())
         throw "Caller did not load permissions with this object, cannot check grant permissions";
      return file.getPermissions().GrantAccess;
   },
   canPromote: function(file) {
      return this.canShareWithEdit(file);
   },
   canShareWithEdit: function(file) {
      return this.canShare(file)  && file.getPermissions().GrantAccessEdit;
   },
   canDeleteShare: function(file) {
      return this.canDemote(file);
   },
   isAuthenticated: function(s) {
      return (s !== undefined ? (s == this.authenticatedId) : (typeof this.authenticatedId == "string"));
   }
});
lconn.share.bean.StreamPermissions.ANONYMOUS = new lconn.share.bean.StreamPermissions();
