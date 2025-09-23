/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojo/_base/lang",
      "./iw",
      "./utilities"
], function(declare, lang, iw, utilities) {

   lang.setObject("aggregation.javascript.JAVASCRIPT_HANDLER", lang.getObject("com.ibm.mm.enabler.aggregation.javascript.JAVASCRIPT_HANDLER"), lang
         .getObject("com.ibm.enabler", true));
   lang.setObject("iw.utils", lang.getObject("com.ibm.mm.enabler.iw.utils"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("utilities", lang.getObject("com.ibm.mm.enabler.utilities"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("dom", lang.getObject("com.ibm.mm.enabler.dom"), lang.getObject("com.ibm.enabler", true));

   lang.setObject("xpath.evaluateXPath", lang.getObject("com.ibm.mm.enabler.xpath.evaluateXPath"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("xslt.getXmlHttpRequest", lang.getObject("com.ibm.mm.enabler.xslt.getXmlHttpRequest"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("xslt.loadXml", lang.getObject("com.ibm.mm.enabler.xslt.loadXml"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("xslt.loadXmlString", lang.getObject("com.ibm.mm.enabler.xslt.loadXmlString"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("xslt.loadXsl", lang.getObject("com.ibm.mm.enabler.xslt.loadXsl"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("xslt.transform", lang.getObject("com.ibm.mm.enabler.xslt.transform"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("xslt.transformAndUpdate", lang.getObject("com.ibm.mm.enabler.xslt.transformAndUpdate"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("services.CONFIG_SERVICE", lang.getObject("com.ibm.mm.enabler.services.CONFIG_SERVICE"), lang.getObject("com.ibm.enabler", true));

   lang.setObject("debug.Constants", lang.getObject("com.ibm.mm.enabler.debug.Constants"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("debug.log", lang.getObject("com.ibm.mm.enabler.debug.log"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("debug.entry", lang.getObject("com.ibm.mm.enabler.debug.entry"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("debug.exit", lang.getObject("com.ibm.mm.enabler.debug.exit"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("debug.info", lang.getObject("com.ibm.mm.enabler.debug.info"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("debug.warn", lang.getObject("com.ibm.mm.enabler.debug.warn"), lang.getObject("com.ibm.enabler", true));
   lang.setObject("debug.error", lang.getObject("com.ibm.mm.enabler.debug.error"), lang.getObject("com.ibm.enabler", true));

   declare("com.ibm.enabler.iw.iEventDescriptionImpl", iw.iEventDescriptionImpl, {
      constructor : function() {
      // empty wrapper for backward compatibility
      }
   });

   declare("com.ibm.enabler.utilities.HttpUrl", utilities.HttpUrl, {
      constructor : function() {
      // empty wrapper for backward compatibility
      }
   });

   return utilities;
});
