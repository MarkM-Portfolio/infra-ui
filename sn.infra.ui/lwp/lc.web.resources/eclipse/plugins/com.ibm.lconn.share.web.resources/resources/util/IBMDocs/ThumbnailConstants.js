/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function() {
   "use strict";
   dojo.provide("lconn.share.util.IBMDocs.ThumbnailConstants");
   dojo.require("dojox.lang.functional");
   
   var ThumbnailConstants = lconn.share.util.IBMDocs.ThumbnailConstants;
   // For Defect 142569, since JavaScript code loaders may be different between products, dojox.lang was not defined and caused an error.
   // A better fix in the future would convert the class to AMD and revert all related lines in this file, so that all necessary dependencies are loaded before defining the class can take place.
   //var functional = dojox.lang.functional;// Line commented out for Defect 142569

   ThumbnailConstants.thumbnailSizes = {
      small: "small",
      medium: "medium",
      large: "large"
   };
   
   ThumbnailConstants.validateSize = function(sizeFormat) {
     var found = dojo.some(dojox.lang.functional.keys(ThumbnailConstants.thumbnailSizes), function(format){
        return format == sizeFormat;
     });
     if(found) {
        return true;
     }
     
     throw {name: "InvalidArgumentException", message: "\"" + sizeFormat + "\" is not a valid thumbnail size format."};
   };

   ThumbnailConstants.getOtherSizeFormats = function(chosenSize){
      var otherSizes = dojo.filter(dojox.lang.functional.keys(ThumbnailConstants.thumbnailSizes), function(size) {// Class name expanded for Defect 142569
         return (size != chosenSize);
      });
      return otherSizes;
   };
}());
