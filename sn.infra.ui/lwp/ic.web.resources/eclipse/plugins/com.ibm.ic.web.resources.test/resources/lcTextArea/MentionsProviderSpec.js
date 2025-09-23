/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([ "ic-core/lcTextArea/providers/MentionsProvider"
], function(provider) {

   /**
    * Jasmine spec for {@link ic-core.lcTextArea.providers.MentionsProvider}
    * 
    * @module ic-test.lcTextArea.MentionsProviderSpec
    */

   describe("the MentionsProvider module", function() {
      it("the addMentionsFeature() method doesn't throw", function() {
         expect(function() {
            provider.addMentionsFeature();
         }).not.toThrow();
      });
      it("adds the mentions feature to a textarea", function() {
         provider.addMentionsFeature();
      });
   });

});
