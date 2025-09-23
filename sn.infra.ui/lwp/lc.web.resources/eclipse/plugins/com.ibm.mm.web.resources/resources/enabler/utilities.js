/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.mm.enabler.utilities");
dojo.provide("com.ibm.mm.enabler.ArrayMap");


dojo.require("dojox.data.dom");


com.ibm.mm.enabler.utilities = {
	
	rewriteURL: function (/*String*/ targetUrl) {
		var _targetURL = new com.ibm.mm.enabler.utilities.HttpUrl ( targetUrl );
		
		return _targetURL.toProxifiedString();
	},
    inStringArray:function(str,/*[]*/arrayObj)
    {
        var rc = false;
        for (var i in arrayObj) {
            var temp1 = arrayObj[i];
            if (temp1 == str) {
                rc = true;
                break;
            }
        }
        return rc;
    },
	getLocale:function(/*com.ibm.mashups.enabler.Localized*/localized,aLocale,defaultLocale){
		if (typeof localized == "undefined" || localized === null) return null;
		
		var localeArr = localized.getLocales();
		if (typeof localeArr == "undefined" || localeArr === null || !dojo.isArray(localeArr)) return null;
		
		if (localeArr.length === 0) return null;
		
		var returnLocale = null;
		if (localeArr.length === 1) returnLocale =  localeArr[0];
		
		var arr = {};
		for (var i in localeArr){
			var temp = localeArr[i];
			arr[temp]=temp;
		}
		
		if (returnLocale === null) {
			if (typeof aLocale != "undefined" && aLocale !== null) {
			    returnLocale = this.findMatchLocale(arr,aLocale);
				if (returnLocale === null )
				{
					var tempArr = aLocale.split(/-|_/);
					if (tempArr.length == 2) {
						var iLocale = tempArr[0];
						if (typeof arr[iLocale] != "undefined" && arr[iLocale] !== null) {
							returnLocale = iLocale;
						}
					}
				}
			}
		}
		if (returnLocale === null){
			//get browser locale
            var browserLocale = (dojo.isIE ? navigator.userLanguage : navigator.language).toLowerCase();
            if (typeof ibmConfig != "undefined" && ibmConfig != null && typeof (ibmConfig.locale) != "undefined" && ibmConfig.locale != null) {
               browserLocale = ibmConfig.locale;
            }  
            if (browserLocale !== null){
					//browserLocale = browserLocale.replace(/-/,"_");
			    	returnLocale = this.findMatchLocale(arr,browserLocale);
					if (returnLocale === null){
					    var tempArr = browserLocale.split(/-|_/);
						if (tempArr.length == 2) {
							var tempLocale = tempArr[0];
							if (typeof arr[tempLocale] != "undefined" && arr[tempLocale] !== null) {
								returnLocale = tempLocale;
							}
						}				
					}				
			}
		}
		
		if (returnLocale === null){
			if (typeof defaultLocale != "undefined" && defaultLocale != null)
		    returnLocale = defaultLocale;
		}
		if (returnLocale === null){
			if (typeof arr["en"] != "undefined" && arr["en"]!== null){
				returnLocale = "en";
			}
		}
		if (returnLocale === null){
			returnLocale = localeArr[0];
		}
		return returnLocale;	
	},
	findMatchLocale:function(arr,locale){
		var returnLocale = null;
		if (typeof arr[locale] != "undefined" && arr[locale] != null)
		{
			returnLocale = locale;
		}
		var serverLocale = this.toServerLocale(locale);
		if (returnLocale === null && (typeof arr[serverLocale] != "undefined" && arr[serverLocale] != null)){
			returnLocale = serverLocale;			
		}
		var serverLocaleLowercase  = serverLocale.toLowerCase();
		if (returnLocale === null && (typeof arr[serverLocaleLowercase] != "undefined" && arr[serverLocaleLowercase] != null)){
			returnLocale = serverLocaleLowercase;			
		}
		return returnLocale;		
	},
	toServerLocale:function(locale)
	{
		if (typeof locale == "undefined" || locale == null) return null;
		if (locale.indexOf ("-") < 0 ) return locale;
		locale = locale.replace(/-/,"_");
		var tempArr = locale.split('_');
		var lang= tempArr[0];
		var country = tempArr[1].toUpperCase();
		var returnLocale = lang+"_"+country;
		return returnLocale;		
	},	
	encodeModelID4Uri:function(uri)
	{
	    // encode uri part correctly
	    var pos = uri.indexOf(":");
	    if (pos != -1) {
	        var start = uri.slice(0,pos+1);
	        var end = uri.slice(pos+1);
	        uri = start + encodeURIComponent(end);
	    }
	    return encodeURIComponent(uri);
	},
	preloadImage:function(path,width,height){
        var image;
        if (width && height)
            image = new Image(width,height);
        else
            image = new Image();
        
		image.src = path;
        return image;
    }
}

