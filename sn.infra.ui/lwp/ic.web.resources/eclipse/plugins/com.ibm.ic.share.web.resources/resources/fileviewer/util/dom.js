/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/request",
  "dojo/Deferred",
  "dojo/Stateful",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/query",
  "dojox/xml/parser",
  "dojo/date/stamp",
  "dojo/has",
  "dojo/sniff"
], function (declare, request, Deferred, Stateful, lang, array, query, parser, stamp, has, sniff) {
  "use strict";
  
  return {
    NS: {
      TD: {LONG: "urn:ibm.com/td", SHORT: "td"},
      SNX: {LONG: "http://www.ibm.com/xmlns/prod/sn", SHORT: "snx"},
      OPENSEARCH: {LONG: "http://a9.com/-/spec/opensearch/1.1/", SHORT: "opensearch"},
      ATOM: {LONG: "http://www.w3.org/2005/Atom", SHORT: "atom"},
      REPORT: {LONG: "http://www.ibm.com/xmlns/prod/sn/reports", SHORT: "reports"},
      STATUS: {LONG: "http://www.ibm.com/xmlns/prod/sn/flags", SHORT: "flags"}
    },
    
    getLinkAttrByRel: function (xml, rel, attr) {
      var links = array.filter(xml.getElementsByTagName("link"), function (link) {
        return link.getAttribute("rel") === rel;
      });
  
      return links[0] ? links[0].getAttribute(attr) : "";
    },
  
    getChildText: function (xml, tagName, parent) {
      return this.getChildTextNS(xml, tagName, undefined, parent);
    },
  
    getChildTextNS: function (xml, tagName, namespace, parent) {
      var node = this.getFirstTag(xml, tagName, namespace, parent);
  
      if (node) {
        return parser.textContent(node);
      }
    },
  
    getChildAttrNS: function (xml, tagName, namespace, attribute, parent) {
      var node = this.getFirstTag(xml, tagName, namespace, parent);

      if (node) {
        return node.getAttribute(attribute);
      }
    },
  
    getChildDate: function (xml, tagName, namespace, parent) {
      return stamp.fromISOString(this.getChildTextNS(xml, tagName, namespace || this.NS.TD, parent));
    },
  
    getUser: function (xml, tagName, namespace, parent) {
      var userTag = this.getFirstTag(xml, tagName, namespace, parent);
  
      if (!userTag) {
        return {};
      }
  
      return this._createUser(xml, userTag);
    },
    
    getAllUsers: function (xml, tagName, namespace, parent) {
      var userTags = this.getAllTags(xml, tagName, namespace, parent);
  
      if (!userTags) {
        return {};
      }
  
      return array.map(userTags, function (userTag) {
        return this._createUser(xml, userTag);
      }, this);
    },
  
    getFirstTag: function (xml, tagName, namespace, parent) {
      return this.getAllTags(xml, tagName, namespace, parent)[0];
    },
    
    getAllTags: function (xml, tagName, namespace, parent) {
      if (!parent) {
        parent = xml;
      }
  
      if (namespace) {
        return (has("ie")) ? 
          parent.getElementsByTagName(getNSPrefix(xml, namespace) + tagName) : 
          parent.getElementsByTagNameNS(namespace.LONG, tagName);
      }
  
      return parent.getElementsByTagName(tagName);
    },
    
    _createUser: function (xml, userTag) {
      return {
        name: this.getChildText(xml, "name", userTag),
        id: this.getChildTextNS(xml, "userid", this.NS.SNX, userTag),
        email: this.getChildText(xml, "email", userTag),
        userState: this.getChildTextNS(xml, "userState", this.NS.SNX, userTag)
      };
    },
    
    newXmlDocument: function (rootTagName, namespace, namespaces) {
      if (!rootTagName) rootTagName = "";
      var namespaceURL = "",
        doc, prefix, tagname, p, text, i;
      if (namespace) {
        if (namespace.LONG)
          namespaceURL = namespace.LONG;
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
          else 
            prefix = null;
            // Create the root element (with optional namespace) as a
            // string of text
            text = "<" + (prefix?(prefix+":"):"") +  tagname +
              (namespaceURL ? (" xmlns" + (prefix?(":"+prefix):"") + '="' + namespaceURL +'"') : "");
            if (namespaces)
              for (i = 0; i < namespaces.length; i++) {
                text += " xmlns:"+namespaces[i].SHORT+"=\""+namespaces[i].LONG+"\"";
              }
            text += "/>";
            // And parse that text into the empty document
            doc.loadXML(text);
          }
          return doc;
       }
    },
    
    serializeXMLDocument: function(doc) {
      var xmlString;
      
      if (doc.xml) {
        xmlString = doc.xml;
      } else {
        xmlString = new XMLSerializer().serializeToString(doc);
      }
      
      return xmlString;
    },
    
    createElementNS: function (doc, elementName, elementNamespace) {
      if (!elementNamespace)
        return doc.createElement(elementName);
      var element = (dojo.isIE) ?
        doc.createElement(elementNamespace.SHORT+":"+elementName) :
        doc.createElementNS(elementNamespace.LONG, elementName);
      return element;
    }, 
    
    getChildTextNSScheme: function(xml, tagname, namespace, scheme, parent) {
      if(!parent) {
        parent = xml;
      }
      
      var elements = this.getAllTags(xml, tagname, namespace, parent);
      var url = namespace.LONG + '/' + scheme;
      var parsedValue = "";
      array.forEach(elements, function(element){
        if (element.getAttribute("scheme") === url) {
          parsedValue = parser.textContent(element);
        }
      });
      return parsedValue;
    },
    
    getChildAttributeNSScheme: function (xml, tagname, namespace, attribute){
      var elements = this.getAllTags(xml, tagname);
      var url = namespace.LONG;
      var parsedValue = "";
      array.forEach(elements, function(element){
        if (element.getAttribute("scheme") === url) {
          parsedValue = element.getAttribute(attribute);
        }
      });
      return parsedValue;
    },
    
    getChildAttributeMatching: function (xml, tagname, attrTest, attrValue, attrReturn) {
      var elements = this.getAllTags(xml, tagname);
      
      var parsedValue = null;
      array.some(elements, function (element) {
        if (element.getAttribute(attrTest) === attrValue) {
          parsedValue = element.getAttribute(attrReturn);
          return true;
        }
      });
      return parsedValue; 
    }
  };
  
  function getNSPrefix(el, namspace) {
    for(var nsNode=el, defaultNS=null; nsNode && !defaultNS && nsNode.nodeType == 1; nsNode = nsNode.parentNode) {
      defaultNS = nsNode.getAttribute("xmlns");
    }
    var prefix = (defaultNS == namspace.LONG) ? "" : (namspace.SHORT + ":");
    return prefix;
  }
});