/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean"
], function (dojo, declare, AtomBean) {

	var ForumRecommendation = declare("com.ibm.social.ee.bean.ForumRecommendation", AtomBean, {
	   constructor: function() {
	      // Mixin the author to the main bean so user attributes can be read off of main bean
	      declare.safeMixin(this, this.getAuthor());
	   }
	});
	return ForumRecommendation;
});
