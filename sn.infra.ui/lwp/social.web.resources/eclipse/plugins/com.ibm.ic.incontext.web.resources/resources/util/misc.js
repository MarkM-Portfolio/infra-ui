/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/date/stamp",
	"dojo/dom-style",
	"dojo/dom",
	"dijit/registry"
], function (dojo, array, lang, stamp, domStyle, dom) {

	dojo.j = lang.getObject("Jiffy") || {mark: function() {},measure: function() {}};
	
	
	var html = declare("com.ibm.social.incontext.util.misc", null, {
	   indexById: function(arr, attr, value) {
	      if (arr)
	         for (var i=0; i<arr.length; i++)
	            if (arr[i] && arr[i][attr] == value)
	               return arr[i];
	   },
	   
	   /**
	    * Constructors in Javascript cannot be invoked with a dynamic argument array,
	    * hence we arbitrarily pass 7 arguments to the constructor function.
	    */
	   initFromArray: function(obj,a,b,c,d,e,f,g) {
	      var type;
	      if (obj === null)
	         return null;
	      type = typeof obj;
	      if (type == "function")
	         return obj(a,b,c,d,e,f,g);
	      var arr = [];
	      if (lang.isArray(obj)) {
	         for (var i=0; i<obj.length; i++) {
	            var o = obj[i];
	            type = typeof o;
	            if (type == "function")
	               arr[i] = o(a,b,c,d,e,f,g);
	            if (type == "string")
	               arr[i] = new lang.getObject(o)(a,b,c,d,e,f,g);
	         }
	      }
	      return arr;
	   },
	
	   // Example usages:
	   //   com.ibm.social.incontext.util.misc.sort(Array) - sorts in default order
	   //   com.ibm.social.incontext.util.misc.sort(Array, "name") - sorts by "name" attribute in ascending order
	   //   com.ibm.social.incontext.util.misc.sort(Array, ["name",-1]) - sorts by "name" attribute in descending order
	   //   com.ibm.social.incontext.util.misc.sort(Array, "weight", "name") - sorts by "weight", then by "name" in ascending order
	   //   com.ibm.social.incontext.util.misc.sort(Array, ["weight",-1], "name") - sorts by "weight" in descending order, then by "name" in ascending order
	   sort: function(arr) {
	      // Can't sort non-arrays or arrays of length 0-1
	      if (!lang.isArray(arr) || arr.length < 2)
	         return arr;
	   
	      // If no parameters were given, use default sort
	      if (arguments.length == 1)
	         return arr.sort();
	
	      // Save our sort args
	      var keys = arguments;
	      var orders = [];
	      for (var i=1; i<keys.length; i++) {
	         var key = keys[i];
	         var order = 1;
	         if (lang.isArray(key)) {
	            order = key[1];
	            key = key[0];
	         }
	         var f = (typeof arr[0][key] == "string" && "".localeCompare)
	               ? com.ibm.social.incontext.util.misc.orderLocale
	               : com.ibm.social.incontext.util.misc.order;
	         orders.push(lang.partial(f, key, order));
	      }
	      
	      if (orders.length == 1)
	         return arr.sort(orders[0]);
	
	      return arr.sort(function(a,b) {
	         var l = orders.length;
	         for(var i=0; i < l; i++) {
	            var c = orders[i](a,b);
	            if (c !== 0)
	               return c;
	         }
	         return 0;
	      });
	   },
	   
	   slice: function(source, f, obj) {
	      var out = [];
	      for (var i=0; i<source.length;) {
	         var current = source[i];
	         if (f.call(obj, current)) {
	            out.push(current);
	            source.splice(i, 1);
	         }
	         else
	            i++;
	      }
	      return out;
	   },
	   
	   hitchDeferred: function(dfd) {
	      return function(value) {
	         dfd.callback.apply(dfd, arguments);
	         return value;
	      };
	   },
	   
	   orderLocale: function(key, order, a, b) {
	      return a[key].localeCompare(b[key]) * order;
	   },
	   
	   order: function(key, order, a, b) {
	      a = a[key];
	      b = b[key];
	      if (a == b)
	         return 0;
	      return (a > b ? 1 : -1) * order;
	   },
	
		destroy: function() {
		   var i;
	      if (arguments.length > 1)
	         for (i=0;i<arguments.length;i++)
	            com.ibm.social.incontext.util.misc.destroy(arguments[i]);
	      else if (arguments.length == 1) {
	         var arg = arguments[0];
	         if (arg && typeof arg == "object" && arg.length > 0) {
	            for (i=0;i<arg.length;i++)
	               com.ibm.social.incontext.util.misc.destroy(arg[i]);
	         }
	         else {
	            var w = arg;
	            if (typeof w == "string") 
	               w = registry.byId(w);
	            if (w) {
	               if (w.destroyRecursive)
	                  w.destroyRecursive();
	               else if (w.destroy)
	                  w.destroy();
	            }
	         }
	      }
	   },
	
	   first: function(o) {
	      return (o && lang.isArrayLike(o)) ? o[0] : o;
	   },
	
	   last: function(o) {
	      return (o && lang.isArrayLike(o)) ? o[o.length-1] : o;
	   },
	   
	   size: function(o) {
	      var c = 0;
	      if (o) {
	         for (var i in o)
	            c++;
	      }
	      return c;
	         
	   },
	
	   date: {
	      convertAtomDate: stamp.fromISOString
	   },
	   
	   hasListeners: function(f) {
	      return (f._listeners && array.some(f._listeners, function(l) {return l;}));  
	   },
	   
	   animateBackground: function(p, start, end) {
	      var n = p.node;
	      var pr = p.properties = p.properties || {};
	      pr.backgroundColor = {
	         start: start, 
	         defEnd: end,
	         end: function() {
	            var bg = domStyle.getComputedStyle(n).backgroundColor;
	
	            // Special-case for Safari and its weird interpretation of 'transparent' 
	            if (bg == 'rgba(0, 0, 0, 0)')
	               bg = 'rgba(255, 255, 255, 0)';
	
	            return bg || this.defEnd;
	         }
	      };
	      p.onEnd = function() {dom.byId(n).style.backgroundColor = "";};
	      return p;
	   }
	});
	
	return misc;
});
