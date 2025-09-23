/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec suite for AMD enablerwrapper
 * 
 * @module ic-mm-test.enabler.enablerwrapperSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
define([ "ic-mm/enabler/enablerwrapper"
], function(wrapper) {
      describe('The enablerwrapper module', function() {
         it('is not null', function() {
            expect(wrapper).not.toBeNull();
         });
      });
   });
