/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
        "dojo",
        "dojo/_base/declare",
        "dojo/request/xhr",
        "dojo/Deferred",
        "dojo/_base/lang"
], function(dj, djDeclare, xhr, djDeferred, lang) {
   
   var servicesUtil = {
      _serviceName: "",
      _userId: "",
      _orgId: "", 
      _services: {},
      
      isEnabled: function(serviceName, userId, orgId) {
         console.debug("Check service: " + serviceName + ", userId: " + userId + ", orgId: " + orgId);

         this._serviceName = serviceName || "";
         this._userId = userId || "";
         this._orgId = orgId || "";
         
         var deferred = new djDeferred();
         var dc = lconn.core.config.services.deploymentConfig; 
         var url = (((window.location.protocol||"http").replace(":","")=="https") ? dc.secureUrl : dc.url) + "/myserviceconfigs?format=json";   
         var key = "s:{" + this._serviceName + "},u{" + this._userId + "},o{" + this._orgId + "}";
         console.debug("services url is: " + url + " key is: " + key);
         
         var bindArgs={
            method: "GET",
            handleAs: "json",
            timeout: null,
            sync: false
         };
         
         if (this._services[key])
         {
            deferred.resolve((this._services[key] == "true")? true : false);
            console.debug("Service is found in _services object and the enabled value is " + this._services[key] );
            return deferred.promise;
         }
         
         that = this;
         xhr(url, bindArgs).then(
            function(response) {
               var enabled = that._handleResults(response, serviceName, key);  
               deferred.resolve(enabled);
               
            },
            function(response) {
               var enabled =that._handleError(response);
               deferred.resolve(enabled);
            }            
         ); 
         
         return deferred.promise;
      },
      
      _handleResults: function(data, serviceName, key) {
         console.debug("_handleResults: get response: " + JSON.stringify(data));
         var ret = data[serviceName] ? true : false;
         this._services[key] = ret? "true":"false";
         console.debug("_handleResults retVal is:" + ret);
         return ret;
      },
      
      _handleError: function(err) 
      {
        console.debug("Error when requesting json data" );         
         return false;
      }
      
   };
   
   lang.setObject("lconn.core.util.services", servicesUtil);
   
   return servicesUtil;
   
 })