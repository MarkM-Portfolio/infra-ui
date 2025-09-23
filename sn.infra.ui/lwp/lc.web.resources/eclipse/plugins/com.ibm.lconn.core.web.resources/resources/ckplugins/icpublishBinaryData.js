/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Plugin that handles images pasted or dropped in CKEditor. The plugin converts
 * the inline data URI from base64 to binary, notifies listeners that inline
 * images are available, passes them the data so they can save them to the
 * application storage service as attachments, and will handle the returned url
 * and replace it in the editor.
 * <p>
 * To add fileList:
 * 
 * <pre>
 * dojo.create(&quot;div&quot;, {
 *    id : &quot;attachedFileList&quot;
 * });
 * 
 * new lconn.core.widget.AttachedFileList({}, dojo.byId(&quot;attachedFileList&quot;));
 * </pre>
 * 
 * @namespace lconn.core.ckplugins.icpublishBinaryData
 * @fires lconn/core/ckplugins/icpublishBinaryData
 * @author Cecilia Bollini <ceciliab@ie.ibm.com>
 */
dojo.require("lconn.core.config.properties");
dojo.require("lconn.core.DialogUtil");
dojo.require("lconn.core.url");
dojo.require("dojo.cookie");
dojo.require("dojo.string");
dojo.require("dojox.uuid.generateRandomUuid");

