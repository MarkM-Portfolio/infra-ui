/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-incontext/util/dom"
], function (declare, dom) {

	var Bean = declare("com.ibm.social.ee.bean.Bean", null, {
	   isFullyLoaded: false,
	   setBase: function(entry, base) {      
	      if(base)
	         this.base = base;
	      else if(entry)
	         this.base = dom.getAttributeNS(entry, "base", dom.XML_NAMESPACE);      
	   },
	   prependBase: function(url) {
		   if (this.base && url && url.indexOf(':') == -1)
		   	return this.base + url;
		   else
		   	return url;	   
	   },
	   getAttribute: function(attr) {
	      var ds = this.ds;
	      if (ds) {
	         var attrs = ds.attributes; 
	         if(attrs && attrs[attr])
	            return attrs[attr];
	      }
	      var methodName = this._methodName1(attr);
	      var method = this[methodName];
	      if (typeof method == "function") {
	         return method.call(this);
	      } 
	      else {
	         methodName = this._methodName2(attr);
	         method = this[methodName];
	         if (typeof method == "function") {
	            return method.call(this);
	         }
	         else if (typeof this[attr] != "undefined") {
	            return this[attr];
	         }
	      }
	      return null;
	   },
	   hasAttribute: function(attr) {
	      var ds = this.ds;
	      if (ds) {
	         var attrs = ds.attributes;
	         if (attrs && attrs[attr])
	            return true;
	      }
	      var methodName = this._methodName1(attr);
	      if (typeof this[methodName] == "function") {
	         return true;
	      } 
	      else {
	         methodName = this._methodName2(attr);
	         if (typeof this[methodName] == "function") {
	            return true;
	         } 
	         else if (typeof this[attr] != "undefined") {
	            return true;
	         }
	      }
	      return false;
	   },
	   _methodName1: function(attr) {
	      var name = ["get", attr.substring(0,1).toUpperCase(), attr.substring(1,attr.length)];
	      return name.join("");
	   },
	   _methodName2: function(attr) {
	      var name = ["is", attr.substring(0,1).toUpperCase(), attr.substring(1,attr.length)];
	      return name.join("");
	   },
	      
	   _attributeName: function(method, index) {
	      return method.substring(index,index+1).toLowerCase() + method.substring(index+1,method.length);
	   },
	   
	   getAttributes: function() {
	      var attrs = [];
	      for (var i in this) {
	         if (i == "getAttribute") continue;
	         if ((i.substring(0,2) == "is") && typeof this[i] == "function") {
	            attrs.push(this._attributeName(i, 2));
	         } else if ((i.substring(0,3) == "get") && typeof this[i] == "function") {
	            attrs.push(this._attributeName(i, 3));
	         }
	      }
	      return attrs;
	   }
	});
	return Bean;
});
