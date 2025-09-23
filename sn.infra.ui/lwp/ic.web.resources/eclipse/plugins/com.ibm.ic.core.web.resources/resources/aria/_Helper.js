/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
   "ic-ui/aria/_Helper",
   "dojo/_base/kernel"
], function (CoreUIHelper, kernel) {

   /**
    * This class is just a proxy for ic-ui/aria/_Helper
    * 
    * @see coreui.aria._Helper
    * 
    * @author Claudio Procida <procidac@ie.ibm.com> 
    */
   kernel.deprecated("ic-core/aria/_Helper", "Use ic-ui/aria/_Helper instead", "5.0");

   return CoreUIHelper;
});
