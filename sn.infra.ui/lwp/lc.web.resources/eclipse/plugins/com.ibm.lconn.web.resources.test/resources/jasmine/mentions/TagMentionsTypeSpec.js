/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for {@link lconn.core.widget.mentions.TagMentionsType}
 * 
 * @module lconn.test.jasmine.mentions.TagMentionsTypeSpec
 */
dojo.provide("lconn.test.jasmine.mentions.TagMentionsTypeSpec");

dojo.require("lconn.core.widget.mentions.TagMentionsType");
dojo.require("lconn.core.config.services");
dojo.require("dojox.uuid.generateRandomUuid");

(function(TagMentionsType) {

   describe("the lconn.core.widget.mentions.TagMentionsType", function() {
      var type;
      beforeEach(function() {
         type = new TagMentionsType({
            // FIXME: MentionsType and subclasses require a parentNode with a
            // unique id
            parentNode : dojo.create('div', {
               id : dojox.uuid.generateRandomUuid()
            })
         });
      });
      describe("the interface", function() {
         it("implements the expected methods", function() {
            expect(type.initDefaultDataStore).toEqual(jasmine.any(Function));
            expect(type.initTypeahead).toEqual(jasmine.any(Function));
         });

         it("implements the expected properties", function() {
            expect(type.templateClass).toBe('lconn.core.widget.mentions.TagMentionsNode');
         });
      });

      describe("the initTypeahead() method", function() {
         beforeEach(function() {
            type._typeahead.destroy();
         });
         it("correctly initializes the typeahead", function() {
            type.initTypeahead()
            expect(type._typeahead).not.toBeNull();
            expect(type._typeahead.declaredClass).toBe('lconn.core.CommonTags.CommonTagsTypeAhead');
         });
      });

      describe("the initDefaultDataStore() method", function() {
         var _config_services;
         beforeEach(function() {
            _config_services = lconn.core.config.services;
         });
         afterEach(function() {
            lconn.core.config.services = _config_services;
         });
         it("sets the typeahead data store when activities is enabled", function() {
            lconn.core.config.services.activities = true;
            type.initDefaultDataStore();
            expect(type.typeaheadDataStore).not.toBeNull();
            expect(type.typeaheadDataStore.declaredClass).toBe('lconn.core.TypeAheadDataStore');
         });
         it("doesn't set the typeahead data store when activities is not enabled", function() {
            delete lconn.core.config.services.activities;
            delete type.typeaheadDataStore;
            type.initDefaultDataStore();
            expect(type.typeaheadDataStore).toBeNull();
         });
      });
   })
}(lconn.core.widget.mentions.TagMentionsType));
