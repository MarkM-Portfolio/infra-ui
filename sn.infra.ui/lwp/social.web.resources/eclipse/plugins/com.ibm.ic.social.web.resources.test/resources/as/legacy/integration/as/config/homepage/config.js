/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([], function () {

	window.activityStreamConfig = {
		// These default values will be used whenever a filter + view combination
		// does not populate all the templates available in the urlTemplate property.
		defaultUrlTemplateValues: {
			userId: "@me",
			groupId: "@all",
			appId: "@all"
		},
	
		// List of available views
		views: {
			// Feed item
			imFollowing: {
				extensions: ["com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension"],
				params:{
					userId: "@me"
				},
				// Filters available for this feed
				filters: {
					// Label to be shown for this filter
					label: "Show:",
					// List of options available for this filter
					options:{
						all: {
							// URL part for this filter
							params:{
								appId: "@all"
							},
							// Label for this filter to 
							// be shown in the dropdown
							label: "All Types"
						}
					}
				}
			}
		},
	
		// Empty object (for now) depicting the share box. In future we may 
		// want to populate it with event names that it should call to open
		// the share box etc
		shareBox: {},
		
		// Empty object (for now) depicting the embedded experience gadget.
		// If you don't want to have the EE for your activity stream, remove
		// this property altogether (e.g. comment it out).
		embeddedExp: {},
		
		// string path of handler you want to use for paging
		pagingHandlerClass: "com.ibm.social.as.paging.PagingHandler",
		
		// Factory that will be used to create news items dijits
		newsItemFactoryClass: "com.ibm.social.as.item.manager.NewsItemFactory",
			
		// Manager that determines the type of news items created
		newsItemManagerClass: "com.ibm.social.as.item.manager.NewsItemManager"
	};
	return com.ibm.social.test.integration.as.config.homepage.config;
});
