/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "../network/request",
  "dojo/when",
  "../data/util/routes"
], function (declare, lang, request, when, routes) {
  return declare([], {
    
    constructor: function (file) {
      this.file = file;
    },
    
    checkAccess: function (user) {
      return when(this._checkAccess(user));
    },
    
    _checkAccess: function (user) {
      return when(this.file.get("entry")).then(lang.hitch(this, function(file) {
        if (file.get("visibility") === "public") {
          return true;
        }
        
        return request(routes.getAclValidationUrl(file), {
          method: "HEAD",
          noStatus: true,
          headers: {"X-LCONN-USER": user.id}
        }).then(lang.hitch(this, function (response) {
          return true;
        }), lang.hitch(this, function (error) {
          return false;
        }));
      }));
    }
  });
});
