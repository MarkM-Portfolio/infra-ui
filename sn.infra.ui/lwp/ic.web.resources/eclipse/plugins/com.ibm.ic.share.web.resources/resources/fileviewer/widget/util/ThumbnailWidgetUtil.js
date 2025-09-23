/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo/_base/lang",
   "dojo/_base/array"
], function (lang, array) {
   "use strict";
   
   var constants = {
      CONNECTIONS_VALID_VIDEO_EXTS_OBJECT_PATH: "lconn.share.previewConfig.validVideoExts",
      CONNECTIONS_VALID_PHOTO_EXTS_OBJECT_PATH: "lconn.share.previewConfig.validPhotoExts",
      DEFAULT_SUPPORTED_VIDEO_EXTS: "mp4,mov,flv",
      DEFAULT_SUPPORTED_PHOTO_EXTS: "jpg,jpeg,gif,png",
      EXTS_SEPARATOR: ",", 
      EXT_DELIMITER: ".",
      UPLOAD_URL_TEMPLATE: "{fileFeed}",
      DEFAULT_RENDITION_KIND: "renditionTemplate"
   };
   
   var get = {
      validVideoExts: function () {
         var validExts = lang.getObject(constants.CONNECTIONS_VALID_VIDEO_EXTS_OBJECT_PATH);
         if (validExts === undefined) {
            validExts = constants.DEFAULT_SUPPORTED_VIDEO_EXTS;
         }
         return validExts;
      },
      validPhotoExts: function () {
         var validExts = lang.getObject(constants.CONNECTIONS_VALID_PHOTO_EXTS_OBJECT_PATH);
         if (validExts === undefined) {
            validExts = constants.DEFAULT_SUPPORTED_PHOTO_EXTS;
         }
         return validExts;
      } 
   };
   
   var thumbnailWidgetUtils = {
      constants: constants,
      get: get,
      
      isValid: function (file) {
         var validVideoExts = get.validVideoExts().toUpperCase();
         var validVideoExtsArray = validVideoExts.split(constants.EXTS_SEPARATOR);
         var fileType = file.get("type").toUpperCase();
         return (array.indexOf(validVideoExtsArray, fileType) > -1);
      },
      
      isValidThumbnailExt: function (filename) {
         if (!filename) {
            return false;
         }
         else {
            var extension = filename.split(constants.EXT_DELIMITER).pop().toUpperCase();
            var validPhotoExts = get.validPhotoExts().toUpperCase();
            var validPhotoExtsArray = validPhotoExts.split(constants.EXTS_SEPARATOR);
            return (array.indexOf(validPhotoExtsArray, extension) > -1);
         }
      }
   };
   
   return thumbnailWidgetUtils;
});