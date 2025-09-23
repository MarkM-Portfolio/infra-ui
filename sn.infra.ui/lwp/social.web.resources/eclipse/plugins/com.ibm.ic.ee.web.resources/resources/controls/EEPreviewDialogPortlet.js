/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/window",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/dom-geometry",
	"ic-ee/controls/EEPreviewDialog"
], function (declare, windowModule, dom, domClass, domGeometry, EEPreviewDialog) {

	var EEPreviewDialogPortlet = declare("com.ibm.social.ee.controls.EEPreviewDialogPortlet", EEPreviewDialog, {
	   initPresentation: function() {
	      return new com.ibm.oneui.controls.EEPreviewDialogPresentationPortlet({
	          parent: this,
	          updateContents: this.updateDialogContents,
	          eeStrings: this._strings,
	          master: this._getMasterPopup()
	      });
	   },
	   getMainNodeForPage: function() {
		   return dom.byId(this.mainBodyNodeId) || this.inherited(arguments);
	   },
	   _getPopupHorizontalPosition: function (popupNode) {
	      var pos,
	          offset = (popupNode.style.position == "fixed") ? domGeometry.position(windowModule.body()).x : 0,
	          arrowPos = domGeometry.position(this.arrowPopupNode, true);
	          
	      if(!this.isRTL) {
	         if(this.forceFlip) {
	            pos = arrowPos.x - this.popupWidth + offset;
	         } else {
	        	pos = arrowPos.x + this.arrowWidth + offset;
	         }
	      } else {
	         if(this.forceFlip) {
	       	    pos = arrowPos.x + offset;
	         } else {
	            pos = arrowPos.x - this.popupWidth - this.arrowWidth;
	         }
	      }
	
	      return pos;
	   },
	   _getArrowHorizontalPosition: function () {
	      var portletContainer = dom.byId(this.portletContainerId);
	      if(!portletContainer) {
	         return this.inherited(arguments);
	      }
	      // Set the margin space
	      var marginSpace = 2;
	
	      // Get the position of lotusMain
	      var lotusMainPos = domGeometry.position(this.lotusMain, true);
	
	      // Now get a horizontal position for the arrow
	      var pos;
	      var asPos = domGeometry.position(portletContainer, true);
	      var OFFSET = 35;
	      this.forceFlip = false;
	      if(!this.isRTL) { 
	         if((asPos.x + asPos.w - OFFSET + this.popupWidth) <= lotusMainPos.w) {
	            pos = asPos.x + asPos.w - OFFSET;
	            domClass.remove(this.arrowPopupNode, "asPortletFlip");
	    	 } else if (asPos.x <= (lotusMainPos.w -(asPos.x + asPos.w) + OFFSET)) {
	            pos = lotusMainPos.w - this.popupWidth - this.arrowWidth;
	            domClass.remove(this.arrowPopupNode, "asPortletFlip");
	         } else {
	            pos = asPos.x + this.arrowWidth;
	            this.forceFlip = true;
	            domClass.add(this.arrowPopupNode, "asPortletFlip");
	         }
	      } else {
	    	  
	         if((asPos.x - this.popupWidth - this.arrowWidth + OFFSET) >= 0) {
	        	pos = asPos.x + OFFSET;
	            domClass.remove(this.arrowPopupNode, "asPortletFlip");            
	         } else if ((domGeometry.position(windowModule.body()).w - asPos.x - asPos.w) <= (this.popupWidth + this.arrowWidth)) {
	        	 pos = lotusMainPos.x + this.popupWidth + this.arrowWidth + marginSpace;
	        	 if(pos < asPos.x) {
	        		 pos = asPos.x + OFFSET;
	        	 }
	             domClass.remove(this.arrowPopupNode, "asPortletFlip");             
	         }else {
	             pos = asPos.x + asPos.w - this.arrowWidth;
	             this.forceFlip = true;
	             domClass.add(this.arrowPopupNode, "asPortletFlip");					
	         }
	      }    	  
	      return pos;
	   },
	   _getEncloseArrowCSSClasses: function() {
		   return "lotusActivityStreamPortlet lotusui30 lotusFlyout";
	   },
	   createDialogContents: function(item, node) {
		  domClass.add(this._getDomNode(), "icWidgetPortletsCommon");
	      //Add portletUrlSettings to context so that EE gadget 
		  //may create an instance of PortletUrlUtil to resolve Connections urls
	      if(item.context && this.portletUrlSettings){
	         item.context.portletUrlSettings = this.portletUrlSettings;
	      }
	      return this.inherited(arguments);
	   }
	});
	
	declare("com.ibm.oneui.controls.EEPreviewDialogPresentationPortlet", com.ibm.oneui.controls.EEPreviewDialogPresentation, {
	   setTitle: function(popupTitle, url, eventType, actor, verb, context, previewDialog) {
	      this.inherited(arguments);
	      if(context && previewDialog && previewDialog.urlUpdater && previewDialog.urlUpdater.updateEEUrls)
	    	  previewDialog.urlUpdater.updateEEUrls(this.titleNode,context);
	   }
	});
	
	return EEPreviewDialogPortlet;
});