com.ibm.mm.enabler.dom = {
    // summary:
    //      privide dom api util dojo 1.0 dom api is available
    //      dojox.data.dom is not garanteed so wrap it here
	//	
    //set/get xml dom element content 
    textContent:function(node,text){
          if (node == null ) return "";
          if (arguments.length > 1){ 
              var doc = node.ownerDocument;
              var aNode = doc.createTextNode(text);
              this.replaceChildren(node,aNode); 
              return; 
          } else { 
             if (node.textContent != "undefined" && node.textContent != null) { 
                 return node.textContent; 
             } 
             var _result = ""; 
             for (var i = 0; i < node.childNodes.length; i++) { 
                 switch (node.childNodes[i].nodeType) { 
                     case 1: 
                     case 3: _result += node.childNodes[i].nodeValue; 
                         break; 
                     case 2: 
                     case 4: _result += node.childNodes[i].nodeValue; 
                         break; 
                     default: 
                         break; 
                 } 
              } 
             return _result; 
         }
    },
   createElement: function(dom,name,ns) {
      var newElem;
      if (dojo.isIE) {
          if (typeof ns != 'undefined' && ns != null) 
              newElem = dom.createNode(1, name, ns); 
          else
              newElem = dom.createElement(name); 
      } else {
          newElem = dom.createElementNS(ns, name);
      }
      return newElem;
   },
   destroyNode:function(node) {

        if(node && node.parentNode){
            return node.parentNode.removeChild(node); 
        }

        if(node.nodeType != 3){ // ingore TEXT_NODE
            if(dojo.isIE){
                node.outerHTML=''; //prevent ugly IE mem leak 
            }
        }
   },
   createDocument:function(/*string?*/ str, /*string?*/ mimetype){
        return dojox.data.dom.createDocument(str,mimetype);
   },
   replaceChildren:function(/*Element*/node, /*Node || array*/ newChildren){
        return dojox.data.dom.replaceChildren(node,newChildren);
   },
   innerXML:function(node){
        return dojox.data.dom.innerXML(node);
   },
   removeChildren:function(node){
        return dojox.data.dom.removeChildren(node);
   },
   copyChildren:function(/*Element*/srcNode, /*Element*/destNode, /*boolean?*/trim){
	var clonedNode = srcNode.cloneNode(true);
	return this.moveChildren(clonedNode, destNode, trim);	//	number
   },
   moveChildren:function(srcNode, destNode, trim){
	var count = 0;
	if(trim) {
		while(srcNode.hasChildNodes() &&
			srcNode.firstChild.nodeType == 3) {
			srcNode.removeChild(srcNode.firstChild);
		}
		while(srcNode.hasChildNodes() &&
			srcNode.lastChild.nodeType == 3) {
			srcNode.removeChild(srcNode.lastChild);
		}
	 }
     while(srcNode.hasChildNodes()){
		destNode.appendChild(srcNode.firstChild);
		count++;
	 }
     return count;	//	number
   } 
}



