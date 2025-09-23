/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define([
      "dojox/lang/functional/object",
      "ic-core/MimeClass"
], function(object, MimeClass) {

   /**
    * Jasmine spec for MimeClass util
    * 
    * @module lconn.test.jasmine.core.MimeClassSpec
    */

   describe('the MimeClass util', function() {
      it('implements the expected methdos', function() {
         expect(MimeClass.getClass).toEqual(jasmine.any(Function));
      });
      it('implements the expected properties', function() {
         expect(MimeClass.mimetypes).toBeDefined();
      });
      it('the getClass() method returns the expected mimetypes', function() {
         var MIMETYPES = {
            'image/bmp' : "image",
            'image/gif' : "image",
            'image/jpeg' : "image",
            'image/tiff' : "image",
            'image/x-icon' : "image",
            'image/png' : "image",
            'image/vnd.adobe.photoshop' : "image",
            'vnd.microsoft.icon' : "image",

            'application/msword' : "document",
            'application/pdf' : "document",
            'application/rtf' : "document",
            'application/vnd.ms-outlook' : "document",
            'application/vnd.ms-project' : "document",
            'application/vnd.ms-works' : "document",
            'application/x-mswrite' : "document",
            'application/postscript' : "document",
            'text/html' : "document",
            'text/plain' : "document",
            'text/richtext' : "document",
            'application/vnd.sun.xml.writer' : "document",
            'application/vnd.oasis.opendocument.text' : "document",

            'application/vnd.ms-powerpoint' : "presentation",
            'application/powerpoint' : "presentation",
            'application/vnd.oasis.opendocument.presentation' : "presentation",
            'application/vnd.sun.xml.impress' : "presentation",

            'application/excel' : "spreadsheet",
            'application/vnd.ms-excel' : "spreadsheet",
            'application/x-msaccess' : "spreadsheet",
            'application/vnd.oasis.opendocument.spreadsheet' : "spreadsheet",
            'application/vnd.sun.xml.calc' : "spreadsheet",

            'application/x-compress' : "archive",
            'application/x-compressed' : "archive",
            'application/x-gtar' : "archive",
            'application/x-gzip' : "archive",
            'application/zip' : "archive",

            'audio/basic' : "audio",
            'audio/mid' : "audio",
            'audio/mpeg' : "audio",
            'audio/x-aiff' : "audio",
            'audio/x-mpegurl' : "audio",
            'audio/x-pn-realaudio' : "audio",
            'audio/x-wav' : "audio",

            'video/mpeg' : "video",
            'video/quicktime' : "video",
            'video/x-la-asf' : "video",
            'video/x-ms-asf' : "video",
            'video/x-msvideo' : "video",
            'video/x-sgi-movie' : "video"
         };
         object.forIn(MIMETYPES, function(value, key) {
            expect(MimeClass.getClass(key)).toBe(value);
         });
         expect(MimeClass.getClass('foo')).toBe('generic');
      });
   });

});
