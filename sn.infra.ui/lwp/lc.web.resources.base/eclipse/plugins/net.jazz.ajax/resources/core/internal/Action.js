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
dojo.provide("net.jazz.ajax.core.internal.Action");

dojo.declare("net.jazz.ajax.core.internal.Action", null, {
	
	// summary:
	//		an executable action which can be invoked via its 'run' method
	// usage note:
	//		NOT API, do not use
	
	run: function(/*Object*/args) {
		// description:
		//		Runs the action. If the action has a context object, the action
		//		is run in the context of the context object (i.e. during action
		//		execution, the 'this' variable refers to the context object); if
		//		the action does *not* have a context object, the value of 'this'
		//		during action execution is not guaranteed.
		// args:
		//		an object containing arbitrary named properties and values.
		if (this._contextObject) {
			var func = this._contextObject[this._method];
			func.call(this._contextObject, args);
		} else {
			this._method(args);
		}
	},
	
	constructor: function(id, arg1, arg2) {
		// summary:
		//		Initializes the action with the specified id, and the function
		//		information (context object and method or raw function).
		this._contextObject = this._method = null;
		
		// validate parameters
		if (arguments.length === 3) {
			this._contextObject = arg1;
			this._method = arg2;
		} else if (arguments.length === 2) {
			this._method = arg1;
		} else {
			var msg = "Action#initializer: invalid number of arguments; expected 2 or 3, saw: " + arguments.length;
			alert(msg);
			throw new Error(msg);
		}
		
		this._id = id;
	}
	
});
