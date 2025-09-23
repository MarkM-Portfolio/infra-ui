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
dojo.provide("net.jazz.ajax.ui.Workbench");

var load_async = dojo.require("jazz.core.loader").load_async;
dojo.require("net.jazz.ajax.contextRoot");
dojo.require("net.jazz.ajax.core.internal.util");
dojo.require("net.jazz.ajax.toolbox.lang.internal.Lang");
dojo.require("net.jazz.ajax.ui.ActionRegistry");
dojo.require("net.jazz.ajax.ui.ResourceRegistry");
dojo.require("net.jazz.ajax.ui.internal.PageRegistry");

dojo.require("dojo.i18n"); 
dojo.require("dojo.hash");
dojo.requireLocalization("net.jazz.ajax.ui.internal", "JAFMessages");

var messages;

var ActionRegistry = net.jazz.ajax.ui.ActionRegistry;
var PageRegistry = net.jazz.ajax.ui.internal.PageRegistry;
var ResourceRegistry = net.jazz.ajax.ui.ResourceRegistry;

var callContributedCode = net.jazz.ajax.core.internal.util.callContributedCode;
var checkNotEmpty = net.jazz.ajax.toolbox.lang.checkNotEmpty;
var checkNotNull = net.jazz.ajax.toolbox.lang.checkNotNull;

var NO_INIT_METHOD_MSG = "Cannot start application (no 'init' method found).";
var SEPARATOR = " - ";

