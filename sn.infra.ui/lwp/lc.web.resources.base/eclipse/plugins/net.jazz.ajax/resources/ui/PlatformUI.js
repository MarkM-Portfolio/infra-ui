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
dojo.provide("net.jazz.ajax.ui.PlatformUI");

dojo.require("net.jazz.ajax.contextRoot");
dojo.require("net.jazz.ajax.ui.Workbench");
dojo.require("jazz.core.loader");
dojo.require("jazz.core.RegistryFactory");
dojo.require("dojo.hash");

net.jazz.ajax.ui.PlatformUI = {
		
	runWorkbench: function(applicationId) {
		return this._workbench = new net.jazz.ajax.ui.Workbench({id: applicationId});
	},
	
	// summary:
	//		central object of the Jazz Web UI framework
	// description:
	//		Used to create and run the web workbench and to locate the running
	//		web workbench. Clients must call all methods in a 'static' manner,
	//		e.g.:
	//
	//		net.jazz.ajax.ui.PlatformUI.getWorkbench();
	//
	//		This is an object, not a class, and therefore cannot be
	//		instantiated.
	// since:
	//		0.5
	
	createAndRunWorkbench: function(applicationId) {
		// summary:
		//		creates and runs the application specified by 'applicationId'
		// description:
		//		he Jazz Ajax Framework calls this function exactly once at the
		//		beginning of the web page's lifecycle
		// since:
		//		0.5
		
		// strip off the hash and redirect if the hash begins with a slash
		var hash = dojo.hash(),
			appPath = net.jazz.ajax._appPath;
		if (appPath) {
			if (hash.length > 0 && hash.indexOf("/") == 0) {
				var url = appPath + hash;
				var search = location.search;
				if (search) {
					url += search;
				}
				location.replace(url);
				return;
			}
			this._enableHtml5History();
		}
		
		this._workbench = new net.jazz.ajax.ui.Workbench({id: applicationId});
		
		this._applicationId = applicationId;
		var RegistryFactory = jazz.core.RegistryFactory;
		var extensionPoint = RegistryFactory.getRegistry().getExtensionPoint("net.jazz.ajax.applications");
		var self = this;
		dojo.forEach(extensionPoint.getExtensions(), function(extension) {
			dojo.forEach(extension.getConfigurationElements(), function(configElement) {
				if (configElement.getName() !== "application")
					return;
				/*
				 * The ID should now be set on the configElement, but for backwards compatibility,
				 * continue to check the extension's ID too
				 */
				if (configElement.getAttribute("id") != applicationId && extension.getUniqueIdentifier() != applicationId)
					return;
				var appClassName = configElement.getAttribute("jsclass");
				
				// This load_async should be a no-op because the code should be loaded already.
				jazz.core.loader.load_async(appClassName, function() {
					var appConstructor = dojo.getObject(appClassName);
					new appConstructor({
						workbench: self._workbench
					});
				});
			});
		});
	},
	
	getWorkbench: function() {
		// summary:
		//		Returns a reference to the running the web workbench. Fails if
		//		the web workbench has not been created yet.
		// since:
		//		0.5
		return this._workbench;
	},
	
	//
	// Internal methods; do not call directly
	//
	
	_getApplicationId: function() {
		return this._applicationId;
	},
	
	_enableHtml5History: function(enable) {
		// handle html5 history hash overriding
		if (typeof history.pushState !== 'undefined') {
			// connect to the popstate event, which fires when user presses back/forward to a state that was added using history API
			dojo.connect(window, "onpopstate", this, this._handlePopState);
			
			// give the initial load a state object so that a popstate fires when users navigates back to the initial state
			history.replaceState({hash: dojo.hash()||decodeURIComponent(location.pathname).substring(decodeURIComponent(net.jazz.ajax._appPath).length)},"",location.href);
			
			// Override dojo.hash to transparently get and set using history.pushState/replaceState instead of changing the hash.
			// Only use history API if the hash starts with a '/' (convention), otherwise continue to use standard hashes.
			dojo.hash = (function() {
				var realHash = dojo.hash;
				return (function (hash, replace) {
					if (hash) {
						if (hash.indexOf("#") == 0) hash = hash.substring(1);
						if (dojo.isString(hash) && hash.indexOf("/")==0) {
							history[replace?"replaceState":"pushState"]({hash: hash},"", net.jazz.ajax._appPath + hash + location.search);
							dojo.publish("/dojo/hashchange", [hash]);
							return hash;
						}
					} else if (history.state && history.state.hash) {
						return history.state.hash;
					}
					return realHash.apply(null, arguments);
				});
			})();
		}
	},
	
	_handlePopState: function(event) {
		if (event.state && event.state.hash) {
			// if the popstate event fired, and there's a state object on the event (we put the object there),
			// fire a hash change event.
			dojo.publish("/dojo/hashchange", [event.state.hash]);
		}
	}
};