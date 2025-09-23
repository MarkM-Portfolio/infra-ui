/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.util.OAuthHelper");

dojo.requireLocalization("com.ibm.social.ee", "socialEEStrings");
dojo.require("com.ibm.social.incontext.util.html");

(function () {
   var nls,
       hu = com.ibm.social.incontext.util.html;
       
   function initNls () {
      nls = dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings");
   }   
   var _helper = com.ibm.social.ee.util.OAuthHelper;
   
   dojo.mixin(_helper, {
      _createLink: function (div, msgKey) {
         if (!nls) { initNls(); }
         var link;
         var d = dojo.doc;
         dojo.empty(div);
         var message = dojo.getObject(msgKey, false, nls);
         hu.substitute(d, div, message, {
            clickHere: function() {
               link = dojo.create("a", {href: "javascript:;"});                        
               link.appendChild(d.createTextNode(nls.OAUTH.clickHere));
               return link;
            }
         });
         return link;         
      },
      createAuthLink: function(authDiv) {
         return _helper._createLink(authDiv, "OAUTH.authorizeGadget");
      },
      createAuthDoneLink: function(waitingDiv) {
         return _helper._createLink(waitingDiv, "OAUTH.confirmAuthorization"); 
      },
      createInfoNode: function(infoDiv) {
         dojo.empty(infoDiv);
         if (!nls) { initNls(); }
         infoDiv.appendChild(dojo.doc.createTextNode(nls.OAUTH.infoMsg));
      },
      addImgSrc: function(imgEl) {
         imgEl.src = dojo.moduleUrl("com.ibm.social.ee", "images/connections_36_blue.png");
      }
   });
})();