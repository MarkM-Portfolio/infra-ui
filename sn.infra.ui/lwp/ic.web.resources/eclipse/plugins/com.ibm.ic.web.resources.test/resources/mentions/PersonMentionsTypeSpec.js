/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/dom-construct",
   "ic-core/widget/mentions/PersonMentionsType",
   "ic-core/config/services",
   "ic-core/url"
], function (domConstruct, PersonMentionsType, services, url) {

   
   /**
    * Jasmine spec for {@link ic-core.widget.mentions.PersonMentionsType}
    *
    * @module ic-test.mentions.PersonMentionsTypeSpec
    */
   var args = {
      parentNode : domConstruct.create('span', {id: "testSpanNode"}),
      network: {}
   };

   describe("the ic-core/widget/mentions/PersonMentionsType class", function() {
      var node;
      beforeEach(function() {
         node = new PersonMentionsType(args);
      });
      afterEach(function() {
         node.cleanUp();
      });
      it("implements the expected methods", function() {
         expect(node.initDefaultDataStore).toEqual(jasmine.any(Function));
         expect(node.initTypeaheadArgs).toEqual(jasmine.any(Function));
         expect(node.initTypeahead).toEqual(jasmine.any(Function));
         expect(node.cleanUp).toEqual(jasmine.any(Function));
      });

      it("implements the expected properties", function() {
         expect(node._type).toBeDefined();
         expect(node._activatorChar).toBeDefined();
         expect(node.templateClass).toBeDefined();
         expect(node.isPersonAndGroup).toBeDefined();
         expect(node.noResultsMsg).toBeDefined();
         expect(node.headerMsg).toBeDefined();
         expect(node.disableSearchDirectory).toBeDefined();
         expect(node.disableBizCard).toBeDefined();

         expect(node._type).toBe("PersonMentionsType");
         expect(node._activatorChar).toBe("@");
         expect(node.templateClass).toBe("lconn.core.widget.mentions.PersonMentionsNode");
         expect(node.isPersonAndGroup).toBeFalsy();
         expect(node.disableSearchDirectory).toBeFalsy();
         expect(node.disableBizCard).toBeFalsy();
         expect(node.noResultsMsg).toBe('');
         expect(node.headerMsg).toBe('');
      });
   });

   describe("the ic-core/widget/mentions/PersonMentionsType.initDefaultDataStore() method", function() {
      var node, _search;
      beforeEach(function() {
         _search = PersonMentionsType.SEARCH_URL;
      });
      
      afterEach(function() {
         node.cleanUp();
         PersonMentionsType.SEARCH_URL = _search;
         _search = undefined;
      });

      it("uses HybridPeopleDataStoreOpenSocial as the default data store", function() {
         node = new PersonMentionsType(args);
         expect(node.typeaheadDataStore.declaredClass).toBe('lconn.core.HybridPeopleDataStoreOpenSocial');
      });

      it("uses the anonymous service as the default TA feed", function() {
         node.initDefaultDataStore();
         expect(node._typeaheadFeed).toBe(url.getServiceUrl(services.search) + '/anonymous/people/typeahead');
         expect(node._extendedTypeAheadFeed).toBe(url.getServiceUrl(services.opensocial) + '/anonymous/rest/people/@public/@all');
      });

      it("uses oauth service when network oauth defined as the TA feed", function() {
         node.network = {oauth : true};
         node.initDefaultDataStore();
         expect(node._typeaheadFeed).toBe(url.getServiceUrl(services.search) + '/oauth/people/typeahead');
         expect(node._extendedTypeAheadFeed).toBe(url.getServiceUrl(services.opensocial) + '/oauth/rest/people/@public/@all');
      });

      it("uses PeopleDataStoreOpenSocial as data store when services.search is NOT defined", function() {
         delete PersonMentionsType.SEARCH_URL;
         node = new PersonMentionsType(args);
         expect(node.typeaheadDataStore.declaredClass).toBe('lconn.core.PeopleDataStoreOpenSocial');
      });

      it("uses anonymous opensocial service when services.search is NOT defined", function() {
         delete PersonMentionsType.SEARCH_URL;
         node = new PersonMentionsType(args);
         expect(node._typeaheadFeed).toBe(url.getServiceUrl(services.opensocial) + '/anonymous/rest/people/@public/@all');
      });

      it("uses oauth opensocial service when services.search is NOT defined", function() {
         delete PersonMentionsType.SEARCH_URL;
         args.network = {oauth : true};
         node = new PersonMentionsType(args);
         expect(node._typeaheadFeed).toBe(url.getServiceUrl(services.opensocial) + '/oauth/rest/people/@public/@all');
      });

      it("allows the search URL to be overridden", function() {
         PersonMentionsType.SEARCH_URL = "http://foo.com/bar/proxy/search";
         PersonMentionsType.OPENSOCIAL_URL = "http://foo.com/bar/proxy/connections/opensocial";
         
         var node = new PersonMentionsType({
            parentNode : dojo.create('span', {id: "testSpanNode"}),
            network: {}
         });
         
         node.initDefaultDataStore();
         expect(node._typeaheadFeed).toBe("http://foo.com/bar/proxy/search/anonymous/people/typeahead");
         expect(node._extendedTypeAheadFeed).toBe("http://foo.com/bar/proxy/connections/opensocial/anonymous/rest/people/@public/@all");
         
         node.cleanUp();
      });
   });

});
