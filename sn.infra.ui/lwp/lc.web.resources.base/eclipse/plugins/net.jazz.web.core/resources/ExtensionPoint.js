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
dojo.provide("jazz.core.ExtensionPoint");

dojo.declare("jazz.core.ExtensionPoint", null, {
	
	// summary:
	//		an object which represents a user-defined extension point in a
	//		plug-in manifest
	// usage notes:
	//		do not instantiate
	// since:
	//		0.5
	
	getConfigurationElements: function() {
		// summary:
		//		returns an array containing all configuration elements for all
		//		extensions of this extension-point or an empty array if there
		//		are no configuration elements for this extension-point; never
		//		null
		// since:
		//		0.5
		var allExtensions= this.getExtensions();
		var allConfigurationElements= [];
		for (var i=0; i<allExtensions.length; i++) {
			var curCfgElements= allExtensions[i].getConfigurationElements;
			for (var j=0; j<curCfgElements.length; j++) {
				// TODO, make defensive copies
				allConfigurationElements.push(curCfgElements[j]);
			}
		}
		return allConfigurationElements;
	},
	
	getExtensions: function() {
		// summary:
		//		returns an array containing all extensions of this extension-
		//		point or an emtpy array if this extension-point has no
		//		extensions; never null
		// since:
		//		0.5
		
		// TODO: return defensive copy
		return this._extensions;
	},
	
	getNamespaceIdentifier: function() {
		// summary:
		//		returns the namespace identifier for this extension-point; never
		//		null
		// since:
		//		0.5
		return this._namespaceIdentifier;
	},
	
	getUniqueIdentifier: function() {
		// summary:
		//		retuns the unique idenifier for this extension-point; never null
		// since:
		//		0.5
		return this._uniqueIdentifier;
	},
	
	toString: function() {
		// summary:
		//		returns the string form of this extension point; never null
		// since:
		//		0.5
		var extensionStr= "{";
		var extensions= this.getExtensions();
		for (var i=0; i<extensions.length; i++) {
			extensionStr += extensions.toString();
			if (i < extensions.length-1) {
				extensionStr += ", ";
			}
		}
		extensionStr += "}";
		return "uniqueIdentifier: " + this.getUniqueIdentifier() +
		       ", namespaceIdentifier: " + this.getNamespaceIdentifier() +
		       ", extensions: " + extensionStr;
	},
	
	//
	// Internal methods; do not call
	//
	
	constructor: function(namespaceIdentifier, uniqueIdentifier, extensions) {
		// TODO guard input
		this._namespaceIdentifier= namespaceIdentifier;
		this._uniqueIdentifier= uniqueIdentifier;
		this._extensions= extensions;
	}
	
});
