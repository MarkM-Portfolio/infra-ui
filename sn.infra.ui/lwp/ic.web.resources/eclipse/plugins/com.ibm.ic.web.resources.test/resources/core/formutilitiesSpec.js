/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/_base/array",
      "ic-core/formutilities"
], function(array, formutilities) {

   /**
    * Jasmine spec for lconn.core.formutilities
    * 
    * @module lconn.test.jasmine.core.formutilitiesSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the interface of lconn.core.formutilities", function() {
      it("implements the expected methods", function() {
         var METHODS = [
               'findParentForm',
               'setActionAndSubmit',
               'setActionAndConfirmAndSubmit',
               'checkRadionButton',
               'getRadioGroupCheckedValue',
               'selectAllCheckboxes',
               'deselectAllCheckboxes',
               'changeAllCheckboxes',
               'getCheckedBoxes',
               'setSelectionControlVal',
               'getSelectionControlVal',
               'getMultipleSelectionControlValues',
               'getAllSelectionControlValues',
               'getSelectionControlName',
               'removeSelectedSelectionControlOption',
               'removeSelectionControlOption',
               'removeAllSelectionControlOption',
               'addSelectionControlVal',
               'getFormControl',
               'getTextBoxValue',
               'getControlTagName',
               'getValue',
               'setValue'
         ];
         array.forEach(METHODS, function(method) {
            expect(formutilities[method]).toEqual(jasmine.any(Function));
         });
      });
   });
});
