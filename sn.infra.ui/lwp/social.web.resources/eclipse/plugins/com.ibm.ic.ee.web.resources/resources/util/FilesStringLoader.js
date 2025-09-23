/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/i18n!ic-files/nls/ui"
], function (dojo, lang, i18nui) {

	lang.mixin(com.ibm.social.ee.util.FilesStringLoader, {
		strings: i18nui
	});
	return com.ibm.social.ee.util.FilesStringLoader;
});
