/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.test.jasmine.util.openAroundSpec");

dojo.require("com.ibm.oneui.util.openAround");

/**
 * Jasmine spec for com.ibm.oneui.util.openAround
 * @module com.ibm.oneui.test.jasmine.util.openAroundSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(openAround) {

   describe('com.ibm.oneui.util.openAround', function() {
      it('is a function', function() {
         expect(dojo.isFunction(openAround)).toBeTruthy();
      });
   });
}(com.ibm.oneui.util.openAround));