dojo.declare("net.jazz.ajax.ui.Workbench", null, {
	
	// summary:
	//		provides top-level UI methods to Jazz Ajax Framework applications
	// usage notes:
	//		clients gain access to the running workbench via
	//		net.jazz.ajax.PlatformUI.getWorkbench(); do not directly instantiate
	//		nor subclass
	// since:
	//		0.5

	constructor: function(args) {
		if (args && args.id)
			PageRegistry.setApplicationId(args.id);
		
		this._loadingList = [];
		messages = dojo.i18n.getLocalization("net.jazz.ajax.ui.internal", "JAFMessages");
		
		this._pageWidgetCache = {};
		this.getActionRegistry().registerAction("jazz.viewPage", this, "_viewPageActionImpl");
		
		// initialize body click handlers
		this._bodyClickHandlers = [];
		this._onBeforeUnloadHandlers = [];
		dojo.connect(dojo.body(), "onclick", this, "_handleBodyClick");
		if (window.onbeforeunload)
			this._dojoOnBeforeUnload = window.onbeforeunload;
		window.onbeforeunload = dojo.hitch(this,this._handleOnBeforeUnload);
		dojo.subscribe(net.jazz.ajax.internal.events.viewPage, this, "_viewPage");
		dojo.subscribe(net.jazz.ajax.internal.events.viewErrorPage, this, "_viewErrorPage");
	},

	getActionRegistry: function() {
		// summary:
		//		returns the action registry for the workbench
		// since:
		//		0.5
		if (!this._actionRegistry) {
			this._actionRegistry = new ActionRegistry();
		}
		return this._actionRegistry;
	},
	
	getResourceRegistry: function() {
		// summary:
		//		returns the resource registry for the workbench
		// since:
		//		0.6
		if (!this._ResourceRegistry) {
			this._ResourceRegistry = new ResourceRegistry();
		}
		return this._ResourceRegistry;
	},
	
	hideMessageArea: function() {
		// summary:
		//		hides the message area; usually called at the end of a long-
		//		running operation
		// since:
		//		0.5
		dojo.publish(net.jazz.ajax.internal.events.hideMessageArea, []);
	},
	
	orderPages: function(/*Function*/sortFunc) {
		// summary:
		//		Internally orders pages based on the logic of the function
		//		sortFunc, which follows the same rules as Array#sort.
		// usage note:
		//		Calling this method causes any Jazz Ajax Framework widgets that
		//		use pages to reorder themselves (e.g. PageList).
		// since:
		//		0.6
		PageRegistry.setSortFunction(sortFunc);
		if (this._pageList)
			this._pageList._reload();
	},
	
	preloadPage: function() {
		this._init();
	},
	
	rootNode: function() {
		// summary:
		//		returns the root node of the workbench
		// since:
		//		0.6
		return dojo.byId("net-jazz-ajax-WorkbenchRoot");
	},
	
	registerBodyClickHandler: function(/* Function */ func, /* Number? */ priority) {
		// summary:
		//		allows a caller to register an event handling function that will
		//		be called whenever a DOM click event propagates to the page's
		//		<body> element. Callers may specify a priority to affect the
		//		order in which body click handlers are called (handlers with a
		//		higher priority get called first).
		//	since:
		//		0.6
		var handlers = this._bodyClickHandlers;
		var newHandler = {f: func, p: priority};
		this._arrayInsertByPriority(handlers, newHandler);
		return newHandler;
	},
	
	registerOnBeforeUnloadHandler: function(/* Function */ func, /* Number? */ priority) {
		// summary:
		//		allows a caller to register an event handling function that will
		//		be called whenever the page detects that it is unloading (caused
		//		by a user action that results in leaving the current page).
		//		Callers may specify a priority to affect the order in which
		//		handlers are called (handlers with a higher priority get called
		//		first).
		//	since:
		//		0.6
		var handlers = this._onBeforeUnloadHandlers;
		var newHandler = {f: func, p: priority};
		this._arrayInsertByPriority(handlers,newHandler);
		return newHandler;
	},
	
	// summary:
	//		Removes the specified handler function from the set of registered
	//		body click handlers, if present.
	// since:
	//		0.6
	unregisterBodyClickHandler: function(handler) {
		return this._arrayRemoveByReference(this._bodyClickHandlers, handler);
	},
	
	// summary:
	//		Removes the specified handler function from the set of registered
	//		onbeforeunload handlers, if present.
	// since:
	//		0.6
	unregisterOnBeforeUnloadHandler: function(handler) {
		return this._arrayRemoveByReference(this._onBeforeUnloadHandlers, handler);		
	},
	
	viewDefaultPage: function() {
		// summary:
		//		displays the default page for the application, currently just
		//		the first page in the page list
		// since:
		//		0.5
		var page = PageRegistry.getDefaultPage();
		if (page)
			this._viewPageActionImpl({id: page.id});
		else if (this.__isStarted)
			this._viewErrorPage(messages.noPages, "", true);
	},
	
	viewPage: function(pageId, cb) {
		// summary:
		//		displays the page with the id specified by 'pageId'
		// usage note:
		//      This api potentially loads a page widget asynchronously and thus
		//      must be passed a callback function if there is functionality that
		//      has to occur after the page has loaded.
		// since:
		//		0.5
		try {
			checkNotNull(pageId, "pageId");	
		} catch (e) {
			this.currentPageId = null;
			this._viewErrorPage(messages.noPageId, e);
			return;
		}
		
		var page = PageRegistry.findPageWithId(pageId);
		
		if (!page) {
			this.currentPageId = null;
			this._viewErrorPage(messages.pageNotFound, messages.pageId + pageId);
			return;
		}
		
		// try to get page widget from the cache
		var pageWidget = this._pageWidgetCache[page.id];
		
		// if the page widget wasn't in the cache, lazily load the page from the
		// server and store it in the page cache
		if (!pageWidget) {
			if (this._isLoading(page.widget)) {
				console.warn("Already in the process of loading ["+page.widget+"]");
				return;
			}
			this._setLoading(page.widget);
			this.showMessage(dojo.string.substitute(messages.loading, [page.name]));
			var _self = this;
			try {
				load_async(page.widget, function(){
					var pageConstructor = dojo.getObject(page.widget);
					_self._setLoaded(page.widget);
					_self.hideMessageArea();
					if (!pageConstructor) {
						_self.currentPageId = null;
						_self._viewErrorPage(
								dojo.string.substitute(messages.errorLoadingPage, [page.name]),
								messages.pageId + pageId);
						return;
					}
					pageWidget = new pageConstructor();
					_self._pageWidgetCache[page.id] = pageWidget;
					page.domNode = pageWidget.domNode;
					_self.currentPageId = page.id;
					_self._viewPage(page);
					pageWidget.startup();
					if (cb && dojo.isFunction(cb)) {
						cb();
					}
				});
			} catch (e) {
				this._setLoaded(page.widget);
				this.hideMessageArea();
				this._viewErrorPage(
						dojo.string.substitute(messages.errorPageWidget, [page.name]),
						e.message);
			}
		}
		else {
			page.domNode = pageWidget.domNode;
			this.currentPageId = page.id;
			this._viewPage(page);
			if (dojo.isFunction(cb))
				cb();
		}
	},
	
	setPageDirty: function(pageId, dirty) {
		dojo.publish(net.jazz.ajax.internal.events.setPageDirty, [pageId, dirty]);
	},
	
	setAppPath: function(path) {
		net.jazz.ajax._appPath = path;
		if (typeof history.replaceState !== 'undefined') {
			history.replaceState({hash: decodeURIComponent(location.pathname).substring(decodeURIComponent(path).length)},"",location.href);
		}
	},
	
	getAppPath: function() {
		return net.jazz.ajax._appPath;
	},
	
	setTitle: function(titleStr) {
		// summary:
		//		sets the page title; usually called at the beginning of an
		//		action invocation 
		// since:
		//		0.6
		checkNotNull(titleStr, "titleStr");
		titleStr = dojo.trim(titleStr);
		document.title = titleStr ?
			titleStr + SEPARATOR + this._defaultTitle :
			this._defaultTitle;
		this._titleWasSet = true;
	},
	
	showMessage: function(message) {
		// summary:
		//		displays the message specified by 'message'; usually called at
		//		the beginning of long-running operations
		// since:
		//		0.5
		checkNotNull(message, "message");
		dojo.publish(net.jazz.ajax.internal.events.showMessage, [message]);
	},
	
	//
	// Internal properties and methods; do not call directly
	//
	
	_arrayInsertByPriority: function (array, newEntry) {
		//newEntry: {p: priority, func: callback function}
		for (var i=0; i<array.length; i++) {
			if (newEntry.p > array[i].p) {
				array.splice(i, 0, newEntry);
				return;
			}
		}
		// if we didn't insert the new handler, just append it to the list
		array.push(newEntry);
	},
	_arrayRemoveByReference: function (array, entry) {
		for (var i = 0; i < array.length;i++) {
			if (entry == array[i]) {
				array.splice(i,1);
				return true;	
			}
		}
		return false;
	},	
	// the default default (sic) title if none other is specified
	_defaultTitle: "Jazz",
	
	_handleBodyClick: function(e) {
		if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
			return;
		}
		if (e.target) {
			var href, node = e.target;
			while (node) {
				if (node.tagName === "A") {
					href = node.href;
					break;
				}
				node = node.parentNode;
			}
			if (!href) {
				return;
			}
		} else {
			return;
		}
		var handlers = this._bodyClickHandlers;
		var urlObj = new dojo._Url(href);
		for (var i = 0; i < handlers.length; i++) {
			var shouldVeto = handlers[i].f(urlObj,e);
			if (shouldVeto) {
				dojo.stopEvent(e);
				return;
			}
		}
		var hash = this._getResourceHash(urlObj,e);
		if (hash) {
			dojo.stopEvent(e);
			if (!this.shouldVetoNavigation(hash)) {
				dojo.hash(hash);
			}
		}
	},
	
	// for occasions when body click logic must be fired programmatically.
	// returns true if event should be vetoed.
	shouldVetoNavigation: function(href) {
		if (href) {
			var urlObj = new dojo._Url(href);
			var pattern = this.getResourceRegistry().findPatternForUrl(trimPrefix(urlObj));
			if (pattern) {
				var assumeAjaxTransition = true;
			}
		}
		var winLoc = new dojo._Url(window.location.href);
		if (assumeAjaxTransition || (href && urlObj.fragment && ((!urlObj.host && !urlObj.path) || (urlObj.path && urlObj.path === winLoc.path)))) { // we're navigating within web UI.
			var handlers = this._bodyClickHandlers;
			var hash = this._getResourceHash(urlObj);
			if (hash) {
				urlObj = new dojo._Url(hash);
			}
			for (var i = 0; i < handlers.length; i++) {
				if (handlers[i].f(urlObj)) {
					return true;
				}
			}
			if (hash) {
				dojo.hash(hash);
				return true;
			}
			return false;
		} else {
			var message = this._getOnBeforeUnloadMessage();
			if (message !== false) {
				//fake the onBeforeUnload dialog
				if (confirm(messages.onBeforeUnloadPrefix + message + messages.onBeforeUnloadSuffix)) {
					this._onBeforeUnloadHandlers = new Array(); //The user has agreed to navigate away, so short circuit the real onBeforeUnload
					return false;
				} else {
					return true;
				}
			} else 
				return false;
		}
	},
	getCurrentPageId: function() {
		if (this.currentPageId) 
			return this.currentPageId;
		var uriObj = dojo.queryToObject(dojo.hash());
		if (uriObj.action) {
			var actionEntry = this.getActionRegistry()._getActionEntry(uriObj.action);
			return (actionEntry && actionEntry._requiresPage) ? actionEntry._requiresPage : null;
		}
		var defaultPage = PageRegistry.getDefaultPage();
		return defaultPage ? defaultPage.id : "";
	},
	_handleOnBeforeUnload: function (e) {
		if (this._dojoOnBeforeUnload)
			this._dojoOnBeforeUnload(e);
		if (!e) e = window.event;  // need to fetch the event object explicitly in IE
		var message = this._getOnBeforeUnloadMessage();
		if (message !== false) {
			e.returnValue = message;
			return message;
		}
	},
	_getOnBeforeUnloadMessage: function() {
		var handlers = this._onBeforeUnloadHandlers;
		var msgs = new Array();
		for (var i = 0; i < handlers.length; i++) {
			var message = handlers[i].f(/*isOnBeforeUnload*/ true); 
			if (message) msgs.push(message);
		}
		if (msgs.length > 0) { // if any messages were returned, format the output and show the prompt
			msgs.push(messages.changesMayBeDiscarded);
			var output = "";
			for (i = 0; i < msgs.length; i++) {
				if (msgs.length > 2 && i != msgs.length - 1) output += "- ";
				output += msgs[i];
				if (i == msgs.length - 2) {
					if (msgs.length == 2) {
						output += " ";
					} else {
						output += "\n\n";
					} 
				} else if (i != msgs.length - 1) {
					output += "\n";
				}
			}
			return output;
		}
		return false;
	},
	
	_getResourceHash: function(uriObj,e) {
		var uri = uriObj.uri;
		//if event.preventDefault or the uri ends with #, return
		if ((e && e.getPreventDefault && e.getPreventDefault()) || uri.indexOf("#", uri.length - 1) !== -1) {
			return false;
		}
		var winLoc = new dojo._Url(window.location.href);
		if(uriObj.scheme && uriObj.authority && !(uriObj.scheme === winLoc.scheme && uriObj.authority === winLoc.authority)) {
		   	return false; // different domain, so do nothing
		}
		if (uriObj.path === winLoc.path && uriObj.fragment) {
			return false; // same exact base URI, so do nothing
		}
		var urlSuffix = trimPrefix(uriObj);
		var resourceRegistry = this.getResourceRegistry();
		var pattern = resourceRegistry.findPatternForUrl(urlSuffix);
		if (pattern) {
			var moduleName = resourceRegistry.findModuleNameForPattern(pattern);
			if (!PageRegistry.isPageInCurrentApplication(moduleName)) {
				return false;
			}
		} else {
			return false; // Should not veto, early return
		}
		return "#" + urlSuffix; // Redirecting to resource-centric URI so should veto body click
	},
	
	_processUri: function(uri) {
		var uriObj = dojo.queryToObject(uri);
		
		// reset state so that we can check later if the code we called set the
		// title or not
		this._titleWasSet = false;
		
		var handled = false;
		
		// action-based URIs have the form:
		// #action=[action-id]&arg1=val1
		if (uriObj.action) {
			this._processActionUri(uriObj);
			handled = true;
		}
		
		// resource-based URIs have the form:
		// #/someUri
		if (!handled && uri.length > 0){
			var patternMatch = this.getResourceRegistry().findPatternForUrl(uri);
			if (patternMatch) {
				this._processResourceUri(uri, patternMatch);
				handled = true;
			} else if (patternMatch === false) {
				this.currentPageId = null;
				//not an action or resource based URL, but has a hash value
				if (this.__isStarted)
					this._viewErrorPage(messages.invalidUrl);
				handled = true;
			}
		}
		
		// if neither an action nor a resourceHandler handled the URI, bail out
		// and show the default page
		if (!handled) {
			this.viewDefaultPage();
		}
		
		// if the code we called didn't set the title, just show the default
		if (!this._titleWasSet) {
			this.setTitle("");
		}
	},
	_processActionUri: function(uri) {
		var actionId = uri.action;

		// _processActionUri should not have been called if the URI did not
		// contain an action param
		checkNotNull(actionId, "actionId");
		
		var actionEntry = this.getActionRegistry()._getActionEntry(actionId);
		
		if (!actionEntry) {
			this.currentPageId = null;
			if (this.__isStarted)
				this._viewErrorPage(messages.invalidAction, messages.action + actionId);
			return;
		}
		
		// if this action is supposed to run in the context of a particular page
		// then show the page.
		var pageId = actionEntry._requiresPage, renderService = actionEntry._renderService;
		if (pageId) {
			if (this.__isStarted) {
				if (renderService && !this._pageWidgetCache[pageId]) {
					this._renderPage(uri, actionEntry, pageId);
				} else {
					var self = this;
					this.viewPage(pageId, function() {
						self._runAction("action", actionId, uri);
					});
				}
			} else {
				this._preloadPageById(pageId);
			}
		} else {
			this._runAction("action", actionId, uri);
		}
		
	},
	
	_renderPage: function(uriObj, actionEntry, pageId) {
		var url = net.jazz.ajax.contextRoot() + actionEntry._renderService + "?" + dojo.objectToQuery(uriObj),
			response, count = 2, self = this;
		function countdown() {
				count--;
				if (count)
					return;
				var div = document.createElement("div");
				div.style.display = "none";
				document.body.appendChild(div);
				div.innerHTML = response;
				var widget = dojo.parser.parse(div, {noStart:1})[0];
				div.removeChild(widget.domNode);
				self._pageWidgetCache[pageId] = widget;
				self.viewPage(pageId);
				widget.startup();
				dojo.destroy(div);
		}
		jazz.core.loader.load_async(actionEntry._widgetId, countdown);
		jazz.client.xhrGet({url:url, load: function(r){
			response = r;
			countdown();
		}});
	},
	
	_processResourceUri: function(/*String*/ uri, /*String*/ patternMatch) {
		var argObj = this._parseResourceUri(decodeURIComponent(uri));
		
		var resourceHandlerModuleName = this.getResourceRegistry().findModuleNameForPattern(patternMatch);
		
		var self = this;
		if (resourceHandlerModuleName) {
			if (this.__isStarted) {
				this.viewPage(resourceHandlerModuleName, function() {
					self = self._runAction("resourceHandler", patternMatch, argObj);
				});
			} else {
				this._preloadPageById(resourceHandlerModuleName);
			}
		} else if (this.__isStarted){
			self = self._runAction("resourceHandler", patternMatch, argObj);
		}
	},
	_preloadPageById: function(pageId) {
		var page = PageRegistry.findPageWithId(pageId);
		page && page.widget && load_async(page.widget, function(){},true);
	},
	setResourceUrlParser: function(parseFunction) {
		if (!dojo.isFunction(parseFunction)) {
			throw new Error("Workbench#setResourceUrlParser: parameter 'parseFunction' not a function (was: " + parseFunction + " )");
		}
		// replace default parser with custom parser
		this._parseResourceUri = parseFunction;
	},
	
	_parseResourceUri: function(url) {
		// default implementation
		return {url: url};
	},
	
	_runAction: function(type, id, objArg) {
		var action;
		if (type === "action") {
			action = this.getActionRegistry().findAction(id);
		} else if (type === "resourceHandler") {
			action = this._findResourceAction(id);
		} else {
			throw new Error("Invalid type: " + type);
		}
		if (!action) {
			console.error("No associated " + type + " found for ID: " + id);
			this._viewErrorPage(messages.unresolvedAction, messages.action + id);
			return;
		}
		callContributedCode( function() {
			action.run(objArg);
		});
	},
	
	_findResourceAction: function(id) {
		var actionArr = this.getResourceRegistry().findHandlersForPattern(id);
		if (actionArr.length === 0) {
			throw new Error("No implementation bound to pattern " + id);
		}
		if (actionArr.length > 1) {
			console.warn("More than one action bound to pattern: " + id + "; using first one (multiple handlers not yet supported).");
		}
		return actionArr[0];
	},
	
	_start: function() {
		// guard against multiple calls
		if(this.__isStarted) {
			return;
		}
		this.__isStarted = true;
		
		// summary:
		//		informs the workbench to begin processing events
		dojo.subscribe("/dojo/hashchange",this,this._processUri);
		if (!this._serverTemplated) {
			this._init();
			var loading = dojo.byId("net-jazz-ajax-InitialLoadMessage");
			if (loading)
				dojo.destroy(loading);
		}
	},
	
	_init: function() {
		var hash = dojo.hash();
		if (hash){
			this._processUri(hash);
		} else {
			var urlObj = new dojo._Url(location.href);
			var pattern = this.getResourceRegistry().findPatternForUrl(trimPrefix(urlObj));
			if (pattern) {
				this._processResourceUri(urlObj, pattern);
			} else {
				this._processUri("");
			}
		}
	},
	_setDefaultTitle: function(titleStr) {
		// summary:
		//		sets the default page title that is always prepended before the
		//		argument sent to Workbench#setTitle 
		checkNotEmpty(titleStr, "titleStr");
		this._defaultTitle = titleStr;
	},
	
	_viewPageActionImpl: function(/*Object*/kwArgs) {
		// description:
		//		Implementation for "jazz.viewPage" action. Loads the page widget
		//		(if necessary), displays it in the web workbench, and if this is
		//		the first time the user has visited the page, runs the default
		//		action.
		// kwArgs:
		//		action args; must contain an 'id' property whose value
		//		corresponds to the id of an installed page extension.
		try {
			checkNotNull(kwArgs.id, "kwArgs.id");
		} catch (e) {
			this.currentPageId = null;
			if (this.__isStarted)
				this._viewErrorPage(messages.noPageId, e);
			return;
		}
		// show the page
		if (this.__isStarted) {
			var _self = this;
			this.viewPage(kwArgs.id, function() {
				var page = PageRegistry.findPageWithId(kwArgs.id);
				
				// set the document's title to the page's name
				_self.setTitle(page.name);
				
				// run the page's default action
				_self._runAction("action", page.defaultAction, {});
			});
		} else {
			this._preloadPageById(kwArgs.id);
		}
	},
	
	_setLoading: function(pageWidgetId) {
		this._loadingList.push(pageWidgetId);	
	},
	
	_isLoading: function(pageWidgetId) {
		for (var i = 0; i < this._loadingList.length; i++){
			if (this._loadingList[i] == pageWidgetId) {
				return true;
			}
		}
		return false;
	},
	
	_setLoaded: function(pageWidgetId) {
		var index = -1;
		for(var i = 0; i < this._loadingList.length; i++){
			if (this._loadingList[i] == pageWidgetId) {
				index = i;
				break;
			}
		}
		if(index >=0) {
			this._loadingList.splice(index, 1);
		}
	},
	
	_alreadyViewingPage: function(id) {
		this._serverTemplated = true;
		this._pageWidgetCache[id] = dojo.byId(this._pageContainer.domNode.firstElementChild.id);
	},
	
	_viewPage: function(page) {
		if (this._pageContainer)
			this._pageContainer._viewPage(page);
		if (this._pageList)
			this._pageList._selectPage(page);
	},
	
	_viewErrorPage: function(message, finePrint, hideRunDefaultAction) {
		if (this._pageContainer)
			this._pageContainer._viewErrorPage(message, finePrint, hideRunDefaultAction);
		if (this._pageList)
			this._pageList._deselectCurrentPage();
	}
});

function trimPrefix(uriObj) {
	var appPath = net.jazz.ajax._appPath;
	var path = uriObj.path;
	if (path.indexOf(appPath) === 0) {
		return path.substring(appPath.length);
	}
	return "";
}

})();