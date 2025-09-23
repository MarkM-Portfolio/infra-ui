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
dojo.provide("jazz.core.RegistryFactory");

dojo.require("jazz.core.ExtensionRegistry");

jazz.core.RegistryFactory = {
	
	// summary:
	//		provides access to the default extension registry specified by the
	//		registry provider
	// usage notes:
	//		- access this object via 'static' methods (e.g.
	//		  jazz.core.RegistryFactory.getRegistry())
	//		- cannot be instantiated
	// since:
	//		0.5
	
	getRegistry: function() {
		// summary:
		//		returns the default extension registry specified by the registry
		//		provider; may return null if the provider has not been set or if
		//		the	registry has not been created
		// since:
		//		0.5
		if(!this._theRegistry) {
			this.createRegistry();
		}
		
		return this._theRegistry;
	},
	
	//
	// Internal methods; do not call
	//
	
	createRegistry: function() {
		var extRegData= net.jazz.ajax._extensionRegistryData;
		if (!extRegData) {
			throw new Error("Extension registry data not present");
		}
		this._theRegistry=
				new jazz.core.ExtensionRegistry(extRegData);
		net.jazz.ajax._extensionRegistryData= null;
	}
	
};