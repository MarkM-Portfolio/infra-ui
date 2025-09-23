/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([ "ic-share/util/configUtil"
], function(configUtil) {
   var _user = {
      "policy" : {
         "capabilities" : {
            "canCreate" : {
               "files" : {
                  "external" : false,
                  "internal" : false,
                  "public" : false
               },
               "folders" : {
                  "external" : false,
                  "internal" : false,
                  "public" : false
               }
            },
            "canView" : {
               "files" : {
                  "public" : false
               },
               "folders" : {
                  "public" : false
               },
               "groups" : false,
               "communities" : true
            }
         }
      }
   };
   /**
    * Jasmine spec for share configuration utility
    * 
    * @module ic-share-test.configUtilSpec
    */
   describe("the interface for ic-share/util/configUtil", function() {
      it("implements the expected methods", function() {

         // Verify default policy for anonymous user
         expect(configUtil.canCreateExternalFiles(null)).toBeTruthy();
         expect(configUtil.canCreateExternalFolders(null)).toBeTruthy();
         expect(configUtil.canCreateInternalFiles(null)).toBeTruthy();
         expect(configUtil.canCreateInternalFolders(null)).toBeTruthy();
         expect(configUtil.canViewPublicFiles(null)).toBeTruthy();
         expect(configUtil.canViewPublicFolders(null)).toBeTruthy();
         expect(configUtil.canCreatePublicFiles(null)).toBeTruthy();
         expect(configUtil.canCreatePublicFolders(null)).toBeTruthy();
         expect(configUtil.canViewGroups(null)).toBeTruthy();
         expect(configUtil.canViewcommunities(null)).toBeTruthy();

         // // Verify policy for valid user
         expect(configUtil.canCreateExternalFiles(_user)).toBeFalsy();
         expect(configUtil.canCreateExternalFolders(_user)).toBeFalsy();
         expect(configUtil.canCreateInternalFiles(_user)).toBeFalsy();
         expect(configUtil.canCreateInternalFolders(_user)).toBeFalsy();
         expect(configUtil.canViewPublicFiles(_user)).toBeFalsy();
         expect(configUtil.canViewPublicFolders(_user)).toBeFalsy();
         expect(configUtil.canCreatePublicFiles(_user)).toBeFalsy();
         expect(configUtil.canCreatePublicFolders(_user)).toBeFalsy();
         expect(configUtil.canViewGroups(_user)).toBeFalsy();
         expect(configUtil.canViewcommunities(_user)).toBeTruthy();
      });
   });
});
