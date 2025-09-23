/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {
   dojo.provide("lconn.core.InsertImageDialogFile");


   dojo.require("dojo.cache");
   dojo.require("dojo.i18n");
   dojo.require("dojo.string");

   dojo.require("dijit._Widget");
   dojo.require("dijit._Templated");

   dojo.require("lconn.core.utilities");
   dojo.require("lconn.core.util.text");
   dojo.require("lconn.core.util.html");


   dojo.requireLocalization("lconn.core", "insertimagedialog");

   var messages = dojo.i18n.getLocalization("lconn.core", "insertimagedialog");

   dojo.declare("lconn.core.InsertImageDialogFile", [ dijit._Widget, dijit._Templated], {

      messages: messages,
      templatePath: dojo.moduleUrl("lconn.core", "templates/InsertImageDialogFile.html"),
      
      /*mixins*/
      file: null,
      
      remove:function(file){
      },
      /*end mixins*/
      _remove:function(){
    	  this.remove(this);
    	  this.destroy();
      },
      
  	postMixInProperties: function() {
		var name = this._fileName = this.file.getName();
		this._fileIcon = lconn.core.utilities.getFileIconClassName(name, 16);
	},

  	_startHover: function() {
		dojo.addClass(this.labelRow, "lconnUploadHover");
	},
	
	_stopHover: function() {
		dojo.removeClass(this.labelRow, "lconnUploadHover");
	}
   });
   
})();
