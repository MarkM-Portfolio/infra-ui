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
dojo.provide("net.jazz.ajax.ui._Application");

dojo.require("dijit._Widget");
dojo.require("net.jazz.ajax.ui.Workbench");
dojo.require("net.jazz.ajax.ui.PlatformUI");

dojo.declare("net.jazz.ajax.ui._Application", dijit._Widget, {
	// summary:
	//		Abstract superclass that provides the basic capabilities of a
	//		Jazz Ajax Framework-based application
	// description:
	//		Subclasses must minimally do the following:
	//		
	//		1) Define a 'constructor' method to perform whatever initialization logic
	//		   they require.
	//		2) Call the 'start' method;
	//		   		e.g. this.start();
	constructor: function() {
		//Implementors used to have to implement the init function.
		//Warn in the console if they haven't adopted.
		if (this.init) {
			dojo.deprecated("_Application.init()", "Implement 'constructor' instead", "M3");
		}
	},
	
	start: function() {
		// summary:
		//		informs the workbench to begin processing events; extenders must
		//		call this method exactly once per lifecycle, usually at the end
		//		of the 'init' method
		// since:
		//		0.5
		
		// create URI monitor and process first URI
		net.jazz.ajax.ui.PlatformUI.getWorkbench()._start();
	},
	
	setName: function(name) {
		// summary:
		//		sets the name for the application; the workbench will prepend
		//		the application name before the contents of the argument to
		//		Workbench#setTitle
		// since:
		//		0.5
		name = dojo.trim(name);
		if(!name){
			throw new Error("_Application#setName: Missing required paameter 'name'");
		}
		net.jazz.ajax.ui.PlatformUI.getWorkbench()._setDefaultTitle(name);
	}
});

})();