/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/lang",
  "../config/globals",
  "dojo/aspect",
  "dojo/_base/array",
  "dojo/i18n!../nls/FileViewerStrings",
  "../data/util/routes"
], function (lang, globals, aspect, array, i18n, routes) {
  "use strict";
  
  return {
    
    create: function (inputNode, args) {
      var typeaheadArgs = {
        id: inputNode.id + "people",
        minChars: 2,
        searchDelay: 400,
        multipleValues: false,
        disableSearchDirectory: !!lang.getObject("lconn.files.config.isCloudMode"),
        store: this._getDefaultDataStore(args.file)
      };
      
      lang.mixin(typeaheadArgs, args);
      
      var typeahead = new globals.PeopleTypeAhead(typeaheadArgs, inputNode);
      
      if (typeahead.store && lang.isFunction(typeahead.store.clear)) {
        typeahead.store.clear();
      }

      aspect.before(typeahead, "_openResultList", function (data, keywordArgs) {
        if (data.entry) {
          data = data.entry;
          array.forEach(data, function (entry) {
            entry.name = entry.title;
          });
        }
        return [data, keywordArgs];
      });

      typeahead.textbox.value = i18n.TYPEAHEAD_BOX.COMMUNITY_SHADOW;
      typeahead.hintText = i18n.TYPEAHEAD_BOX.COMMUNITY_SHADOW;
      typeahead.searchDirectory = i18n.TYPEAHEAD_BOX.COMMUNITY_FULL_SEARCH;
      
      return typeahead;
    },
    
    _getDefaultDataStore: function (file) {
      var osParams = {
        filterBy : "displayName",
        count : 15,
        internalOnly : file.isExternal
      };

      var _filesRoutes = routes.getFilesAppRoutes(file);
      var opt = {};
      
      var typeaheadFeed = _filesRoutes.getCommunitiesListServiceUrl(opt);
      var extendedTypeAheadFeed = _filesRoutes.getCommunitiesListServiceUrl(opt);

      if (!file.get("isExternal")) {
        typeaheadFeed += "?internalOnly=true";
        extendedTypeAheadFeed += "?internalOnly=true";
      }

      return new globals.TypeAheadDataStore({
        url: typeaheadFeed,
        queryParam: "filterValue",
        extendedTypeAheadUrl: extendedTypeAheadFeed,
        extendedQueryParam: "filterValue",
        openSocialParameters: osParams
      });
    }
  };
});
