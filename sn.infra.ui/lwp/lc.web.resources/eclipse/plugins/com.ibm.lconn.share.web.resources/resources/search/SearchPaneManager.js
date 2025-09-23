/* Copyright IBM Corp. 2016  All Rights Reserved.              */

dojo.provide("lconn.share.search.SearchPaneManager");

dojo.require("ic-search.searchPanel.SearchPaneManager");
dojo.require("ic-ui.layout.insights.NewRelic");
dojo.require("ic-ui.layout.insights.tracker");
dojo.require("lconn.core.config.features");
dojo.require("lconn.core.quickResults.QuickResultsService");
dojo.require("lconn.core.peopleFinder.directory.PeopleFinderService");
dojo.require("lconn.share.search.PeopleFinderService");

/**
 * Override of ic-search/searchPanel/SearchPaneManager
 * to support Files by Person scope.
 * 
 * IMPORTANT: for Files use only.
 * 
 * @class lconn.share.search.SearchPaneManager
 * @extends lconn.search.searchPanel.SearchPaneManager
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
(function() {
	
   if (typeof lconn.search == "undefined" || typeof lconn.search.searchPanel == "undefined") {
      // this is the case when this source code is used in dojo 1.5, means dojo that does not support AMD
      // in this case lconn.search.searchPanel.SearchPaneManager just can not be successfully loaded
      return;
   }
   
	var Tracker = com.ibm.lconn.layout.insights.tracker.getInstance("search");
	if(!lconn.core.config.features("search-panel-ui-insights")) {
		Tracker = {
			track: function() {}
		}
	}
	
	dojo.declare(
		"lconn.share.search.SearchPaneManager",
		[lconn.search.searchPanel.SearchPaneManager], /** @lends lconn.share.search.SearchPaneManager.prototype */
	{
		postCreate: function() {
			this._initServices();
			var tmpServices = this.servicesList;
			this.servicesList = [];
			for(var i=0; i < tmpServices.length; i++) {
				var service = tmpServices[i];
				if(lconn.core.peopleFinder.directory.PeopleFinderService.prototype.isPrototypeOf(service)) {
					service.destroy();
					service = new lconn.share.search.PeopleFinderService({
						isFocusable: true,
						SEARCH_PANE_COUNT_ID: "PEOPLE_FINDER_ANNOUNCEMENT"
					});
					service.startup();
					this.connect(service, "entryClicked", function(widget, evt) {
						if(evt.currentTarget && evt.currentTarget.href && evt.currentTarget.href.match(/^mailto:/i)) {
							Tracker.track("panel.clickPFMail", {
								confidence: widget.confidence
							});
						} else {
							Tracker.track("panel.clickPFEntry", {
								confidence: widget.confidence
							});
						}
					});
					this.connect(service, "entrySelected", "onPersonClick");
				}
				
				this.servicesList.push(service);
			}
			
			this.inherited(arguments);
		},
		
		/**
		 * Callback triggered once a click occurs on a Person
		 * in "Files belonging to..." section of the panel
		 * 
		 * @see com.ibm.social.personcard.widget.PersonWidget
		 * @param {Object} personWidget
		 * @param {Event} evt
		 */
		onPersonClick: function(personWidget, evt) {
			// Callback - nothing here
			this.searchPane.hide();
		}
	});
})();