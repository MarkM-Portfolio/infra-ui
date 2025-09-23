/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function () {
	/**
	 * When invoked, replaces the default dojo XHR behavior with the override from com.ibm.oneui.util.xhr
	 */
	dojo.provide('com.ibm.oneui.util.xhrintercept');
	dojo.require('com.ibm.oneui.util.xhr');
	
	var originalXhr = dojo.xhr;
	
	var f = com.ibm.oneui.util.xhr;
	f.setMethod(originalXhr);
	
    dojo.xhr = f;
})();
