/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(dojo, dijit, dojox){
return {depends: [["provide", "dijit._tree.dndSource"],
["require", "dijit.tree.dndSource"]],
defineResource: function(dojo, dijit, dojox){if(!dojo._hasResource["dijit._tree.dndSource"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._tree.dndSource"] = true;
dojo.provide("dijit._tree.dndSource");
dojo.require("dijit.tree.dndSource");

// TODO: remove this file in 2.0
dojo.deprecated("dijit._tree.dndSource has been moved to dijit.tree.dndSource, use that instead", "", "2.0");

dijit._tree.dndSource = dijit.tree.dndSource;

}

}};});
