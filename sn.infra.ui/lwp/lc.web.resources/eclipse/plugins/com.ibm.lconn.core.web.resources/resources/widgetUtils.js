/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.widgetUtils");

dojo.require("lconn.core.utilities");
dojo.require("lconn.core.url");
dojo.require("lconn.core.errorhandling");
dojo.require("lconn.core.config");

lconn.core.widgetUtils.handleRefresh = function(url, iContext) {
   var widgetInstanceId = iContext.widgetId,
      // FIXME: remove this global variable
      infoHolder = dojo.getObject('refreshInfoHolder');
   if (infoHolder && infoHolder[widgetInstanceId]) url = lconn.core.url.rewrite(url, {
      preventCache: new Date().getTime()
   })
   return url;
};

lconn.core.widgetUtils.addVersionNumber = function(url) {
   var version = lconn.core.config.versionStamp;
   if (version) url = lconn.core.url.rewrite(url, {
      etag: version
   });
   return url;
};

//FIXME: this is just a wrapper around searchC, rewrite
lconn.core.widgetUtils.search = function(iContext, component, resultContainerDomNode, ecmLibraryId) {
   /**
    https://w3-connections.ibm.com/wikis/home?lang=en_US#/wiki/Lotus%20Connections%202.5/page/Search%20UI%20Widget%204.5
    https://w3-connections.ibm.com/wikis/home?lang=en_US#/wiki/Lotus%20Connections%202.5/page/API%20documentation
    http://w3.tap.ibm.com/w3ki/display/conndev/Search+Dropdown+Menu
    */

   //TODO remove communities and community_id strings
   try {
      var attributesItemSet = iContext.getiWidgetAttributes();
      var tabId = iContext.widgetId + "_TabItem";
      var tabDOM = dojo.byId(tabId);

      var searchKeywords = attributesItemSet.getItemValue("searchKeywords");
      var tagCloudItemValue = attributesItemSet.getItemValue("tagCloudItemValue");
      var resourceId = attributesItemSet.getItemValue("resourceId");
      var userId = iContext.getUserProfile().getItemValue("userid");

      var filterArea = dojo.byId("search_searchResults_filterInfo");

      lconn.core.widgetUtils.searchC(component, resultContainerDomNode, searchKeywords, tagCloudItemValue, resourceId, userId, dojo.hitch(iContext.io, iContext.io.rewriteURI), ecmLibraryId, filterArea, tabDOM);
   } catch (exception) {
      console.log("exception occurred during lconn.core.widgetUtils.search()");
      console.log(exception);
      lconn.core.errorhandling.DefaultErrorHandler("lconn.core.widgetUtils.search", exception, {
         htmlContainerElemId: resultContainerDomNode
      });
   }
};

