/* Copyright IBM Corp. 2011, 2015 All Rights Reserved. */
define([
      "dojo",
      "dojo/_base/lang",
      "dojo/_base/declare",
      "dojo/dom-construct",
      "dojo/_base/window",
      "dojo/dom-geometry",
      "dojo/_base/array",
      "dojo/has",
      "dojo/io/iframe",
      "dojo/string",
      "dojo/i18n",
      "dojo/json",
      "dojox/xml/parser",
      "../../proxy",
      "ic-core/swfupload",
      "../../swfupload/SWFUpload",
      "../data/File",
      "../provider/HtmlFileProvider",
      "../../util/text",
      "dojo/i18n!../nls/upload"
],
   function(dojo, lang, declare, domConstruct, windowModule, domGeometry, array, has, iframeModule, string, i18n, JSON, parser, proxy, swfupload, SWFUpload, File, HtmlFileProvider, text, i18nupload) {

      var flashCapable = has("ie") && swfobject.hasFlashPlayerVersion("10");
      if (flashCapable) {
         // if we're on a flash capable browser, make sure we're not in another
         // frame. flash can't call JS callbacks
         // in another frame
         var activeDoc = lang.getObject("top.document.activeElement.contentWindow.document", false, window);
         if (activeDoc) {
            flashCapable = (document == activeDoc);
         }
         
         // RTC 153871: [PMR 14775,035,724] Cannot upload files in IE when Flash is prohibited from accessing the file system 
         flashCapable = flashCapable && ( !lconn.core.config.properties["flash.LocalFileReadDisable"] || lconn.core.config.properties["flash.LocalFileReadDisable"] != "true" );
      }

      var _nls = i18nupload;

      var FlashFileProvider = declare("lconn.core.upload.provider.FlashFileProvider", HtmlFileProvider, {
         constructor : function(opts) {
            lang.mixin(this, opts);
         },
         _getInputID : function(controller) {
            if (!flashCapable) {
               return this.inherited(arguments);
            }

            var uploader = controller.uploader;
            if (uploader) {
               return uploader.movieName;
            }

            return null;
         },

         buildInput : function(field, label) {
            if (!flashCapable) {
               return this.inherited(arguments);
            }

            var fragment = windowModule.doc.createDocumentFragment();

            var input = this.browseInput = domConstruct.create('button', {
               'type' : 'button',
               'className' : 'lotusBtn lotusBtnDisabled'
            });

            input.appendChild(windowModule.doc.createTextNode(_nls.BUTTON_TEXT));
            fragment.appendChild(input);

            this.inputFn = lang.hitch(this, "_renderFlash", field, label, input);

            return {
               domNode : fragment,
               destroy : function() {
                  field.controller.uploader.destroy();
               }
            };
         },

         _renderFlash : function(field, label, input) {
            var uploader = field.controller.uploader;

            if (!uploader) {
               var _queueCallback = lang.hitch(this, "_flashFileQueued", field);
               var uploader = field.controller.uploader = new swf({
                  file_post_name : field.controller.inputName,
                  button_action : swf.BUTTON_ACTION.SELECT_FILES,
                  button_text : ' ',
                  button_placeholder : input,
                  button_window_mode : SWFUpload.WINDOW_MODE.OPAQUE,

                  custom_settings : {},

                  file_dialog_start_handler : lang.hitch(this, "_flashFileDialogStart"),
                  file_queued_handler : _queueCallback,
                  file_queue_error_handler : _queueCallback,
                  swfupload_loaded_handler : lang.hitch(this, function() {
                     var browseInput = this.inputFn = uploader.a11y_input;
                     var contentBox = domGeometry.position(browseInput);
                     dojo.contentBox(uploader.getMovieElement(), contentBox);
                     if (this.setFocus != false)
                        dijit.focus(browseInput);
                  }),
                  file_dialog_complete_handler : lang.hitch(this, function() {
                     this._beforeInputChanged();
                     this._flashFileDialogComplete(field);
                  })
               });

               this._updateLabel(field, label);
            }
         },

         getFocusNode : function() {
            if (!flashCapable) {
               return this.inherited(arguments);
            }

            return this.inputFn;
         },

         uploadFile : function(manager, file, args) {

            if (!flashCapable) {
               return this.inherited(arguments);
            }

            var dfd = null;

            args.handleAs = args.handleAs || "text";

            if (!args.url && args.form) {
               args.url = args.form.action;
            }

            var params = lang.mixin({}, args.content || {});

            if (args.form) {
               lang.mixin(params, dojo.formToObject(args.form));
            }

            if (file.getSize() == 0) {
               return this._sendZeroByteUpload(manager, file, args);
            }

            // replicate deferred setup from dojo.xhr()
            var uploader = manager.controller.uploader;

            /*
             * pass empty ok and error callbacks, as they'll be handled by the
             * flash events before the deferred gets a hold of them. doesn't
             * appear dojo_ioSetArgs will allow null functions there, so just
             * pass no-op functions.
             */
            dfd = dojo._ioSetArgs(args, function cancel() {
               uploader.stopUpload();

               var err = dfd.ioArgs.error;
               if (!err) {
                  err = new Error();
                  err.dojoType = "cancel";
               }

               return err;
            }, function okHandler() {}, function errHandler() {});

            uploader.setUploadURL(dfd.ioArgs.url);

            var fid = file.getId();
            for ( var k in params) {
               if (params.hasOwnProperty(k)) {
                  uploader.removeFileParam(fid, k);
                  var vs = params[k];
                  vs = lang.isArray(vs) ? vs : [ vs
                  ];

                  array.forEach(vs, function(v) {
                     uploader.addFileParam(fid, k, v);
                  });
               }
            }

            uploader.settings.upload_progress_handler = function(f, complete, total) {
               file.setBytesComplete(complete);
            };

            uploader.settings.upload_success_handler = function(f, data, resp) {
               var ha = dfd.ioArgs.handleAs || "text";
               var response = null;
               if (ha == "text") {
                  response = data;
               }
               else if (ha == "xml") {
                  response = parser.parse(data);
               }
               else {
                  if (data.indexOf("content=\"409\"") >= 0)
                     uploader.requeueUpload(f.id);
                  var dii = iframeModule;
                  var iframe = dii.create("flashUploadFrame");
                  var idoc = dii.doc(iframe);

                  idoc.close();
                  idoc.open();
                  idoc.write(data);

                  idoc.close();

                  if (ha == "html") {
                     response = idoc;
                  }
                  else {
                     var js = idoc.getElementsByTagName("textarea")[0].value;
                     if (ha == "json") {
                        response = JSON.parse(js);
                     }
                     else if (ha == "javascript") {
                        response = dojo.eval(js);
                     }
                     else {
                        throw new Error("unsupported handleAs");
                     }
                  }
               }

               dfd.callback(response);
            };

            uploader.settings.upload_error_handler = lang.hitch(this, function(f, code, msg) {
               // don't ever call dfd.cancel() here as you'll likely cause an
               // infinite loop
               var uec = swf.UPLOAD_ERROR;
               if (code != uec.FILE_CANCELLED && code != uec.UPLOAD_STOPPED) {
                  if (code == -200 && msg == "409")
                     uploader.requeueUpload(file._id);

                  var err = new Error(msg);
                  err.code = code;

                  dfd.errback(err);
               }
            });

            uploader.startUpload(fid);

            return dfd;
         },

         _flashFileDialogStart : function() {
            this._tmpFiles = [];
         },

         _flashFileQueued : function(field, file, error) {
            if (error == -140) {
               var error = [ {
                  message : string.substitute(_nls.ERROR_IO, [ file.name
                  ])
               }
               ];
               field.controller.fileList.onAddFilesError(error);
            }

            var fileBean = new File(file, file.name);
            fileBean.setSize(file.size);

            this._tmpFiles.push(fileBean);
         },

         _flashFileDialogComplete : function(field) {
            field.controller.fileList.addFiles(this._tmpFiles);
            field._focusFirstFileOfCurrentSelection();
         },
         _beforeInputChanged : function() {}
      });
      return FlashFileProvider;
   });
