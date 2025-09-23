/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
dojo.provide("com.ibm.social.incontext.util.uri");
dojo.require("com.ibm.social.incontext.util.url");
(function(){

   var uri = com.ibm.social.incontext.util.uri,
      url = com.ibm.social.incontext.util.url;
   uri.parseUri = url.parse;
   uri.writeUri = url.write;
   uri.rewriteUri = url.rewrite;
   uri.splitQuery = url.splitQuery;
   uri.getRequestParameters = url.getRequestParameters;
   uri.writeParameters = url.writeParameters;

   uri.makeAtomUrlIESafe = function(urlValue) {
      if (dojo.isIE && urlValue) {
         urlValue = url.parse(urlValue);
         urlValue.queryParameters.format = "xml";
         urlValue = url.write(urlValue);
      }
      return urlValue;
   };   
})();
