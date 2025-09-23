/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(dojo, dijit, dojox){
return {depends: [["provide", "dojox.drawing._base"],
["require", "dojox.drawing.manager._registry"],
["require", "dojox.gfx"],
["require", "dojox.drawing.Drawing"],
["require", "dojox.drawing.util.oo"],
["require", "dojox.drawing.util.common"],
["require", "dojox.drawing.defaults"],
["require", "dojox.drawing.manager.Canvas"],
["require", "dojox.drawing.manager.Undo"],
["require", "dojox.drawing.manager.keys"],
["require", "dojox.drawing.manager.Mouse"],
["require", "dojox.drawing.manager.Stencil"],
["require", "dojox.drawing.manager.StencilUI"],
["require", "dojox.drawing.manager.Anchors"],
["require", "dojox.drawing.stencil._Base"],
["require", "dojox.drawing.stencil.Line"],
["require", "dojox.drawing.stencil.Rect"],
["require", "dojox.drawing.stencil.Ellipse"],
["require", "dojox.drawing.stencil.Path"],
["require", "dojox.drawing.stencil.Text"],
["require", "dojox.drawing.stencil.Image"],
["require", "dojox.drawing.annotations.Label"],
["require", "dojox.drawing.annotations.Angle"],
["require", "dojox.drawing.annotations.Arrow"],
["require", "dojox.drawing.annotations.BoxShadow"]],
defineResource: function(dojo, dijit, dojox){if(!dojo._hasResource["dojox.drawing._base"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.drawing._base"] = true;
dojo.provide("dojox.drawing._base");
dojo.experimental("dojox.drawing");


dojo.require("dojox.drawing.manager._registry");
dojo.require("dojox.gfx");
dojo.require("dojox.drawing.Drawing");
dojo.require("dojox.drawing.util.oo");
dojo.require("dojox.drawing.util.common");
dojo.require("dojox.drawing.defaults");
dojo.require("dojox.drawing.manager.Canvas");

// interactive managers
dojo.require("dojox.drawing.manager.Undo");
dojo.require("dojox.drawing.manager.keys");
dojo.require("dojox.drawing.manager.Mouse");
dojo.require("dojox.drawing.manager.Stencil");
dojo.require("dojox.drawing.manager.StencilUI"); // plugin? or as a require? good here? in toolbar?
dojo.require("dojox.drawing.manager.Anchors");

// standard stencils
dojo.require("dojox.drawing.stencil._Base");
dojo.require("dojox.drawing.stencil.Line");
dojo.require("dojox.drawing.stencil.Rect");
dojo.require("dojox.drawing.stencil.Ellipse");
dojo.require("dojox.drawing.stencil.Path");
dojo.require("dojox.drawing.stencil.Text");
dojo.require("dojox.drawing.stencil.Image");

// annotations are built within stencil/_Base.js
// would like to optionally include them, but for
// now it's mandatory.
dojo.require("dojox.drawing.annotations.Label");
dojo.require("dojox.drawing.annotations.Angle");
dojo.require("dojox.drawing.annotations.Arrow");
dojo.require("dojox.drawing.annotations.BoxShadow");

}

}};});
