/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.core.PeopleFilterListSpec");
dojo.require("lconn.core.PeopleFilterList");

(function(array, domConstruct, PeopleFilterList) {

   /**
    * Jasmine spec for PeopleFilterList widget
    * 
    * @module lconn.test.jasmine.core.PeopleFilterListSpec
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

}(dojo, dojo, lconn.core.PeopleFilterList));
