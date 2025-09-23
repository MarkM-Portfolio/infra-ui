define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"ic-incontext/util/html"
], function (dojo, lang, windowModule, domConstruct, i18nsocialEEStrings, html) {

	
	   var nls,
	       hu = html;
	       
	   function initNls () {
	      nls = i18nsocialEEStrings;
	   }   
	   
	   return {
	      _createLink: function (div, msgKey) {
	         if (!nls) { initNls(); }
	         var link;
	         var d = windowModule.doc;
	         domConstruct.empty(div);
	         var message = lang.getObject(msgKey, false, nls);
	         hu.substitute(d, div, message, {
	            clickHere: function() {
	               link = domConstruct.create("a", {href: "javascript:;"});                        
	               link.appendChild(d.createTextNode(nls.OAUTH.clickHere));
	               return link;
	            }
	         });
	         return link;         
	      },
	      createAuthLink: function(authDiv) {
	         return this._createLink(authDiv, "OAUTH.authorizeGadget");
	      },
	      createAuthDoneLink: function(waitingDiv) {
	         return this._createLink(waitingDiv, "OAUTH.confirmAuthorization"); 
	      },
	      createInfoNode: function(infoDiv) {
	         domConstruct.empty(infoDiv);
	         if (!nls) { initNls(); }
	         infoDiv.appendChild(windowModule.doc.createTextNode(nls.OAUTH.infoMsg));
	      },
	      addImgSrc: function(imgEl) {
	         imgEl.src = require.toUrl("ic-ee/images/connections_36_blue.png");
	      }
	   };
});