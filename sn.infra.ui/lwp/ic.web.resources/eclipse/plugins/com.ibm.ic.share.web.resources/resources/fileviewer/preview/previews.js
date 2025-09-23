/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "./VideoJSPreview",
   "./VideoPreview",
   "./ViewerPreview",
   "./ImagePreview",
   "./TextFilePreview",
   "./IconPreview"
], function (VideoJSPreview, VideoPreview, ViewerPreview, ImagePreview, TextFilePreview, IconPreview) {
   "use strict";

   return [ VideoJSPreview, VideoPreview, ViewerPreview, ImagePreview, TextFilePreview, IconPreview ];
});
