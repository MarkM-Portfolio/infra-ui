/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
define([
      "dojo/dom-construct",
      "ic-core/PeopleDataStore"
], function(domConstruct, PeopleDataStore) {
   var networkMock = {
      get : function() {
         return true;
      },
      xhrGet : function() {
         return true;
      }
   };
   describe('the ic-core/PeopleDataStore class', function() {
      var store;
      beforeEach(function() {
         store = new PeopleDataStore({
            url : 'a',
            queryParam : 'name',
            network : networkMock
         });
      });

      describe('the interface', function() {
         it('implements the expected methods', function() {
            expect(store.constructor).toBeDefined();
            expect(store.fetch).toBeDefined();
            expect(store.networkGet).toBeDefined();
            expect(store.getValue).toBeDefined();
         });
      });

      describe('the ic-core/PeopleDataStore constructor', function() {
         it('initializes the properties of the object', function() {
            expect(store.url).toBe('a');
            expect(store.queryParam).toBe('name');
            expect(store.network).toBe(networkMock);
            expect(store.cache).toEqual([]);
            expect(store.dirCache).toEqual([]);
         });
         it('initializes the properties of the object from a node', function() {
            var node = domConstruct.create("item", {
               queryParam : "nodeName",
               url : "nodeUrl"
            });
            var nodestore = new PeopleDataStore({
               network : networkMock
            }, node);
            expect(nodestore.url).toBe('nodeUrl');
            expect(nodestore.queryParam).toBe('nodeName');
            expect(nodestore.network).toBe(networkMock);
            expect(nodestore.cache).toEqual([]);
            expect(nodestore.dirCache).toEqual([]);
         });
      });

      describe('the method ic-core/PeopleDataStore.fetch', function() {
         var keywordArgs;
         beforeEach(function() {
            keywordArgs = {
               queryOptions : {},
               query : 'amy'
            };
         });
         it('calls networkGet', function() {
            spyOn(store, 'networkGet');
            var result = store.fetch(keywordArgs);
            expect(store.networkGet).toHaveBeenCalled();
            expect(result).toBe(keywordArgs);
         });
         it('uses cache and calls onComplete', function() {
            keywordArgs.onComplete = function() {
               return true;
            };
            store.cache = {
               amy : {
                  id : '007'
               },
               length : 1
            };
            spyOn(keywordArgs, 'onComplete');
            var result = store.fetch(keywordArgs);
            expect(keywordArgs.onComplete).toHaveBeenCalled();
            keywordArgs.count = 1;
            expect(result).toBe(keywordArgs);
         });
      });

      describe('the method ic-core/PeopleDataStore.networkGet', function() {
         var opts = {
            a : "first",
            b : "second"
         };
         it('calls network.get when defined', function() {
            spyOn(networkMock, 'get');
            store.networkGet(opts);
            expect(networkMock.get).toHaveBeenCalledWith(opts);
         });
         it('calls network.xhrGet method when no network.get defined', function() {
            networkMock.get = undefined;
            spyOn(networkMock, 'xhrGet');
            store.networkGet(opts);
            expect(networkMock.xhrGet).toHaveBeenCalledWith(opts);
         });
         it('calls dojo.xhrGet when no network defined', function() {
            networkMock = undefined;
            store.network = networkMock;
            spyOn(dojo, 'xhrGet');
            store.networkGet(opts);
            expect(dojo.xhrGet).toHaveBeenCalledWith(opts);
         });
      });

      describe('the method ic-core/PeopleDataStore.getValue', function() {
         it('returns the correct value', function() {
            expect(store.getValue(store, 'url', 'defaultValue')).toBe('a');
            expect(store.getValue(store, '', 'defaultValue')).toBe('defaultValue');
         });
      });
   });
});
