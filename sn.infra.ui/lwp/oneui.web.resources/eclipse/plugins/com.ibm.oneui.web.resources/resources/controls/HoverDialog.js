/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
	dojo.provide("com.ibm.oneui.controls.HoverDialog");
	dojo.require("com.ibm.oneui.controls.HoverPopup");
	dojo.require("com.ibm.oneui.controls._HoverDialogMixin");
	
	var masterDialogPopup;
	
	/**
	 * @class com.ibm.oneui.controls.HoverDialog
	 * @extends com.ibm.oneui.controls.HoverPopup
	 * @extends com.ibm.oneui.controls._HoverDialogMixin
	 * @author Clayton Coleman <claycole@us.ibm.com>
	 */
	dojo.declare("com.ibm.oneui.controls.HoverDialog", [com.ibm.oneui.controls.HoverPopup, com.ibm.oneui.controls._HoverDialogMixin],
		/** @lends com.ibm.oneui.controls.HoverDialog */ {
		programmatic: true,
		
		/** Gets or create the master dialog popup */
		_getMasterPopup: function() {
			if (!masterDialogPopup)
				masterDialogPopup = new com.ibm.oneui.controls.internal._MasterPopup({place: "before"});
			return masterDialogPopup;
		}
	});
})();
