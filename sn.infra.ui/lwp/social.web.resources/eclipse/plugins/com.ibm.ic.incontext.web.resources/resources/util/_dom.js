/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */
define([
	"dojo/has",
	"dojo/_base/lang"
], function (has, lang) {

	return lang.mixin(lang.getObject("com.ibm.social.incontext.util.dom", true), {
	
	   domModule = {
	      XML_DECLARATION: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
	      XML_DECLARATION_WITH_ENTITIES: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE html [<!ENTITY amp \"&#38;#38;\"><!ENTITY lt \"&#60;#60;\"><!ENTITY gt \"&#62;#62;\"><!ENTITY nbsp \"&#32;\"><!ENTITY apos \"&#39;\"><!ENTITY quot \"&#34;\">]>",
	      NAMESPACES: {
	         ATOM: {LONG: "http://www.w3.org/2005/Atom", SHORT: "atom"},
	         DOCUMENTS_ATOM: {LONG: "urn:ibm.com/td", SHORT: "td"},
	         APP: {LONG: "http://www.w3.org/2007/app", SHORT: "app"}, 
	         CMISRA: {LONG: "http://docs.oasis-open.org/ns/cmis/restatom/200908/", SHORT: "cmisra" },
	         CMISM: {LONG: "http://docs.oasis-open.org/ns/cmis/messaging/200908/", SHORT: "cmism" },
	         LCMIS: {LONG: "http://www.ibm.com/xmlns/prod/sn/cmis", SHORT: "lcmis" },
	         CMIS: {LONG: "http://docs.oasis-open.org/ns/cmis/core/200908/", SHORT: "cmis" }
	      },
	      NAMESPACE_PREFIX: {},
	
	      xmlText: function(node) {
	         return (node) ? (has("ie") ? (node.text ? node.text : (node.innerText ? node.innerText : node.textContent)) : node.textContent) : node;
	      },
	      isNamedNS: function(el, elementName, elementNamespace) {
	         if (has("ie")) {
	            if (elementNamespace)
	               return el.baseName == elementName && elementNamespace.LONG == el.namespaceURI;
	            return el.nodeName == elementName;
	         }
	         if (elementNamespace)
	            return el.localName == elementName && elementNamespace.LONG == el.namespaceURI;
	         return el.nodeName == elementName;
	      },
	      getChildElementTextContentNS: function(el, elementName, elementNamespace) {
	         if (!el)
	            return null;
	         var c;
	         var arr = el.childNodes;
	         if (has("ie")) {
	            for (var i=0; c=arr[i]; i++) {
	               if (c.baseName == elementName && (elementNamespace === null || c.namespaceURI == elementNamespace.LONG)) {
	                  if (c.innerText)
	                     return c.innerText;
	                  var a = [];
	                  for (var j=0, c2; c2=c.childNodes[j]; j++)
	                     if (c2.nodeType == 3)
	                        a.push(c2.nodeValue);
	                  return a.join("");
	               }
	            }
	         }
	         else {
	            var arr = el.getElementsByTagNameNS(elementNamespace.LONG, elementName);
	            for (var i=0,c;c=arr[i]; i++)
	               if (c.parentNode == el) {
	                  if (c.textContent)
	                     return c.textContent;
	                  var a = [];
	                  for (var j=0, c2; c2=c.childNodes[j]; j++)
	                     if (c2.nodeType == 3)
	                        a.push(c2.nodeValue);
	                  return a.join("");
	               }
	         }
	         return null;
	      }
	   };
	
	   var dom = domModule,
	      n1 = dom.NAMESPACES;
	   for (var key in n1) {
	      var value = n1[key];
	      dom[key+"_NAMESPACE"] = value;
	      dom.NAMESPACE_PREFIX[value.SHORT] = value.LONG;
	   }
	});
});
