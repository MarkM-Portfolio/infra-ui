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

dojo.provide("com.ibm.social.sharebox.TypeAheadUtil");


(function () {
   var util = com.ibm.social.sharebox.TypeAheadUtil;
   
   function preventCloseOnEscape() {
      ibm.connections.sharedialog.preventCloseOnEsc();
   }
   
   function allowCloseOnEscape() {
      ibm.connections.sharedialog.enableCloseOnEsc();
   }
   
   util.registerHandlers = function() {
      if (dojo.getObject("ibm.connections.sharedialog")) {
         dojo.subscribe("lconn/core/mentions/startTrack", preventCloseOnEscape);
         dojo.subscribe("lconn/core/mentions/stopTrack", allowCloseOnEscape);
         dojo.subscribe("lconn/core/mentions/blur", allowCloseOnEscape);
         dojo.subscribe("lconn/core/mentions/focus", function(tracking) { if(tracking) { preventCloseOnEscape(); }});
      }
   }
})();