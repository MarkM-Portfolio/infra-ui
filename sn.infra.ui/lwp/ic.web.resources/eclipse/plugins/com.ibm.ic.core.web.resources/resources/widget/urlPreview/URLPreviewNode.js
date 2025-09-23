/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo/_base/kernel",
   "ic-ui/URLPreview"
], function (kernel, URLPreview) {

   kernel.deprecated("ic-core/widget/urlPreview/URLPreviewNode", "This is a wrapper around ic-ui/URLPreview provided for backwards compatibility. Use that module directly instead.", "5.0");

   return URLPreview;
});
