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

dojo.provide("com.ibm.social.ee.data.PeopleDataStore");

dojo.require("lconn.core.PeopleDataStoreOpenSocial");
dojo.require("com.ibm.social.incontext.util.url");

dojo.declare("com.ibm.social.ee.data.PeopleDataStore", [lconn.core.PeopleDataStoreOpenSocial], {
   
   constructor: function (args) {
      if (args.network) 
         this.network = args.network;
   },

   networkGet: function(opts) {
      if (opts.content)
         opts.url = com.ibm.social.incontext.util.url.rewrite(opts.url, opts.content);     
      this.network.get(opts);
   }

});