/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                 */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * Class that performs ACL checks to assert whether a user have access to a
 * file.
 * 
 * @author Marco Vicente
 */

dojo.provide("com.ibm.social.ee.data.FileAccessChecker");

dojo.declare("com.ibm.social.ee.data.FileAccessChecker", null, {
	
	// file id
	fileId: null,
	
	//routes
	routes: null,
	
	//warning message string
	warningMessageKey: "WARNING_PRIVATE_GENERIC", 
	
	//callbacks array
	eventHandles: [],
	
	// network object for xhr
	network: null,
	
	constructor: function(args){
		dojo.safeMixin(this, args);
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
		
		var options = {url: url,
				 preventCache: true,
				 headers: {
				      "X-LCONN-USER": userId
				    },
				 handle: function(error, ioargs){
					 
					 switch(ioargs.xhr.status){
				 		case 200 :{
				 		
				 			if (self.eventHandles["isMember"]) {
								// Create a deferred to fire the callback.
								var deferred = new dojo.Deferred();
								
								deferred.addCallback(function(myUser) {self.eventHandles["isMember"](myUser); return myUser;});
								
								deferred.callback(user);
							}
				 			
				 			self._handleComplete();
				 			
				 			break;
				 		}
				 		case 403 :{
					 		
				 			if (self.eventHandles["notMember"]) {
								// Create a deferred to fire the callback.
								var deferred = new dojo.Deferred();
								
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
				};
		
		if(this.network) {
			this.network.head(options);
		} else {
			this._networkHead(options);
		}
    },
    _handleError: function(error) {
    	
    	var self = this;
    	
		if (this.eventHandles["error"]) {
			var deferred = new dojo.Deferred();
						
			deferred.addCallback(function(myError) {self.eventHandles["error"](myError);return myError;});
			
			deferred.callback(error);
		 }
    },
    _handleComplete: function() {
    	
    	var self = this;
    	
    	if (this.eventHandles["onComplete"]) {
			var deferred = new dojo.Deferred();
			
			deferred.addCallback(function() {self.eventHandles["onComplete"]();});
			
			deferred.callback();
		}
    },
    _networkGet: function (opts) {
 	   (dojo.getObject("com.ibm.social.as.util.xhr.XhrHandler") || dojo).xhrGet(opts);
 	},
 	
 	_networkHead: function (opts) {
 		
 		var handler = dojo.getObject("com.ibm.social.as.util.xhr.XhrHandler");
 		
 		if(handler)
 			handler.xhrHead(opts);
 		else
 			dojo.xhr("HEAD", opts);
  	},
  	
 	addCallback : function(handle, callback) {
 	      this.eventHandles[handle] = callback;
 	},
    
});