/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/window",
   "dojo/dom-construct",
   "dojo/query"
], function (windowModule, domConstruct, query) {

   describe("dojo.query", function() {
      var d = domConstruct.create('div', {}, windowModule.body());
      afterEach(function() {
         while (d.childNodes[0]) {
            d.removeChild(d.childNodes[0]);
         }
      });
      it("returns the correct elements when using a comma ','", function() {
         var a = domConstruct.create('a', {}, d);
         var area = domConstruct.create('area', {}, d);
//         var other = domConstruct.create('b', {}, d);
         var q = query('a, area', d);
         expect(q).not.toBeNull();
         expect(q.length).toBe(2);
         expect(q[0]).toBe(a);
         expect(q[1]).toBe(area);
      });
      it("returns the correct elements when using .class", function() {
         var a_foo = domConstruct.create('a', {'class': 'foo'}, d);
//         var a_bar = domConstruct.create('a', {'class': 'bar'}, d);
         var q = query('a.foo', d);
         expect(q).not.toBeNull();
         expect(q.length).toBe(1);
         expect(q[0]).toBe(a_foo);
      });
   });
});
