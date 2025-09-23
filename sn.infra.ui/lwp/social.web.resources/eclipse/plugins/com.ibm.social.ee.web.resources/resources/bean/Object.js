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

dojo.provide("com.ibm.social.ee.bean.Object");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.incontext.util.misc");
dojo.require("com.ibm.social.ee.bean.AtomBean");
dojo.require("com.ibm.social.ee.bean.User");

dojo.declare("com.ibm.social.ee.bean.Object", [com.ibm.social.ee.bean.AtomBean], {
   typeElementMap: {
       "id" : "propertyId",
       "html" : "propertyHtml",
       "string" : "propertyString",
       "boolean" : "propertyBoolean",
       "decimal" : "propertyDecimal",
       "integer" : "propertyInteger",
       "datetime" : "propertyDateTime",
       "uri" : "propertyUri"
   },

   /**
    *  Retrieve a single value property with a given type
    */
   getSingleValueProperty: function ( property, type ) {
  	   var value = null;
  	   if (type) {
  	      var el = this.typeElementMap[type];
	   	var node = com.ibm.social.incontext.util.dom.getElementMatchingAttributeValueNS(this.e, el,
	         com.ibm.social.incontext.util.dom.NAMESPACES.CMIS, "propertyDefinitionId", null, property);
	      value = node ? com.ibm.social.incontext.util.dom.getChildElementTextContentNS(node, "value", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS) : null;
	      value = this.convertValue(value, type);
	   }
      return value;
   },
   /**
    *  Retrieve a single property from the feed with a given type
    */
   getSingleProperty: function ( property, type) {
      if(type) {
         var el = this.typeElementMap[type];
         return com.ibm.social.incontext.util.dom.getElementMatchingAttributeValueNS(this.e, el,
            com.ibm.social.incontext.util.dom.NAMESPACES.CMIS, "propertyDefinitionId", null, property);
      }
      return null;
   },
   /**
    *  Retrieve a multi-value property with a given type. Value is returned as an array of strings
    */
   getMultiValueProperty: function (property, type) {
      var i, el = this.typeElementMap[type];
  	   var value = [];
  	   if (type) {
	   	 var node = com.ibm.social.incontext.util.dom.getElementMatchingAttributeValueNS(this.e, el,
	            com.ibm.social.incontext.util.dom.NAMESPACES.CMIS, "propertyDefinitionId", null, property);
	       if (node) {
	           var valueNodes = com.ibm.social.incontext.util.dom.getElementsByTagNameNS(node, "value", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS);
	           for (i = 0; i < valueNodes.length; i++) {
	              value.push(valueNodes[i].textContent ? valueNodes[i].textContent : valueNodes[i].innerText);
	           }
	       }
	       for (i = 0; i < value.length; i++) {
	          value[i] = this.convertValue(value[i], type);
	       }
	   }
      return value;
   },
   convertValue: function (value, type) {
      switch (type) {
         case "integer":
             return value === "" ? 0 : parseInt(value);
         case "decimal":
             return value === "" ? 0 : parseFloat(value);
         case "datetime":
             return com.ibm.social.incontext.util.misc.date.convertAtomDate(value);
         case "boolean":
             return (value == "true");
      }
      return value;
   },
	getAuthorEl: function() {
		if (! this.authorNode) {
			this.authorNode = com.ibm.social.incontext.util.dom.getElementsByTagNameNS(this.e, "author", com.ibm.social.incontext.util.dom.NAMESPACES.ATOM)[0];
		}
		
		return this.authorNode;
	},
	getAuthorDisplayName: function() {
		if (! this.authorDisplayName) {
         var n = this.getAuthorEl();
			this.authorName = com.ibm.social.incontext.util.dom.getChildElementTextContentNS(n, "name", com.ibm.social.incontext.util.dom.NAMESPACES.ATOM); 
		}
		
		return this.authorDisplayName;
	},
	getAuthorPrincipal: function() {
		if (! this.authorPrincipal) {
         var n = this.getAuthorEl();
			console.log(n);
			this.authorPrincipal = com.ibm.social.incontext.util.dom.getChildElementTextContentNS(n, "principalId", com.ibm.social.incontext.util.dom.NAMESPACES.LCMIS);
		}
		
		return this.authorPrincipal;
	},
   getName: function () {
      if(typeof this.name == "undefined") {
         this.name = this.getSingleValueProperty("cmis:name", "string");
      }
      return this.name;
   },
   getObjectId: function () {
      if(typeof this.objectId == "undefined") {
         this.objectId = this.getSingleValueProperty("cmis:objectId", "id");
      }
      return this.objectId;
   },
   getBaseTypeId: function () {
      if(typeof this.baseTypeId == "undefined") {
         this.baseTypeId = this.getSingleValueProperty("cmis:baseTypeId", "id");
      }
      return this.baseTypeId;
   },
   getObjectTypeId: function () {
      if(typeof this.objectTypeId == "undefined") {
         this.objectTypeId = this.getSingleValueProperty("cmis:objectTypeId", "id");
      }
      return this.objectTypeId;
   },
   getCreatedBy: function () {
      if(typeof this.createdBy == "undefined") {
         this.createdBy = this.getSingleValueProperty("cmis:createdBy", "string");
      }
      return this.createdBy;
   },
   getCreationDate: function () {
      if(typeof this.creationDate == "undefined") {
         this.creationDate = this.getSingleValueProperty("cmis:creationDate", "datetime");
      }
      return this.creationDate;
   },
   getLastModifiedByUser: function() {
      if (!this.modifiedUser)
         this.modifiedUser = new com.ibm.social.ee.bean.User(this.getSingleProperty("cmis:lastModifiedBy", "string"));
      return this.modifiedUser;
   },
   getLastModifiedBy: function () {
      if(typeof this.lastModifiedBy == "undefined") {
         this.lastModifiedBy = this.getSingleValueProperty("cmis:lastModifiedBy", "string");
      }
      return this.lastModifiedBy;
   },
   getModifier: function() {
      if (!this.modifier)
         this.modifier = {name: this.getLastModifiedBy()};
      return this.modifier;
   },
   getLastModificationDate: function () {
      if(typeof this.lastModificationDate == "undefined") {
         this.lastModificationDate = this.getSingleValueProperty("cmis:lastModificationDate", "datetime");
      }
      return this.lastModificationDate;
   },
   getContentStreamLastModified: function () {
      if(typeof this.contentStreamLastModified == "undefined") {
         this.contentStreamLastModified = this.getSingleValueProperty("snx:contentStreamLastModified", "datetime");
      }
      return this.contentStreamLastModified;
   },
   getChangeToken: function () {
      if(typeof this.changeToken == "undefined") {
         this.changeToken = this.getSingleValueProperty("cmis:changeToken", "string");
      }
      return this.changeToken;
   },
/*
   getAllowableActions: function() {
      var node = com.ibm.social.incontext.util.dom.getChildElementNS(this.e, "allowableActions", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS);
      if (node) {
         return new quickr.lw.bean.cmis.AllowableActions(node);
      }
      else {
         return null;
      }
   },
*/
   getDownLink: function() {
       return this.prependBase(com.ibm.social.incontext.util.uri.makeAtomUrlIESafe(com.ibm.social.incontext.util.dom.getChildElementAttributeMatchingNS(this.e, "link", com.ibm.social.incontext.util.dom.ATOM_NAMESPACE, "rel", null, "down", "href")));
   },

   /*****************************************/ 
   
   getId: function() {
      return this.getObjectId();
   },

   getCategory: function() {
      if(!this.category) {
         this.category = this._getCategory();
         if (!this.category) {
            var baseTypeNode = com.ibm.social.incontext.util.dom.getElementMatchingAttributeValueNS(this.e, "propertyId",
                     com.ibm.social.incontext.util.dom.NAMESPACES.CMIS,"propertyDefinitionId", null, "cmis:baseTypeId");
            var baseTypeId = baseTypeNode ? com.ibm.social.incontext.util.dom.getChildElementTextContentNS(baseTypeNode, "value", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS) : null;
            if (baseTypeId)
               this.category = baseTypeId;
            else
               this.category = null;
         }
      }
      return this.category;
   },

   getDescription: function() {
      if(!this.description) {
         var node = com.ibm.social.incontext.util.dom.getElementMatchingAttributeValueNS(this.e, "propertyString",
            com.ibm.social.incontext.util.dom.NAMESPACES.CMIS,"propertyDefinitionId", null, "snx:summary");
         this.description = node ? com.ibm.social.incontext.util.dom.getChildElementTextContentNS(node, "value", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS): null;
      }
      return this.description;
   },

   getPermissions: function() {
      var aaNodes = com.ibm.social.incontext.util.dom.getElementsByTagNameNS(this.e, "allowableActions",com.ibm.social.incontext.util.dom.NAMESPACES.CMIS);
      var p ={View: "true", Edit: "false", Delete: "false"};
      if(aaNodes.length > 0)
         p = {
            View: com.ibm.social.incontext.util.dom.getChildElementTextContentNS(aaNodes[0], "canGetProperties", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS) == "true",
            Edit: com.ibm.social.incontext.util.dom.getChildElementTextContentNS(aaNodes[0], "canUpdateProperties", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS) == "true",
            Delete: com.ibm.social.incontext.util.dom.getChildElementTextContentNS(aaNodes[0], "canDeleteObject", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS) == "true",
            Create: com.ibm.social.incontext.util.dom.getChildElementTextContentNS(aaNodes[0], "canCreateDocument", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS) == "true",
				GrantAccess: com.ibm.social.incontext.util.dom.getChildElementTextContentNS(aaNodes[0], "canApplyACL", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS) == "true",
				LockOverride: false, 
				// 2 meanings for AddChild: createDocument or file a document to folder(addObjectToFolder)
				// In the future we need to know if we are a folder or not to know which to use.
				AddChild: com.ibm.social.incontext.util.dom.getChildElementTextContentNS(aaNodes[0], "canCreateDocument", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS) == "true" || 
				          com.ibm.social.incontext.util.dom.getChildElementTextContentNS(aaNodes[0], "canAddObjectToFolder", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS) == "true",
				AddFolder: com.ibm.social.incontext.util.dom.getChildElementTextContentNS(aaNodes[0], "canCreateFolder", com.ibm.social.incontext.util.dom.NAMESPACES.CMIS) == "true"
         };
      return p;
   }
   /*****************************************/



});