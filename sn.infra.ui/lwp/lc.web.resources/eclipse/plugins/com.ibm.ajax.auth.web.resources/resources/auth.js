/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.ajax.auth");

/**
 * com.ibm.ajax.auth provides Dojo applications with a central authentication and detection framework.  Applications may use this class to allow
 * arbitrary third parties to participate in authentication detection.
 * 
 * Providing authentication detection for all callers:
 *     Applications may choose to wrap the standard dojo xhr methods with a security aware version.  This solution offers 3rd parties
 *     transparent authentication detection - any call to dojo xhr will pass through the same security checks.  To intercept login
 *     for standard dojo requests, call
 *     
 *         com.ibm.ajax.auth.interceptDojoXhr();
 *         com.ibm.ajax.auth.isUrlSecure = function(url) {
 *            return url.indexOf("/someurl/to/form/protected/api") == 0; // naive impl
 *         };
 *         
 *     Implementors may also choose to intercept Dojo themselves and call the appropriate methods.  
 * 
 * Making your dojo.xhr* methods authentication aware:
 *     Check if the class "com.ibm.ajax.auth" was available in the current javascript runtime.  Call prepareSecure on the arguments 
 *     that would be passed to dojo.xhrGet.  Note that prepareSecure() is intended for URLs that are protected by form authentication.
 *     If the URL is not protected by authentication prepareSecure() is not necessary.
 *
 *         var args = {
 *            url: "/someurl/to/form/protected/api",
 *            handleAs: "xml",
 *            handle: function() {alert("handled request");}
 *         };
 *         if (dojo.getObject("com.ibm.ajax.auth"))
 *            com.ibm.ajax.auth.prepareSecure(args);
 *         dojo.xhrGet(args);
 *
 *     If an authentication challenge is detected on your call, your handle method will be passed a Dojo Error object with a single member
 *     variable "dojoType" that is equal to "unauthenticated".
 *
 *     This would be used by a component that was providing auth.js itself (in a larger dojo environment) and was unsure whether the 
 *     calling environment had already wrapped Dojo.  Components that may be used in many different contexts should use this pattern.
 * 
 */
