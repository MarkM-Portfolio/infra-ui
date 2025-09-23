/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/comment/SharedExternallyComments"
	], function (declare, SharedExternallyComments) {
	
		/**
		 * Widget to show the Shared Externally message block in the Global Sharebox
		 *
		 * @author Marco Vicente
		 */
		
		/* globals com */
		
		var SharedExternallyStatusUpdates = declare("com.ibm.social.as.item.comment.SharedExternallyStatusUpdates",
		    SharedExternallyComments, {
		
		        postMixInProperties: function(){
		            this.inherited(arguments);
		
		            // set the warning message
		            var statusUpdateWarningMessage = this.strings.externalUsersStatusUpdatesMsg;
		
		            if(statusUpdateWarningMessage){
		                this.warningMessage = statusUpdateWarningMessage;
		            }
		        }
		    });
		return SharedExternallyStatusUpdates;
	});
