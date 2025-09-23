/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.util.dom");
dojo.require("lconn.share.util._dom");

var dom = lconn.share.util.dom;
var n1 = dom.NAMESPACES;
n1.XML = {LONG: "http://www.w3.org/XML/1998/namespace", SHORT: "xml"};
n1.DOCUMENTS_ATOM_BATCH = {LONG: "urn:ibm.com/td/batch", SHORT: "batch"};
n1.OPENSEARCH = {LONG: "http://a9.com/-/spec/opensearch/1.1/",SHORT: "opensearch"};
n1.THREAD_ATOM = {LONG: "http://purl.org/syndication/thread/1.0",SHORT: "thr"};
n1.CA = {LONG: "http://www.ibm.com/xmlns/prod/composite-applications/v1.0",SHORT: "ca"};
n1.SNX = {LONG: "http://www.ibm.com/xmlns/prod/sn",SHORT: "snx"};

dom.SELECTION_NAMESPACES = [];
for (var key in n1) {
   var value = n1[key];
   dom[key+"_NAMESPACE"] = value;
   dom.NAMESPACE_PREFIX[value.SHORT] = value.LONG;
   dom.SELECTION_NAMESPACES.push("xmlns:" + value.SHORT + "='"+value.LONG+"'");
}
dom.SELECTION_NAMESPACES = dom.SELECTION_NAMESPACES.join(" ");