com.ibm.ajax.auth = {
         
   contentTypeRegex: /^text\/html/,
   ignoredDojoErrors: ["cancel","timeout"],
   nonHtmlTypes: ["xml","json","json-comment-optional"],
   checkFromCaller: true,
   checkByContentType: true,
   checkByStatusCode: true,
   checkAllStatusCodes: false,
   checkByXLConnAuth: false,
   authenticationChecks: [],
   
   /**
    * Intercept calls to dojo.xhr* and dojo.rawXhr* methods to check for authentication.  Will also override dojo.io.iframe.send
    * if the class has been included.
    *
    * Intercepted XHR methods will now look for an "auth" object on the property arguments passed to the method.  The standard
    * implementation reads the following variables:
    *    auth: {
    *       secured: boolean true/false (optional)
    *          If false, the URL is assumed to be insecure and will not be checked for authentication by the standard logic.
    *          If true, the URL is assumed to be secure and will be checked for authentication by the standard logic.
    *          If undefined or null, the URL will be passed to the isUrlSecure function passed to interceptDojoXhr to determine 
    *             whether authentication should be checked
    *       isAuthRequired: function(response, ioArgs) (optional)
    *          Passed to prepareSecure as the second argument if specified. 
    *       onLogin:
    *          Passed to prepareSecure as the third argument if specified
    * 
    * @param A function to determine whether a URL is secured.
    */
   interceptDojoXhr: function(isUrlSecure) {
      if (this._intercepted) {
         return;
      }
      this._intercepted = true;
      if (isUrlSecure) {
         this.isUrlSecure = isUrlSecure;
      }
      dojo.xhr = dojo.hitch(dojo, this.xhrIntercept, this, dojo.xhr);
      if (dojo.getObject("dojo.io.iframe")) {
         dojo.io.iframe.send = dojo.hitch(dojo.io.iframe, this.ioIntercept, this, dojo.io.iframe.send);
      }
   },
   
   /**
    * This method will wrap ioArgs normally sent to the dojo xhr methods with a special handler function that will check for form 
    * authentication redirection on a request.  This method supports dojo.xhrGet, dojo.xhrPost, dojo.xhrDelete, dojo.xhrPut,
    * dojo.io.iframe.send, and dojo.io.script.send.
    *
    * The testForValidOutput method will be invoked (if specified) with the response and the ioArgs arguments that are normally 
    * passed to the dojo.xhr methods.
    *
    * The onauthenticated method is optional, and will be invoked when the provider 
    * determines the user is successfully authenticated.  
    *
    * By default this function will send a request header "Pragma: WWW-Authenticate=XHR".  To avoid sending this header pass false
    * to bypassXhrAuthHeader.
    *
    * The handler method added to the ioArgs would check that the response status code is >= 200 && < 300, and that the mime-type is
    * text/html.
    *
    * @return A version of args suitable to be passed to dojo.xhrGet/xhrPost/xhrDelete/xhrPut/xhrRawPost/io.iframe.send()
    */
   prepareSecure: function( /* object */ args, /* function(response,ioArgs) optional */ isAuthRequired, /* function() optional */ onauthenticated, /* boolean optional */ bypassXhrAuthHeader ) {
      // Prevent calling prepareSecure more than once for the same set of arguments
      if (args["com.ibm.ajax.auth.prepareSecureCalled"]) {
         return args;
      }
      args["com.ibm.ajax.auth.prepareSecureCalled"] = true;

      // The "Pragma: WWW-Authenticate=XHR" indicates that the client prefers that the server return a 401
      // when not authenticated.
      if (!bypassXhrAuthHeader) {
         var h = args.headers = args.headers || {};
         var p = h.Pragma;
         if (!dojo.isArray(p)) {
            p = h.Pragma = p ? [p] : [];
         }
         p.push("WWW-Authenticate=XHR");
      }
      
      args._handle = args.handle;
      args.handle = dojo.partial(this.testAuthenticationHandler, this, isAuthRequired, onauthenticated);

      return args;
   },
   
   /**
    * When a request is determined to require authentication, the authenticationRequired function passed to this function will 
    * be invoked with the following arguments:
    *   - the response object from dojo
    *   - the ioArgs object that was passed to dojo
    *   - the onauthenticated function provided to the checkRequest/checkHtmlRequest methods (may be null)
    */
   setAuthenticationHandler: function( /* function(response, ioArgs, onauthenticated) */ authenticationRequired) {
      this.authenticationHandler = authenticationRequired;
   },
   
   /**
    * By default there are three authentication tests performed when a request is returned from dojo.xhrGet/Post/Delete/Put.
    *    1) If the caller provides a test themselves (they know that their particular response may be confused for a
    *       login redirect)
    *    2) If the handleAs type is 'xml', 'json', or 'json-comment-optional' and the server returned 'text/html' or
    *       one of the other common HTML mime types, we assume that a redirect was sent from the server and the browser
    *       silently redirected the user (if the status code was >= 200 and < 300).
    *    3) If the status code is 302 in the response, which typically only occurs when multiple redirects are sent by the 
    *       server and the browser decides not to handle all of them, we assume a login redirect was the cause.  Also, some
    *       security providers like SPNEGO may return 401.  Finally, in Internet Explorer some redirects may result in a
    *       status code of 0 or "unknown"
    *
    * The three booleans passed to this function will set whether the specific check is enabled.  By default all three
    * are true.
    */
   setDefaultAuthenticationTests: function(checkFromCaller,checkByContentType,checkByStatusCode) {
      this.checkFromCaller = checkFromCaller;
      this.checkByContentType = checkByContentType;
      this.checkByStatusCode = checkByStatusCode;
   },
   
   /**
    * This method allows users to add their own custom login checks via a handler function.  The function takes three
    * arguments:
    *   - a reference to the auth object
    *   - the response object from dojo
    *   - the ioArgs object that was passed to dojo
    *
    * and returns true if the request requires authentication.
    *
    * See setDefaultAuthenticationTests(3) for more information about the default checks that are performed.
    */
   addAuthenticationCheck: function( /* function(auth, response, ioArgs) */handler ) {
      if (handler) {
         this.authenticationChecks.push(handler);
      }
   },
   
   /**
    * Callers of the API may choose to override the authentication test mechanism for this class wholesale by calling this
    * this method with an override.  This function will be invoked in place of the default method "isAuthenticationRequired"
    */
   setAuthenticationTest: function( /* function(auth, response, ioArgs) */handler) {
      this.isAuthenticationRequired = dojo.partial(handler, this);
   },
  
   /**
    * Use this method to check whether a specific request requires authentication after a request has already
    * been received.  Should only be used when the default authentication test and handling behavior is not desired (for 
    * instance, when an application is initializing itself and needs to check whether it is authenticated).
    *
    * Implementors may choose to override this entire function by calling setAuthenticationTest(1).
    */
   isAuthenticationRequired: function(response, ioArgs) {
      if (this.isPossibleLoginRedirect(response, ioArgs)) {
         return true;
      }
      var i;
      for (i=0; i<this.authenticationChecks.length; i++) {
         if (this.authenticationChecks[i](this, response, ioArgs)) {
            ioArgs._authOutcome = "Custom authentication check #"+(i+1)+" indicated login necessary";
            return true;
         }
      }
      return false;   
   },
   
   /**
    * Detecting redirects in all scenarios in all browsers is not 100% reliable.  The best heuristic is to check whether the expected
    * content type matches the returned content type.  Since almost all login pages are HTML, whenever we see a response object with a
    * handleAs parameter of "xml" or "json" and an HTML content type we assume that we were redirected to a login page.  One significant
    * limitation of this approach is that when a redirect from HTTP to HTTPS occurs the browser security restrictions prevent javascript
    * from accessing the response object.  In those cases we typically receive either 0 as the status code, or an exception.  Also, 204
    * NO CONTENT status codes mean that there is no body to check so we assume the response is not a login prompt.
    *
    * @return true if the response appears to be a redirect to a login page.
    */
   isPossibleLoginRedirect: function(response, ioArgs) {

      // JSON responses may be null if an evaluation error occurs (attempting to convert HTML to JSON)
      // The standard dojo error types "cancel" and "timeout" should not be checked for errors (although Firefox may return "timeout" if redirected to a new domain)
      if (ioArgs.xhr && (!response || dojo.indexOf(this.ignoredDojoErrors, response.dojoType) == -1)) {
         
         // attempting to retrieve the status code may throw an exception in IE when redirected to a different security domain
         var statusCode;
         try { statusCode = ioArgs.xhr.status; } catch (ignore) {}
         
         // callers occasionally may pass handleAs = text on IE instead of their desired type, therefore, callers 
         // may send "expectedContentType" to indicate what handleAs would be
         var expectedHandleAs = ioArgs.handleAs;
         if (ioArgs.args){
          expectedHandleAs = ioArgs.args.expectedContentType || ioArgs.args.handleAs;
         }
         var isNonHtmlTypeExpected = dojo.indexOf(this.nonHtmlTypes, expectedHandleAs) != -1;         
      
         if (this.checkByStatusCode && (isNonHtmlTypeExpected || this.checkAllStatusCodes)) {
            if (statusCode == 302) {
               ioArgs._authOutcome = "Status code was 302";
               return true;
            }
            if (statusCode == 401) {
               ioArgs._authOutcome = "Status code was 401";
               return true;
            }
            if (dojo.isIE && (statusCode == 0 || statusCode == "unknown")) {
               ioArgs._authOutcome = "Status code was 0 or \"unknown\"";
               return true;
            }
         }

        var contentTypeResponseHeader = "html";
        if (ioArgs.xhr.getResponseHeader) {
          contentTypeResponseHeader = ioArgs.xhr.getResponseHeader("Content-Type");
        } else if (ioArgs.HEADERS){
          contentTypeResponseHeader= ioArgs.HEADERS["Content-Type"];
        }

        if (this.checkByContentType && isNonHtmlTypeExpected && this.contentTypeRegex.exec(contentTypeResponseHeader) && statusCode >= 200 && statusCode < 300 && statusCode != 204) {
            ioArgs._authOutcome = "Content-Type was HTML and status code indicated success";
            return true;
         }
         
         // The X-LConn-Auth header will be 'true' if the user is authenticated to Lotus Connections, 'false'
         // if the user is not authenticated.  IFrame requests have no access to response headers and will 
         // not return this header.  Requests redirected across domains will also have no access to response
         // headers.
         try {
            if (this.checkByXLConnAuth && ioArgs && ioArgs.xhr) {
               var h = ioArgs.xhr.getResponseHeader("X-LConn-Auth");
               if (h == "true") {
                  return false;
               }
               if (h == "false") {
                  return true;
               }
            }
         } catch (ignore) {
         }
      }
      return false;   
   },
      
   testAuthenticationHandler: function(auth, isAuthRequired, onauthenticated, response, ioArgs) {
      var args = dojo._toArray(arguments).slice(3);

      var authRequired = false;
      
      // give the original method that called prepareSecure the opportunity to detect login failure
      if (auth.checkFromCaller && typeof isAuthRequired == "function" && isAuthRequired(response, ioArgs)) {
         ioArgs._authOutcome = "isAuthRequired returned true";
         authRequired = true;
      }
      authRequired = authRequired || auth.isAuthenticationRequired(response,ioArgs);
      
      if (authRequired) {
         auth.authenticationHandler(response, ioArgs, onauthenticated);

         args[0] = new Error("xhr unauthenticated");
         args[0].dojoType = "unauthenticated";
      }

     if (ioArgs.args && ioArgs.args._handle) {
       return ioArgs.args._handle.apply(this, args);
     }
     if (ioArgs._handle) {
       return ioArgs._handle.apply(this, args);
     }

     return response;
   },
   
   authenticationHandler: function() {
      console.log("auth::authenticationHandler DEBUG authentication was required");
   },
   
   xhrIntercept: function(auth, f, method,params) {
      var args = dojo._toArray(arguments).slice(2);
      var p = params.auth || {};
      var secured = p.secured;
      if (secured || (secured != false && auth.isUrlSecure(params.url))) {
         args[1] = auth.prepareSecure(params, p.isAuthRequired, p.onLogin, p.sendXhrAuthHeader === false);
      }
      return f.apply(this, args);
   },
   ioIntercept: function(auth, f, params) {
      var args = dojo._toArray(arguments).slice(2);
      var p = params.auth || {};
      var secured = p.secured;
      if (secured || (secured != false && auth.isUrlSecure(params.url))) {
         args[0] = auth.prepareSecure(params, p.isAuthRequired, p.onLogin, p.sendXhrAuthHeader === false);
      }
      return f.apply(this, args);
   },

   isUrlSecure: function(url) {
      return false;
   }
};
