/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
   "dojo/_base/kernel",
   "ic-core/proxy"
], function (kernel, proxy) {

   kernel.deprecated("ic-ui/util/proxy", "Use ic-core/proxy instead", "5.0");

   return proxy;
});
