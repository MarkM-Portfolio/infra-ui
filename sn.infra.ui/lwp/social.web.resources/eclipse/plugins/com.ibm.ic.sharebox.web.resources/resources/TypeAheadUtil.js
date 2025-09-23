/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define([
	"dojo/_base/lang",
	"dojo/topic"
], function (lang, topic) {

	(function () {
	   var util = com.ibm.social.sharebox.TypeAheadUtil;
	   
	   function preventCloseOnEscape() {
	      ibm.connections.sharedialog.preventCloseOnEsc();
	   }
	   
	   function allowCloseOnEscape() {
	      ibm.connections.sharedialog.enableCloseOnEsc();
	   }
	   
	   util.registerHandlers = function() {
	      if (lang.getObject("ibm.connections.sharedialog")) {
	         topic.subscribe("lconn/core/mentions/startTrack", preventCloseOnEscape);
	         topic.subscribe("lconn/core/mentions/stopTrack", allowCloseOnEscape);
	         topic.subscribe("lconn/core/mentions/blur", allowCloseOnEscape);
	         topic.subscribe("lconn/core/mentions/focus", function(tracking) { if(tracking) { preventCloseOnEscape(); }});
	      }
	   }
	})();
	return com.ibm.social.sharebox.TypeAheadUtil;
});
