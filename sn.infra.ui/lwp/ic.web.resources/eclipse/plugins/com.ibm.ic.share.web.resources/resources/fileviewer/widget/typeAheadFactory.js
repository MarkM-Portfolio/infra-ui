/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/lang",
  "./bhcPeopleTypeAhead",
  "./peopleTypeAhead",
  "./communityTypeAhead"
], function (lang, bhcPeopleTypeAhead, peopleTypeAhead, communityTypeAhead) {
  "use strict";
  
  return {
    createPeopleTypeAhead: function (inputNode, args) {
      if (lang.exists("bhc.PeopleTypeAhead")) {
        return bhcPeopleTypeAhead.create(inputNode, args);
      } else {
        return peopleTypeAhead.create(inputNode, args);
      }
    },
    
    createCommunityTypeAhead: function (inputNode, args) {
      return communityTypeAhead.create(inputNode, args);
    }
  };
});
