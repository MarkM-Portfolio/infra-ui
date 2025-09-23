/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.data.FileFollowingDataStore");
dojo.require("dojo.string");
dojo.require("com.ibm.social.ee.data.FeedDataStore");
dojo.require("com.ibm.social.ee.bean.AtomBean");

dojo.declare("com.ibm.social.ee.data.FileFollowingDataStore", [com.ibm.social.ee.data.FeedDataStore], {
   _getPostBody: function (attrs) {
      var template = '<entry xmlns="http://www.w3.org/2005/Atom"><notifications xmlns="urn:ibm.com/td"><comment>${following}</comment><media>${following}</media></notifications><id>${id}</id></entry>';
      return dojo.string.substitute(template, { following: attrs.following ? "on" : "off" , id: 'urn:lsid:ibm.com:td:' + encodeURIComponent(attrs.id)});
   },
   isItem: function (item) {
      return true;
   },
   _getSaveItemUrl: function (item) {
      return this.url;
   },
   itemFromDocEl: function(el, base) {
      return new com.ibm.social.ee.bean.AtomBean(el, base);
   }
});