/* Copyright IBM Corp. 2007, 2017  All Rights Reserved.              */
define([
   "dojo",
   "dojo/_base/lang",
   "ic-core/config/features"
], function (dojo, lang, features) {
   var configUtil = {};
   function _getWithFallback(user, userKey, fallbackKey) {
      var val = null;
      if (user) {
         val = dojo.getObject(userKey, false, user);
      }
      
      if (val == null) {
         val = dojo.getObject(fallbackKey);
      }
      
      return val;
   }
   function _getWithFallbackValue(user, userKey, fallbackValue) {
      var val = dojo.getObject(userKey, false, user);
      if (typeof val == "undefined") 
         return fallbackValue;
      else
         return val;
   }
   lang.mixin(configUtil, {
      isExternalDefault: function(user) {
         return !!_getWithFallback(user, "policy.isExternalDefault", "lconn.share.config.features.isExternalDefault");
      },

      isSharingIntentEnabled: function(user) {
         return !!_getWithFallback(user, "policy.isExternalEnabled", "lconn.share.config.features.sharingIntent");
      },
      
      isFollowingEnabled: function(user) {
         return !!_getWithFallback(user, "policy.following", "lconn.share.config.features.following");
      },
      
      isReshareEnabled: function(user) {
         return !!_getWithFallback(user, "policy.resharing.enabled", "lconn.share.config.features.resharing.enabled");
      },
      
      getResharingDefault: function(user) {
         return !!_getWithFallback(user, "policy.resharing.defaultValue", "lconn.share.config.features.resharing.default");
      },
      
      isFileSyncEnabled: function(user) {
         var value = null;
         if (user) {
            value = dojo.getObject("policy.capabilities.canSync.files.personal", false, user);
         }
         
         if (value == null) {
            value = dojo.getObject("policy.fileSyncEnabled", false, user);
         }
         
         if (value == null) {
            value = dojo.getObject("lconn.share.config.features.fileSync.enabled");
         }
         
         return value;
      },
      
      canSyncPersonalFile: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canSync.files.personal", false);
      },
      
      canSyncCommunityFile: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canSync.files.community", false);
      },
      
      canSyncPersonalFolder: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canSync.folders.personal", false);
      },
      
      canSyncCommunityFolder: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canSync.folders.community", false);
      },
      
      isPreviewEnabled: function(user) {
         return !!_getWithFallback(user, "policy.previewEnabled", "lconn.share.config.features.preview");
      },
      
      canCreatePublicFiles: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canCreate.files.public", true);
      },
      
      canCreatePublicFolders: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canCreate.folders.public", true);
      },
      
      canCreateExternalFiles: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canCreate.files.external", true);
      },
      
      canCreateExternalFolders: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canCreate.folders.external", true);
         
      },
      
      canCreateInternalFiles: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canCreate.files.internal", true);
      },
      
      canCreateInternalFolders: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canCreate.folders.internal", true);
      },
      
      canViewPublicFiles: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canView.files.public", true);
      },
      
      canViewPublicFolders: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canView.folders.public", true);
      },
      
      canViewEveryPeople: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canView.person.everyone", true);
      },
      
      canViewGroups: function(user){
         return _getWithFallbackValue(user, "policy.capabilities.canView.groups", true);
      },
      
      canViewcommunities: function(user){
         if(!user)
            return true;
         return _getWithFallbackValue(user, "policy.capabilities.canView.communities", false);
      },
      
      getMaxFileSize: function(user){
         return _getWithFallback(user, "policy.maxFileSize", "lconn.share.config.services.maxFileSize");
      },
      
      getSimpleUploadMaxFileSize: function(user){ 
         return _getWithFallbackValue(user, "policy.simpleUploadMaxFileSize", 500 * 1024 * 1024);
      },
      
      isRoundTripEditingEnabled: function(user){
         return _getWithFallbackValue(user, "policy.roundTripEditingEnabled", false);
      },
      
      getHomeUrl: function(user){ 
         return _getWithFallbackValue(user, "homeURL", null);
      },
      
      getSecuredHomeUrl: function(user){ 
         return _getWithFallbackValue(user, "securedHomeURL", null);
      },
      
      isNestedFolderEnabled: function(user){
         return features("files-nested-folder");
      },
      
      isIndependentScrollbarsEnabled: function(user){
         return true;
      },
       
      isHikariThemeEnabled: function(user){
         return lconn.core.theme.isHikariTheme();
      },

      isFilePickerDnDEnabled: function(user){
         return true;
      },
      
      isSharedByMeViewEnabled: function(user){
         if (!features("files-nested-folder"))
            return true;
         else 
            return features("files-enable-shared-by-me-view-for-nested-folder");
      },

      isPublicFoldersViewEnabled: function(user){
         if (!features("files-nested-folder"))
            return true;
         else 
            return features("files-enable-public-folders-view-for-nested-folder");
      },

      isFolderZipDownloadEnabled: function(user){
         if (!features("files-nested-folder"))
            return true;
         else 
            return features("files-enable-folder-zip-download-for-nested-folder");
      },

      isFileZipDownloadEnabled: function(user){
         return features("files-enable-file-zip-download");
      },
       
      isFileLeftNavigationPinnedExpandableEnabled: function(user){
     	 if (!features("files-nested-folder"))
             return true;
         else
         	 return features("files-left-navigation-pinned-expandable");
      },
      
      isFileLeftNavigationShareFolderExpandableEnabled: function(user){
    	 if (!features("files-nested-folder"))
              return true;
         else
    	      return features("files-left-navigation-sharefolder-expandable");
      },

      isCustomViewEnabled: function(user){
         return features("files-enable-custom-view");
      },
      
      isRecentPeopleLauncherEnabled: function(user){
         return false;
      },

      isReplaceFolderContributorToEditorEnabled: function(user) {
         return true;
      },
      
      isGrantFileEditPermissionToFolderEditorOnlyEnabled: function(user) {
         return features("files-grant-file-edit-permission-to-folder-editor-only");
      },
      
      isFileTreeDndEnabled: function(user) {
         return true;
      },
      
      isSingleFileDndRightToRightEnabled: function(user) {
		   return true;
      },
      
      isSingleFolderDndRightToRightEnabled: function(user) {
  		   return true;
      },
      
      isMultipleFileAndFolderDndEnabled: function(user) {
         return true;		 
      },
      
      isTitlebarEnabledForNestedFolder: function(user) {
         return features("files-nested-folder");       
      },
      
      isSearchPanelEnabled: function(user) {
         return features("search-history-view-ui");       
      },

      isFilesViewDescriptionHidden: function(user) {
  		   return features("files-view-hide-description");	 
      },
      
      isFilesRemoved: function(user) {
         return features("files-remove-files");
      },
      
      isFolderSyncable: function(user) {
         return features("files-folder-syncable");
      },
      
      isFilesAsyncVirusScan: function(user) {
         return features("files-async-virus-scan");
      },
      
      isFilesShowAddMyDriveButton: function(user) {
         if(features("files-folder-syncable")) {
            return features("files-show-add-to-mydrive-button");
         }
         else
            return true;
      },
      
      isFilesShowMultiSelectMoveButtonInMyDrive: function(user) {
         if(features("files-folder-syncable")) {
            return features("files-show-multi-select-button-in-mydrive");
         }
         else
            return false;
      },
      
      isFilesStoreLastView: function(user) {
         return features("files-enable-store-last-visit-view");
      },
      
      isOrganizationFileViewHided: function(user) {
         if(features("files-hide-organization-files-view")) {
            return features("files-hide-organization-files-view");
         }
         else
            return false;
      },
      
      isCommunityFileViewHided: function(user) {
         if(features("files-hide-communityfiles-view")) {
            return features("files-hide-communityfiles-view");
         }
         else
            return false;
      },
      
      isFilesRefinePanelEnabled: function(user) {
         return features("files-enable-refine-panel");
      },
      
      isSimplifyLeftNavEnabled: function(user) {
         return features("files-enable-simplify-left-nav");
      },
      
      isFilesRecentViewEnabled: function(user) {
         return features("files-enable-recent-view");
      },
      
      isRecentViewAsDefaultInPicker: function(user) {
         return features("files-picker-enable-recent-as-default-view");
      },
      
      isFilesEnableRemovingQuestionmarkInFilterPanel: function(user) {
         return features("files-enable-removing-questionmark-in-filter-panel");
      },
     
      isCommunityFilesNavigationTrashEnabled: function(user) {
         return features("files-enable-trash-in-community-files-navigation");
      },
      
      isFilesFilterAnimationEnabled: function(user) {
         return features("files-enable-filter-section-animation");
      },
     
      isFilesEnableNewPinIcon: function(user) {
          return lconn.core.config.features("files-enable-new-pin-icon");
       },
       
      isFilesEnableNewFolderIcon: function(user) {
         return features("files-enable-new-folder-icon");
      },
      
      isFilesEnableContinuousScrolling: function(user) {
         return features("files-enable-continuous-scrolling");
      },
      
      isFilesEnableShareLink: function(user) {
         return features("files-enable-file-share-with-link");
      },
      
      isFilesShowMoreInfoInRecentlyVisit: function(user) {
         return features("files-show-more-in-recently-visit");
      },
      
      isSoftDeleteResource: function(user) {
         return features("files-enable-soft-delete-resource-for-revoked-user");
      },

      isFilesEnableShowInActiveUserInTypeahead: function(user) {
         return features("files-enable-showing-inactive-users-in-typeahead");
      }
   })
   return configUtil;
})
