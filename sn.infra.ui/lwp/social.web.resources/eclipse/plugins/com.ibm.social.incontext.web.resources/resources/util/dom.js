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

dojo.provide("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.incontext.util._dom");

(function () {
   var dom = com.ibm.social.incontext.util.dom,
      n1 = dom.NAMESPACES,
      key, value;
   n1.XML = {LONG: "http://www.w3.org/XML/1998/namespace", SHORT: "xml"};
   n1.DOCUMENTS_ATOM_BATCH = {LONG: "urn:ibm.com/td/batch", SHORT: "batch"};
   n1.OPENSEARCH = {LONG: "http://a9.com/-/spec/opensearch/1.1/",SHORT: "opensearch"};
   n1.THREAD_ATOM = {LONG: "http://purl.org/syndication/thread/1.0",SHORT: "thr"};
   n1.CA = {LONG: "http://www.ibm.com/xmlns/prod/composite-applications/v1.0",SHORT: "ca"};
   n1.SNX = {LONG: "http://www.ibm.com/xmlns/prod/sn",SHORT: "snx"};
   n1.XRD = {LONG: "xri://$XRD*($v*2.0)", SHORT: "xrd"};
   n1.ATOM = {LONG: "http://www.w3.org/2005/Atom", SHORT: "atom" };
   n1.APP = {LONG: "http://www.w3.org/2007/app", SHORT: "app"};
   n1.CMIS = {LONG: "http://docs.oasis-open.org/ns/cmis/core/200908/", SHORT: "cmis"};
   n1.CMISM = {LONG: "http://docs.oasis-open.org/ns/cmis/messaging/200908/" , SHORT: "cmism"};
   n1.CMISRA = {LONG: "http://docs.oasis-open.org/ns/cmis/restatom/200908/" , SHORT: "cmisra"};
   n1.LCMIS = {LONG: "http://www.ibm.com/xmlns/prod/sn/cmis", SHORT: "lcmis"};   
   
   dom.SELECTION_NAMESPACES = [];
   if(n1) {
      for (key in n1) {
         value = n1[key];
         dom[key+"_NAMESPACE"] = value;
         dom.NAMESPACE_PREFIX[value.SHORT] = value.LONG;
         dom.SELECTION_NAMESPACES.push("xmlns:" + value.SHORT + "='"+value.LONG+"'");
      }
   }
   dom.SELECTION_NAMESPACES = dom.SELECTION_NAMESPACES.join(" ");

   dom.xpathNSResolver = function(ns) {
      return dom.NAMESPACE_PREFIX[ns];
   };
   dom.xpathNumber = function(node, expression) {
      if (!node)
         return NaN;
      return this.xpath(node, expression, "number");
   };
   dom.xpathString = function(node, expression) {
      if (!node)
         return "";
      return this.xpath(node, expression, "string");
   };
   dom.xpathNode = function(node, expression) {
      if (!node)
         return null;
      return this.xpath(node, expression, "node");
   };
   dom.xpathNodes = function(node, expression) {
      if (!node)
         return [];
      return this.xpath(node, expression, "nodes");
   };
   dom.xpath = function(node, expression, returnType) {
      if (!node)
         return null;
      var retval = null,
         result, a, c, i, nodes, tmp;
      if(dojo.isIE) {
         switch(returnType) {
            case 'number':
            case 'string':
               result = node.selectNodes(expression);
               if (result.length == 1 && result[0].text) 
                  retval = result[0].text;
               else {
                  a = [], c = null;
                  for (i = 0; c = result[i]; i++)
                     if (c.nodeType == 3)
                        a.push(c.nodeValue);
                  retval = a.join("");
               }
               
               if(returnType == "number")
                  retval = parseInt(retval);

               break;
            case 'node':
               nodes = node.selectNodes(expression);
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
               result = node.ownerDocument.evaluate(expression, node, dom.xpathNSResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
               retval = [];
               while(tmp = result.iterateNext())
                  retval.push(tmp);
               break;
            default:
               result = node.ownerDocument.evaluate(expression, node, dom.xpathNSResolver, XPathResult.ANY_TYPE, null);
               retval = [];
               while(tmp = result.iterateNext())
                  retval.push(tmp);
               break;
         }
      }
      //console.log("Query: %s, Results: %o", expression, retval);
      return retval;
   }

   /**
    * @abstract Prepends the XML declaration to the XML stream passed as parameter
    * @discussion This method overrides any existing XML preamble
    * @param xml The string containing an XML stream
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
      var namespaceURL = "",
         doc, prefix, tagname, p, text, i;
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
         doc = new ActiveXObject("MSXML2.DOMDocument");
         // If there is a root tag, initialize the document
         if (rootTagName) {
            // Look for a namespace prefix
            prefix = "";
            tagname = rootTagName;
            p = rootTagName.indexOf(':');
            if (p != -1) {
              prefix = rootTagName.substring(0, p);
              tagname = rootTagName.substring(p+1);
            }
            // If we have a namespace, we must have a namespace prefix
            // If we don't have a namespace, we discard any prefix
            if (!prefix && namespace && namespace.SHORT)
               prefix = namespace.SHORT;
//            else if (!prefix && namespaceURL)
//               prefix = "xmlns"; // What Firefox uses
            else 
               prefix = null;
            // Create the root element (with optional namespace) as a
            // string of text
            text = "<" + (prefix?(prefix+":"):"") +  tagname +
                (namespaceURL
                 ?(" xmlns" + (prefix?(":"+prefix):"") + '="' + namespaceURL +'"')
                 :"");
            if (namespaces)
               for (i = 0; i < namespaces.length; i++)
                  text += " xmlns:"+namespaces[i].SHORT+"=\""+namespaces[i].LONG+"\"";
            text += "/>";
            // And parse that text into the empty document
            doc.loadXML(text);
         }
         return doc;
      }
   }

   dom.xmlDocumentFromString = function(str) {
      if (!str)
         return dom.newXMLDocument(); //return an empty xml doc
      var doc, url, request;
      if (typeof DOMParser != "undefined") {
          // Mozilla, Firefox, and related browsers
          return (new DOMParser()).parseFromString(str, "application/xml");
      }
      else if (typeof ActiveXObject != "undefined") {
          // IE
          doc = new ActiveXObject("MSXML2.DOMDocument");   // Create an empty document
          doc.loadXML(str);              //  Parse text into it
          return doc;                     // Return it
      }
      else {
          // Safari
          url = "data:text/xml;charset=utf-8," + encodeURIComponent(str);
          request = new XMLHttpRequest();
          request.open("GET", url, false);
          request.send(null);
          return request.responseXML;
      }
   }

   dom.getElementByLanguage = function(nodes, language) {
      var c, i, j, lang, 
      languages = [language];
      while ((i = language.lastIndexOf("-")) != -1)
         languages.push(language = language.substring(0, i))
      if (dojo.indexOf(languages, "en-us") == -1)
         languages.push("en-us");
      if (dojo.indexOf(languages, "en") == -1)
         languages.push("en");
      if (dojo.indexOf(languages, "") == -1)
         languages.push("");

      for (i = 0; i < languages.length; i++) {
         for (j = 0; c = nodes[j]; j++) {
            lang = (dojo.isIE) ? c.getAttribute(dom.XML_NAMESPACE.SHORT+":lang") : c.getAttributeNS(dom.XML_NAMESPACE.LONG,"lang");
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
      var nsNode, defaultNS;
      for(nsNode = el, defaultNS = null; nsNode && !defaultNS && nsNode.nodeType == 1; nsNode = nsNode.parentNode)
         defaultNS = nsNode.getAttribute("xmlns");
      return (defaultNS == elementNamespace.LONG) ? "" : (elementNamespace.SHORT + ":");
   }

   dom.getElementsByTagNameNS = function(el, elementName, elementNamespace) {
      return (dojo.isIE)
         ? el.getElementsByTagName(this._getNSPrefix(el, elementNamespace) + elementName)
         : el.getElementsByTagNameNS(elementNamespace.LONG, elementName);
   }
   dom.createElementNS = function(d, elementName, elementNamespace) {
      return (dojo.isIE) 
            ? d.createElement(elementNamespace.SHORT+":"+elementName)
            : d.createElementNS(elementNamespace.LONG, elementName);
   }
   dom.setAttributeNS = function(el, attributeName, attributeValue, attrNamespace) {
      (dojo.isIE)
       ? el.setAttribute(attrNamespace.SHORT+":"+attributeName, attributeValue)
       : el.setAttributeNS(attrNamespace.LONG, attrNamespace.SHORT+":"+attributeName, attributeValue);
   }
   dom.insertBefore = function(el, node, before) {
      (before)
        ? el.insertBefore(node, before)
        : el.appendChild(node);
      return node;
   }
   dom.getChildElement = function(el, elementName) {
      var arr = el.childNodes, i, c;
      for (i = 0; c = arr[i]; i++)
         if (c.nodeName == elementName || c.localName == elementName)
            return c; 
   }
   dom.getChildElementNS = function(el, elementName, elementNamespace) {
      var arr = (dojo.isIE) 
            ? el.getElementsByTagName(dom._getNSPrefix(el, elementNamespace)+elementName)
            : el.getElementsByTagNameNS(elementNamespace.LONG, elementName), i, c;
      for (i = 0; c = arr[i]; i++)
         if (c.parentNode == el)
            return c; 
   }
   dom.getChildElementTextContent = function(el, elementName) {
      if (!el)
         return null;
      var arr = el.getElementsByTagName(elementName), i, c;
      for (i = 0; c = arr[i]; i++)
         if (c.parentNode == el)
            return dom.getTextContent(c); 
      return null;
   };
   dom.getChildElementTextContentNS = function(el, elementName, elementNamespace) {
      return dom.getTextContent(dom.getChildElementNS(el, elementName, elementNamespace));
   };
   dom.getTextContent = function(el) {
      if (!el)
         return null;
      if (el.textContent) 
         return el.textContent;
      if (el.innerText) 
         return el.innerText;
      var a = [], j, c;
      for (j = 0; c = el.childNodes[j]; j++)
         if (c.nodeType == 4 || c.nodeType == 3)
            a.push(c.nodeValue);
      return a.join("");
   };
   dom.getChildElementAttribute = function(entry, elementName, attr) {
      if (!entry)
         return null;
      if (attr == "class" && dojo.isIE) attr = "className";
      var arr = entry.getElementsByTagName(elementName), i, c;
      for (i = 0;c = arr[i]; i++)
         if (c.parentNode == entry)
            return c.getAttribute(attr);
      return null;
   };
   dom.getChildElementNSAttribute = function(entry, elementName, elementNamespace, attr) {
      if (!entry || !attr)
         return null;
      if (!elementNamespace)
         return dom.getChildElementAttribute(entry,elementName,attr);
      if (dojo.isIE) {
         if (attr == "class") attr = "className";
      }
      var el = dom.getChildElementNS(entry, elementName, elementNamespace);
      if(el)
         return el.getAttribute(attr);
      return null;
   };
   dom.getChildElementAttributeNS = function(entry, elementName, elementNamespace, attr, attrNamespace) {
      if (!entry)
         return null;
      var c, i, arr;
      if (dojo.isIE) {
         if (attr == "class") attr = "className";
         for (i = 0; c = entry.childNodes[i]; i++)
            if (c.baseName == elementName && (elementNamespace == null || c.namespaceURI == elementNamespace.LONG))
               return c.getAttribute(attrNamespace.SHORT+":"+attr);
      }
      else {
         if (elementNamespace) {
            arr = entry.getElementsByTagNameNS(elementNamespace.LONG,elementName);
            for (i = 0; c = arr[i]; i++)
               if (c.parentNode == entry)
                  return c.getAttributeNS(attrNamespace.LONG, attr);
         }
         else {
            arr = entry.getElementsByTagName(elementName);
            for (i = 0; c = arr[i]; i++)
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
      var arr = entry.getElementsByTagName(elementName), i, child;
      for (i = 0; child = arr[i]; i++)
         if (child.getAttribute(attrTest) == attributeValue)
            return child.getAttribute(attrRet);
      return null;
   };
   dom.getChildElementAttributeMatchingNS = function(entry, elementName, elementNamespace, attrTest, attrTestNamespace, attributeValue, attrRet, attrRetNamespace) {
      var localName, localAttrName, localAttrRetName, arr, i, c;
      if (!entry)
         return null;
      if (attrTest == "class" && dojo.isIE) attrTest = "className";
      if (attrRet == "class" && document.all) attrRet = "className";
      if (dojo.isIE) {
         localName = elementNamespace ? this._getNSPrefix(entry,elementNamespace)+elementName : elementName;
         localAttrName = attrTestNamespace ? attrTestNamespace.SHORT+":"+attrTest : attrTest;
         localAttrRetName = attrRetNamespace ? attrRetNamespace.SHORT+":"+attrRet : attrRet;
         arr = entry.getElementsByTagName(localName);
         for (i = 0; c = arr[i]; i++)
            if (c.getAttribute(localAttrName) == attributeValue)
               return c.getAttribute(localAttrRetName);
      }
      else {
         if (elementNamespace) {
            arr = entry.getElementsByTagNameNS(elementNamespace.LONG,elementName);
            if (attrTestNamespace) {
               for (i = 0; c = arr[i]; i++)
                  if (c.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                     return attrRetNamespace ? c.getAttributeNS(attrRetNamespace.LONG, attrRet) : c.getAttribute(attrRet);
            }
            else {
               for (i = 0; c = arr[i]; i++)
                  if (c.getAttribute(attrTest) == attributeValue)
                     return attrRetNamespace ? c.getAttributeNS(attrRetNamespace.LONG, attrRet) : c.getAttribute(attrRet);
            }
         }
         else {
            arr = entry.getElementsByTagName(elementName);
            if (attrTestNamespace) {
               for (i = 0; child = arr[i]; i++)
                  if (child.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                     return attrRetNamespace ? c.getAttributeNS(attrRetNamespace.LONG, attrRet) : c.getAttribute(attrRet);
            }
            else {
               for (i = 0; child = arr[i]; i++)
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
      var arr = entry.getElementsByTagName(elementName), i;
      for (i = 0; child = arr[i]; i++)
         if (child.getAttribute(attrTest) == attributeValue)
            return child;
      /*for (i = 0; i <entry.childNodes.length; i++)
         if (entry.childNodes[i].nodeName == elementName && entry.childNodes[i].getAttribute(attrTest) == attributeValue)
            return entry.childNodes[i];*/
      return null;
   };
   dom.getChildElementMatchingAttributeNS = function(entry, elementName, elementNamespace, attrTest, attrTestNamespace, attributeValue) {
      if (!entry)
         return null;
      var localName, localAttrName, arr, i, c;
      if (attrTest == "class" && dojo.isIE) attrTest = "className";
      if (dojo.isIE) {
         localName = elementNamespace ? this._getNSPrefix(entry,elementNamespace)+elementName : elementName;
         localAttrName = attrTestNamespace ? attrTestNamespace.SHORT+":"+attrTest : attrTest;
         arr = entry.getElementsByTagName(localName);
         for (i = 0; c = arr[i]; i++)
            if (c.getAttribute(localAttrName) == attributeValue)
               return c;
      }
      else {
         if (elementNamespace) {
            arr = entry.getElementsByTagNameNS(elementNamespace.LONG,elementName);
            if (attrTestNamespace) {
               for (i = 0; c = arr[i]; i++)
                  if (c.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                     return c;
            }
            else {
               for (i = 0; c = arr[i]; i++)
                  if (c.getAttribute(attrTest) == attributeValue)
                     return c;
            }
         }
         else {
            arr = entry.getElementsByTagName(elementName);
            if (attrTestNamespace) {
               for (i = 0; child = arr[i]; i++)
                  if (child.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                     return c;
            }
            else {
               for (i = 0; child = arr[i]; i++)
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
      var arr, i, child;
      if (attrTest == "class" && dojo.isIE) attrTest = "className";
      arr = entry.getElementsByTagName(elementName);
      for (i = 0; child = arr[i]; i++)
         if (child.getAttribute(attrTest) == attributeValue)
            return dom.xmlText(child);
      /*for (i = 0; i < entry.childNodes.length; i++)
         if (entry.childNodes[i].nodeName == elementName && entry.childNodes[i].getAttribute(attrTest) == attributeValue)
            return dom.xmlText(entry.childNodes[i]);*/
      return null;
   };
   dom.getChildElementMatchingAttributeTextContentNS = function(entry, elementName, elementNamespace, attrTest, attrTestNamespace, attributeValue) {
      if (!entry)
         return null;
      var child, testName, testAttr, arr, i;
      if (dojo.isIE) {
         if (attrTest == "class") attrTest = "className";
         testName = elementNamespace == null ? elementName : elementNamespace.SHORT+":"+elementName;
         testAttr = attrTestNamespace == null ? attrTest : attrTestNamespace.SHORT+":"+attrTest;
         arr = entry.getElementsByTagName(testName);
         for (i = 0; child = arr[i]; i++)
            if (child.parentNode == entry && child.getAttribute(testAttr) == attributeValue)
               return dom.xmlText(child);      
      }
      else {
         if (elementNamespace) {
            arr = entry.getElementsByTagNameNS(elementNamespace.LONG,elementName);
            if (attrTestNamespace) {
               for (i = 0; child = arr[i]; i++)
                  if (child.parentNode == entry && child.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                     return dom.xmlText(child);      
            }
            else {
               for (i = 0; child = arr[i]; i++)
                  if (child.parentNode == entry && child.getAttribute(attrTest) == attributeValue)
                     return dom.xmlText(child);      
            }
         }
         else {
            arr = entry.getElementsByTagName(elementName);
            if (attrTestNamespace) {
               for (i = 0; child = arr[i]; i++)
                  if (child.parentNode == entry && child.getAttributeNS(attrTestNamespace.LONG, attrTest) == attributeValue)
                     return dom.xmlText(child);      
            }
            else {
               for (i = 0; child = arr[i]; i++)
                  if (child.parentNode == entry && child.getAttribute(attrTest) == attributeValue)
                     return dom.xmlText(child);      
            }
         }
      }
      return null;
   };
   dom.domNodesToXml = function (nodelist) {
      var doc, docElement, i, child;
      if (nodelist && nodelist.length > 0) {
         if (nodelist.length > 1)
         {
            doc = dom.newXMLDocument("div");
            docElement = doc.documentElement;
         }
         for (i = 0; i < nodelist.length; i++) {
            child = nodelist.item(i);
            doc = dom.domToXml(child, docElement, doc);   
         }
      }
      else
      {
         doc = dom.newXMLDocument("div");
      }
      return dom.XML_DECLARATION_WITH_ENTITIES + dom.serializeXMLDocument(doc);
   };
   dom.domToXml = function (node, element, doc) { 
      var nextElement, nodeName, attrs, isA, isImg, i, attr, value, children, child;
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
      nodeName = node.nodeName.toLowerCase();   
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
      attrs = node.attributes;
      if (attrs && attrs.length > 0) 
      {
         isA = nodeName == 'a';
         isImg = nodeName == 'img';
         for (i = 0; i < attrs.length; i++) {
            attr = attrs.item(i);
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
                  value = node.getAttribute("_fcksavedurl");
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
      children = node.childNodes;
      if (children && children.length > 0) 
      {
         for (i = 0; i < children.length; i++) 
         { 
            child = children.item(i);
            dom.domToXml(child, nextElement, doc);
         }
      }
      return doc;
   };

   //FIXME: Needs to be global to all JS
   /**
    * Call dojo.empty(loc) before calling this setTextNode method.
    */
   dom.setTextNode = function(d, loc, value) {
      if (loc.firstChild) {
         dojo.destroy(loc.firstChild);
      }
      loc.appendChild(d.createTextNode(value || ""));
   };

   dom.getChildElementsNS = function(el, elementName, elementNamespace) {
      var arr = (dojo.isIE) 
         ? el.getElementsByTagName(dom._getNSPrefix(el, elementNamespace)+elementName)
         : el.getElementsByTagNameNS(elementNamespace.LONG, elementName),
         elements = [], i, c;
      for (i = 0; c = arr[i]; i++)
         if (c.parentNode == el)
            elements.push(c); 
      return elements;
   };

   dom.getElementMatchingAttributeValueNS = function (entry, elementName, elementNamespace, attributeName, attributeNamespace, attributeValue) {
      var nodes = dom.getElementsByTagNameNS(entry, elementName, elementNamespace),
         attrName = attributeNamespace == null ? attributeName : attributeNamespace.SHORT+":"+attributeName, i;
      for(i = 0; i < nodes.length; i++) {
         if((nodes[i].nodeType == 1) && (nodes[i].getAttribute(attrName) == attributeValue))
            return nodes[i];
      }
      return null;
   };
})();

