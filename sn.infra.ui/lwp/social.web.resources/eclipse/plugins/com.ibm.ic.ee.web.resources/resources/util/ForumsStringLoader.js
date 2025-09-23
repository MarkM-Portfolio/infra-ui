/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/i18n!ic-forums/nls/strings"
], function (dojo, lang, i18nstrings) {

	lang.mixin(com.ibm.social.ee.util.ForumsStringLoader, {
		strings: i18nstrings
	});
	return com.ibm.social.ee.util.ForumsStringLoader;
});
