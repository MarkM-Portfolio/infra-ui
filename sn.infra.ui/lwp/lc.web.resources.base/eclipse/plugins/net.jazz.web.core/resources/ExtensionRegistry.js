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
dojo.provide("jazz.core.ExtensionRegistry");

dojo.require("dojox.collections.Dictionary");
dojo.require("jazz.core.ConfigurationElement");
dojo.require("jazz.core.Extension");
dojo.require("jazz.core.ExtensionPoint");

dojo.declare("jazz.core.ExtensionRegistry", null, {
	
	// summary:
	//		an object which provides access to the extension registry data for
	//		all web bundles on the server
	// usage notes:
	//		do not instantiate
	// since:
	//		0.5
	
	getExtensionPoint: function(extensionPointId) {
		// summary:
		//		returns an object representing the extension point with the
		//		specified id, or null if no such extensoin point exists
		// since:
		//		0.5
		return (this._extPtDictionary.containsKey(extensionPointId)) ?
				this._extPtDictionary.entry(extensionPointId).value :
				null;
	},
	
	getExtensionPoints: function() {
		// summary:
		//		returns an array containing all extension points, never null
		// since:
		//		0.5
		return this._extPtDictionary.getValueList();
	},
	
	toString: function() {
		// summary:
		//		returns a string form of this extension registry; never null
		// since:
		//		0.5
		var extPts= this.getExtensionPoints();
		var tmpStr= "Extension Points: {";
		for (var i=0; i<extPts.length; i++) {
			tmpStr += extPts[i].toString();
			if (i != (extPts.length - 1)) {
				tmpStr += ", ";
			}
		}
		return tmpStr + "}";
	},
	
	//
	// Internal methods; do not call
	//
	
    constructor: function(registryData) {
        this._extPtDictionary= new dojox.collections.Dictionary();
        var extensionPts=
                jazz.core.ExtensionRegistryParser._parse(registryData);
        for (var i=0; i<extensionPts.length; i++) {
            this._extPtDictionary.add(extensionPts[i].getUniqueIdentifier(), extensionPts[i]);
        }
    }

});

//
// Internal object; do not call
//

jazz.core.ExtensionRegistryParser= {

	_parse: function(registryData) {
		var extPts= registryData.extensionPoints;
		var extPtsArray= [];
		for (var i=0; i<extPts.length; i++) {
			extPtsArray.push(this._parseExtensionPoint(extPts[i]));
		}
		return extPtsArray;
	},
	
	_parseExtensionPoint: function(extPtData) {
		var extensions= [];
		var extensionData= extPtData.extensions;
		for (var i=0; i<extensionData.length; i++) {
			extensions.push(this._parseExtension(extensionData[i]));
		}
		return new jazz.core.ExtensionPoint(
				extPtData.namespaceIdentifier,
				extPtData.uniqueIdentifier,
				extensions);
	},
	
	_parseExtension: function(extensionData) {
		
		var cfgElements= [];
		var srcElements= extensionData.configurationElements;
		for (var i=0; i<srcElements.length; i++) {
			srcElements[i].namespaceIdentifier = extensionData.namespaceIdentifier;
			cfgElements.push(this._parseConfigurationElement(srcElements[i]));
		}
		
		return new jazz.core.Extension(
				extensionData.uniqueIdentifier,
				extensionData.namespaceIdentifier,
				cfgElements);
	},
	
	_parseConfigurationElement: function(cfgElementData) {
		var children= [];
		for (var i=0; i<cfgElementData.children.length; i++) {
			children.push(
				this._parseConfigurationElement(cfgElementData.children[i]));
		}
		
		return new jazz.core.ConfigurationElement(
				cfgElementData.name,
				cfgElementData.value,
				cfgElementData.attributes,
				children,
				cfgElementData.namespaceIdentifier);
	}
};