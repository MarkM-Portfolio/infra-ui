/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "../bean/Repository",
  "./FeedDataStore",
  "./util/routes",
  "dojo/when"
], function (declare, lang, Repository, FeedDataStore, routes, when) {

  var loadedRepositories = {};
  
  return declare([FeedDataStore], {
    EntryClass: Repository,
    
    getFileRepository: function () {
      var repositoryId = this.file.get("libraryId"),
        repository;
      
      if (!loadedRepositories[repositoryId]) {
        repository = this.newItem({id: repositoryId});
        loadedRepositories[repositoryId] = repository.load().then(lang.hitch(this, function () {
          return repository;
        }));
      }
      
      return loadedRepositories[repositoryId];
    },
    
    _getLoadUrl: function () {
      return routes.getRepositoryEntryUrl(this.file);
    },
    
    _getNewItemProperties: function () {
      return {}
    }
  });
});
