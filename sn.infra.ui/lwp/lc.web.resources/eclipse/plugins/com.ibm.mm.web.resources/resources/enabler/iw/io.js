/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.mm.enabler.iw.io");

dojo.require( "com.ibm.mm.enabler.utilities" );
dojo.require("com.ibm.mm.enabler.debug");

dojo.declare("com.ibm.mm.enabler.iw.io",null,
{

	constructor:function (/*String*/id) {
        this.id = id;
        var widget = iWidgetContainer.getWidgetById(this.id);
        var rawUri = widget.getWidgetInstance().widgetXMLUrl;
        this.widgetBaseUri = rawUri.substring(0,rawUri.lastIndexOf("/")+1);

        this.widgetBaseUriXhr = com.ibm.mm.enabler.utilities.rewriteURL(this.widgetBaseUri);

        if ( this.widgetBaseUri.indexOf("://") != -1) {
            var indexOfScheme = this.widgetBaseUri.indexOf("://");
            var indexOfRoot = this.widgetBaseUri.indexOf("/",indexOfScheme+3);
            this.serverRoot = this.widgetBaseUri.substring(0, indexOfRoot);
            this.serverRootXhr = com.ibm.mm.enabler.utilities.rewriteURL(this.serverRoot);
        }
    },
    rewriteURI:function(/*String*/uri,isXhr){ 
         com.ibm.mm.enabler.debug.entry("com.ibm.mm.enabler.iw.io.rewriteURI",uri+" isXhr:"+isXhr);

         if (typeof isXhr == "undefined") {
             isXhr = true;
         }

         var returnUri = uri;
         if (isXhr) {
             if (uri.indexOf("://")!= -1 ) {
                 returnUri =  com.ibm.mm.enabler.utilities.rewriteURL(uri);
             }
             else{
                 if (uri.indexOf("/") == 0 ) {
                     if (typeof (this.serverRootXhr) != "undefined")
                         returnUri =  this.serverRootXhr+uri;
                  }
                 else{
                     if ( typeof (this.widgetBaseUriXhr) != "undefined" ) 
                         returnUri =  this.widgetBaseUriXhr + uri;
                 }               
             }   
         }
         else{
             if (uri.indexOf("://") == -1 ) {
                    if (uri.indexOf("/") == 0 ) {
                        if (typeof (this.serverRootXhr) != "undefined")
                                returnUri =  this.serverRoot+uri;
                    }
                    else{
                        if ( typeof (this.widgetBaseUri) != "undefined" ) 
                            returnUri =  this.widgetBaseUri + uri;
                    }               
             }
         }
         com.ibm.mm.enabler.debug.exit("com.ibm.mm.enabler.iw.io.rewriteURI",returnUri);

         return returnUri;
    },
	getWebAppRootPath:function() {
		var returnUri="/";
		if ( typeof (this.widgetBaseUri) != "undefined" ) {
			returnUri = this.widgetBaseUri;
			if (returnUri.length > 0) {
				if (returnUri.indexOf("://") > 0) {
					var parts = returnUri.split("/");
					if (parts.length >= 4) {
						returnUri = parts[0] + "//" + parts[2] + "/" + parts[3] + "/";
					}
					else {
						returnUri = "/";
					}
				}
			}
		}	
		return returnUri;
	},			
	request:function(requestVerb,uri,callbackFn,message,/* [{headerName, value}] */requestHeader){
         //Sends an HTTP request with the given method
         //The method argument should be uppercase.
		 //sample callback Fn
		 /*function callbackFunction(){
			if (this.readyState != 4) return;
			var response = this.responseText;
			}			
		 */
		 var xhr = dojo._xhrObj();   
         var realUri = this.rewriteURI(uri);

         var async = false;
         if(callbackFn) 
         {    xhr.onreadystatechange = callbackFn;
              //sets it to asynchronous only if a callbackFn is provided, per xhr spec, user agent should consider default is true if it's omitted
              async = true;
         }
         var method = requestVerb;
         if (typeof requestVerb == "undefined" || requestVerb == null ) method=this.httpmethods.GET;
         if (typeof requestVerb != "undefined" && requestVerb != null) {
             if (!this.httpmethods[requestVerb]) {
                 method = this.httpmethods.GET;
             }
         }
		 
		            //user/password    xhr.open(method,realUri,async,user,pwd); 
         xhr.open(method,realUri,async);
             //xhr.send(); 
         if(dojo.config.isDebug) {
        	 console.debug(method+" "+realUri);
         }

         var _defaultContentType = "application/x-www-form-urlencoded";  
         if (requestHeader) {
             //Authors are strongly encouraged to ensure that they have specified the Content-Type header via setRequestHeader() before invoking send() with a non-null data argument.
             for (var i=0; i<requestHeader.length;i++) {
                 var anItem = requestHeader[i];
                 var headerName = anItem[headerName];
                 var value = anItem[value];
                 if (headerName == "Content-Type") {
                     var contentType = value;
                 }
                 else{
                     xhr.setRequestHeader(headerName,value);
                 }    
             }
         }
         xhr.setRequestHeader("Content-Type", (contentType||_defaultContentType));

         //user/password    xhr.open(method,realUri,async,user,pwd); 
         if (method == this.httpmethods.PUT || method==this.httpmethods.POST) {
             if (message) {
                  xhr.send(message);
             }
         }else{
              xhr.send(null); 
         }
         return xhr;         
    },	
    httpmethods:{
        GET:"GET",
        PUT:"PUT",
        POST:"POST",
        DELETE:"DELETE",
        HEAD:"HEAD",
        OPTIONS:"OPTIONS"
    }
});
