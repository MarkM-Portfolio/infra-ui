/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2005, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
(function() {
dojo.provide("net.jazz.ajax.ui.internal.PageRegistry");

dojo.require("jazz.core.RegistryFactory");
dojo.require("net.jazz.ajax.toolbox.lang.internal.Lang");

var checkNotNull = net.jazz.ajax.toolbox.lang.checkNotNull;
var sortFunction, defaultPageId, workbenchId;

var PageRegistry = net.jazz.ajax.ui.internal.PageRegistry = {
	getPages: function (removeSuppressed) {
		var pageArray = [];
		
		var suppressedPagesMap = {};
		if (removeSuppressed) {
			dojo.forEach(getSuppressedPages(workbenchId), function(pageId){
				suppressedPagesMap[pageId] = true;
			});
		}
	
		dojo.forEach( getApplicationPagesExtensionPoint().getExtensions(), function(extension) {
			dojo.forEach(extension.getConfigurationElements(), function(configElement) {
				if (configElement.getName() !== "application") { return; }
				var applicationId = configElement.getAttribute("id");
				if (applicationId == workbenchId) {
					var defaultFound = false, defaultSearchFound = false;
					dojo.forEach(configElement.getChildren(), function(childCfgElement) {
						if (childCfgElement.getName() !== "page") { return; }
						var pageId = childCfgElement.getAttribute("id");
						var page = PageRegistry.findPageWithId(pageId);

						if (page != null) {
							var pushPage = true;
							if (suppressedPagesMap[pageId]) {
								pushPage = false;
							} else if (page.removalPropertyId !== null) {
								var removalProperty = dojo.getObject(page.removalPropertyId);
								if (removalProperty && removalProperty === true) {
									pushPage = false;
								}
							}
							if (pushPage) {
								var isDefault = childCfgElement.getAttribute("default");
								if (isDefault === "true") {
									if (defaultFound === true) {
										console.warn("A default page has already been set. Page with an id of ["+pageId+"] will not be set as the default");	
									} else {
										defaultFound = true;	
										page.isDefault = true;							
									}
								}
								var isDefaultSearch = childCfgElement.getAttribute("defaultSearch");
								if (isDefaultSearch === "true") {
									if (defaultSearchFound === true) {
										console.warn("A default search provider has already been set. The provider belonging to the page with an id of ["+pageId+"] will not be set as the default.");
									} else if (page.searchProvider === null) {
										console.warn("The page with id ["+pageId+"] has been marked as the default search provider, but it does not provider one. It will be ignored.");
									} else {
										defaultSearchFound = true;
										page.isDefaultSearch = true;
									}
								}
								page.defaultSearchScope = childCfgElement.getAttribute("defaultSearchScope");
								pageArray.push(page);
							}
						}
					});					
				}
			});		
		});
		
		if(sortFunction){
			pageArray.sort(sortFunction);
		}
		
		return pageArray;
	},
	findPageWithId: function (id) {
		checkNotNull(id, "id");
		
		var matchedPage;
		dojo.forEach( getPageExtensionPoint().getExtensions(), function(extension) {
			dojo.forEach(extension.getConfigurationElements(), function(configElement) {
				if (configElement.getAttribute("id") == id) {
					matchedPage = getPage(extension, configElement);	
				}
			});	
		});	
		return matchedPage;
	},
	isPageInCurrentApplication: function(pageId) {
		var retVal = false;
		dojo.forEach( getApplicationPagesExtensionPoint().getExtensions(), function(extension) {
			dojo.forEach(extension.getConfigurationElements(), function(configElement) {
				if (retVal || configElement.getName() !== "application") { return; }
				var applicationId = configElement.getAttribute("id");
				if (applicationId == workbenchId) {
					dojo.forEach(configElement.getChildren(), function(childCfgElement) {
						if (childCfgElement.getName() !== "page") { return; }
						var id = childCfgElement.getAttribute("id");
						if (id == pageId) {
							retVal = true;
							return;
						}
					});	
				}
			});		
		});
		return retVal;
	},
	getDefaultPage: function() {
		if (defaultPageId) {
			var page = PageRegistry.findPageWithId(defaultPageId);
			if (page) return page;
		}
		var pages = PageRegistry.getPages();
		for (var i = 0; i < pages.length; i++) {
			if (pages[i].isDefault === true) {
				return pages[i];
			}
		}
		return pages[0];
	},
	setDefaultPage: function(id) {
		defaultPageId = id;
	},
	setApplicationId: function(id) {
		workbenchId = id;
	},
	setSortFunction: function(/*Function*/sortFunctionArg){
		if(!dojo.isFunction(sortFunctionArg)){
			throw new Error("PageRegistry#setSortFunction: argument is not a function");
		}
		sortFunction = sortFunctionArg;
	}
};

// Internals

var RegistryFactory = jazz.core.RegistryFactory;

function getPageExtensionPoint() {
	var extensionPoint = RegistryFactory.getRegistry().getExtensionPoint("net.jazz.ajax.pages");
	if(!extensionPoint) throw new Error("Page extension point not found");	
	return extensionPoint;
}

function getApplicationPagesExtensionPoint() {
	var extensionPoint = RegistryFactory.getRegistry().getExtensionPoint("net.jazz.ajax.applicationPageBindings");
	if(!extensionPoint) throw new Error("Application Pages Binding extension point not found");
	return extensionPoint;
}

function getSuppressedPages (workbenchId) {
	//read the suppressedPages global property.  Lives in repo namespace for legacy purposes.
	if(!dojo.getObject("com.ibm.team.repository.web.suppressedPages")) {
		return [];
	}	
	var sp = dojo.getObject("com.ibm.team.repository.web.suppressedPages");
	var suppressedPageSets = (typeof sp == "string") ? dojo.fromJson(sp) : sp;
	var warnMsg = "Invalid format for suppressed pages. Skipping"; //$NON-NLS-1$
	
	if(!dojo.isObject(suppressedPageSets)) {
		console.warn(warnMsg);
		return [];
	}
	var suppressedPageList = suppressedPageSets[workbenchId];
	if (!suppressedPageList) {
		return [];
	}
	var badArray = false;
	if (!dojo.isArray(suppressedPageList)) {
		badArray = true;
	} else {
		for(var i=0; i<suppressedPageList.length; i++) {
			if(!dojo.isString(suppressedPageList[i])) {
				badArray = true;
				break;
			}
		}	
	}
	if(badArray) {
		console.warn(warnMsg);
		return [];
	}
	return suppressedPageList;
}

function getPage(extension, configElement) {
	checkNotNull(extension, "extension");
	checkNotNull(configElement, "configElement");
	checkNotNull(extension.getNamespace(), "extension namespace");
	checkNotNull(configElement.getAttribute("id"), "page id");
	checkNotNull(configElement.getAttribute("name"), "page name");
	
	var page = {
		id: configElement.getAttribute("id"),
		name: configElement.getAttribute("name"),
		href: configElement.getAttribute("href"),
		widget: configElement.getAttribute("widget"),
		componentMenuWidget: configElement.getAttribute("componentMenuWidget"),
		defaultAction: configElement.getAttribute("defaultAction"),
		removalPropertyId: configElement.getAttribute("removalPropertyId"),
		searchProvider: configElement.getAttribute("searchProvider"),
		component: extension.getNamespace(),
		getUri: function() { return "#action=jazz.viewPage&id=" + this.id; },
		actions: [],
		isDefault: false,
		isDefaultSearch: false
	};
	dojo.forEach(configElement.getChildren(), function(childCfgElement) {
		if (configElement.getName() !== "action") {
			return;
		}
		checkNotNull(childCfgElement.id);
		getPage.actions.push({});
	});

	return page;
}
})();