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
dojo.provide("net.jazz.ajax.ui.ResourceRegistry");

dojo.require("net.jazz.ajax.core.internal.Action");
dojo.require("jazz.core.RegistryFactory");

dojo.declare("net.jazz.ajax.ui.ResourceRegistry", null, {
	
	// summary:
	//		provides a registry of installed resource handlers for the current
	//		application
	// usage note:
	//		do not instantiate, obtain via:
	//		net.jazz.ajax.ui.PlatformUI.getWorkbench().getResourceRegistry()
	// since:
	//		0.5
	
	findModuleNameForPattern: function(/*String*/pattern) {
		var entry = this._pMap[pattern];
		return (entry && entry._rp) ? entry._rp : null;
	},
	
	findHandlersForPattern: function(/*String*/pattern) {
		// summary
		//		returns an array containing the 0-n resource handlers that match
		//		the specified pattern
		// since:
		//		0.6
		
		var handlers = [];
		
		if (validateSyntax(pattern)) {
		
			// if we have a matching pattern then we have an entry in _pMap; just
			// need to check if we have a registered action
			var entry = this._pMap[pattern];
			if (entry && entry.action) {
				handlers.push(entry.action);
			}
		
		}
		
		return handlers;
	},
	
	findPatternForUrl: function(/*String*/url) {
		// summary
		//		returns the closest matching url pattern given the specified URL
		//		or null if no URL matches the pattern. 
		// since:
		//		0.6
		if (!validateSyntax(url)) {
			return false;
		}
		return this._pTree.findClosestMatchingPattern(url);
	},
	
	registerHandlerForPattern: function(/*String*/ pattern, /*Object|Function*/ arg1, /*String?*/ arg2) {
		// summary:
		//		register a resource handler for the pattern with this registry
		// description:
		//		this method has a two forms:
		//		- a two parameter version where the second argument is a
		//		  function
		//		- a three parameter version where the second argument is a
		//		  context object and the third argument is a string
		//		  corresponding to a method on the context object
		// id:
		//		the resource pattern declared in the extension registry;
		//		if not found in the extension registry, calling this method
		//		results in an error
		// arg1:
		//		either a context object or a function
		// arg2:
		//		if specified, a string corresponding to a method name attached to arg1
		// since:
		//		0.6
		
		// validate parameters
		if (arguments.length !== 2 && arguments.length !== 3) {
			throw new Error("ResourceRegistry#registerResourcePatternHandler: Error - invalid number of parameters. Expected 2 or 3, saw: " + arguments.length);
		}
		
		// make sure we have a URI
		if (!validateSyntax(pattern)) {
			throw new Error("Invalid pattern: " + pattern);
		}
		
		// if the pattern is not already defined, register it
		if (!this._pMap[pattern]){
			this._pMap[pattern] = {};
			this._pTree.createNodeForPattern(pattern);
		}
		
		this._pMap[pattern].action = createAction(arguments);
	},
	
	// 
	// Internal methods; do not call
	// 
	
	constructor: function() {
		// description:
		//		Initializes the resource handling registry for the workbench by loading
		//		both built-in action entries (e.g. jazz.viewPage) and action entries
		//		contributed by extensions.
		
		this._pTree = new patternTree();
		
		this._pMap = getAllRegisteredPatterns();
		
		for (var pattern in this._pMap) {
			this._pTree.createNodeForPattern(pattern);
		}
	}
	
});

// class aliases
var Action = net.jazz.ajax.core.internal.Action;

// constants
var bpExtPointId = "net.jazz.ajax.pages";

// utility function definitions
function createAction(args) {
	if(args.length === 2) {
		var action = new Action(args[0], args[1]);
	}
	if(args.length === 3) {
		action = new Action(args[0], args[1], args[2]);
	}
	return action;
}

function validateSyntax(uri) {
	if (!dojo.isString(uri) || uri.charAt(0) !== "/") {
		return false;
	}
	return true;
}

function patternTree() {
	
	this.root = {};
	
	this.createNodeForPattern = function(pattern) {
	
		var segments = getSegments(pattern);
		var iterator = this.root;
		
		for (var i = 0; i < segments.length; i++) {
			var dir = segments[i];
			if (!iterator.subdirs) {
				iterator.subdirs = {};
			}
			if (!iterator.subdirs[dir]) {
				iterator.subdirs[dir] = {};
			}
			iterator = iterator.subdirs[dir];
		}
		
		iterator.pEnd = true;
		
	};
	
	this.findClosestMatchingPattern = function(url) {
		var segments = getSegments(url);
		var iterator = this.root;
		var matchPath = null;
		var totalPath = "";
		for (var i = 0; i < segments.length; i++) {
			var dir = segments[i];
			if (iterator.subdirs && iterator.subdirs[dir]) {
				iterator = iterator.subdirs[dir];
				if (dir == "/") {
					totalPath += dir;
				} else {
					totalPath += "/" + dir;
				}
				if (iterator.pEnd) {
					matchPath = totalPath;
				}
			} else if (i === segments.length - 1 && iterator.subdirs && iterator.subdirs["/"]) {
				totalPath += "/";
				matchPath = totalPath;
			} else {
				break;
			}
		}
		
		return matchPath;
	};
}

function getSegments(uri) {
	var segments = uri.split("/");
	// remove the first element, which is always empty
	segments.shift();
	var lastElement = segments.length - 1;
	if (segments[lastElement] === "") { segments[lastElement] = "/"; }
	return segments;
}

function getAllRegisteredPatterns() {
	var bpExtPt = jazz.core.RegistryFactory.getRegistry().getExtensionPoint(bpExtPointId);
	var allPatternMap = {};
	dojo.forEach(bpExtPt.getExtensions(), function(extension) {
		dojo.forEach(extension.getConfigurationElements(), function(bpCfgElement) {
			if (bpCfgElement.getName() !== "page") { return; }
			dojo.forEach(bpCfgElement.getChildren(), function(actionCfgElement){
				if (actionCfgElement.getName() !== "resourcePattern") { return; }
				var pattern = actionCfgElement.getAttribute("pattern");
				if (!validateSyntax(pattern)) {
					console.error("Invalid pattern definition in extension registry; skipping (pattern: " + pattern + ")");
					return;
				}
				if (allPatternMap[pattern]) {
					console.warn("Multiple handlers for a resource not yet supported.");
					return;
				}
				allPatternMap[pattern] = {
					// _rp means 'requires page'
					_rp: bpCfgElement.getAttribute("id")
				};
			});
		});
	});
	return allPatternMap;
}

})();
