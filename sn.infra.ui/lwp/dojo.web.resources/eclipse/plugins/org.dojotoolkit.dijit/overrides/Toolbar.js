/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

//Overrides for dijit-legacy-requires
define([
	"require",
	"dojo/_base/declare", // declare
	"dojo/has",
	"dojo/keys", // keys.LEFT_ARROW keys.RIGHT_ARROW
	"dojo/ready",
	"./_Widget",
	"./_KeyNavContainer",
	"./_TemplatedMixin",
	"./ToolbarSeparator" // 248295: Enable "dijit-legacy-requires" feature for dijit backward compatibility
], function(require, declare, has, keys, ready, _Widget, _KeyNavContainer, _TemplatedMixin){

	// module:
	//		dijit/Toolbar

	return declare("dijit.Toolbar", [_Widget, _TemplatedMixin, _KeyNavContainer], {
		// summary:
		//		A Toolbar widget, used to hold things like `dijit/Editor` buttons

		templateString:
			'<div class="dijit" role="toolbar" tabIndex="${tabIndex}" data-dojo-attach-point="containerNode">' +
			'</div>',

		baseClass: "dijitToolbar",

		_onLeftArrow: function(){
			this.focusPrev();
		},

		_onRightArrow: function(){
			this.focusNext();
		}
	});
});
