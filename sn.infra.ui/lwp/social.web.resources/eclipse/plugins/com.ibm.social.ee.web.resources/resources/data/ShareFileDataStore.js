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

dojo.provide("com.ibm.social.ee.data.ShareFileDataStore");

dojo.require("com.ibm.social.ee.data.FeedDataStore");
dojo.require("com.ibm.social.incontext.util.url");
dojo.require("com.ibm.social.incontext.util.dom");

(function () { 
var util = com.ibm.social.incontext.util;   
dojo.declare("com.ibm.social.ee.data.ShareFileDataStore", com.ibm.social.ee.data.FeedDataStore, {   
   
   _getNewItemUrl: function () {      
      if (this.hasPublicCommunities && !this.isPublic) {
         return util.url.rewrite(this.url, { visibility: 'public' });
      }
      return this.url;
   },
   _getPostBody: function (attrs) {
      var descriptionText = attrs.shareMessage;
      var users = attrs.users;
      var readers = dojo.filter(users, function(u) {return u.role == "reader" && u.person;});
      var communities = dojo.filter(users, function(u) {return u.community;});
      var hasPublicCommunities = this.hasPublicCommunities = dojo.some(users, function(u) {return u.community ? (u.community.communityType != "private") : false;});
      this.isPublic = attrs.isPublic;      
      var visibility = hasPublicCommunities ? "public" : null;

      var hasChanges = false;
      
      var doc = util.dom.newXMLDocument("feed", util.dom.ATOM_NAMESPACE, [util.dom.DOCUMENTS_ATOM_NAMESPACE, util.dom.SNX_NAMESPACE]);

      if (readers.length) {
         hasChanges = true;
         var entry = util.dom.createElementNS(doc,"entry",util.dom.ATOM_NAMESPACE);
            var category = util.dom.createElementNS(doc,"category",util.dom.ATOM_NAMESPACE);
               category.setAttribute("term", "share");
               category.setAttribute("label", "share");
               category.setAttribute("scheme", "tag:ibm.com,2006:td/type");
            entry.appendChild(category);
   
            var uuid = util.dom.createElementNS(doc, "sharedWhat", util.dom.DOCUMENTS_ATOM_NAMESPACE);
               uuid.appendChild(doc.createTextNode(attrs.fileId));
            entry.appendChild(uuid);
   
            if (readers.length > 0) {
               var sharedWith = util.dom.createElementNS(doc, "sharedWith", util.dom.DOCUMENTS_ATOM_NAMESPACE);
                  var shareTransfer = util.dom.createElementNS(doc, "sharePermission", util.dom.DOCUMENTS_ATOM_NAMESPACE);
                     shareTransfer.appendChild(doc.createTextNode("View"));
                  sharedWith.appendChild(shareTransfer);
                  for (var i=0; i<readers.length; i++) {
                     var user = util.dom.createElementNS(doc, "user", util.dom.DOCUMENTS_ATOM_NAMESPACE);
                        var uri = util.dom.createElementNS(doc, "userid", util.dom.SNX_NAMESPACE);
                           uri.appendChild(doc.createTextNode(encodeURIComponent(readers[i].person.id)));
                        user.appendChild(uri);
                     sharedWith.appendChild(user);
                  }
               entry.appendChild(sharedWith);
            }

            var shareTransfer = util.dom.createElementNS(doc, "sharePermission", util.dom.DOCUMENTS_ATOM_NAMESPACE);
               shareTransfer.appendChild(doc.createTextNode("View"));
            entry.appendChild(shareTransfer);
   
            if (descriptionText && descriptionText.length > 0) {
               var summary = util.dom.createElementNS(doc,"summary",util.dom.ATOM_NAMESPACE);
                  summary.setAttribute("type","text");
                  summary.appendChild(doc.createTextNode(descriptionText));
               entry.appendChild(summary);
            }

         doc.documentElement.appendChild(entry);
      }
      for(var i=0; i < communities.length; i++) {
         hasChanges = true;
         var community = communities[i];
         
         var entry = util.dom.createElementNS(doc,"entry",util.dom.ATOM_NAMESPACE);
         var category = util.dom.createElementNS(doc,"category",util.dom.ATOM_NAMESPACE);
            category.setAttribute("term", "community");
            category.setAttribute("label", "community");
            category.setAttribute("scheme", "tag:ibm.com,2006:td/type");
         entry.appendChild(category);

         var itemId = util.dom.createElementNS(doc, "itemId", util.dom.DOCUMENTS_ATOM_NAMESPACE);
            itemId.appendChild(doc.createTextNode(communities[i].id));
         entry.appendChild(itemId);
         
         doc.documentElement.appendChild(entry);
      }

      var text = util.dom.serializeXMLDocument(doc, true);
   
      return text;      
   }
});

})();