// FIXME: messy, rewrite
// - The caller should clear the Search results filter area, not this function
// - The caller should instantiate lconn.search.searchResults
lconn.core.widgetUtils.searchC = function(component, resultContainerDomNode, searchKeywords, tagCloudItemValue, resourceId, userId, rewriteURI, ecmLibraryId, filterArea, nodeToFocusOn) {

   // Defects: 83230 & 84037.  Check if filterArea node is a registered widget.  
   // If so, deregister, as the search api will always register it.
   var filterAreaWidget = dijit.byId("search_searchResults_filterInfo");
   var filterAreaNode = dojo.byId("search_searchResults_filterInfo");
   if (filterAreaWidget != null && filterAreaNode != null) {
      var filterAreaNodeParent = filterAreaNode.parentNode;
      filterAreaWidget.destroy();
      var filterAreaNodeNew = dojo.create("span", {
         id: "search_searchResults_filterInfo"
      });
      filterAreaNodeParent.appendChild(filterAreaNodeNew);
      filterArea = filterAreaNodeNew;
   } else if(filterAreaWidget != null) {
      filterAreaWidget.destroy();
   }
   
   if(filterArea == null) {
      filterArea = dojo.create("span", {
         id: "search_searchResults_filterInfo"
      });
   }

   var isPublic = !userId; // Check if user is logged in, to provide private results.

   var searchSvcRef = WidgetPlacementConfig.params.searchSvcRef;
   if (window.debugWidgets) {
      console.log("lconn.core.widgetUtils.search: searchSvcRef: " + searchSvcRef);
   }

   if (searchSvcRef) {
      var url = rewriteURI(searchSvcRef);
      if (window.debugWidgets) {
         console.log("lconn.core.widgetUtils.search: url: " + url);
      }

      var params = {};
      
      if (searchKeywords) {
         params.query = searchKeywords;
      } 
      if (tagCloudItemValue || this.selectedTags != null) {
    	  
     	 var tags;
     	 if (this.selectedTags != null) {
            for (var i = 0; i < this.selectedTags.length; i++) {
               this.selectedTags[i] = this.selectedTags[i].replace("/", "\\/");
            }
     		  tags = this.selectedTags;
     	 } else {
 	         // escape any front slashes if present.
 	         var tagCloudItemValueEscaped = tagCloudItemValue.replace("/", "\\/");
 	
 	         // create a constraint per tag to achieve 'and' behavior
 	         tags = tagCloudItemValueEscaped.split(',');
     	 }
          for (var i = 0; i < tags.length; i++) {
         	 var tag = tags[i];
          
 	         var constraint = {
 	            type: "category",
 	            values: ["Tag/" + tag]
 	         };
 	         var tagConstraintString = dojo.toJson(constraint);
 	         if (params.constraint) {
 	        	 params.constraint.push(tagConstraintString);
 	         } else {
 	        	 params.constraint = [tagConstraintString];
 	         }
 	     }
       }

      if (this.selectedPeople != null) {
          for (var i = 0; i < this.selectedPeople.length; i++) {
          	 var person = this.selectedPeople[i];
 	         var constraint = {
 	            type: "category",
 	            values: ["Person/" + person]
 	         };
 	         var constraintString = dojo.toJson(constraint);
 	         if (params.constraint) {
 	        	 params.constraint.push(constraintString);
 	         } else {
 	        	 params.constraint = [constraintString];
 	         }
          }
       }

      params.scope = component ? component : "communities";

      if (ecmLibraryId) {
         var ecmLibraryConstraint = {
            type: "field",
            id: "FIELD_LIBRARY_DBINTERNAL_UID",
            values: [ecmLibraryId]
         };
         var ecmLibraryConstraintString = dojo.toJson(ecmLibraryConstraint);
         if (params.constraint) {
        	 params.constraint.push(ecmLibraryConstraintString);
         } else {
        	 params.constraint = [ecmLibraryConstraintString];
         }
      }

      if (resourceId) {
         var social = {
            type: "community",
            id: resourceId
         };
         params.social = dojo.toJson(social);
      }
      
      var searchString = lconn.core.url.writeParameters(params);

      if (window.debugWidgets) {
         console.log("lconn.core.widgetUtils.search: searchString: " + searchString);
         console.log("lconn.core.widgetUtils.search: isPublic: " + isPublic);
         console.log("lconn.core.widgetUtils.search: resultContainerDomNode: " + resultContainerDomNode);
      }

      var showHeading = (!component || component === "communities:content");

      //Defect #88021 - Needed to move this require to in the function instead of at the top.
      //This search method is only used in communities and the lconn.search.searchrResults class
      //is already loaded in the communitiesApp.js file, so this is just a sanity check to make
      //sure it loaded.  We use the dojo["require"] syntax so the js servlet aggregator won't pick
      //it up and include it by default.
      //This search method is only used in Communities, but is defined in lconn.core
      //because the widgets for the various apps call it.
      dojo["require"]("lconn.search.searchResults");

      window.searchObject = new lconn.search.searchResults({
         contextRoot: url,
         isPublic: isPublic,
         queryString: searchString,
         resultsDomNode: dojo.byId(resultContainerDomNode),
         filterAreaDomNode: filterArea,
         showFilters: false,
         showHeading: showHeading
      });

      var nodeToFocusOnParam = {
         focusNode: nodeToFocusOn
      };

      if (nodeToFocusOn != null && nodeToFocusOn != "undefined") {
         searchObject.update(nodeToFocusOnParam);
      } else {
         searchObject.update();
      }
      
      if (!lconn.core.widgetUtils.haveRegisteredTagChangeCallback) {
	      searchObject.registerTagChange(function(allTags, changedTag, wasRemoved) {
	    	  if (window.debugWidgets) {
	    		 console.log("lconn.core.widgetUtils.tagChange callback called. All tags: " + allTags.join());
	          }
	    	  
	    	  // Update url
	    	  lconn.core.widgetUtils.updateHashParam('tag', allTags);
	    	  
	    	  lconn.core.widgetUtils.selectedTags = allTags;
	      });
	      lconn.core.widgetUtils.haveRegisteredTagChangeCallback = true;
	      
	      require(["dojo/topic"],
	    		  function(topic) {
		    		  topic.subscribe("search/person/changed", function(selectedPeople){
		    	    	  if (window.debugWidgets) {
	    		    		 console.log("Search selected person changed.  Current value: " + selectedPeople.join());
	    		          }
	    		    	  
		    	    	  // Update url
		    	    	  lconn.core.widgetUtils.updateHashParam('person', selectedPeople);
	    		    	  
	    		    	  lconn.core.widgetUtils.selectedPeople  = selectedPeople;
	    		  });
		  });
      }
   }

   if (typeof lconn.core.widgetUtils.selectedTags == 'undefined') {
	   lconn.core.widgetUtils.haveRegisteredTagChangeCallback = false;   
	   
	   lconn.core.widgetUtils.selectedTags = null;
	}
};


lconn.core.widgetUtils.updateHashParam = function(paramName, paramValues) {
	  var hash = lconn.core.utilities.getHash();
	  var hashParams = lconn.core.url.getRequestParameters('/index?'+hash);
	  if (paramValues.length == 0) {
		  delete hashParams[paramName];
	  } else {
		  hashParams[paramName] = paramValues.join();	    		    	  
	  }
	  var updatedHash=lconn.core.url.writeParameters(hashParams);
	  window.location.hash = updatedHash.substring(1);

};

lconn.core.widgetUtils.addClassForWidgetContainer = function(iContext, classname) {
   if (null == iContext)
      return;
   
   // Ideally, iContext should provide helper method to add class for widget container. 
   if (typeof iContext.addClassForWidgetContainer == "function") {
      iContext.addClassForWidgetContainer(classname);
      return;
   }
   
   var el = dojo.byId(iContext.getWidgetId() + "Section");
   if (el) {
      dojo.addClass(el, classname);
   }
};

lconn.core.widgetUtils.removeClassForWidgetContainer = function(iContext, classname) {
   if (null == iContext)
      return;
   
   // Ideally, iContext should provide helper method to remove class for widget container. 
   if (typeof iContext.addClassForWidgetContainer == "function") {
      iContext.removeClassForWidgetContainer(classname);
      return;
   }

   var el = dojo.byId(iContext.getWidgetId() + "Section");
   if (el) {
      dojo.removeClass(el, classname);
   } 
};
