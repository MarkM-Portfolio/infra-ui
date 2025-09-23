/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited. 2011, 2022                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.upload.provider.HtmlFileProvider");

dojo.require("dojo.io.iframe");
dojo.require("dojo.string");

dojo.require("com.ibm.oneui.util.proxy");

dojo.require("lconn.core.upload.data.File");
dojo.require("lconn.core.util.text");
dojo.require("lconn.core.upload.util.UploadUtil");
dojo.requireLocalization("lconn.core.upload", "upload");
dojo.requireLocalization("lconn.files", "action");

(function() {
   var dii = dojo.io.iframe, useButton = !dojo.isFF, uiEnabled = dojo.cookie('cnx8-ui') == 1;

   var nls = dojo.i18n.getLocalization("lconn.core.upload", "upload");
   var nlsNew = dojo.i18n.getLocalization("lconn.files", "action").UPLOAD_FILE;

   var uploadUtil = new lconn.core.upload.util.UploadUtil();

   /**
    * @class lconn.core.upload.provider.HtmlFileProvider
    */
   dojo.declare("lconn.core.upload.provider.HtmlFileProvider", null, /** @lends lconn.core.upload.provider.HtmlFileProvider.prototype */ {

      allowHTML5: (function() {
         var input = dojo.doc.createElement('input');
         input.type="file";

         return ('files' in input) && window.FormData;
      })(),

      _deleteIFrame: function(fname) {
         try {
            if (window[fname]) {
               delete window[fname];
            } else if (window.frames[fname]) {
               delete window.frames[fname];
            }
         }catch(e) {
            // Can throw an exception in IE
         }
      },

      _getInputID: function(controller) {
         return controller.id + "_contents";
      },

      _updateLabel: function(field, label) {
         if (label && field && field.controller)
            dojo.attr(label, "for", this._getInputID(field.controller));
      },

      _buildFileInput: function(field, label, _listeners, offScreen) {
         var input = this.browseInput = dojo.isIE < 9 ? dojo.doc.createElement('<input type="file">') : dojo.doc.createElement("input");
           input.type = "file";
           input.id = this._getInputID(field.controller);
           input.name = field.controller.inputName || "file";
           input.style.display = "block";
           if (this.allowHTML5 && field.isAllowMultipleFiles())
              input.multiple = "multiple";

           input.className = offScreen ? "lotusOffScreen" : "lotusText lotusLTR lotusAlignLeft qkrFile";
           dijit.setWaiState(input, "required", true);

           if (dojo.isIE < 8) {
               _listeners.push(dojo.connect(input, "ondrop", dojo.stopEvent));
               _listeners.push(dojo.connect(input, "oncut", dojo.stopEvent));
               _listeners.push(dojo.connect(input, "onpaste", dojo.stopEvent));
               _listeners.push(dojo.connect(input, "onkeypress", function(event) {
                  /* Allow events with modifiers to pass through */
                  if (event.ctrlKey || event.metaKey || event.altKey)
                      return;

                  if (event.keyChar || event.keyCode == dojo.keys.DELETE || event.keyCode == dojo.keys.BACKSPACE)
                      dojo.stopEvent(event);
              }));
           }


           _listeners.push(dojo.connect(input, "onchange", dojo.hitch(this, function() {
              this._beforeInputChanged();
              this._handleInputChange(input, field);
           })));
           this._updateLabel(field, label);

           if (this.allowHTML5 && dojo.isSafari && dojo.isSafari < 5.2) {
              var div = dojo.create("div");
                 input.style.opacity = "0";
                 input.style.filter = "alpha(opacity=0)";
                 input.style.position = "absolute";
                 input.style.left = "0";
                 input.style.top = "-9999px";
                 input.setAttribute("tabindex", "-1");
              div.appendChild(input);
                 var span = dojo.create("span", {
                    className: "lotusBtn"
                 });
                    var inputButton = this.browseInput = dojo.create("a", {
                       href: "javascript:;",
                       className: "lotusFormButton",
                       role: "button"
                    });
                    var btnTitle;
                    if(this.allowHTML5)
                       btnTitle = field.isAllowMultipleFiles() ? nls.BUTTON_TEXT_WEBKIT : nls.BUTTON_TEXT_WEBKIT_1;
                    else
                       btnTitle = uiEnabled ? this.addMoreFiles==true ? nlsNew.ADD_MORE_FILE_V8 : nlsNew.SELECT_FILE_V8 : nls.BUTTON_TEXT;
                    inputButton.title = btnTitle;
                    inputButton.appendChild(dojo.doc.createTextNode(btnTitle));

                    _listeners.push(dojo.connect(inputButton, "onclick", input, "click"));
                 span.appendChild(inputButton);
              div.appendChild(span);
              return div;
           }
           return input;
      },

      _handleFakeButtonClick: function(field, label, _listeners) {
         var input = this._buildFileInput(field, label, _listeners, true);
         dojo.body().appendChild(input);

         input.click();
      },

      buildInput: function(field, label) {
    	  
    	  var addMoreFiles=this.addMoreFiles= false;
    	  
    	  if(field!=undefined && field.ADD_MORE_FILESV8==true){
    		  addMoreFiles=this.addMoreFiles=true;
    	  }
         var _listeners = [];

         if (!this.allowHTML5 || (dojo.isSafari && dojo.isSafari < 5.2))
            var input = this.input = this._buildFileInput(field, label, _listeners, false);
         else {
            if (useButton) {
               var input = this.input = this.browseInput = dojo.doc.createElement('button');
               input.appendChild(dojo.doc.createTextNode(uiEnabled ? this.addMoreFiles==true ? nlsNew.ADD_MORE_FILE_V8 : nlsNew.SELECT_FILE_V8 : nls.BUTTON_TEXT));
            } else {
               var input = this.input = this.browseInput = dojo.create('input');
               input.type = "button";
               input.value = uiEnabled ? this.addMoreFiles==true ? nlsNew.ADD_MORE_FILE_V8 : nlsNew.SELECT_FILE_V8 : nls.BUTTON_TEXT;
            }
            input.className = 'lotusBtn';
            input.id = "lconn_btn_browse_files";
            if (field.isRequiredField()) {
               dijit.setWaiState(input, "required", true);
            }

            _listeners.push(dojo.connect(input, "onclick", dojo.hitch(this, function(event) {
               dojo.stopEvent(event);
               this._handleFakeButtonClick(field, label, _listeners);
            })));
            if(this.fileInputForTest){
               var fileInputForTest = this.fileInputForTest = this._buildFileInput(field, label, _listeners, true);
               dojo.body().appendChild(fileInputForTest);
            }
         }

           return  {
              domNode: input,
              destroy: dojo.partial(function(provider) {
                 dojo.forEach(_listeners, dojo.disconnect);
                 if(provider.fileInputForTest){
                    dojo.body().removeChild(provider.fileInputForTest);
                    provider.fileInputForTest = null;
                 }
              }, this)
           };
      },

      getFocusNode: function() {
         return this.browseInput;
      },
      
      uploadFile: function(manager, file, args) {
         var networkOS = null;

         if (args.osConfig) {
            var networkOSConf = {
                  getAuthenticatedUser : function(){
                     return { nonce: args.nonce };
                  }
               };
            dojo.mixin(networkOSConf, args.osConfig);

            networkOS = new lconn.files.util.os.NetworkOS(networkOSConf);
         }

         if (this.allowHTML5) {
            return this._uploadFileHTML5(manager, file, args, networkOS);
         } else {
            return this._uploadFileIFrame(manager, file, args, networkOS);
         }
      },

      /**
       * Support older browsers such as <IE8
       */
      _uploadFileIFrame: function(manager, file, args, networkOS) {
         var dfd = null;

         if (!args.form) {
            var form = dojo.create('form', { 'className': 'lotusOffScreen', 'method': 'post' });
            dojo.body().appendChild(form);

            args.form = form;
         }

         var input = file.getObject();
         dojo.addClass(input, "lotusOffScreen");
         args.form.appendChild(input);
         dojo.attr(args.form, "enctype", "multipart/form-data");
         dojo.attr(args.form, "encoding", "multipart/form-data");

         if (!args.method) {
            args.method = dojo.attr(args.form, "method") || "POST";
         }

         // TODO: Non-HTML5 browsers (IE without flash, FF 3.6) will set the values null or undefined as string values onto a hidden
         // input and Dojo 1.4 does not work around this.  Replace values with empty string
         // to match other browsers behavior.  Remove when Dojo fixes.
         var content = args.content;
         if (content)
            for (var key in content)
               if (content[key] == undefined) // also == null
                  content[key] = "";

         var self = this;
         dfd = dojo.io.iframe.send(args);
         dfd.addBoth(function(result) {
            if (input && input.parentNode) {
               input.parentNode.removeChild(input);
            }
            if (result && result instanceof Error && result.dojoType == "cancel") {
               self._cancelIFrame();
            }
         });

         this._queueProgressCheck(manager, file);

         return dfd;
      },
      
      /**
       * Support newer browsers that support "fileManager" API
       */
      _uploadFileHTML5 : function(manager, file, args, networkOS) {
         var multiPhaseFileUpload = !!dojo.getObject("lconn.share.config.services.multiPhaseFileUpload");
         if(multiPhaseFileUpload && args.simpleUploadMaxFileSize && file.getSize() > args.simpleUploadMaxFileSize){
            
            return uploadUtil.uploadFile("POST", file, args); 
         }
         
         var dfd = null;

         if (file.getSize() == 0) {
            return this._sendZeroByteUpload(manager, file, args);
         }

         var _handleAsHtml = false;
         if (args.handleAs == "html") {
            args.handleAs = "text";
            _handleAsHtml = true;
         }
         args.headers["X-Update-Nonce"] = args.nonce;
         var params = dojo.mixin({}, args.content || {});

         if (args.form) {
            dojo.mixin(params, dojo.formToObject(args.form));
         }
         var formData = new FormData();
         var fileObject = file.getObject();
         if (window.gatekeeperConfig && window.gatekeeperConfig['image_auto_rotate_enable']
                  && manager && manager.controller && manager.controller.needToFixEXIF) {
            formData.append(dojo.getObject("controller.inputName", false, manager) || "file", fileObject, file.getName());   
         } else {
            formData.append(dojo.getObject("controller.inputName", false, manager) || "file", fileObject);
         }
         for (var k in params) {
            // in safari, hasOwnProperty returns true if params[k] == null or undefined, if it's explicitly set. remove those.
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
                  formData.append(k,v);
               });
            }
         }
         
         var url = args.url;

         if (!url && args.form) {
            url = dojo.attr(args.form, "action");
         }

         if (!url) {
            throw new Error("null url");
         }

         args.rawBody = formData;

         var handle = null;
         var load = null;
         var err = null;

         // manage callbacks differently because dojo.xhr doesn't
         // natively handle handleAs=html
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

         if (networkOS) {
            dfd = networkOS.postMultipart(args);
         } else {
            args.url = com.ibm.oneui.util.proxy(url);

            var f = dojo._xhrObj;
               dojo._xhrObj = function() {
                  var ret = f.apply(this, arguments);
                  dojo._xhrObj = f;
                  if (ret.upload) {
                    ret.upload.addEventListener("progress", function(event) {
                     if (event && event.lengthComputable) {
                        if (file.getSize() > event.loaded) {
                           file.setBytesComplete(event.loaded);
                        }
                     }
                    }, false);
                  }
                  return ret;
               }

            dfd = dojo.xhrPost(args);
         }

         var ioArgs = dfd.ioArgs || args;

         if (_handleAsHtml) {
            dfd.addBoth(dojo.hitch(this, function(value) {
               if (value instanceof Error) {
                  return value;
               }

               this._deleteIFrame("html5Frame");

               var iframe = dii.create("html5Frame");
               var idoc = dii.doc(iframe);

               // call Document::close here to effectively clear the document
               idoc.close();
               idoc.open();
               idoc.write(value);

               // call Document::close to avoid a false-positive loading message from browsers
               idoc.close();

               return idoc;
            }));
         }

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

         return dfd;
         
      },

      _cancelIFrame: function() {
         dii = dojo.io.iframe;
         if (dii._frame) {
            try {
               // Set iframe to blank doc to cancel
               var doc = dii.doc(dii._frame);
               if (doc) {
                  var uri = (dojo.config["dojoBlankHtmlUrl"]||dojo.moduleUrl("dojo", "resources/blank.html"));
                  doc.location.replace(uri);
               }
            } catch (e) {
            if (dojo.config.isDebug) {
               console.debug("dojo.io.iframe.cancel: ", e);
            }
               // assume unrecoverable iframe error
               try {
                  var frame = dii._frame;
                  if (frame.parentNode)
                     frame.parentNode.removeChild(frame);
                  delete dii._frame;
                  delete window[dii._iframeName];
               }
               catch(e2) {
                  // Can throw errors in IE
                  if(dojo.config.isDebug) {
                  console.debug("dojo.io.iframe.cancel2: ", e2);
                  }
               }
            }
         }
      },

      _sendZeroByteUpload: function(manager, file, args) {
         var params = dojo.mixin({}, args.content || {});

         if (args.form) {
            dojo.mixin(params, dojo.formToObject(args.form));
         }

         var boundary = "--------" + (new Date()).getTime();

         args.url = com.ibm.oneui.util.proxy(args.url);

         args.postData = this._buildMultipart(dojo.getObject("controller.inputName", false, manager), file, params, boundary);

         // Don't mess with original headers
         var hdrs = dojo.mixin({}, args.headers || {});
         for (var k in hdrs) {
            if (hdrs.hasOwnProperty(k) && hdrs[k] && !dojo.isFunction(hdrs[k])) {
               hdrs[k] = lconn.core.util.text.encodeHeaderUtf8(hdrs[k]);
            }
         }

         // don't encode the content type header
         hdrs['Content-type'] = 'multipart/form-data;boundary=' + boundary;

         args.headers = hdrs;

         var _handleAsHtml = false;
         if (args.handleAs == "html") {
            args.handleAs = "text";
            _handleAsHtml = true;
         }

         var handle = null;
         var load = null;
         var err = null;

         // manage callbacks differently because dojo.xhr doesn't
         // natively handle handleAs=html
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

         dfd = dojo.xhrPost(args);
         var ioArgs = dfd.ioArgs || args;

         if (_handleAsHtml) {
            dfd.addBoth(dojo.hitch(this, function(value) {
               this._deleteIFrame("zbFrame");

               var iframe = dii.create("zbFrame");
               var idoc = dii.doc(iframe);

               // call Document::close here to effectively clear the document
               idoc.close();
               idoc.open();
               idoc.write(value);

               // call Document::close to avoid a false-positive loading message from browsers
               idoc.close();

               return idoc;
            }));
         }

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

         return dfd;
      },

      _queueProgressCheck: function(manager, file) {
         if (manager.checkProgress) {
            manager.checkProgressInterval = manager.checkProgressInterval || 10000;

            var self = this;
            manager.checkProgressTimer = setTimeout(function() {
               if (manager.currentFile && file == manager.currentFile) {
                  var deferred = manager.currentProgressCheck = manager.checkProgress(manager.currentFile);
                  deferred.addBoth(self, "_queueProgressCheck", manager, file);
               }
            }, manager.checkProgressInterval);
         }
      },
      _beforeInputChanged: function() {},
      _handleInputChange: function(input, field) {
         // delete the id to ensure uniqueness (will be assigned a unique id by the file list)
         dojo.removeAttr(input, "id");

         if (this.allowHTML5) {
            if (!input.files || !input.files.length) {
              return;
            }

            var dfd = this.addHTML5Files(input.files, field.controller.fileList, field.controller.needToFixEXIF);
            dfd.always(dojo.hitch(this, function() {
              // this input will be created when the fake button is clicked, and cannot be destroyed when _buildInput is called again,
              // so call it manually.
              input.parentNode.removeChild(input);
              field._buildInput();
              field._focusFirstFileOfCurrentSelection();
            }));
            return;
         } else {
            var name = lconn.core.util.text.getFilename(input.value);
            var bean = new lconn.core.upload.data.File(input, name);
            field.controller.fileList.addFiles([bean]);
         }

         field._buildInput();
         field._focusFirstFileOfCurrentSelection();
      },

      addHTML5Files: function(files, fileList, needToFixEXIF) {
         if (!files || !files.length || !this.allowHTML5)
            return;

         var dfd = new dojo.Deferred();
         var convertFilePromise = dfd.promise;
         if (window.gatekeeperConfig && window.gatekeeperConfig['image_auto_rotate_enable']
            && needToFixEXIF) {
            var maxSize = fileList && fileList.getMaxFileSize();
            convertFilePromise = uploadUtil.checkImages(files, maxSize);
         } else {
            dfd.resolve(files);
         }
         var originalSizeList = [];
         for (var i=0; i<files.length; i++) {
           var fileObj = files.item && files.item(i);
           if (fileObj) {
            originalSizeList.push({fileName: fileObj.name, fileSize: fileObj.size});
           }
         }
         this._fileSizeList = originalSizeList;
         return convertFilePromise.then(dojo.hitch(this, function(newFiles) {
            var fileBeans = [];
            dojo.forEach(newFiles, function(file) {
              var name = lconn.core.util.text.getFilename(file.name);
              var bean = new lconn.core.upload.data.File(file, name);
  
              var opt = this._fileSizeList.filter(function(item) {
                return item && (item.fileName == file.name);
              });
              var fileSize = file.size;
              if (opt && opt.fileSize > file.size) {
                fileSize = opt.fileSize;
              }
              try {
                  bean.setSize(fileSize);
                  fileBeans.push(bean);
              } catch (e) {
                  var error = [ { message: dojo.string.substitute(nls.ERROR_IO, [name]) } ];
                  fileList.onAddFilesError(error);
              }
            }, this);
            fileList.addFiles(fileBeans);
         }));
      },

      _buildMultipart: function(inputName, file, params, boundary) {
         var divider = '--' + boundary;

         var data = [ divider ];
         var fileInputName = inputName || "file";
         data.push('Content-Disposition: form-data; name="' + fileInputName + '"; filename="' + file.getOriginalFileName() + '"');

         // RFC 2388 states that file parts with undiscoverable mime types should be sent
         // with the application/octet-stream mime-type.
         data.push('Content-Type: application/octet-stream');

         // empty file parts in a multipart upload need 2 blank lines, not one
         data.push('');
         data.push('');

         for (var key in params) {
            if (dojo.isString(key)) {
               var values = params[key];

               if (!dojo.isArray(values)) {
                  values = [ values ];
               }

               dojo.forEach(values, function(value) {
                  data.push(divider);
                  data.push('Content-Disposition: form-data; name="' + key + '"');
                  data.push('');
                  data.push(value);
               }, this);
            }
         }

         data.push(divider + '--');

         return data.join('\r\n');
      }
   });
})();
