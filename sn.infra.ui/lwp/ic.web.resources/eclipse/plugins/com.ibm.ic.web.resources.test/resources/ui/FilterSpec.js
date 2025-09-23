/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([ "ic-ui/Filter"
], function(Filter) {

   /**
    * Filter widget Jasmine spec
    * 
    * @module ic-test.ui.FilterSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the ic-ui/Filter widget", function() {
      var filter;
      beforeEach(function() {
         filter = new Filter({
            strings : {
               remove : 'Remove'
            }
         });
      });
      afterEach(function() {
         if (filter) {
            filter.destroy();
         }
      });
      it("implements the expected properties", function() {
         expect(filter.strings).not.toBeUndefined();
         expect(filter.text).not.toBeUndefined();
      });
      it("implements the expected methods", function() {
         expect(filter.notifyAndDestroy).toEqual(jasmine.any(Function));
         expect(filter.onClose).toEqual(jasmine.any(Function));
      });
      it("notifies and destroys itself upon close", function() {
         spyOn(filter, 'onClose');
         spyOn(filter, 'destroy').and.callThrough();
         filter.notifyAndDestroy();
         expect(filter.onClose).toHaveBeenCalled();
         expect(filter.destroy).toHaveBeenCalled();
      });
   });

});
