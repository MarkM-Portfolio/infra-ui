/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.dojo.querySpec");

dojo.require("lconn.core.bundle_common");

(function(query) {
   describe("dojo.query", function() {
      var d = dojo.create('div', {}, dojo.body());
      afterEach(function() {
         while (d.childNodes[0])
            d.removeChild(d.childNodes[0]);
      });
      it("returns the correct elements when using a comma ','", function() {
         var a = dojo.create('a', {}, d);
         var area = dojo.create('area', {}, d);
         var other = dojo.create('b', {}, d);
         var q = query('a, area', d);
         expect(q).not.toBeNull();
         expect(q.length).toBe(2);
         expect(q[0]).toBe(a);
         expect(q[1]).toBe(area);
      });
      it("returns the correct elements when using .class", function() {
         var a_foo = dojo.create('a', {'class': 'foo'}, d);
         var a_bar = dojo.create('a', {'class': 'bar'}, d);
         var q = query('a.foo', d);
         expect(q).not.toBeNull();
         expect(q.length).toBe(1);
         expect(q[0]).toBe(a_foo);
      });
   });
}(dojo.query));
