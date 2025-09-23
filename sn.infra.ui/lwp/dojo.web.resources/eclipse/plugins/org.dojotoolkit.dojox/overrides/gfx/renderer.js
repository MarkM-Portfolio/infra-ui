/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define(["./_base","dojo/_base/lang", "dojo/_base/sniff", "dojo/_base/window", "dojo/_base/config", "./svg", "./vml"], function(g, lang, has, win, config, svg, vml) {
		var hasVML = !("SVGAngle" in win.global);
		
		has.add("vml", function() { return hasVML; });
		
		if(!hasVML)
				return svg;
			return vml;
});
