/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.mm.enabler.iw.parser");

dojo.require("com.ibm.mm.enabler.iw.parserImpl");

dojo.declare("com.ibm.mm.enabler.iw.parser.WidgetParserFactory",null,  {
     getWidgetParser: function(responseText){
         var xmlStr = responseText.replace(/^\s+/, "").replace(/\s+$/, "");
         var isXML = this._isXML(xmlStr);
         var isLegacy = this._isLegacy(xmlStr);
         if ( isXML && isLegacy ) {
             return  new com.ibm.mm.enabler.iw.parser.legacyXMLParser(xmlStr);
         } else if ( isXML && !isLegacy) {
             return new com.ibm.mm.enabler.iw.parser.standardXMLParser(xmlStr);
         }
		 return null;
     },
     _isXML: function(responseText){
          var isXML = true;
          var index = responseText.indexOf("=\"http://www.w3.org/1999/xhtml\"");
          if (index != -1) {
               isXML = false;
          }
          com.ibm.mm.enabler.debug.log("parser._isXML", isXML);
          return isXML;
     },
     _isLegacy: function(responseText){
          var isLegacy = true;
          var index = responseText.indexOf("=\"http://www.ibm.com/xmlns/prod/iWidget\"");
         if (index != -1) {
              isLegacy = false;
         }
         com.ibm.mm.enabler.debug.log("parser._isLegacy", isLegacy);
         return isLegacy;
     }
});    

com.ibm.mm.enabler.iw.parser.WidgetParserFactory = new com.ibm.mm.enabler.iw.parser.WidgetParserFactory();
