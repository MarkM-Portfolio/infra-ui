/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.core.PeopleDataStoreSpec");
dojo.require("lconn.core.PeopleDataStore");

(function(peopleDataStore) {
   var networkSpec = {
      get : function() {
         return true
      },
      xhrGet : function() {
         return true
      }
   };
   describe('the lconn.core.PeopleDataStore class', function() {
      var storeSpec;
      beforeEach(function() {
         storeSpec = new peopleDataStore({
            url : 'a',
            queryParam : 'name',
            network : networkSpec
         });
      });

      describe('the interface', function() {
         it('implements the expected methods', function() {
            expect(storeSpec.constructor).toBeDefined();
            expect(storeSpec.fetch).toBeDefined();
            expect(storeSpec.networkGet).toBeDefined();
            expect(storeSpec.getValue).toBeDefined();
         });
      });

      describe('the constructor', function() {
         it('initializes the properties of the object', function() {
            expect(storeSpec.url).toBe('a');
            expect(storeSpec.queryParam).toBe('name');
            expect(storeSpec.network).toBe(networkSpec);
            expect(storeSpec.cache).toEqual([]);
            expect(storeSpec.dirCache).toEqual([]);
         });
         it('initializes the properties of the object from a node', function() {
            var node = dojo.create("item", {
               queryParam : "nodeName",
               url : "nodeUrl"
            });
            var nodeStoreSpec = new peopleDataStore({
               network : networkSpec
            }, node);
            expect(nodeStoreSpec.url).toBe('nodeUrl');
            expect(nodeStoreSpec.queryParam).toBe('nodeName');
            expect(nodeStoreSpec.network).toBe(networkSpec);
            expect(nodeStoreSpec.cache).toEqual([]);
            expect(nodeStoreSpec.dirCache).toEqual([]);
         });
      });

      describe('the method fetch()', function() {
         var keywordArgs;
         beforeEach(function() {
            keywordArgs = {
               queryOptions : {},
               query : 'amy'
            };
         });
         it('calls networkGet', function() {
            spyOn(storeSpec, 'networkGet');
            var result = storeSpec.fetch(keywordArgs);
            expect(storeSpec.networkGet).toHaveBeenCalled();
            expect(result).toBe(keywordArgs);
         });
         it('uses cache and calls onComplete', function() {
            keywordArgs.onComplete = function() {
               return true
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

      describe('the method networkGet()', function() {
         var opts = {
            a : "first",
            b : "second"
         };
         it('calls network.get when defined', function() {
            spyOn(networkSpec, 'get');
            storeSpec.networkGet(opts);
            expect(networkSpec.get).toHaveBeenCalledWith(opts);
         });
         it('calls network.xhrGet method when no network.get defined', function() {
            networkSpec.get = undefined;
            spyOn(networkSpec, 'xhrGet')
            storeSpec.networkGet(opts);
            expect(networkSpec.xhrGet).toHaveBeenCalledWith(opts);
         });
         it('calls dojo.xhrGet when no network defined', function() {
            networkSpec = undefined;
            storeSpec.network = networkSpec;
            spyOn(dojo, 'xhrGet');
            storeSpec.networkGet(opts);
            expect(dojo.xhrGet).toHaveBeenCalledWith(opts);
         });
      });

      describe('the method getValue', function() {
         it('returns the correct value', function() {
            expect(storeSpec.getValue(storeSpec, 'url', 'defaultValue')).toBe('a');
            expect(storeSpec.getValue(storeSpec, '', 'defaultValue')).toBe('defaultValue');
         });
      });
   });

}(lconn.core.PeopleDataStore));
