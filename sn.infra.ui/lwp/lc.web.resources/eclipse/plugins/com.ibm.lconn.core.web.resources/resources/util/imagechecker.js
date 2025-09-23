/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.util.imagechecker");
dojo.require("dojo.Deferred");

(function() {

   function postFlight(src, i, arr, d, good, bad, success) {
      // Triage image source
      if (success)
         good.push(src);
      else
         bad.push(src);
      // Remove source from array
      arr.splice(dojo.indexOf(arr, src), 1);
      // Check if we're finished
      if (!arr.length) {
         if (good.length > 0) {
            // If there's at least a good image, resolve the promise
            d.resolve(good);
         } else {
            // Otherwise reject it
            d.reject(bad);
         }
      }
   }

   /**
    * Utility that can validate images
    * 
    * @namespace lconn.core.util.imagechecker
    */
   lconn.core.util.imagechecker = /** @lends lconn.core.util.imagechecker */
   {
      /**
       * Checks if the images represented by the array of URLs exist, and
       * returns a deferred. The callback will receive only those that do exist.
       * 
       * @param {Array}
       *           arr An array of image URLs
       */
      checkExist : function(arr) {
         if (!dojo.isArray(arr))
            arr = [ arr ];
         var d = new dojo.Deferred(), good = [], bad = [];
         if (arr.length) {
            dojo.forEach(arr, function(src, i, arr) {
               var img = new Image();
               img.onload = dojo.partial(postFlight, src, i, arr, d, good, bad,
                     true);
               img.onerror = dojo.partial(postFlight, src, i, arr, d, good, bad,
                     false);
               img.src = src;
            });
         } else {
            d.reject(arr);
         }
         return d;
      }
   };

}());
