/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/_base/array",
      "dojo/dom-construct",
      "ic-core/PeopleFinderTypeAhead"
], function(array, domConstruct, PeopleFinderTypeAhead) {

   /**
    * Jasmine spec for PeopleFinderTypeAhead widget
    * 
    * @module ic-test.core.PeopleFinderTypeAheadSpec
    */

   describe('the PeopleFinderTypeAhead widget', function() {
      var typeahead;
      beforeEach(function() {
         typeahead = new PeopleFinderTypeAhead({}, domConstruct.create('div'));
      });
      it('implements the expected methdos', function() {
         var METHODS = [
               'formatItemHtml',
               'formatItem'
         ];
         array.forEach(METHODS, function(method) {
            expect(typeahead[method]).toEqual(jasmine.any(Function));
         });
      });
   });

});
