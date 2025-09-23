/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.util.text");
dojo.require("lconn.core.util.text");
dojo.require("lconn.core.unicode");

(function() {
   var oldSize = dojo.getObject("lconn.share.util.text._SIZE");
   lconn.share.util.text = dojo.clone(lconn.core.util.text);
   lconn.share.util.text._SIZE = oldSize;
   lconn.share.util.text.trimToLength = lconn.core.util.text.trimToByteLength;
   lconn.share.util.text.lengthUtf8 = lconn.core.util.text.getByteLength;
   lconn.share.util.text.formatSize = function() {
      var nls, size;
      if (arguments.length == 2) {
         nls = arguments[0];
         size = arguments[1];
      }
      else
         size = arguments[0];
      if (typeof size == "undefined" || size == null || typeof size == "string")
         return size;
      var nls = nls || lconn.share.util.text._SIZE;
      if (!nls)
         throw "Must pass nls to formatSize or set the lconn.share.util.text._SIZE property during init";
      
      if (size > 10*1024*1024*1024)
         return dojo.string.substitute(nls.GB, [dojo.number.format(Math.ceil(size*10/(1024*1024*1024))/10)]);
      else if (size >= 1*1024*1024*1024)
         return dojo.string.substitute(nls.GB, [dojo.number.format(Math.ceil(size*100/(1024*1024*1024))/100)]);
      else if (size > 100*1024*1024)
         return dojo.string.substitute(nls.MB, [dojo.number.format(Math.ceil(size/(1024*1024)))]);
      else if (size > 10*1024*1024)
         return dojo.string.substitute(nls.MB, [dojo.number.format(Math.ceil(size*10/(1024*1024))/10)]);
      else if (size >= 1*1024*1024)
         return dojo.string.substitute(nls.MB, [dojo.number.format(Math.ceil(size*100/(1024*1024))/100)]);
      else if (size > 1*1024)
         return dojo.string.substitute(nls.KB, [dojo.number.format(Math.ceil(size/1024))]);
      return dojo.string.substitute(nls.KB, [dojo.number.format(size > 0 ? 1 : 0)]);
   }
})();
