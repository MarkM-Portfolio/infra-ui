/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.util.Preferences");
/*
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");

(function(window, document) {
   
   var _store = {},
      _url = lconn.core.url.getServiceUrl(lconn.core.config.services.deploymentConfig) + "/core/user/preferences",
      _persists = true;
   
   function _persist() {
      if (!_persists)
         return;
      dojo.rawXhrPut({
         url: _url,
         putData: dojo.toJson(_store)
      });
   }
   
   lconn.core.util.Preferences = {
      init: function() {
         dojo.xhrGet({
            url: _url,
            handleAs: "json",
            load: function(r, i) {
               _store = r;
            }
         });
      },
      set: function(key, value) {
         _store[key] = dojo.mixin(_store[key]||{}, value);
         _persist();
      },
      get: function(key) {
         return dojo.clone(_store[key]);
      },
      getAll: function() {
         return dojo.clone(_store);
      }
   }
}(window, document));
*/
