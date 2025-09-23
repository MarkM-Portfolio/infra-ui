/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.controls.EEPreviewDialogPortlet");

dojo.require("com.ibm.social.ee.controls.EEPreviewDialog");

dojo.declare("com.ibm.social.ee.controls.EEPreviewDialogPortlet", [com.ibm.social.ee.controls.EEPreviewDialog], {
   initPresentation: function() {
      return new com.ibm.oneui.controls.EEPreviewDialogPresentationPortlet({
          parent: this,
          updateContents: this.updateDialogContents,
          eeStrings: this._strings,
          master: this._getMasterPopup()
      });
   },
   getMainNodeForPage: function() {
	   return dojo.byId(this.mainBodyNodeId) || this.inherited(arguments);
   },
   _getPopupHorizontalPosition: function (popupNode) {
      var pos,
          offset = (popupNode.style.position == "fixed") ? dojo.position(dojo.body()).x : 0,
          arrowPos = dojo.position(this.arrowPopupNode, true);
          
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
      var portletContainer = dojo.byId(this.portletContainerId);
      if(!portletContainer) {
         return this.inherited(arguments);
      }
      // Set the margin space
      var marginSpace = 2;

      // Get the position of lotusMain
      var lotusMainPos = dojo.position(this.lotusMain, true);

      // Now get a horizontal position for the arrow
      var pos;
      var asPos = dojo.position(portletContainer, true);
      var OFFSET = 35;
      this.forceFlip = false;
      if(!this.isRTL) { 
         if((asPos.x + asPos.w - OFFSET + this.popupWidth) <= lotusMainPos.w) {
            pos = asPos.x + asPos.w - OFFSET;
            dojo.removeClass(this.arrowPopupNode, "asPortletFlip");
    	 } else if (asPos.x <= (lotusMainPos.w -(asPos.x + asPos.w) + OFFSET)) {
            pos = lotusMainPos.w - this.popupWidth - this.arrowWidth;
            dojo.removeClass(this.arrowPopupNode, "asPortletFlip");
         } else {
            pos = asPos.x + this.arrowWidth;
            this.forceFlip = true;
            dojo.addClass(this.arrowPopupNode, "asPortletFlip");
         }
      } else {
    	  
         if((asPos.x - this.popupWidth - this.arrowWidth + OFFSET) >= 0) {
        	pos = asPos.x + OFFSET;
            dojo.removeClass(this.arrowPopupNode, "asPortletFlip");            
         } else if ((dojo.position(dojo.body()).w - asPos.x - asPos.w) <= (this.popupWidth + this.arrowWidth)) {
        	 pos = lotusMainPos.x + this.popupWidth + this.arrowWidth + marginSpace;
        	 if(pos < asPos.x) {
        		 pos = asPos.x + OFFSET;
        	 }
             dojo.removeClass(this.arrowPopupNode, "asPortletFlip");             
         }else {
             pos = asPos.x + asPos.w - this.arrowWidth;
             this.forceFlip = true;
             dojo.addClass(this.arrowPopupNode, "asPortletFlip");					
         }
      }    	  
      return pos;
   },
   _getEncloseArrowCSSClasses: function() {
	   return "lotusActivityStreamPortlet lotusui30 lotusFlyout";
   },
   createDialogContents: function(item, node) {
	  dojo.addClass(this._getDomNode(), "icWidgetPortletsCommon");
      //Add portletUrlSettings to context so that EE gadget 
	  //may create an instance of PortletUrlUtil to resolve Connections urls
      if(item.context && this.portletUrlSettings){
         item.context.portletUrlSettings = this.portletUrlSettings;
      }
      return this.inherited(arguments);
   }
});

dojo.declare("com.ibm.oneui.controls.EEPreviewDialogPresentationPortlet", com.ibm.oneui.controls.EEPreviewDialogPresentation, {
   setTitle: function(popupTitle, url, eventType, actor, verb, context, previewDialog) {
      this.inherited(arguments);
      if(context && previewDialog && previewDialog.urlUpdater && previewDialog.urlUpdater.updateEEUrls)
    	  previewDialog.urlUpdater.updateEEUrls(this.titleNode,context);
   }
});
