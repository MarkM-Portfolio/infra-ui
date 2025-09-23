/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/lang",
      "ic-core/util/jsonCompat",
      "../services/people_container"// ,
      // "ic-sharebox/_dialog_utils"
], function(lang, jsonCompat, people_container, _dialog_utils) {

   /**
    * File is responsible for loading iRuntimeBundle
    */
   /* Deal with odd IE issues */
   /* Must be required first */
   /* Pull in for ibm.connections.sharedialog feature */
   /* Pull in iRuntime code */
   // dojo.require('com.ibm.lconn.gadget.resources._iRuntimeModule_');
   return lang.getObject("com.ibm.lconn.gadget.resources.iRuntimeModule", true);
});
