/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.util.misc");
dojo.require("dojo.date.stamp");

dojo.j = dojo.getObject("Jiffy") || {mark: function() {},measure: function() {}};


lconn.share.util.misc = {
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
      if (obj == null)
         return null;
      var type = typeof obj;
      if (type == "function")
         return obj(a,b,c,d,e,f,g);
      var arr = [];
      if (dojo.isArray(obj)) {
         for (var i=0; i<obj.length; i++) {
            var o = obj[i];
            var type = typeof o;
            if (type == "function")
               arr[i] = o(a,b,c,d,e,f,g);
            if (type == "string")
               arr[i] = new dojo.getObject(o)(a,b,c,d,e,f,g);
         }
      }
      return arr;
   },

   // Example usages:
   //   lconn.share.util.misc.sort(Array) - sorts in default order
   //   lconn.share.util.misc.sort(Array, "name") - sorts by "name" attribute in ascending order
   //   lconn.share.util.misc.sort(Array, ["name",-1]) - sorts by "name" attribute in descending order
   //   lconn.share.util.misc.sort(Array, "weight", "name") - sorts by "weight", then by "name" in ascending order
   //   lconn.share.util.misc.sort(Array, ["weight",-1], "name") - sorts by "weight" in descending order, then by "name" in ascending order
   sort: function(arr) {
      // Can't sort non-arrays or arrays of length 0-1
      if (!dojo.isArray(arr) || arr.length < 2)
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
         if (dojo.isArray(key)) {
            order = key[1];
            key = key[0];
         }
         var f = (typeof arr[0][key] == "string" && "".localeCompare)
               ? lconn.share.util.misc.orderLocale
               : lconn.share.util.misc.order;
         orders.push(dojo.partial(f, key, order));
      }
      
      if (orders.length == 1)
         return arr.sort(orders[0]);

      return arr.sort(function(a,b) {
         var l = orders.length
         for(var i=0; i < l; i++) {
            var c = orders[i](a,b);
            if (c != 0)
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
      }
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
      if (arguments.length > 1)
         for (var i=0;i<arguments.length;i++)
            lconn.share.util.misc.destroy(arguments[i]);
      else if (arguments.length == 1) {
         var arg = arguments[0];
         if (arg && typeof arg == "object" && arg.length > 0) {
            for (var i=0;i<arg.length;i++)
               lconn.share.util.misc.destroy(arg[i]);
         }
         else {
            var w = arg;
            if (typeof w == "string") 
               w = dijit.byId(w);
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
      return (o && dojo.isArrayLike(o)) ? o[0] : o;
   },

   last: function(o) {
      return (o && dojo.isArrayLike(o)) ? o[o.length-1] : o;
   },
   
   size: function(o) {
      var c = 0;
      if (o)
         for (var i in o)
            c++;
      return c;
         
   },

   date: {
      convertAtomDate: dojo.date.stamp.fromISOString
   },
   
   hasListeners: function(f) {
      return (f._listeners && dojo.some(f._listeners, function(l) {return l;}))  
   },
   
   animateBackground: function(p, start, end) {
      var n = p.node;
      var pr = p.properties = p.properties || {};
      pr.backgroundColor = {
         start: start, 
         defEnd: end,
         end: function() {
            var bg = dojo.getComputedStyle(n).backgroundColor;

            // Special-case for Safari/FireFox and its weird interpretation of 'transparent' 
            if (bg == 'rgba(0, 0, 0, 0)' || 'transparent')
               bg = 'rgba(255, 255, 255, 0)';

            return bg || this.defEnd;
         }
      };
      p.onEnd = function() {dojo.byId(n).style.backgroundColor = "";};
      return p;
   }
};
