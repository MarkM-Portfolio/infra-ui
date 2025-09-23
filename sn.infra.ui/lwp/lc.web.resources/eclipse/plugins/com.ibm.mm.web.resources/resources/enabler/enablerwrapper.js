/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.mm.enabler.enablerwrapper");
dojo.provide("com.ibm.enabler");
dojo.provide("com.ibm.enabler.aggregation.javascript");
dojo.provide("com.ibm.enabler.iw");
dojo.provide("com.ibm.enabler.xpath");
dojo.provide("com.ibm.enabler.xslt");
dojo.provide("com.ibm.enabler.services");
dojo.provide("com.ibm.enabler.debug");
dojo.provide("com.ibm.enabler.iw.eventImpl");
dojo.provide("com.ibm.enabler.utilities");



com.ibm.enabler.aggregation.javascript.JAVASCRIPT_HANDLER = com.ibm.mm.enabler.aggregation.javascript.JAVASCRIPT_HANDLER ; 
com.ibm.enabler.iw.utils = com.ibm.mm.enabler.iw.utils;
com.ibm.enabler.utilities = com.ibm.mm.enabler.utilities;
com.ibm.enabler.dom = com.ibm.mm.enabler.dom;

com.ibm.enabler.xpath.evaluateXPath = com.ibm.mm.enabler.xpath.evaluateXPath;
com.ibm.enabler.xslt.getXmlHttpRequest = com.ibm.mm.enabler.xslt.getXmlHttpRequest;
com.ibm.enabler.xslt.loadXml = com.ibm.mm.enabler.xslt.loadXml;
com.ibm.enabler.xslt.loadXmlString = com.ibm.mm.enabler.xslt.loadXmlString;
com.ibm.enabler.xslt.loadXsl = com.ibm.mm.enabler.xslt.loadXsl;
com.ibm.enabler.xslt.transform = com.ibm.mm.enabler.xslt.transform; 
com.ibm.enabler.xslt.transformAndUpdate = com.ibm.mm.enabler.xslt.transformAndUpdate;  
com.ibm.enabler.services.CONFIG_SERVICE = com.ibm.mm.enabler.services.CONFIG_SERVICE;

com.ibm.enabler.debug.Constants = com.ibm.mm.enabler.debug.Constants;
com.ibm.enabler.debug.log = com.ibm.mm.enabler.debug.log;
com.ibm.enabler.debug.entry = com.ibm.mm.enabler.debug.entry;
com.ibm.enabler.debug.exit = com.ibm.mm.enabler.debug.exit;
com.ibm.enabler.debug.info = com.ibm.mm.enabler.debug.info;
com.ibm.enabler.debug.warn = com.ibm.mm.enabler.debug.warn;
com.ibm.enabler.debug.error = com.ibm.mm.enabler.debug.error;

dojo.declare("com.ibm.enabler.iw.iEventDescriptionImpl",com.ibm.mm.enabler.iw.iEventDescriptionImpl,{
    constructor:function () {
      //empty wrapper for backward compatibility
     }
});

dojo.declare("com.ibm.enabler.utilities.HttpUrl",com.ibm.mm.enabler.utilities.HttpUrl,{
    constructor:function () {
      //empty wrapper for backward compatibility
     }
});
