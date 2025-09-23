/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.DialogHelper");

dojo.declare("com.ibm.social.as.util.DialogHelper", null, {
	repositionDialog: function(node) {
		setTimeout(function () {
			if ( activityStreamAbstractHelper.isGadget ) {
				var top = ""  + (dojo.position(node).y + 15) + "px";
				dojo.style(lconn.core.DialogUtil._dialogs[lconn.core.DialogUtil._dialogs.length-1].domNode, { top: top });
			}
		}, 0);
	}
});
