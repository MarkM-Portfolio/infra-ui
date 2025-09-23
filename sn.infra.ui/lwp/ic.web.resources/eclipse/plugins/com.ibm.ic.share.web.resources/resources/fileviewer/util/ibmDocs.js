/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/array",
  "../config/globals",
  "dojo/_base/lang"
], function (array, globals, lang) {

  var FILES_DOCS_IDS = ["00000000-0000-0000-0001-000000000000", "00000000-00000-0000-0001-00000000000000"];

  function isActionAllowed(action) {
    var actionAllowed = lang.getObject("lconn.share.config.actionConfig.isActionAllowed");
    if (lang.isFunction(actionAllowed)) {
      return actionAllowed(FILES_DOCS_IDS[0], null, action);
    }
    return false;
  }
  
  return {
    isDocsFile: function (file) {
      var typeId = file.get("objectTypeId");
      return array.indexOf(FILES_DOCS_IDS, typeId) !== -1;
    },
    
    isDocsEnabled: function () {
      return globals.entitlements.getDocsDfd();
    },
    
    isRestoreEnabled: function () {
      return isActionAllowed("restoreVersion");
    },
    
    isUploadNewVersionEnabled: function () {
      return isActionAllowed("uploadNewVersion");
    }
  };
});
