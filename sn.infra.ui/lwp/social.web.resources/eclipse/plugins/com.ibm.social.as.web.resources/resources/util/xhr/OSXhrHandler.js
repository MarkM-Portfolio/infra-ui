/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.xhr.OSXhrHandler");

dojo.require("com.ibm.social.ee.util.OAuthHelper");
dojo.require("com.ibm.social.incontext.NetworkOS");

/**
 * XHR handler object for OpenSocial requests. Mixin to your class if you want
 * to make requests using the OpenSocial API.
 * 
 * @author BrianOG
 */

com.ibm.social.as.util.xhr.OSXhrHandler = {

	initOSXhrHander: function() {
		var	OAUTH_SERVICE = "connections_service",
	    	OAUTH_WINDOW_WIDTH = 800,
	    	OAUTH_WINDOW_HEIGHT = 600,
	    	ID_WAITING_DIV = "waiting",
	    	ID_NEEDAUTH_DIV = "needAuth",
	    	ID_LOTUSMAIN_DIV = "gadgetMainContent",
	        ID_OAUTHQUEST_DIV = "oAuthQuestion",
	        ID_OAUTHQUEST_WAITING_DIV = "oAuthQuestionWait",
	    	GADGET_DIV_IDS = [ID_WAITING_DIV, ID_NEEDAUTH_DIV, ID_LOTUSMAIN_DIV];

		function getHeader (header, map) {
	         if (header in map) {
	            return map[header];
	         }
	         else if (header.toLowerCase() in map) {
	            return map[header.toLowerCase()];
	         }
	         else {
	            return null;
	         }
	      }
		
		
		function ssoReauthDetector (text, rc, headers) {
	          console.log("rc = ", rc, ", headers = ", headers);
	          if (rc == 401 || rc == 302) return true;
	          if (dojo.isIE && rc == 0) return true;
	          // Look at the content type being returned. If text/html check the X-LConn-Auth header
	          var contentType = getHeader("Content-Type", headers);
	          var textRe = /^text\/html/;
	          if (textRe.exec(contentType) && rc >= 200 && rc < 300 && rc != 204) {
	             var lconnAuth = getHeader("X-LConn-Auth", headers);
	             if (lconnAuth == "false") return true;
	          }
	          return false;
	       }
		
		var oAuthDefaults = { };
		if ( asc.useOAuth) {
			oAuthDefaults[gadgets.io.RequestParameters.OAUTH_SERVICE_NAME] = OAUTH_SERVICE;
			oAuthDefaults[gadgets.io.RequestParameters.AUTHORIZATION] = gadgets.io.AuthorizationType.OAUTH2;
		} else {
            oAuthDefaults[gadgets.io.RequestParameters.AUTHORIZATION] = gadgets.io.AuthorizationType.SSO;
            oAuthDefaults[gadgets.io.RequestParameters.SSO_REAUTH_DETECTOR] = ssoReauthDetector;
         }
		
		var showOne = this.showOne;
		
		this.network = new com.ibm.social.incontext.NetworkOS({   
			oAuthDefaults: oAuthDefaults,            
			onAuthApproval: function(oauthApprovalUrl, retryFunction, retryOpts) {
				if(asc.filePicker) {
					asc.filePicker.close();
				}
				var onOpen = function() {
					showOne(GADGET_DIV_IDS, ID_WAITING_DIV);
				};
				var onClose = function() {
					showOne(GADGET_DIV_IDS, ID_LOTUSMAIN_DIV);
					if (retryFunction) {
						retryFunction(retryOpts);
					}
				}; 
				var helper = com.ibm.social.ee.util.OAuthHelper;
	            dojo.forEach(dojo.query(".eeOAuthImg"), function(imgEl) { helper.addImgSrc(imgEl); });
	            dojo.forEach(dojo.query(".eeOAuthInfo"), function(infoEl) { helper.createInfoNode(infoEl); });
	            var authLink = helper.createAuthLink(dojo.byId(ID_OAUTHQUEST_DIV));
	            var confirmLink = helper.createAuthDoneLink(dojo.byId(ID_OAUTHQUEST_WAITING_DIV));
				var popup = new gadgets.oauth.Popup(oauthApprovalUrl, "height=" + OAUTH_WINDOW_HEIGHT + ",width=" + OAUTH_WINDOW_WIDTH, onOpen, onClose);
				authLink.onclick = popup.createOpenerOnClick();
				confirmLink.onclick = popup.createApprovedOnClick();
				showOne(GADGET_DIV_IDS, ID_NEEDAUTH_DIV);
 
				// Check + call render complete
				if (popup.renderComplete) {
					popup.renderComplete();
				}
			},
	         onSSOReauth: function () {
	             var handler = new cre$.sso.ReauthHandler().createHandlerOnClick()();
	          }
		});                        
		
	},
	
	showOne: function(ids, idToShow) {        
		dojo.forEach(ids, function(id) { 
			var e = dojo.byId(id);
			if (id === idToShow) e.style.display = "";
			else e.style.display = "none";
		});
	},
	
	/**
	 * Main XHR function.
	 * @param method
	 * @param args
	 */
	xhr: function(method, args){
		var xhr = {"cancel":function(){}}; // always provide empty cancel, just in case
		var lmethod = method.toLowerCase();
		if ( lmethod === "get" ) {
			xhr = this.network.get(args);
		} else if ( lmethod === "post" ) {
			xhr = this.network.post(args);
		} else if ( lmethod === "head" ) {
			xhr = this.network.head(args);
		} else if ( lmethod === "delete" ) {
			xhr = this.network.deleteJson(args);
		} else if ( lmethod === "put" ) {
			xhr = this.network.put(args);
		}
		return xhr;
	}
};
