/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide( "com.ibm.mm.enabler.xpath" );

// generic impl
com.ibm.mm.enabler.xpath.evaluateXPath = function(/*String*/xpathExpr, /*DOMDocument*/ doc, /*Object{prefix:ns,prefix2:ns2,...}*/namespaces) {
    if (navigator.userAgent.toLowerCase().indexOf("safari") != -1) {
        return com.ibm.mm.enabler.xpath.safari.evaluateXPath(xpathExpr,doc,namespaces);
    }
    else if (typeof ActiveXObject != "undefined") {
        return com.ibm.mm.enabler.xpath.ie.evaluateXPath(xpathExpr, doc, namespaces);
    }
    else {
        return com.ibm.mm.enabler.xpath.gecko.evaluateXPath(xpathExpr, doc, namespaces);
    }
};

// Safari implementation
dojo.provide("com.ibm.mm.enabler.xpath.safari");
com.ibm.mm.enabler.xpath.safari.evaluateXPath = function(/*String*/xpathExpr, /*DOMDocument*/ doc, /*Object{prefix:ns,prefix2:ns2,...}*/namespaces) {

    var result;
    if (typeof XPathResult != "undefined") {
        //use build in xpath support for Safari 3.0
        var results = document.evaluate(xpathExpr,doc, function(prefix) { return namespaces[prefix] || null;}, XPathResult.ANY_TYPE, null );
        var thisResult;
        result = [];
        var len = 0;
        do {
            thisResult = results.iterateNext();
            if (thisResult) {
                result[len] = thisResult;
                len++;
            }
        } while ( thisResult );
    }
    else {
        //use javeline Safari2 xpath support
        if (doc.selectNodes) {
            result = doc.selectNodes(xpathExpr);
        }
    }
    return result;
};



// IE Implementation

dojo.provide( "com.ibm.mm.enabler.xpath.ie" );

com.ibm.mm.enabler.xpath.ie.evaluateXPath = function(/*String*/xpathExpr, /*DOMDocument*/ doc, /*Object{prefix:ns,prefix2:ns2,...}*/namespaces) {
        if (namespaces) {        
            var ns = "";
            for (var prop in namespaces) {
                if (prop != "xml") {
					// TODO - unclear why this is required
					ns += "xmlns:" + prop + "='" + namespaces[prop] + "' ";
				}
            }
            if (doc.ownerDocument) {
                doc.ownerDocument.setProperty("SelectionNamespaces", ns); 
                doc.ownerDocument.setProperty("SelectionLanguage", "XPath"); 
            } else {
                doc.setProperty("SelectionNamespaces", ns);
                doc.setProperty("SelectionLanguage", "XPath"); 
            }
        }
        var result = doc.selectNodes(xpathExpr);

        var thisResult;
        var resultSet = [];
        var len = 0;
        for (var i=0; i<result.length; i++) {
            thisResult = result[i];
            if (thisResult) {
                resultSet[len] = thisResult;
                len++;
            }
        }
        return resultSet;
};


// GECKO Implementation

dojo.provide( "com.ibm.mm.enabler.xpath.gecko" );

com.ibm.mm.enabler.xpath.gecko.evaluateXPath = function(/*String*/xpathExpr, /*DOMDocument*/ doc, /*Object{prefix:ns,prefix2:ns2,...}*/namespaces) {
        var result;
        try {
            var xmlDocument = doc;
            if (doc.nodeType != 9) {
                xmlDocument = doc.ownerDocument;
            }  
            result = xmlDocument.evaluate( xpathExpr, doc, function(prefix) { return namespaces[prefix] || null;}, XPathResult.ANY_TYPE, null );
        } catch (exc) {
            //Callers should catch this and can substitute their own error message
            throw new Error("Error with xpath expression" + exc);
        }
    
        var thisResult;
        var resultSet = [];
        var len = 0;
        do {
            thisResult = result.iterateNext();
            if (thisResult) {
                resultSet[len] = thisResult;
                len++;
            }
        } while ( thisResult );
        return resultSet;
};
