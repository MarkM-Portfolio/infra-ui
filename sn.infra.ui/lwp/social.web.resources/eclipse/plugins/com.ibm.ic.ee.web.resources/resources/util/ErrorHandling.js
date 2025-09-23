/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/json",
	"dojo/on",
	"ic-incontext/util/html"
], function (dojo, lang, windowModule, domConstruct, JSON, on, html) {

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
			var d = windowModule.doc, div, msg;
			var span = domConstruct.create("span");
			if(againFunction !== null) {
				html.substitute(d, span, errorMsg, {
					again: function() {
						var a = domConstruct.create("a");
						a.href = "#";
						a.setAttribute("role", "button");
						a.title = errorAgainMsg;
						a.appendChild(d.createTextNode(errorAgainMsg));
						container.connect(a, "onclick", function() {
							if (div)
							   domConstruct.destroy(div); 
							againFunction();
						});
						return a;
					}
				});
			}
			if(!useItalics) {
	   		div = domConstruct.create("div", {className: "lotusMessage2", role: "alert"}, container.domNode);
	   		   div.style.margin = "10px 0 0 0";
	   		var img = domConstruct.create("img", {className: "lconnSprite lconnSprite-iconError16", alt: errorAltMsg, title: errorAltMsg, src:errorImg}, div);
	   		img.style.marginRight = "10px";
	   		msg = domConstruct.create("span", {}, div);
	   		msg.appendChild(span);
			}
			else {
		      div = domConstruct.create("div", {className: "lconnEmpty", role: "alert"}, container.domNode);
		         msg = domConstruct.create("span", {}, div);
		            msg.appendChild(span);
		      var nls = i18nsocialEEStrings;
		      if (network.lastError) {
		         var errorDetails = JSON.stringify(network.lastError);
	   	      div = domConstruct.create("div", { className: "lotusChunk" }, container.domNode);
	   	         var showDetails = domConstruct.create("a", { href: "javascript:;" }, div);
	   	           showDetails.appendChild(windowModule.doc.createTextNode(nls.MESSAGE.MORE_DETAILS));
	   	         var hideDetails = domConstruct.create("a", { href: "javascript:;", style: {display:"none"}}, div);
	   	           hideDetails.appendChild(windowModule.doc.createTextNode(nls.MESSAGE.HIDE_DETAILS));
	   	         var details = domConstruct.create("div", {className: "lotusErrorDetails",  style:{display:"none"}}, div);
	   	           var ta = domConstruct.create("textarea", { className: "lotusText", style: { width: "100%", height: "200px" }}, details);
	   	              ta.appendChild(windowModule.doc.createTextNode(errorDetails));
		      on(showDetails, "click", lang.hitch(null, function() { 
			         showDetails.style.display = "none";
	                 hideDetails.style.display = "";
	                 details.style.display = "";
					 if (onSizeChange) { onSizeChange(); }
	          }));
	          on(hideDetails, "click", lang.hitch(null, function() {
	                 hideDetails.style.display = "none";
					 details.style.display = "none";
					 showDetails.style.display = "";
					 if (onSizeChange) { onSizeChange(); }
	          }));		  
	   	   }
			}
		};
		
	})();
	return com.ibm.social.ee.util.ErrorHandling;
});
