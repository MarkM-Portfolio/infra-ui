/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Deferred",
	"ic-ee/data/ECMDocumentUsersDataStore"
], function (dojo, array, declare, lang, Deferred, ECMDocumentUsersDataStore) {

	/**
	 * Class that performs ACL checks to assert whether a user have access to a
	 * ECM file.
	 * 
	 */
	
	var ECMFileAccessChecker = declare("com.ibm.social.ee.data.ECMFileAccessChecker", null, {
	   //warning message string
	   warningMessageKey: "WARNING_PRIVATE_GENERIC", 
	
	   //callbacks array
	   eventHandles: [],
	
	   READER_ROLE: "Reader",
	   EDITOR_ROLE: "Editor",
	   CONTRIBUTOR_ROLE: "Contributor",
	   OWNER_ROLE: "Owner",
	   _cachedACL: false,
	   _validatedUsers: [],
	   aclObjects: {
	      explicitUsers: [],
	      communityMemberObj: null,
	      communityOwnerObj: null,
	      publicObj: null
	   },
	
	   constructor: function(args){
	      lang.safeMixin(this, args);
	      this._setupDUDS(this.ds, this.file);
	   },
	
	   _setupDUDS: function(fileDs, file){
	      var urlRoles = fileDs.getValue(file, "urlMembers");
	      var dudsOpts = {
	         url: urlRoles,
	         file: file,
	         net: this.net
	      };
	      this.DUDS = new ECMDocumentUsersDataStore(dudsOpts);
	   },
	
	   /**
	    * Perform the ACL check.
	    * 
	    * @param mentionedUser - the user node
	    */
	   checkAccess: function(mentionedUser) {
	      this._validateMention(mentionedUser, lang.hitch(this, function(validState) {
	         this._validatedUsers[mentionedUser.getUserId()] = validState;
	         
	         if (validState === "invalid") {
	            this._callHandler("notMember", mentionedUser);
	         } else {
	            this._callHandler("isMember", mentionedUser);
	         }
	         
	         this._callHandler("onComplete", mentionedUser);
	      }));
	   },
	   
	   _callHandler: function(handlerName, mentionedUser) {
	      var self = this;
	
	      if (this.eventHandles[handlerName]) {
	         var deferred = new Deferred();
	
	         deferred.addCallback(function(myUser) {self.eventHandles[handlerName](myUser); return myUser;});
	
	         deferred.callback(mentionedUser);
	      }
	   },
	
	   _validateMention: function(mentionedUser, callback) {
	      if (this._cachedACL) {
	         this._compareAgainstACL(mentionedUser, callback);
	      } else {
	         var params = {
	            scope: this,
	            onComplete: lang.hitch(this, this._handleCompletedRequest, mentionedUser, callback),
	            onError: lang.hitch(this, this._handleRequestError, mentionedUser, callback)
	         };
	         
	         this.DUDS.fetch(params);
	      }
	   },
	
	   _handleRequestError: function (mentionedUser, callback, error, request) {
	      this.onRequestsCompleted(mentionedUser, callback, error);
	   },
	
	   _handleCompletedRequest: function (mentionedUser, callback, items, request) {
	      this.userRoles = items;
	      this._clearCachedVariables();
	      this.onRequestsCompleted(mentionedUser, callback);
	   },
	
	   _clearCachedVariables: function() {
	      this._cachedACL = true;
	      this._validatedUsers = [];
	      this.aclObjects.explicitUsers = [];
	      this.aclObjects.communityMemberObj = null;
	      this.aclObjects.communityOwnerObj = null;
	      this.aclObjects.publicObj = null;
	   },
	
	   onRequestsError: function(callback) { callback("invalid"); },
	
	   onRequestsCompleted: function(mentionedUser, callback, error) {
	      if(error)
	         this.onRequestsError(callback);
	      this._parseACL();
	      this._compareAgainstACL(mentionedUser, callback);
	   },
	
	   _parseACL: function() {
	      var dataStore = this.DUDS;
	      var values = {};
	      array.forEach(this.userRoles, function(item) {values[dataStore.getValue(item, "id")] = item;});
	
	      for (var id in values) {
	         var role = dataStore.getValue(values[id], "role");
	         var type = dataStore.getValue(values[id], "type");
	         if (values[id].isCommunityOwners())
	            this.aclObjects.communityOwnerObj = values[id];
	         else if (values[id].isCommunityMembers())
	            this.aclObjects.communityMemberObj = values[id];
	         else if (values[id].isPublic())
	            this.aclObjects.publicObj = values[id];
	         else {
	            switch (role) {
	            case this.EDITOR_ROLE:
	            case this.READER_ROLE:
	            case this.CONTRIBUTOR_ROLE:
	            case this.OWNER_ROLE:
	               this.aclObjects.explicitUsers.push(values[id])
	               break;
	            }
	         }
	      }
	   },
	
	   _compareAgainstACL: function(mentionedUser, callback) {
	      var validState = "invalid";
	
	      if (this._validatedUsers[mentionedUser.getUserId()]){
	         callback(this._validatedUsers[mentionedUser.getUserId()]);
	         return;
	      }
	
	      if (mentionedUser.isUserExternal()) {
	         callback("invalid");
	         return;
	      }
	
	      //#AUTHENTICATED-USERS was on the ACL. All non-external users are valid
	      if (this.aclObjects.publicObj){
	         callback("valid");
	         return;
	      }
	
	      for(var i in this.aclObjects.explicitUsers) {
	         var user = this.aclObjects.explicitUsers[i]; 
	         if(user && mentionedUser.getUserId() === user.id){
	            callback("valid");
	            return;
	         }
	      }
	
	      var commParams = {
	         url: this.routes.getUserCommunityRoleURL(this.communityId, mentionedUser.getUserId()),
	         handleAs: "json",
	         handle: lang.hitch(this, function(response) {
	            this._handleCommunityResponse(mentionedUser, callback, response);
	         })
	      };
	      //if commparams.url === null, call errorcallback
	      if(!commParams.url){
	         callback("invalid");
	         return;
	      }
	      
	      if(this.routes.oauth){
	         this.net.get(commParams);
	      }else{
	         dojo.xhrGet(commParams);
	      }
	   },
	   
	   _handleCommunityResponse: function(mentionedUser, callback, response) {
	      if(!response || response instanceof Error){
	         callback("invalid");
	         return;
	      }
	
	      if(!response.canViewCommunity){
	         callback("invalid");
	         return;
	      }
	
	      switch(response.role) {
	      case "owner":
	         callback("valid");
	         break;
	      case "member":
	         !!this.aclObjects.communityMemberObj ? callback("valid") : callback("invalid");
	         break;
	      }
	   },
	
	   addCallback : function(handle, callback) {
	      this.eventHandles[handle] = callback;
	   }
	});
	return ECMFileAccessChecker;
});
