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
dojo.provide("jazz.core.ConfigurationElement");

dojo.declare("jazz.core.ConfigurationElement", null, {
	
	// summary:
	//		an object which represents the user-defined contents of an extension
	//		in a plug-in manifest
	// usage notes:
	//		do not instantiate
	// since:
	//		0.5
	
	getAttribute: function(/*String*/name) {
		// summary:
		//		returns the String value of the attribute with the specified
		//		name or null if there is no value
		// name:
		//		the name of the attribute
		// since:
		//		0.5
		var result = this._attributes[name];
		if (typeof result == "undefined")
			return null;
		return result;
	},
	
	getAttributeNames: function() {
		// summary:
		//		returns an array containing the attribute names included with
		//		this configuration element or an empty array if this
		//		configuration element has no attributes; never null
		// since:
		//		0.5
		var propArr= [];
		for (var prop in this._attributes) {
			propArr.push(prop);
		}
		return propArr;
	},
	
	getChildren: function() {
		// summary:
		//		returns an array containing the child configuration elemement of
		//		this configuration element or an empty array if this
		//		configuration element has no children; never null
		// since:
		//		0.5
		
		// TODO make defensive copy
		return this._children;
	},
	
	getName: function() {
		// summary:
		//		returns the name of this configuration element; never null
		// since:
		//		0.5
		return this._name;
	},
	
	getValue: function() {
		// summary:
		//		returns the value of this configuration element; never null
		// since:
		//		0.5
		return this._value;
	},
	
	toString: function() {
		// summary:
		//		returns the string form of this configuration element; never
		//		null
		// since:
		//		0.5
		
		var attribStr= "{";
		var attribs= this.getAttributeNames();
		for (var i=0; i<attribs.length; i++) {
			attribStr += attribs[i] + ": " + this.getAttribute(attribs[i]);
			if (i < attribs.length-1) {
				attribStr += ", ";
			}
		}
		attribStr += "}";
		var childrenStr= "[";
		var children= this.getChildren();
		for (i=0; i<children.length; i++) {
			childrenStr += "{" + children[i].toString() + "}";
			if (i < children.length-1) {
				childrenStr += ", ";
			}
		}
		childrenStr += "]";
		
		return "name: " + this.getName() + ", value: " + this.getValue() +
				", attributes: " + attribStr + ", children: " + childrenStr;
	},
	
	//
	// Internal methods; do not call
	//
	
	constructor: function(name, value, attributes, children, namespaceIdentifier) {
		this._name       = name;
		this._value      = value;
		this._attributes = attributes;
		this._children   = children;
		this._namespaceIdentifier = namespaceIdentifier;
	}
	
});
