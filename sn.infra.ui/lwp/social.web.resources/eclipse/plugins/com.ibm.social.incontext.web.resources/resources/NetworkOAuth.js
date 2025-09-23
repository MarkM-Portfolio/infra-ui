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

dojo.provide("com.ibm.social.incontext.NetworkOAuth");

dojo.require("com.ibm.social.incontext.NetworkOS");

dojo.declare("com.ibm.social.incontext.NetworkOAuth", com.ibm.social.incontext.NetworkOS, {
   oAuthDefaults: { 
      sign_viewer: true, 
      sign_owner: true,
      authz: "oauth2"
   },
   cookie: { },
   _setDefaults: function(verb, opts) {
      this.inherited(arguments);
      dojo.mixin(opts, this.oAuthDefaults);
   },
   _decorateHandler: function(opts, retryFunction) {
      this.inherited(arguments);
      delete opts.headers.cookie;
      delete opts.headers.Cookie;   
   },
   _convertKeys: function(opt) {
      opt[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.TEXT;
      opt[gadgets.io.RequestParameters.REFRESH_INTERVAL] = 0;      
      opt[gadgets.io.RequestParameters.GET_FULL_HEADERS] = true;
      if(opt.content)
         opt[gadgets.io.RequestParameters.POST_DATA] = opt.content;
      if (opt.putData)
         opt[gadgets.io.RequestParameters.POST_DATA] = opt.putData;
      if (opt.postData)
         opt[gadgets.io.RequestParameters.POST_DATA] = opt.postData;
      if (opt.headers)
         opt[gadgets.io.RequestParameters.HEADERS] = opt.headers;
   },   
   _osapiHead: function(opts) {
      this._convertKeys(opt);
      opt[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.HEAD;
      gadgets.io.makeRequest(opt.url, opt.handle, opt);
      return opt.dfd;
   },
   _osapiGet: function(opt) {
      if (this.xhrGetOverride) {
         return this.xhrGetOverride(opt);
      } 
      else {
         this._convertKeys(opt);
         opt[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.GET;
         gadgets.io.makeRequest(opt.url, opt.handle, opt);
         return opt.dfd;
      }
   },
   _osapiDelete: function(opt) {
      if (this.xhrDeleteOverride) {
         return this.xhrDeleteOverride(opt);
      } else {
         this._convertKeys(opt);
         opt[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.DELETE;
         gadgets.io.makeRequest(opt.url, opt.handle, opt);
         return opt.dfd;
      }
   },
   
   _osapiPost: function(opt) {
     if (this.rawXhrPostOverride) {
        return this.rawXhrPostOverride(opt);
     }  
     else {
        this._convertKeys(opt);
        opt[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.POST;
        gadgets.io.makeRequest(opt.url, opt.handle, opt);
        return opt.dfd;
     }
   },
   
   _osapiPut: function(opt) {
      if (this.rawXhrPutOverride) {
         return this.rawXhrPutOverride(opt);
      }  
      else {
         this._convertKeys(opt);
         opt[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.PUT;
         gadgets.io.makeRequest(opt.url, opt.handle, opt);
         return opt.dfd;
      }
    },
    
    onAuthApproval: function(oauthApprovalUrl, retryFunction, retryOpts) {
       
    },
    
   _handle: function(opts, retryOpts, retryFunction, dataResponse) {
      this.showIdle();
      var statusCode, hadError, errObj, error, result, content, authHeader, headers, header;
      retryOpts.responseHeaders = dataResponse.headers;
      if (dataResponse.oauthApprovalUrl) {
         if (this.onAuthApproval) {
            this.onAuthApproval(dataResponse.oauthApprovalUrl, retryFunction, retryOpts);
            return;
         }
      }      
      if (dataResponse.rc) {
            statusCode = parseInt(dataResponse.rc);
            hadError = (statusCode > 0 && !(statusCode >= 200 && statusCode < 300)) ? true : false;
      }
      if (hadError) {
         errObj = new Error();
            errObj.status = statusCode;
            errObj.message = dataResponse.content || (dataResponse.error ? dataResponse.error.message : null);
         error = com.ibm.social.incontext.util.atom.getError(errObj, {xhr: {status: statusCode}}, this.errorMap);
         if (error) {
//               if (error.code == "unauthenticated" && this.handleUnauthenticated) {
//                   authHeader = null;
//                   if (dataResponse.headers) {
//                      headers = dataResponse.headers;
//                      for (header in headers) {
//                        if(header == "WWW-Authenticate")
//                           authHeader = headers[header];
//                      }
//                   }
//                  if (authHeader && authHeader.indexOf("Basic") != 0) {//don't override the regular basic auth connection
//                     this.authenticationRequired({retryOpts: retryOpts, retryFunction: retryFunction});
//                     return false;
//                  }
//               }
//               if (error.code == "AccessDenied") {
//                  if (this.showPermissionDenied) {
//                     this.showPermissionDenied();
//                     return false;
//                  }
//               }
            if(opts.dfd)
               opts.dfd.errback(error);
         }
      }
      else {
         if(dataResponse.text) {
            content = dataResponse.text;
            switch(opts.origFormat) {
   //            case "json-embedded":
   //               content = this._textToJsonEmbedded(content);
   //               break;
               case "json-comment-optional":
                  content = this._textToJsonCmtOptional(content);
                  break;
               case "json-comment-filtered":
                  content = this._textToJsonCmtFiltered(content);
                  break;
               case "json":
                  content = this._textToJson(content);
                  break;
               case "html":
                  content = this._textToHTML(content);
                  break;
               case "xml":
                  content = this._textToXML(content);
                  break;
            }
            if(opts.dfd)
               opts.dfd.callback(content);
         } 
         else {
            if(dataResponse.text == "") {
               if(opts.dfd)
                  opts.dfd.callback();
            } else {
               var err = new Error("No data response error or content");
               if(opts.dfd)
                  opts.dfd.errback(err);
            }
         }
      }
   }
});