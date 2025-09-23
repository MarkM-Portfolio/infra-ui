/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.util.PreferenceCacheTests");

dojo.require("doh.runner");
dojo.require("lconn.core.util.PreferenceCache");

(function(cache) {

   var ICPREFS = 'icprefs';
   doh.register("lconn.test.util.PreferenceCache", [{
      name : 'test interface',
      runTest : function() {
         doh.t(dojo.isFunction(cache.get));
         doh.t(dojo.isFunction(cache.set));
         doh.t(dojo.isFunction(cache.unset));
         doh.t(dojo.isFunction(cache.clear));
      }
   }, {
      name : 'test get()',
      setUp : function() {
         localStorage.removeItem(ICPREFS);
      },
      runTest : function() {
         cache.set('a', 'b');
         doh.is('b', cache.get('a'));
         
         var o = {a:'b',c:1};
         cache.set('o', o);
         doh.is(o, cache.get('o'));
      },
      tearDown : function() {
         localStorage.removeItem(ICPREFS);
      }
   }, {
      name : 'test set()',
      setUp : function() {
         localStorage.removeItem(ICPREFS);
      },
      runTest : function() {
         cache.set('a', 'b');
         doh.t(null !== localStorage.getItem(ICPREFS));
         doh.t(null !== dojo.fromJson(localStorage.getItem(ICPREFS)).a);
         doh.is('b', dojo.fromJson(localStorage.getItem(ICPREFS)).a);

         localStorage.removeItem(ICPREFS);

         var o = {a:'d',d:4};
         cache.set('m', o);
         doh.t(null !== localStorage.getItem(ICPREFS));
         doh.t(null !== localStorage.getItem(ICPREFS).m);
         doh.is(o, dojo.fromJson(localStorage.getItem(ICPREFS)).m);
      },
      tearDown : function() {
         localStorage.removeItem(ICPREFS);
      }
   }, {
      name : 'test unset()',
      setUp : function() {
         localStorage.removeItem(ICPREFS);
         localStorage.setItem(ICPREFS, dojo.toJson({a: 123, b: 456}));
      },
      runTest : function() {
         cache.unset('a');
         doh.t(null !== localStorage.getItem(ICPREFS));
         doh.is(null, dojo.fromJson(localStorage.getItem(ICPREFS)).a);
         doh.t(null !== dojo.fromJson(localStorage.getItem(ICPREFS)).b);
         doh.is(456, dojo.fromJson(localStorage.getItem(ICPREFS)).b);
         doh.is(null, cache.get('a'));
         doh.is(456, cache.get('b'));
      },
      tearDown : function() {
         localStorage.removeItem(ICPREFS);
      }
   }, {
      name : 'test clear()',
      setUp : function() {
         localStorage.removeItem(ICPREFS);
      },
      runTest : function() {
         cache.set('a', 9);
         cache.set('b', {i:1,j:2});
         cache.clear();
         doh.is(null, localStorage.getItem(ICPREFS));
         doh.is(null, cache.get('a'));
         doh.is(null, cache.get('b'));
      },
      tearDown : function() {
         localStorage.removeItem(ICPREFS);
      }
   }]);
}(lconn.core.util.PreferenceCache));
