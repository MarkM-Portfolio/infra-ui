/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/dom-class",
      "dojo/i18n",
      "dojo/_base/declare",
      "dojo/has",
      "dojo/_base/array",
      "dojo/_base/lang",
      "dojo/i18n!../nls/upload",
      "dojo/dom-attr",
      "dojo/dom-construct",
      "dojo/_base/window",
      "dojo/io/iframe",
      "dojo/on",
      "dojo/string",
      "dojo/topic",
      "../../proxy",
      "../data/File",
      "../../util/text"
],
   function(dojo, domClass, i18n, declare, has, array, lang, i18nupload, domAttr, domConstruct, windowModule, iframeModule, on, string, topic, proxy, File, text) {

      var dii = iframeModule, useButton = !has("ff");

      var nls = i18nupload;

      /**
       * @class ic-core.upload.provider.HtmlFileProvider
       */
      var HtmlFileProvider = declare("lconn.core.upload.provider.HtmlFileProvider", null, /** @lends ic-core.upload.provider.HtmlFileProvider.prototype */
      {

         allowHTML5 : (function() {
            var input = windowModule.doc.createElement('input');
            input.type = "file";

            return ('files' in input) && window.FormData;
         })(),

         _deleteIFrame : function(fname) {
            try {
               if (window[fname]) {
                  delete window[fname];
               }
               else if (window.frames[fname]) {
                  delete window.frames[fname];
               }
            }
            catch (e) {
               // Can throw an exception in IE
            }
         },

         _getInputID : function(controller) {
            return controller.id + "_contents";
         },

         _updateLabel : function(field, label) {
            if (label && field && field.controller)
               domAttr.set(label, "for", this._getInputID(field.controller));
         },

         _buildFileInput : function(field, label, _listeners, offScreen) {
            var input = this.browseInput = has("ie") < 9 ? windowModule.doc.createElement('<input type="file">') : windowModule.doc.createElement("input");
            input.type = "file";
            input.id = this._getInputID(field.controller);
            input.name = field.controller.inputName || "file";
            input.style.display = "block";
            if (this.allowHTML5 && field.isAllowMultipleFiles())
               input.multiple = "multiple";

            input.className = offScreen ? "lotusOffScreen" : "lotusText lotusLTR lotusAlignLeft qkrFile";
            dijit.setWaiState(input, "required", true);

            if (has("ie") < 8) {
               _listeners.push(on(input, "drop", dojo.stopEvent));
               _listeners.push(on(input, "cut", dojo.stopEvent));
               _listeners.push(on(input, "paste", dojo.stopEvent));
               _listeners.push(on(input, "keypress", function(event) {
                  /* Allow events with modifiers to pass through */
                  if (event.ctrlKey || event.metaKey || event.altKey)
                     return;

                  if (event.keyChar || event.keyCode == dojo.keys.DELETE || event.keyCode == dojo.keys.BACKSPACE)
                     event.preventDefault(), event.stopPropagation();
               }));
            }

            _listeners.push(on(input, "change", lang.hitch(this, function() {
               this._beforeInputChanged();
               this._handleInputChange(input, field);
            })));
            this._updateLabel(field, label);

            if (this.allowHTML5 && has("webkit")) {
               var div = domConstruct.create("div");
               input.style.opacity = "0";
               input.style.filter = "alpha(opacity=0)";
               input.style.position = "absolute";
               input.style.left = "0";
               input.style.top = "-9999px";
               input.setAttribute("tabindex", "-1");
               div.appendChild(input);
               var span = domConstruct.create("span", {
                  className : "lotusBtn"
               });
               var inputButton = this.browseInput = domConstruct.create("a", {
                  href : "javascript:;",
                  className : "lotusFormButton",
                  role : "button"
               });
               var btnTitle;
               if (this.allowHTML5)
                  btnTitle = field.isAllowMultipleFiles() ? nls.BUTTON_TEXT_WEBKIT : nls.BUTTON_TEXT_WEBKIT_1;
               else
                  btnTitle = nls.BUTTON_TEXT;
               inputButton.title = btnTitle;
               inputButton.appendChild(windowModule.doc.createTextNode(btnTitle));

               _listeners.push(on(inputButton, "click", lang.hitch(input, "click")));
               span.appendChild(inputButton);
               div.appendChild(span);
               return div;
            }
            return input;
         },

         _handleFakeButtonClick : function(field, label, _listeners) {
            var input = this._buildFileInput(field, label, _listeners, true);
            windowModule.body().appendChild(input);

            input.click();
         },

         buildInput : function(field, label) {
            var _listeners = [];

            if (!this.allowHTML5 || has("webkit"))
               var input = this.input = this._buildFileInput(field, label, _listeners, false);
            else {
               if (useButton) {
                  var input = this.input = this.browseInput = windowModule.doc.createElement('button');
                  input.appendChild(windowModule.doc.createTextNode(nls.BUTTON_TEXT));
               }
               else {
                  var input = this.input = this.browseInput = domConstruct.create('input');
                  input.type = "button";
                  input.value = nls.BUTTON_TEXT;
               }
               input.className = 'lotusBtn';

               _listeners.push(on(input, "click", lang.hitch(this, function(event) {
                  event.preventDefault(), event.stopPropagation();
                  this._handleFakeButtonClick(field, label, _listeners);
               })));
               if (this.fileInputForTest) {
                  var fileInputForTest = this.fileInputForTest = this._buildFileInput(field, label, _listeners, true);
                  windowModule.body().appendChild(fileInputForTest);
               }
            }

            return {
               domNode : input,
               destroy : lang.partial(function(provider) {
                  array.forEach(_listeners, dojo.disconnect);
                  if (provider.fileInputForTest) {
                     windowModule.body().removeChild(provider.fileInputForTest);
                     provider.fileInputForTest = null;
                  }
               }, this)
            };
         },

         getFocusNode : function() {
            return this.browseInput;
         },

         uploadFile : function(manager, file, args) {
            var networkOS = null;

            if (args.osConfig) {
               var networkOSConf = {
                  getAuthenticatedUser : function() {
                     return {
                        nonce : args.nonce
                     };
                  }
               };
               lang.mixin(networkOSConf, args.osConfig);

               networkOS = new lconn.files.util.os.NetworkOS(networkOSConf);
            }

            if (this.allowHTML5) {
               return this._uploadFileHTML5(manager, file, args, networkOS);
            }
            else {
               return this._uploadFileIFrame(manager, file, args, networkOS);
            }
         },

         /**
          * Support older browsers such as <IE8
          */
         _uploadFileIFrame : function(manager, file, args, networkOS) {
            var dfd = null;

            if (!args.form) {
               var form = domConstruct.create('form', {
                  'className' : 'lotusOffScreen',
                  'method' : 'post'
               });
               windowModule.body().appendChild(form);

               args.form = form;
            }

            var input = file.getObject();
            domClass.add(input, "lotusOffScreen");
            args.form.appendChild(input);
            domAttr.set(args.form, "enctype", "multipart/form-data");
            domAttr.set(args.form, "encoding", "multipart/form-data");

            if (!args.method) {
               args.method = domAttr.get(args.form, "method") || "POST";
            }

            // TODO: Non-HTML5 browsers (IE without flash, FF 3.6) will set the
            // values null or undefined as string values onto a hidden
            // input and Dojo 1.4 does not work around this. Replace values with
            // empty string
            // to match other browsers behavior. Remove when Dojo fixes.
            var content = args.content;
            if (content)
               for ( var key in content)
                  if (content[key] == undefined) // also == null
                     content[key] = "";

            var self = this;
            dfd = iframeModule.send(args);
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
            var dfd = null;

            if (file.getSize() == 0) {
               return this._sendZeroByteUpload(manager, file, args);
            }

            var _handleAsHtml = false;
            if (args.handleAs == "html") {
               args.handleAs = "text";
               _handleAsHtml = true;
            }

            var params = lang.mixin({}, args.content || {});

            if (args.form) {
               lang.mixin(params, dojo.formToObject(args.form));
            }

            var formData = new FormData();
            formData.append(manager.controller.inputName || "file", file.getObject());
            for ( var k in params) {
               // in safari, hasOwnProperty returns true if params[k] == null or
               // undefined, if it's explicitly set. remove those.
               if (params.hasOwnProperty(k) && params[k] != null) {
                  var vs = params[k];
                  if (!lang.isArray(vs)) {
                     vs = [ vs
                     ];
                  }

                  array.forEach(vs, function(v) {
                     if (v === true)
                        v = "true";
                     else if (v === false)
                        v = "false";
                     formData.append(k, v);
                  });
               }
            }

            var url = args.url;

            if (!url && args.form) {
               url = domAttr.get(args.form, "action");
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
            if (lang.isFunction(args.handle)) {
               handle = args.handle;
               delete args.handle;
            }

            if (lang.isFunction(args.load)) {
               load = args.load;
               delete args.load;
            }

            if (lang.isFunction(args.error)) {
               err = args.error;
               delete args.error;
            }

            if (networkOS) {
               dfd = networkOS.postMultipart(args);
            }
            else {
               args.url = proxy(url);

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
               dfd.addBoth(lang.hitch(this, function(value) {
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

                  // call Document::close to avoid a false-positive loading
                  // message from browsers
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

         _cancelIFrame : function() {
            dii = iframeModule;
            if (dii._frame) {
               try {
                  // Set iframe to blank doc to cancel
                  var doc = dii.doc(dii._frame);
                  if (doc) {
                     var uri = (dojo.config["dojoBlankHtmlUrl"] || require.toUrl("dojo/resources/blank.html"));
                     doc.location.replace(uri);
                  }
               }
               catch (e) {
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
                  catch (e2) {
                     // Can throw errors in IE
                     if (dojo.config.isDebug) {
                        console.debug("dojo.io.iframe.cancel2: ", e2);
                     }
                  }
               }
            }
         },

         _sendZeroByteUpload : function(manager, file, args) {
            var params = lang.mixin({}, args.content || {});

            if (args.form) {
               lang.mixin(params, dojo.formToObject(args.form));
            }

            var boundary = "--------" + (new Date()).getTime();

            args.url = proxy(args.url);

            args.postData = this._buildMultipart(manager.controller.inputName, file, params, boundary);

            // Don't mess with original headers
            var hdrs = lang.mixin({}, args.headers || {});
            for ( var k in hdrs) {
               if (hdrs.hasOwnProperty(k) && hdrs[k] && !lang.isFunction(hdrs[k])) {
                  hdrs[k] = text.encodeHeaderUtf8(hdrs[k]);
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
            if (lang.isFunction(args.handle)) {
               handle = args.handle;
               delete args.handle;
            }

            if (lang.isFunction(args.load)) {
               load = args.load;
               delete args.load;
            }

            if (lang.isFunction(args.error)) {
               err = args.error;
               delete args.error;
            }

            dfd = dojo.xhrPost(args);
            var ioArgs = dfd.ioArgs || args;

            if (_handleAsHtml) {
               dfd.addBoth(lang.hitch(this, function(value) {
                  this._deleteIFrame("zbFrame");

                  var iframe = dii.create("zbFrame");
                  var idoc = dii.doc(iframe);

                  // call Document::close here to effectively clear the document
                  idoc.close();
                  idoc.open();
                  idoc.write(value);

                  // call Document::close to avoid a false-positive loading
                  // message from browsers
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

         _queueProgressCheck : function(manager, file) {
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
         _beforeInputChanged : function() {},
         _handleInputChange : function(input, field) {
            // delete the id to ensure uniqueness (will be assigned a unique id
            // by the file list)
            dojo.removeAttr(input, "id");

            if (this.allowHTML5) {
               if (input.files) {
                  this.addHTML5Files(input.files, field.controller.fileList);

                  // this input will be created when the fake button is clicked,
                  // and cannot be destroyed when _buildInput is called again,
                  // so call it manually.
                  input.parentNode.removeChild(input);
               }
               else {
                  return;
               }
            }
            else {
               var name = text.getFilename(input.value);
               var bean = new File(input, name);
               field.controller.fileList.addFiles([ bean
               ]);
            }

            field._buildInput();
            field._focusFirstFileOfCurrentSelection();
         },

         addHTML5Files : function(files, fileList) {
            if (!files || !files.length || !this.allowHTML5)
               return;

            var fileBeans = [];
            array.forEach(files, function(file) {
               var name = text.getFilename(file.name);
               var bean = new File(file, name);

               try {
                  bean.setSize(file.size);
                  fileBeans.push(bean);
               }
               catch (e) {
                  var error = [ {
                     message : string.substitute(nls.ERROR_IO, [ name
                     ])
                  }
                  ];
                  fileList.onAddFilesError(error);
               }
            }, this);
            fileList.addFiles(fileBeans);
         },

         _buildMultipart : function(inputName, file, params, boundary) {
            var divider = '--' + boundary;

            var data = [ divider
            ];
            var fileInputName = inputName || "file";
            data.push('Content-Disposition: form-data; name="' + fileInputName + '"; filename="' + file.getOriginalFileName() + '"');

            // RFC 2388 states that file parts with undiscoverable mime types
            // should be sent
            // with the application/octet-stream mime-type.
            data.push('Content-Type: application/octet-stream');

            // empty file parts in a multipart upload need 2 blank lines, not
            // one
            data.push('');
            data.push('');

            for ( var key in params) {
               if (lang.isString(key)) {
                  var values = params[key];

                  if (!lang.isArray(values)) {
                     values = [ values
                     ];
                  }

                  array.forEach(values, function(value) {
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

      return HtmlFileProvider;
   });
