/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/DeferredList",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/request"
], function (dojo, DeferredList, lang, windowModule, domConstruct, request) {

	(function () {
	var util = com.ibm.social.test.ee.util.serviceutil = {
	   getXml: function(url, func, auth) {
	      request(url, {method: "GET", handleAs: "xml", preventCache: true}).then(func, function (e, req) {
	         	if (req.xhr.status === 0) {
	         	   var forceLogin = dojo.cookie("_forceTestLogin");
	         	   if (forceLogin === "false") return;
	         		if (!util.isSecure() && lang.getObject("lconn.core.config.services.webresources")) {         			
				         var svcUrl = new dojo._Url(lconn.core.config.services.webresources.secureUrl);
				         var localUrl = new dojo._Url(""+window.location.href);
				         var localPath = localUrl.path.substring(svcUrl.path.length);
				         if (localUrl.query)
				            localPath += ("?" + localUrl.query);
				         window.location.href = lconn.core.config.services.webresources.secureUrl + localPath;
	               }
	         	}
	         	else {
	         	  console.log("AJAX error: ", e, " request ", req);
	         	}
	         });
	   },
	   getJson: function (url, func) {
		   request(url, {method: "GET", handleAs: "json", preventCache: true}).then(func, function(e, req) {
				  console.log("AJAX error ", e, " request ", req);
			  });
	   },
	   evalXPathString: function (doc, xpath, mapping) {
	   	var result = util.evalXPath(doc,xpath,mapping);
	   	var str = null;
	   	if (result.length) {
	   		str = result[0].nodeValue;
	   	}
	   	return str;
	   },
	      
	   evalXPath: function (doc, xpath, mapping) {
	   	var nodes = [];
	      try {
	         if (doc.evaluate) {
	            var nsResolver;
	            if (mapping) {
	            	var internalResolver = doc.createNSResolver( doc.ownerDocument == null ? doc.documentElement : doc.ownerDocument.documentElement);
	            	nsResolver = function (prefix) { return mapping[prefix] || internalResolver.lookupNamespaceURI(prefix); };
	            }
	            else {
	            	nsResolver = doc.createNSResolver( doc.ownerDocument == null ? doc.documentElement : doc.ownerDocument.documentElement);
	            }
	            var result = doc.evaluate(xpath, doc, nsResolver, XPathResult.ANY_TYPE, null);      
	            var node = result.iterateNext();
	            while (node) {
	               nodes.push(node);
	               node = result.iterateNext();
	            }
	         }
	         else {
	            var root = doc.documentElement;
	            var result;
	            if (mapping) {
	               var namespaces = "";
	               for (prefix in mapping) {
	                  if (namespaces.length) namespaces += " ";
	                  namespaces += ("xmlns:" + prefix + "='" + mapping[prefix] + "'");
	               }
	               doc.setProperty("SelectionNamespaces", namespaces);
	            }           
	            result = root.selectNodes(xpath);
	            for (var i = 0; i < result.length; i++)
	               nodes.push(result.item(i));            
	         }
	      }
	      catch (e) {
	         console.log("Exception evaluating xpath ", e);
	      }
	      return nodes;
	   },
	   applyXsl: function (xmlUrl, xslUrl, node) {
	   	   	var dfd1 = request(xmlUrl, {method: "GET", handleAs:"xml", preventCache: true});
	   	var dfd2 = request(xslUrl, {method: "GET", handleAs:"xml"});
	   	var dl = new DeferredList([dfd1, dfd2]);
	   	dl.addCallback(function (result) {
	   		var xml = result[0][0] ? result[0][1] : null;
	         var xsl = result[1][0] ? result[1][1] : null;
	         if (xml && xsl) {
				   var fragment;
			      if (window.ActiveXObject) {
			         fragment = xml.transformNode(xsl);
			      }
			      else if (windowModule.doc.implementation && windowModule.doc.implementation.createDocument) 
			      {
			         var xsltProcessor = new XSLTProcessor();
			         try {
			            xsltProcessor.importStylesheet(xsl);
			         } catch (e1) {
			         	console.log("There is a problem with the stylesheet ", e1);
			         }
			         fragment = xsltProcessor.transformToFragment(xml, windowModule.doc);
			      }
			      domConstruct.empty(node);
			      domConstruct.place(fragment, node);
	         }
	         else {
	         	domConstruct.empty(node);
	         	domConstruct.place("<b>Unable to retrieve xml/xsl</b>", node);
	         }
	   	});
	   	
	   },
	   isSecure: function () {
	   	var scheme = (window.location.protocol || "http").replace(':','');
	      return (scheme === "https");
	   }
	}
	})();
	return com.ibm.social.test.ee.util.serviceutil;
});
