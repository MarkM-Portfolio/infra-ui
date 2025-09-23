/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
define([
      "dojo/_base/array",
      "dojo/dom-construct",
      "ic-core/PeopleFilterList"
], function(array, domConstruct, PeopleFilterList) {

   /**
    * Jasmine spec for PeopleFilterList widget
    * 
    * @module ic-test.core.PeopleFilterListSpec
    */

   describe('the PeopleFilterList widget', function() {
      var widget;
      beforeEach(function() {
         widget = new PeopleFilterList({}, domConstruct.create('div'));
      });
      it('implements the expected methdos', function() {
         var METHODS = [
               'addPerson',
               'removePerson',
               'onPersonRemoved',
               'getCount',
               'reset'
         ];
         array.forEach(METHODS, function(method) {
            expect(widget[method]).toEqual(jasmine.any(Function));
         });
      });
   });

});
