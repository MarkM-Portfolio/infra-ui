/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.gadget.services.dialog.IframeDialog");

dojo.require("dijit.Dialog");

dojo.requireLocalization("com.ibm.lconn.gadget", "iframeDialogStrings");

dojo.declare("com.ibm.lconn.gadget.services.dialog.IframeDialog",
	null,
	/** @lends com.ibm.lconn.gadget.services.dialog.IframeDialog# */
	{	 
		nls : dojo.i18n.getLocalization("com.ibm.lconn.gadget", "iframeDialogStrings"),
	   _w : 500,
	   _h : 500,
	   _url : "",
	   _ifElement : null,
	   _dialog : null,
	   _wRegex : /width=(\d+)/,
	   _hRegex : /height=(\d+)/,
	   isAuto : null,
	   
	   /** @constructs
	    * @class Creates a dijit dialog that wraps an iframe, can replace uses of window.open
	    * @param url {String} The URL to load in the iframe
	    * @param windowOptions {String} a string of options compatible with the windowOptions parameter of window.open, 
	    * @param isAuto
	    * currently only width and height are supported
	    */
	   constructor: function(url, windowOptions, isAuto) {
		   this._url = url;
		   this.isAuto = isAuto;
		   if(windowOptions){
			   var wmatch, hmatch;
			   if(wmatch = windowOptions.match(this._wRegex))
				   this._w = wmatch[1]
			   if(hmatch = windowOptions.match(this._hRegex))
				   this._h = hmatch[1]
		   }
	   },
	   
	   init: function(iframeId, iframeContainerId){
		   if(!this._dialog){
			   var dialog = this._dialog = new dijit.Dialog({
				   title: this.nls.dialogTitle,
				   "class": "lcSharebox" 
			   });
			   
			   // have to construct this carefully
			   // the name cannot be changed after creation in IE
			   var temp = document.createElement("div");
			   var ifElementSource = "<iframe";
			   if(iframeId) {
				   ifElementSource += " id='" + iframeId + "'";
				   ifElementSource += " name='" + iframeId + "'";
			   }
//			   ifElementSource += " src='" + this._url + "'";
			   ifElementSource += "></iframe>";
			   temp.innerHTML = ifElementSource;
			   var ifElement= this._ifElement = temp.firstChild;
			   
			   if(iframeContainerId) {
				   dojo.attr(dialog.containerNode, "id", iframeContainerId);
			   }
			   
			   dojo.attr(ifElement, "src", this._url);
			   
			   if(this._w)
				   ifElement.style.width = this._w+"px";
			   if(this._h)
				   ifElement.style.height = this._h+"px";
			   
			   dialog.attr("content", ifElement);
			   
			   dojo.connect(dialog, "onHide", this, "onClose");
		   }
	   },
	   
	   show: function(){
		   this._dialog.show();
	   },
	   
	   /** returns the actual DOM Window encapsulated by the dialog */
	   getWindow: function(){
		   return this._ifElement.contentWindow;
	   },

	   hide: function(){
		   this._dialog.hide();
	   },
	   
	   destroy: function(){
		   this._dialog.destroyRecursive(false);
	   },
	   
	   onClose: function(){}
	}
);
