/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/_base/array",
      "dojo/dom-construct",
      "dojo/topic",
      "ic-core/PeopleTypeAheadMenu"
], function(array, domConstruct, topic, PeopleTypeAheadMenu) {

   /**
    * Jasmine spec for PeopleTypeAheadMenu widget
    * 
    * @module ic-test.core.PeopleTypeAheadMenuSpec
    */

   describe('the PeopleTypeAheadMenu widget', function() {
      var typeahead, sub;
      beforeEach(function() {
         typeahead = new PeopleTypeAheadMenu({}, domConstruct.create('div'));
      });
      afterEach(function() {
         if (sub) {
            sub.remove();
            sub = undefined;
         }
      });
      it('implements the expected methdos', function() {
         var METHODS = [
               'searchDirectory',
               'setValue',
               'renderBizCard',
               'createOptions',
               'clearResultList',
               'getListLength',
               'showTooltip',
               'onPage',
               'closeTooltip',
               'onClose'
         ];
         array.forEach(METHODS, function(method) {
            expect(typeahead[method]).toEqual(jasmine.any(Function));
         });
      });
      it('the setValue() method sets the value and calls onChange() if the argument has a target.item property', function() {
         var VALUE = {
            target : {
               item : 1
            }
         };
         spyOn(typeahead, 'onChange');
         typeahead.setValue(VALUE);
         expect(typeahead.onChange).toHaveBeenCalledWith(VALUE);
         expect(typeahead.value).toBe(VALUE);
      });
      it('the setValue() method does nothing if the argument has no target.item property', function() {
         var VALUE = {};
         spyOn(typeahead, 'onChange');
         typeahead.setValue(VALUE);
         expect(typeahead.onChange).not.toHaveBeenCalled();
         expect(typeahead.value).not.toBe(VALUE);
      });
      it('the createOptions() method publishes the ic-core/typeahead/open topic', function(done) {
         sub = topic.subscribe("ic-core/typeahead/open", function() {
            expect(true).toBeTruthy();
            done();
         });
         typeahead.createOptions();
      });
      it('the clearResultList() method removes all result nodes', function() {
         typeahead.clearResultList();
         expect(typeahead.domNode.children.length).toBe(3);
         expect(typeahead.domNode.children[0]).toBe(typeahead.headerNode);
         expect(typeahead.domNode.children[1]).toBe(typeahead.previousButton);
         expect(typeahead.domNode.children[2]).toBe(typeahead.nextButton);
      });
      it('the onClose() method publishes the ic-core/typeahead/close topic', function(done) {
         var a = false, b = false;
         function checkBoth(done) {
            if (a && b) {
               done();
            }
         }
         spyOn(typeahead, 'closeTooltip');
         spyOn(typeahead, '_blurOptionNode');
         sub = topic.subscribe("ic-core/typeahead/close", function() {
            expect(true).toBeTruthy();
            a = true;
            checkBoth(done);
         });
         typeahead.onClose();
         expect(typeahead.popupClosed).toBeTruthy();
         expect(typeahead.closeTooltip).toHaveBeenCalled();
         expect(typeahead._blurOptionNode).toHaveBeenCalled();
         b = true;
         checkBoth(done);
      });
   });

});
