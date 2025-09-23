/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./Bean"
], function (declare, Bean) {

  return declare([Bean], {
    postscript: function () {
      this.inherited(arguments);
      
      var collectionType = this.get("collectionType");
      if (collectionType) {
        if ((collectionType === "community") || (collectionType === "all")) {
          this.set("type", "community");
        } else {
          this.set("type", "folder");
        }
      }
      
      if (this.isCollection()) {
        var sharePermission = this.get("sharePermission");
        if (sharePermission) {
          this.set("permission", sharePermission);
        }
      }
    },
    
    isCollection: function () {
      var type = this.get("type");
      return type === "community" || type === "folder";
    }
  });
});
