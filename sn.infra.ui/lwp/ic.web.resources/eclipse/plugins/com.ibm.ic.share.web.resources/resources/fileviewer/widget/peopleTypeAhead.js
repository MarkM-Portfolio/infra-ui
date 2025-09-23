/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/lang",
  "../config/globals",
  "../data/util/routes"
], function (lang, globals, routes) {
  "use strict";
  
  return {
    create: function (inputNode, args) {
      var typeaheadArgs = {
        id : inputNode.id + "people",
        minChars : 2,
        searchDelay : 400,
        multipleValues : false,
        store : this._getDefaultDataStore(args.file),
        role: "combobox"
      };
      
      lang.mixin(typeaheadArgs, args);
      
      var typeahead = new globals.PeopleTypeAhead(typeaheadArgs, inputNode);
      
      return typeahead;
    },
    
    _getDefaultDataStore: function (file) {
      var osParams = {
        sK : "relevanceByName",
        count : 15,
        internalOnly : !file.isExternal
      };
      
      var _filesRoutes = routes.getFilesAppRoutes(file);
      
      var typeaheadFeed = _filesRoutes.getActiveTypeAheadUserServiceUrl();
      var extendedTypeAheadFeed = _filesRoutes.getActiveTypeAheadUserServiceUrl();
      return new globals.HybridPeopleDataStoreOpenSocial({
        url: typeaheadFeed,
        queryParam: "searchString",
        extendedTypeAheadUrl: extendedTypeAheadFeed,
        extendedQueryParam: "searchString",
        openSocialParameters: osParams
      });
    }
  };
});
