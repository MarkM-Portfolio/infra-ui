/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
   "ic-ui/util/xhr"
], function (xhr) {


   /**
    * When invoked, replaces the default dojo XHR behavior with the override from com.ibm.oneui.util.xhr
    */

   var originalXhr = dojo.xhr;
   
   var f = xhr;
   f.setMethod(originalXhr);
   
   dojo.xhr = f;
});
