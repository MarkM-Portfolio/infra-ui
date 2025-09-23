/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide( "com.ibm.mm.enabler.xslt" );

//---------------------------------------------------------------------- xml related utility methods
/*
 * loadXml(sUrl) - returns oDomDoc. parses xml from the url into DOM document object.
 * loadXmlString() - returns oDomDoc. parses xml from the contents of the string into DOM document object.
 * loadXsl()
 * transform()
 */
com.ibm.mm.enabler.xslt.ie = {};
com.ibm.mm.enabler.xslt.gecko = {};

com.ibm.mm.enabler.xslt.getXmlHttpRequest = function() {
	var oXml = null;
	if (typeof ActiveXObject != "undefined") {
		oXml = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		oXml = new XMLHttpRequest();
	}
  return oXml;
};

com.ibm.mm.enabler.xslt.loadXml = function(sUrl) {
	if (typeof ActiveXObject != "undefined") {
		return com.ibm.mm.enabler.xslt.ie.loadXml(sUrl);
	}
	else {
		return com.ibm.mm.enabler.xslt.gecko.loadXml(sUrl);
	}
};

com.ibm.mm.enabler.xslt.loadXmlString = function(sXml) {
	if (typeof ActiveXObject != "undefined") {
		return com.ibm.mm.enabler.xslt.ie.loadXmlString(sXml);
	} else {
		var parser = new DOMParser();
		return com.ibm.mm.enabler.xslt.gecko.loadXmlString(sXml);
	}
};

com.ibm.mm.enabler.xslt.loadXsl = function(sUrl) {
	if (typeof ActiveXObject != "undefined") {
		return com.ibm.mm.enabler.xslt.ie.loadXsl(sUrl);
	} else {
		return com.ibm.mm.enabler.xslt.gecko.loadXsl(sUrl);
	}
};

com.ibm.mm.enabler.xslt.transform = function (xml, xsl, sXslMode, aXslParams, bReturnString)
{
   com.ibm.mm.enabler.debug.entry( "xslt.transform", xml,xsl,sXslMode,aXslParams,bReturnString );
   if (typeof ActiveXObject != "undefined") {
   	return com.ibm.mm.enabler.xslt.ie.transform(xml, xsl, sXslMode, aXslParams, bReturnString);
   } else {
   	return com.ibm.mm.enabler.xslt.gecko.transform(xml, xsl, sXslMode, aXslParams, bReturnString);
   }
};

com.ibm.mm.enabler.xslt.transformAndUpdate = function (/*HTMLElement*/nodeToUpdate, /*XMLDocument*/xml, /*XMLDocument*/xsl, /*String?*/sXslMode, /*Map*/aXslParams) {
	com.ibm.mm.enabler.debug.entry( "xslt.transformAndUpdate",  nodeToUpdate, xml, xsl, sXslMode, aXslParams );
	if ( typeof ActiveXObject != "undefined" ) {
		var results = com.ibm.mm.enabler.xslt.ie.transform(xml, xsl, sXslMode, aXslParams, true );
		//Don't really want to use innerHTML here, but seems to be the only way IE will 
		//take the update.
		com.ibm.mm.enabler.debug.log(  "xslt.transformAndUpdate","XSLT result: " + results );
		nodeToUpdate.innerHTML += results;
	}
	else {
		results = com.ibm.mm.enabler.xslt.gecko.transform(xml,xsl,sXslMode,aXslParams, false);
		com.ibm.mm.enabler.debug.log( "xslt.transformAndUpdate", "XSLT result: " + ( new XMLSerializer() ).serializeToString( results ), "com.ibm.mm.enabler.xslt.transformAndUpdate" );
		
		var toAppend = results.documentElement;
			
		if ( results.documentElement.tagName == "transformiix:result" ) {
			toAppend = results.documentElement.childNodes;
			com.ibm.mm.enabler.dom.copyChildren( results.documentElement, nodeToUpdate, true );
			/*var length = toAppend.length
			
			com.ibm.mm.enabler.debug.log( "xslt.transformAndUpdate", "there are " + toAppend.length + " items to add." );
			
			for ( var c = 0; c < length; c++ ) {
				com.ibm.mm.enabler.debug.log( "xslt.transformAndUpdate", "Appending: " + ( new XMLSerializer() ).serializeToString( toAppend[c] ), "com.ibm.mm.enabler.xslt.transformAndUpdate" );
				com.ibm.mm.enabler.debug.log( "xslt.transformAndUpdate", "toAppend = " + toAppend[c] + "; c=" + c + "; length=" + length );
				nodeToUpdate.appendChild( toAppend[c] );
			}*/
		}
		else {
			com.ibm.mm.enabler.debug.log( "xslt.transformAndUpdate", "Appending2: " + ( new XMLSerializer() ).serializeToString( toAppend ), "com.ibm.mm.enabler.xslt.transformAndUpdate" );
			nodeToUpdate.appendChild( toAppend );
		}
	}	
	com.ibm.mm.enabler.debug.exit(  "xslt.transformAndUpdate" );
};

//---------------------------------------------------------------------- IE xml related utility methods

com.ibm.mm.enabler.xslt.ie.loadXml = function(sUrl) {
	var oXmlDoc = new ActiveXObject("MSXML2.DOMDocument");
	oXmlDoc.async=0;
	oXmlDoc.resolveExternals = 0;
  	if(!oXmlDoc.load(sUrl))
  	{
  		//Callers should catch this and can substitute their own error message
  		throw new Error("Error loading xml file " + sUrl);
  	}
	return oXmlDoc;
};

