/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.lcTextArea.MentionsProviderSpec");
dojo.require("lconn.core.lcTextArea.providers.MentionsProvider");

(function(provider) {
   /**
    * Jasmine spec for {@link lconn.core.lcTextArea.providers.MentionsProvider}
    * 
    * @module lconn.test.jasmine.lcTextArea.MentionsProviderSpec
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
}(lconn.core.lcTextArea.providers));
