/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
define([
	"dojo",
	"dojo/_base/declare",
	"dojo/i18n",
	"dojo/string",
	"dojo/topic",
	"ic-mm/enabler/iw/parser",
	"ic-mm/enabler/utilities",
	"ic-mm/enabler/xpath"
], function (dojo, declare, i18n, string, topic, parserModule, utilities, xpath) {

	 
	declare("com.ibm.mm.enabler.iw.services.loadService",null, {
	    constructor:function(){
	      //loadModelus to keep track that if a resource has been loaded already
	      this.modules = {};  
	    }, 
	
	    loadResource: function(widgetId,name,uri,cb,mimetype){
	       com.ibm.mm.enabler.debug.entry("loadService.loadResource","uri:"+uri+" mimetype:"+mimetype+" widgetId:"+widgetId);
	       var loaded;
	       if (typeof name == "undefined" || name === null) {
		   	name = uri;
		   }
	       if (typeof name != "undefined" && name !== null) 
	       {
	           var resourceData = this.modules[name];
	           if (typeof resourceData != "undefined" && resourceData !== null) {
			   	loaded = true;
			   }
	       }
	       if (loaded) {
		   	return;
		   }
	        resourceData = {};
	        resourceData.id = name;
	        resourceData.src = uri;
	        resourceData.callback = cb;
	        resourceData.mimetype = mimetype;
	          
	        path = this._rewriteUrl(uri,widgetId);
	
	        var extension = this._getExtension(uri);
	        if (extension !== null && extension == "css") {
	                return this._loadCSS(path);
	        }   
	               
	        var http = dojo._xhrObj();   
	        var me = this;
	       
	        http.open('GET', path, false);
	   
	        try{
	          http.send(null);
	          if(http.status == 200){
	              var oldContents = http.responseText;
	              var contents = oldContents.replace(/_IWID_/g,"_"+widgetId+"_");
	
	              if(cb){
	              //Todo: queue the response,with resourceData
	              }
	          }
	        }catch(e){
	            return false;
	        }
	
	        if (!contents) {
				return false;
			}
	             
	        if (extension === "js" || mimetype=="text/javascript") {
				var value = dojo.eval(contents);
			}
	        
	        this.modules[name] = resourceData;   
	        return true;
	    },
	    _rewriteUrl:function(uri,id){
	         var widget = iWidgetContainer.getWidgetById(id);
	         var rawUri = widget.getWidgetInstance().widgetXMLUrl;
	         var baseUri = rawUri.substring(0,rawUri.lastIndexOf("/")+1);
	         
	         if ( baseUri.indexOf("://") != -1) {
	           var indexOfScheme = uri.indexOf("://");
	           var indexOfRoot = uri.indexOf("/",indexOfScheme+1);
	           var serverRoot = uri.substring(0, indexOfRoot);
	         }
	
	         var path = uri;
	         if ( uri.indexOf("://") == -1) {    
	             if (uri.indexOf("/") === 0 ) {
	                 if (typeof(serverRoot) != "undefined") {
					 	path = serverRoot + uri;
					 }
	             }
	             else{
	                 if (typeof(baseUri) != "undefined") {
					 	path = baseUri + uri;
					 }
	             }               
	         } 
	        if (path.indexOf("http") === 0) {
				path = utilities.rewriteURL(path);
			} 
	        return path;
	
	    },
	     _getExtension: function(uri){
	         return uri.substring(uri.lastIndexOf(".")+1,uri.length);
	    },
	    _loadCSS:function(path){
	         var link=document.createElement("link");
	         link.setAttribute("rel", "stylesheet");
	         link.setAttribute("type", "text/css");
	         link.setAttribute("href", path);
	         document.getElementsByTagName("head")[0].appendChild(link);
	    }
	 
	});
	
	declare( "com.ibm.mm.enabler.iw.services.widgetLoadService",
				  null,
				  { 
				  	getWidgetXML: function ( /*String*/ widgetUrl,/*String*/ widgetId) {
						// summary: Retrieves the WidgetInfo for the given widget url.
						// widgetUrl: a widget URL, should come directly from the microformat or from alias
	                    com.ibm.mm.enabler.debug.entry("widgetLoadService.getWidgetXML","widgetUrl:"+widgetUrl +" widgetId:"+widgetId);
	                    this.widgetId = widgetId;
	                    var me = this;
	                    var contentUrl = widgetUrl;
	                    if (contentUrl.indexOf("http") === 0) {
							contentUrl = utilities.rewriteURL(contentUrl);
						}
	                    var args = {
	                        url: contentUrl,
	                        load: function( data,ioArgs ) {
	                                me.handleLoad(data, ioArgs.xhr);
	                            },
	                        error : function(data, ioArgs){
	                                com.ibm.mm.enabler.debug.error("widgetLoadService.getWidgetXML","Error widgetLoadService.getWidgetXML error loading!"+data);
	                                var args = [];
	                                args.push("error");
	                                var iwMessages = i18niwMessages;
	                                args.push(string.substitute(iwMessages.E_IWIDGETDEF_NOTAVAILABLE_1, [contentUrl]));
	                                args.push(data.message);
	                                //dojo.publish( "/enabler/inlineMessage/"+me.widgetId , args );    
	                                topic.publish("/enabler/inlineMessage/"+me.widgetId, "error", string.substitute(iwMessages.E_IWIDGETDEF_NOTAVAILABLE_1, [contentUrl]), data.message);    
	                            }, 
	                        handleAs: "text" //tells framework this is an text document
	                    };
	                    dojo.xhrGet(args); 
					},
	                handleLoad: function(data,xhr){   
	                     var parser = parserModule.WidgetParserFactory.getWidgetParser(xhr.responseText);
	                     var wInfo = parser.parseWidgetDefinition();
	                     this._fireEvents( wInfo );
	                },				
	   				_fireEvents: function ( /*WidgetInfo*/wInfo ) {			
						this._fireIndividualWidgetStateChange( wInfo );
					},
					_fireIndividualWidgetStateChange: function( /*WidgetInfo*/wInfo){
						var args = [];
						args.push(wInfo);
						//dojo.publish("/enabler/widgetXmlRetrieved/" + this.widgetId, args);
						topic.publish("/enabler/widgetXmlRetrieved/" + this.widgetId, wInfo);
					}
	 
	      		  }
	);   
	
	return com.ibm.mm.enabler.iw.internalservices;
});
