/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "dojo/_base/kernel",
      "ic-ui/Banner"
], function(kernel, Banner) {

   /**
    * Connections banner
    * 
    * @class ic-core.widget.Banner
    * @deprecated
    */

   kernel.deprecated("ic-core/widget/Banner", "Use ic-ui/Banner instead", "6.0");

   return Banner;
});
