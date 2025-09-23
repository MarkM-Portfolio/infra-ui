/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "ic-core/PeopleDataStore",
      "ic-core/PeopleDataStoreOpenSocial",
      "ic-core/PeopleTypeAheadOpenSocialConverter"
], function(PeopleDataStore, PeopleDataStoreOpenSocial, PeopleTypeAheadOpenSocialConverter) {

   var networkSpec = {
      get : function() {
         return true;
      }
   };
   var socialParams = {
      filterBy : "displayName",
      count : 5
   };
   describe('the ic-core/PeopleDataStoreOpenSocial class', function() {
      var storeSpec;
      beforeEach(function() {
         storeSpec = new PeopleDataStoreOpenSocial({
            url : 'a',
            queryParam : 'name',
            network : networkSpec,
            openSocialParameters : socialParams
         });
      });

      describe('the interface', function() {
         it('implements the expected methods', function() {
            expect(storeSpec.constructor).toEqual(jasmine.any(Function));
            expect(storeSpec.setOpenSocialParameters).toEqual(jasmine.any(Function));
            expect(storeSpec.fetch).toEqual(jasmine.any(Function));
         });
         it('is an instance of ic-core/PeopleDataStore', function() {
            expect(storeSpec instanceof PeopleDataStore).toBeTruthy();
         });
      });

      describe('the ic-core/PeopleDataStoreOpenSocial constructor', function() {
         it('initializes the properties of the object', function() {
            expect(storeSpec._openSocialDataConverter instanceof PeopleTypeAheadOpenSocialConverter).toBeTruthy();
            expect(storeSpec._openSocialParameters).toBe(socialParams);
            expect(storeSpec.network).toBe(networkSpec);
         });
      });

      describe('the method ic-core/PeopleDataStoreOpenSocial.setOpenSocialParameters', function() {
         it('sets _openSocialParameters', function() {
            storeSpec.setOpenSocialParameters("a");
            expect(storeSpec._openSocialParameters).toBe('a');
         });
      });

      describe('the method ic-core/PeopleDataStoreOpenSocial.fetch', function() {
         var keywordArgs;
         beforeEach(function() {
            keywordArgs = {
               queryOptions : {},
               query : 'amy'
            };
         });
         it('calls networkGet with the right parameters', function() {
            var callParams = {
               url : 'a',
               content : {
                  filterBy : "displayName",
                  count : 5,
                  name : "amy"
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
         it('calls networkGet with the right parameters (searchDirectory option = true)', function() {
            keywordArgs.queryOptions.searchDirectory = 'True';
            var callParams = {
               url : 'a',
               content : {
                  filterBy : "displayName",
                  count : 5,
                  name : "amy",
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
