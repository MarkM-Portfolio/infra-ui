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

dojo.provide("com.ibm.social.ee.gadget._SimpleEEGadget");

dojo.require("com.ibm.social.ee.gadget._EEGadget");

dojo.declare("com.ibm.social.ee.gadget._SimpleEEGadget", [com.ibm.social.ee.gadget._EEGadget], {
   constructor: function(opts) {
      dojo.mixin(this, opts);
   }
});