(function() {

   var icBinaryData = dojo.provide("lconn.core.ckplugins.icpublishBinaryData");

   /*
    * The name of this plugin
    */
   var name = 'icBinaryData';

   /**
    * Topic emitted by {@link #PublishData}
    */
   icBinaryData.TOPIC = "lconn/core/ckplugins/icpublishBinaryData";

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
    * @memberof lconn.core.ckplugins.icpublishBinaryData
    * @returns {String} The name of this plugin
    */
   icBinaryData.getName = function() {
      return name;
   };

   /**
    * Returns true if this plugin is enabled
    * 
    * @function isEnabled
    * @memberof lconn.core.ckplugins.icpublishBinaryData
    * @returns {boolean} true if the plugin is enabled
    */
   icBinaryData.isEnabled = function() {
      return lconn.core.config.properties["com.ibm.lconn.core.web.ckeditor.pasteImages.enabled"] !== "false";
   };

   /**
    * Adds custom config to CKEditor
    * 
    * @function addCustomConfig
    * @memberof lconn.core.ckplugins.icpublishBinaryData
    *   _lconn_act_config.OAPasteImageEnabled
    */
   icBinaryData.addCustomConfig = function(opts) {
      if ((dojo.indexOf([ "blogs", "wikis", "forums","communities" ], dojo.getObject("ibmConfig.serviceName")) !== -1)
            || ((dojo.indexOf([ "activities" ], dojo.getObject("ibmConfig.serviceName")) !== -1)
                  && dojo.getObject("_lconn_act_config.OAPasteImageToEditorEnabled") === true)) {
         opts.ibmFilterPastedDataUriImage = !!dojo.isIE;
      }
      if(dojo.getObject("ibmConfig.serviceName") == "communities" && !opts.isRTE){
         opts.ibmFilterPastedDataUriImage = true;
      }
      opts.ibmPublishBinaryData = icBinaryData.PublishData;
   };

   /**
    * Returns true if the demo adapters for Wikis and Blogs are enabled
    * 
    * @function isDemo
    * @memberof lconn.core.ckplugins.icpublishBinaryData
    * @returns {boolean} true if the demo adapters are enabled
    */
   icBinaryData.isDemo = function() {
      return lconn.core.config.properties["com.ibm.lconn.core.web.ckeditor.pasteImages.demo.enabled"] == "true";
   };

   /**
    * Dynamically adds a CKEditor plugin that handles pasted images
    * 
    * @function addPlugin
    * @memberof lconn.core.ckplugins.icpublishBinaryData
    */
   icBinaryData.addPlugin = function() {
      if (CKEDITOR && CKEDITOR.plugins && CKEDITOR.plugins.registered
            && CKEDITOR.plugins.registered[name])
         return;

      CKEDITOR.plugins.add(name, {
         init : function(editor) {
            icBinaryData.URLarray = [];
            var handle = dojo.subscribe(
                  icBinaryData.TOPIC,
                  function(obj) {
                     if (obj.editor !== editor.name)
                        return;
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
    * @memberof lconn.core.ckplugins.icpublishBinaryData
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
    * @memberof lconn.core.ckplugins.icpublishBinaryData
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
      dojo.publish(icBinaryData.TOPIC, [ {
         cb : insertImageID,
         editor : editor,
         filesArr : fileObject,
         deleteImageNumber : deleteAttachement,
         deleteImagecb : deleteAttachementcb
      } ]);
   };
   
   /**
    * Callback, ckeditor change the URL of the image when you call this
    * function
    * 
    * @function substituteUrlcb
    * @memberof lconn.core.ckplugins.icpublishBinaryData
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
    * @param {number}
    *           id identifier for ckeditor to identify the editor
    *           instance
    */
   function deleteAttachementcb(id) {
      CKEDITOR.tools.callFunction(icBinaryData.subscribeObj.deleteImageNumber,
            [ id ], '');
   }


   /*
    * Creates a Uint8Array from an array of binary data
    * 
    * @param {Array}
    *           rawBinary An array of binary data
    * @returns {Uint8Array} the Uint8Array representing the binary data
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
    * binary conversion, and sending the binary to the component functions
    * 
    * @param {number}
    *           id identifier for ckeditor to identify the editor 
    *           instance
    */
   function handleFiles(editor, filesArray) {
      var DATA_URI_REGEX = /^src="data:image\/(.*);base64,(.*)"$/;
      var DATA_REGEX = /data:image\/(.*);base64,(.*)$/;
      for (var i = 0, file; file = filesArray[i]; i++) {
         var m = file.data[0].match(DATA_URI_REGEX);
         var fileSizeString = file.size / 1000;
         filesArray[i].name = dojo.string.substitute("editor_image_${0}.${1}", [ dojox.uuid.generateRandomUuid(), m[1] ]);
         file.type = 'image/' + m[1];
         filesArray[i].binary = window.atob(m[2]);

         // for forums
         var byteArray = createByteArray(filesArray[i].binary);

         var blob = new Blob([ byteArray ], {
            type : file.type
         });
         // sending binary to component function
         icBinaryData.getImageAsBinaryDatacb(blob, file.id, file.name);
         // for forums
      }
   }
   
   /*
    * TODO: document
    */
   function sendFileToBlogAttachement(fileObj) {
      var formData = new FormData();
      var binaryData = fileObj.binary;
      var nls = dojo.i18n.getLocalization('lconn.core', 'strings');

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
         if (request.readyState < 4)
            console.log('loading');// don't remove this line or ... goto fail goto fail
         else if (request.readyState === 4) { // 4 = Response from server has
            // been completely loaded.

            var response = request.response;
            parser = new DOMParser();

            var doc = parser.parseFromString(response, "application/xml");

            var returnCode = doc.getElementsByTagName("code")[0].firstChild.nodeValue;

            dojo.publish(icBinaryData.LOADING.UPLOAD_COMPLETE, {id:fileObj.id});
            // textarea.value;
            var imageURL = doc.getElementsByTagName("message")[0].firstChild.nodeValue;

            if (returnCode == "1") {
               var errorindex = imageURL.indexOf("]") + 2;
               deleteAttachementcb(fileObj.id);
               lconn.core.DialogUtil.alert(nls.rs_sharefile_error_title, imageURL.substring(errorindex));
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
         if (request.readyState < 4)
            console.log('loading');
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
               var currentCkeditor = CKEDITOR.instances[icBinaryData.subscribeObj.editor];
               if (lconn.wikis.App && lconn.wikis.App.isRTE && currentCkeditor) {
                 currentCkeditor.document.getById(fileObj.id).$.setAttribute("lconnResourceType","attachment");
                 currentCkeditor.document.getById(fileObj.id).$.setAttribute("lconnAttachedResourceType","draft");
               }
            }
         }
      }

    }
   
    function cancel(fileObj) {
      console.log('cancel ');
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
               if (url.search(/(\/media\/([^\/]*))/) == -1)
                  url = url + "/" + json.contents.title;
               var uri = lconn.share0.util.uri.parseUri(url);
               url = uri.path;
               if (lconn.wikis.App && lconn.wikis.App.isRTE) {
                  url =uri.path.replace("files/oauth/appdata/communityapplibrary","connections/rte/community");
               }
               
               break;
            }
         }
         url = url.replace(
               dojo.getObject("lconn.share0.config.services.form.anon"), 
               dojo.getObject("lconn.share0.config.services.form.auth"));
      }
      else if (json.status == '409' && json.contents.errorCode === "ItemExists") {
         // file already exist replace it?
         // lconn.core.DialogUtil.alert(UPLOAD_ATTACHMENT.CONFIRM_REPLACE);
      if (fileObj.stopRetry) {
            return
         } else {
            fileObj.stopRetry = true;
            lconn.share0.util.html.confirm(_nls.INSERTLINK.CONFIRM_REPLACE, dojo.hitch(this, overrideFile, fileObj), dojo.hitch(this, cancel, fileObj)); 
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
      
      var currentCkeditor = CKEDITOR.instances[icBinaryData.subscribeObj.editor]; 

      // this part will go when the callback to app is working
      if (dojo.getObject("ibmConfig.serviceName") === "wikis") {
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
            if (replace)
               requestObj.replace = 'true';
            if (notSaved) {
               icBinaryData.sendUrl = lconn.core.url.rewrite(app.routes
                     .getDraftAttachmentListServiceUrl(wikiId, draftId),
                     requestObj);
            }
            else {
               icBinaryData.sendUrl = lconn.core.url.rewrite(app.routes
                     .getAttachmentListServiceUrl(libraryId, pageId),
                     requestObj);
            }
            sendMultipartFileToAttachement(fileObj);
         }
         if (!nonce) {
            nonce = app.getNonce(f);
            console.log(nonce);
         }
         else
            f(nonce);

      }
      else if (dojo.getObject("ibmConfig.serviceName") === "blogs") {

         // window.p.uploadCb(fileObj, icBinaryData.binaryData);
         var CURRENT_BLOG_URI_REGEX = /blogs\/roller-ui\/authoring\/weblog(.*)entryId=(.*)&id=(.*)&autosave/;
         var idNumbersBlog = currentUrl.match(CURRENT_BLOG_URI_REGEX);

         icBinaryData.sendUrl = '/blogs/roller-ui/authoring/uploadFiles.do';
         sendFileToBlogAttachement(fileObj);

      } else if (dojo.getObject("ibmConfig.serviceName") === "communities" && currentCkeditor.config.isRTE) {
         var app = lconn.wikis.App.getInstance();
         var notSaved;
         var draftId, resourceId, pageId;
         pageId = app.pageId;
         draftId = app.currentCkeditorDraftId;
         resourceId = app.resourceId;
         var requestObj = {};
         if (replace)
            requestObj.replace = 'true';
         if (!pageId) {
            icBinaryData.sendUrl = lconn.core.url.rewrite(app.routes
                  .getDraftAttachmentListServiceUrl(resourceId, draftId),
                  requestObj);
         }
         else {
            icBinaryData.sendUrl = lconn.core.url.rewrite(app.routes
                  .getAttachmentListServiceUrl(resourceId, pageId),
                  requestObj);
         }
         sendMultipartFileToAttachement(fileObj);
      }
   }

   /*
    * Adds new file object to the url array  icBinaryData.URLarray, 
    * this array will be sent to ckeditor to replace base64 with actual url
    * 
    * @param {number} id of the image
    * @param {string} url of the image
    */
   function addNewURLObject(imageId, imageURL) {
      var urlObject = new Object();
      urlObject.id = imageId;
      urlObject.url = imageURL;
      icBinaryData.URLarray.push(urlObject);
   }

})();
