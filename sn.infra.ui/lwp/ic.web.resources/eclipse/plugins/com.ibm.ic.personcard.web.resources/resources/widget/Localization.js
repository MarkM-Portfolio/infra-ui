/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/i18n",
	"dojo/i18n!ic-personcard/widget/nls/strings",
	"dojo/string"
], function (declare, lang, i18n, i18nstrings, string) {

	var Localization = declare(
			"com.ibm.social.personcard.widget.Localization",
			null,
	{
			commonStrings: null,
			
			postMixInProperties: function(){
				this.commonStrings = i18nstrings;
		        lang.mixin(this, this.commonStrings);
		        this.inherited(arguments);
			},
			
			getString: function(stringId, params) {
				return string.substitute(this.commonStrings[stringId], params);
			}
	});
	return Localization;
});
