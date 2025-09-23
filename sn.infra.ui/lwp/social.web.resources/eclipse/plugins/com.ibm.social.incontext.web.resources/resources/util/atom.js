/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
dojo.provide("com.ibm.social.incontext.util.atom");
dojo.require("com.ibm.social.incontext.util._dom");

(function() {

   var atom = com.ibm.social.incontext.util.atom,
      dom = com.ibm.social.incontext.util.dom;

   atom._htmlText = function(el) {
      if (!el)
         return null;
      var a = [];
      for (var j=0, c; c=el.childNodes[j]; j++)
         if (c.nodeType == 3)
            a.push(c.nodeValue);
      return a.length > 0 ? a.join("") : null;
   };

   atom.getErrorCode = function(response,ioArgs) {
      var error = atom.getError(response,ioArgs);
      return (error ? error.code : null);
   };

   atom._CMIS_ERROR_CODES = { 
		      "objectNotFound": "ItemNotFound",
		      "permissionDenied": "AccessDenied",
		      "contentAlreadyExists": "ItemExists",
		      "updateConflict": "ConcurrentModification",
		      "nameConstraintViolation": "InvalidPath"
		          /*
				   Additional CMIS errors we don't have mappings for
				   case "versioning":
				   case "invalidArgument":
				   case "notSupported":
				   case "runtime":
				   case "constraint":
				   case "filterNotValid":
				   case "streamNotSupported":
				   case "storage":
				   */
				};

   atom.getError = function(response,ioArgs,opts) {

      // No-op if called multiple times
      if (response instanceof Error && response.code)
         return response;

      var error = null;
      var originalResponse = response;
      response = response || {};
      ioArgs = ioArgs || {};
      var xhr = ioArgs.xhr;

      var statusCode;
      try {
         // checking the status value of XHR can throw exceptions
         if (xhr)
            statusCode = xhr.status;
      } catch (e) {
      }
   
      var serverAvailable;
      try {
         // If we can retrieve response headers, the presence of X-LConn-Auth tells us whether the server responded to us.  If the header
         // is missing then the server did not respond.
         if (xhr) {
            var h = xhr.getResponseHeader("X-LConn-Auth");
            serverAvailable = (h == "true" || h == "false");
         }
      } catch (e) {
      }
   
      // It's things like this that make me cry - just google "internet explorer status code 1223"
      if (dojo.isIE && statusCode == 1223)
         statusCode = 204;

      var isError = false;
      // if a dojo specific error was returned (timeout, cancel, unauthenticated)
      isError = isError || response instanceof Error;
      // if a status code outside of 2xx is returned
      isError = isError || (statusCode > 0 && !(statusCode >= 200 && statusCode < 300));
      // Special IE file upload case
      isError = isError || (dojo.isIE && response.number == -2147024891);

      if(opts && opts.requireData) {
         // if XML was requested and no XML was returned
         isError = isError || (ioArgs.handleAs == "xml" && !response.documentElement);
         // if JSON was requested and no JSON was returned
         isError = isError || (dojo.indexOf(["json","json-comment-filtered"],ioArgs.handleAs) != -1 && (!originalResponse || typeof originalResponse != "object"));
      }
   
      if (isError) {
         error = new Error();
      
         // When dojo.xhr catches an exception during send, the exception is saved as ioArgs.error
         if ("cancel" == response.dojoType && ioArgs.error && typeof ioArgs.error == "object") {
            var sendError = ioArgs.error;
         
            // Using the W3 File API, some files may not be readable by the current user.  Create
            // a new unique code for this scenario.
            if (sendError.name == "NS_ERROR_FILE_ACCESS_DENIED")
               error.message = error.code = "FileAccessDenied";
         }
      
         if (!error.code && dojo.indexOf(["cancel","timeout","unauthenticated"],response.dojoType) != -1)
            error.message = error.code = error.dojoType = response.dojoType;

         if (!error.code && dojo.isIE && response.number == -2147024891)
            error.message = error.code = "FileDoesNotExist";

         if (!error.code && statusCode == 412 && xhr && xhr.responseXML && xhr.responseXML.documentElement && dom.isNamedNS(xhr.responseXML.documentElement, "entry", dom.NAMESPACES.ATOM)) {
            error.message = error.code = "ConcurrentModification";
            error.entry = xhr.responseXML.documentElement;
         }

         if (!error.code && xhr && xhr.responseXML && xhr.responseXML.documentElement) {
            var el = xhr.responseXML.documentElement;
            var text = dom.getChildElementTextContentNS(el, "errorCode", dom.DOCUMENTS_ATOM_NAMESPACE);
         
            // Check CMIS error structure
            if (!text) {
               text = dom.getChildElementTextContentNS(el, "code", dom.LCMIS_NAMESPACE);
               if(text)
                  text = atom._CMIS_ERROR_CODES[text] || "unknown";
            }

            var code = (text ? dojo.trim(text) : "");
            if (code.length > 0) {
               error.message = error.code = code;
               error.el = el;
               error.message = dom.getChildElementTextContentNS(el, "errorMessage", dom.DOCUMENTS_ATOM_NAMESPACE);
            
               // Check CMIS error structure
               if (!error.message)
                  error.message = dom.getChildElementTextContentNS(el, "message", dom.LCMIS_NAMESPACE);
            
               if (code == "QuotaViolation") {
                  error.libraryQuota = parseInt(dom.getChildElementTextContentNS(el, "libraryQuota", dom.DOCUMENTS_ATOM_NAMESPACE));
                  error.librarySize = parseInt(dom.getChildElementTextContentNS(el, "librarySize", dom.DOCUMENTS_ATOM_NAMESPACE));
                  error.uploadSize = parseInt(dom.getChildElementTextContentNS(el, "uploadSize", dom.DOCUMENTS_ATOM_NAMESPACE));               
               }
               else if ( code == "ExtensionViolation") {
                  error.extension = dom.getChildElementTextContentNS(el, "extension", dom.DOCUMENTS_ATOM_NAMESPACE);
               }
            }
         }

         if (!error.code && statusCode == 404) {
            if (serverAvailable === false)
               error.message = error.dojoType = error.code = "timeout";
            else
               error.message = error.code = "ItemNotFound";
         }
         if(!error.code && (statusCode == 401 || statusCode == 403 || dojo.isIE && statusCode == 0)) {
            error.message = error.code = "Unauthorized";   
         }
         if(!error.code && statusCode == 0) {
             error.message = error.code = "NetworkRequestFailed";   
         }
         if(!error.code && statusCode == 409) {
            error.message = error.code = "ItemExists";   
         }
         if (!error.code)
            error.message = error.code = "unknown";
         
         if (statusCode == 412 && error.code == "InvalidUser")
            error.message = error.code = "SessionInvalidated";
      }
      return error;
   };
   atom.getJsonResponseFromHtml = function(d) {
      var r = {};
      try {
         if (d && d.body) {
            var meta = dojo.filter(d.getElementsByTagName("meta"), function(el) {return el.name == "status";})[0];
            r.status = meta ? parseInt(meta.content) : 200 || 200;
         
            try {
               var text = atom._htmlText(d.body);
               var result = dojo.fromJson(text);
               if (typeof result == "object")
                  r.contents = result;
            } catch (e) {
               console.log("util::getJsonResponseFromHtml DEBUG innerHTML not JSON");
            }
         }
      } catch (e) {
         console.log("util::getJsonResponseFromHtml DEBUG unable to access body");
      }
      return r;
   };
   atom.getJsonError = function(r) {
      if (r && r.status == 404) {
         var error = new Error();
         error.message = error.code = "ItemNotFound";
         return error;
      }
   
      if (!r || !r.contents || typeof r.contents != "object") {
         var error = new Error();
         error.message = error.code = "unknown";
         return error;
      }

      if (r.status == 412) {
         var error = new Error();
         error.message = error.code = "ConcurrentModification";
         error.entry = r.contents;
         return error;
      }
      else if (typeof r.contents.errorCode == "string") {
         var error = new Error();
         error.message = r.contents.errorMessage;
         error.code = r.contents.errorCode;
         for (var key in r.contents)
            if (key != "errorCode" && key != "errorMessage")
               error[key] = r.contents[key];
         return error;
      }
      else if (typeof r.contents.code == "string") {
         var error = new Error();
         error.message = r.contents.message;
         error.code = atom._CMIS_ERROR_CODES[r.contents.code] || "unknown";
         for (var key in r.contents)
            if (key != "code" && key != "message")
               error[key] = r.contents[key];
         return error;
      }
      else if (r.status < 200 || r.status >= 300) {
         var error = new Error();
         error.message = error.code = "unknown";
         return error;
      }
      return null;
   };

   atom.detectLoginForMultipartResponse = function(response,ioArgs) {
      var login = false;
      if (response && !(response instanceof Error)) {
         var body;
         try {
            body = response.body;
         } catch (e) {
            // if we are unable to access the body it may be a redirection to a protected page - however we'll 
            // rely on a separate call to make that determination
         }
         if (body && !dojo.hasClass(body, "X-LConn-API-Response")) {
            login = true;
            console.log("util::detectLoginForMultipartAtomResponse DEBUG The body of the document does not have the expected class");
         }
      }
      return login;
   };

   atom.createOperationId = function() {
      var s = dojo._toArray(arguments).join("_");
      if (s.length > 256)
         s = s.substring(0,256);
      return dojo.trim(s);
   };
})();