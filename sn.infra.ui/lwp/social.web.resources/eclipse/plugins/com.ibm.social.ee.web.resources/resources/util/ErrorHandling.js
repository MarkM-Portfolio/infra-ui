/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.util.ErrorHandling");
dojo.require("com.ibm.social.incontext.util.html");
/**
 * This utility class provides text summarizing and image manipulation services
 */
(function () {
	/*
	 * Creating an error widget response. 
	 * if againFunction is not null, and the message allow for it (not denied/not found) the error message will allow for a re-entry execution of the method
	 */
	var er = com.ibm.social.ee.util.ErrorHandling;
	er.onDataError = function (error, loadingNode, errorMsg, itemNotFoundErrorMsg, deniedErrorMsg, errorAgainMsg, againFunction, container, errorAltMsg, errorImg) {
		loadingNode.style.display = "none";
		if(error instanceof Error) {
			if(error.code == "ItemNotFound" && itemNotFoundErrorMsg)
				errorMsg = itemNotFoundErrorMsg;
			else if((error.code == "Unauthorized" || error.code == "AccessDenied") && deniedErrorMsg)
				errorMsg = deniedErrorMsg;
		}
		er._showError(errorMsg, errorAgainMsg, againFunction, container, errorAltMsg, errorImg, true);  
	};
	/*
	 * This version of creating an error widget response can be used when the error message are related to the same object and are (error, error_404, error_403, error_again)
	 * if againFunction is not null, and the message allow for it (not denied/not found) the error message will allow for a re-entry execution of the method
	 */
	er.onDataErrorCommon = function (error, loadingNode, errorMessageSrc, againFunction, container, errorAltMsg, errorImg) {
		er.onDataError(error, loadingNode, errorMessageSrc.error, errorMessageSrc.error_404, errorMessageSrc.error_403, errorMessageSrc.error_again, againFunction, container, errorAltMsg, errorImg);
	};
	
	var network = null;
	
	er.setNetwork = function(nw) {
	   network = nw;
	};
	
	var onSizeChange = null;
	er.setSizeChangeFunction = function(func) {
	   onSizeChange = func;
	};
	
	er._showError= function(errorMsg, errorAgainMsg, againFunction, container, errorAltMsg, errorImg, useItalics) {
		var d = dojo.doc, div, msg;
		var span = dojo.create("span");
		if(againFunction !== null) {
			com.ibm.social.incontext.util.html.substitute(d, span, errorMsg, {
				again: function() {
					var a = dojo.create("a");
					a.href = "#";
					a.setAttribute("role", "button");
					a.title = errorAgainMsg;
					a.appendChild(d.createTextNode(errorAgainMsg));
					container.connect(a, "onclick", function() {
						if (div)
						   dojo.destroy(div); 
						againFunction();
					});
					return a;
				}
			});
		}
		if(!useItalics) {
   		div = dojo.create("div", {className: "lotusMessage2", role: "alert"}, container.domNode);
   		   div.style.margin = "10px 0 0 0";
   		var img = dojo.create("img", {className: "lconnSprite lconnSprite-iconError16", alt: errorAltMsg, title: errorAltMsg, src:errorImg}, div);
   		img.style.marginRight = "10px";
   		msg = dojo.create("span", {}, div);
   		msg.appendChild(span);
		}
		else {
	      div = dojo.create("div", {className: "lconnEmpty", role: "alert"}, container.domNode);
	         msg = dojo.create("span", {}, div);
	            msg.appendChild(span);
	      var nls = dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings");
	      if (network.lastError) {
	         var errorDetails = dojo.toJson(network.lastError);
   	      div = dojo.create("div", { className: "lotusChunk" }, container.domNode);
   	         var showDetails = dojo.create("a", { href: "javascript:;" }, div);
   	           showDetails.appendChild(dojo.doc.createTextNode(nls.MESSAGE.MORE_DETAILS));
   	         var hideDetails = dojo.create("a", { href: "javascript:;", style: {display:"none"}}, div);
   	           hideDetails.appendChild(dojo.doc.createTextNode(nls.MESSAGE.HIDE_DETAILS));
   	         var details = dojo.create("div", {className: "lotusErrorDetails",  style:{display:"none"}}, div);
   	           var ta = dojo.create("textarea", { className: "lotusText", style: { width: "100%", height: "200px" }}, details);
   	              ta.appendChild(dojo.doc.createTextNode(errorDetails));
	      dojo.connect(showDetails, "onclick", null, function() { 
		         showDetails.style.display = "none";
                 hideDetails.style.display = "";
                 details.style.display = "";
				 if (onSizeChange) { onSizeChange(); }
          });
          dojo.connect(hideDetails, "onclick", null, function() {
                 hideDetails.style.display = "none";
				 details.style.display = "none";
				 showDetails.style.display = "";
				 if (onSizeChange) { onSizeChange(); }
          });		  
   	   }
		}
	};
	
})();