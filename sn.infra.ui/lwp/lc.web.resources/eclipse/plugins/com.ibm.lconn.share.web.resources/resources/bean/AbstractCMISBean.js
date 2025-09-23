/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.AbstractCMISBean");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.text");

dojo.declare("lconn.share.bean.AbstractCMISBean", null, {
   _getCMISObjectNode: function() {
      if (!this._cmisObjectNode) {
         var qud = lconn.share.util.dom;
         // If we're an entry
         this._cmisObjectNode = qud.xpathNode(this.e, "cmisra:object");
         
         // If we're a feed
         if (!this._cmisObjectNode)
            this._cmisObjectNode = qud.xpathNode(this.e, "lcmis:viaResource/cmisra:object");
      }
      return this._cmisObjectNode;
   },

   getPropertyDateTime: function(name, defaultValue) {
      var value = this.getProperty("DateTime", name);
      if (value == null)
         return defaultValue;
      return value;
   },
   getPropertyBoolean: function(name, defaultValue) {
      var value = this.getProperty("Boolean", name);
      if (value == null)
         return defaultValue;
      return value == "true";
   },
   getPropertyInteger: function(name, defaultValue) {
      var value = this.getProperty("Integer", name);
      return lconn.share.util.text.parseInt(value, defaultValue);
   },
   getPropertyString: function(name, defaultValue) {
      var value = this.getProperty("String", name);
      if (value == null)
         return defaultValue;
      return value;
   },
   getPropertyId: function(name, defaultValue) {
      var value = this.getProperty("Id", name);
      if (value == null)
         return defaultValue;
      return value;
   },
   getProperty: function(type, name) {
      return lconn.share.util.dom.xpathString(this._getCMISObjectNode(), "cmis:properties/cmis:property"+type+"[@propertyDefinitionId='"+name+"']/cmis:value/text()");
   }
});
