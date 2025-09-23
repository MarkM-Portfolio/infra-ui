/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/has",
      "dojo/request",
      "../debug",
      "../utilities"
], function(dojo, declare, has, request, debug, utilities) {

   // Required for AJAX requests.
   var ModelRestServiceRequest = declare("com.ibm.mm.enabler.services.ModelRestServiceRequest", null, {
      REQUEST_METHOD_POST : "POST",
      REQUEST_METHOD_PUT : "PUT",
      REQUEST_METHOD_DELETE : "DELETE",
      POST_ACTION_HEADER : "X-Method-Override",

      constructor : function( /* HttpUrl */feedlocation, /* HTMLFormElement? */formNode, /* Function? */formFilter, /* boolean? */textOnly, /* boolean? */sync) {
         debug.entry("ModelRestServiceRequest.constructor", feedlocation, formNode, formFilter, textOnly, sync);
         this._feedURI = feedlocation.toProxifiedString();
         this._textOnly = textOnly;
         this._sync = sync;
         this._formNode = formNode;
         this._formFilter = formFilter;

         // Make sure this isn't undefined.
         if (!this._sync) {
            this._sync = false;
         }
         debug.exit("ModelRestServiceRequest.constructor");
      },
      // summary: Sends a request to one of the Portal REST Services and handles
      // the response.
      // description: Create a new instance of this object for every REST
      // service request that is
      // sent. The URL is passed in to the constructor. If a form node and form
      // filter is
      // passed into the constructor, the REST service request is handled as a
      // form submit.
      // The request can also be executed synchronously if TRUE is passed into
      // the constructor.
      // In general, only the model implementations should send these requests.

      create : function( /* ibm.atom.Feed */feed, /* Function */callbackfn, /* Object? */addtlCallbackFnArguments) {
         // summary: Creates an entry in a feed.
         // description: Creates an entry in a feed. This operation is not
         // implemented in this
         // class. It should be overridden by subclasses and properly
         // implemented if
         // the REST service supports the create operation.
         // feed: the ATOM feed object
         // entry: the ATOM entry to create
         // callbackfn: the function to call when the operation is complete

         debug.entry("ModelRestServiceRequest.create", callbackfn, addtlCallbackFnArguments);
         debug.log("ModelRestServiceRequest.create", "feed:" + feed);
         debug.log("ModelRestServiceRequest.create", "Attempting to retrieve: " + this._feedURI + "; synchronously? " + this._sync);

         var me = this;
         var args = {
            url : this._feedURI,
            headers : {
               "If-Modified-Since" : "Thu, 1 Jan 1970 00:00:00 GMT",
               "Content-Type" : "text/xml"
            }, // temporary to force the browser to ignore cached requests
            load : function(response, ioArgs) {

               var xhr = ioArgs.xhr;
               var data = response;

               var contentType = xhr.getResponseHeader("Content-Type");
               if (typeof contentType != "undefined" && contentType !== null && contentType.indexOf("text/html") >= 0) {
                  var pid = null;
                  var url = document.location.href;

                  // make sure we add the timeout only once
                  if (url.indexOf("timeout=true") > 0) {
                     alert("Internal problem while reading resource");
                     return;
                  }

                  // test if we have a assigned hash so that we can transport
                  // this as well to the server
                  if (url.indexOf("#") > 0) {
                     var arr = url.split("#");
                     if (arr[1])
                        pid = arr[1];

                     url = arr[0];
                  }

                  // see if the url has already some parameters
                  if (url.indexOf("?") > -1)
                     url += "&";
                  else
                     url += "?";

                  url += "timeout=true";

                  if (pid)
                     url += "&" + pid;

                  top.location.href = url;

                  return;
               }

               if (has("ie")) {
                  data = dojox.data.dom.createDocument(xhr.responseText);
                  callbackfn("load", data, xhr, addtlCallbackFnArguments);
               }
               else {
                  // var doc = com.ibm.mm.enabler.dom.createDocument(data);
                  callbackfn("load", data, xhr, addtlCallbackFnArguments);
               }
            },
            sync : this._sync,
            postData : feed,
            handleAs : "xml"
         };

         dojo.rawXhrPost(args);

         debug.exit("ModelRestServiceRequest.create");
      },
      read : function( /* Function? */callbackfn, /* Object? */addtlCallbackFnArguments) {
         // summary: Read the ATOM feed provided by the REST service.
         // description: If textOnly is set to true, the ATOM feed is returned
         // as text and
         // passed in as a single argument to the specified callback function.
         // Otherwise, the ATOM feed is parsed into an {@link ibm.atom.Feed}
         // object
         // and passed into the callback function along with the original XML
         // Document
         // Object Model object.
         // callbackfn: the function to call when the operation is complete
         // (only valid if
         // sync is false)
         // addtlCallbackFnArguments: any arguments to pass through to the
         // callback function
         debug.entry("ModelRestServiceRequest.read", callbackfn, addtlCallbackFnArguments);
         if (this._textOnly) {
            this._retrieveRawFeed(callbackfn, addtlCallbackFnArguments);
         }
         else {
            this._retrieve(callbackfn, addtlCallbackFnArguments);
         }
         debug.exit("ModelRestServiceRequest.read");
      },

      update : function( /* ibm.atom.Feed */feed, /* Function */callbackfn, /* Object? */addtlCallbackFnArguments) {
         // summary: Updates an entry in a feed.
         // description: Updates an entry in a feed. This operation is not
         // implemented in this
         // class. It should be overridden by subclasses and properly
         // implemented if the
         // REST service supports the update operation.
         // feed: the ATOM feed object
         // entry: the ATOM entry to create
         // callbackfn: the function to call when the operation is complete
         debug.entry("ModelRestServiceRequest.update", callbackfn);
         debug.log("ModelRestServiceRequest.update", "feed:" + feed);
         debug.log("ModelRestServiceRequest.update", "Attempting to retrieve: " + this._feedURI + "; synchronously? " + this._sync);

         var me = this;
         var args = {
            url : this._feedURI,
            load : function(response, ioArgs) {
               var data = response;
               var xhr = ioArgs.xhr;

               var contentType = xhr.getResponseHeader("Content-Type");

               if (typeof contentType != "undefined" && contentType !== null && contentType.indexOf("text/html") >= 0) {
                  var pid = null;
                  var url = document.location.href;

                  // make sure we add the timeout only once
                  if (url.indexOf("timeout=true") > 0) {
                     alert("Internal problem while reading resource");
                     return;
                  }

                  // test if we have a assigned hash so that we can transport
                  // this as well to the server
                  if (url.indexOf("#") > 0) {
                     var arr = url.split("#");
                     if (arr[1])
                        pid = arr[1];

                     url = arr[0];
                  }

                  // see if the url has already some parameters
                  if (url.indexOf("?") > -1)
                     url += "&";
                  else
                     url += "?";

                  url += "timeout=true";

                  if (pid)
                     url += "&" + pid;

                  top.location.href = url;

                  return;
               }

               if (has("ie")) {
                  data = dojox.data.dom.createDocument(xhr.responseText);
                  callbackfn("load", data, xhr, addtlCallbackFnArguments);
               }
               else {
                  // var doc = com.ibm.mm.enabler.dom.createDocument(data);
                  callbackfn("load", data, xhr, addtlCallbackFnArguments);
               }

            },
            sync : this._sync,
            handleAs : "xml"
         };
         var requestHeaders = {
            "If-Modified-Since" : "Thu, 1 Jan 1970 00:00:00 GMT",
            "Content-Type" : "text/xml"
         };
         if (com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.TUNNEL_MODE) === true) {
            requestHeaders[this.POST_ACTION_HEADER] = this.REQUEST_METHOD_PUT;
            args.headers = requestHeaders;
            args.postData = feed;
            debug.log("ModelRestServiceRequest.update", "TUNNELMODE", true);
            dojo.rawXhrPost(args);
         }
         else {
            args.putData = feed;
            args.headers = requestHeaders;
            debug.log("ModelRestServiceRequest.update", "TUNNELMODE", false);
            dojo.rawXhrPut(args);
         }

         debug.exit("ModelRestServiceRequest.update");
      },
      remove : function(/* Function */callbackfn, /* Object? */addtlCallbackFnArguments) {
         // summary: Removes an entry from a feed.
         // description: Removes an entry from a feed. This operation is not
         // implemented in this
         // class. It should be overridden by subclasses and properly
         // implemented if the
         // REST service supports the remove operation.
         // feed: the ATOM feed object
         // entry: the ATOM entry to create
         // callbackfn: the function to call when the operation is complete
         debug.entry("ModelRestServiceRequest.remove", callbackfn);
         debug.log("ModelRestServiceRequest.remove", "Attempting to retrieve: " + this._feedURI + "; synchronously? " + this._sync);

         var me = this;
         var args = {
            url : this._feedURI,
            load : function(response, ioArgs) {
               var type = "load";
               var data = response;

               var xhr = ioArgs.xhr;
               var contentType = xhr.getResponseHeader("Content-Type");

               if (typeof contentType != "undefined" && contentType !== null && contentType.indexOf("text/html") >= 0) {
                  var pid = null;
                  var url = document.location.href;

                  // make sure we add the timeout only once
                  if (url.indexOf("timeout=true") > 0) {
                     alert("Internal problem while reading resource");
                     return;
                  }

                  // test if we have a assigned hash so that we can transport
                  // this as well to the server
                  if (url.indexOf("#") > 0) {
                     var arr = url.split("#");
                     if (arr[1])
                        pid = arr[1];

                     url = arr[0];
                  }

                  // see if the url has already some parameters
                  if (url.indexOf("?") > -1)
                     url += "&";
                  else
                     url += "?";

                  url += "timeout=true";

                  if (pid)
                     url += "&" + pid;

                  top.location.href = url;

                  return;
               }

               if (has("ie")) {
                  data = dojox.data.dom.createDocument(xhr.responseText);
                  callbackfn(type, data, xhr, addtlCallbackFnArguments);
               }
               else {
                  // var doc = com.ibm.mm.enabler.dom.createDocument(data);
                  callbackfn(type, data, xhr, addtlCallbackFnArguments);
               }
            },
            sync : this._sync,
            handleAs : "xml"
         };
         var requestHeaders = {
            "If-Modified-Since" : "Thu, 1 Jan 1970 00:00:00 GMT",
            "Content-Type" : "text/xml"
         };
         if (com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.TUNNEL_MODE) === true) {
            requestHeaders[this.POST_ACTION_HEADER] = this.REQUEST_METHOD_DELETE;
            args.headers = requestHeaders;
            debug.log("ModelRestServiceRequest.update", "TUNNELMODE", true);
            dojo.rawXhrPost(args);
         }
         else {
            args.headers = requestHeaders;
            debug.log("ModelRestServiceRequest.update", "TUNNELMODE", false);
            dojo.xhrDelete(args);
         }

         debug.log("ModelRestServiceRequest.remove", "sync:", args.sync);
         debug.exit("ModelRestServiceRequest.remove");
      },
      _retrieveRawFeed : function(callbackfn, callbackargs) {
         debug.entry("ModelRestServiceRequest._retrieveRawFeed", callbackfn, callbackargs);

         request(this._feedURI, {
            method : "GET",
            sync : this._sync
         }).then(function(data, ioArgs) {
            callbackfn(com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_LOAD, data, ioArgs.xhr, callbackargs);
         }, function(data, ioArgs) {
            callbackfn(com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_ERROR, data, ioArgs.xhr, callbackargs);
         });

         debug.exit("ModelRestServiceRequest._retrieveRawFeed");
      },
      _retrieve : function(callbackfn, callbackargs, formNode, formFilter) {
         debug.entry("ModelRestServiceRequest._retrieve", callbackfn, callbackargs, formNode, formFilter);
         var content = {};
         var mt = "xml"; // temp

         if (has("ie")) {
            // content = { "com.ibm.wps.web2.contenttype": "text/xml" };
            mt = "text"; // temp
         }

         debug.log("ModelRestServiceRequest._retrieve", "Attempting to retrieve: " + this._feedURI + "; synchronously? " + this._sync);
         var me = this;
         var args = {
            url : this._feedURI,
            content : content,
            headers : {
               "If-Modified-Since" : "Thu, 1 Jan 1970 00:00:00 GMT"
            }, // temporary to force the browser to ignore cached requests
            load : function(response, ioArgs) {
               var data = response;
               var xhr = ioArgs.xhr;
               var contentType = xhr.getResponseHeader("Content-Type");

               // Get the location of the resource actually returned by the
               // response.
               // All re-directs have been followed at this point.
               /*
                * var loc = xhr.getResponseHeader( "IBM-Web2-Location");
                * 
                * if ( loc ) { //Check to see if we are going from a public
                * resource to a protected resource. //This means a successful
                * login has occurred and we need to force a full page //refresh.
                * if ( loc.indexOf( "/myportal") >= 0 && me._feedURI.indexOf(
                * "/portal") >= 0 ) { top.location.href = loc; return; }
                *  }
                */

               // If the HTML content is returned, this is probably another
               // re-direction so we need to
               // force a full-page refresh.
               if (typeof contentType != "undefined" && contentType !== null && contentType.indexOf("text/html") >= 0) {
                  var pid = null;
                  var url = document.location.href;

                  // make sure we add the timeout only once
                  if (url.indexOf("timeout=true") > 0) {
                     alert("Internal problem while reading resource");
                     return;
                  }

                  // test if we have a assigned hash so that we can transport
                  // this as well to the server
                  if (url.indexOf("#") > 0) {
                     var arr = url.split("#");
                     if (arr[1])
                        pid = arr[1];

                     url = arr[0];
                  }

                  // see if the url has already some parameters
                  if (url.indexOf("?") > -1)
                     url += "&";
                  else
                     url += "?";

                  url += "timeout=true";

                  if (pid)
                     url += "&" + pid;

                  top.location.href = url;

                  return;
               }

               if (has("ie")) {
                  var doc = com.ibm.mm.enabler.dom.createDocument(data);
                  callbackfn(com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_LOAD, doc, xhr, callbackargs);
               }
               else {
                  callbackfn(com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_LOAD, data, xhr, callbackargs);
               }
            },
            error : function(response, ioArgs) {
               var data = response;
               var xhr = ioArgs.xhr;

               if (has("ie")) {
                  var doc = com.ibm.mm.enabler.dom.createDocument(data);
                  callbackfn(com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_ERROR, doc, xhr, callbackargs);
               }
               else {
                  callbackfn(com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_ERROR, data, xhr, callbackargs);
               }
            },
            sync : this._sync,
            handleAs : mt
         };

         var method = "Get";
         if (this._formNode) {
            args.form = this._formNode;
            method = "Post";
         }

         if (this._formFilter) {
            args.formFilter = this._formFilter;
         }
         debug.log("ModelRestServiceRequest._retrieve", "sync:", args.sync);
         dojo["xhr" + method](args);

         debug.exit("ModelRestServiceRequest._retrieve");
      },
      toString : function() {
         return this._feedURI;
      }
   });

   // constants
   com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_LOAD = "load";
   com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_ERROR = "error";

   return ModelRestServiceRequest;
});
