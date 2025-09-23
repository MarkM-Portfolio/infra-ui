/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.sharebox.gadget.UploadFileBootstrap");

dojo.require("dijit.form.ComboBox");
dojo.require("lconn.core.config.services");
dojo.require("lconn.files.filesutil.FilesUtil");
dojo.require("lconn.core.filesutil");
dojo.require("lconn.files.uploadfile.UploadFileApp");
dojo.require("lconn.files.widget.UploadFile");
dojo.require("com.ibm.social.sharebox.TypeAheadUtil");
dojo.require("com.ibm.social.incontext.gadget.Bootstrap");

(function(){
   var _bootstrap = com.ibm.social.sharebox.gadget.UploadFileBootstrap;
   dojo.mixin(_bootstrap, com.ibm.social.incontext.gadget.Bootstrap);
   dojo.mixin(_bootstrap, {   
      getBodyClasses: function() {
         return "lotusui30 lotusui30_fonts lotusui30_layout lotusui30_body";
	   },
	   initializeKeyHandlers: function() {
   	   com.ibm.social.sharebox.TypeAheadUtil.registerHandlers();
	   }
   });
})();