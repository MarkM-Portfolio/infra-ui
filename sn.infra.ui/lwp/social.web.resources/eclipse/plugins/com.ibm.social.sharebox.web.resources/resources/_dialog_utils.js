/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
dojo.provide("com.ibm.social.sharebox._dialog_utils");

if(!com.ibm.social.sharebox._dialog_utils.getInstance) {
   dojo.mixin(com.ibm.social.sharebox._dialog_utils, (function(){
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