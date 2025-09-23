/* Copyright IBM Corp. 2016, 2017  All Rights Reserved.                    */

define([
	// no dependency
], function() {

   var events = {
         WIDGET_ADDED_EVENT    : 'ic-core/wp/widgetAdded',
         WIDGET_REMOVED_EVENT  : 'ic-core/wp/widgetRemoved',
         WIDGET_MOVED_EVENT    : 'ic-core/wp/widgetMoved',
         WIDGET_RENAMED_EVENT  : 'ic-core/wp/widgetRenamed',
         WIDGET_ENTERED_FULLPAGE_MODE_EVENT :  'ic-core/wp/enteredFullPageMode',
         WIDGET_ENTERED_SEARCH_MODE_EVENT :  'ic-core/wp/enteredSearchMode',
         OVERVIEW_PAGE_RELOADED_EVENT :  'ic-core/wp/overviewPageReloaded'
   };
   return events;
});