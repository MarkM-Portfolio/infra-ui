/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "ic-core/PeopleDataStore",
      "ic-core/PeopleFinderDataStore"
], function(PeopleDataStore, PeopleFinderDataStore) {

   var NEW_RESULTS = [
         {
            "id" : "11a71a40-b788-102f-9fae-ceff629df3bf",
            "name" : "Thom Frankel",
            "email" : "tfrankel@renovations.com",
            "userType" : "VISITOR"
         },
         {
            "id" : "eafd8f71-d30b-4dc4-8340-4e1a3a6ea695",
            "name" : "Amy Jones",
            "email" : "ajones@renovations.com",
            "userType" : "EMPLOYEE"
         }
   ];

   function assertItem(item, expected) {
      expect(item.userid).toBe(expected.id);
      expect(item.type).toBe('0');
      expect(item.name).toBe(expected.name);
      expect(item.param).toBe(expected.id + '\u0002' + expected.name);
      expect(item.member).toBe(expected.email);
      if (expected.userType == 'VISITOR') {
         expect(item.ext.mode).toBe('EXTERNAL');
      }
      else {
         expect(item.ext.mode).toBe(expected.userType);
      }
   }

   describe('the ic-core/PeopleFinderDataStore class', function() {
      var store;
      beforeEach(function() {
         store = new PeopleFinderDataStore({
            url : 'a',
            queryParam : 'name'
         });
      });

      describe('the interface', function() {
         it('implements the expected methods', function() {
            expect(store.fetch).toBeTruthy();
            expect(store.convertPeopleFinderResults).toBeDefined();
            expect(store.convertPeopleFinderResult).toBeDefined();
         });
         it('inherits from ic-core/PeopleDataStore', function() {
            expect(store instanceof PeopleDataStore).toBeTruthy();
         });
      });

      describe('the method convertPeopleFinderResults()', function() {
         it('returns the argument if null, not an object, or a zero length array', function() {
            expect(store.convertPeopleFinderResults(null)).toEqual(null);
            expect(store.convertPeopleFinderResults([])).toEqual([]);
            expect(store.convertPeopleFinderResults(undefined)).toEqual(undefined);
            expect(store.convertPeopleFinderResults({})).toEqual({});
            expect(store.convertPeopleFinderResults({
               a : 'b'
            })).toEqual({
               a : 'b'
            });
         });
         it('converts an array of the new format results into the old format people type ahead results', function() {
            var i, res = store.convertPeopleFinderResults(NEW_RESULTS);
            expect(res.length).toBe(2);

            for (i = 0; i < res.length; i++) {
               assertItem(res[i], NEW_RESULTS[i]);
            }
         });
      });

      describe('the method convertPeopleFinderResult()', function() {
         it('converts the new format results into the old format people type ahead results', function() {
            var res = store.convertPeopleFinderResult(NEW_RESULTS[0]);
            expect(typeof res).toBe('object');

            assertItem(res, NEW_RESULTS[0]);
         });
      });

      describe('the method fetch()', function() {
         var mock_network_store;
         beforeEach(function() {
            mock_network_store = new PeopleFinderDataStore({
               url : 'a',
               queryParam : 'name'
            });
            mock_network_store.networkGet = jasmine.createSpy('networkGet');
         });
         it('calls networkGet()', function() {
            mock_network_store.fetch();
            expect(mock_network_store.networkGet).toHaveBeenCalled();
            var args = mock_network_store.networkGet.calls.argsFor(0);
            // Assert properties of the argument to networkGet
            expect(args[0].url).toEqual(mock_network_store.url);
            expect(args[0].load).toEqual(jasmine.any(Function));
            expect(args[0].error).toEqual(jasmine.any(Function));
         });
         it('invokes the onComplete() callback when networkGet calls load()', function() {
            var onComplete = jasmine.createSpy('onComplete');
            var kwArgs = {
               query : 'foo',
               onComplete : onComplete
            };
            mock_network_store.fetch(kwArgs);
            expect(mock_network_store.networkGet).toHaveBeenCalled();
            var args = mock_network_store.networkGet.calls.argsFor(0);
            args[0].load({
               persons : NEW_RESULTS
            });
            expect(onComplete).toHaveBeenCalled();
            var onComplete_args = onComplete.calls.argsFor(0);
            expect(onComplete_args[0]).toEqual(mock_network_store.convertPeopleFinderResults(NEW_RESULTS));
            expect(onComplete_args[1]).toEqual(kwArgs);
         });
      });
   });
});
