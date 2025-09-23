/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.core.PeopleTypeAheadSpec");

dojo.require("lconn.core.PeopleTypeAhead");

(function(array, domConstruct, PeopleTypeAhead) {

   /**
    * Jasmine spec for PeopleTypeAhead widget
    * 
    * @module lconn.test.jasmine.core.PeopleTypeAheadSpec
    */

   describe('the PeopleTypeAhead widget', function() {
      var typeahead;
      beforeEach(function() {
         typeahead = new PeopleTypeAhead({}, domConstruct.create('div'));
      });
      it('implements the expected methdos', function() {
         var METHODS = [ 'getItem'
         ];
         array.forEach(METHODS, function(method) {
            expect(typeahead[method]).toEqual(jasmine.any(Function));
         });
      });
   });

}(dojo, dojo, lconn.core.PeopleTypeAhead));
