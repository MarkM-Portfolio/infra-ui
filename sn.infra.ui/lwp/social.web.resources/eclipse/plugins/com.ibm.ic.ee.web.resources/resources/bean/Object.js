/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean",
	"ic-ee/bean/User",
	"ic-incontext/util/dom",
	"ic-incontext/util/misc",
	"ic-incontext/util/uri"
], function (declare, AtomBean, User, dom, misc, uri) {

	var Object = declare("com.ibm.social.ee.bean.Object", AtomBean, {
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
		   	var node = dom.getElementMatchingAttributeValueNS(this.e, el,
		         dom.NAMESPACES.CMIS, "propertyDefinitionId", null, property);
		      value = node ? dom.getChildElementTextContentNS(node, "value", dom.NAMESPACES.CMIS) : null;
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
	         return dom.getElementMatchingAttributeValueNS(this.e, el,
	            dom.NAMESPACES.CMIS, "propertyDefinitionId", null, property);
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
		   	 var node = dom.getElementMatchingAttributeValueNS(this.e, el,
		            dom.NAMESPACES.CMIS, "propertyDefinitionId", null, property);
		       if (node) {
		           var valueNodes = dom.getElementsByTagNameNS(node, "value", dom.NAMESPACES.CMIS);
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
	             return misc.date.convertAtomDate(value);
	         case "boolean":
	             return (value == "true");
	      }
	      return value;
	   },
		getAuthorEl: function() {
			if (! this.authorNode) {
				this.authorNode = dom.getElementsByTagNameNS(this.e, "author", dom.NAMESPACES.ATOM)[0];
			}
			
			return this.authorNode;
		},
		getAuthorDisplayName: function() {
			if (! this.authorDisplayName) {
	         var n = this.getAuthorEl();
				this.authorName = dom.getChildElementTextContentNS(n, "name", dom.NAMESPACES.ATOM); 
			}
			
			return this.authorDisplayName;
		},
		getAuthorPrincipal: function() {
			if (! this.authorPrincipal) {
	         var n = this.getAuthorEl();
				console.log(n);
				this.authorPrincipal = dom.getChildElementTextContentNS(n, "principalId", dom.NAMESPACES.LCMIS);
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
	         this.modifiedUser = new User(this.getSingleProperty("cmis:lastModifiedBy", "string"));
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
	       return this.prependBase(uri.makeAtomUrlIESafe(dom.getChildElementAttributeMatchingNS(this.e, "link", dom.ATOM_NAMESPACE, "rel", null, "down", "href")));
	   },
	
	   /*****************************************/ 
	   
	   getId: function() {
	      return this.getObjectId();
	   },
	
	   getCategory: function() {
	      if(!this.category) {
	         this.category = this._getCategory();
	         if (!this.category) {
	            var baseTypeNode = dom.getElementMatchingAttributeValueNS(this.e, "propertyId",
	                     dom.NAMESPACES.CMIS,"propertyDefinitionId", null, "cmis:baseTypeId");
	            var baseTypeId = baseTypeNode ? dom.getChildElementTextContentNS(baseTypeNode, "value", dom.NAMESPACES.CMIS) : null;
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
	         var node = dom.getElementMatchingAttributeValueNS(this.e, "propertyString",
	            dom.NAMESPACES.CMIS,"propertyDefinitionId", null, "snx:summary");
	         this.description = node ? dom.getChildElementTextContentNS(node, "value", dom.NAMESPACES.CMIS): null;
	      }
	      return this.description;
	   },
	
	   getPermissions: function() {
	      var aaNodes = dom.getElementsByTagNameNS(this.e, "allowableActions",dom.NAMESPACES.CMIS);
	      var p ={View: "true", Edit: "false", Delete: "false"};
	      if(aaNodes.length > 0)
	         p = {
	            View: dom.getChildElementTextContentNS(aaNodes[0], "canGetProperties", dom.NAMESPACES.CMIS) == "true",
	            Edit: dom.getChildElementTextContentNS(aaNodes[0], "canUpdateProperties", dom.NAMESPACES.CMIS) == "true",
	            Delete: dom.getChildElementTextContentNS(aaNodes[0], "canDeleteObject", dom.NAMESPACES.CMIS) == "true",
	            Create: dom.getChildElementTextContentNS(aaNodes[0], "canCreateDocument", dom.NAMESPACES.CMIS) == "true",
					GrantAccess: dom.getChildElementTextContentNS(aaNodes[0], "canApplyACL", dom.NAMESPACES.CMIS) == "true",
					LockOverride: false, 
					// 2 meanings for AddChild: createDocument or file a document to folder(addObjectToFolder)
					// In the future we need to know if we are a folder or not to know which to use.
					AddChild: dom.getChildElementTextContentNS(aaNodes[0], "canCreateDocument", dom.NAMESPACES.CMIS) == "true" || 
					          dom.getChildElementTextContentNS(aaNodes[0], "canAddObjectToFolder", dom.NAMESPACES.CMIS) == "true",
					AddFolder: dom.getChildElementTextContentNS(aaNodes[0], "canCreateFolder", dom.NAMESPACES.CMIS) == "true"
	         };
	      return p;
	   }
	   /*****************************************/
	
	
	
	});
	return Object;
});
