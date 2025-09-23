/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo/io-query",
   "dojo/string",
   "dojo/_base/array",
   "dojo/_base/url"
], function (ioQuery, string, array, dojoUrl) {
   "use strict";

   /**
    * Group 0: the whole url
    * Group 1: Optional url args after home (usually ?lang=en)
    * Group 2: ID of the wiki
    * Group 3: Optional, matches /page/[page ID] for specific wiki pages
    */
   var _connectionsWikiRegex = '/wikis/home(|\\?[^/#]*#!)/wiki/([^/?#]+)(/page/[^/?#]+)?',

   /**
    * Group 0: the whole url
    * Group 1: ID of the blog
    * Group 2: optional, matches /entry/[entry ID] for specific blog posts
    */
   _connectionsBlogRegex = '/blogs/([^/?#]+)(|/entry/[^/?#]+)',

   /**
    * Group 0: the whole url
    * Group 1: what type of forum post, 'topic' or 'forum'
    * Group 2: any arguments (most important being 'id=___')
    */
   _connectionsForumRegex = '/forums/html/(topic|forum)\\?([^#]+)',

   _connectionsServiceRegex = '/service/html/';
   return {
      /* returns a boolean true if this url is part of Files */
      isConnectionsFileUrl: function(url) {
         return !!this.getFileId(url);
      },

      /* returns a boolean true if this url should launch the file viewer */
      shouldOpenPreview: function(url) {
         var result = parseCommunityWidgetUrl(url);
         if (result) {
            var validParameters = [
               "fullpageWidgetId",
               "communityUuid",
               "debug"
            ];

            var validFragmentParameters = [
               "fullpageWidgetId",
               "file"
            ];
             
            if (!areParametersValid(result.parameters, validParameters) || !areParametersValid(result.fragmentParameters, validFragmentParameters)) {
               return false;
            }
            
            return !!result.fragmentParameters.file || false;
         }

         result = parseFilesAppUrl(url);
         if (result) {
            var validParameters = [
               "debug"
            ];
            
            var validFragmentParameters = [];
            
            if (!areParametersValid(result.parameters, validParameters) || !areParametersValid(result.fragmentParameters, validFragmentParameters)) {
               return false;
            }
            
            return !!(result.type === "file" && result.id) || false;
         }
         
         return false;
      },
      
      shouldOpenConnectionsPreview: function(url) {
         if (isDownloadUrl(url)) {
            return false;
         }
        
         var uri = new dojoUrl(url), fileId;
         if (uri.host !== window.location.host) {
            return false;
         }

         if (!this.isConnectionsFileUrl(url)) {
           return false;
         }
         
         fileId = this.getFileId(url);
         if (fileId.indexOf("{") === 0) {
           // Don't show the preview for library files (which have IDs that start with '{')
           return false;
         }
         
         return true;
      },

      /* returns a boolean true if this url is part of Files Folder*/
      isConnectionsFolderUrl: function(url) {
         return !!this.getFolderId(url);
      },
      
      isCommunityWidgetUrl: function(url) {
        return !!parseCommunityWidgetUrl(url);
      },
      
      isFilesAppUrl: function(url) {
        return !!parseFilesAppUrl(url);
      },

      /* returns a string corresponding to the type of this specific connections url */
      getUrlType: function(url) {
         try{
            var decodedUrl = decodeURIComponent(url);
         }catch(e){
            console.error(e);
            return '';
         }
         var type = '';
         if (!!decodedUrl.match(new RegExp(_connectionsWikiRegex)))
            type = 'wiki';
         else if (!!decodedUrl.match(new RegExp(_connectionsBlogRegex)))
            type = 'blog';
         else if (!!decodedUrl.match(new RegExp('/communities' + _connectionsServiceRegex + 'community[^?]+\\?[^?#/]+')))
            type = 'community';
         else if (!!decodedUrl.match(new RegExp('/activities' + _connectionsServiceRegex + 'mainpage(|[^#/]+)(|#[^?#/]+)')))
            type = 'activity';
         else if (!!decodedUrl.match(new RegExp(_connectionsForumRegex)))
            type = 'forum';
         return type;
      },

      /* returns files id of that Files url */
      getFileId: function(url) {
         var result = parseCommunityWidgetUrl(url);
         if (result) {
            return result.fragmentParameters.file || null;
         }

         result = parseFilesAppUrl(url);
         if (result) {
            return (result.type === "file" && result.id) || null;
         }

         result = parseDownloadUrl(url);
         if (result) {
            return result.id || null;
         }

         return null;
      },

      /* returns folder id of that folder url */
      getFolderId: function(url) {
         var result = parseCommunityWidgetUrl(url);
         if (result) {
            return result.fragmentParameters.folder || null;
         }

         result = parseFilesAppUrl(url);
         if (result) {
            return (result.type === "folder" && result.id) || null;
         }

         return null;
      },

      /* returns a stringUrl representing the URL to download the file associated with the URL passed into the method */
      getDownloadFileUrl: function(url) {
         if (isDownloadUrl(url)) {
            return url;
         }

         var fileId = this.getFileId(url);

         if (fileId) {
            var baseUrl;
            if (isFilesAppUrl(url)) {
               baseUrl = url.substring(0, url.indexOf("/files/"));
            } else {
               baseUrl = url.substring(0, url.indexOf("/communities/"));
            }

            return string.substitute(baseUrl + "/files/form/anonymous/api/document/${fileId}/media", {fileId: fileId});
         } else {
            return "";
         }
      },

      /* returns a stringUrl representing the URL to view the file associated with the URL passed into the method  */
      getViewFileUrl: function(url) {},

      /* returns a string representing JS to execute to view the file associated with the URL passed into the method
          Why have this AND the getViewFileUrl? The target of the link should be populated with an actual link so
          that functions such as bookmarking the link directly without opening, right or control clicking and opening
          in a new tab/window, etc work.  BUT, the real action should be onclick with JS so the viewer can be opened
          as an overlay in the same window. If this method return null the caller should NOT register an onclick handler
          and proceed by just using the getViewFileUrl
      */
      getViewFileJS: function(url) {}
   };

   function parseCommunityWidgetUrl(url) {
      try{
         var decodedUrl = decodeURIComponent(url);
      }catch(e){
         console.error(e);
         return null;
      }
      var match = decodedUrl.match(new RegExp("/communities" + _connectionsServiceRegex + '[^?]+\\?([^#]*)#(\\S+)'));

      if (!match) {
         return null;
      }

      var parameters = ioQuery.queryToObject(match[1]);
      var fragmentParameters = ioQuery.queryToObject(match[2]);

      if (parameters.communityUuid && (parameters.fullpageWidgetId || fragmentParameters.fullpageWidgetId)) {
         return {
            parameters: parameters,
            fragmentParameters: fragmentParameters
         };
      } else {
         return null;
      }
   }

   function parseFilesAppUrl(url) {
      try{
         var decodedUrl = decodeURIComponent(url);
      }catch(e){
         console.error(e);
         return null;
      }
      var match = decodedUrl.match(new RegExp("/app(|#|\\?([^#/]*)#)/([^/]+)/([^?/#]*)(\\?([^?]*))?"));

      if (!match) {
         return null;
      }
      
      var parametersMatch, fragmentParametersMatch;
      if (match[1].indexOf("#") !== -1) {
         parametersMatch = match[2];
         fragmentParametersMatch = match[6];
      } else {
         parametersMatch = match[6];
         fragmentParametersMatch = undefined;
      }
      var parameters = ioQuery.queryToObject(parametersMatch || "");
      var fragmentParameters = ioQuery.queryToObject(fragmentParametersMatch || "");

      var type = match[3];
      var id = match[4];

      return {
         type: type,
         id: id,
         parameters: parameters,
         fragmentParameters: fragmentParameters
      };
   }

   function parseDownloadUrl(url) {
      try{
         var decodedUrl = decodeURIComponent(url);
      }catch(e){
         console.error(e);
         return null;
      }
      var match = decodedUrl.match(new RegExp("/form/(anonymous/)?api/(library/[^/]+/)?document/([^/]+)/media(/[^/#?]+/|/[^/#?]+|/|)(\\?|#|$)"));

      if (!match) {
         return null;
      }

      var id = match[3];

      return {
         id: id
      };
   }

   function isFilesAppUrl(url) {
      return !!parseFilesAppUrl(url);
   }

   function isDownloadUrl(url) {
      return !!parseDownloadUrl(url);
   }
   
   function areParametersValid(parameters, validParameters) {
      for (var parameter in parameters) {
         if (array.indexOf(validParameters, parameter) === -1) {
            return false;
         }
      }
      return true;
   }
});
