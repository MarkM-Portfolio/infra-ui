/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.xpath");

(function() {
   
/**
 * Example: var nodes =
 * lconn.core.xpath.selectNodes("/pc:rootElement/pc:childElem[@profile-type='default']",xmlDocumentObj);
 * var nodes = lconn.core.xpath.selectNodes("/tags/tag",xmlDocumentObj); var
 * node = lconn.core.xpath.selectSingleNode("/tags/tag[1]",xmlDocumentObj); var
 * nodeTxtVal =
 * lconn.core.xpath.selectText("/tags/tag[1]/text()",xmlDocumentObj); var
 * nodeTxtVal =
 * lconn.core.xpath.selectText("/tags/tag[1]/@name",xmlDocumentObj);
 * 
 * lconn.core.xpath.setNodeValue("/tags/tag[1]",xmlDocumentObj, newValue);
 * lconn.core.xpath.setNodeValue("/tags/tag[1]/@name",xmlDocumentObj, newValue);
 */

   /** internal functions */
   var xpath_getNameSpace = function(
         /* Array<{prefix: "tns", nameSpaceURI: "http://ibm.com/namespace"}> */qNameArrayTemp,
         prefix) {
      for ( var x = 0; x < qNameArrayTemp.length; x++) {
         if (prefix == qNameArrayTemp[x].prefix)
            return qNameArrayTemp[x].nameSpaceURI;
      }
      return null;
   };

   var xpath_setNameSpaces = function(XMLDocument,/*
                                                    * Array<{prefix: "tns",
                                                    * nameSpaceURI:
                                                    * "http://ibm.com/namespace"}>
                                                    */
         qNameArrayTemp) {
      // var browserObj=new Browser();
      // if(!browserObj.isMozilla)
      {
         var namespaces = "";
         for ( var x = 0; qNameArrayTemp != null && x < qNameArrayTemp.length; x++) {
            namespaces += "xmlns:" + qNameArrayTemp[x].prefix + "='"
                  + qNameArrayTemp[x].nameSpaceURI + "' ";
         }
         if (namespaces != "" && (dojo.isIE || lconn.core.xpath.isIE11()))
            XMLDocument.setProperty("SelectionNamespaces", namespaces);
      }
   };

   var xpath_getNameSpaceResolver = function(
         /* Array<{prefix: "tns", nameSpaceURI: "http://ibm.com/namespace"}> */qNameArrayTemp) {
      if (qNameArrayTemp != null) {
         return function(prefix) {
            var nameSpaceURI = xpath_getNameSpace(qNameArrayTemp, prefix);

            if (lconn.core.xpath.debug)
               console.log("getNameSpaceResolver: prefix: " + prefix + " URI: "
                     + nameSpaceURI);
            if (lconn.core.xpath.debug
                  && (nameSpaceURI == null || nameSpaceURI == ""))
               console
                     .log("getNameSpaceResolver: no namespace was found for prefix: "
                           + prefix);

            return nameSpaceURI;
         }
      }
      else
         return null;
   };

   var xpath_getNamesSpaceFromRootElement = function(XMLDocument) {
      var qNameArrayTemp = new Array;
      qNameArrayTemp = xpath_addNamesSpaceFromRootElement(qNameArrayTemp,
            XMLDocument);
      return qNameArrayTemp;
   };

   var xpath_addNamesSpaceFromRootElement = function(
         /* Array<{prefix: "tns", nameSpaceURI: "http://ibm.com/namespace"}> */qNameArrayTemp,
         XMLDocument) {
      if (XMLDocument.documentElement) {
         for ( var x = 0; x < XMLDocument.documentElement.attributes.length; x++) {
            var att = XMLDocument.documentElement.attributes[x];
            var indexOfColon = att.nodeName.indexOf(":");
            if (indexOfColon != -1) {
               if (att.nodeName.substring(0, indexOfColon).toLowerCase() == "xmlns") {
                  var prefix = att.nodeName.substring(indexOfColon + 1);
                  var nameSpaceURI = xpath_getNameSpace(qNameArrayTemp, prefix);
                  if (lconn.core.xpath.debug)
                     console
                           .log("addNamesSpaceFromRootElement: current prefix: "
                                 + prefix + " nameSpaceURI: " + nameSpaceURI);

                  if (nameSpaceURI == null) {
                     nameSpaceURI = att.nodeValue;
                     if (lconn.core.xpath.debug)
                        console
                              .log("addNamesSpaceFromRootElement: adding prefix: "
                                    + prefix
                                    + " nameSpaceURI: "
                                    + nameSpaceURI
                                    + " to the list");
                     // var length=qNameArrayTemp.length;
                     qNameArrayTemp.push({
                        prefix : prefix,
                        nameSpaceURI : nameSpaceURI
                     });
                  }
               }
            }
         }
      }
      return qNameArrayTemp;
   };
   /** end of internal functions */
lconn.core.xpath.debug = false;

/**
 * @qNameArray can be null, prefixes can also be declared in the XMLDocument
 *             root element format: [{prefix: "tns", nameSpaceURI:
 *             "http://ibm.com/namespace"}, {prefix: "tn2", nameSpaceURI:
 *             "http://ibm.com/namespace2"}]
 */
lconn.core.xpath.selectNodes = function(XPathExpression, XMLDocument, qNameArray, ContextNode) {
   if (XMLDocument == null)
      // FIXME: common_getStacktrace is declared as a global in lconn.core.errorhandling
      throw Error("lconn.core.xpath.selectNodes : XMLDocument can not be null\n"
            /*+ common_getStacktrace()*/);

   if (qNameArray == null)
      qNameArray = xpath_getNamesSpaceFromRootElement(XMLDocument);
   else
      qNameArray = xpath_addNamesSpaceFromRootElement(qNameArray, XMLDocument);

   for ( var x = 0; lconn.core.xpath.debug && x < qNameArray.length; x++)
      console.log(qNameArray[x].prefix + ":" + qNameArray[x].nameSpaceURI);

   if (ContextNode == null && (XMLDocument.documentElement != null))
      ContextNode = XMLDocument.documentElement;

   if (dojo.isIE || lconn.core.xpath.isIE11()) {
      try {
         xpath_setNameSpaces(XMLDocument, qNameArray);
         return ContextNode.selectNodes(XPathExpression);
      }
      catch (exception) {
         // lconn.core.errorhandling.DefaultErrorHandler("IE:
         // xpath.selectNodes",exception);
         console.log(exception); // Files: errorhandling not part of lconn.core
      }
   }
   else {
      try {
         var nameSpaceResolverObj = xpath_getNameSpaceResolver(qNameArray);
         var xpathResultType = 0; // XPathResult.ANY_TYPE
         var previousXpathResult = null;

         previousXpathResult = XMLDocument.evaluate(XPathExpression,
               ContextNode, nameSpaceResolverObj, xpathResultType,
               previousXpathResult);

         if (previousXpathResult != null) {
            var nodeList = new Array();
            var $A = null;
            while ($A = previousXpathResult.iterateNext())
               nodeList.push($A);
            return nodeList;
         }
      }
      catch (exception) {
         // make sure xpath expression and prefixes are valid if the following
         // occurs:
         // NS_ERROR_DOM_NAMESPACE_ERR is usaually cause by an invalid prefix.
         // Error: "An attempt was made to create or change
         // an object in a way which is incorrect with regard to namespace"
         // lconn.core.errorhandling.DefaultErrorHandler("FF:
         // xpath.selectNodes",exception);
         console.log(exception); // Files: errorhandling not part of lconn.core
      }
   }
}

/**
 * @qNameArray can be null, prefixes can also be declared in the XMLDocument
 *             root element
 */
lconn.core.xpath.selectSingleNode = function(XPathExpression, XMLDocument,/*
                                                                            * Array<{prefix:
                                                                            * "tns",
                                                                            * nameSpaceURI:
                                                                            * "http://ibm.com/namespace"}>
                                                                            */
      qNameArray, ContextNode) {
   var xpathResult = lconn.core.xpath.selectNodes(XPathExpression, XMLDocument,
         qNameArray, ContextNode);

   if (xpathResult == null || xpathResult.length == 0)
      return null;
   return xpathResult[0];
}
/**
 * @qNameArray can be null, prefixes can also be declared in the XMLDocument
 *             root element
 */
lconn.core.xpath.selectText = function(XPathExpression, XMLDocument,/*
                                                                      * Array<{prefix:
                                                                      * "tns",
                                                                      * nameSpaceURI:
                                                                      * "http://ibm.com/namespace"}>
                                                                      */
      qNameArray, ContextNode) {
   var xpathResult = lconn.core.xpath.selectSingleNode(XPathExpression,
         XMLDocument, qNameArray, ContextNode);
   if (xpathResult == null)
      return null;
   return xpathResult.nodeValue;
}
/**
 * Prefixes can also be declared in the XMLDocument root element
 * 
 * @param {String}
 *           XPathExpression
 * @param {XMLDocument}
 *           XMLDocument
 * @param {String}
 *           newValue
 * @param {Array}
 *           qNameArray can be null
 * @param {Node}
 *           ContextNode
 */
lconn.core.xpath.setNodeValue = function(XPathExpression, XMLDocument, newValue, qNameArray, ContextNode) {
   var xpathResult = lconn.core.xpath.selectSingleNode(XPathExpression, XMLDocument, qNameArray, ContextNode);
   if (xpathResult != null) {
      if (xpathResult.nodeType == 1) { // element node
         if (xpathResult.hasChildNodes()) {
            var firstChild = xpathResult.firstChild;
            xpathResult.replaceChild(XMLDocument.createTextNode(newValue),
                  firstChild);
         }
         else
            xpathResult.appendChild(XMLDocument.createTextNode(newValue));
      }
      else if (xpathResult.nodeType == 2) // attribute node
         xpathResult.nodeValue = newValue;
      else if (xpathResult.nodeType == 3) // text node
         xpathResult.nodeValue = newValue;
      else
         console.log("lconn.core.xpath.setNodeValue: nodeType: " + xpathResult.nodeType);
   }
   else {
      // checking if its an attribute that doesn't exist, if it doesn't, get the
      // parent element and setAttribute
      var lastslash = XPathExpression.lastIndexOf("/");
      if (lastslash != -1) {
         var attrName = XPathExpression.substring(lastslash + 2);
         var expr = XPathExpression.substring(lastslash + 1);
         if (expr.indexOf("@") == 0) {
            var newExpr = XPathExpression.substring(0, lastslash);
            var newelement = lconn.core.xpath.selectSingleNode(newExpr, XMLDocument, qNameArray, ContextNode);
            if (newelement == null) {
               console.log("lconn.core.xpath.setNodeValue: couldn't find parent node for: " + newExpr + " orig " + XPathExpression);
               return;
            }
            // console.log(attrName + " " + newValue + " " + newelement);
            newelement.setAttribute(attrName, newValue);
            return;
         }
      }
      console.log("lconn.core.xpath.setNodeValue: couldn't find node for: " + XPathExpression);
   }
}

lconn.core.xpath.isIE11 = function() {
	if(!dojo.isIE && !dojo.isFF ) {
		return !!navigator.userAgent.match(/Trident\/7\.0/);
	}
	return false;
}

lconn.core.xpath.loadDOMIE11 = function(xmlStr) {
    try { 
		var dom = new ActiveXObject("MSXML2.DOMDocument.6.0"); 
        dom.async = false;
		dom.loadXML(xmlStr);
		return dom;
    } 
    catch (e) { 
        if (djConfig.isDebug) {
            console.debug("Error during loading xml into MSXML2.DOMDocument.6.0: " + e);
        }
    }
}

})();