com.ibm.mm.enabler.xslt.ie.loadXmlString = function(sXml) {
	var oXmlDoc = new ActiveXObject("MSXML2.DOMDocument");
	oXmlDoc.async=0;
	oXmlDoc.resolveExternals = 0;
  	if(!oXmlDoc.loadXML(sXml))
  	{
  	    //Callers should catch this and can substitute their own error message
  		throw new Error("Error loading xml string " + sXml); 
  	}
	return oXmlDoc;
};

com.ibm.mm.enabler.xslt.ie.loadXsl = function(sUrl) {
	//we need to use MSXML2.FreeThreadedDOMDocument interface in order to support 
	//mode and parameters in XSL transformation.
	var oXslDoc = new ActiveXObject("MSXML2.FreeThreadedDOMDocument");
	oXslDoc.async=0;
	oXslDoc.resolveExternals = 0;
  	if(!oXslDoc.load(sUrl))
  	{
  		//Callers should catch this and can substitute their own error message
  		throw new Error("Error loading xsl file " + sUrl);
  	}	
	return oXslDoc;
};

com.ibm.mm.enabler.xslt.ie.transform = function(xmlDoc, xsl, sXslMode, aXslParams,bReturnString) {
	var oXml = xmlDoc;
	var oXsl = xsl;

     try {		
		if (!oXsl.documentElement) {
			oXsl = this.loadXsl(xsl);
		}
	 } catch(e) {
		var sMsg = e.message;
		throw new Error(""+sMsg, ""+sMsg);
	 }
	//create the xsl processor and apply the transformation
	var oXslt = new ActiveXObject("Msxml2.XSLTemplate");
	oXslt.stylesheet = oXsl;
	var oXslProc = oXslt.createProcessor();
	oXslProc.input = oXml;
	
	//set paramaters if any
	if(aXslParams) {
		for(var p in aXslParams) {
			oXslProc.addParameter(p, aXslParams[p]);
		}
	}
	if (sXslMode) {
		oXslProc.addParameter("mode", sXslMode);
	}
	
	if (bReturnString) {
		if(!oXslProc.transform()) {
			//Callers should catch this and can substitute their own error message
  			throw new Error("Error transforming xml doc " + oXml); 
  		}
  		return oXslProc.output;
	} else {
		var oHtmlDoc = new ActiveXObject("MSXML2.DOMDocument");
		oHtmlDoc.async = 0;
		oHtmlDoc.validateOnParse = 1;
		oXml.transformNodeToObject(oXsl,oHtmlDoc);
		return oHtmlDoc;	
	}
};

//---------------------------------------------------------------------- GECKO xml related utility methods

com.ibm.mm.enabler.xslt.gecko.loadXml = function(sUrl) {
    //var oXmlResponse = NG.ServerRequest.postRequest(sUrl);
//    if (oXmlResponse) return xmlLoadString(oXmlResponse.responseText);
//    else return null;
};

com.ibm.mm.enabler.xslt.gecko.loadXmlString = function(sXml) {
    var parser = new DOMParser();
    try { oXmlDoc = parser.parseFromString(sXml, "text/xml"); }
    catch (exc) {
	    //Callers should catch this and can substitute their own error message
  		throw new Error("Error loading xml string " + sXml); 
    }
	return oXmlDoc;
};

com.ibm.mm.enabler.xslt.gecko.loadXsl = function(sUrl) {
	//This is done through createDocument because of anchor(#) we have in portal url. 
	//Do not change the code without testing the case.
	var oDomDoc = document.implementation.createDocument('','',null); 
	oDomDoc.async = 0; // this is the important part
	oDomDoc.load(sUrl);
	
	return oDomDoc;
};

com.ibm.mm.enabler.xslt.gecko.transform = function(xmlDoc, xsl, sXslMode, aXslParams,bReturnString) {
	try {
	  var xslDoc = xsl;
      if(!xslDoc.documentElement) 
      {
          xslDoc = this.loadXsl(xsl);
      }        
      var proc = new XSLTProcessor();
      proc.importStylesheet(xslDoc); 
 
      //set parameters if any
      if(aXslParams) {
	  	for(var p in aXslParams)  {
		    proc.setParameter(null, p, aXslParams[p]);
	    }
      }
      if (sXslMode) {
	  	proc.setParameter(null, "mode", sXslMode);
	  }
    
      var resultDoc = proc.transformToDocument(xmlDoc);
      if (!bReturnString) {
      	return resultDoc;
      }
      resultStr = resultDoc.documentElement.childNodes[0].textContent;    
    } 
    catch (exc)
    {
		//Callers should catch this and can substitute their own error message
  		throw new Error("Error transforming xml doc " + exc);
	}
    return resultStr;  
};

/* This method sets the content of a layer within the HTML page
 * to the result of transforming the xml parameter by the xsl
 * parameter. The xml and xsl parameters may be of any form
 * supported by the transformXml() method. The layer parameter
 * may be either a DOM object or the name of a DOM object that
 * can be found using the findObject() method.
 */

com.ibm.mm.enabler.xslt.setLayerContentByXml = function (layer, xml, xsl, xslparam,bReturnString) {
    var result = com.ibm.mm.enabler.xslt.transform(xml,xsl,null,xslparam,bReturnString);
    if (layer.innerHTML) {
		layer.innerHTML = result;
	} else {
		var obj = document.getElementById(layer);
		obj.innerHTML = result;
	}
};

