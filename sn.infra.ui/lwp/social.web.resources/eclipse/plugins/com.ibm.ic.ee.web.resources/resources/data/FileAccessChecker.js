/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.           */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Deferred"
], function (dojo, declare, lang) {

	/**
	 * Class that performs ACL checks to assert whether a user have access to a
	 * file.
	 * 
	 * @author Marco Vicente
	 */
	
	var FileAccessChecker = declare("com.ibm.social.ee.data.FileAccessChecker", null, {
		
		// file id
		fileId: null,
		
		//routes
		routes: null,
		
		//warning message string
		warningMessageKey: "WARNING_PRIVATE_GENERIC", 
		
		//callbacks array
		eventHandles: [],
		
		constructor: function(args){
			lang.safeMixin(this, args);
		},
		
		/**
		 * Perform the ACL check.
		 * 
		 * @param user - the user node
		 * 
		 * @return boolean - true if the user can access the file
		 */
	    checkAccess: function(user) {
		    
	    	var self = this;
	    	
			var url = this.routes.getACLUrl(this.fileId);
			
			var userId = user.data;
			
			this._networkHead(
				{url: url,
				 preventCache: true,
				 headers: {
				      "X-LCONN-USER": userId
				    },
				 handle: function(error, ioargs){
					 
					 switch(ioargs.xhr.status){
				 		case 200 :{
				 		
				 			if (self.eventHandles["isMember"]) {
								// Create a deferred to fire the callback.
								var deferred = new Deferred();
								
								deferred.addCallback(function(myUser) {self.eventHandles["isMember"](myUser); return myUser;});
								
								deferred.callback(user);
							}
				 			
				 			self._handleComplete();
				 			
				 			break;
				 		}
				 		case 403 :{
					 		
				 			if (self.eventHandles["notMember"]) {
								// Create a deferred to fire the callback.
								var deferred = new Deferred();
								
								deferred.addCallback(function(myUser) {self.eventHandles["notMember"](myUser); return myUser;});
								
								deferred.callback(user);
							}
				 			
				 			self._handleComplete();
				 			
				 			break;
				 		}
					 }
					},
					error: function(error, ioargs) {
						
						switch(ioargs.xhr.status){
							
							case 403 : {
								//not an error, is an expected response code, will be dealed at 'handle'
								break;
							}
							
							case 404: case 405: default: {
								self._handleError(error);
							}
						}
					}
				}
			);
	    },
	    _handleError: function(error) {
	    	
	    	var self = this;
	    	
			if (this.eventHandles["error"]) {
				var deferred = new Deferred();
							
				deferred.addCallback(function(myError) {self.eventHandles["error"](myError);return myError;});
				
				deferred.callback(error);
			 }
	    },
	    _handleComplete: function() {
	    	
	    	var self = this;
	    	
	    	if (this.eventHandles["onComplete"]) {
				var deferred = new Deferred();
				
				deferred.addCallback(function() {self.eventHandles["onComplete"]();});
				
				deferred.callback();
			}
	    },
	    _networkGet: function (opts) {
	 	   (lang.getObject("com.ibm.social.as.util.xhr.XhrHandler") || dojo).xhrGet(opts);
	 	},
	 	
	 	_networkHead: function (opts) {
	 		
	 		var handler = lang.getObject("com.ibm.social.as.util.xhr.XhrHandler");
	 		
	 		if(handler)
	 			handler.xhrHead(opts);
	 		else
	 			dojo.xhr("HEAD", opts);
	  	},
	  	
	 	addCallback : function(handle, callback) {
	 	      this.eventHandles[handle] = callback;
	 	}
	    
	});
	return FileAccessChecker;
});
