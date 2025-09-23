/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.personcard.widget.Localization");

dojo.require("dojo.i18n");
dojo.requireLocalization("com.ibm.social.personcard.widget", "strings");

dojo.declare(
		"com.ibm.social.personcard.widget.Localization",
		null,
{
		commonStrings: null,
		
		postMixInProperties: function(){
			this.commonStrings = dojo.i18n.getLocalization("com.ibm.social.personcard.widget", "strings");
	        dojo.mixin(this, this.commonStrings);
	        this.inherited(arguments);
		},
		
		getString: function(stringId, params) {
			return dojo.string.substitute(this.commonStrings[stringId], params);
		}
});
