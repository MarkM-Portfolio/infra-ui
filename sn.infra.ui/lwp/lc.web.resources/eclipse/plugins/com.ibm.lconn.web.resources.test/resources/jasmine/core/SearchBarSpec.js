/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.core.SearchBarSpec");

dojo.require("lconn.core.SearchBar");
dojo.require("dijit.Menu");

(function(array, Menu, SearchBar) {

   /**
    * Jasmine spec for SearchBar widget
    * 
    * @module lconn.test.jasmine.core.SearchBarSpec
    */

   describe('the SearchBar widget', function() {
      var searchBar;
      beforeEach(function() {
         searchBar = new SearchBar();
      });
      it('implements the expected methdos', function() {
         var METHODS = [
               'changeLocalOptions',
               'showDefaultOption',
               'getScopeMenu',
               'openMenu',
               'openMenuA11y',
               'closeMenu',
               'onSelectOption',
               'selectOption',
               'setSelectedFeature',
               'isThirdPartySearchEngineSelected',
               'submitForm',
               'getValue',
               'setValue',
               'clearValue',
               'formSubmitted',
               'onSubmit',
               'search',
               'TAisPlaceholderActive'
         ];
         array.forEach(METHODS, function(method) {
            expect(searchBar[method]).toEqual(jasmine.any(Function));
         });
      });

      describe('the setValue method', function() {
         it('calls textBox.setValue()', function() {
            var VALUE = 'abc';
            searchBar.textBox = jasmine.createSpyObj('textBox', [ 'setValue'
            ]);
            searchBar.setValue(VALUE);
            expect(searchBar.textBox.setValue).toHaveBeenCalledWith(VALUE);
         });
      });

      describe('the getValue method', function() {
         it('returns textBox.getValue()', function() {
            searchBar.textBox = jasmine.createSpyObj('textBox', [ 'getValue'
            ]);
            searchBar.getValue();
            expect(searchBar.textBox.getValue).toHaveBeenCalled();
         });
      });

      describe('the clearValue method', function() {
         it('returns textBox.clearValue()', function() {
            searchBar.textBox = jasmine.createSpyObj('textBox', [ 'clearValue'
            ]);
            searchBar.clearValue();
            expect(searchBar.textBox.clearValue).toHaveBeenCalled();
         });
      });

      describe('the getScopeMenu method', function() {
         it('returns a dijit Menu', function() {
            var menu = searchBar.getScopeMenu();
            expect(menu instanceof Menu).toBeTruthy();
         });
      });

      describe('the showDefaultOption method', function() {
         it('calls selectOption()', function() {
            spyOn(searchBar, 'selectOption');
            searchBar.showDefaultOption();
            expect(searchBar.selectOption).toHaveBeenCalled();
         });
      });
   });
}(dojo, dijit.Menu, lconn.core.SearchBar));
