/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/lang",
      "dojo/data/ItemFileReadStore",
      "./page",
      "ic-core/LanguageSelector",
      "ic-core/header",
      "ic-core/utilities",
      "ic-ui/layout/DeferredAction",
      "ic-ui/layout/widget/ActionBar",
      "ic-ui/layout/widget/LocationBar",
      "ic-ui/layout/widget/NavigationTree",
      "ic-ui/layout/widget/Search"
], function(lang, ItemFileReadStore, page, LanguageSelector, header, utilities, DeferredAction, ActionBar, LocationBar, NavigationTree, Search) {

   return lang.getObject("com.ibm.lconn.layout.standard", true);
});
