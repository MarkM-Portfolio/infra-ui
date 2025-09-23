/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2017                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo/_base/lang",
  	  "dojo/request/xhr",
      "ic-core/theme",
      "ic-core/config/properties"
],
   function(lang, xhr, theme, properties) {

      /**
       * Helper object for themes on SmartCloud
       * 
       * @namespace ic-core.themeSmartCloud
       */
      
	  function fetchSmartCloudThemeId(orgId) {
		
		var url = window.location.origin + "/theming/theme/getOrgTheme/" + orgId;
		var xhrArgs = {
			handleAs: "json",
			sync: true
		};

		var resultHolder = {};
		xhr(url, xhrArgs).then(function(data) {
			resultHolder.themeId = data.theme;
		}, function(err){
		    // Handle the error condition
			console.log("Failed to fetch themeid: " + err);
			resultHolder.themeId = "";
		});
		
		return resultHolder.themeId;
	  }


      var themeSmartCloud = {};

      lang.mixin(themeSmartCloud, /** @lends ic-core.themeSmartCloud */
      {         
    	
        /**
         * Returns the current theme id for the specified org
         * 
         * @returns {string} the current theme id
         */
		getThemeIdForOrg: function(orgId) {
			if (properties["DeploymentModel"] === "SmartCloud") {  
				return fetchSmartCloudThemeId(orgId);
			} else {
				// on prem
				return theme.getCurrentThemeId();
			}			
		}
		
      });

      return themeSmartCloud;
   });
