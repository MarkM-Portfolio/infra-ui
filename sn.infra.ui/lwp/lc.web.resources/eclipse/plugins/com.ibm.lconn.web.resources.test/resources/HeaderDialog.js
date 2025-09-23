/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.HeaderDialog");
dojo.require("com.ibm.oneui.controls.HoverDialog");

dojo.declare("lconn.test.HeaderDialog", com.ibm.oneui.controls.HoverDialog, {
	relativeY: -12, 
	orientation: "B",
	autofocus: true,
	
	createContents: function() {
		var d = document.createElement("div");
		d.innerHTML = "<div style='padding: 10px; width: 100px; text-align: center'><img class='lotusLoading' src='"+this._blankGif+"'> <span tabindex='0'>Loading...</span></div>";
		return d;
	}
});
