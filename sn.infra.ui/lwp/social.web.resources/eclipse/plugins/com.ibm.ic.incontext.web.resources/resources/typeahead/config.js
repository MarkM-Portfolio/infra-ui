/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */
define([
	"dojo/_base/lang"
], function (lang) {

	lang.mixin(com.ibm.social.incontext.typeahead.config, {
	   pageSize: 15,
	   minChars: 2,
	   searchDelay: 400
	});
	return com.ibm.social.incontext.typeahead.config;
});
