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
dojo.provide("net.jazz.ajax.ui.PageList");

dojo.require("dijit._Widget");
dojo.require("net.jazz.ajax.core.internal.util");
dojo.require("net.jazz.ajax.toolbox.lang.internal.Lang");
dojo.require("net.jazz.ajax.ui.internal.PageRegistry");
dojo.require("net.jazz.ajax.ui.PlatformUI");

var checkNotNull = net.jazz.ajax.toolbox.lang.checkNotNull;
var PageRegistry = net.jazz.ajax.ui.internal.PageRegistry;
var events = net.jazz.ajax.internal.events;
var menuNames = [];
 
dojo.declare("net.jazz.ajax.ui.PageList", dijit._Widget, {
	
	// summary:
	//		unordered list of links for the pages in the current application.
	// description:
	//		This widget contains no public methods; simply instantiate it and
	//		place it within a Jazz Framework-based application. See
	//		resources/ui/PageList.css for information on styling the PageList.
	// since:
	//		0.6
	
	//
	// Internal and lifecycle methods
	//
	
	"class": "net-jazz-ajax-PageList",
	
	menuPopupConstructor: null,	//pass in the jazz.ui.MenuPopup constructor
	
	postCreate: function() {
		net.jazz.ajax.ui.PlatformUI.getWorkbench()._pageList = this;
		this.subscribe(events.setPageDirty, this._setPageDirty);
		this._labelsById = {};
		this._reload();
	},
	overridePageName: function(/* index|pageId */arg, name) {
		if (typeof arg == "string") {
			var page = PageRegistry.findPageWithId(arg);
		} else if (typeof arg == "number") {
			page = PageRegistry.getPages(true)[arg];
		}
		var span = this._labelsById[page.id];
		if (span) {
			span.innerHTML = name;
			return true;
		} else {
			return false;
		}
	},
	_reload: function() {
		dojo.empty(this.domNode);
		this._menuPopupsById = {};
		var pages = PageRegistry.getPages(true);
		// create the list and link elements
		dojo.forEach(pages, dojo.hitch(this,function(page) {
			this._addPage(page);
		}));
		if (menuNames.length) {
			jazz.core.loader.batch_load_async(menuNames, function(){});
		}
	},
	
	_addPage: function(page) {
		this.domNode.appendChild(this._createPageLink(page));
	},
	
	_createPageLink: function(page) {
		checkNotNull(page, "page");
		var linkElement = dojo.create("a", {
			href: page.getUri()
		});
		linkElement.__jazzPageId = page.id;
		var span = dojo.create("span");
		linkElement.appendChild(span);
		span.appendChild(document.createTextNode(page.name));
		this._labelsById[page.id] = span;
		if (page.componentMenuWidget && this.menuPopupConstructor) {
			var loaded = false;
			var menuPopup = new this.menuPopupConstructor({
				menuProvider: function(menuPopup) {
					var menu = dojo.getObject(page.componentMenuWidget);
					if (!menu && !loaded) {
						var deferred = new dojo.Deferred();
						jazz.core.loader.load_async(page.componentMenuWidget, function() {
							menu = dojo.getObject(page.componentMenuWidget);
							deferred.callback();
							loaded = true;
						});
						return deferred;
					} else if (menu) {
						return new menu();
					}
				}, 
				menuClass:"jazz-app-Navbar-menu",
				injectCaret: true,
				cacheMenu: true,
				label: page.name,
				group: "jazz-app-Navbar"
			}, linkElement);
			this._menuPopupsById[page.id] = menuPopup;
			menuNames.push(page.componentMenuWidget);
			return menuPopup.domNode;
		}
		return linkElement;
	},
	_setPageDirty: function(pageId, dirty) {
		if (pageId && this._menuPopupsById[pageId]) {
			this._menuPopupsById[pageId].setDirty(dirty);
		}
	},
	
	_selectPage: function(page) {
		// summary:
		//		Marks the page link for 'id' as selected, and deselects other
		//      page links.
		// id:
		//		The id of the page to select.
		if (!page || !dojo.isString(page.id)) {
			throw new Error("PageList#_handleViewPage: Illegal Argument");
		}
		dojo.forEach(this.domNode.getElementsByTagName("A"), function(link) {
			dojo.toggleClass(link, "selected", link.__jazzPageId === page.id);
		});
	},
	_deselectCurrentPage: function() {
		dojo.forEach(this.domNode.getElementsByTagName("A"), function(link) {
			dojo.removeClass(link,"selected");
		});
	}
});

})();