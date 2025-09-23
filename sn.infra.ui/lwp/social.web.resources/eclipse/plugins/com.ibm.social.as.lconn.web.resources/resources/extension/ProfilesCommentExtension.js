/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.extension.ProfilesCommentExtension");

dojo.require("com.ibm.social.as.extension.CommentExtension");

dojo.declare("com.ibm.social.as.lconn.extension.ProfilesCommentExtension", 
[com.ibm.social.as.extension.CommentExtension],
{	
	onLoginClicked: function(){
		profiles_gotoLoginRedirect();
	}
});
