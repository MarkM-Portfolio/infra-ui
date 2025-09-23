/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/has"
], function (declare, has) {

	declare("com.ibm.social.incontext.util.xsl.IEProcessor", null, {
	   IS_XML: /^<\?xml /,
	   constructor: function(uri) {
	      if (!uri)
	         throw "Must specify an XSL uri";
	   
	      var ACTIVEX_DOMS = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XMLDOM"];
	      var ACTIVEX_FT_DOMS = ["Msxml2.FreeThreadedDOMDocument.6.0", "MSXML2.FreeThreadedDOMDocument.3.0"];
	      var ACTIVEX_TEMPLATES = ["Msxml2.XSLTemplate.6.0", "MSXML2.XSLTemplate.3.0"];
	      function getActiveXImpl(activeXArray) {
	         for (var i = 0; i < activeXArray.length; i++) {
	            try {
	               var testObj = new ActiveXObject(activeXArray[i]);
	               if (testObj)
	                  return activeXArray[i];
	            }
	            catch (e) {
	            }
	         }
	         //dojo.raise("Could not find an ActiveX implementation in:\n\n " + activeXArray);
	      }
	
	      var xsltDocument = new ActiveXObject(getActiveXImpl(ACTIVEX_FT_DOMS));
	      xsltDocument.async = false;
	      
	      if (this.IS_XML.exec(uri))
	         xsltDocument.loadXML(uri);
	      else
	         xsltDocument.load(uri);
	
	      var xslt = new ActiveXObject(getActiveXImpl(ACTIVEX_TEMPLATES));
	      xslt.stylesheet = xsltDocument;
	      this.processor = xslt.createProcessor();
	   },
	
	   transform: function(xmlDoc, params) {
	      var result, i;
	      var p = this.processor;
	      
	      try {
	         var outputDocument = new ActiveXObject(getActiveXImpl(ACTIVEX_DOMS));
	         outputDocument.async = false;
	         outputDocument.validateOnParse = false;
	   
	         if (params) {
	            for (i in params) 
	               p.addParameter(i, params[i]);
	         }
	         p.input = xmlDoc;
	         p.output = outputDocument;
	         p.transform();
	         
	         if (outputDocument.parseError.errorCode !== 0)
	            throw outputDocument.parseError;
	            
	         result = outputDocument;
	      } finally {
	         if (params) {
	            for (i in params) 
	               p.addParameter(i, "");
	         }
	      }
	      return result;
	   },
	   transformToString: function(xmlDoc, params) {
	      var result, i;
	      var p = this.processor;
	      
	      try {
	         if (params) {
	            for (i in params) 
	               p.addParameter(i, params[i]);
	         }
	         p.input = xmlDoc;
	         p.transform();
	         result = p.output;
	      } finally {
	         if (params) {
	            for (i in params)
	               p.addParameter(i, "");
	         }
	      }
	      return result;
	   },
	   transformToHtml: function(xmlDoc, htmlDoc, params) {
	      var s = this.transformToString(xmlDoc, params);
	      if (s) {
	         var frag = document.createDocumentFragment();
	         var div = document.createElement("div");
	         div.innerHTML = s;
	         while (div.firstChild)
	            frag.appendChild(div.firstChild);
	         return frag;
	      }
	      return null;
	   }
	   
	});
	
	declare("com.ibm.social.incontext.util.xsl.Processor", null, {
	   IS_XML: /^<\?xml /,
	   constructor: function(uri, impl) {
	      if (!uri)
	         throw "Must specify an XSL uri";
	      
	      var xsltProcessor = this.processor = new XSLTProcessor();
	      if (this.IS_XML.exec(uri)) {
	         try { 
	            var doc = new DOMParser().parseFromString(uri, "text/xml");
	            // Firefox 2 has a bug with anchor URLs: https://bugzilla.mozilla.org/show_bug.cgi?id=212362
	            if (has("ff") == 2 && doc.baseURI.indexOf("#") != -1) {
	               var impl = impl || com.ibm.social.incontext.util.xsl.Processor.documentImplementation;
	               if (!impl)
	                  throw "com.ibm.social.incontext.util.xsl.Processor requires a documentImplementation object if Firefox 2 is used";
	               var newDoc = impl.createDocument("","",null);
	               newDoc.appendChild(doc.documentElement);
	               doc = newDoc;
	            }
	            this.template = doc;
	         } catch (e) {
	            throw e; 
	         }
	      }
	      else {
	         var xsltDocument = document.implementation.createDocument("", "", null);
	         xsltDocument.addEventListener("load", function() {this.template = xsltDocument;}, false);
	         xsltDocument.async = false;
	         xsltDocument.load(uri);
	      }
	      xsltProcessor.importStylesheet(this.template);
	   },
	   
	   setParams: function(p, params) {
	      if (params) 
	         for (var i in params) {
	            var value = params[i];
	            if (has("safari")) {
	               if (value === true) value = "true";
	               else if (value === false) value = "false";
	            }
	            p.setParameter(null, i, value);
	         }
	   },
	
	   transform: function(xmlDoc, params) {
	      var result;
	      var p = this.processor;
	      
	      try {
	         this.setParams(p, params);
	         result = p.transformToDocument(xmlDoc);
	      } finally {
	         p.clearParameters();
	      }
	      return result;
	   },
	   transformToHtml: function(xmlDoc, htmlDoc, params) {
	      var result;
	      var p = this.processor;
	      
	      try {
	         this.setParams(p, params);
	         result = p.transformToFragment(xmlDoc, htmlDoc);
	         if (!result)
	            throw "XSLT transformation returned null";
	         /* Attempting to transform the same XML document multiple times in Safari 3.x may cause the documentElement 
	          * object to be null - the easy solution is to ensure that the XMLdoc being transformed is new each time 
	          */
	      } finally {
	         p.clearParameters();
	      }
	      return result;
	   }
	});
	
	com.ibm.social.incontext.util.xsl.createProcessor = function(uri) {
	   return (has("ie")) ? new com.ibm.social.incontext.util.xsl.IEProcessor(uri) : new com.ibm.social.incontext.util.xsl.Processor(uri);
	}
	
	return com.ibm.social.incontext.util.xsl;
});
