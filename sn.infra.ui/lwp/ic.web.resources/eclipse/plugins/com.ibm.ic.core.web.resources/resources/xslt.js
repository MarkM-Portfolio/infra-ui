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

define([
      "dojo/_base/kernel",
      "dojo/has",
      "dojo/request",
      "dojox/xml/parser",
      "dojox/data/dom",
      "ic-core/errorhandling"
],
   function(kernel, has, request, parser, domModule, errorhandling) {

      // Mainly from MashupMaker enabler
      // Modified to add Safari support
      // Ronny: added more utility functions

      kernel.deprecated("ic-core/xslt", "Use dojox.xml.parser instead", "6.0");

      // ----------------------------------------------------------------------
      // xml
      // related utility methods
      /*
       * loadXml(sUrl) - returns oDomDoc. parses xml from the url into DOM
       * document object. loadXmlString() - returns oDomDoc. parses xml from the
       * contents of the string into DOM document object. loadXsl() transform()
       */
      var xslt = {
         ie : {},
         gecko : {}
      };
	  
	  //check for ActiveXControl existence
      xslt._useActiveX = function() {
			if (typeof xslt._isIE === "undefined") {
				try {
					new ActiveXObject("Microsoft.XMLDOM");
					xslt._isIE = true;
				}
				catch (e) {
					xslt._isIE = false;
				}
			}

			return xslt._isIE;
      };
	  
      xslt.getXmlHttpRequest = function() {
         var oXml = null;
         if (xslt._useActiveX()) {
            oXml = new ActiveXObject("Microsoft.XMLHTTP");
         }
         else {
            oXml = new XMLHttpRequest();
         }
         return oXml;
      };

      xslt.loadXml = function(sUrl) {
         if (xslt._useActiveX()) {
            return xslt.ie.loadXml(sUrl);
         }
         return xslt.gecko.loadXml(sUrl);
      };

      xslt.loadXmlString = function(sXml) {
         // 94751: Consolidate all XML parsing under dojox.xml.parser
         var doc = parser.parse(sXml);
         var de = doc.documentElement;
         // Chrome returns an XML document with an <html> root
         if (de.nodeName == "html" && de.querySelector("html body parsererror")) {
            var sourceText = de.getElementsByTagNameNS(de.namespaceURI, 'div')[0];
            if (sourceText) {
               sourceText = sourceText.firstChild.data;
            }
            throw new Error("Error parsing text " + de.firstChild.data + " \n" + sourceText);
         }
         return doc;
      };

      xslt.loadXsl = function(sUrl) {
         if (xslt._useActiveX())
            return xslt.ie.loadXsl(sUrl);
         else
            return xslt.gecko.loadXsl(sUrl);
      };

      xslt.loadXslString = function(sXsl) {
         if (xslt._useActiveX()) {
            return xslt.ie.loadXslString(sXsl);
         }
         return this.loadXmlString(sXsl);
      };

      xslt.transform = function(xml, xsl, sXslMode, aXslParams, bReturnString) {
         // ibm.enabler.debug.entry( "transform",
         // [xml,xsl,sXslMode,aXslParams,bReturnString] );
         if (xslt._useActiveX()) {
            return xslt.ie.transform(xml, xsl, sXslMode, aXslParams, bReturnString);
         }
         return xslt.gecko.transform(xml, xsl, sXslMode, aXslParams, bReturnString);
      };

      // added
      xslt.transformDocument = function(/* XMLDocument */xmlData, xsltUrl, params) {
         var xslDoc = xslt.loadXsl(xsltUrl);
         if (xslDoc.documentElement == null) {
            // dojomum.debug("widgetLoadService:transformDocument xslDoc is
            // null");
            return null;
         }
         var results = xslt.transform(xmlData, xslDoc, null, params, true);

         // dojomum.debug("widgetLoadService:transformDocument return is
         // "+results);
         return results;
      }

      xslt.transformAndUpdate = function(/* HTMLElement */nodeToUpdate, /* XMLDocument */xml, /* XMLDocument */xsl, /* String? */sXslMode, /* Map */aXslParams) {
         // ibm.enabler.debug.entry( "transformAndUpdate", [ nodeToUpdate, xml,
         // xsl, sXslMode, aXslParams ]);
         if (xslt._useActiveX()) {
            var results = xslt.ie.transform(xml, xsl, sXslMode, aXslParams, true);
            // Don't really want to use innerHTML here, but seems to be the only
            // way IE will
            // take the update.
            // ibm.enabler.debug.text( "XSLT result: " + results );
            nodeToUpdate.innerHTML += results;
         }
         else {
            results = xslt.gecko.transform(xml, xsl, sXslMode, aXslParams, false);
            // ibm.enabler.debug.text( "XSLT result: " + ( new XMLSerializer()
            // ).serializeToString( results ), "xslt.transformAndUpdate" );

            var toAppend = results.documentElement;

            if (results.documentElement.tagName == "transformiix:result") {
               toAppend = results.documentElement.childNodes;
               dojomum.dom.copyChildren(results.documentElement, nodeToUpdate, true);
               /*
                * var length = toAppend.length
                * 
                * ibm.enabler.debug.text( "there are " + toAppend.length + "
                * items to add." );
                * 
                * for ( var c = 0; c < length; c++ ) { ibm.enabler.debug.text(
                * "Appending: " + ( new XMLSerializer() ).serializeToString(
                * toAppend[c] ), "xslt.transformAndUpdate" );
                * ibm.enabler.debug.text( "toAppend = " + toAppend[c] + "; c=" +
                * c + "; length=" + length ); nodeToUpdate.appendChild(
                * toAppend[c] ); }
                */
            }
            else {
               // ibm.enabler.debug.text( "Appending2: " + ( new XMLSerializer()
               // ).serializeToString( toAppend ), "xslt.transformAndUpdate" );
               nodeToUpdate.appendChild(toAppend);
            }
         }

         // ibm.enabler.debug.exit( "transformAndUpdate" );
      }

      // ----------------------------------------------------------------------
      // IE
      // xml related utility methods

      xslt.ie.loadXml = function(sUrl) {
         var oXmlDoc = new ActiveXObject("MSXML2.DOMDocument");
         oXmlDoc.async = 0;
         oXmlDoc.resolveExternals = 0;
         if (!oXmlDoc.load(sUrl)) {
            // Callers should catch this and can substitute their own error
            // message
            throw new Error("Error loading xml file " + sUrl);
         }
         return oXmlDoc;

      }

      xslt.ie.loadXsl = function(sUrl) {
         // we need to use MSXML2.FreeThreadedDOMDocument interface in order to
         // support
         // mode and parameters in XSL transformation.

         // Msxml2.FreeThreadedDOMDocument.4.0 - xp sp2
         // Msxml2.FreeThreadedDOMDocument.6.0 - vista
         var oXslDoc = new ActiveXObject("MSXML2.FreeThreadedDOMDocument");
         oXslDoc.async = 0;
         /*
          * oXslDoc.resolveExternals = 0; if(!oXslDoc.load(sUrl)) { //Callers
          * should catch this and can substitute their own error message throw
          * new Error("Error loading xsl file " + sUrl); }
          */

         request(sUrl, {
            method : "GET",
            sync : true,
            handleAs : "text",
            expectedContentType : "xml"
         }).then(function(response, ioArgs) {
            oXslDoc.loadXML(response);
         });

         return oXslDoc;
      }

      xslt.ie.loadXslString = function(sXsl) {
         // we need to use MSXML2.FreeThreadedDOMDocument interface in order to
         // support
         // mode and parameters in XSL transformation.
         var oXslDoc = new ActiveXObject("MSXML2.FreeThreadedDOMDocument");
         oXslDoc.async = 0;
         if (!oXslDoc.loadXML(sXsl)) {
            // Callers should catch this and can substitute their own error
            // message
            throw new Error("Error loading xsl string " + sXsl);
         }
         return oXslDoc;
      }

      xslt.ie.transform = function(xmlDoc, xsl, sXslMode, aXslParams, bReturnString) {
         var oXml = xmlDoc;
         var oXsl = xsl;

         try {
            if (!oXsl.documentElement)
               oXsl = this.loadXsl(xsl);
         }
         catch (e) {
            var sMsg = e.message;
            throw new Error("" + sMsg, "" + sMsg);
         }
         // create the xsl processor and apply the transformation
         // Msxml2.XSLTemplate.4.0 - xp sp2
         // Msxml2.XSLTemplate.6.0 - vista
         var oXslt = new ActiveXObject("Msxml2.XSLTemplate");
         oXslt.stylesheet = oXsl;
         var oXslProc = oXslt.createProcessor();
         oXslProc.input = oXml;

         // set paramaters if any
         for (var i = 0; aXslParams != null && i < aXslParams.length; i++) {
            var name = aXslParams[i][0];
            var value = aXslParams[i][1];
            if (name == null || name == "")
               continue;
            try {
               oXslProc.addParameter(name, value);
            }
            catch (error) {
               console.debug(error);
            }
         }
         if (sXslMode)
            oXslProc.addParameter("mode", sXslMode);

         if (bReturnString) {
            if (!oXslProc.transform()) {
               // Callers should catch this and can substitute their own error
               // message
               throw new Error("Error transforming xml doc " + oXml);
            }
            return oXslProc.output;
         }
         else {
            var oHtmlDoc = new ActiveXObject("MSXML2.DOMDocument");
            oHtmlDoc.async = 0;
            oHtmlDoc.validateOnParse = 1;
            oXml.transformNodeToObject(oXsl, oHtmlDoc);
            return oHtmlDoc;
         }
      }

      // ----------------------------------------------------------------------
      // GECKO xml related utility methods

      xslt.gecko.loadXml = function(sUrl) {
         var xmlDocumentObj = domModule.createDocument();
         xmlDocumentObj.async = false;
         if (has("webkit")) {
            xmlDocumentObj.load = function(url) {
               var req = request(url, {
                  method : "GET",
                  sync : true,
                  handleAs : "xml"
               }).then(function(data, transport) {
                  xmlDocumentObj = data;
               });
            }
         }

         xmlDocumentObj.load(sUrl);
         if (xmlDocumentObj.documentElement && xmlDocumentObj.documentElement.nodeName == "parsererror") {
            console.log(domModule.innerXML(xmlDocumentObj.documentElement));
            return null;
         }
         return xmlDocumentObj;
      }

      xslt.gecko.loadXsl = function(sUrl) {
         // This is done through createDocument because of anchor(#) we have in
         // portal url.
         // Do not change the code without testing the case.

         var oDomDoc = document.implementation.createDocument('', '', null);
         oDomDoc.async = false; // this is the important part

         if (has("webkit")) {
            oDomDoc.load = function(url) {
               var req = request(url, {
                  method : "GET",
                  sync : true,
                  handleAs : "xml"
               }).then(function(data, transport) {
                  oDomDoc = data;
               });
            }
         }

         oDomDoc.load(sUrl);
         return oDomDoc;
      }

      xslt.gecko.transform = function(xmlDoc, xsl, sXslMode, aXslParams, bReturnString) {
         try {
            var xslDoc = xsl;
            if (!xslDoc.documentElement) {
               console.log("xslDoc is not a Document, loading it...");
               xslDoc = this.loadXsl(xsl);
            }

            var proc = new XSLTProcessor();
            proc.importStylesheet(xslDoc);

            // set parameters if any
            for (var i = 0; aXslParams != null && i < aXslParams.length; i++) {
               var name = aXslParams[i][0];
               var value = aXslParams[i][1];
               proc.setParameter(null, name, value);
            }
            if (sXslMode)
               proc.setParameter(null, "mode", sXslMode);

            var resultDoc = proc.transformToFragment(xmlDoc, document);
            if (!bReturnString) {
               return resultDoc;
            }
            var serializer = new XMLSerializer();
            resultStr = serializer.serializeToString(resultDoc);

         }
         catch (exc) {
            // console.log("error transforming document: "+exc)
            // Callers should catch this and can substitute their own error
            // message
            throw new Error("Error transforming xml doc " + exc);
         }
         return resultStr;
      }

      /*
       * This method sets the content of a layer within the HTML page to the
       * result of transforming the xml parameter by the xsl parameter. The xml
       * and xsl parameters may be of any form supported by the transformXml()
       * method. The layer parameter may be either a DOM object or the name of a
       * DOM object that can be found using the findObject() method.
       */

      xslt.setLayerContentByXml = function(layer, xml, xsl, xslparam, bReturnString) {
         var result = xslt.transform(xml, xsl, null, xslparam, bReturnString);
         if (layer.innerHTML)
            layer.innerHTML = result;
         else {
            var obj = document.getElementById(layer);
            obj.innerHTML = result;
         }
      }

      /*
       * xslt.transformAndRender display an common error message if they featch
       * the atom feed fails or there is an xslt processing problem
       * 
       * var xsltArgs = { xmlDoc: xmlDocumentObject, //can be null. xmlDocUrl
       * will be used if xmlDoc is null. xmlDocUrl: dataUrl, xsltUrl:
       * XSLViewURL, //the xslt document htmlContainerElemId: container, // the
       * DOM node where the transform content will be added. Could be a DOM node
       * or a string with the Dom Id aXslParams: params, //additional xsl
       * parameters, they will be added to the xsl document. Example resource
       * strings. dojoErrorHandler: errorhandling.DefaultXHRErrorHandler,
       * //default error handles, optional argument exceptionHandler:
       * errorhandling.DefaultErrorHandler, // optional argument callback:
       * myCallBackFunction //optional, callback function receives the xslResult
       * input variable as a string }; xslt.transformAndRender(xsltArgs);
       */
      xslt.transformAndRender = function(xsltArgs) {
         /*
          * var useXHRQueueing = false; //IE6 can not handle too many xhr
          * request at the same time (concurrently). need to queue up all the
          * request if(dojo.isIE) { //we need Jscript.dll v5.6.0.8834 or higher //
          * with v5.6.0.8834 browser doesn't hang var isIEEngineGood =
          * (ScriptEngineBuildVersion() >= 8834); if(!isIEEngineGood)
          * useXHRQueueing = true; }
          */

         var transformDocAndRender = function(xsltArgs) {
            if (xslt.debug)
               debug("before xslt.transformDocument for: " + xsltArgs.xmlDocUrl);
            var xslResult;
            if (xsltArgs.xslDoc) {
               xslResult = xslt.transform(xsltArgs.xmlDoc, xsltArgs.xslDoc, null, xsltArgs.aXslParams, true);
            }
            else {
               xslResult = xslt.transformDocument(xsltArgs.xmlDoc, xsltArgs.xsltUrl, xsltArgs.aXslParams);
            }
            if (xslt.debug)
               debug("after xslt.transformDocument for: " + xsltArgs.xmlDocUrl);

            if (xslt.debug)
               debug("transformDocAndRender: xslResult doc:\n" + xslResult + "<br/><br/><br/>");

            if (xsltArgs.callback != null)
               xsltArgs.callback(xslResult);
            if (typeof (xsltArgs.htmlContainerElemId) == "string")
               document.getElementById(xsltArgs.htmlContainerElemId).innerHTML = xslResult;
            else
               xsltArgs.htmlContainerElemId.innerHTML = xslResult;
         };

         var dojoLoadCallback = function(xmlDocument, ioArgs) {
            if (xslt.debug)
               debug("dojoLoadCallback start");
            try {
               var xsltArgs = ioArgs.args.xsltArgs;
               if (has("ie") && xmlDocument.documentElement == null) {
                  if (xslt.debug)
                     debug("before dojox.data.dom.createDocument for: " + xsltArgs.xmlDocUrl);
                  xmlDocument = domModule.createDocument(xmlDocument);
                  if (xslt.debug)
                     debug("after dojox.data.dom.createDocument for: " + xsltArgs.xmlDocUrl);
               }

               if (xslt.debug)
                  debug("transformUrlAndRender: xml doc:\n" + domModule.innerXML(xmlDocument) + "<br/><br/><br/>");

               xsltArgs.xmlDoc = xmlDocument;
               transformDocAndRender(xsltArgs);
            }
            catch (exception) {
               xsltArgs.exceptionHandler("transformUrlAndRender", exception, xsltArgs);
            }

            if (xslt.debug)
               debug("dojoLoadCallback end");
         };

         var debug = function(message) {
            console.log(message);
         };

         if (xsltArgs.dojoErrorHandler == null)
            xsltArgs.dojoErrorHandler = errorhandling.DefaultXHRErrorHandler;
         if (xsltArgs.exceptionHandler == null)
            xsltArgs.exceptionHandler = errorhandling.DefaultErrorHandler;

         if (xsltArgs.xmlDoc != null)
            transformDocAndRender(xsltArgs);
         else {
            var handleAs = "xml";

            if (has("ie")) {
               handleAs = "text";
            }

            if (xslt.debug)
               debug("using: handleAs: " + handleAs + " for: " + xsltArgs.xmlDocUrl);

            // sync must be false for unauthenticated users to be redirected to
            // the
            // login page
            // otherwise IE 6 & 7 hang
            var ioArgs = {
               xsltArgs : xsltArgs,
               url : xsltArgs.xmlDocUrl,
               sync : false,
               handleAs : handleAs,
               expectedContentType : "xml",
               load : dojoLoadCallback
            };

            if (xsltArgs.dojoErrorHandler != null)
               ioArgs.error = xsltArgs.dojoErrorHandler;

            request(ioArgs.url, ioArgs).response.then(function(response) {
               var res = lang.mixin({}, response);
               res.args = lang.mixin(res.args, response.options);
               ioArgs.load(response.data || response.text, res);
            });
         }
      }

      return xslt;
   });
