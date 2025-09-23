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

dojo.provide("com.ibm.social.ee.bean.AtomBean");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.uri");
dojo.require("com.ibm.social.incontext.util.misc");
dojo.require("com.ibm.social.ee.bean.Bean");
dojo.require("com.ibm.social.ee.bean.User");

(function () {
var util = com.ibm.social.incontext.util;
dojo.declare("com.ibm.social.ee.bean.AtomBean", com.ibm.social.ee.bean.Bean, {
   constructor: function(entry, base, values) {
      this.e = entry;
      this.setBase(entry, base);
      if (values)
         dojo.mixin(this, values);
   },
   setDocumentElement: function(doc) {
      this.e = doc;
      this.setBase(this.e);
      this.category = null;
      this.atomId = null;
      this.id = null;
      this.title = null;
      this.description = null;
      this.author = null;
      this.updated = null;
      this.permissions = null;
      this.modifier = null;
      this.modified = null;
   },
   getEntry: function() {return this.e;},
   getCategory: function() {
      if (!this.category) {
         this.category = util.dom.getChildElementNSAttribute(this.e, "category", util.dom.ATOM_NAMESPACE, "term");
      }
      return this.category;
   },   
   getAtomId: function() {
      if (!this.atomId) {
         this.atomId = util.dom.getChildElementTextContentNS(this.e, "id", util.dom.ATOM_NAMESPACE);
         if (!this.atomId || this.atomId === "") {
            this.throwRequiredPropertyError("id");
         }
      }
      return this.atomId;
   },
   getTitle: function() {
      if(!this.title) {
         this.title = util.dom.getChildElementTextContentNS(this.e, "title", util.dom.ATOM_NAMESPACE);
         //if (!this.title || this.title == "") {
         //   this.throwRequiredPropertyError("title");
         //}
      }
      return this.title;
   },   
   getDescription: function() {
      if (!this.description) {
         this.description = util.dom.getChildElementTextContentNS(this.e, "summary", util.dom.ATOM_NAMESPACE);
         if (!this.description && this.description !== "") {
            this.throwRequiredPropertyError("summary");
         }
      }
      return this.description;
   },
   getContents: function() {return this.getContent();},
   getContent: function() {return util.dom.getChildElementTextContentNS(this.e, "content", util.dom.ATOM_NAMESPACE);}, 
   getAuthor: function() {
      if (!this.author)
         this.author = new com.ibm.social.ee.bean.User(util.dom.getElementsByTagNameNS(this.e, "author", util.dom.ATOM_NAMESPACE)[0]);
      return this.author;
   },
   getOwner: function() {
      return this.getAuthor();
   },
   getCreator: function() {
      return this.getAuthor();
   },
   getUpdated: function() {      
      if (!this.updated) {
         this.updated = util.misc.date.convertAtomDate(util.dom.getChildElementTextContentNS(this.e, "updated", util.dom.ATOM_NAMESPACE));
         if (!this.updated)
            this.throwRequiredPropertyError("updated");
      }
      return this.updated;
   },
   getPublished: function() {
      if (!this.published) {
         this.published = util.misc.date.convertAtomDate(util.dom.getChildElementTextContentNS(this.e, "published", util.dom.ATOM_NAMESPACE));
         if (!this.published)
            this.throwRequiredPropertyError("published");
      }
      return this.published;
   },
   getUrlDownload: function() {
      return this.prependBase(util.dom.getChildElementAttributeMatchingNS(this.e, "link", util.dom.ATOM_NAMESPACE, "rel", null, "enclosure", "href"));
   },
   getUrlAlternate: function() {return util.dom.getChildElementAttributeMatchingNS(this.e, "link", util.dom.ATOM_NAMESPACE, "rel", null, "alternate", "href", null, true);},
   getUrlEntry: function() {return this.prependBase(util.uri.makeAtomUrlIESafe(util.dom.getChildElementAttributeMatchingNS(this.e, "link", util.dom.ATOM_NAMESPACE, "rel", null, "self", "href")));},
   getUrlFeed: function() {return this.prependBase(util.uri.makeAtomUrlIESafe(util.dom.getChildElementAttributeMatchingNS(this.e, "link", util.dom.ATOM_NAMESPACE, "rel", null, "replies", "href")));},
   
   //qkr extensions below this point
   getId: function() {
      if (!this.id) {
      	this.id = util.dom.getChildElementTextContentNS(this.e, "uuid", util.dom.DOCUMENTS_ATOM_NAMESPACE);
      	if (!this.id || this.id.length === 0) {
            this.id = util.dom.getChildElementTextContentNS(this.e, "id", util.dom.ATOM_NAMESPACE);
   	      var namespace = "urn:lsid:ibm.com:td:";
   	      var index = this.id.indexOf(namespace);
   	      if (index != -1) {
   	         this.id = this.id.substring(index + namespace.length);
   	      }
         }
      }
   	return this.id;
   },   
   getLabel: function() {return util.dom.getChildElementTextContentNS(this.e, "label", util.dom.DOCUMENTS_ATOM_NAMESPACE);},
  	getName: function() {var name = this.getLabel(); if (!name || name.length === 0) name = this.getTitle(); return name;},
   getModifier: function() {
      if (!this.modifier)
         this.modifier = new com.ibm.social.ee.bean.User(util.dom.getElementsByTagNameNS(this.e, "modifier", util.dom.DOCUMENTS_ATOM_NAMESPACE)[0]);
      return this.modifier;
   },
   getPermissions: function() {
      if (!this.permissions) {
         this.permissions = this._getPermissions("permissions");
      }
      return this.permissions;
   },
   _getPermissions: function(permElemName) {
      var s = util.dom.getChildElementTextContentNS(this.e, permElemName, util.dom.DOCUMENTS_ATOM_NAMESPACE);         
      var p = {View:true};
      if (s) {
         s = util.text.trim(s);
         dojo.forEach(s.split(/\s*,\s*/), function(a) {if (a && a.length > 0) p[a] = true;});
      }
      return p;
   },
   getModified: function() {
      if (!this.modified) {
         this.modified = util.misc.date.convertAtomDate(util.dom.getChildElementTextContentNS(this.e, "modified", util.dom.DOCUMENTS_ATOM_NAMESPACE)) || this.getUpdated();
      }
      return this.modified;
   },
   getCreated: function() {
      if (!this.created) {
         this.created = util.misc.date.convertAtomDate(util.dom.getChildElementTextContentNS(this.e, "created", util.dom.DOCUMENTS_ATOM_NAMESPACE)) || this.getPublished();
      }
      return this.created;
   },
   throwRequiredPropertyError: function(property) {
      //throw new Error({type: "RequiredProperty", message: "Property " + property + " is required"});
      //for now just do a console.error;
      console.error("Property '" + property + "' is required");
   }
});
})();