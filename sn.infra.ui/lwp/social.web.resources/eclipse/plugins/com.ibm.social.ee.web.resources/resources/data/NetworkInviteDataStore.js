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

dojo.provide("com.ibm.social.ee.data.NetworkInviteDataStore");
dojo.require("com.ibm.social.ee.data.DataStore");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.declare("com.ibm.social.ee.data.NetworkInviteDataStore", [com.ibm.social.ee.data.DataStore], {
   _op: null,
   _status: null,
   _uuid: null,
   url: null,
   network: null,
   constructor: function(opt) {
      dojo.mixin(this, opt);
   },
   _fetch: function (args) {
      var q = args.query;
      if (dojo.isObject(q) && q.uuid) {
         if (args.onBegin)
            args.onBegin.call(args.scope, 1, args);
         if (args.onItem)
            args.onItem.call(args.scope, q, args);
         if (args.onComplete)
            args.onComplete.call(args.scope, [args], args);
      }
   },
   deleteItem: function (item) {
      this._op = "delete";
   },
   setValue: function (item, attr, value) {
      this._op = "update";
      if (attr == "status")
         this._status = value;
      this._uuid = item.uuid;
   },
   save: function (args) {
      if (this._op == "delete") {
         dojo.publish("com/ibm/social/ee/networkInvite/beforeIgnore");
         this.network.deleteXml({
            url: this.url,
            load: dojo.hitch(this, this._deleteOccurred, args),
            error: dojo.hitch(this, this._deleteError, args),
            noTimeout: true
         });
      }
      else if (this._op == "update") {
         dojo.publish("com/ibm/social/ee/networkInvite/beforeAccept");
         this.network.putXml({
            url: this.url,
            headers: { "Content-Type": "application/atom+xml" },
            postData: this._setupAcceptBody(),
            load: dojo.hitch(this, this._acceptOccurred, args),
            error: dojo.hitch(this, this._acceptError, args),
            noTimeout: true
         });
      }
   },
   _setupAcceptBody: function() {
      var du = com.ibm.social.incontext.util.dom;
      var tu = com.ibm.social.incontext.util.text;
      var doc = du.newXMLDocument("entry",du.ATOM_NAMESPACE, [du.SNX_NAMESPACE]);
      var entry = doc.documentElement;
      var atomId = du.createElementNS(doc,"id",du.ATOM_NAMESPACE);
          atomId.appendChild(doc.createTextNode("tag:profiles.ibm.com,2006:entry" + this._uuid));
      entry.appendChild(atomId);

      var category = du.createElementNS(doc,"category",du.ATOM_NAMESPACE);
         category.setAttribute("term", "connection");
         category.setAttribute("scheme", "http://www.ibm.com/xmlns/prod/sn/type");
      entry.appendChild(category);
      
      category = du.createElementNS(doc,"category",du.ATOM_NAMESPACE);
         category.setAttribute("term", "colleague");
         category.setAttribute("scheme", "http://www.ibm.com/xmlns/prod/sn/connection/type");
      entry.appendChild(category);
      
      category = du.createElementNS(doc,"category",du.ATOM_NAMESPACE);
         category.setAttribute("term", this._status);
         category.setAttribute("scheme", "http://www.ibm.com/xmlns/prod/sn/status");
      entry.appendChild(category);            
      
      var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
      return tu.trim(postBody);      
   },
   _acceptOccurred: function (args) {
      dojo.publish("com/ibm/social/ee/networkInvite/accepted");
      if (args.onComplete)
         args.onComplete.call(null);
   },
   _acceptError: function (args, error) {
      if (args.onError)
         args.onError.call(null);
   },
   _deleteOccurred: function (args) {
      dojo.publish("com/ibm/social/ee/networkInvite/ignored");
      if (args.onComplete) {
         args.onComplete.call(null);
      }
   },
   _deleteError: function (args, error) {
      if (args.onError)
         args.onError.call(null);
   }
});