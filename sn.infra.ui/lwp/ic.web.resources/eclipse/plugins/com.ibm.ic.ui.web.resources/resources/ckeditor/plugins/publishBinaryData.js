/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo/_base/lang",
   "dojo/_base/array",
   "dojo/cookie",
   "dojo/has",
   "dojo/i18n!ic-core/nls/strings",
   "dojo/string",
   "dojo/topic",
   "dojox/uuid",
   "dojox/uuid/generateRandomUuid",
   "ic-core/DialogUtil",
   "ic-core/config",
   "ic-core/config/properties",
   "ic-core/url"
], function (lang, array, cookie, has, strings, string, topic, uuid, generateRandomUuid, DialogUtil, config, properties, urlModule) {

   /**
    * Plugin that handles images pasted or dropped in CKEditor. The plugin
    * converts the inline data URI from base64 to binary, notifies listeners
    * that inline images are available, passes them the data so they can save
    * them to the application storage service as attachments, and will handle
    * the returned url and replace it in the editor.
    * <p>
    * To add fileList:
    * 
    * <pre>
    * dojo.create(&quot;div&quot;, {
    *    id : &quot;attachedFileList&quot;
    * });
    * 
    * new AttachedFileList({}, dojo.byId(&quot;attachedFileList&quot;));
    * </pre>
    * 
    * @namespace ic-ui.ckeditor.plugins.publishBinaryData
    * @fires ic-core/ckplugins/icpublishBinaryData
    * @author Cecilia Bollini <ceciliab@ie.ibm.com>
    */

   var icBinaryData = {};

   /*
    * The name of this plugin
    */
   var name = 'icBinaryData';

   /**
    * Topic emitted when data is pasted by {@link #PublishData}
    */
   icBinaryData.TOPIC = "ic-core/ckplugins/publishBinaryData";

   /**
    * Topics emitted during upload by {@link #PublishData}
    */
   icBinaryData.LOADING = {
         DATA_AVAILABLE : icBinaryData.TOPIC + "/progress",
         UPLOAD_COMPLETE : icBinaryData.TOPIC + "/loaded"
   };

   /**
    * Array of URLs that will replace binary images in CKEditor
    * 
    * @type {Array}
    */
   icBinaryData.URLarray = [];

   /**
    * Returns the name of this plugin
    * 
    * @function getName
    * @memberof ic-ui.ckeditor.plugins.publishBinaryData
    * @returns {String} The name of this plugin
    */
   icBinaryData.getName = function() {
      return name;
   };

   /**
    * Returns true if this plugin is enabled
    * 
    * @function isEnabled
    * @memberof ic-ui.ckeditor.plugins.publishBinaryData
    * @returns {boolean} true if the plugin is enabled
    */
   icBinaryData.isEnabled = function() {
      return properties["com.ibm.lconn.core.web.ckeditor.pasteImages.enabled"] !== "false";
   };

   /**
    * Adds custom config to CKEditor
    * 
    * @function addCustomConfig
    * @memberof ic-ui.ckeditor.plugins.publishBinaryData
    */
   icBinaryData.addCustomConfig = function(opts) {
      if ((array.indexOf([ "blogs", "wikis", "forums" ], lang.getObject("ibmConfig.serviceName")) !== -1)
            || ((array.indexOf([ "activities" ], lang.getObject("ibmConfig.serviceName")) !== -1)
                  && lang.getObject("_lconn_act_config.OAPasteImageToEditorEnabled") === true)) {
         opts.ibmFilterPastedDataUriImage = !!has("ie");
      }
      opts.ibmPublishBinaryData = icBinaryData.PublishData;
   };

   /**
    * Returns true if the demo adapters for Wikis and Blogs are enabled
    * 
    * @function isDemo
    * @memberof ic-ui.ckeditor.plugins.publishBinaryData
    * @returns {boolean} true if the demo adapters are enabled
    */
   icBinaryData.isDemo = function() {
      return properties["com.ibm.lconn.core.web.ckeditor.pasteImages.demo.enabled"] == "true";
   };

   /*
    * binary conversion, and sending the binary to the component functions
    * 
    * @param {number} id identifier for ckeditor to identify the editor instance
    */
   function handleFiles(editor, filesArray) {
      var DATA_URI_REGEX = /^src="data:image\/(.*);base64,(.*)"$/;
      var DATA_REGEX = /data:image\/(.*);base64,(.*)$/;
      var i, m, fileSizeString, byteArray, blob;
      for (i = 0, file; file = filesArray[i]; i++) {
         m = file.data[0].match(DATA_URI_REGEX);
         fileSizeString = file.size / 1000;
         filesArray[i].name = file.name ? file.name : string.substitute(
               "editor_image_${0}.${1}", [ generateRandomUuid(),
                     m[1] ]);
         file.type = 'image/' + m[1];
         filesArray[i].binary = window.atob(m[2]);

         // for forums
         byteArray = createByteArray(filesArray[i].binary);

         blob = new Blob([ byteArray ], {
            type : file.type
         });
         // sending binary to component function
         icBinaryData.getImageAsBinaryDatacb(blob, file.id, file.name);
         // for forums
      }
   }

   /**
    * Dynamically adds a CKEditor plugin that handles pasted images
    * 
    * @function addPlugin
    * @memberof ic-ui.ckeditor.plugins.publishBinaryData
    */
   icBinaryData.addPlugin = function() {
      if (CKEDITOR && CKEDITOR.plugins && CKEDITOR.plugins.registered
            && CKEDITOR.plugins.registered[name]) {
         return;
      }

      CKEDITOR.plugins.add(name, {
         init : function(editor) {
            icBinaryData.URLarray = [];
            var handle = topic.subscribe(icBinaryData.TOPIC, function(obj) {
                     if (obj.editor !== editor.name) {
                        return;
                     }
                     icBinaryData.URLarray = [];
                     icBinaryData.subscribeObj = obj;
                     handleFiles(editor, obj.filesArr);
                     for (var i = 0; i < obj.filesArr.length; i++) {
                        handleUrl(obj.filesArr[i], obj.cb, false);
                     }
                  });
         }
      });
   };

      /**
       * Callers should overwrite this function to get the binary
       * 
       * @function getImageAsBinaryDatacb
       * @memberof ic-ui.ckeditor.plugins.publishBinaryData
       * @param {Blob}
       *           blob A blob of binary data
       * @param {String}
       *           id The id of the binary image
       * @param {String}
       *           name The name of the binary image
       */
   icBinaryData.getImageAsBinaryDatacb = function(blob, id, name) {};

   /**
    * Callback, ckeditor publish the drop event on this topic
    * 
    * @function PublishData
    * @memberof ic-ui.ckeditor.plugins.publishBinaryData
    * @param {number}
    *           insertImageID identifier for ckeditor to identify the editor
    *           instance
    * @param {number}
    *           deleteAttachement identifier for ckeditor to identify the image
    *           to delete
    * @param {object}
    *           editor
    * @param {array}
    *           fileObject array of object, each object represent one of the
    *           dropped image
    */
   icBinaryData.PublishData = function(insertImageID, deleteAttachement, editor, fileObject) {
      topic.publish(icBinaryData.TOPIC, {
         cb : insertImageID,
         editor : editor,
         filesArr : fileObject,
         deleteImageNumber : deleteAttachement,
         deleteImagecb : deleteAttachementcb
      });
   };

   /**
    * Callback, ckeditor change the URL of the image when you call this function
    * 
    * @function substituteUrlcb
    * @memberof ic-ui.ckeditor.plugins.publishBinaryData
    * @param {number}
    *           id identifier for ckeditor to identify the editor instance
    */
   icBinaryData.substituteUrlcb = function(id, imageUrl) {
      addNewURLObject(id, imageUrl);

      CKEDITOR.tools.callFunction(icBinaryData.subscribeObj.cb,
            icBinaryData.URLarray, '');
   };

   /* Private interface */
   var afl, loaded = false;

   /*
    * Callback, ckeditor delete the image from the editor
    * 
    * @param {number} id identifier for ckeditor to identify the editor instance
    */
   function deleteAttachementcb(id) {
      CKEDITOR.tools.callFunction(icBinaryData.subscribeObj.deleteImageNumber,
            [ id ], '');
   }

   /*
    * Creates a Uint8Array from an array of binary data
    * 
    * @param {Array} rawBinary An array of binary data @returns {Uint8Array} the
    * Uint8Array representing the binary data
    */
   function createByteArray(rawBinary) {
      var byteNumbers = new Array(rawBinary.length);
      for (var i = 0; i < rawBinary.length; i++) {
         byteNumbers[i] = rawBinary.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      return byteArray;
   }

   /*
    * TODO: document
    */
   function sendFileToActivityAttachement(fileObj) {
      var activityUrl = '/activities/service/html/post/activitynode', nonce;
      var activityId = OAGetActivityId();
      // var fileConfig = lconn.act.data.ServerInfo.INSTANCE;
      var appObj =  OAGetContext();
      console.log(activityId);
      // console.log(fileConfig);
      console.log(appObj);
      var formData = new FormData();
      var binaryData = fileObj.binary;
      var byteArray = createByteArray(binaryData);
      var blob = new Blob([ byteArray ], {
         type : fileObj.type
      });
      function f() {
         var nonce;
         var authenticatedUser = app.getAuthenticatedUser();
         if (!nonce && authenticatedUser && authenticatedUser.nonce) {
            nonce = authenticatedUser.nonce;
         }
         var f = function(response, ioArgs) {
            if (response instanceof Error) {
               console.log(response);
               return;
            }
            var nonce = response;
            return requestObj;
         }
      }
      var nonce = f();
      formData.append("activityUuid", activityId);
      formData.append("_nodeType", "activities/entry");
      formData.append("uuid", "");
      formData.append("fields.new0.name", "Attachment");
      formData.append("fields.new0.file", blob);

      var request = new XMLHttpRequest();
      request.open("POST", activityUrl);

      request.send(formData);

   }

   /*
    * TODO: document
    */
   function sendFileToBlogAttachement(fileObj) {
      var formData = new FormData();
      var binaryData = fileObj.binary;

      var byteArray = createByteArray(binaryData);

      var blob = new Blob([ byteArray ], {
         type : fileObj.type
      });

      formData.append('method', 'upload');
      formData.append('weblog', window.weblogHandle);
      formData.append('path', 'BLOGS_UPLOADED_IMAGES');
      formData.append('dangerousurlnonce', window.dangerousurlnonceValue);
      formData.append('callType', 'ajax');
      formData.append('uploadedFile0', blob, fileObj.name);

      // would be nice to use new request.xhr,it also provide loader info

      var request = new XMLHttpRequest();
      request.open("POST", icBinaryData.sendUrl);
      
      request.upload.onprogress = function(e) {
         if (e.lengthComputable) {
            var progressStatus = ( e.loaded / e.total ) * 100;
            dojo.publish(icBinaryData.LOADING.DATA_AVAILABLE, {status: progressStatus, id: fileObj.id});
         }
       };

      request.send(formData);
      request.onreadystatechange = function() {
         if (request.readyState < 4) {
            console.log('loading');// don't remove this line or ... goto fail
                                    // goto fail
         }
         else if (request.readyState === 4) { // 4 = Response from server has
            // been completely loaded.

            var response = request.response;
            parser = new DOMParser();

            var doc = parser.parseFromString(response, "text/html");

            var textarea = doc.getElementsByTagName('textarea')[0];

            responseObj = JSON.parse(textarea.value);
            dojo.publish(icBinaryData.LOADING.UPLOAD_COMPLETE, {id:fileObj.id});


            // textarea.value;
            var imageURL = responseObj.returnCode.messages;

            if (responseObj.returnCode.value == "1") {

               deleteAttachementcb(fileObj.id);
               var errorindex = imageURL[0].indexOf("]") + 2;
               DialogUtil.alert(strings.rs_sharefile_error_title, imageURL[0].substring(errorindex) );
            }
            else {
               addNewURLObject(fileObj.id, imageURL);

               CKEDITOR.tools.callFunction(icBinaryData.subscribeObj.cb,
                     icBinaryData.URLarray, '');

            }

         }
      }

   }

   /*
    * TODO: document
    */
   function sendMultipartFileToAttachement(fileObj) {
      var formData = new FormData();

      var binaryData = fileObj.binary;
      var byteArray = createByteArray(binaryData);

      var blob = new Blob([ byteArray ], {
         type : fileObj.type
      });

      formData.append('file', blob, fileObj.name);

      // would be nice to use new request.xhr,it also provide loader info
      var request = new XMLHttpRequest();
      request.open("POST", icBinaryData.sendUrl);
      request.upload.onprogress = function(e) {
         if (e.lengthComputable) {
            var progressStatus = ( e.loaded / e.total ) * 100;
            console.log(e.loaded);
            console.log(e.total);
            dojo.publish(icBinaryData.LOADING.DATA_AVAILABLE, {status: progressStatus, id: fileObj.id});
         }
       };
       
      request.send(formData);
      request.onreadystatechange = function onreadystatechange_$2() {
         if (request.readyState < 4) {
            console.log('loading');
         }
         else if (request.readyState === 4) { // 4 = Response from server has
            // been completely loaded.
            dojo.publish(icBinaryData.LOADING.UPLOAD_COMPLETE, {id:fileObj.id});
            var response = request.response;
            parser = new DOMParser();
            doc = parser.parseFromString(response, "text/html");
            var json = lconn.share0.util.atom.getJsonResponseFromHtml(doc);

            var imageURL = getWikiImageURL(json, fileObj);
            if (imageURL) {
               addNewURLObject(fileObj.id, imageURL);

               CKEDITOR.tools.callFunction(icBinaryData.subscribeObj.cb, icBinaryData.URLarray, '');
            }

          }
       }

    }

    function cancel(fileObj) {
       handleUrl(fileObj, fileObj.cb, false);
    }

    function overrideFile(fileObj) {
       handleUrl(fileObj, fileObj.cb, true);
    }


   /*
    * TODO: document
    */
   function getWikiImageURL(json, fileObj) {
      var url;
      if (json && json.contents && json.contents.links) {
         for (var i = 0; i < json.contents.links.length; i++) {
            var l = json.contents.links[i];
            if (l.rel == "alternate") {
               url = l.href;
               // add attachment name to end of url
               // fixes issue with IE and Safari
               if (url.search(/(\/media\/([^\/]*))/) == -1) {
                  url = url + "/" + json.contents.title;
               }
               var uri = lconn.share0.util.uri.parseUri(url);
               url = uri.path;
               break;
            }
         }
         url = url.replace(
               lang.getObject("lconn.share0.config.services.form.anon"),
               lang.getObject("lconn.share0.config.services.form.auth"));
      }
      else if (json.status == '409' && json.contents.errorCode === "ItemExists") {
         // file already exist replace it?
         // ic-ui/DialogUtil.alert(UPLOAD_ATTACHMENT.CONFIRM_REPLACE);
      if (fileObj.stopRetry) {
            return
         } else {
            fileObj.stopRetry = true;
            lconn.share0.util.html.confirm(_nls.INSERTLINK.CONFIRM_REPLACE, lang.hitch(this, overrideFile, fileObj), lang.hitch(this, cancel, fileObj));
         }
      }
      return url;
   }

   /*
    * TODO: document
    */
   function handleUrl(fileObj, cb, replace) {
      var CURRENT_URI_REGEX = /wiki\/(.*)\/(.*)\/(.*)\//;
      var currentUrl = document.location.href;
      var idNumbers = currentUrl.match(CURRENT_URI_REGEX);
      if (!idNumbers) {
         CURRENT_URI_REGEX = /wiki\/(.*)\/(.*)\/(.*)/;
         idNumbers = currentUrl.match(CURRENT_URI_REGEX);
      }

      // this part will go when the callback to app is working
      if (lang.getObject("ibmConfig.serviceName") === "wikis") {
         var app = lconn.wikis.App.getInstance();
         var notSaved;
         var draftId, documentId, pageId;
         if (app.scene.sceneInfo.draftId) {
            // icBinaryData.isNewPage = true;
            pageId = app.scene.pageId;// we are saving the attachment to the
                                       // page, not to the draft
         }
         else if (app.scene.sceneInfo.pageId) {
            // notSaved = true;
            documentId = app.wikis_actions.insertImage.documentId;
            // icBinaryData.pageId = decodeURIComponent(idNumbers[3]);
            pageId = app.scene.sceneInfo.pageId;

         }
         else {// if there is no drafid and no page if is a completly new page
            notSaved = true;
            draftId = app.scene.currentDraftId;
         }
         var libraryId = app.scene.libraryId;
         var wikiId = app.scene.wikiLabel;

         var nonce;
         var authenticatedUser = app.getAuthenticatedUser();
         if (!nonce && authenticatedUser && authenticatedUser.nonce)
            nonce = authenticatedUser.nonce;

         var f = function(response, ioArgs) {
            if (response instanceof Error) {
               console.log(response);
               return;
            }

            var nonce = response;
            var requestObj = {
               nonce : nonce
            }
            if (replace) {
               requestObj.replace = 'true';
            }
            if (notSaved) {
               icBinaryData.sendUrl = urlModule.rewrite(app.routes
                     .getDraftAttachmentListServiceUrl(wikiId, draftId),
                     requestObj);
            }
            else {
               icBinaryData.sendUrl = urlModule.rewrite(app.routes
                     .getAttachmentListServiceUrl(libraryId, pageId),
                     requestObj);
            }
            sendMultipartFileToAttachement(fileObj);
         }
         if (!nonce) {
            nonce = app.getNonce(f);
            console.log(nonce);
         }
         else {
            f(nonce);
         }

      }
      else if (lang.getObject("ibmConfig.serviceName") === "blogs") {

         // window.p.uploadCb(fileObj, icBinaryData.binaryData);
         var CURRENT_BLOG_URI_REGEX = /blogs\/roller-ui\/authoring\/weblog(.*)entryId=(.*)&id=(.*)&autosave/;
         var idNumbersBlog = currentUrl.match(CURRENT_BLOG_URI_REGEX);

         icBinaryData.sendUrl = '/blogs/roller-ui/authoring/uploadFiles.do';
         sendFileToBlogAttachement(fileObj);

      }
   }

   /*
    * Adds new file object to the url array icBinaryData.URLarray, this array
    * will be sent to ckeditor to replace base64 with actual url
    * 
    * @param {number} id of the image @param {string} url of the image
    */
   function addNewURLObject(imageId, imageURL) {
      var urlObject = new Object();
      urlObject.id = imageId;
      urlObject.url = imageURL;
      icBinaryData.URLarray.push(urlObject);
   }

   return icBinaryData;
});