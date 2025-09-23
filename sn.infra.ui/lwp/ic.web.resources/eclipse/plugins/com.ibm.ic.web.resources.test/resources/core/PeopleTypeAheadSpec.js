/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/_base/array",
      "dojo/dom-construct",
      "ic-core/PeopleTypeAhead"
], function(array, domConstruct, PeopleTypeAhead) {

   /**
    * Jasmine spec for PeopleTypeAhead widget
    * 
    * @module ic-test.core.PeopleTypeAheadSpec
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

});
