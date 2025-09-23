/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.core.urlTests");

dojo.require("doh.runner");
dojo.require("lconn.core.url");

(function(url) {
   doh.register("lconn.test.core.urlTests", [ {
      name : 'test interface',
      runTest : function() {
         doh.t(dojo.isFunction(url.parse));
         doh.t(dojo.isFunction(url.write));
         doh.t(dojo.isFunction(url.rewrite));
         doh.t(dojo.isFunction(url.canonicalize));
         doh.t(dojo.isFunction(url.getRequestParameters));
         doh.t(dojo.isFunction(url.getServiceUrl));
         doh.t(dojo.isFunction(url.splitQuery));
         doh.t(dojo.isFunction(url.ensureQualified));
         doh.t(dojo.isFunction(url.writeParameters));
      }
   }, {
      name : 'test parse()',
      runTest : function() {
         var u = url.parse('http://www.ibm.com/search/do?a=%3D&c=d&c=e');
         doh.is('http', u.scheme);
         doh.is('www.ibm.com', u.authority);
         doh.is('www.ibm.com', u.host);
         doh.is(null, u.port);
         doh.is('/search/do', u.path);
         doh.is('a=%3D&c=d&c=e', u.query);
         doh.is({a: '=', c: ['d', 'e']}, u.queryParameters);
      }
   }, {
      name : 'test write()',
      runTest : function() {
         // Test idempotence
         var u = 'http://www.ibm.com/home?a=1&b=2#foo';
         doh.is(u, url.write(url.parse(u)));
      }
   }, {
      name : 'test rewrite()',
      runTest : function() {
         // Add and replace
         var u = url.rewrite('http://www.ibm.com/home?a=1&b=2', {a: 3, b: 4, c: 5});
         doh.is('http://www.ibm.com/home?a=3&b=4&c=5', u);
         // Nothing to do
         u = url.rewrite('http://www.ibm.com/home');
         doh.is('http://www.ibm.com/home', u);
         // Array
         u = url.rewrite('http://www.ibm.com?a=1', {a: [2, 3]});
         doh.is('http://www.ibm.com?a=2&a=3', u);
         // URI encoded
         u = url.rewrite('http://www.ibm.com', {b: '%'});
         doh.is('http://www.ibm.com?b=%25', u);
      }
   }, {
      name : 'test splitQuery()',
      runTest : function() {
         var u = url.splitQuery('?debug=true&a=foo&b=3');
         doh.is('true', u.debug);
         doh.is('foo', u.a);
      }
    }, {
      name : 'test writeParameters()',
      runTest : function() {
         var u = {debug: "true", a: "foo", b: "3"};
         var res = url.writeParameters(u);
         doh.is('?debug=true&a=foo&b=3', res);
      }
    }, {
      name : 'test canonicalize()',
      runTest : function() {
         // Wikis
         var u = url.canonicalize('http://www.ibm.com/wikis/home?lang=en#!/wiki/abc/page/def', 'wikis');
         doh.is('http://www.ibm.com/wikis/home/wiki/abc/page/def?lang=en', u);
         // Files
         u = url.canonicalize('http://www.ibm.com/files/app/#/file/abcdef', 'files');
         // Note the // is intended, as RFC 3986 doesn't mandate to collapse it 
         doh.is('http://www.ibm.com/files/app//file/abcdef', u);
         // Other
         var w = 'http://www.ibm.com/communities/community/connuidev?a=1';
         u = url.canonicalize(w, 'communities');
         doh.is(w, u);
      }
   }]);
}(lconn.core.url));
