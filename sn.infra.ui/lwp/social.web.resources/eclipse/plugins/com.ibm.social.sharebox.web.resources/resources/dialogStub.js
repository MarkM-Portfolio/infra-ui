/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 *	Stub to prefetch Sharebox dialog and control it through a proxy object
 */
(function() {
dojo.provide("com.ibm.social.sharebox.dialogStub");
dojo.require("net.jazz.ajax.xdloader");

// 8 seconds but could be configurable
var TIMEOUT = 8000;

var loaded = false;
function _dialogLoaded(cb) {
	loaded = true;
	if (typeof cb === 'function') cb();
}

function _loadSharebox(cb) {
	net.jazz.ajax.xdloader.load_async("com.ibm.social.sharebox.dialog", dojo.partial(_dialogLoaded, cb));
}
function _initSharebox() {
	com.ibm.social.sharebox.init();
}
function _showSharebox() {
	com.ibm.social.sharebox.show();
}

dojo.provide("com.ibm.social.sharebox.dialogProxy");
com.ibm.social.sharebox.dialogProxy = {
	show: function() {
		if (loaded) {
			_showSharebox();
		} else {
			_loadSharebox(_showSharebox);
		}
	}
};

dojo.addOnLoad(function() {
	//Check if share button is displayed - If no share button (aka anonymous use case, do NOT load
	var shareNode = dojo.byId("headerSharebox");
	if(shareNode && (dojo.style(shareNode,"display") != "none")) {
		setTimeout(function() {
			_loadSharebox(_initSharebox);
		}, TIMEOUT);
	}
});

})();