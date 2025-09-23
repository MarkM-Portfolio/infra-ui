/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "dojo/dom-construct",
      "dojox/uuid",
      "dojox/uuid/generateRandomUuid",
      "ic-core/config",
      "ic-core/config/services",
      "ic-core/widget/mentions/TagMentionsType",
      "ic-core/TypeAheadDataStore",
      "ic-core/CommonTags/CommonTagsTypeAhead"
], function(domConstruct, uuid, generateRandomUuid, config, services, TagMentionsType, TypeAheadDataStore, CommonTagsTypeAhead) {

   /**
    * Jasmine spec for {@link ic-core.widget.mentions.TagMentionsType}
    * 
    * @module ic-test.mentions.TagMentionsTypeSpec
    */
   describe("the ic-core/widget/mentions/TagMentionsType class", function() {
      var type;
      beforeEach(function() {
         type = new TagMentionsType({
            // FIXME: MentionsType and subclasses require a parentNode with a
            // unique id
            parentNode : domConstruct.create('div', {
               id : generateRandomUuid()
            })
         });
      });

      describe("the interface", function() {
         it("implements the expected methods", function() {
            expect(type.initDefaultDataStore).toEqual(jasmine.any(Function));
            expect(type.initTypeahead).toEqual(jasmine.any(Function));
         });

         it("implements the expected properties", function() {
            expect(type.templateClass).toBe('ic-core/widget/mentions/TagMentionsNode');
         });
      });

      describe("the initTypeahead() method", function() {
         beforeEach(function() {
            type._typeahead.destroy();
         });
         it("correctly initializes the typeahead", function() {
            type.initTypeahead();
            expect(type._typeahead).not.toBeNull();
            expect(type._typeahead instanceof CommonTagsTypeAhead).toBeTruthy();
         });
      });

      describe("the initDefaultDataStore() method", function() {
         var _config_services;
         beforeEach(function() {
            _config_services = services;
         });
         afterEach(function() {
            services = _config_services;
         });
         it("sets the typeahead data store when activities is enabled", function() {
            services.activities = true;
            type.initDefaultDataStore();
            expect(type.typeaheadDataStore).not.toBeNull();
            expect(type.typeaheadDataStore instanceof TypeAheadDataStore).toBeTruthy();
         });
         it("doesn't set the typeahead data store when activities is not enabled", function() {
            delete services.activities;
            delete type.typeaheadDataStore;
            type.initDefaultDataStore();
            expect(type.typeaheadDataStore).toBeNull();
         });
      });
   });
});
