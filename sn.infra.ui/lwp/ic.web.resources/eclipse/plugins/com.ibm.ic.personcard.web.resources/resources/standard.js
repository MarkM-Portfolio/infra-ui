/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/lang",
      "./link",
      "./scanner"
], function(lang, link, scanner) {

   var standardModule = lang.getObject("com.ibm.lconn.personcard.standard", true);

   /**
    * Declare a dependency on this module to enable the Connections Profiles
    * person card. The module will only be enabled when Profiles is enabled. Do
    * not declare a dependency on this module - use
    * com.ibm.lconn.personcard.enable instead.
    */

   return standardModule;
});
