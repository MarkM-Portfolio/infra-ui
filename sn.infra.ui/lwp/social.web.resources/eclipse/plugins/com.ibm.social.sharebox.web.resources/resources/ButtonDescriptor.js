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

dojo.provide("com.ibm.social.sharebox.ButtonDescriptor");

dojo.declare("com.ibm.social.sharebox.ButtonDescriptor", null, {
   
   constructor: function(opts) {
     // var nls = nls.SHAREBOX;
      this.id = opts.id || null;
      this.label = opts.label || null;
      this.a11y = opts.a11y || null;
      this.tooltip = opts.tooltip || null;
      this.handle = opts.handle || null;
   },
   getButton: function() {
      return {
         id: this.id,
         label: this.label,
         a11y: this.a11y,
         tooltip: this.tooltip,
         handle: this.handle
      };
   }
   

});
