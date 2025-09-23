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
dojo.provide("jazz.core.Extension");

dojo.declare("jazz.core.Extension", null, {
	
	// summary:
	//		an object which represents the user-defined extension in a web
	//		bundle plug-in manifest
	// usage notes:
	//		do not instantiate
	// since:
	//		0.5
	
	getConfigurationElements: function() {
		// summary:
		//		returns an array of the configuration elements of this extension
		//		or an empty array if this extension has no configuration
		//		elements; never null
		// since:
		//		0.5
		return this._configElements;
	},
	
	getNamespace: function() {
		// summary:
		//		returns the namespace of this extension; never null
		// since:
		//		0.5
		return this._namespaceIdentifier;
	},
	
	getUniqueIdentifier: function() {
		// summary:
		//		returns the unique identifier of this extension; never null
		// since:
		//		0.5
		return this._uniqueIdentifier;
	},
	
	toString: function() {
		// summary:
		//		returns the string form of this extension; never null
		// since:
		//		0.5
		var cfgElementStr= "[";
		var cfgElements= this.getConfigurationElements();
		for (var i=0; i<cfgElements.length; i++) {
			cfgElementStr += cfgElements[i].toString();
			if (i < cfgElements.length-1) {
				cfgElementStr += ", ";
			}
		}
		cfgElementStr += "]";
		
		return "namespace: " + this.getNamespace() +
			", uniqueIdentifier: " + this.getUniqueIdentifier() +
			", configurationElements: " + cfgElementStr;
	},
	
	//
	// Internal methods; do not call
	//
	
	constructor: function(uniqueIdentifier, namespaceIdentifier, configElements) {
		this._uniqueIdentifier    = uniqueIdentifier;
		this._namespaceIdentifier = namespaceIdentifier;
		this._configElements      = configElements;
	}

});
