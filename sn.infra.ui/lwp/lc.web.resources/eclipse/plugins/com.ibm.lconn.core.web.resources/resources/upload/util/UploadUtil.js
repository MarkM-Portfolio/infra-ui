/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.upload.util.UploadUtil");
dojo.require("lconn.core.util.text");
dojo.require("com.ibm.oneui.util.proxy");
dojo.require("dojo.io.iframe");
dojo.require("lconn.share.util.atom");


/**
 * Manages uploading files using new API
 * 
 * @class lconn.core.upload.util.UploadUtil
 */
dojo.declare("lconn.core.upload.util.UploadUtil", null,  {
   constructor: function(){
      
   },
   
   getXmlHttpRequest : function() {
      if(typeof XMLHttpRequest !== 'undefined' && !(typeof ActiveXObject !== 'undefined' && !document.addEventListener && window.location.protocol === 'file:')){
         return new XMLHttpRequest();
      } 
      else if(typeof ActiveXObject !== 'undefined') {
         try {
            return new ActiveXObject('Msxml2.XMLHTTP');
         } catch(e) {
            try{
               return new ActiveXObject('Microsoft.XMLHTTP');
            } catch(e) {
               
            }
         }
      }
   },
   
   //duplicate uploadFileInMultiPhases, because uploadFile has been used by others
   uploadFile: function(method, file, args) {
      return this.uploadFileInMultiPhases(method, file, args);
   },
   
   uploadFileInMultiPhases: function(method, file, args) {
      var dfd = null;
      var consumerDfd = new dojo.Deferred();
      var fileObject = dojo.isFunction(file.getObject) ? file.getObject() : file;
      var fileSize = fileObject.size;
      var fileType = fileObject.type;
      args.url = com.ibm.oneui.util.proxy(args.url);
      
      var _handleAsHtml = false;
      if (args.handleAs == "html") {
         args.handleAs = "text";
         _handleAsHtml = true;
      }
      args.handle1 = args.handle;
      delete args.handle;
      
      var hdrs = this.getHeaders(args);
      
      hdrs['X-IBM-UPLOAD-METHOD'] = 'phases';
      hdrs['X-IBM-UPLOAD-SIZE'] = fileSize;
      
      args.headers = hdrs;
      args.sync = "true";
      
      var formData = this.generateFormData(args);
      args.rawBody = formData;
      delete args.content;
      delete args.form;
      delete args.simpleUploadMaxFileSize;
      if (method == "PUT")
         dfd = dojo.xhrPut(args);
      else 
         dfd = dojo.xhrPost(args);
      delete args.rawBody;
      var token = dfd.ioArgs.xhr.getResponseHeader("X-IBM-UPLOAD-TOKEN");
      
      var status = dfd.ioArgs.xhr.status;
      var jsonResponse = null;
      if(_handleAsHtml){
         var doc = this._getDocumentFromText(dfd.ioArgs.xhr.response);
         jsonResponse = lconn.share.util.atom.getJsonResponseFromHtml(doc);
         if(jsonResponse && jsonResponse.status){
            status = jsonResponse.status;
         }
      }
      if (status != 200){
         var err = null;
         if (dojo.isFunction(args.error)) {
            err = args.error;
            delete args.error;
         }
         dfd.addErrback(function(value) {
            return err.call(args, value, ioArgs);
         });
         if(jsonResponse)
         	dfd.error = jsonResponse.contents;
         return dfd;
      }
      else {
         dfd = null;
         hdrs['X-IBM-UPLOAD-TOKEN'] = token;
         hdrs['Content-Type'] = fileType;
         delete hdrs['X-IBM-UPLOAD-SIZE'];
         args.headers = hdrs;
         args.sync = false;
         args.consumerDfd = consumerDfd;
         file.bytesOfUploadedParts = 0;
         this.storeFileData(method, file, args);
         return consumerDfd;
      }
      
      return dfd;
   },

   checkImages: function(files, maxFileSize) {
      var newFiles = [];
      var promiseAll = [];
      for (var i=0; i< files.length; i++) {
          newFiles.push(files[i]);
          var fileType = files[i].type;
          if (fileType.indexOf('jpeg') === -1 && fileType.indexOf('jpg') === -1 &&
              fileType.indexOf('pjpeg') === -1) {
              continue;
          }
          var dfd = this.convertImageOrientation(files[i], {index: i, maxFileSize: maxFileSize}).then(
            dojo.hitch(this, function(data) {
            if (data && data.opts && !data.opts.isOrigin) {
              newFiles.splice(data.opts.index, 1, data.file);
            }
            return data;
          })).always(dojo.hitch(this, function(data) {
            return data;
          }));
          promiseAll.push(dfd);
      }
      var checkImagePromise = new dojo.Deferred();
      var dfdAll = new dojo.DeferredList(promiseAll);
      dfdAll.then(dojo.hitch(this, function() {
          checkImagePromise.resolve(newFiles);
      }))
      return checkImagePromise.promise;
  },

   convertImageOrientation: function(file, opts) {
      var dfd = new dojo.Deferred();
      if (!file) {
        dfd.reject({
          error: {message: "no file provided"},
          file: file,
          opts: dojo.mixin(opts, {isOrigin: true}),
        });
        return dfd.promise;
      }
      this.getImageOrientation(file).then(dojo.hitch(this, function(orientation) {
        if (!orientation || orientation <= 1) {
          var retOpt = dojo.mixin(opts, {isOrigin: true});
          dfd.reject({error: {message: "no rotation"}, file: file, opts: retOpt});
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(response) {
            var image = new Image();
            image.onload = function() {
              var w = image.width;
              var h = image.height;
              //verify image size change rate
              var canvas = document.createElement('canvas');
              var context = canvas.getContext('2d');
              if (!canvas.toBlob) {
                if (opts && opts.maxFileSize && file.size < opts.maxFileSize) {
                  canvas.width  = w;
                  canvas.height = h;
                  context.save();
                  context.clearRect(0, 0, w, h);
                  context.drawImage(image, 0, 0, w, h);
                  var binStrTemp = atob(canvas.toDataURL('image/jpeg', 1.0).split(',')[1]);
                  var len = binStrTemp.length;
                  if (len > opts.maxFileSize) {
                    // if original size is smaller than the max file size,
                    // and the converted size changed larger than the max,
                    // we need to shrink the width and the height of the image
                    // so that the image could be uploaded correctly
                    var ratio = file.size/len;
                    w *= ratio;
                    h *= ratio;
                  }
                }
              }

              canvas.width  = w;
              canvas.height = h;
              context.save();
              var width  = canvas.width;
              var height = canvas.height;
              var styleWidth  = canvas.style.width;
              var styleHeight = canvas.style.height;
              context.clearRect(0, 0, w, h);
              if (orientation>1) {
                if (orientation > 4) {
                  canvas.width  = height;
                  canvas.style.width  = styleHeight;
                  canvas.height = width;
                  canvas.style.height = styleWidth;
                }
                switch (orientation) {
                  case 2: context.translate(width, 0);     context.scale(-1,1); break;
                  case 3: context.translate(width,height); context.rotate(Math.PI); break;
                  case 4: context.translate(0,height);     context.scale(1,-1); break;
                  case 5: context.rotate(0.5 * Math.PI);   context.scale(1,-1); break;
                  case 6: context.rotate(0.5 * Math.PI);   context.translate(0,-height); break;
                  case 7: context.rotate(0.5 * Math.PI);   context.translate(width,-height); context.scale(-1,1); break;
                  case 8: context.rotate(-0.5 * Math.PI);  context.translate(-width,0); break;
                }
              }
              context.drawImage(image, 0, 0, width, height);
              if (canvas.toBlob){
                canvas.toBlob(dojo.hitch(this, function(blob) {
                  var newImageFile = new File([blob], file.name, {
                    type: file.type,
                    lastModified: file.lastModified,
                    lastModifiedDate: file.lastModifiedDate,
                  });
                  var retOpt = dojo.mixin(opts, {isOrigin: false});
                  var ret = {file: newImageFile, opts: retOpt};
                  dfd.resolve(ret);
                }), 'image/jpeg');
              } else {
                // mainly for IE browser
                var binStr = atob(canvas.toDataURL('image/jpeg', 1.0).split(',')[1]);
                var len = binStr.length;
                var arr = new Uint8Array(len);

                for (var i=0; i<len;i++) {
                  arr[i] = binStr.charCodeAt(i);
                }

                var newImageFile = new Blob([arr], {type: 'image/jpeg'});
                newImageFile.name = file.name;
                newImageFile.type = file.type;
                newImageFile.lastModified = file.lastModified;
                newImageFile.lastModifiedDate = file.lastModifiedDate;
                var retOpt = dojo.mixin(opts, {isOrigin: false});
                var ret = {file: newImageFile, opts: retOpt};
                dfd.resolve(ret);
              }
            }
            image.src = response.target.result;
          }
        }
        
      })).otherwise(dojo.hitch(this, function(err) {
        var retOpt = dojo.mixin(opts, {isOrigin: true});
        dfd.reject({error: err, file: file, opts: retOpt});
      }));
      return dfd.promise;
   },

   getImageOrientation: function(image) {
      var dfd = new dojo.Deferred();
      var reader = new FileReader();
      reader.readAsArrayBuffer(image);
      reader.onload = function(arrBufResponse) {
        var imageView = new DataView(arrBufResponse.target.result);
        // SOI marker
        if (imageView.getUint16(0, false) != 0xFFD8) {
            return dfd.reject({code: -2, message: "It's not JPEG, no need to convert"});
        }
        var offset = 2;
        var len = imageView.byteLength;
        // APP1 marker
        while (offset < Math.min(1000, len)) {
            var marker = imageView.getUint16(offset, false);
            offset += 2;
            if (marker === 0xFFE1) {
    		    	break;
            } else if ((marker & 0xFF00) != 0xFF00) {
              return dfd.reject({code: -2, message: "Error in reading image EXIF information"});
            } else {
              offset += imageView.getUint16(offset, false);
    		    }
        }
        if (offset >= len) {
            return dfd.reject({code: -2, message: "No APP1 tag found in image"});
        }

        // now offset point to APP1 marker 0xFFD8
        var APP1_offset = offset;
        // offset + 4 point to EXIF header
        var EXIF_offset = APP1_offset + 2;

        // check if have 'Exif' ascii string: 0x45786966
        if (imageView.getUint32(EXIF_offset, false) != 0x45786966) {
            return dfd.reject({code: -1, message: "No EXIF information found in image"});
        }

        var TIFF_offset = EXIF_offset + 6;
        // 0x4d4d: big ending, 0x4949: little ending
        var isLittle = (imageView.getUint16(TIFF_offset, false) == 0x4949);
        var IFD0_offset = TIFF_offset + imageView.getUint32(TIFF_offset + 4, isLittle);
        var tags = imageView.getUint16(IFD0_offset, isLittle);
        var tags_offset = IFD0_offset + 2;
        for (var i = 0; i < tags; i++) {
            if (imageView.getUint16(tags_offset + (i * 12), isLittle) == 0x0112)
            {
                var orientation = imageView.getUint16(tags_offset + (i * 12) + 8, isLittle);
                return dfd.resolve(orientation);
            }
        }
        return dfd.reject({code: -1, message: "No orientation information found in image"});
      }
      reader.onerror = function() {
        return dfd.reject({code: -2, message: "Read image file error"});
      }
      reader.onabort = function() {
        return dfd.reject({code: -2, message: "Read image file aborted"});
      }
      return dfd.promise;
   },

   generateFormData: function(args) {
      var params = dojo.mixin({}, args.content || {});
      if (args.form) {
         dojo.mixin(params, dojo.formToObject(args.form));
      }  
       
      var formData = new FormData();
      for (var k in params) {
         // in safari, hasOwnProperty returns true if params[k] == null or
         // undefined, if it's explicitly set. remove those.
         if (params.hasOwnProperty(k) && params[k] != null) {
            var vs = params[k];
            if (!dojo.isArray(vs)) {
               vs = [vs];
            }

            dojo.forEach(vs, function(v) {
               if (v === true)
                  v = "true";
               else if (v === false)
                  v = "false";
               formData.append(k, v);
            });
         }
      }
      
      return formData;
   },
   
   getHeaders: function(args) {
      var hdrs = dojo.mixin({}, args.headers || {});
      for(var k in hdrs) {
         if (hdrs.hasOwnProperty(k) && hdrs[k] && !dojo.isFunction(hdrs[k])) {
            hdrs[k] = lconn.core.util.text.encodeHeaderUtf8(hdrs[k]);
         }
      }
      
      if(args.nonce)
         hdrs['X-Update-Nonce'] = args.nonce;
      if(args.methodOverride)
         hdrs['X-Method-Override'] = args.methodOverride;
      if(args.ifMatch)
         hdrs['If-Match'] = args.ifMatch;
      
      return hdrs;
   },

   cancelResumableUpload: function (method, file, args) {    
      var ioArgs = {args: args, url: args.url};
      ioArgs.handleAs = args.handleAs || "text";
      
      file.uploadDfd = null; // Set it to be null to stop the rest of upload. 

      var fileObject = dojo.isFunction(file.getObject) ? file.getObject() : file;

      var dfd = new dojo.Deferred();

      var oXHR = this.getXmlHttpRequest();
      
      oXHR.open(method, com.ibm.oneui.util.proxy(args.url), true);
      
      var hdrs = args.headers;
      for (var k in hdrs){
         oXHR.setRequestHeader(k, hdrs[k]);
      }

     oXHR.setRequestHeader("Content-Range", "bytes */0"); 
     oXHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

     ioArgs.xhr = oXHR;

     try{
        oXHR.send(fileObject.slice(0, 1));
        dfd.ioArgs = ioArgs;
     } catch(e) {
        dfd.reject(e);
     }
 
     return dfd;
   },

   storeFileData: function(method, file, args, begin, end) {
      var ioArgs = {args: args, url: args.url};
      ioArgs.handleAs = args.handleAs || "text";

      args.handle = args.handle1;
      delete args.handle1;
      
      var dfd = new dojo.Deferred();
      var fileObject = dojo.isFunction(file.getObject) ? file.getObject() : file;
      var fileSize = fileObject.size;
      var fileType = fileObject.type;
      var handle = null, load = null, err = null;
      var CHUNK_SIZE_IN_BYTES = 524288000;
      
      file.uploadDfd = dfd;
      
      if (dojo.isFunction(args.handle)) {
         handle = args.handle;
         delete args.handle;
      }

      if (dojo.isFunction(args.load)) {
         load = args.load;
         delete args.load;
      }

      if (dojo.isFunction(args.error)) {
         err = args.error;
         delete args.error;
      }

      if (args.addBoth)
         dfd.addBoth(args.addBoth);

      if (args.callback)
         dfd.addCallback(args.callback);

      if (args.errback)
         dfd.addErrback(args.errback);

      begin = !begin ? 0 : begin;
      end = !end ? begin + CHUNK_SIZE_IN_BYTES : end;

      var oXHR = this.getXmlHttpRequest();
      
      oXHR.upload.addEventListener("progress", function(event) {
         if (event && event.lengthComputable) {
            if (fileSize >= event.loaded) {
               if(dojo.isFunction(file.setBytesComplete)) {
                  var bytesCompleted = file.getBytesComplete();
                  if (bytesCompleted < end) {
                     console.debug("Bytes of uploaded parts for " + file.getName() + ": " + file.bytesOfUploadedParts);
                     bytesCompleted = file.bytesOfUploadedParts + event.loaded;
                     file.setBytesComplete(bytesCompleted > end ? end : bytesCompleted);
                  }
               }
            }
         }
      }, false);
      
      dfd.cancel = args.consumerDfd.cancel = dojo.hitch(this, function () {
         var _at = typeof oXHR.abort;
         if(_at === 'function' || _at === 'object' || _at === 'unknown'){
            oXHR.abort();
         }
       
         if (begin > 0 || end < fileSize) {
            this.cancelResumableUpload(method, file, args);
          }
      });

      oXHR.open(method, com.ibm.oneui.util.proxy(args.url), true);
      oXHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      
      var hdrs = args.headers;
      for (var k in hdrs){
         oXHR.setRequestHeader(k, hdrs[k]);
      }

      // Set Content-Range header
      if (fileSize >= CHUNK_SIZE_IN_BYTES) {
        var lastBytes = end >= fileSize ? fileSize - 1 : end - 1;
        oXHR.setRequestHeader("Content-Range", "bytes " + begin + "-" + lastBytes + "/" + fileSize); 
      }

      ioArgs.xhr = oXHR;

      oXHR.onreadystatechange = dojo.hitch(this, function () {
         if(oXHR.readyState == 4) {
            if(oXHR.status == 200 || oXHR.status == 201) {
               if (end >= fileSize) {
                  var doc = this._getDocumentFromText(oXHR.response);
                  var json = lconn.share.util.atom.getJsonResponseFromHtml(doc);
                  json.doc = doc;
                  dfd.resolve(json);
                  if (args.isConsumer) {
                     args.consumerDfd.resolve(json);
                  }
               }
               else {
                  var contents = new Object();
                  dfd.resolve({"partialUploaded": true, "status": 200, "contents": contents} );
                  args.consumerDfd.progress({"partialUploaded": true, "status": 200, "contents": contents});
                  args.handle1 = handle;
                  args.load = load;
                  args.error = err;
                  
                  if (file.uploadDfd) {
                     file.bytesOfUploadedParts = file.getBytesComplete();
                     file.uploadDfd = this.storeFileData(method, file, args, end, end+CHUNK_SIZE_IN_BYTES);
                  }
               }
            } 
            else if(oXHR.status == 0) {
               if (dojo.isFunction(file.setUploadState)) {
                  file.setUploadState(file.UploadStates.READY);
                  file.setEnabled(true); 
               }
            }
            else {
               dfd.reject(oXHR.response);
               args.consumerDfd.reject(oXHR.response);
            }
         }
      }, this);

      try{
         dfd.ioArgs = ioArgs;

         if (load) {
            dfd.addCallback(function(value) {
               return load.call(args, value, ioArgs);
            });
         }

         if (err) {
            dfd.addErrback(function(value) {
               return err.call(args, value, ioArgs);
            });
         }

         if (handle) {
            dfd.addBoth(function(value) {
               if (value.partialUploaded) 
                  return;
            
               return handle.call(args, value, ioArgs);
            });
         }

         oXHR.send(fileObject.slice(begin, end));
      } catch(e) {
         dfd.reject(e);
      }
 
      return dfd;
    },

    uploadFileInSinglePhase: function(method, file, args) {
       args.handleAs = args.handleAs || "text";
       this.args = args;
       var ioArgs = {args: args, url: args.url};
       var dfd = new dojo.Deferred();
       var fileObjectOrigin = dojo.isFunction(file.getObject) ? file.getObject() : file;
       var fileObject = fileObjectOrigin;
       var dfdImageConvertion = new dojo.Deferred();
       var promise = dfdImageConvertion.promise;
       var maxAttachSize = dojo.getObject("lconn.share0.config.services.maxAttachmentSize");
       if (window.gatekeeperConfig && window.gatekeeperConfig['image_auto_rotate_enable']) {
          this.checkImages([fileObjectOrigin], maxAttachSize).then(dojo.hitch(this, function(newFiles) {
            fileObject = newFiles && newFiles.length === 1 ? newFiles[0] : fileObjectOrigin;
          })).always(function(){
            dfdImageConvertion.resolve();;
          });
       } else {
          dfdImageConvertion.resolve();
       }

       promise.then(dojo.hitch(this, function() {
          var fileSize = fileObject.size;
          var handle = null, load = null, err = null;
          
          if (dojo.isFunction(args.handle)) {
            handle = args.handle;
            delete args.handle;
          }
  
          if (dojo.isFunction(args.load)) {
            load = args.load;
            delete args.load;
          }
  
          if (dojo.isFunction(args.error)) {
            err = args.error;
            delete args.error;
          }
          
          var oXHR = this.getXmlHttpRequest();
          
          oXHR.upload.addEventListener("progress", function(event) {
            if (event && event.lengthComputable) {
                if (fileSize >= event.loaded) {
                  if(dojo.isFunction(file.setBytesComplete)) {
                      file.setBytesComplete(event.loaded);
                  }
                }
            }
          }, false);
          
          oXHR.open(method, com.ibm.oneui.util.proxy(args.url), true);
          oXHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          
          var hdrs = this.getHeaders(args);
          for (var k in hdrs){
            oXHR.setRequestHeader(k, hdrs[k]);
          }
          
  
          var formData = this.generateFormData(args);
            formData.append("file", fileObject);
          
          oXHR.onreadystatechange = dojo.hitch(this, function () {
            if(oXHR.readyState == 4) {
                if(oXHR.status == 200 || oXHR.status == 201) {
                  if(this.args.handleAs == "html" || this.args.handleAs == "text") {
                      var doc = this._getDocumentFromText(oXHR.response);
                      var json = lconn.share.util.atom.getJsonResponseFromHtml(doc);
                      json.doc = doc;
                      var error = lconn.share.util.atom.getJsonError(json);
                      if(error)
                        dfd.resolve(error);
                      else 
                        dfd.resolve(json);
                  }
                  else
                      dfd.resolve(oXHR.response);
                }
                else {
                  dfd.reject(oXHR.response);
                }
            }
          }, this);
          
          dfd.cancel = dojo.hitch(this, function () {
            var _at = typeof oXHR.abort;
            if(_at === 'function' || _at === 'object' || _at === 'unknown'){
                oXHR.abort();
            }
          });
          
          try{
            dfd.ioArgs = ioArgs;
            if (load) {
                dfd.addCallback(function(value) {
                  return load.call(args, value, ioArgs);
                });
            }
  
            if (err) {
                dfd.addErrback(function(value) {
                  return err.call(args, value, ioArgs);
                });
            }
  
            if (handle) {
                dfd.addBoth(function(value) {
                  return handle.call(args, value, ioArgs);
                });
            }
            oXHR.send(formData);
          }catch(e) {
            dfd.reject(e);
          }
       }));
       return dfd;
    },
    
    _getDocumentFromText: function(value) {
       if (value instanceof Error) {
          return value;
       }

       this._deleteIFrame("html5Frame");
       var dii = dojo.io.iframe;
       var iframe = dii.create("html5Frame");
       var idoc = dii.doc(iframe);

       // call Document::close here to effectively clear the document
       idoc.close();
       idoc.open();
       idoc.write(value);

       // call Document::close to avoid a false-positive loading message from browsers
       idoc.close();

       return idoc;
    },
       
    _deleteIFrame: function(fname) {
       try {
          if (window[fname]) {
             delete window[fname];
          } else if (window.frames[fname]) {
             delete window.frames[fname];
          }
       } catch(e) {
          // Can throw an exception in IE
       }
    }
});
