/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-as/extension/CommentExtension"
], function (declare, CommentExtension) {

	var ProfilesCommentExtension = declare("com.ibm.social.as.lconn.extension.ProfilesCommentExtension", 
	CommentExtension,
	{	
		onLoginClicked: function(){
			profiles_gotoLoginRedirect();
		}
	});
	return ProfilesCommentExtension;
});