dom.xpathNSResolver = function(ns) {
   return dom.NAMESPACE_PREFIX[ns];
}
dom.xpathNumber = function(node, expression) {
   if (!node)
      return NaN;
   return this.xpath(node, expression, "number");
}
dom.xpathString = function(node, expression) {
   if (!node)
      return "";
   return this.xpath(node, expression, "string");
}
dom.xpathNode = function(node, expression) {
   if (!node)
      return null;
   return this.xpath(node, expression, "node");
}
dom.xpathNodes = function(node, expression) {
   if (!node)
      return [];
   return this.xpath(node, expression, "nodes");
}
dom.xpath = function(node, expression, returnType) {
   if (!node)
      return null;
   var retval = null;
   if(dojo.isIE) {
      switch(returnType) {
         case 'number':
         case 'string':
            var result = node.selectNodes(expression);
            if (result.length == 1 && result[0].text) 
               retval = result[0].text;
            else {
               var a = [], c = null;
               for (var i=0; c=result[i]; i++)
                  if (c.nodeType == 3)
                     a.push(c.nodeValue);
               retval = a.join("");
            }
            
            if(returnType == "number")
               retval = parseInt(retval);

            break;
         case 'node':
            var nodes = node.selectNodes(expression);
            retval = nodes ? nodes[0] : null;
            break;
         default:
            retval = node.selectNodes(expression);
            break;
      }
   }
   else {
      switch(returnType) {
         case 'number':
            retval = node.ownerDocument.evaluate(expression, node, dom.xpathNSResolver, XPathResult.NUMBER_TYPE, null).numberValue;
            break;
         case 'string':
            retval = node.ownerDocument.evaluate(expression, node, dom.xpathNSResolver, XPathResult.STRING_TYPE, null).stringValue;
            break;
         case 'node':
            retval = node.ownerDocument.evaluate(expression, node, dom.xpathNSResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            break;
         case 'nodes':
            var result = node.ownerDocument.evaluate(expression, node, dom.xpathNSResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            retval = [];
            var tmp;
            while(tmp = result.iterateNext())
               retval.push(tmp);
            break;
         default:
            var result = node.ownerDocument.evaluate(expression, node, dom.xpathNSResolver, XPathResult.ANY_TYPE, null);
            retval = [];
            var tmp;
            while(tmp = result.iterateNext())
               retval.push(tmp);
            break;
      }
   }
   //console.log("Query: %s, Results: %o", expression, retval);
   return retval;
}

/** 
 * Prepends the XML declaration to the XML stream passed as parameter
 * @discussion This method overrides any existing XML preamble
 * @param xml The string containing an XML stream
 * @abstract
 */
dom.prependXmlProlog = function(xml) {
   // Works around a "feature" in Opera 9.6 which
   // adds the preamble when serializing the XML document
   if (/^\s*<\?xml\s/.test(xml))
      xml = xml.substring(xml.indexOf("?>") + 2);
   return dom.XML_DECLARATION + xml;
};

dom.serializeXMLDocument = function(doc, includeProlog) {
   var s;
   if (doc.xml)
      s = doc.xml;
   else
      s = new XMLSerializer().serializeToString(doc);
   
   if (!includeProlog) {
      if (/^\s*<\?xml\s/.test(s))
         s = s.substring(s.indexOf("?>") + 2);
   }
   else
      s = dom.prependXmlProlog(s);
   return s;
}

dom.newXMLDocument = function(rootTagName, namespace, namespaces) {
   if (!rootTagName) rootTagName = "";
   var namespaceURL = "";
   if (namespace) {
      if (namespace.LONG)
         namespaceURL = namespace.LONG
      else
         namespaceURL = namespace;
   }
  
   if (document.implementation && document.implementation.createDocument && !dojo.isIE) {
      // This is the W3C standard way to do it (http://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-2-Core-DOM-createDocument)
      return document.implementation.createDocument(namespaceURL, rootTagName, null);
   }
   else { 
      // This is the IE way to do it
      // Create an empty document as an ActiveX object
      // If there is no root element, this is all we have to do
      var doc = new ActiveXObject("MSXML2.DOMDocument");
      // If there is a root tag, initialize the document
      if (rootTagName) {
         // Look for a namespace prefix
         var prefix = "";
         var tagname = rootTagName;
         var p = rootTagName.indexOf(':');
         if (p != -1) {
           prefix = rootTagName.substring(0, p);
           tagname = rootTagName.substring(p+1);
         }
         // If we have a namespace, we must have a namespace prefix
         // If we don't have a namespace, we discard any prefix
         if (!prefix && namespace && namespace.SHORT)
            prefix = namespace.SHORT;
//         else if (!prefix && namespaceURL)
//            prefix = "xmlns"; // What Firefox uses
         else 
            prefix = null;
         // Create the root element (with optional namespace) as a
         // string of text
         var text = "<" + (prefix?(prefix+":"):"") +  tagname +
             (namespaceURL
              ?(" xmlns" + (prefix?(":"+prefix):"") + '="' + namespaceURL +'"')
              :"");
         if (namespaces)
            for (var i=0; i<namespaces.length; i++)
               text += " xmlns:"+namespaces[i].SHORT+"=\""+namespaces[i].LONG+"\"";
         text += "/>";
         // And parse that text into the empty document
         doc.loadXML(text);
      }
      return doc;
   }
}

dom.getElementByLanguage = function(nodes, language) {
   var c;
   var i;
   var languages = [language];
   while ((i = language.lastIndexOf("-")) != -1)
      languages.push(language = language.substring(0, i))
   if (dojo.indexOf(languages, "en-us") == -1)
      languages.push("en-us");
   if (dojo.indexOf(languages, "en") == -1)
      languages.push("en");
   if (dojo.indexOf(languages, "") == -1)
      languages.push("");

   for (var i=0; i < languages.length; i++) {
      for (var j=0; c=nodes[j]; j++) {
         var lang = (dojo.isIE) ? c.getAttribute(dom.XML_NAMESPACE.SHORT+":lang") : c.getAttributeNS(dom.XML_NAMESPACE.LONG,"lang");
         lang = lang ? lang : ""; // Normalize missing language attr to empty string
         if (lang == languages[i]) return c;
      }
   }
   return null;
}
dom.getAttributeNS = function(el, attrName, attrNamespace) {
   return (dojo.isIE) 
         ? el.getAttribute(attrNamespace.SHORT+":"+attrName) 
         : el.getAttributeNS(attrNamespace.LONG,attrName);
}

dom._getNSPrefix = function(el, elementNamespace) {
   for(var nsNode=el, defaultNS=null; nsNode && !defaultNS && nsNode.nodeType == 1; nsNode = nsNode.parentNode)
      defaultNS = nsNode.getAttribute("xmlns");
   var prefix = (defaultNS == elementNamespace.LONG) ? "" : (elementNamespace.SHORT + ":");
   return prefix;
}

dom.getElementsByTagNameNS = function(el, elementName, elementNamespace) {
   return (dojo.isIE)
      ? el.getElementsByTagName(this._getNSPrefix(el, elementNamespace) + elementName)
      : el.getElementsByTagNameNS(elementNamespace.LONG, elementName);
}
dom.createElementNS = function(d, elementName, elementNamespace) {
   var element = (dojo.isIE) 
         ? d.createElement(elementNamespace.SHORT+":"+elementName)
         : d.createElementNS(elementNamespace.LONG, elementName);
   return element;
}
dom.setAttributeNS = function(el, attributeName, attributeValue, attrNamespace) {
   if (dojo.isIE) 
      el.setAttribute(attrNamespace.SHORT+":"+attributeName, attributeValue);
   else
      el.setAttributeNS(attrNamespace.LONG, attrNamespace.SHORT+":"+attributeName, attributeValue);
}
dom.insertBefore = function(el, node, before) {
   if (before)
      el.insertBefore(node, before);
   else
      el.appendChild(node);
   return node;
}
dom.getChildElement = function(el, elementName) {
   var arr = el.childNodes;
   for (var i=0,c; c=arr[i]; i++)
      if (c.nodeName == elementName || c.localName == elementName)
         return c; 
}
dom.getChildElementNS = function(el, elementName, elementNamespace) {
   var qud = lconn.share.util.dom;
   var arr = (dojo.isIE) 
         ? el.getElementsByTagName(qud._getNSPrefix(el, elementNamespace)+elementName)
         : el.getElementsByTagNameNS(elementNamespace.LONG, elementName);
   for (var i=0,c; c=arr[i]; i++)
      if (c.parentNode == el)
         return c; 
}
dom.getChildElementTextContent = function(el, elementName) {
   if (!el)
      return null;
   var arr = el.getElementsByTagName(elementName);
   var qud = lconn.share.util.dom;
   for (var i=0,c; c=arr[i]; i++)
      if (c.parentNode == el)
         return qud.getTextContent(c); 
   return null;
};
dom.getChildElementTextContentNS = function(el, elementName, elementNamespace) {
   var qud = lconn.share.util.dom;
   return qud.getTextContent(qud.getChildElementNS(el, elementName, elementNamespace));
};
dom.getTextContent = function(el) {
   if (!el)
      return null;
   if (el.textContent) 
      return el.textContent;
   if (el.innerText) 
      return el.innerText;
   if (el.text)
      return el.text;
   var a = [];
   for (var j=0; c2=el.childNodes[j]; j++)
      if (c2.nodeType == 3)
         a.push(c2.nodeValue);
   return a.join("");
};
dom.getChildElementAttribute = function(entry, elementName, attr) {
   if (!entry)
      return null;
   if (attr == "class" && dojo.isIE) attr = "className";
   var arr = entry.getElementsByTagName(elementName);
   for (var i=0,c;c=arr[i]; i++)
      if (c.parentNode == entry)
         return c.getAttribute(attr);
   return null;
};
dom.getChildElementAttributeNS = function(entry, elementName, elementNamespace, attr, attrNamespace) {
   if (!entry)
      return null;
   var c;
   if (dojo.isIE) {
      if (attr == "class") attr = "className";
      for (var i=0; c=entry.childNodes[i]; i++) {
         var localName = c.localName;
         if(!localName)
            localName = c.baseName;
         if (localName == elementName && (elementNamespace == null || c.namespaceURI == elementNamespace.LONG))
            return c.getAttribute(attrNamespace.SHORT+":"+attr);
      }
   }
   else {
      if (elementNamespace) {
         var arr = entry.getElementsByTagNameNS(elementNamespace.LONG,elementName);
         for (var i=0,c;c=arr[i]; i++)
            if (c.parentNode == entry)
               return c.getAttributeNS(attrNamespace.LONG, attr);
      }
      else {
         var arr = entry.getElementsByTagName(elementName);
         for (var i=0,c;c=arr[i]; i++)
            if (c.parentNode == entry)
               return c.getAttributeNS(attrNamespace.LONG, attr);
      }
   }
   return null;
};
dom.getChildElementAttributeMatching = function(entry, elementName, attrTest, attributeValue, attrRet) {
   if (!entry)
      return null;
   if (attrTest == "class" && dojo.isIE) attrTest = "className";
   if (attrRet == "class" && document.all) attrRet = "className";
   var arr = entry.getElementsByTagName(elementName);
   for (var i=0; child=arr[i]; i++)
      if (child.getAttribute(attrTest) == attributeValue)
         return child.getAttribute(attrRet);
   return null;
};
dom.getChildElementAttributeMatchingNS = function(entry, elementName, elementNamespace, attrTest, attrTestNamespace, attributeValue, attrRet, attrRetNamespace) {
   if (!entry)
      return null;
   if (attrTest == "class" && dojo.isIE) attrTest = "className";
   if (attrRet == "class" && document.all) attrRet = "className";
   if (dojo.isIE) {
      var localName = elementNamespace ? this._getNSPrefix(entry,elementNamespace)+elementName : elementName;
      var localAttrName = attrTestNamespace ? attrTestNamespace.SHORT+":"+attrTest : attrTest;
      var localAttrRetName = attrRetNamespace ? attrRetNamespace.SHORT+":"+attrRet : attrRet;
      var arr = entry.getElementsByTagName(localName);
      for (var i=0; c=arr[i]; i++)
         if (c.getAttribute(localAttrName) == attributeValue)
            return c.getAttribute(localAttrRetName);
   }
   else {
      if (elementNamespace) {
         var arr = entry.getElementsByTagNameNS(elementNamespace.LONG,elementName);
         if (attrTestNamespace) {
            for (var i=0,c; c=arr[i]; i++)
               if (c.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                  return attrRetNamespace ? c.getAttributeNS(attrRetNamespace.LONG, attrRet) : c.getAttribute(attrRet);
         }
         else {
            for (var i=0,c; c=arr[i]; i++)
               if (c.getAttribute(attrTest) == attributeValue)
                  return attrRetNamespace ? c.getAttributeNS(attrRetNamespace.LONG, attrRet) : c.getAttribute(attrRet);
         }
      }
      else {
         var arr = entry.getElementsByTagName(elementName);
         if (attrTestNamespace) {
            for (var i=0; child=arr[i]; i++)
               if (child.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                  return attrRetNamespace ? c.getAttributeNS(attrRetNamespace.LONG, attrRet) : c.getAttribute(attrRet);
         }
         else {
            for (var i=0; child=arr[i]; i++)
               if (child.getAttribute(attrTest) == attributeValue)
                  return attrRetNamespace ? c.getAttributeNS(attrRetNamespace.LONG, attrRet) : c.getAttribute(attrRet);
         }
      }
   }
   return null;
};
dom.getChildElementMatchingAttribute = function(entry, elementName, attrTest, attributeValue) {
   if (!entry)
      return null;
   if (attrTest == "class" && dojo.isIE) attrTest = "className";
   var arr = entry.getElementsByTagName(elementName);
   for (var i=0; child=arr[i]; i++)
      if (child.getAttribute(attrTest) == attributeValue)
         return child;
   /*for (var i=0; i<entry.childNodes.length; i++)
      if (entry.childNodes[i].nodeName == elementName && entry.childNodes[i].getAttribute(attrTest) == attributeValue)
         return entry.childNodes[i];*/
   return null;
};
dom.getChildElementMatchingAttributeNS = function(entry, elementName, elementNamespace, attrTest, attrTestNamespace, attributeValue) {
   if (!entry)
      return null;
   if (attrTest == "class" && dojo.isIE) attrTest = "className";
   if (dojo.isIE) {
      var localName = elementNamespace ? this._getNSPrefix(entry,elementNamespace)+elementName : elementName;
      var localAttrName = attrTestNamespace ? attrTestNamespace.SHORT+":"+attrTest : attrTest;
      var arr = entry.getElementsByTagName(localName);
      for (var i=0; c=arr[i]; i++)
         if (c.getAttribute(localAttrName) == attributeValue)
            return c;
   }
   else {
      if (elementNamespace) {
         var arr = entry.getElementsByTagNameNS(elementNamespace.LONG,elementName);
         if (attrTestNamespace) {
            for (var i=0,c; c=arr[i]; i++)
               if (c.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                  return c;
         }
         else {
            for (var i=0,c; c=arr[i]; i++)
               if (c.getAttribute(attrTest) == attributeValue)
                  return c;
         }
      }
      else {
         var arr = entry.getElementsByTagName(elementName);
         if (attrTestNamespace) {
            for (var i=0; child=arr[i]; i++)
               if (child.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                  return c;
         }
         else {
            for (var i=0; child=arr[i]; i++)
               if (child.getAttribute(attrTest) == attributeValue)
                  return c;
         }
      }
   }
   return null;
};
dom.getChildElementMatchingAttributeTextContent = function(entry, elementName, attrTest, attributeValue) {
   if (!entry)
      return null;
   if (attrTest == "class" && dojo.isIE) attrTest = "className";
   var arr = entry.getElementsByTagName(elementName);
   for (var i=0; child=arr[i]; i++)
      if (child.getAttribute(attrTest) == attributeValue)
         return dom.xmlText(child);
   /*for (var i=0; i<entry.childNodes.length; i++)
      if (entry.childNodes[i].nodeName == elementName && entry.childNodes[i].getAttribute(attrTest) == attributeValue)
         return dom.xmlText(entry.childNodes[i]);*/
   return null;
};
dom.getChildElementMatchingAttributeTextContentNS = function(entry, elementName, elementNamespace, attrTest, attrTestNamespace, attributeValue) {
   if (!entry)
      return null;
   var child;
   if (dojo.isIE) {
      if (attrTest == "class") attrTest = "className";
      var testName = elementNamespace == null ? elementName : elementNamespace.SHORT+":"+elementName;
      var testAttr = attrTestNamespace == null ? attrTest : attrTestNamespace.SHORT+":"+attrTest;
      var arr = entry.getElementsByTagName(testName);
      for (var i=0; child=arr[i]; i++)
         if (child.parentNode == entry && child.getAttribute(testAttr) == attributeValue)
            return dom.xmlText(child);      
   }
   else {
      if (elementNamespace) {
         var arr = entry.getElementsByTagNameNS(elementNamespace.LONG,elementName);
         if (attrTestNamespace) {
            for (var i=0; child=arr[i]; i++)
               if (child.parentNode == entry && child.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                  return dom.xmlText(child);      
         }
         else {
            for (var i=0; child=arr[i]; i++)
               if (child.parentNode == entry && child.getAttribute(attrTest) == attributeValue)
                  return dom.xmlText(child);      
         }
      }
      else {
         var arr = entry.getElementsByTagName(elementName);
         if (attrTestNamespace) {
            for (var i=0; child=arr[i]; i++)
               if (child.parentNode == entry && child.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                  return dom.xmlText(child);      
         }
         else {
            for (var i=0; child=arr[i]; i++)
               if (child.parentNode == entry && child.getAttribute(attrTest) == attributeValue)
                  return dom.xmlText(child);      
         }
      }
   }
   return null;
};
dom.domNodesToXml = function (nodelist) {
   var doc;
   var docElement;
   if (nodelist && nodelist.length > 0) {
      if (nodelist.length > 1)
      {
         doc = dom.newXMLDocument("div");
         docElement = doc.documentElement;
      }
      for (var i = 0; i < nodelist.length; i++) {
         var child = nodelist.item(i);
         doc = dom.domToXml(child, docElement, doc);   
      }
   }
   else
   {
      doc = dom.newXMLDocument("div");
   }
   var xmlString = dom.XML_DECLARATION_WITH_ENTITIES + dom.serializeXMLDocument(doc);
   return xmlString;
};
dom.domToXml = function (node, element, doc) { 
   if (node.nodeType == 3) // if this is a text node
   { 
      if (!element)
      {
        doc = dom.newXMLDocument("div");
        element = doc.documentElement;
      }
      element.appendChild(doc.createTextNode(node.nodeValue));
      return doc;
   }
   var nextElement;
   var nodeName = node.nodeName.toLowerCase();   
   if (!doc)
   {
      doc = dom.newXMLDocument(nodeName);
      nextElement = doc.documentElement;
   }
   else
   {
      nextElement = doc.createElement(nodeName);
      element.appendChild(nextElement);
   }
   var attrs = node.attributes;
   if (attrs && attrs.length > 0) 
   {
      var isA = nodeName == 'a';
      var isImg = nodeName == 'img';
      for (var i = 0; i < attrs.length; i++) {
         var attr = attrs.item(i);
		 if (attr.specified )
         {
         /*
            if (isA && dojo.isIE)
            {  
		       if (attr.name == "href")
               {
                  nextElement.setAttribute(attr.name, attr.value);
               }
            }
            else
            {*/
            if ((isImg && attr.name == 'src') || (isA && attr.name == 'href'))
            {
               var value = node.getAttribute("_fcksavedurl");
               nextElement.setAttribute(attr.name, value);
            }
            else
            {
               nextElement.setAttribute(attr.name, attr.value);
            }
            //}
         }

      }
   }
   var children = node.childNodes;
   if (children && children.length > 0) 
   {
      for (var i = 0; i < children.length; i++) 
      { 
         var child = children.item(i);
         dom.domToXml(child, nextElement, doc);
      }
   }
   return doc;
};
