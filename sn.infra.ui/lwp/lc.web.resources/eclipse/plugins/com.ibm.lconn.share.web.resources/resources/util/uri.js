/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.util.uri");
dojo.require("lconn.core.url");

lconn.share.util.uri.parseUri = lconn.core.url.parse;
lconn.share.util.uri.writeUri = lconn.core.url.write;
lconn.share.util.uri.rewriteUri = lconn.core.url.rewrite;
lconn.share.util.uri.splitQuery = lconn.core.url.splitQuery;
lconn.share.util.uri.getRequestParameters = lconn.core.url.getRequestParameters;
lconn.share.util.uri.writeParameters = lconn.core.url.writeParameters;

lconn.share.util.uri.makeAtomUrlIESafe = function(url) {
   if (dojo.isIE && url) {
      url = lconn.core.url.parse(url);
      url.queryParameters.format = "xml";
      url = lconn.core.url.write(url);
   }
   return url;
}
