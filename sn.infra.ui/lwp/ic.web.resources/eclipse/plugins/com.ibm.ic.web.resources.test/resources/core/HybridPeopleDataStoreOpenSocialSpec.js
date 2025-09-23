/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "ic-core/HybridPeopleDataStoreOpenSocial",
      "ic-core/PeopleDataStore",
      "ic-core/PeopleTypeAheadOpenSocialConverter"
], function(HybridPeopleDataStoreOpenSocial, PeopleDataStore, PeopleTypeAheadOpenSocialConverter) {

   var networkSpec = {
      get : function() {
         return true;
      }
   };
   var socialParams = {
      filterBy : "displayName",
      count : 5
   };
   var extendedQueryParamSpec = 'moreParams';
   var extendedUrlSpec = 'extendedURL';

   describe('the ic-core/HybridPeopleDataStoreOpenSocial class', function() {
      var storeSpec;

      beforeEach(function() {
         storeSpec = new HybridPeopleDataStoreOpenSocial({
            url : 'a',
            queryParam : 'name',
            network : networkSpec,
            openSocialParameters : socialParams,
            extendedQueryParam : extendedQueryParamSpec,
            extendedTypeAheadUrl : extendedUrlSpec
         });
      });

      describe('the interface', function() {
         it('implements the expected methods', function() {
            expect(storeSpec.constructor).toBeDefined();
            expect(storeSpec.setOpenSocialParameters).toBeDefined();
            expect(storeSpec.fetch).toBeDefined();
         });
         it('is an instance of ic-core/PeopleDataStore', function() {
            expect(storeSpec instanceof PeopleDataStore).toBeTruthy();
         });
      });

      describe('the ic-core/HybridPeopleDataStoreOpenSocial constructor', function() {
         it('initializes the properties of the object', function() {
            expect(storeSpec._openSocialDataConverter instanceof PeopleTypeAheadOpenSocialConverter).toBeTruthy();
            expect(storeSpec._openSocialParameters).toBe(socialParams);
            expect(storeSpec._extendedCache).toEqual([]);
            expect(storeSpec.extendedTypeAheadUrl).toBe(extendedUrlSpec);
            expect(storeSpec.extendedQueryParam).toBe(extendedQueryParamSpec);
            expect(storeSpec.network).toBe(networkSpec);
         });
      });

      describe('the method ic-core/HybridPeopleDataStoreOpenSocial.setOpenSocialParameters', function() {
         it('sets _openSocialParameters', function() {
            storeSpec.setOpenSocialParameters("a");
            expect(storeSpec._openSocialParameters).toBe('a');
         });
      });

      describe('the method ic-core/HybridPeopleDataStoreOpenSocial.fetch', function() {
         var keywordArgs;
         beforeEach(function() {
            keywordArgs = {
               queryOptions : {},
               query : 'amy'
            };
         });
         it('calls ic-core/PeopleDataStore.fetch (!searchDirectory)', function() {
            spyOn(storeSpec, 'inherited');
            storeSpec.fetch(keywordArgs);
            expect(storeSpec.inherited).toHaveBeenCalledWith("fetch", jasmine.any(Object));
         });
         it('returns the right arguments', function() {
            expect(storeSpec.fetch(keywordArgs)).toBe(keywordArgs);
         });
         it('calls networkGet with the right parameters (searchDirectory = true)', function() {
            keywordArgs.queryOptions.searchDirectory = 'True';
            var callParams = {
               url : extendedUrlSpec,
               content : {
                  filterBy : "displayName",
                  count : 5,
                  moreParams : 'amy',
                  searchType : "directory"
               },
               handleAs : "json-comment-optional",
               timeout : 60000,
               load : jasmine.any(Function),
               error : jasmine.any(Function)
            };
            spyOn(storeSpec, 'networkGet');
            var result = storeSpec.fetch(keywordArgs);
            expect(storeSpec.networkGet).toHaveBeenCalledWith(callParams);
            expect(result).toBe(keywordArgs);
         });
         it('uses cache and calls onComplete', function() {
            keywordArgs.onComplete = function() {
               return true;
            };
            storeSpec.cache = {
               amy : {
                  id : '007'
               },
               length : 1
            };
            spyOn(keywordArgs, 'onComplete');
            var result = storeSpec.fetch(keywordArgs);
            expect(keywordArgs.onComplete).toHaveBeenCalled();
            keywordArgs.count = 1;
            expect(result).toBe(keywordArgs);
         });
      });
   });
});
