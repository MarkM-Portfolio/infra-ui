/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for ic-ui.util.openAround
 * 
 * @module ic-test.ui.util.openAroundSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
define([
      "ic-ui/util/openAround",
      "dojo/_base/lang"
], function(openAround, lang) {

   describe('ic-ui/util/openAround', function() {
      it('is a function', function() {
         expect(lang.isFunction(openAround)).toBeTruthy();
      });
   });
});
