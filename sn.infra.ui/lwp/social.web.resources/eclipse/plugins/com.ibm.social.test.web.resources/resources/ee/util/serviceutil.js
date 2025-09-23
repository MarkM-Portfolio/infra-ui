/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.test.ee.util.serviceutil");

(function () {
var util = com.ibm.social.test.ee.util.serviceutil = {
   getXml: function(url, func, auth) {
      dojo.xhrGet({ 
         url: url,
         handleAs: "xml",
         preventCache: true,
         load: func,
         error: function (e, req) {
         	if (req.xhr.status === 0) {
         	   var forceLogin = dojo.cookie("_forceTestLogin");
         	   if (forceLogin === "false") return;
         		if (!util.isSecure() && dojo.getObject("lconn.core.config.services.webresources")) {         			
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
         }
      });
   },
   getJson: function (url, func) {
	   dojo.xhrGet({
		  url: url,
		  handleAs: "json",
		  preventCache: true,
		  load: func,
		  error: function(e, req) {
			  console.log("AJAX error ", e, " request ", req);
		  }
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
   	dojo.require("dojo.DeferredList");
   	var dfd1 = dojo.xhrGet({url:xmlUrl,handleAs:"xml",preventCache: true});
   	var dfd2 = dojo.xhrGet({url:xslUrl,handleAs:"xml"});
   	var dl = new dojo.DeferredList([dfd1, dfd2]);
   	dl.addCallback(function (result) {
   		var xml = result[0][0] ? result[0][1] : null;
         var xsl = result[1][0] ? result[1][1] : null;
         if (xml && xsl) {
			   var fragment;
		      if (window.ActiveXObject) {
		         fragment = xml.transformNode(xsl);
		      }
		      else if (dojo.doc.implementation && dojo.doc.implementation.createDocument) 
		      {
		         var xsltProcessor = new XSLTProcessor();
		         try {
		            xsltProcessor.importStylesheet(xsl);
		         } catch (e1) {
		         	console.log("There is a problem with the stylesheet ", e1);
		         }
		         fragment = xsltProcessor.transformToFragment(xml, dojo.doc);
		      }
		      dojo.empty(node);
		      dojo.place(fragment, node);
         }
         else {
         	dojo.empty(node);
         	dojo.place("<b>Unable to retrieve xml/xsl</b>", node);
         }
   	});
   	
   },
   isSecure: function () {
   	var scheme = (window.location.protocol || "http").replace(':','');
      return (scheme === "https");
   }
}
})();