dojo.declare( "com.ibm.mm.enabler.utilities.HttpUrl", 
			  null,
              {
			  constructor:function ( /*String*/urlString ) {
               	this.scheme = this._extractScheme(urlString );
			  	this.server = this._extractServer(urlString );
				this.port = this._extractPort(urlString );
				this.path = this._extractPath(urlString );
				this.query = this._extractQuery(urlString );
				this.anchor = this._extractAnchor(urlString );
			  },
			 
			  	addParameter: function ( /*String*/name, /*String*/value ) {
					this.query += ((this.query!= null && this.query != "")?"&":"") + name + "=" + value;
				},
				toProxifiedString: function () {
					//check if we need the proxy
					if (typeof ibmConfig == 'undefined')
						return this.toString();
						
					var newURL = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.PROXY_URL);
					if (newURL == null)
						return this.toString();
					newURL += "/";
					
				    if (window.location.protocol == this.scheme &&  window.location.hostname == this.server )
                    {    
                       if(window.location.port == this.port || this.port=="" )
                       {
                           return this.toString();
                       }else if (this.scheme=="http:" && window.location.port == "" && this.port == "80") {
                           return this.toString();
                       } else if (this.scheme=="https:" && window.location.port=="" && this.port=="443") {
                           return this.toString();
                       }  
                    }

					// Don't need to use proxy for css files
			        var extension = (new com.ibm.mm.enabler.iw.services.loadService)._getExtension(this.toString());
			        if (extension !== null && extension === "css") {
                        return this.toString();
					}
				    
					// rewrite
					if (this.scheme == "https:") {
						newURL += "https/" + this.server + ((this.port != "443" && this.port != "") ? "%3A" + this.port:"");
					} else {
						newURL += "http/" + this.server + ((this.port != "80" && this.port != "")? "%3A" +this.port:"");
					}

                    if (this.path != "") {
                        newURL += "/" + this.path;
                    }

  					
					if ( this.query != "" ) {
						newURL += "?" + this.query;
					}
					if ( this.anchor != "" ) {
						newURL += "#" + this.anchor;
					}
					
					return newURL;
				},
				toString: function () {
					var str = "";
                    //safari doesn't support url normalization on xhr request
                    if ( this.server != "" ) {
                        str += this.scheme + "//" + this.server;
                        if ( this.port != "") {    
                            if ( this.scheme == "http:" &&  this.port == "80" ) {
                                str +="";
                            }else if (this.scheme == "https:" && this.port =="443") {
                                str +="";
                            } else{
                                str += ":" + this.port;
                            }
                        }
                    }

		            if ( this.path != "") {
                        str += "/" + this.path; 
                    } 
										
					if ( this.query != "" ) {
						str += "?" + this.query;
					}
					if ( this.anchor != "" ) {
						str += "#" + this.anchor;
					}
					
					return str;
				},
				_extractScheme: function (/*String*/ urlString ) {
					var indexOfScheme = urlString.indexOf ( "://" );
					
					if (indexOfScheme == -1)
						return window.location.protocol; // location.protocol returns the protocol like http: or https:
					
					return urlString.substring(0, indexOfScheme + 1);
				},
				_extractServer: function (/*String*/urlString ) {
					var indexOfScheme = urlString.indexOf( this.scheme );
					var retVal = "";
					if ( indexOfScheme == 0 ) {
						var indexOfSlash = urlString.indexOf( "/", indexOfScheme + this.scheme.length + 2 );
                        if (indexOfSlash != -1) {
                            var serverAndPort = urlString.substring( indexOfScheme+ this.scheme.length+2, indexOfSlash );
                        }else{
                            var serverAndPort = urlString.substring(indexOfScheme+ this.scheme.length+2);
                        }
						retVal = serverAndPort.split( ":" )[0];
					} else {
						retVal = window.location.hostname;
					}
					
					return retVal; 
				},
				_extractPort: function (/*String*/urlString ) {
					var indexOfServer = urlString.indexOf( this.server );
					var retVal = "";
					if ( indexOfServer >= 0 ) {
						var indexOfSlash = urlString.indexOf( "/", indexOfServer );
                        if (indexOfSlash != -1) {
                            var serverAndPort = urlString.substring( indexOfServer, indexOfSlash );
                        }
                        else{
                            var serverAndPort = urlString.substring(indexOfServer);
                        }
						var serverAndPortParts = serverAndPort.split( ":" );
						if ( serverAndPortParts.length > 1 ) {
							retVal = serverAndPortParts[1];
						}
					}	
					
					if (retVal == ""){
						if(urlString.indexOf("/")==0)
							retVal=window.location.port;
						else 
							retVal = "";
					}
						
					return retVal; 
				},
				_extractPath: function ( /*String*/urlString ) {
					var indexOfScheme = urlString.indexOf( this.scheme );
					var startIndex = 0;
					
					if (indexOfScheme == 0)
						startIndex = this.scheme.length+2;
						
					var retVal = "";

					var indexOfSlash = urlString.indexOf( "/", startIndex );
					var indexOfQuery = urlString.indexOf( "?" );
					var indexOfHash = urlString.lastIndexOf( "#" );
					if ( indexOfQuery >= 0 ) {
						retVal = urlString.substring( indexOfSlash + 1, indexOfQuery );
					}
					else {
						if ( indexOfHash >= 0 && indexOfSlash != -1 ) {
							retVal = urlString.substring( indexOfSlash + 1, indexOfHash );
						}
						else if ( indexOfSlash != -1){
							retVal = urlString.substring( indexOfSlash + 1 );
						}		
					}
					
					return retVal;
				},
				_extractQuery: function ( /*String*/urlString ) {
					var retVal = "";
					var urlParts = urlString.split( "?" );
					
					if ( urlParts.length > 1 ) {
						retVal = urlParts[1].split( "#" )[0];
					}	
					
					return retVal;
				},
				_extractAnchor: function ( /*String*/urlString ) {
					var retVal = "";
					var urlParts = urlString.split( "#" );
					
					if ( urlParts.length > 1 ) {
						retVal = urlParts[urlParts.length - 1];
					}	
					
					return retVal;
				}
			}
);

dojo.declare("com.ibm.mm.enabler.ArrayMap",null,
{
    constructor:function(){
         this.entries = [];
         this.keys = {}; 
    },
    values:function(){
        return this.entries;        
    },
    put:function(/*String*/key,/*object*/value){
         var index = this.keys[key];
         if (typeof index != 'undefined' && index != null){
             this.entries[index]= value;
         } 
         else{
             index = this.entries.length;
             this.entries.push(value);
             this.keys[key]=index;
         }       
    },
    getKey:function(index){
        if (index < this.entries.length){
            for (var key in this.keys){
                var temp = this.keys[key];
                if (temp != null && temp == index)
                {
                    return temp;                    
                }
            }            
        }            
        else
            return null;          
    },
    getValue:function(index){
        if (index < this.entries.length)
            return this.entries[index];
        else
            return null;        
    },
    get:function(key){
        var index = this.keys[key];
        if (typeof index != 'undefined' && index != null)
        {
           var value = this.entries[index];
           return value;
        }
        return null;        
    },
    remove:function(key){
        var index = this.keys[key];
        if (typeof index != 'undefined' && index != null)
        {
            this.entries.splice(index,1);
            this.keys[key] = null;
        }
        return index;
    },
    size:function(){
        return this.entries.length;       
    },
    keySet:function(){
        var arr = [];
        for (var key in this.keys){
            arr.push(key);           
        }
        return arr;
    }    
});
