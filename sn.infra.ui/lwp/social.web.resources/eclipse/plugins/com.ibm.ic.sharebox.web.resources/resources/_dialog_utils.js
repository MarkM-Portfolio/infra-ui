/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */
define([
	"dojo/_base/lang"
], function (lang) {

	if(!com.ibm.social.sharebox._dialog_utils.getInstance) {
	   lang.mixin(com.ibm.social.sharebox._dialog_utils, (function(){
		   var _instance;
		   function init() {
		      return {
		         close: function() {},
		         displayMessage: function(type, message){},
		         displayMessageHtml: function(type, messageHtml){},
		         shareAddActivityEntry: function(itemId) {},
		         setDirty: function(actionId, isDirty){},
		         setSubmitState: function(inProgress){},
		         onClose: function() {},
		         onForceResize: function() {}
		      };
		   }
	
		   return {
			   getInstance: function() {
				   if(!_instance) {
					   _instance = init();
				   }
				   return _instance;
			   }
		   };
	
		   
	   })());
	}
	return com.ibm.social.sharebox._dialog_utils;
});
