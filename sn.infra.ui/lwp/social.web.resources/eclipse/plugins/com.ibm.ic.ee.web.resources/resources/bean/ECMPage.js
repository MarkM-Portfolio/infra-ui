/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/ECMPublishedDoc"
], function (declare, ECMPublishedDoc) {

	var ECMPage = declare("com.ibm.social.ee.bean.ECMPage", ECMPublishedDoc, {
	   category: "page",
	// getCategory: function() {return "page";},
	   getType: function() { return "page"; }
	});
	
	return ECMPage;
});
