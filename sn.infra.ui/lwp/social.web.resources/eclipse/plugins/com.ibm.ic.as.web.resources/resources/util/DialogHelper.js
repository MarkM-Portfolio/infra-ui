/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/dom-geometry",
		"dojo/dom-style"
	], function (declare, domGeometry, domStyle) {
	
		var DialogHelper = declare("com.ibm.social.as.util.DialogHelper", null, {
			repositionDialog: function(node) {
				setTimeout(function () {
					if ( activityStreamAbstractHelper.isGadget ) {
						var top = ""  + (domGeometry.position(node).y + 15) + "px";
						domStyle.set(lconn.core.DialogUtil._dialogs[lconn.core.DialogUtil._dialogs.length-1].domNode, { top: top });
					}
				}, 0);
			}
		});
		return DialogHelper;
	});
