/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/lang"
], function (lang) {

	window.dynamicLoadControllerConfig = lang.mixin({
		activityStreamModelClass: "com.ibm.social.test.integration.as.model.TestDynamicLoadModel"
	}, window.activityStreamConfig);
	return com.ibm.social.test.integration.as.config.homepage.dynamicLoadControllerConfig;
});
