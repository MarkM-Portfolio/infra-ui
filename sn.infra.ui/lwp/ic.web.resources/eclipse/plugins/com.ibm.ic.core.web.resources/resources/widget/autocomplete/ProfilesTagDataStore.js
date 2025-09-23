/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "ic-core/widget/autocomplete/TagDataStore"
], function(declare, TagDataStore) {

   var ProfilesTagDataStore = declare("lconn.core.widget.autocomplete.ProfilesTagDataStore", TagDataStore, {
      getValue : function(item, attr, defaultValue) {
         if (attr == "name")
            return item.name;
         return defaultValue;
      }
   });
   return ProfilesTagDataStore;
});
