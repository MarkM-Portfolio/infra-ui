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

define([
   "dojo",
   "dojo/_base/lang",
   "dojo/dom",
   "dojo/dom-construct",
   "dojo/json",
   "dojo/dom-class",
   "ic-core/config",
   "ic-core/errorhandling",
   "ic-core/url",
   "ic-core/utilities"
], function (dojo, lang, dom, domConstruct, JSON, domClass, config, errorhandling, urlModule, utilities, searchResults) {

   var widgetUtils = {};

   widgetUtils.handleRefresh = function(url, iContext) {
      var widgetInstanceId = iContext.widgetId,
         // FIXME: remove this global variable
         infoHolder = lang.getObject('refreshInfoHolder');
      if (infoHolder && infoHolder[widgetInstanceId]) url = urlModule.rewrite(url, {
         preventCache: new Date().getTime()
      })
      return url;
   };

   widgetUtils.addVersionNumber = function(url) {
      var version = config.versionStamp;
      if (version) url = urlModule.rewrite(url, {
         etag: version
      });
      return url;
   };

   //FIXME: this is just a wrapper around searchC, rewrite
   widgetUtils.search = function(iContext, component, resultContainerDomNode, ecmLibraryId) {
      /**
       https://w3-connections.ibm.com/wikis/home?lang=en_US#/wiki/Lotus%20Connections%202.5/page/Search%20UI%20Widget%204.5
       https://w3-connections.ibm.com/wikis/home?lang=en_US#/wiki/Lotus%20Connections%202.5/page/API%20documentation
       http://w3.tap.ibm.com/w3ki/display/conndev/Search+Dropdown+Menu
       */

      //TODO remove communities and community_id strings
      try {
         var attributesItemSet = iContext.getiWidgetAttributes();
         var tabId = iContext.widgetId + "_TabItem";
         var tabDOM = dom.byId(tabId);

         var searchKeywords = attributesItemSet.getItemValue("searchKeywords");
         var tagCloudItemValue = attributesItemSet.getItemValue("tagCloudItemValue");
         var resourceId = attributesItemSet.getItemValue("resourceId");
         var userId = iContext.getUserProfile().getItemValue("userid");

         var filterArea = dom.byId("search_searchResults_filterInfo");

         widgetUtils.searchC(component, resultContainerDomNode, searchKeywords, tagCloudItemValue, resourceId, userId, lang.hitch(iContext.io, iContext.io.rewriteURI), ecmLibraryId, filterArea, tabDOM);
      } catch (exception) {
         console.log("exception occurred during widgetUtils.search()");
         console.log(exception);
         errorhandling.DefaultErrorHandler("widgetUtils.search", exception, {
            htmlContainerElemId: resultContainerDomNode
         });
      }
   };
   
   widgetUtils.addClassForWidgetContainer = function(iContext, classname) {
      if (null == iContext)
         return;
      
      // Ideally, iContext should provide helper method to add class for widget container. 
      if (typeof iContext.addClassForWidgetContainer == "function") {
         iContext.addClassForWidgetContainer(classname);
         return;
      }
      
      var el = dom.byId(iContext.getWidgetId() + "Section");
      if (el) {
         domClass.add(el, classname);
      }
   };

   widgetUtils.removeClassForWidgetContainer = function(iContext, classname) {
      if (null == iContext)
         return;
      
      // Ideally, iContext should provide helper method to remove class for widget container. 
      if (typeof iContext.addClassForWidgetContainer == "function") {
         iContext.removeClassForWidgetContainer(classname);
         return;
      }

      var el = dom.byId(iContext.getWidgetId() + "Section");
      if (el) {
         domClass.remove(el, classname);
      } 
   };

   // FIXME: messy, rewrite
   // - The caller should clear the Search results filter area, not this function
   // - The caller should instantiate lconn.search.searchResults
// widgetUtils.searchC = function(component, resultContainerDomNode, searchKeywords, tagCloudItemValue, resourceId, userId, rewriteURI, ecmLibraryId, filterArea, nodeToFocusOn) {
//
//    // Defects: 83230 & 84037.  Check if filterArea node is a registered widget.
//    // If so, deregister, as the search api will always register it.
//    var filterAreaWidget = dijit.byId("search_searchResults_filterInfo");
//    if (filterAreaWidget != null) {
//       var filterAreaNode = dom.byId("search_searchResults_filterInfo");
//       var filterAreaNodeParent = filterAreaNode.parentNode;
//       dijit.byId("search_searchResults_filterInfo").destroy();
//       var filterAreaNodeNew = domConstruct.create("span", {
//          id: "search_searchResults_filterInfo"
//       });
//       filterAreaNodeParent.appendChild(filterAreaNodeNew);
//       filterArea = dom.byId("search_searchResults_filterInfo");
//    }
//
//    var isPublic = !userId; // Check if user is logged in, to provide private results.
//
//    var searchSvcRef = WidgetPlacementConfig.params.searchSvcRef;
//    if (window.debugWidgets) {
//       console.log("widgetUtils.search: searchSvcRef: " + searchSvcRef);
//    }
//
//    if (searchSvcRef) {
//       var url = rewriteURI(searchSvcRef);
//       if (window.debugWidgets) {
//          console.log("widgetUtils.search: url: " + url);
//       }
//
//       var searchString = "";
//       // Use encodeURIComponent on the search term to encode special characters like: ', / ? : @ & = + $ #'
//       // Use encodeURI on everything else.
//       if (searchKeywords) {
//          // FIXME: unused?
//          //var searchKeywordsString = "?query=" + searchKeywords;
//          searchString += encodeURI("?query=") + encodeURIComponent(searchKeywords);
//
//       } else if (tagCloudItemValue) {
//          // escape any front slashes if present.
//          var tagCloudItemValueEscaped = tagCloudItemValue.replace("/", "\\/");
//
//          var constraint = {
//             type: "category",
//             values: ["Tag/" + tagCloudItemValueEscaped]
//          };
//          var tagConstraintString = JSON.stringify(constraint);
//          searchString += "?constraint=" + encodeURIComponent(tagConstraintString);
//       }
//
//       var scopeString = component ? "&scope=" + component : "&scope=communities";
//       searchString += encodeURI(scopeString);
//
//       if (ecmLibraryId) {
//          var ecmLibraryConstraint = {
//             type: "field",
//             id: "FIELD_LIBRARY_DBINTERNAL_UID",
//             values: [ecmLibraryId]
//          };
//          var ecmLibraryConstraintString = "&constraint=" + JSON.stringify(ecmLibraryConstraint);
//          searchString += encodeURI(ecmLibraryConstraintString);
//       }
//
//       if (resourceId) {
//          var social = {
//             type: "community",
//             id: resourceId
//          };
//          var searchResourceIdString = "&social=" + JSON.stringify(social);
//          searchString += encodeURI(searchResourceIdString);
//       }
//
//       if (window.debugWidgets) {
//          console.log("widgetUtils.search: searchString: " + searchString);
//          console.log("widgetUtils.search: isPublic: " + isPublic);
//          console.log("widgetUtils.search: resultContainerDomNode: " + resultContainerDomNode);
//       }
//
//       var showHeading = (!component || component === "communities:content");
//
//       //Defect #88021 - Needed to move this require to in the function instead of at the top.
//       //This search method is only used in communities and the lconn.search.searchrResults class
//       //is already loaded in the communitiesApp.js file, so this is just a sanity check to make
//       //sure it loaded.  We use the dojo["require"] syntax so the js servlet aggregator won't pick
//       //it up and include it by default.
//       // FIXME: if this search method is only used in Communities, why is it defined in lconn.core?
//             window.searchObject = new searchResults({
//          contextRoot: url,
//          isPublic: isPublic,
//          queryString: searchString,
//          resultsDomNode: dom.byId(resultContainerDomNode),
//          filterAreaDomNode: filterArea,
//          showFilters: false,
//          showHeading: showHeading
//       });
//
//       var nodeToFocusOnParam = {
//          focusNode: nodeToFocusOn
//       };
//
//       if (nodeToFocusOn != null && nodeToFocusOn != "undefined") {
//          searchObject.update(nodeToFocusOnParam);
//       } else {
//          searchObject.update();
//       }
//    }
// };

   return widgetUtils;
});
