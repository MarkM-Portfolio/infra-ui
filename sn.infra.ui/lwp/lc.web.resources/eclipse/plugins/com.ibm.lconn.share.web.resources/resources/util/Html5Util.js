/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function(){
   dojo.mixin(dojo.provide("lconn.share.util.Html5Util"), {
      
      allowHTML5: function() {
         var input = dojo.doc.createElement('input');
         input.type="file";

         return ('files' in input) && window.FormData;
      }
   });
})();
