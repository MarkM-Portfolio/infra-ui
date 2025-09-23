/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.core.FilteringCheckboxSpec");
dojo.require("lconn.core.FilteringCheckbox");

(function(domConstruct, FilteringCheckbox) {

   function FEED_FUNCTION() {
      return;
   }

   describe('the lconn.core.FilteringCheckbox class', function() {
      var widget;
      beforeEach(function() {
         widget = new FilteringCheckbox({
            feedFunction : FEED_FUNCTION
         }, domConstruct.create('div'));
      });

      it('the interface implements the expected methods', function() {
         expect(widget.focusPrevItem).toEqual(jasmine.any(Function));
         expect(widget.focusNextItem).toEqual(jasmine.any(Function));
         expect(widget.getCurrentSelected).toEqual(jasmine.any(Function));
         expect(widget.getList).toEqual(jasmine.any(Function));
         expect(widget.isDirty).toEqual(jasmine.any(Function));
         expect(widget.setDisabled).toEqual(jasmine.any(Function));
         expect(widget.reset).toEqual(jasmine.any(Function));
         expect(widget.selectItem).toEqual(jasmine.any(Function));
         expect(widget.groupChanged).toEqual(jasmine.any(Function));
         expect(widget.personSelected).toEqual(jasmine.any(Function));
         expect(widget.readySearch).toEqual(jasmine.any(Function));
         expect(widget.timedFilter).toEqual(jasmine.any(Function));
         expect(widget.filterNames).toEqual(jasmine.any(Function));
         expect(widget.parsePeople).toEqual(jasmine.any(Function));
         expect(widget.showList).toEqual(jasmine.any(Function));
         expect(widget.createOption).toEqual(jasmine.any(Function));
         expect(widget.setDirty).toEqual(jasmine.any(Function));
         expect(widget.setValue).toEqual(jasmine.any(Function));
         expect(widget.clearSearch).toEqual(jasmine.any(Function));
         expect(widget.notifyNext).toEqual(jasmine.any(Function));
         expect(widget.notifyPrev).toEqual(jasmine.any(Function));
      });

      describe('the getList() method', function() {
         it('throws if feedFunction is not set', function() {
            var widget_without_feedfunction = new FilteringCheckbox({}, domConstruct.create('div'));
            expect(function() {
               widget_without_feedfunction.getList();
            }).toThrow();
         });
         it('calls feedFunction if gotList is false', function() {
            spyOn(widget, 'feedFunction');
            widget.gotList = false;
            widget.getList();
            expect(widget.feedFunction).toHaveBeenCalled();
         });
         it('does not call feedFunction if gotList is true', function() {
            spyOn(widget, 'feedFunction');
            widget.gotList = true;
            widget.getList();
            expect(widget.feedFunction).not.toHaveBeenCalled();
         });
      });

      describe('the notifyPrev() method', function() {
         it('calls clearSearch()', function() {
            spyOn(widget, 'clearSearch');
            widget.notifyPrev();
            expect(widget.clearSearch).toHaveBeenCalled();
         });
         it('calls getList()', function() {
            spyOn(widget, 'getList');
            widget.notifyPrev();
            expect(widget.getList).toHaveBeenCalled();
         });
      });

      describe('the notifyNext() method', function() {
         it('calls clearSearch()', function() {
            spyOn(widget, 'clearSearch');
            widget.notifyNext();
            expect(widget.clearSearch).toHaveBeenCalled();
         });
         it('calls getList()', function() {
            spyOn(widget, 'getList');
            widget.notifyNext();
            expect(widget.getList).toHaveBeenCalled();
         });
      });

      describe('the isDirty() method', function() {
         it('returns the value of the dirty member', function() {
            widget.dirty = false;
            expect(widget.isDirty()).toBeFalsy();

            widget.dirty = true;
            expect(widget.isDirty()).toBeTruthy();
         });
      });

      describe('the setDirty() method', function() {
         it('sets the value of the dirty member', function() {
            widget.dirty = false;
            widget.setDirty();
            expect(widget.isDirty()).toBeTruthy();
         });
      });
   });
}(dojo, lconn.core.FilteringCheckbox));
