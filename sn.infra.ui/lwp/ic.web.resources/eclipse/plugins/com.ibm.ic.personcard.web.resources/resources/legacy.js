/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([ "dojo/_base/lang"// ,
// "ic-communities/bizCard/bizCard_internal",
// "ic-profiles/bizCard/bizCard"
], function(lang, bizCard_internal, bizCard) {

   var legacyModule = lang.getObject("com.ibm.lconn.personcard.legacy", true);
   /**
    * Loads and initializes the business card in legacy mode. This module must
    * be included prior to page load.
    */
   // internal comm bizcards have more functionality than external. So load the
   // internal one for the "legacy"
   return legacyModule;
});
