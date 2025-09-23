/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.MimeClass");

/**
 * @namespace lconn.core.MimeClass
 */
lconn.core.MimeClass = /** @lends lconn.core.MimeClass */
{

   /**
    * Returns what kind of file is represented by the mimetype passed in. If
    * nothing exists in the table, it returns "generic"
    */
   getClass : function(/* str */mimetype) {
      var mimeclass = lconn.core.MimeClass.mimetypes[mimetype];
      if (mimeclass != undefined)
         return mimeclass;
      else
         return "generic";
   },

   mimetypes : {
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
   }
};
