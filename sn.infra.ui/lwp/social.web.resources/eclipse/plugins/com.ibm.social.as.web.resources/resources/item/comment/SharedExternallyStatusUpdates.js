/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * Widget to show the Shared Externally message block in the Global Sharebox
 *
 * @author Marco Vicente
 */

/* globals com */

dojo.require("com.ibm.social.as.item.comment.SharedExternallyComments");

dojo.provide("com.ibm.social.as.item.comment.SharedExternallyStatusUpdates");

dojo.declare("com.ibm.social.as.item.comment.SharedExternallyStatusUpdates",
    com.ibm.social.as.item.comment.SharedExternallyComments, {

        postMixInProperties: function(){
            this.inherited(arguments);

            // set the warning message
            var statusUpdateWarningMessage = this.strings.externalUsersStatusUpdatesMsg;

            if(statusUpdateWarningMessage){
                this.warningMessage = statusUpdateWarningMessage;
            }
        }
    });
