/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojox/data/XmlStore"
], function(declare, XmlStore) {

   /**
    * @author <a href="mailto:litong01@us.ibm.com">Tong Li</a>
    * @class com.ibm.mm.data.xml
    * @name com.ibm.mm.data.xml
    */
   var xml = declare("com.ibm.mm.data.xml", XmlStore, {

      getValueType : function( /* Object */item, /* String */attribute) {
         if ('tagName' == attribute)
            return "text";
         if ('childNodes' == attribute) {
            if (item.element != null) {
               // all child nodes make a json object. so let's simply return
               // json as its type.
               return "json";

               // in case we want to use the item type to indicate type, then we
               // use the following code.
               var theType = item.element.getAttribute("type");
               if (theType == null) {
                  return "json";
               }
               else {
                  return theType;
               }
            }
         }
         var theValue = this.getValue(item, attribute);
         if (theValue instanceof dojox.data.XmlItem) {
            theType = this.getValue(theValue, "@type");
            if (theType == null) {
               theType = "text";
            }
            return theType;
         }
         else {
            return "text";
         }
      },

      getAttributes : function(/* item */item) {
         // summary:
         // Return an array of attribute names
         // description:
         // 'item' must be an instance of a dojox.data.XmlItem from the store
         // instance.
         // tag names of child elements and XML attribute names of attributes
         // specified to the element are returned along with special attribute
         // names applicable to the element including "tagName", "childNodes"
         // if the element has child elements, "text()" if the element has
         // child text nodes, and attribute names in '_attributeMap' that match
         // the tag name of the element.
         // item:
         // An XML element
         // returns:
         // An array of attributes found
         var element = item.element;
         var attributes = [];
         attributes.push("tagName");
         if (element.childNodes.length > 0) {
            var names = {};
            var childNodes = true;
            var text = false;
            for (var i = 0; i < element.childNodes.length; i++) {
               var node = element.childNodes[i];
               if (node.nodeType === 1 /* ELEMENT_NODE */) {
                  var name = node.nodeName;
                  if (!names[name]) {
                     attributes.push(name);
                     names[name] = name;
                  }
                  childNodes = true;
               }
               else if (node.nodeType === 3) {
                  text = true;
               }
            }
            if (childNodes) {
               attributes.push("childNodes");
            }
            /*
             * if(text){ attributes.push("text()"); }
             */
         }
         for (var i = 0, att; i < element.attributes.length; i++) {
            att = element.attributes[i].nodeName;
            if ('type' != att) {
               attributes.push(element.attributes[i].nodeName);
            }
         }
         if (this._attributeMap) {
            for ( var key in this._attributeMap) {
               var i = key.indexOf('.');
               if (i > 0) {
                  var tagName = key.substring(0, i);
                  if (tagName === element.nodeName) {
                     attributes.push(key.substring(i + 1));
                  }
               }
               else { // global attribute
                  attributes.push(key);
               }
            }
         }
         return attributes; // array
      },

      serialize : function() {
         // not implemented yet.
         return "";
      }
   });
   return xml;
});
