/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dijit/MenuItem",
      "ic-core/MenuItem"
], function(DijitMenuItem, MenuItem) {

   /**
    * Jasmine spec for the custom Menu Item
    * 
    * @module ic-test.core.MenuItemSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("ic-core/MenuItem", function() {
      var widget;
      beforeEach(function() {
         widget = new MenuItem();
      });
      it('is an instance of dijit/MenuItem', function() {
         expect(widget.isInstanceOf(DijitMenuItem)).toBeTruthy();
      });
      it('it sets the source of the icon', function() {
         var SRC = 'abc';
         var item = new MenuItem({
            iconSrc : SRC
         });
         expect(item.iconNode.src).toBe(SRC);
      });
   });
});
