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
dojo.provide("net.jazz.ajax.ui.ActionRegistry");

dojo.require("net.jazz.ajax.core.internal.Action");
dojo.require("jazz.core.RegistryFactory");

var bpExtPointId	= "net.jazz.ajax.pages";
var RegistryFactory	= jazz.core.RegistryFactory;

var builtInActions	= ["jazz.viewPage"];

var Action = net.jazz.ajax.core.internal.Action;

dojo.declare("net.jazz.ajax.ui.ActionRegistry", null, {
	
	// summary:
	//		provides a registry of installed actions for the current application
	// usage note:
	//		do not instantiate, obtain via:
	//		net.jazz.ajax.ui.PlatformUI.getWorkbench().getActionRegistry()
	
	findAction: function(/*String*/id) {
		// summary
		//		returns the action for with the specified id or null if no
		//		action is registered for the given id
		// since:
		//		0.6
		var actionEntry = this._actionRegistry[id];
		return (actionEntry && actionEntry.action) ? actionEntry.action : null;
	},
	
	registerAction: function(/*String*/ id, /*Object|Function*/ arg1, /*String?*/ arg2) {
		// summary:
		//		register an action with this registry
		// description:
		//		this method has a two forms:
		//		- a two parameter version where the second argument is a
		//		  function
		//		- a three parameter version where the second argument is a
		//		  context object and the third argument is a string
		//		  corresponding to a method on the context object
		// id:
		//		the identifier for an action declared in the extension registry;
		//		if not found in the extension registry, calling this method
		//		results in an error
		// arg1:
		//		either a context object or a function
		// arg2:
		//		if specified, a string corresponding to a method name attached to arg1
		// since:
		//		0.6
		
		var contextObject, method = null;
		
		// validate parameters
		if (arguments.length !== 2 && arguments.length !== 3) {
			var msg = "ActionRegistry#registerAction: Error - invalid number of parameters. Expected 2 or 3, saw: " + arguments.length;
			alert(msg);
			throw new Error(msg);
		}
		
		// ensure that the action definition exists in the extension registry
		if (!this._actionRegistry[id]) {
			alert("ActionRegistry#registerAction: Error creating action for id  " + id +
				  ": action not defined in extension registry.");
			return;
		}
		
		// ensure that another action hasn't already been defined for this id
		if (this._actionRegistry[id].action) {
			alert("ActionRegistry#registerAction: Error creating action for id  " + id +
				  ": action already defined for this id.");
			return;
		}

		this._actionRegistry[id].action = arg2 ?
				new Action(id, arg1, arg2) :
				new Action(id, arg1);
		
		return this._actionRegistry[id].action;
	},
	
	// 
	// Internal methods; do not call
	// 
	
	constructor: function() {
		// description:
		//		Initializes the action registry for the workbench by loading
		//		both built-in action entries (e.g. jazz.viewPage) and action entries
		//		contributed by extensions.
		
		this._actionRegistry= {};
		
		// load built-in actions
		var self = this;
		
		dojo.forEach(builtInActions, function(id) {
			self._actionRegistry[id] = {};
		});
		
		// load actions from the extension registry		
		var bpExtPt = RegistryFactory.getRegistry().getExtensionPoint(bpExtPointId);
		
		dojo.forEach(bpExtPt.getExtensions(), function(extension) {
			dojo.forEach(extension.getConfigurationElements(), function(bpCfgElement) {
				if (bpCfgElement.getName() !== "page") { return; }
				dojo.forEach(bpCfgElement.getChildren(), function(actionCfgElement){
					if (actionCfgElement.getName() !== "action") { return; }
					var id = actionCfgElement.getAttribute("id");
					if (self._actionRegistry[id]) {
						alert("ActionRegistry#initializer: Error loading action with id " +
							id + "id already defined");
						return;
					}
					self._actionRegistry[id] = {
						_requiresPage: bpCfgElement.getAttribute("id"),
						_renderService: actionCfgElement.getAttribute("service"),
						_widgetId: actionCfgElement.getAttribute("widget")
					};
				});
			});
		});
	},
	
	_getActionEntry: function(/* string */ id) {
		// description:
		//		Return the raw entry for the action id (e.g. to determine if the
		//		action declaration requires a particular page.
		return this._actionRegistry[id];
	}
	
});

})();
